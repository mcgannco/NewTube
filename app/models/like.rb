# == Schema Information
#
# Table name: likes
#
#  id         :bigint(8)        not null, primary key
#  user_id    :integer          not null
#  video_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  like_value :boolean
#

class Like < ApplicationRecord
  validates :user_id, :video_id, presence: true
  validates :user_id, uniqueness: { scope: :video_id,
    message: "Users may only like a video once" }
  validates :like_value, inclusion: { in: [true, false] }

  belongs_to :user
  belongs_to :video
end