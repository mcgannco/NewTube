class Api::LikesController < ApplicationController
  def create
   @user = current_user
   @like = current_user.likes.new(like_value: params[:like][:like_value])
   if params[:comment_id]
     @like.likeable_type = "Comment"
     @like.likeable_id = params[:comment_id]

     if @like.save
       @comment = Comment.find(params[:comment_id])
       render 'api/comments/show'
     else
       render json: @like.errors.full_messages, status: 422
     end
   else
     @like.likeable_type = "Video"
     @like.likeable_id = params[:video_id]

     if @like.save
       @video = Video.find(params[:video_id])
       render 'api/videos/show'
     else
       render json: @like.errors.full_messages, status: 422
     end
   end
 end

 def update
   @user = current_user
    if params[:comment_id]
      @like = current_user.likes.where(likeable_type: "Comment").find_by(likeable_id: params[:comment_id])
      if @like.update(like_value: (params[:like][:like_value] == 'true'))
        @comment = Comment.find(params[:comment_id])
        render 'api/comments/show'
      else
        render json: @like.errors.full_messages, status: 422
      end
    else
      @like = current_user.likes.where(likeable_type: "Video").find_by(likeable_id: params[:video_id])
       if @like.update(like_value: (params[:like][:like_value] == 'true'))
         @video = Video.find(params[:video_id])
         render 'api/videos/show'
       else
         render json: @like.errors.full_messages, status: 422
       end
    end
 end

 def destroy
   @like = current_user.likes.find(params[:id])
   if @like.likeable_type === "Comment"
     @comment = Comment.find(@like.likeable_id)
     if @like.destroy
         render 'api/comments/show'
     else
       render json: ["Error"]
     end
   else
     @video = Video.find(@like.likeable_id)
     if @like.destroy
         render 'api/videos/show'
     else
       render json: ["Error"]
     end
   end
 end
end
