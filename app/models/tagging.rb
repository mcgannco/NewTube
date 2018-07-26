# == Schema Information
#
# Table name: taggings
#
#  id         :bigint(8)        not null, primary key
#  tag_id     :integer          not null
#  video_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Tagging < ApplicationRecord
  belongs_to :tag
  belongs_to :video

  validates :video_id, :tag_id, presence: true
  validates :tag_id, uniqueness: { scope: :video_id }
end
