class ScholarshipApplicationMailer < ApplicationMailer
  default from: 'support-scholaris@sence1.com'

  def application_email(recipient_email, user_message, provider_name, scholarship_name, student_name, student_email, pdf_attachment)
    @user_message = user_message
    @student_email = student_email
    @recipient_email = recipient_email
    @student_name = student_name
    @provider_name = provider_name
    @promotional_message = <<-PROMOTIONAL_MESSAGE
      <p>We would also like to take this opportunity to introduce to you Scholaris.</p>
      <p>Scholaris is a centralized platform for scholarship offerings. Our platform enables students to search and choose from a kaleidoscope of scholarships. Through Scholaris, you can seamlessly manage and post your scholarships, increasing the chances of attracting more scholarship applicants.</p>
    PROMOTIONAL_MESSAGE

    mail(to: recipient_email, reply_to: student_email, cc: student_email, subject: "#{student_name} Intent to Apply for #{scholarship_name} through Scholaris App") do |format|
      format.html
      if pdf_attachment.present?
        attachments['application.pdf'] = pdf_attachment.read
      end
    end
  end
end



