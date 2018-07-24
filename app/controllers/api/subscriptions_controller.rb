class Api::SubscriptionsController < ApplicationController

  def index
    @users = current_user.subscribed_channels
    if @users
      render :index
    else
      render json: ['no subs found'], status: 422
    end
  end
end
