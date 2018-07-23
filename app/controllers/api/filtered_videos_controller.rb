class Api::FilteredVideosController < ApplicationController

  def index
    @trending_videos = Video.trending_videos
    render "api/filtered_videos/index"
  end

end
