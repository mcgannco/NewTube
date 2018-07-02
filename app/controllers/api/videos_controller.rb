class Api::VideosController < ApplicationController

  def index
    @videos = Video.all
  end

  def show
    @video = Video.find(params[:id])
    render "api/videos/show"
  end

  def create
    @video = Video.new(video_params)
    @video.author_id = current_user.id
    if @video.save
      render "api/videos/show"
    else
      render json: @video.errors.full_messages, status: 422
    end
  end

  private
  def video_params
    params.require(:video).permit(:title, :author_id, :clip, :description)
  end
end
