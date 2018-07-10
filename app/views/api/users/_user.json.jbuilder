json.extract! user, :id, :username
json.profile_img_url asset_path(user.avatar.url)
json.banner_img_url asset_path(user.banner.url)
json.likedVideoIds user.liked_video_ids

json.subscriberIds user.subscribed_channel_ids
json.subscribeeIds user.subsciber_channel_ids
