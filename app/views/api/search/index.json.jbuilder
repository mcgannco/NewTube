video_ids = []

  @videos.each do |video|
    video_ids << video.id
    json.set! video.id do
      json.partial! "api/videos/video", video: video
    end
end

json.video_ids video_ids

all_users = @videos.map{ |video| video.uploader } + @users

json.set! :users do
  all_users.uniq.each do |user|
    json.set! user.id do
      json.partial! "api/users/user", user: user
    end
  end
end

json.search_user_ids @users.map { |user| user.id }
