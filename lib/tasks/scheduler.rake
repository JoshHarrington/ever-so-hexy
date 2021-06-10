desc "This task is called by the Heroku scheduler add-on"
task :delete_drafts => :environment do
  puts "Deleting drafts..."
  Hex.where(draft: true).destroy_all
  puts "done."
end
