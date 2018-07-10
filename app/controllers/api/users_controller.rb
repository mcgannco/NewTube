class Api::UsersController < ApplicationController

  def index
    @users = User.all.includes(:subscriptions, :subscribers, :videos, :likes, :comments)
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
    @sub = current_user.follows.new(followee_id: params[:followee_id])
    if @follow.save
      render :follow
    else
      render json: @follow.errors.full_messages, status: 422
    end
  end

  def unsubscribe
    @follow = current_user.follows.find_by(followee_id: params[:followee_id])

    if @follow
      @follow.destroy
      render :follow
    else
      render json: ['Follow does not exist or you are not authorized to destroy it'], status: 401
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :password, :avatar, :banner)
  end
end
