class Category < ApplicationRecord
  has_many :urls, dependent: :nullify
  validates :title, presence: true, uniqueness: true
end
