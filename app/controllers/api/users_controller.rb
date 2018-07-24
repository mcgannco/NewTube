class Api::UsersController < ApplicationController

  def index
    @users = User.all.includes(:subscriptions, :subscribers, :videos,:comments, :likes, :subscribed_channels, :subsciber_channels, :watchlaters, :vidwatchlaters)
  end

  def show
    @user = User.find(params[:id])
    render "api/users/show"
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      render "api/users/show"
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def update
    unless params[:id].to_i == current_user.id
    render json: ['access denied'], status: 401
    return nil
  end

    @user = User.find_by(id: params[:id])

    if @user.update(user_params)
      render "api/users/show"
    else
      render json: ['update failed'], status: 422
    end
  end

  def subscribe
    @sub = current_user.subscriptions.new(subscribee_id: params[:subscribee_id])
    if @sub.save
      render :sub
    else
      render json: @sub.errors.full_messages, status: 422
    end
  end

  def unsubscribe
    @sub = current_user.subscriptions.find_by(subscribee_id: params[:subscribee_id])

    if @sub
      @sub.destroy
      render :sub
    else
      render json: ['Subscription does not exist or you are not authorized to destroy it'], status: 401
    end
  end

  def watchlater
    @watch = current_user.watchlaters.new(video_id: params[:video_id])
    if @watch.save
      render :watch
    else
      render json: @watch.errors.full_messages, status: 422
    end
  end

  def removewatchlater
    @watch = current_user.watchlaters.find_by(video_id: params[:video_id])

    if @watch
      @watch.destroy
      render :watch
    else
      render json: ['Cant remove watchlater'], status: 401
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :password, :avatar, :banner, :description)
  end
end
