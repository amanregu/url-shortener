class CreateClicks < ActiveRecord::Migration[6.0]
  def change
    create_table :clicks do |t|
      t.references :url, null: false, foreign_key: true

      t.timestamps
    end
  end
end
