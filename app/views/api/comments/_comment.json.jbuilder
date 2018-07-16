json.extract! comment, :id, :body, :author_id, :video_id, :parent_comment_id, :child_comment_ids
json.partial! "util/time", timestamp: comment.created_at
