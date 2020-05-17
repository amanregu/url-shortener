class MakeOriginalAndSlugNotNullable < ActiveRecord::Migration[6.0]
  def change
    change_column_null :urls, :original, false
    change_column_null :urls, :slug, false
  end
end
