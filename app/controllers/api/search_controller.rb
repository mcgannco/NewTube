class Api::SearchController < ApplicationController
  def index
    @videos = Video.where("lower(title) LIKE ?", "%#{params[:query].downcase}%" )
    @users  = User.where("lower(username) LIKE ?", "%#{params[:query].downcase}%")
    if @videos || @users
      render 'api/search/index'
    else
      render json: ["Invalid search"], status: 401
    end
  end
end
