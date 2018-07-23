class Api::ViewsController < ApplicationController

  def create
    @view = View.new(view_params)
    @view.user_id = current_user.id
    if @view.save!
      @video = Video.find(params[:view][:video_id])
      render 'api/videos/show'
    else
      render json: @view.errors.full_messages, status: 422
    end
  end

  private
  def view_params
    params.require(:view).permit(:video_id)
  end
end
