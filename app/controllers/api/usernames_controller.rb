class Api::UsernamesController < ApplicationController
  def create
    sleep 2
    @user = User.find_by(username: params[:user][:username])
    path = params[:user][:path]

    if params[:user][:username] === ""
      render json: ["Username can't be blank"], status: 401
    else
      if (@user && path === '/signin') || (!@user && path === '/signup')
        render json: true
      else
        if path === '/signin'
          render json: ["Invalid username"], status: 401
        elsif path === '/signup'
          render json: ["Username not available"], status: 401
        end
      end
    end
  end
end
