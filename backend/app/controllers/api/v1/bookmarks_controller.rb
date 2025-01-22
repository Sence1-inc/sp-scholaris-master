class Api::V1::BookmarksController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :is_authorized, only: %i[ show create remove_bookmark ]

  # GET /api/v1/bookmarks or /api/v1/bookmarks.json
  # def index
  #   @api_v1_bookmarks = Bookmark.all

  #   render json: @api_v1_bookmarks
  # end

  # GET /api/v1/bookmarks/:user_id
  def show
    @user = User.find(params[:user_id])
    bookmarked_ids = Bookmark.where(user_id: @user.id).pluck(:scholarship_id, :id).to_h

    scholarships_data = @user.bookmarked_scholarships.map do |scholarship|
      scholarship.as_json.merge(
        'is_bookmarked' => Bookmark.is_bookmarked(@user.id, scholarship.id),
        'bookmark_id' => bookmarked_ids[scholarship.id]
      )
    end

    render json: { scholarships: scholarships_data }, status: 200
  end
  
  # POST /api/v1/bookmarks
  def create

    @bookmark_exists = Bookmark.unscoped.find_by(user_id: params[:user_id], scholarship_id: params[:scholarship_id])
    
    if @bookmark_exists && @bookmark_exists.deleted_at != nil
      if @bookmark_exists.update(deleted_at: nil)
        scholarship = @bookmark_exists.scholarship.as_json.merge(
          'is_bookmarked' => true,
          'bookmark_id' => Bookmark.find_by(user_id: params[:user_id], scholarship_id:  @bookmark_exists.scholarship.id)&.id
        )
        render json: { message: "Saved to bookmarks",bookmark: @bookmark_exists, scholarship: scholarship },  status: 201 
      else
        render json: { error: @bookmark_exists.errors }, status: :unprocessable_entity    
      end
    elsif @bookmark_exists && @bookmark_exists.deleted_at == nil 
      render json: { error: "bookmark exists" }, status: :unprocessable_entity 
    else
      @api_v1_bookmark = Bookmark.new(api_v1_bookmark_params)

      if @api_v1_bookmark.save
        scholarship = @api_v1_bookmark.scholarship.as_json.merge(
          'is_bookmarked' => true,
          'bookmark_id' => Bookmark.find_by(user_id: params[:user_id], scholarship_id:  @api_v1_bookmark.scholarship.id)&.id
        )
        render json: { message: "Saved to bookmarks", bookmark: @api_v1_bookmark, scholarship: scholarship },  status: :created 
      else
        render json: { error: @api_v1_bookmark.errors }, status: :unprocessable_entity 
      end
    end

  end

  def remove_bookmark

    @bookmark = Bookmark.find(params[:bookmark_id])

    if Bookmark.soft_delete(@bookmark)
      scholarship = @bookmark.scholarship.as_json.merge(
          'is_bookmarked' => false,
          'bookmark_id' => nil
        )
      render json: { message: "Successfully removed bookmark.", scholarship: scholarship }, status: 200
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
