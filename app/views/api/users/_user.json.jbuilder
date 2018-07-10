json.extract! user, :id, :username
json.profile_img_url asset_path(user.avatar.url)
json.banner_img_url asset_path(user.banner.url)
json.likedVideoIds user.liked_video_ids

json.subCount user.subscribers.count

subscriberIds = user.subscribers.each_with_object({}) do |sub, hash|
  hash[sub.subscriber_id] = sub.id
end

json.subscriber_ids subscriberIds


subscribedToIds = user.subscriptions.each_with_object({}) do |sub, hash|
  hash[sub.subscribee_id] = sub.id
end

json.subscribed_to_ids subscribedToIds
