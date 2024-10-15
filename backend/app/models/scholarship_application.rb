class ScholarshipApplication < ApplicationRecord
  belongs_to :scholarship
  belongs_to :user

  SUBMITTED = 1
  UNDER_REVIEW = 2
  SHORTLISTED = 3
  INTERVIEW_SCHEDULED = 4
  INTERVIEW_COMPLETED = 5
  RECOMMENDED = 6
  APPROVED = 7
  AWARDED = 8
  REJECTED = 9
  WAITLISTED = 10
  WITHDRAWN = 11
  DEFERRED = 12
  INCOMPLETE = 13

  APPLICATION_STATUSES = {
    submitted: SUBMITTED, # The application has been submitted by the student and is awaiting review.
    under_review: UNDER_REVIEW, # The application is being reviewed by the scholarship provider.
    shortlisted: SHORTLISTED, # The applicant has been shortlisted for further consideration.
    interview_scheduled: INTERVIEW_SCHEDULED, # The applicant has been selected for an interview, and a date has been set.
    interview_completed: INTERVIEW_COMPLETED, # The interview has taken place, and the application is under further evaluation.
    recommended: RECOMMENDED, # The application has been recommended for approval by the review panel.
    approved: APPROVED, # The scholarship application has been approved, pending final confirmation.
    awarded: AWARDED, # The scholarship has been awarded to the applicant.
    rejected: REJECTED, # The application has been declined.
    waitlisted: WAITLISTED, # The applicant is on the waitlist and may be considered if a spot opens up.
    withdrawn: WITHDRAWN, # The application has been withdrawn by the student or the process has been canceled.
    deferred: DEFERRED, # The decision on the application has been postponed for a later date.
    incomplete: INCOMPLETE # The application is missing required information or documentation and cannot be processed until completed.
  }.freeze

  default_scope -> { where(deleted_at: nil) }

  def as_json(options = {})
    super(options.merge(include: [:scholarship], except: [:created_at, :deleted_at]))
  end
end
