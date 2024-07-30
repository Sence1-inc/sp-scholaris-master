class ScholarshipApplicationMailer < ApplicationMailer
  default from: 'support-scholarhis@sence1.com'

  def application_email(recipient_email, user_message, provider_name, scholarship_name, student_name, student_email, pdf_attachment)
    @user_message = user_message
    @student_email = student_email
    @student_name = student_name
    @provider_name = provider_name
    @promotional_message = <<-PROMOTIONAL_MESSAGE
      <p>The Scholaris team would also want to take this opportunity to highlight the benefits of partnering with Scholaris:</p>
      <ul>
        <li><strong>Increased Visibility:</strong> Our platform connects students from diverse backgrounds with scholarship opportunities, enhancing the reach and impact of your scholarship program.</li>
        <li><strong>Streamlined Application Process:</strong> Our app will simplify the application process, ensuring that your scholarship reaches motivated and qualified candidates efficiently. This functionality will be shipped soon. Stay tuned!</li>
        <li><strong>Targeted Outreach:</strong> Our app is designed to help students find scholarships that align with their goals, increasing the likelihood of a successful match.</li>
      </ul>
      <p>We encourage you to review the student's application and consider their intent letter. Should you have any questions or need further information, please don't hesitate to reach out.</p>
    PROMOTIONAL_MESSAGE

    mail(to: recipient_email, cc: student_email, subject: "#{student_name} Intent to Apply for #{scholarship_name} through Scholaris App") do |format|
      format.html
      if pdf_attachment.present?
        attachments['application.pdf'] = pdf_attachment.read
      end
    end
  end
end



