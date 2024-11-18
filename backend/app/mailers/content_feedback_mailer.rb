class ContentFeedbackMailer < ApplicationMailer
  default from: 'scholaris-support@sence1.com'

  def feedback_email(provider_email, provider_name, scholarship_name, feedback)
    @provider_email = provider_email
    @provider_name = provider_name
    @scholarship_name = scholarship_name
    @feedback = feedback
    mail(to: @provider_email, subject: 'Recommendations for Your Scholarship Content')
  end
end
