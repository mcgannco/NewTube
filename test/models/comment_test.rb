# == Schema Information
#
# Table name: comments
#
#  id                :bigint(8)        not null, primary key
#  body              :text             not null
#  video_id          :integer          not null
#  author_id         :integer          not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  parent_comment_id :integer
#

require 'test_helper'

class CommentTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
