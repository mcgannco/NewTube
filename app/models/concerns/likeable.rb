module Likeable
  extend ActiveSupport::Concern

  included do
    has_many :likes, :as => :likeable, dependent: :destroy
  end

  def receive_like(name)
    self.likes.find_or_create_by(name: name)
  end
end
