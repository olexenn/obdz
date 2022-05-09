FactoryBot.define do
  factory :extract do
    law_number { "" }
    qualification { "MyString" }
    applicant_first_name { "MyString" }
    applicant_last_name { "MyString" }
    description { "MyText" }
    suspect { "MyString" }
    authority { "MyString" }
    user { nil }
  end
end
