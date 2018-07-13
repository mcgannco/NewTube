# == Schema Information
#
# Table name: watchlaters
#
#  id         :bigint(8)        not null, primary key
#  user_id    :integer          not null
#  video_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Watchlater < ApplicationRecord
  validates :user_id, :video_id, presence: true
  validates_uniqueness_of :user_id, :scope => [:video_id]

  belongs_to :user,
    class_name: 'User',
    foreign_key: :user_id

  belongs_to :video,
    class_name: 'Video',
    foreign_key: :video_id

end
