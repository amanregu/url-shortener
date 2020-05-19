class AddIsPinnedColumnToUrls < ActiveRecord::Migration[6.0]
  def change
    add_column :urls, :is_pinned, :boolean, default: false, null: false
  end
end
