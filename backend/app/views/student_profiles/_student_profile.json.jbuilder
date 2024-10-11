json.extract! student_profile, :id, :created_at, :updated_at
json.url student_profile_url(student_profile, format: :json)
