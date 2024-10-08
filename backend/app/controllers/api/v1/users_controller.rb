require 'rest-client'
require 'json'

module Api
  module V1
    class UsersController < ApplicationController
    skip_before_action :verify_authenticity_token
    before_action :set_user, only: %i[ show edit update destroy ]
    before_action :set_headers, only: [ :login, :refresh, :register ]

    # GET /users or /users.json
    def index
      @users = User.all
    end

    # GET /users/1 or /users/1.json
    def show
      children = @user.children.includes(:scholarship_provider, :role, :student_profile).page(params[:page]).per(params[:pageSize])
      render json: {
        accounts: children.as_json(include: :scholarship_provider),
        meta: {
          current_page: children.current_page,
          next_page: children.next_page,
          prev_page: children.prev_page,
          total_pages: children.total_pages,
          total_count: children.total_count
        }
      }
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
      registration_response = authenticate_registration

      case registration_response[:status]
      when 201
        handle_child_registration_success(registration_response)
      when 409
        render_error("Please try logging in or reset your password", registration_response[:status])
      else
        render_error(registration_response[:error], registration_response[:status])
      end
    end

    # PATCH/PUT /users/1 or /users/1.json
    def update
      if @user.update(user_params.merge(password_digest: params.dig(:password)))
        render json: {message: 'User updated successfully', user: @user}, status: :ok
      else
        render json: {errors: @user.errors.full_messages, message: "Unable to update user"}, status: :unprocessable_entity
      end
    end

    # DELETE /users/1 or /users/1.json
    def destroy
      if !@user.deleted_at.present?
        User.soft_delete(@user)
        render json: {message: "User deleted successfully."}, status: :ok
      else
        render json: {message: "Unable to delete"}, status: :unprocessable_entity
      end
    end

    def register
      registration_response = authenticate_registration

      case registration_response[:status]
      when 201
        handle_registration_success(registration_response)
      when 409
        render_error("Please try logging in or reset your password", registration_response[:status])
      else
        render_error(registration_response[:error], registration_response[:status])
      end
    end

    def resend_verification
      user = User.find_by(verification_token: params[:token], id: params[:id])

      if user.nil?
        render_error("No user found", :not_found)
      elsif user.verification_expires_at < Time.current
        render_error("Verification link has expired", :unprocessable_entity)
      else
        handle_verification_resend(user)
      end
    end

    def verify
      user = User.find_by(verification_token: params[:token])

      if user.nil?
        render_error("Invalid link", :ok)
      elsif Time.current > user.verification_expires_at
        render_error("Verification link has expired", :not_found)
      elsif user.update(is_verified: true, verification_token: nil, verification_expires_at: nil)
        render json: { status: "verified" }, status: :ok
      else
        render_error("Verification failed", :unprocessable_entity)
      end
    end

    def login
      req = {
        email: params.dig(:email_address),
        password: params.dig(:password),
        serviceId: ENV["APP_SERVICE_ID"],
        serviceKey: ENV["APP_SERVICE_KEY"],
        role: params.dig(:role)
      }

      begin
        response = RestClient.post(ENV['AUTH_LOGIN'], req.to_json, @headers)
        parsed_response = JSON.parse(response.body)

        if parsed_response['status'] == 200
          handle_login_success(parsed_response)
        else
          render_error(parsed_response['message'] || 'Authentication failed', parsed_response['status'])
        end
      rescue RestClient::ExceptionWithResponse => e
        handle_rest_client_error(e)
      end
    end

    def refresh
      req = {
        refreshToken: cookies[:refresh_token],
        serviceId: ENV["APP_SERVICE_ID"],
        email: JwtService.decode(cookies[:email])['email']
      }

      parsed_response = handle_refresh(req)

      if parsed_response['status'] == 200
        return handle_refresh_success(parsed_response)
      else
        return render_error(parsed_response['msg'] || 'Refresh failed', parsed_response['status'])
      end
    end

    def check_token
      access_token = cookies[:access_token]
      refresh_token = cookies[:refresh_token]
      set_user_profiles

      if access_token.present?
        decoded_access_token = JwtService.decode(cookies[:access_token])
        if decoded_access_token['email'] === JwtService.decode(cookies[:email])['email']
          render json: { valid: true, user: @user.as_json.merge(scholarship_provider: @provider, student_profile: @student_profile, profile: @profile.as_json)}, status: :ok
        else
          render json: { valid: false }, status: 498
        end
      elsif refresh_token.present? && !access_token.present?
        req = {
          refreshToken: cookies[:refresh_token],
          serviceId: ENV["APP_SERVICE_ID"]
        }

        parsed_response = handle_refresh(req)

        if parsed_response['status'] == 200
          set_cookie(parsed_response)
          render json: { valid: true, user: @user.as_json.merge(scholarship_provider: @provider, student_profile: @student_profile, profile: @profile.as_json) }, status: :ok
        else
          render json: { valid: false }, status: 498
        end
      elsif refresh_token.present? && access_token.present?
        decoded_access_token = JwtService.decode(cookies[:access_token])
        is_authorized = decoded_access_token['email'] === JwtService.decode(cookies[:email])['email']
        if is_authorized
          req = {
            refreshToken: cookies[:refresh_token],
            serviceId: ENV["APP_SERVICE_ID"]
          }

          parsed_response = handle_refresh(req)

          if parsed_response['status'] == 200
            set_cookie(parsed_response)
            render json: { valid: true, user: @user.as_json.merge(scholarship_provider: @provider, student_profile: @student_profile, profile: @profile.as_json) }, status: :ok
          else
            render json: { valid: false }, status: 498
          end
        else
          render json: { valid: false }, status: 498
        end
      else
        render json: { valid: false }, status: 498
      end
    end

    def logout
      if params[:email] != JwtService.decode(cookies[:email])['email']
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
        params.require(:user).permit(:email_address, :password, :first_name, :last_name, :birthdate, :is_active, :role, :session_token, :service_id, :parent_id)
      end

      def authenticate_registration
        req = {
          email: params.dig(:email_address),
          password: params.dig(:password),
          serviceId: ENV["APP_SERVICE_ID"],
          serviceKey: ENV["APP_SERVICE_KEY"],
          role: params.dig(:role)
        }

        headers = {
          'Content-Type': 'application/json',
          'Accept': '*/*'
        }

        begin
          response = RestClient.post(ENV['AUTH_REGISTER'], req.to_json, headers)
          parsed_response = JSON.parse(response.body)
          if parsed_response['status'] == 201
            request.headers['email'] = parsed_response['user']['email']
            request.headers['uuid'] = parsed_response['user']['uuid']
            request.headers['role'] = parsed_response['user']['role']

            { status: parsed_response['status'], user: parsed_response['user'], message: parsed_response['msg'] }
          else
            { status: parsed_response['status'], message: parsed_response['msg'] }
          end
        rescue RestClient::ExceptionWithResponse => e
          { status: e.response.code, error: e.response.body }
        end
      end

      def handle_refresh(request)
        begin
          response = RestClient.post(ENV['AUTH_REFRESH'], request.to_json, @headers)
          parsed_response = JSON.parse(response.body)

          return parsed_response
        rescue RestClient::ExceptionWithResponse => e
          return e
        end
      end

      def handle_registration_success(registration_response)
        @role = Role.find_by(role_name: params.dig(:role))
        existing_user = User.find_by(email_address: user_params.dig(:email_address))

        if !@role || existing_user
          error_message = !@role ? 'Role not found' : 'Please try logging in or reset your password'
          render_error(error_message, :unprocessable_entity)
        else
          @user = User.new(user_params.merge(uuid: registration_response[:user]['uuid'], role_id: @role.id))
          @user.verification_token = SecureRandom.hex(10)
          @user.verification_expires_at = 24.hours.from_now
          if @user.save
            if UserMailer.email_verification(@user).deliver_now
              render json: { user: @user, message: 'User registered, email sent, and saved successfully' }, status: :created
            else
              render json: { message: 'User registered and saved successfully, but email sending failed' }, status: :created
            end
          else
            render_error('Failed to save user details', :unprocessable_entity, @user.errors.full_messages)
          end
        end
      end

      def handle_child_registration_success(registration_response)
        @role = Role.find_by(role_name: params.dig(:role))
        existing_user = User.find_by(parent_id: user_params.dig(:parent_id), email_address: user_params.dig(:email_address))
        if !@role || existing_user
          error_message = !@role ? 'Role not found' : 'Please try logging in or reset your password'
          render_error(error_message, :unprocessable_entity)
        else
          parent = User.find(params[:parent_id])
          user = parent.children.new(user_params.merge(uuid: registration_response[:user]['uuid'], role_id: @role.id, password_digest: params.dig(:password)))
          user.verification_token = SecureRandom.hex(10)
          user.verification_expires_at = 24.hours.from_now
          if user.save
            parent_permission = parent.user_permissions.create!(
              user_type: UserPermission::PARENT,
              can_add: true,
              can_view: true,
              can_edit: true,
              can_delete: true,
              is_enabled: true
            )
            child_permission = user.user_permissions.create!(
              user_type: UserPermission::CHILD,
              can_add: true,
              can_view: true,
              can_edit: true,
              can_delete: true,
              is_enabled: true
            )
            if UserMailer.email_verification(user).deliver_now
              render json: { user: user, message: 'User registered, email sent, and saved successfully' }, status: :created
            else
              render json: { message: 'User registered and saved successfully, but email sending failed' }, status: :created
            end
          else
            render_error('Failed to save user details', :unprocessable_entity, user.errors.full_messages)
          end
        end
      end

      def handle_verification_resend(user)
        if user.update(verification_token: SecureRandom.hex(10), verification_expires_at: 24.hours.from_now) && UserMailer.email_verification(user).deliver_now
          render json: { user: user, message: 'Verification email has been sent' }, status: :ok
        else
          render_error('Failed to send verification email', :unprocessable_entity)
        end
      end
      
      def set_user_profiles
        return unless cookies[:email]

        @user = User.find_by(email_address: JwtService.decode(cookies[:email])['email'])
        if @user && @user.is_verified
          provider = {}
          if @user.parent_id
            provider = ScholarshipProvider.find_or_create_by(user_id: @user.parent_id)
          else
            provider = ScholarshipProvider.find_or_create_by(user_id: @user.id)
          end

          @scholarships = provider.scholarships
          @student_profile = @user.role_id === 3 ? @user.student_profile : {}
          @profile = provider.scholarship_provider_profile
          @provider = provider
        end
      end

      def handle_login_success(parsed_response)
        set_cookie(parsed_response)
        set_user_profiles

        if @user && @user.is_verified
          render json: @user.as_json.merge(scholarship_provider: @provider, student_profile: @student_profile, profile: @profile.as_json), status: :ok
        else
          render_error("Email must be verified", :unprocessable_entity) unless @user.is_verified
        end
      end
      
      def handle_refresh_success(parsed_response)
        set_cookie(parsed_response)
        user = User.find_by(email: JwtService.decode(cookies[:email])['email'])

        render json: { message: parsed_response['msg'] }, status: :ok
      end

      def set_cookie(parsed_response)
        access_token = parsed_response['tokens']['accessToken']
        decoded_access_token = JwtService.decode(access_token)
        email = decoded_access_token['email']
        
        cookies[:email] = { value: JwtService.encode({email: email}), httponly: true }
        cookies[:access_token] = { value: parsed_response['tokens']['accessToken'], httponly: true }
        cookies[:refresh_token] = { value: parsed_response['tokens']['refreshToken'], httponly: true }
      end

      def handle_rest_client_error(exception)
        parsed_error_response = JSON.parse(exception.response.body) rescue { 'message' => 'An error occurred' }
        case exception.http_code
        when 400, 401
          render_error("Incorrect password or email", :unauthorized)
        when 404
          render_error("Please check your email address or try with a different account.", :not_found)
        else
          render_error(parsed_error_response['message'] || 'An error occurred', exception.http_code)
        end
      end

      def render_error(message, status, details = nil)
        error_response = { status: "error", message: message }
        error_response[:details] = details if details
        render json: error_response, status: status
      end

      def set_headers
        @headers = {
          'Content-Type': 'application/json',
          'Accept': '*/*'
        }
      end
    end
  end
end


