class ScholarshipApplicationMailer < ApplicationMailer
  default from: 'scholaris-support@sence1.com'

  def application_email(recipient_email, user_message, provider_name, scholarship_name, student_name, student_email, pdf_attachment)
    @url = ENV['BACKEND_URL']
    @user_message = user_message
    @student_email = student_email
    @recipient_email = recipient_email
    @student_name = student_name
    @provider_name = provider_name
    @promotional_message = <<-PROMOTIONAL_MESSAGE
      <p>Would you like to attract more scholars? Struggling to look for applicants?</p>
      <p>Scholaris will help you to connect to qualified candidates.</p>
    PROMOTIONAL_MESSAGE

    mail(to: recipient_email, reply_to: student_email, cc: student_email, subject: "#{student_name} Intent to Apply for #{scholarship_name} through Scholaris App") do |format|
      format.html
      if pdf_attachment.present?
        attachments['application.pdf'] = pdf_attachment.read
      end
    end
  end
end



