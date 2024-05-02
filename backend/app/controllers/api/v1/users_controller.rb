require 'rest-client'
require 'json'

module Api
  module V1
    class UsersController < ApplicationController
    skip_before_action :verify_authenticity_token
    before_action :set_user, only: %i[ show edit update destroy ]

    # GET /users or /users.json
    def index
      @users = User.all
    end

    # GET /users/1 or /users/1.json
    def show
    end

    # GET /users/new
    def new
      @user = User.new
    end

    # GET /users/1/edit
    def edit
    end

    # POST /users or /users.json
    def create
    end

    # PATCH/PUT /users/1 or /users/1.json
    def update
      respond_to do |format|
        if @user.update(user_params)
          format.html { redirect_to user_url(@user), notice: "User was successfully updated." }
          format.json { render :show, status: :ok, location: @user }
        else
          format.html { render :edit, status: :unprocessable_entity }
          format.json { render json: @user.errors, status: :unprocessable_entity }
        end
      end
    end

    # DELETE /users/1 or /users/1.json
    def destroy
      @user.destroy!

      respond_to do |format|
        format.html { redirect_to users_url, notice: "User was successfully destroyed." }
        format.json { head :no_content }
      end
    end

    def register
      registration_response = authenticate_registration

      if registration_response[:status] == 201
        @role = Role.find_by(role_name: params.dig(:role))
        existing_user = User.find_by(email_address: user_params.dig(:email_address))
        
        if !@role || existing_user
          error_message = !@role ? 'Role not found' : 'User already exists'
          render json: { error: error_message }, status: :unprocessable_entity
          return
        end

        @user = User.new(user_params.merge(uuid: registration_response[:user]['uuid'], role_id: @role.id))
        @user.verification_token = SecureRandom.hex(10)
        @user.verification_expires_at = 24.hours.from_now
        if @user.save
          verified_status = UserMailer.email_verification(@user).deliver_now
          render json: { user: @user, msg: 'User registered and saved successfully' }, status: :created
        else
          render json: { error: 'Failed to save user details' }, status: :unprocessable_entity
        end
      else
        render json: { error: registration_response[:error] }, status: registration_response[:status]
      end
    end

    def resend_verification
      user = User.find_by(verification_token: params[:token], id: params[:id])
      
      if user.nil?
        render json: { msg: "No user found. Contact scholaris@sence1.com" }, status: :not_found
      elsif user.verification_expires_at > Time.now
        render json: { msg: "Verification not yet expired. Contact scholaris@sence1.com" }, status: :unprocessable_entity
      else
        if UserMailer.email_verification(user).deliver_now
          render json: { user: user, msg: 'Verification email has been sent' }, status: :ok
        else
          render json: { msg: 'Failed to send verification email' }, status: :unprocessable_entity
        end
      end
    end


    def verify
      user = User.find_by(verification_token: params[:token])
      if user && Time.current > user.verification_expires_at
        render json: { status: "expired", user: user }, status: :not_found
      elsif user.nil?
        render json: { status: "invalid link" }, status: :ok
      elsif user.update(is_verified: true, verification_token: nil, verification_expires_at: nil)
        render json: { status: "verified" }, status: :ok
      else
        render json: { status: "not verified" }, status: :not_found
      end
    end

    def login
      req = {
        email: params.dig(:email_address),
        password: params.dig(:password),
        serviceId: params.dig(:service_id),
        serviceKey: params.dig(:service_key),
        role: params.dig(:role)
      }

      headers = {
        'Content-Type': 'application/json',
        'Accept': '*/*'
      }

      begin
        response = RestClient.post('http://authtest.sence1.com/login', req.to_json, headers)
        parsed_response = JSON.parse(response.body)

        if parsed_response['status'] == 200
          cookies[:user_email] = {
            value: user_params.dig(:email_address),
            httponly: true
          }
          cookies[:access_token] = {
            value: parsed_response['tokens']['accessToken'],
            httponly: true
          }
          cookies[:refresh_token] = {
            value: parsed_response['tokens']['refreshToken'],
            httponly: true
          }
          user = User.find_by(email_address: user_params.dig(:email_address))
          if !user.is_verified
            render json: {status: "error", message: "Email must be verified"}, status: :unprocessable_entity
          else
            provider = ScholarshipProvider.find_by(user_id: user.id)
            if provider
              scholarships = Scholarship.where(scholarship_provider_id: provider.id)
              profile = ScholarshipProviderProfile.find_by(scholarship_provider_id: provider.id)
            else
              provider = ScholarshipProvider.new(user_id: user.id)
              provider.save
            end
            
            profile_hash = profile.present? ? profile.as_json : {}
            
            render json: user.as_json.merge(scholarship_provider: provider).merge(profile: profile_hash), status: parsed_response['status']
          end 
        else
          render json: response, status: parsed_response['status']
        end
      rescue RestClient::ExceptionWithResponse => e
        render json: response, status: e.response.code, error: e.response.body
      end
    end

    def refresh
      req = {
        refreshToken: cookies[:refresh_token],
        serviceId: 1,
      }

      begin
        response = RestClient.post('http://authtest.sence1.com/refresh_token', req.to_json, headers)
        parsed_response = JSON.parse(response.body)

        if parsed_response['status'] == 200
          cookies[:user_email] = {
            value: user_params.dig(:email_address),
            httponly: true
          }
          cookies[:access_token] = {
            value: parsed_response['tokens']['accessToken'],
            httponly: true
          }
          cookies[:refresh_token] = {
            value: parsed_response['tokens']['refreshToken'],
            httponly: true
          }
          
          render json: {message: parsed_response['msg']}, status: parsed_response['status']
        else
          render json: response, status: parsed_response['status']
        end
      rescue RestClient::ExceptionWithResponse => e
        render json: response, status: e.response.code, error: e.response.body
      end
    end

    def check_token
      has_access_token = cookies[:access_token].present?
      render json: { valid: has_access_token }, status: :ok
    end

    def logout
      if params[:email] != cookies[:user_email]
        render_unauthorized_response
        return
      end
      
      cookies.delete :access_token
      cookies.delete :refresh_token
      cookies.delete :user_email

      response.headers["Cache-Control"] = "no-cache, no-store"
      response.headers["Pragma"] = "no-cache"
      response.headers["Expires"] = "Wed, 31 Dec 1980 05:00:00 GMT"

      render json: { deleted: cookies[:access_token].nil? }, status: :ok
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_user
        @user = User.find(params[:id])
      end

      # Only allow a list of trusted parameters through.
      def user_params
        params.require(:user).permit(:email_address, :password, :first_name, :last_name, :birthdate, :is_active, :role, :session_token, :service_id, :service_key)
      end

      def authenticate_registration
        req = {
          email: params.dig(:email_address),
          password: params.dig(:password),
          serviceId: params.dig(:service_id),
          serviceKey: params.dig(:service_key),
          role: params.dig(:role)
        }

        headers = {
          'Content-Type': 'application/json',
          'Accept': '*/*'
        }

        begin
          response = RestClient.post('http://authtest.sence1.com/register', req.to_json, headers)
          parsed_response = JSON.parse(response.body)

          if parsed_response['status'] == 201
            request.headers['email'] = parsed_response['user']['email']
            request.headers['uuid'] = parsed_response['user']['uuid']
            request.headers['role'] = parsed_response['user']['role']

            { status: parsed_response['status'], user: parsed_response['user'], msg: parsed_response['msg'] }
          else
            { status: parsed_response['status'], error: parsed_response['msg'] }
          end
        rescue RestClient::ExceptionWithResponse => e
          { status: e.response.code, error: e.response.body }
        end
      end
    end
  end
end


