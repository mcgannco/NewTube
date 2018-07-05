class AddAttachmentBannerToUsers < ActiveRecord::Migration[5.1]
  def self.up
    change_table :users do |t|
      t.attachment :banner
    end
  end

  def self.down
    remove_attachment :users, :banner
  end
end
