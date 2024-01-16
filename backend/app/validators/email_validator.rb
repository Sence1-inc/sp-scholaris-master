require 'resolv'

class EmailValidator
  def self.valid?(email)
    return false unless /\A[^@\s]+@[^@\s]+\z/.match?(email)

    domain = email.split('@')[1]
    return false unless domain_exists?(domain)

    true
  end

  private

  def self.domain_exists?(domain)
    Resolv::DNS.new.getresources(domain, Resolv::DNS::Resource::IN::MX).any?
  rescue Resolv::ResolvError
    false
  end
end
