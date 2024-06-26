module Api
  module V1
    class PhAddressesController < ApplicationController
      before_action :set_ph_adress, only: %i[ show edit update destroy ]

      # GET /ph_adresses or /ph_adresses.json
      def index
        @ph_adresses = PhAddress.all
        render json: @ph_adresses
      end

      # GET /ph_adresses/1 or /ph_adresses/1.json
      def show
      end

      # GET /ph_adresses/new
      def new
        @ph_adress = PhAdress.new
      end

      # GET /ph_adresses/1/edit
      def edit
      end

      # POST /ph_adresses or /ph_adresses.json
      def create
        @ph_adress = PhAdress.new(ph_adress_params)

        respond_to do |format|
          if @ph_adress.save
            format.html { redirect_to ph_adress_url(@ph_adress), notice: "Ph adress was successfully created." }
            format.json { render :show, status: :created, location: @ph_adress }
          else
            format.html { render :new, status: :unprocessable_entity }
            format.json { render json: @ph_adress.errors, status: :unprocessable_entity }
          end
        end
      end

      # PATCH/PUT /ph_adresses/1 or /ph_adresses/1.json
      def update
        respond_to do |format|
          if @ph_adress.update(ph_adress_params)
            format.html { redirect_to ph_adress_url(@ph_adress), notice: "Ph adress was successfully updated." }
            format.json { render :show, status: :ok, location: @ph_adress }
          else
            format.html { render :edit, status: :unprocessable_entity }
            format.json { render json: @ph_adress.errors, status: :unprocessable_entity }
          end
        end
      end

      # DELETE /ph_adresses/1 or /ph_adresses/1.json
      def destroy
        @ph_adress.destroy!

        respond_to do |format|
          format.html { redirect_to ph_adresses_url, notice: "Ph adress was successfully destroyed." }
          format.json { head :no_content }
        end
      end

      private
        # Use callbacks to share common setup or constraints between actions.
        def set_ph_adress
          @ph_adress = PhAdress.find(params[:id])
        end

        # Only allow a list of trusted parameters through.
        def ph_adress_params
          params.fetch(:ph_adress, {})
        end
    end
  end
end
