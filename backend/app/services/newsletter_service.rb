class NewsletterService
  attr_reader :id, :subject, :content, :user_type, :subscribers_count

  def initialize(params)
    @subject = params[:subject]
    @content = params[:content]
    @user_type = params[:user_type]
    @subscribers_count = 0
  end

  def send_newsletter
    if user_type == 'provider'
      send_to_providers
    elsif user_type == 'student'
      send_to_students
    else
      return false
    end

    save_newsletter_details

    true
  end

  private

  def save_newsletter_details
    newsletter = Newsletter.create(
      subject: @subject,
      content: @content,
      user_type: @user_type
    )

    subscribers = Subscriber.where(unsubscribed_at: nil)

    subscribers.each do |subscriber|
      NewsletterLog.create(
        newsletter: newsletter,
        email: subscriber
      )
    end
  end

  def send_to_providers
    UserMailer.with(subject: subject, content: content, user_type: user_type)
              .send_to_providers(@subject, @content).deliver_now

    @subscribers_count = ActionMailer::Base.deliveries.size
  end

  def send_to_students
    UserMailer.with(subject: subject, content: content, user_type: user_type)
              .send_to_students.deliver_now

    @subscribers_count = ActionMailer::Base.deliveries.size
  end
end
