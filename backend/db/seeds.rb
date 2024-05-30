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
  Dir[Rails.root.join('db', 'seeds', '**', '*.rb')].sort.each do |file|
    begin
      data = File.read(file)
      seed_data = eval(data)
      
      seed_data.each do |item|
        model_name = item[:model]
        attributes = item[:attributes]
        
        if model_name.present?
          model = model_name.constantize
          id = attributes[:id]
          
          if id.present?
            record = model.find_by(id: id)
            if record
              puts "Skipping item in #{file} because a record with id #{id} already exists."
            else
              model.create!(attributes)
            end
          else
            puts "Skipping item in #{file} because it doesn't have an :id attribute."
          end
        else
          puts "Skipping item in #{file} because it doesn't have a :model key."
        end
      end
      
      puts "Loaded #{file}"
    rescue => e
      puts "Error loading seed file #{file}: #{e.message}"
    end
  end
  
  puts 'Seed data loaded successfully.'
rescue => e
  puts "Error loading seed data: #{e.message}"
end
