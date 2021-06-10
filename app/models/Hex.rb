class Hex < ApplicationRecord
	after_create :add_order, :find_country_code, :set_default_trixel_colors

	validates :order, uniqueness: true

	private

		def set_default_trixel_colors
			self.update(
				trixel_colour_a1: "#fff",
				trixel_colour_a2: "#fff",
				trixel_colour_a3: "#fff",
				trixel_colour_a4: "#fff",
				trixel_colour_a5: "#fff",
				trixel_colour_a6: "#fff",
				trixel_colour_a7: "#fff",
				trixel_colour_b1: "#fff",
				trixel_colour_b2: "#fff",
				trixel_colour_b3: "#fff",
				trixel_colour_b4: "#fff",
				trixel_colour_b5: "#fff",
				trixel_colour_b6: "#fff",
				trixel_colour_b7: "#fff",
				trixel_colour_b8: "#fff",
				trixel_colour_b9: "#fff",
				trixel_colour_c1: "#fff",
				trixel_colour_c2: "#fff",
				trixel_colour_c3: "#fff",
				trixel_colour_c4: "#fff",
				trixel_colour_c5: "#fff",
				trixel_colour_c6: "#fff",
				trixel_colour_c7: "#fff",
				trixel_colour_c8: "#fff",
				trixel_colour_c9: "#fff",
				trixel_colour_c10: "#fff",
				trixel_colour_c11: "#fff",
				trixel_colour_d1: "#fff",
				trixel_colour_d2: "#fff",
				trixel_colour_d3: "#fff",
				trixel_colour_d4: "#fff",
				trixel_colour_d5: "#fff",
				trixel_colour_d6: "#fff",
				trixel_colour_d7: "#fff",
				trixel_colour_d8: "#fff",
				trixel_colour_d9: "#fff",
				trixel_colour_d10: "#fff",
				trixel_colour_d11: "#fff",
				trixel_colour_e1: "#fff",
				trixel_colour_e2: "#fff",
				trixel_colour_e3: "#fff",
				trixel_colour_e4: "#fff",
				trixel_colour_e5: "#fff",
				trixel_colour_e6: "#fff",
				trixel_colour_e7: "#fff",
				trixel_colour_e8: "#fff",
				trixel_colour_e9: "#fff",
				trixel_colour_f1: "#fff",
				trixel_colour_f2: "#fff",
				trixel_colour_f3: "#fff",
				trixel_colour_f4: "#fff",
				trixel_colour_f5: "#fff",
				trixel_colour_f6: "#fff",
				trixel_colour_f7: "#fff",
			)
		end

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
