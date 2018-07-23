trending_video_ids = []
@trending_videos.each do |video|
  trending_video_ids << video.id
  json.set! video.id do
    json.partial! 'api/videos/video', video: video
  end
end

json.trending_video_ids trending_video_ids.uniq
