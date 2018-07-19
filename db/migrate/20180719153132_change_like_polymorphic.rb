class ChangeLikePolymorphic < ActiveRecord::Migration[5.1]
  def change
    remove_column :likes, :video_id
    add_reference :likes, :likeable, polymorphic: true, index: true
  end
end
