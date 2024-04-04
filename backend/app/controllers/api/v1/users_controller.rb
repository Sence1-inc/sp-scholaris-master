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
        puts "role"
        puts params.dig(:role)
        puts @role
        if (@role) 
          @user = User.new(user_params.merge(role_id: @role.id))
        else
          render json: { error: 'Failed to save user details' }, status: :unprocessable_entity
        end

        if @user.save
          render json: { user: @user, msg: 'User registered and saved successfully' }, status: :created
        else
          render json: { error: 'Failed to save user details' }, status: :unprocessable_entity
        end
      else
        # If registration fails, render error response
        render json: { error: registration_response[:error] }, status: registration_response[:status]
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
        response = RestClient.post(ENV["AUTH_LOGIN"], req.to_json, headers)
        parsed_response = JSON.parse(response.body)

        if parsed_response['status'] == 200
          puts "RES MEOW"
          puts parsed_response['tokens']['accessToken']
          cookies[:access_token] = parsed_response['tokens']['accessToken']
          cookies[:refresh_token] = parsed_response['tokens']['refreshToken']
          user = User.find_by(email_address: user_params.dig(:email_address))

          render json: response, status: parsed_response['status']
        else
          render json: response, status: parsed_response['status']
        end
      rescue RestClient::ExceptionWithResponse => e
        render json: response, status: e.response.code, error: e.response.body
      end
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
          response = RestClient.post(ENV["AUTH_REGISTER"], req.to_json, headers)
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


