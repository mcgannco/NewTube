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
#  view_count        :integer          default(0), not null
#

class Video < ApplicationRecord
  include Likeable

  validates :title, :description, :author_id, :view_count, presence: true
  validates :author_id, uniqueness: { scope: :title, message: "video titles must be unique"},
  unless: Proc.new {|video| video.title.blank? }

  belongs_to :uploader,
    class_name: :User,
    foreign_key: :author_id,
    primary_key: :id

  has_many :comments,
    class_name: :Comment,
    foreign_key: :video_id,
    primary_key: :id,
    dependent: :destroy

  has_many :likers, :through => :likes, :source => :likeable,
   :source_type => 'User'

  has_many :watchlaters,
    foreign_key: :video_id,
    class_name: :Watchlater,
    primary_key: :id,
    dependent: :destroy

  has_many :views,
    dependent: :destroy

  has_many :taggings,
    dependent: :destroy

  has_many :tags,
    through: :taggings

  has_attached_file :clip, styles: {
    medium: { geometry: "640x480", format: 'mp4'  },
    thumb:  { geometry: "300x170", format: 'jpeg' },
    }, :processors => [:transcoder]
  validates_attachment_content_type :clip, content_type: /\Avideo\/.*\Z/

  def likes_dislikes
      like_count = 0
      dislike_count = 0
      self.likes.each do |like|
        like.like_value ? like_count += 1 : dislike_count += 1
      end
      [like_count, dislike_count]
  end

  def self.trending_videos
    Video
    .left_joins(:views)
    .where(views: { created_at: (1.week.ago.in_time_zone)..Time.zone.now })
    .group(:id)
    .order('COUNT(views.id) DESC')
    .limit(10)
  end

  def tag_names=(tag_names)
    self.tags = tag_names.map do |tag_name|
      tag_name.strip!
      self.tags.find_or_create_by(name: tag_name)
    end
  end

  def tag_names
    tags.map(&:name)
  end

  def tags_string
    tags.map(&:name).join(', ')
  end

  def tag(name)
    name.strip!
    tag = Tag.find_or_create_by(name: name)
    self.taggings.find_or_create_by(tag_id: tag.id)
  end

end
