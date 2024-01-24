class NewsletterService
  attr_reader :id, :subject, :content, :user_type

  def initialize(params)
    @subject = params[:subject]
    @content = params[:content]
    @user_type = params[:user_type]
  end

  def send_newsletter
    @subscribers = Subscriber.where(deleted_at: nil)
    has_no_subscriber = @subscribers.where(user_type: user_type).count.zero?

    if user_type == PROVIDER_TYPE && !has_no_subscriber
      send_to_providers
    elsif user_type == STUDENT_TYPE && !has_no_subscriber
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

    @subscribers.where(user_type: user_type, deleted_at: nil).each do |subscriber|
      NewsletterLog.create(
        newsletter: newsletter,
        email: subscriber.email
      )
    end

    @id = newsletter.id

    newsletter
  end

  def send_to_providers
    @subscribers.each do |subscriber|
      @subscriber_id = subscriber.id
      UserMailer.with(subject: subject, content: content)
                .send_to_providers(@subject, @content, @subscriber_id)
                .deliver_now
    end
  end

  def send_to_students
    @subscribers.each do |subscriber|
      @subscriber_id = subscriber.id
      UserMailer.with(subject: subject, content: content)
                .send_to_students(@subject, @content, @subscriber_id)
                .deliver_now
    end
  end
end
