# json.id extract.id
# json.law_number extract.law_number
# json.qualification extract.qualification
# json.applicant_first_name extract.applicant_first_name
# json.applicant_last_name extract.applicant_last_name
# json.description extract.description
# json.suspect extract.suspect
# json.authority extract.authority

json.call(@extract)

json.user do
  json.call(@extract.user)
end
