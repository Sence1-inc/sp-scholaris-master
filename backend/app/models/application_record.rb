class ApplicationRecord < ActiveRecord::Base
  include SoftDelete
  primary_abstract_class
end
