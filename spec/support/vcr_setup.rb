require 'vcr'

VCR.configure do |c|
  c.cassette_library_dir = 'spec/vcr_cassettes'
  c.hook_into :webmock
  c.configure_rspec_metadata!
  c.filter_sensitive_data("<API_KEY>") { Rails.application.credentials.ipapi[:access_key] }
  c.allow_http_connections_when_no_cassette = true
end
