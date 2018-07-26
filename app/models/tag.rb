# == Schema Information
#
# Table name: tags
#
#  id         :bigint(8)        not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Tag < ApplicationRecord
  validates :name, presence: true
  validates :name, uniqueness: true

  has_many :taggings, dependent: :destroy
  has_many :videos, through: :taggings

  def self.top_tags
    self
    .left_joins(:taggings)
    .group(:id)
    .order('COUNT(taggings.tag_id) DESC')
    .limit(5)
  end

end
