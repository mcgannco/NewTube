class Api::CommentsController < ApplicationController
  def index
    @comments = Comment.all.includes(:video, :author,:child_comments, :parent_comment, :likes)
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

  def update
    @comment = Comment.find_by(id: params[:id])
    if @comment.update(comments_params)
      render :show
    else
      render json: ['update failed'], status: 422
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy!
    render :show
  end

  private
  def comments_params
    params.require(:comment).permit(:body, :author_id, :video_id, :parent_comment_id)
  end
end
