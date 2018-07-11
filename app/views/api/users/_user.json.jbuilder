json.extract! user, :id, :username
formatted_time  = user.created_at.to_f * 1000
json.timestamp formatted_time

json.profile_img_url asset_path(user.avatar.url)
json.banner_img_url asset_path(user.banner.url)
json.likedVideoIds user.liked_video_ids

json.subscriberIds user.subscribed_channel_ids
json.subscribeeIds user.subsciber_channel_ids
