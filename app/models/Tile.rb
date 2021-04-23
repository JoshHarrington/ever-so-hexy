class Tile < ApplicationRecord
	has_many :trixels, dependent: :destroy
	after_create :create_trixels

	private
		def create_trixels
			self.trixels.create([
				{
					position: "A1",
					d: "M0 75L0.00962452 45L26 59.9917L0 75Z"
				},{
					position: "A2",
					d: "M26 30L25.9904 60L0 45.0083L26 30Z"
				},{
					position: "A3",
					d: "M26 60L26.0096 30L52 44.9917L26 60Z"
				},{
					position: "A4",
					d: "M52 15L51.9904 45L26 30.0083L52 15Z"
				},{
					position: "A5",
					d: "M52 45L52.0096 15L78 29.9917L52 45Z"
				},{
					position: "A6",
					d: "M78 0L77.9904 30L52 15.0083L78 0Z"
				},{
					position: "A7",
					d: "M78 30L78.0096 0L104 14.9917L78 30Z"
				},

				{
					position: "B1",
					d: "M0 105L0.00962452 75L26 89.9917L0 105Z"
				},{
					position: "B2",
					d: "M26 60L25.9904 90L0 75.0083L26 60Z"
				},{
					position: "B3",
					d: "M26 90L26.0096 60L52 74.9917L26 90Z"
				},{
					position: "B4",
					d: "M52 45L51.9904 75L26 60.0083L52 45Z"
				},{
					position: "B5",
					d: "M52 75L52.0096 45L78 59.9917L52 75Z"
				},{
					position: "B6",
					d: "M78 30L77.9904 60L52 45.0083L78 30Z"
				},{
					position: "B7",
					d: "M78 60L78.0096 30L104 44.9917L78 60Z"
				},{
					position: "B8",
					d: "M104 15L103.99 45L78 30.0083L104 15Z"
				},{
					position: "B9",
					d: "M104 45L104.01 15L130 29.9917L104 45Z"
				},

				{
					position: "C1",
					d: "M0 135L0.00962452 105L26 119.992L0 135Z"
				},{
					position: "C2",
					d: "M26 90L25.9904 120L0 105.008L26 90Z"
				},{
					position: "C3",
					d: "M26 120L26.0096 90L52 104.992L26 120Z"
				},{
					position: "C4",
					d: "M52 75L51.9904 105L26 90.0083L52 75Z"
				},{
					position: "C5",
					d: "M52 105L52.0096 75L78 89.9917L52 105Z"
				},{
					position: "C6",
					d: "M78 60L77.9904 90L52 75.0083L78 60Z"
				},{
					position: "C7",
					d: "M78 90L78.0096 60L104 74.9917L78 90Z"
				},{
					position: "C8",
					d: "M104 45L103.99 75L78 60.0083L104 45Z"
				},{
					position: "C9",
					d: "M104 75L104.01 45L130 59.9917L104 75Z"
				},{
					position: "C10",
					d: "M130 30L129.99 60L104 45.0083L130 30Z"
				},{
					position: "C11",
					d: "M130 60L130.01 30L156 44.9917L130 60Z"
				},

				{
					position: "D1",
					d: "M26 120L25.9904 150L0 135.008L26 120Z"
				},{
					position: "D2",
					d: "M52 105L51.9904 135L26 120.008L52 105Z"
				},{
					position: "D3",
					d: "M26 150L26.0096 120L52 134.992L26 150Z"
				},{
					position: "D4",
					d: "M52 135L52.0096 105L78 119.992L52 135Z"
				},{
					position: "D5",
					d: "M78 90L77.9904 120L52 105.008L78 90Z"
				},{
					position: "D6",
					d: "M78 120L78.0096 90L104 104.992L78 120Z"
				},{
					position: "D7",
					d: "M104 75L103.99 105L78 90.0083L104 75Z"
				},{
					position: "D8",
					d: "M104 105L104.01 75L130 89.9917L104 105Z"
				},{
					position: "D9",
					d: "M130 60L129.99 90L104 75.0083L130 60Z"
				},{
					position: "D10",
					d: "M130 90L130.01 60L156 74.9917L130 90Z"
				},{
					position: "D11",
					d: "M156 45L155.99 75L130 60.0083L156 45Z"
				},

				{
					position: "E1",
					d: "M52 135L51.9904 165L26 150.008L52 135Z"
				},{
					position: "E2",
					d: "M52 165L52.0096 135L78 149.992L52 165Z"
				},{
					position: "E3",
					d: "M78 120L77.9904 150L52 135.008L78 120Z"
				},{
					position: "E4",
					d: "M78 150L78.0096 120L104 134.992L78 150Z"
				},{
					position: "E5",
					d: "M104 105L103.99 135L78 120.008L104 105Z"
				},{
					position: "E6",
					d: "M104 135L104.01 105L130 119.992L104 135Z"
				},{
					position: "E7",
					d: "M130 90L129.99 120L104 105.008L130 90Z"
				},{
					position: "E8",
					d: "M130 120L130.01 90L156 104.992L130 120Z"
				},{
					position: "E9",
					d: "M156 75L155.99 105L130 90.0083L156 75Z"
				},

				{
					position: "F1",
					d: "M78 150L77.9904 180L52 165.008L78 150Z"
				},{
					position: "F2",
					d: "M78 180L78.0096 150L104 164.992L78 180Z"
				},{
					position: "F3",
					d: "M104 135L103.99 165L78 150.008L104 135Z"
				},{
					position: "F4",
					d: "M104 165L104.01 135L130 149.992L104 165Z"
				},{
					position: "F5",
					d: "M130 120L129.99 150L104 135.008L130 120Z"
				},{
					position: "F6",
					d: "M130 150L130.01 120L156 134.992L130 150Z"
				},{
					position: "F7",
					d: "M156 105L155.99 135L130 120.008L156 105Z"
				}
			])
		end
end
