class CreateWatchlaters < ActiveRecord::Migration[5.1]
  def change
    create_table :watchlaters do |t|
      t.integer :user_id, null: false
      t.integer :video_id, null: false

      t.timestamps
    end
    add_index :watchlaters, [:user_id, :video_id], :unique => true
  end
end
