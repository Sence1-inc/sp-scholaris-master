class Api::V1::BookmarksController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :is_authorized, only: %i[ show create remove_bookmark ]

  # GET /api/v1/bookmarks or /api/v1/bookmarks.json
  # def index
  #   @api_v1_bookmarks = Bookmark.all

  #   render json: @api_v1_bookmarks
  # end

  # GET /api/v1/bookmarks/
  def show
  
    @schols = Bookmark.select('scholarship_providers.id as scholarship_provider_id, scholarship_providers.provider_name, scholarships.scholarship_name, bookmarks.id, scholarships.id as scholarship_id, users.id as user_id, scholarships.start_date as scholarship_start, scholarships.due_date as scholarship_end, scholarships.status as scholarship_status').joins(scholarship: :scholarship_provider).joins(:user).where('bookmarks.user_id = '+ params["user_id"].to_s)

    render json: { scholarships: @schols }, status: 200

  end
  
  # POST /api/v1/bookmarks
  def create

    @bookmark_exists = Bookmark.unscoped.find_by(user_id: params[:user_id], scholarship_id: params[:scholarship_id])
    
    if @bookmark_exists && @bookmark_exists.deleted_at != nil
      if @bookmark_exists.update(deleted_at: nil)
        render json: @bookmark_exists
      else
        render json: { error: @bookmark_exists.errors }, status: :unprocessable_entity    
      end
    elsif @bookmark_exists && @bookmark_exists.deleted_at == nil 
      render json: { error: "bookmark exists" }, status: :unprocessable_entity 
    else
      @api_v1_bookmark = Bookmark.new(api_v1_bookmark_params)

      if @api_v1_bookmark.save
        render json: { bookmark: @api_v1_bookmark },  status: :created 
      else
        render json: { error: @api_v1_bookmark.errors }, status: :unprocessable_entity 
      end
    end

  end

  def remove_bookmark

    @bookmark = Bookmark.find(params[:bookmark_id])

    if Bookmark.soft_delete(@bookmark)

      render json: { message: "Successfully removed bookmark." }, status: 200
    end
  end

  def is_bookmarked

    if Bookmark.is_bookmarked(params[:user_id], params[:scholarship_id])
      render json: {bookmarked: true }, status: 200
    else
      render json: {bookmarked: false }, status: 404
    end

    
  end

  # DELETE /api/v1/bookmarks/1 or /api/v1/bookmarks/1.json
  # def destroy
  #   Bookmark.soft_delete(@api_v1_bookmark)

  #   respond_to do |format|
  #     # format.html { redirect_to api_v1_bookmarks_url, notice: "Bookmark was successfully destroyed." }
  #     format.json { head :no_content }
  #   end
  # end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_api_v1_bookmark
      @api_v1_bookmark = Bookmark.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def api_v1_bookmark_params
      params.require(:bookmark).permit(:bookmark, :user_id, :scholarship_id, :provider_id, :school_id)
      # params.fetch(:api_v1_bookmark, {})
    end

    def is_authorized
      user = User.find(params[:user_id])
      handle_is_resource_owner(user)
    end
end
