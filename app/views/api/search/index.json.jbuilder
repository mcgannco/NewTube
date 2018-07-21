video_ids = []
if params[:query] == ""
  @videos = []
  @users = []
end
json.set! :videos do
  @videos.each do |video|
    video_ids << video.id
    json.set! video.id do
      json.partial! 'api/videos/video', video: video
    end
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

json.user_ids all_users.uniq.map { |user| user.id }
