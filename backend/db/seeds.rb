sql_file_path = Rails.root.join('db', 'mock-data.sql')
sql_statements = File.read(sql_file_path)

individual_statements = sql_statements.split(';').map(&:strip).reject(&:empty?)

individual_statements.each do |statement|
  ActiveRecord::Base.connection.execute("#{statement};")
end

Dir[Rails.root.join('db', 'seeds', 'survey', '*.rb')].sort.each do |file|
  load file
  puts "Loaded #{file}"
end

puts 'Seed data loaded successfully.'