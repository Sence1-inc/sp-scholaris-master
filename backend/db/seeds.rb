begin
  sql_file_path = Rails.root.join('db', 'mock-data.sql')
  sql_statements = File.read(sql_file_path)
  
  individual_statements = sql_statements.split(';').map(&:strip).reject(&:empty?)
  
  individual_statements.each do |statement|
    ActiveRecord::Base.connection.execute("#{statement};")
  end
rescue => e
  puts "Error loading SQL file: #{e.message}"
end

begin
  load Rails.root.join('db', 'seeds', 'survey_questions.rb')
  load Rails.root.join('db', 'seeds', 'benefit_categories.rb')
  puts 'Seed data loaded successfully.'
rescue => e
  puts "Error loading seed data: #{e.message}"
end

begin
  json_file_path = Rails.root.join('db', 'seeds', 'ph_addresses.json')
  file = File.read(json_file_path)
  data = JSON.parse(file)

  ActiveRecord::Base.connection.execute("ALTER TABLE ph_addresses AUTO_INCREMENT = 1")

  data.each do |item|
    id = item[:id]
    existing_data = PhAddress.find_by(id: id)
    
    if existing_data.nil?
      PhAddress.create!(item)
    else
      puts "Skipping address with id #{id} because it already exists."
    end
  end

  puts 'JSON ph_addresses seeded successfully.'
rescue => e
  puts "Error loading JSON file: #{e.message}"
end
