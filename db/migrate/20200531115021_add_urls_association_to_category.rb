class AddUrlsAssociationToCategory < ActiveRecord::Migration[6.0]
  def change
    add_reference :urls, :category, foreign_key: true
  end
end
