json.extract! comment, :id, :body, :author_id, :video_id, :parent_comment_id, :child_comment_ids
json.partial! "util/time", timestamp: comment.created_at

likes_dislikes = comment.likes_dislikes
json.likes likes_dislikes[0]
json.dislikes likes_dislikes[1]

c_u_like = current_user.likes.where(likeable_type: "Comment").find_by(likeable_id: comment.id) if logged_in?
if logged_in? && c_u_like
  json.currentUsersLike do
    json.extract! c_u_like, :user_id, :likeable_id, :id, :like_value
  end
else
  json.currentUsersLike do
    json.like_value  "N/A"
  end
end
