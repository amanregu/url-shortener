class Url < ApplicationRecord
  before_validation :generate_slug, on: [:create]
  has_many :clicks
  belongs_to :category, optional: true
  validates :original, presence: true, format: { with: URI::regexp(%w(http https)),
                                                 message: "Enter a valid URL." }, uniqueness: true
  validates :slug, presence: true, uniqueness: true, length: { is: 8 }

  private

  def generate_slug
    loop do
      self.slug = SecureRandom.alphanumeric(8)
      break unless Url.exists?(slug: slug)
    end
  end
end
