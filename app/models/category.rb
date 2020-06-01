class Category < ApplicationRecord
  has_many :urls, dependent: :nullify
  validates :title, presence: true, uniqueness: { case_sensitive: false }
end
