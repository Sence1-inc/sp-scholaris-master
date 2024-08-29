require 'digest'

class ApplicationMailer < ActionMailer::Base
  default "Message-ID"=>"#{Digest::SHA2.hexdigest(Time.now.to_i.to_s)}@sence1.com"
  default from: 'scholaris-support@sence1.com'
  layout "mailer"
end
