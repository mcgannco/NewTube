json.extract! video, :id, :author_id, :title, :description
json.video_url asset_path(video.clip.url)
