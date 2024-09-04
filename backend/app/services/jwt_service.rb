class JwtService
  def self.encode(payload, exp = 24.hours.from_now)
    payload[:exp] = exp.to_i
    JWT.encode(payload, ENV['JWT_SECRET_KEY'])
  end

  def self.decode(token)
    decoded = JWT.decode(token, ENV['JWT_SECRET_KEY'], false)[0]
    HashWithIndifferentAccess.new(decoded)
  rescue JWT::DecodeError, JWT::ExpiredSignature => e
    nil
  end
end