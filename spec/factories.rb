FactoryBot.define do
  sequence :order do |n|
    n
  end
end

FactoryBot.define do
  factory :hex do
    country_code { "BR" }
    order
  end
end