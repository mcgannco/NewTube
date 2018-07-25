class Api::VideosController < ApplicationController

  NUM_VIDEOS = 10

  def index
    @videos = Video.all.includes(:likes, :comments, :likers, :uploader, :watchlaters, :views)
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

  def destroy
    @video = Video.find(params[:id])
    @video.destroy
    render 'api/videos/show'
  end

  def history
    offset_idx = (params[:request_counter].to_i - 1) * NUM_VIDEOS
    @history_video_count = current_user.watched_videos.count
    @next_videos = current_user.watched_videos
      .order('views.created_at DESC')
      .offset(offset_idx)
      .limit(NUM_VIDEOS)

    if @next_videos
      render "api/videos/history"
    else
      render json: { users: {}, videos: {} }
    end
  end

  private
  def video_params
    params.require(:video).permit(:title, :author_id, :clip, :description, :view_count)
  end
end
