json.extract! video, :id, :author_id, :title, :description
json.audio_url asset_path(video.clip.url)
