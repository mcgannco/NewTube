# == Schema Information
#
# Table name: videos
#
#  id                :bigint(8)        not null, primary key
#  description       :text             not null
#  title             :string           not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  clip_file_name    :string
#  clip_content_type :string
#  clip_file_size    :integer
#  clip_updated_at   :datetime
#  author_id         :integer
#

class Video < ApplicationRecord
  validates :title, :description, :author_id, presence: true
  validates :author_id, uniqueness: { scope: :title, message: "video titles must be unique"},
  unless: Proc.new {|video| video.title.blank? }

  belongs_to :uploader,
    class_name: :User,
    foreign_key: :author_id,
    primary_key: :id

  has_attached_file :clip, default_url: 'movie.mp4', styles: {
    medium: { geometry: "640x480", format: 'mp4'  },
    thumb:  { geometry: "300x170", format: 'jpeg' },
    }, :processors => [:transcoder]
  validates_attachment_content_type :clip, content_type: /\Avideo\/.*\Z/

end
