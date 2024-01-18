class NewsletterService
  attr_reader :id, :subject, :content, :user_type, :subscribers_count

  def initialize(params)
    @subject = params[:subject]
    @content = params[:content]
    @user_type = params[:user_type]
  end

  def send_newsletter
    @subscribers = Subscriber.where(unsubscribed_at: nil)
    has_no_user_type = @subscribers.where.not(user_type: user_type).count.zero?

    if user_type == 'provider' && !has_no_user_type
      send_to_providers
    elsif user_type == 'student' && !has_no_user_type
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

    @subscribers.where(user_type: user_type).each do |subscriber|
      NewsletterLog.create(
        newsletter: newsletter,
        email: subscriber.email
      )
    end

    @id = newsletter.id

    newsletter
  end

  def send_to_providers
    UserMailer.with(subject: subject, content: content)
              .send_to_providers(@subject, @content)
              .deliver_now
  end

  def send_to_students
    UserMailer.with(subject: subject, content: content)
              .send_to_students(@subject, @content)
              .deliver_now
  end
end
