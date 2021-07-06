class Hex < ApplicationRecord
	after_create :add_order, :find_country_code

	validates :order, uniqueness: true

	private

		def add_order

			if self.order == 0

				order_for_hex = 1

				Hex.count.times.each do |index|
					if not Hex.exists?(order: index + 1)
						order_for_hex = index + 1
						break
					end
				end
				self.update(order: order_for_hex)
			end
		end

		def find_country_code

			require 'net/http'
			require 'json'

			if self.ip_address == "::1"
				ip_address = "185.192.69.232" # ExpressVPN
			else
				ip_address = self.ip_address
			end

			if ip_address.present?
				begin
					url = "http://api.ipapi.com/#{ip_address}?access_key=#{Rails.application.credentials.ipapi[:access_key]}"
					uri = URI(url)

					response = Net::HTTP.get(uri)
					data = JSON.parse(response)

					self.update(country_code: data['country_code'])
				end
			end
		end
end
