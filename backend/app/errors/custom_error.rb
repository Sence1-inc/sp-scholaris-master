class CustomError < StandardError
  attr_reader :status

  def initialize(message = "An error occurred", status = :unprocessable_entity)
    @status = status
    super(message)
  end
end