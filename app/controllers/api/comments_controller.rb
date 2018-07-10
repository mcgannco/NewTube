class Api::CommentsController < ApplicationController
  def index
    @comments = Comment.all.includes(:video, :author)
  end

  def show
  end

  def create
    @comment = Comment.new(comments_params)
    if @comment.save
      render :show
    else
      render json: @comment.errors.full_messages, status: 422
    end
  end

  def edit
  end

  def destroy
  end

  private
  def comments_params
    params.require(:comment).permit(:body, :author_id, :video_id)
  end
end
