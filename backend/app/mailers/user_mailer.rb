class UserMailer < ApplicationMailer
    default to: -> { Admin.pluck(:email) },
          from: 'notification@example.com'

    def newsletter
        @user = params[:user]
        @user_type = params[:user_type]
        @url  = 'http://example.com/login'
        mail(to: @user.email, subject: 'Latest News', content: 'This is the content of the newsletter. It can include HTML for formatting.', user_type: @user_type)
    end
end