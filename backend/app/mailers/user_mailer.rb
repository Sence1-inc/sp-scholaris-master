class UserMailer < ApplicationMailer
  default from: 'roan.dino@sence1.com'

  def send_to_providers(subject, content, email, subscriber_id)
    @content = content
    @subscriber_id = subscriber_id
    @email = email
    providers = Subscriber.where(user_type: PROVIDER_TYPE, deleted_at: nil)

    mail(to: ["no-reply@sence1.com"], bcc: providers.pluck(:email), subject: subject) if providers.any?
  end

  def send_to_students(subject, content, email, subscriber_id)
    @content = content
    @subscriber_id = subscriber_id
    @email = email
    students = Subscriber.where(user_type: STUDENT_TYPE, deleted_at: nil)

    mail(to: ["no-reply@sence1.com"], bcc: students.pluck(:email), subject: subject) if students.any?
  end

  def send_to_single_subscriber(subject, content, user_type, email, subscriber_id)
    @content = content
    @subscriber_id = subscriber_id
    @email = email
    user = Subscriber.find_by(email: email, user_type: user_type, deleted_at: nil)

    mail(to: ["no-reply@sence1.com"], bcc: email, subject: subject) if user.present?
  end

  def email_verification(user)
    @user = user
    mail(to: @user.email_address, subject: 'Verify your email')
  end
end