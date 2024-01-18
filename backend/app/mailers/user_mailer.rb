class UserMailer < ApplicationMailer
  default from: 'roan.dino@sence1.com'

  def send_to_providers(subject, content)
    @content = content

    mail(to: Subscriber.where(user_type: "provider").where(unsubscribed_at: nil).pluck(:email), subject: subject)
  end

  def send_to_students(subject, content)
    @content = content

    mail(to: Subscriber.where(user_type: "student").where(unsubscribed_at: nil).pluck(:email), subject: subject)
  end
end