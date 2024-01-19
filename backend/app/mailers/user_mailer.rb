class UserMailer < ApplicationMailer
  default from: 'roan.dino@sence1.com'

  def send_to_providers(subject, content)
    @content = content
    providers = Subscriber.where(user_type: "provider").where(deleted_at: nil)

    mail(to: providers.pluck(:email), subject: subject) if providers.any?
  end

  def send_to_students(subject, content)
    @content = content
    students = Subscriber.where(user_type: "students").where(deleted_at: nil)

    mail(to: students.pluck(:email), subject: subject) if students.any?
  end
end