json.set! :videos do
  @next_videos.each do |video|
    json.set! video.id do
      json.partial! 'api/videos/video', video: video
    end
  end
end

all_users = [current_user] + @next_videos.map{ |video| video.uploader }

json.set! :users do
  all_users.each do |user|
    json.set! user.id do
      json.partial! "api/users/user", user: user
    end
  end
end

json.history_video_ids @next_videos.map{ |vid| vid.id }

json.number_of_history_videos @history_video_count
