class Api::VideosController < ApplicationController

  def index
    @videos = Video.all.includes(:likes, :comments, :likers, :uploader)
  end

  def show
    @video = Video.find(params[:id]).includes(:likes)
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

  def update
    @video = Video.find(params[:id])
    update_info = params[:video] ? {description: params[:video][:description], title: params[:video][:title]} : {view_count: @video.view_count + 1}
    if @video.update(update_info)
     render "api/videos/show"
   else
     render json: @video.errors.full_messages, status: 422
   end
  end

  def destory
    @video = Video.find(params[:id])
    if @video.destroy!
      render 'api/videos/show'
    else
      render json: ["Error"]
    end

  end

  private
  def video_params
    params.require(:video).permit(:title, :author_id, :clip, :description, :view_count)
  end
end
