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

class Comment < ApplicationRecord
  include Likeable

  belongs_to :video,
    class_name: :Video,
    foreign_key: :video_id,
    primary_key: :id

  belongs_to :author,
    class_name: :User,
    foreign_key: :author_id,
    primary_key: :id

  has_many :child_comments,
    class_name: :Comment,
    foreign_key: :parent_comment_id,
    primary_key: :id,
    dependent: :destroy

  belongs_to :parent_comment,
    class_name: :Comment,
    foreign_key: :parent_comment_id,
    primary_key: :id,
    optional: true

    has_many :likers, :through => :likes, :source => :likeable,
     :source_type => 'User'

   def likes_dislikes
       like_count = 0
       dislike_count = 0
       self.likes.each do |like|
         like.like_value ? like_count += 1 : dislike_count += 1
       end
       [like_count, dislike_count]
   end
end
