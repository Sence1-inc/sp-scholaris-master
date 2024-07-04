class NewsletterService
  attr_reader :id, :subject, :content, :user_type

  def initialize(params)
    @subject = params[:subject]
    @content = params[:content]
    @user_type = params[:user_type]
    @to_subscriber = params[:email]
  end
  

  def send_newsletter
    if @to_subscriber.present?
      send_to_single_subscriber(@to_subscriber)
    else
      @subscribers = Subscriber.where(deleted_at: nil, user_type: user_type)
      return false if @subscribers.count.zero?

      if user_type == PROVIDER_TYPE
        send_to_providers
      elsif user_type == STUDENT_TYPE
        send_to_students
      else
        return false
      end

      save_newsletter_details
      true
    end
  end

  private

  def send_to_single_subscriber(to_subscriber)
    subscriber = Subscriber.find_by(email: to_subscriber, user_type: user_type, deleted_at: nil) if to_subscriber.present?
    return false unless subscriber

    newsletter = Newsletter.create(
      subject: @subject,
      content: @content,
      user_type: @user_type
    )

    NewsletterLog.create(
      newsletter: newsletter,
      email: subscriber.email
    )

    @id = newsletter.id
    
    UserMailer.with(subject: @subject, content: @content)
              .send_to_single_subscriber(@subject, @content, @user_type, subscriber.email, subscriber.id)
              .deliver_now

    true
  end

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
      UserMailer.with(subject: subject, content: content)
                .send_to_providers(@subject, @content, subscriber.email, subscriber.id)
                .deliver_now
    end
  end

  def send_to_students
    @subscribers.each do |subscriber|
      UserMailer.with(subject: subject, content: content)
                .send_to_students(@subject, @content, subscriber.email, subscriber.id)
                .deliver_now
    end
  end
end
