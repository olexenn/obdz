class User < ApplicationRecord
  include Rails.application.routes.url_helpers

  has_secure_password
  has_one_attached :avatar
  has_many :extracts

  enum role: %i[user admin].freeze

  validates :username, presence: true
  validates :first_name, presence: true
  validates :last_name, presence: true

  def avatar_url
    avatar.attached? ? url_for(avatar) : nil
  end
end
