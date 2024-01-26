class UserMailer < ApplicationMailer
  default from: 'roan.dino@sence1.com'

  def send_to_providers(subject, content, subscriber_id)
    @content = content
    @subscriber_id = subscriber_id
    providers = Subscriber.where(user_type: PROVIDER_TYPE, deleted_at: nil)

    mail(to: providers.pluck(:email), subject: subject) if providers.any?
  end

  def send_to_students(subject, content, subscriber_id)
    @content = content
    @subscriber_id = subscriber_id
    students = Subscriber.where(user_type: STUDENT_TYPE, deleted_at: nil)

    mail(to: students.pluck(:email), subject: subject) if students.any?
  end

  def send_to_single_subscriber(subject, content, user_type, email, subscriber_id)
    @content = content
    @subscriber_id = subscriber_id
    user = Subscriber.find_by(email: email, user_type: user_type, deleted_at: nil)

    mail(to: email, subject: subject) if user.present?
  end
end