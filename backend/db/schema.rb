# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_04_14_155524) do
  create_table "benefits", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "benefit_name"
    t.timestamp "created_at", default: -> { "CURRENT_TIMESTAMP" }
    t.timestamp "updated_at", default: -> { "CURRENT_TIMESTAMP" }
    t.timestamp "deleted_at"
  end

  create_table "cities", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "city_name"
    t.timestamp "created_at", default: -> { "CURRENT_TIMESTAMP" }
    t.timestamp "updated_at", default: -> { "CURRENT_TIMESTAMP" }
    t.timestamp "deleted_at"
  end

  create_table "course_scholarship_schools", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "scholarship_id", null: false
    t.bigint "course_id", null: false
    t.bigint "school_id", null: false
    t.timestamp "created_at", default: -> { "CURRENT_TIMESTAMP" }
    t.timestamp "updated_at", default: -> { "CURRENT_TIMESTAMP" }
    t.timestamp "deleted_at"
    t.index ["course_id"], name: "index_course_scholarship_schools_on_course_id"
    t.index ["scholarship_id"], name: "index_course_scholarship_schools_on_scholarship_id"
    t.index ["school_id"], name: "index_course_scholarship_schools_on_school_id"
  end

  create_table "courses", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "course_name"
    t.string "degree_level"
    t.timestamp "created_at", default: -> { "CURRENT_TIMESTAMP" }
    t.timestamp "updated_at", default: -> { "CURRENT_TIMESTAMP" }
    t.timestamp "deleted_at"
  end

  create_table "eligibilities", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.text "eligibility_text"
    t.timestamp "created_at", default: -> { "CURRENT_TIMESTAMP" }
    t.timestamp "updated_at", default: -> { "CURRENT_TIMESTAMP" }
    t.timestamp "deleted_at"
  end

  create_table "logs", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "action"
    t.integer "scholarship_id"
    t.timestamp "created_at", default: -> { "CURRENT_TIMESTAMP" }
    t.timestamp "updated_at", default: -> { "CURRENT_TIMESTAMP" }
    t.timestamp "deleted_at"
    t.index ["scholarship_id"], name: "index_logs_on_scholarship_id"
    t.index ["user_id"], name: "index_logs_on_user_id"
  end

  create_table "newsletter_logs", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "email", null: false
    t.bigint "newsletter_id"
    t.timestamp "sent_at", default: -> { "CURRENT_TIMESTAMP" }
    t.timestamp "created_at", default: -> { "CURRENT_TIMESTAMP" }
    t.timestamp "updated_at", default: -> { "CURRENT_TIMESTAMP" }
    t.datetime "deleted_at"
    t.index ["deleted_at"], name: "index_newsletter_logs_on_deleted_at"
    t.index ["email"], name: "index_newsletter_logs_on_email"
    t.index ["newsletter_id"], name: "index_newsletter_logs_on_newsletter_id"
  end

  create_table "newsletters", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "subject", null: false
    t.text "content", null: false
    t.text "user_type", null: false
    t.timestamp "created_at", default: -> { "CURRENT_TIMESTAMP" }
    t.timestamp "updated_at", default: -> { "CURRENT_TIMESTAMP" }
    t.datetime "deleted_at"
    t.index ["deleted_at"], name: "index_newsletters_on_deleted_at"
  end

  create_table "provinces", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "province_name"
    t.timestamp "created_at", default: -> { "CURRENT_TIMESTAMP" }
    t.timestamp "updated_at", default: -> { "CURRENT_TIMESTAMP" }
    t.timestamp "deleted_at"
  end

  create_table "regions", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "region_name"
    t.timestamp "created_at", default: -> { "CURRENT_TIMESTAMP" }
    t.timestamp "updated_at", default: -> { "CURRENT_TIMESTAMP" }
    t.timestamp "deleted_at"
  end

  create_table "requirements", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.text "requirements_text"
    t.timestamp "created_at", default: -> { "CURRENT_TIMESTAMP" }
    t.timestamp "updated_at", default: -> { "CURRENT_TIMESTAMP" }
    t.timestamp "deleted_at"
  end

  create_table "roles", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "role_name", null: false
    t.timestamp "created_at", default: -> { "CURRENT_TIMESTAMP" }
    t.timestamp "updated_at", default: -> { "CURRENT_TIMESTAMP" }
    t.timestamp "deleted_at"
  end

  create_table "scholarship_benefits", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "scholarship_id"
    t.bigint "benefit_id"
    t.timestamp "created_at", default: -> { "CURRENT_TIMESTAMP" }
    t.timestamp "updated_at", default: -> { "CURRENT_TIMESTAMP" }
    t.timestamp "deleted_at"
    t.index ["benefit_id"], name: "index_scholarship_benefits_on_benefit_id"
    t.index ["scholarship_id"], name: "index_scholarship_benefits_on_scholarship_id"
  end

  create_table "scholarship_eligibilities", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "scholarship_id"
    t.bigint "eligibility_id"
    t.timestamp "created_at", default: -> { "CURRENT_TIMESTAMP" }
    t.timestamp "updated_at", default: -> { "CURRENT_TIMESTAMP" }
    t.timestamp "deleted_at"
    t.index ["eligibility_id"], name: "index_scholarship_eligibilities_on_eligibility_id"
    t.index ["scholarship_id"], name: "index_scholarship_eligibilities_on_scholarship_id"
  end

  create_table "scholarship_provider_profiles", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "scholarship_provider_id", null: false
    t.string "provider_type"
    t.text "description"
    t.integer "region_id"
    t.integer "province_id"
    t.integer "city_id"
    t.timestamp "created_at", default: -> { "CURRENT_TIMESTAMP" }
    t.timestamp "updated_at", default: -> { "CURRENT_TIMESTAMP" }
    t.timestamp "deleted_at"
    t.index ["city_id"], name: "index_scholarship_provider_profiles_on_city_id"
    t.index ["province_id"], name: "index_scholarship_provider_profiles_on_province_id"
    t.index ["region_id"], name: "index_scholarship_provider_profiles_on_region_id"
    t.index ["scholarship_provider_id"], name: "index_scholarship_provider_profiles_on_scholarship_provider_id"
  end

  create_table "scholarship_providers", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "provider_name"
    t.bigint "user_id", null: false
    t.timestamp "created_at", default: -> { "CURRENT_TIMESTAMP" }
    t.timestamp "updated_at", default: -> { "CURRENT_TIMESTAMP" }
    t.timestamp "deleted_at"
    t.string "provider_link"
    t.index ["user_id"], name: "index_scholarship_providers_on_user_id"
  end

  create_table "scholarship_requirements", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "scholarship_id"
    t.bigint "requirement_id"
    t.timestamp "created_at", default: -> { "CURRENT_TIMESTAMP" }
    t.timestamp "updated_at", default: -> { "CURRENT_TIMESTAMP" }
    t.timestamp "deleted_at"
    t.index ["requirement_id"], name: "index_scholarship_requirements_on_requirement_id"
    t.index ["scholarship_id"], name: "index_scholarship_requirements_on_scholarship_id"
  end

  create_table "scholarship_types", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "scholarship_type_name"
    t.timestamp "created_at", default: -> { "CURRENT_TIMESTAMP" }
    t.timestamp "updated_at", default: -> { "CURRENT_TIMESTAMP" }
    t.timestamp "deleted_at"
  end

  create_table "scholarships", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "scholarship_name", null: false
    t.datetime "start_date"
    t.datetime "due_date", null: false
    t.string "application_link"
    t.string "school_year", null: false
    t.integer "scholarship_provider_id"
    t.bigint "requirement_id"
    t.bigint "eligibility_id"
    t.bigint "scholarship_type_id"
    t.timestamp "created_at", default: -> { "CURRENT_TIMESTAMP" }
    t.timestamp "updated_at", default: -> { "CURRENT_TIMESTAMP" }
    t.timestamp "deleted_at"
    t.string "description"
    t.string "status"
    t.index ["eligibility_id"], name: "index_scholarships_on_eligibility_id"
    t.index ["requirement_id"], name: "index_scholarships_on_requirement_id"
    t.index ["scholarship_provider_id"], name: "index_scholarships_on_scholarship_provider_id"
    t.index ["scholarship_type_id"], name: "index_scholarships_on_scholarship_type_id"
  end

  create_table "schools", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "school_name"
    t.bigint "region_id"
    t.bigint "province_id"
    t.bigint "city_id"
    t.timestamp "created_at", default: -> { "CURRENT_TIMESTAMP" }
    t.timestamp "updated_at", default: -> { "CURRENT_TIMESTAMP" }
    t.timestamp "deleted_at"
    t.index ["city_id"], name: "index_schools_on_city_id"
    t.index ["province_id"], name: "index_schools_on_province_id"
    t.index ["region_id"], name: "index_schools_on_region_id"
  end

  create_table "sessions", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "uuid", null: false
    t.bigint "user_id", null: false
    t.string "token"
    t.timestamp "created_at", default: -> { "CURRENT_TIMESTAMP" }
    t.timestamp "updated_at", default: -> { "CURRENT_TIMESTAMP" }
    t.timestamp "deleted_at"
    t.index ["user_id"], name: "index_sessions_on_user_id"
    t.index ["uuid"], name: "index_sessions_on_uuid", unique: true
  end

  create_table "student_profiles", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "avatar"
    t.timestamp "created_at", default: -> { "CURRENT_TIMESTAMP" }
    t.timestamp "updated_at", default: -> { "CURRENT_TIMESTAMP" }
    t.timestamp "deleted_at"
    t.index ["user_id"], name: "index_student_profiles_on_user_id"
  end

  create_table "subscribers", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "email", null: false
    t.string "user_type", null: false
    t.timestamp "subscribed_at", default: -> { "CURRENT_TIMESTAMP" }
    t.timestamp "deleted_at"
    t.timestamp "created_at", default: -> { "CURRENT_TIMESTAMP" }
    t.timestamp "updated_at", default: -> { "CURRENT_TIMESTAMP" }
    t.index ["email"], name: "index_subscribers_on_email", unique: true
  end

  create_table "survey_questions", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.text "question_text", null: false
    t.string "user_type", null: false
    t.timestamp "created_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.timestamp "updated_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.datetime "deleted_at"
    t.index ["deleted_at"], name: "index_survey_questions_on_deleted_at"
  end

  create_table "survey_responses", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "email", null: false
    t.bigint "user_id"
    t.json "responses"
    t.timestamp "created_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.timestamp "updated_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.datetime "deleted_at"
    t.string "classification"
    t.index ["deleted_at"], name: "index_survey_responses_on_deleted_at"
    t.index ["email"], name: "index_survey_responses_on_email", unique: true
    t.index ["user_id"], name: "fk_survey_responses_users"
  end

  create_table "user_scholarships", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "scholarship_id"
    t.bigint "user_id", null: false
    t.integer "application_status", null: false
    t.timestamp "created_at", default: -> { "CURRENT_TIMESTAMP" }
    t.timestamp "updated_at", default: -> { "CURRENT_TIMESTAMP" }
    t.timestamp "deleted_at"
    t.index ["scholarship_id"], name: "index_user_scholarships_on_scholarship_id"
    t.index ["user_id"], name: "index_user_scholarships_on_user_id"
  end

  create_table "users", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "email_address", null: false
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "birthdate", null: false
    t.boolean "is_active", default: true, null: false
    t.bigint "role_id", null: false
    t.string "session_token"
    t.timestamp "created_at", default: -> { "CURRENT_TIMESTAMP" }
    t.timestamp "updated_at", default: -> { "CURRENT_TIMESTAMP" }
    t.timestamp "deleted_at"
    t.string "uuid"
    t.string "verification_token"
    t.boolean "is_verified"
    t.index ["email_address"], name: "index_users_on_email_address", unique: true
    t.index ["role_id"], name: "index_users_on_role_id"
  end

  add_foreign_key "course_scholarship_schools", "courses", name: "fk_course_scholarship_schools_courses"
  add_foreign_key "course_scholarship_schools", "scholarships", name: "fk_course_scholarship_schools_scholarships"
  add_foreign_key "course_scholarship_schools", "schools", name: "fk_course_scholarship_schools_schools"
  add_foreign_key "newsletter_logs", "newsletters"
  add_foreign_key "scholarship_benefits", "benefits", name: "fk_scholarship_benefits_benefits"
  add_foreign_key "scholarship_benefits", "benefits", name: "fk_scholarships_benefits"
  add_foreign_key "scholarship_benefits", "scholarships", name: "fk_scholarship_benefits_scholarships"
  add_foreign_key "scholarship_provider_profiles", "scholarship_providers", name: "fk_scholarship_provider_profiles_scholarship_providers"
  add_foreign_key "scholarship_providers", "users", name: "fk_scholarship_providers_users"
  add_foreign_key "scholarships", "eligibilities", name: "fk_scholarships_eligibilities"
  add_foreign_key "scholarships", "requirements", name: "fk_scholarships_requirements"
  add_foreign_key "scholarships", "scholarship_types", name: "fk_scholarships_scholarship_types"
  add_foreign_key "schools", "cities", name: "fk_schools_cities"
  add_foreign_key "schools", "provinces", name: "fk_schools_provinces"
  add_foreign_key "schools", "regions", name: "fk_schools_regions"
  add_foreign_key "sessions", "users", name: "fk_sessions_users"
  add_foreign_key "student_profiles", "users", name: "fk_student_profiles_users"
  add_foreign_key "survey_responses", "users", name: "fk_survey_responses_users"
  add_foreign_key "user_scholarships", "scholarships", name: "fk_user_scholarships_scholarships"
  add_foreign_key "user_scholarships", "users", name: "fk_user_scholarships_users"
  add_foreign_key "users", "roles", name: "fk_users_roles"
end
