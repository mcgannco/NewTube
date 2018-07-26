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


end
