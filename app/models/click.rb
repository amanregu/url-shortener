class Click < ApplicationRecord
  belongs_to :url, dependent: :destroy
  validates :url_id, presence: true
end
