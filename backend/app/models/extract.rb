class Extract < ApplicationRecord
  belongs_to :user

  validates :law_number,
            presence: true,
            uniqueness: { case_sensivity: false }

  validates :qualification, presence: true
  validates :applicant_first_name, presence: true
  validates :applicant_last_name, presence: true
  validates :description, presence: true
  validates :authority, presence: true
end
