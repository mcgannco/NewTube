# == Schema Information
#
# Table name: videos
#
#  id                :bigint(8)        not null, primary key
#  description       :text             not null
#  title             :string           not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  clip_file_name    :string
#  clip_content_type :string
#  clip_file_size    :integer
#  clip_updated_at   :datetime
#  author_id         :integer
#  view_count        :integer          default(0), not null
#

require 'test_helper'

class VideoTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
