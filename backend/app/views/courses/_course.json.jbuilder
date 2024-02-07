json.extract! course, :id, :course_name, :degree_level, :created_at, :updated_at
json.url course_url(course, format: :json)
