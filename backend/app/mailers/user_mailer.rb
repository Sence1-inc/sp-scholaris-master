class UserMailer < ApplicationMailer
  default from: 'roan.dino@sence1.com'

  def send_to_providers(subject, content)
    @content = content

    mail(to: Subscriber.where(unsubscribed_at: nil).pluck(:email), subject: subject)
  end

  def send_to_students(subject, content)
    @content = content

    mail(to: Subscriber.where(unsubscribed_at: nil).pluck(:email), subject: subject)
  end
end