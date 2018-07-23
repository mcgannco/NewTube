# == Schema Information
#
# Table name: likes
#
#  id            :bigint(8)        not null, primary key
#  user_id       :integer          not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  like_value    :boolean
#  likeable_type :string
#  likeable_id   :bigint(8)
#

class Like < ApplicationRecord
  validates :user_id, :likeable_id, presence: true
  validates :user_id, uniqueness: { scope: [:likeable_id, :likeable_type],
  message: "Users may only like a video once" }
  validates :like_value, inclusion: { in: [true, false] }

  belongs_to :user
  belongs_to :likeable, :polymorphic => true

end
