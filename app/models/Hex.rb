class Hex < ApplicationRecord
	after_create :add_order, :find_country_code

	validates :order, uniqueness: true

	private

		def add_order

			order_for_hex = 0

			Hex.count.times.each do |x|
				if not Hex.exists?(order: x + 1)
					order_for_hex = x + 1
					break
				end
			end
			self.update(order: order_for_hex)
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
				url = "https://api.ipgeolocationapi.com/geolocate/#{ip_address}"
				uri = URI(url)
				response = Net::HTTP.get(uri)

				unless response.starts_with?("<!DOCTYPE html>")
					data = JSON.parse(response)

					self.update(country_code: data['alpha2'])
				end
			end

		end
end
