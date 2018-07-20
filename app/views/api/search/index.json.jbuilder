video_ids = []
json.set! :videos do
  @videos.each do |vid|
    video_ids << vid.id
    json.set! video.id do
      json.partial! 'video', video: video
    end
  end
end

json.video_ids video_ids

all_users = @videos.map{ |video| video.uploader } + @users

json.set! :users do
  all_users.uniq.each do |user|
    json.set! user.id do
      json.partial! 'user', user: user
    end
  end
end

json.search_user_ids @users.map { |user| user.id }
