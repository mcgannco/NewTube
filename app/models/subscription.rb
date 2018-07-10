# == Schema Information
#
# Table name: subscriptions
#
#  id            :bigint(8)        not null, primary key
#  subscriber_id :integer          not null
#  subscribee_id :integer          not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class Subscription < ApplicationRecord
  validates :subscriber_id, :subscribee_id, presence: true
  validates_uniqueness_of :subscriber_id, :scope => [:subscribee_id]
  validate :no_self_subscription

  belongs_to :subscriber,
    class_name: 'User'

  belongs_to :subscribee,
    class_name: 'User'

  def no_self_subscription
    errors[:base] << 'Cannot subscribe to own channel' if self.subscriber_id == self.subscribee_id
  end

end
