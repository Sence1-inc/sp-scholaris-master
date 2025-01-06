json.extract! scholarship_feedback, :id, :scholarship_provider_id, :feedback, :created_by_id, :created_at, :updated_at
json.url scholarship_feedback_url(scholarship_feedback, format: :json)
