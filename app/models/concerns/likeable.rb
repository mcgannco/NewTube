module Likeable
  extend ActiveSupport::Concern

  included do
    has_many :likes, :as => :likeable, dependent: :destroy
    has_many :likings, through: :likes
  end

  def receive_like(name)
    self.likes.find_or_create_by(name: name)
  end
end
