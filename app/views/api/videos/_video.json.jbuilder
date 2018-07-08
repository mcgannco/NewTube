json.extract! video, :id, :author_id, :title, :description, :comment_ids
json.video_url asset_path(video.clip.url)
json.partial! "util/time", timestamp: video.created_at

likes_dislikes = video.likes_dislikes
json.likes likes_dislikes[0]
json.dislikes likes_dislikes[1]

c_u_like = current_user.likes.find_by(video_id: video.id) if logged_in?
if logged_in? && c_u_like
  json.currentUsersLike do
    json.extract! c_u_like, :user_id, :video_id, :id, :like_value
  end
else
  json.currentUsersLike do
    json.like_value  "N/A"
  end
end
