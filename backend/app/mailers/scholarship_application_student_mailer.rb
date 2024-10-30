class ScholarshipApplicationStudentMailer < ApplicationMailer
  default from: 'scholaris-support@sence1.com'

  def mail_to_student(student_email, scholarship_name, pdf_attachment, provider_name)
    @user_message = user_message
    @student_email = student_email
    @student_name = student_name
    @provider_name = provider_name

    mail(to: student_email, subject: "You've successfully sent your scholarship application for #{scholarship_name}") do |format|
      format.html
      attachments['application.pdf'] = pdf_attachment.read if pdf_attachment.present?
    end
  end
end
