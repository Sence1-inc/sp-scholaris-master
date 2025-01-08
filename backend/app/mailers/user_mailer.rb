class UserMailer < ApplicationMailer
  default from: 'scholaris-support@sence1.com'

  def send_to_providers(subject, content, email, subscriber_id)
    @content = content
    @url = ENV['BACKEND_URL']
    @subscriber_id = subscriber_id
    @email = email
    providers = Subscriber.where(user_type: PROVIDER_TYPE, deleted_at: nil)

    providers.each do |provider|
      mail(to: provider.email, subject: subject).deliver_now
    end
  end

  def send_to_students(subject, content, email, subscriber_id)
    @content = content
    @url = ENV['BACKEND_URL']
    @subscriber_id = subscriber_id
    students = Subscriber.where(user_type: STUDENT_TYPE, deleted_at: nil)

    students.each do |student|
      mail(to: student.email, subject: subject).deliver_now
    end
  end


  def send_to_single_subscriber(subject, content, user_type, email, subscriber_id)
    @content = content
    @subscriber_id = subscriber_id
    @email = email
    @url = ENV['BACKEND_URL']
    user = Subscriber.find_by(email: email, user_type: user_type, deleted_at: nil)

    mail(to: email, subject: subject) if user.present?
  end

  def email_verification(user)
    @user = user
    @url = ENV['BACKEND_URL']
    mail(to: @user.email_address, subject: 'Verify Your Email for Scholaris')
  end
end