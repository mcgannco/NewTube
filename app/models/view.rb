# == Schema Information
#
# Table name: views
#
#  id         :bigint(8)        not null, primary key
#  user_id    :integer          not null
#  video_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class View < ApplicationRecord
  validates :user_id, :video_id, presence: true
  belongs_to :user
  belongs_to :video
end
