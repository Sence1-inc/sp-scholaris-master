sql_file_path = Rails.root.join('./db/mock-data.sql')
sql = File.read(sql_file_path)
ActiveRecord::Base.connection.execute(sql)

puts 'Seed data loaded successfully.'