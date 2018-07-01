json.extract! video, :id, :author_id, :title, :description
json.video_url asset_path(video.clip.url)
json.partial! "util/time", timestamp: video.created_at
