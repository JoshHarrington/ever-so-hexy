require 'rails_helper'

RSpec.describe 'New page view', type: :system do
	let!(:hexes) { create_list(:hex, 3, draft: false)}

  it 'can load the new page and fill one trixel' do
    visit '/new'

		wait_for { page.has_css?('[data-testid="hex-wrapper"]') }
		wait_for { page.has_css?('[data-testid="palette-picker"]') }

		expect(page.find('[data-testid="hex-wrapper"]').style('transform')["transform"]).to start_with('matrix(4, 0, 0, 4,')
		# expect(page.find('[data-testid="hex-wrapper"]').style('transform')["transform"]).not_to end_with('0, 0)')

		expect(page).to have_selector('svg#id-4', visible: true)

		expect(page).to have_selector('button[data-testid="add-hex-button"][disabled]', visible:true)

		find('button[data-testid="add-hex-button"]').click
		expect(page.current_url).to include('/new')

		expect(page).to have_selector('[data-testid*="palette-button-"]', count: 21)

		expect(page.first('[data-testid="palette-button--blue-400"]').style('background-color')["background-color"]).to eql('rgba(96, 165, 250, 1)')

		expect(page.first('svg#id-4 path')[:fill]).to eql("#FFFFFF")
		page.first('svg#id-4 path[data-position="a1"]').click
		expect(page.first('svg#id-4 path')[:fill]).to eql("#FB7185")

		page.first('[data-testid="palette-picker"] button.bg-purple-400').click

		path_e1 = page.first('svg#id-4 path[data-position="e1"]')
		path_e2 = page.first('svg#id-4 path[data-position="e2"]')

		path_e1.drag_to(path_e2)

		expect(page.first('svg#id-4 path[data-position="e1"]')[:fill]).to eql("#C084FC")
		expect(page.first('svg#id-4 path[data-position="e2"]')[:fill]).to eql("#C084FC")


		page.first('[data-testid="palette-picker"] button.bg-green-500').click

		path_f5 = page.first('svg#id-4 path[data-position="f5"]')
		path_f4 = page.first('svg#id-4 path[data-position="f4"]')

		path_f5.drag_to(path_f4)

		expect(page.first('svg#id-4 path[data-position="f5"]')[:fill]).to eql("#10B981")
		expect(page.first('svg#id-4 path[data-position="f4"]')[:fill]).to eql("#10B981")

		refresh
		wait_for { page.has_css?('[data-testid="hex-wrapper"]') }
		wait_for { page.has_css?('[data-testid="palette-picker"]') }

		expect(page.first('svg#id-4 path')[:fill]).to eql("#FB7185")

		expect(page.first('svg#id-4 path[data-position="e1"]')[:fill]).to eql("#C084FC")
		expect(page.first('svg#id-4 path[data-position="e2"]')[:fill]).to eql("#C084FC")

		expect(page.first('svg#id-4 path[data-position="f5"]')[:fill]).to eql("#10B981")
		expect(page.first('svg#id-4 path[data-position="f4"]')[:fill]).to eql("#10B981")

		expect(page).to have_selector('button[data-testid="add-hex-button"]', visible:true)
		expect(page).not_to have_content("Use at least three colours to enable saving")

		wide_screen_svg_left = page.evaluate_script('document.querySelector("svg#id-4").getBoundingClientRect()')["left"].to_f.round()

		Capybara.page.current_window.resize_to(800, 800)

		wait_for {
			slim_screen_svg_left = page.evaluate_script('document.querySelector("svg#id-4").getBoundingClientRect()')["left"].to_f.round()
			slim_screen_svg_left < wide_screen_svg_left
		}

		svg_props = page.evaluate_script('document.querySelector("svg#id-4").getBoundingClientRect()')
		window_props = page.evaluate_script('document.body.getBoundingClientRect()')

		## "is the svg centrally aligned?"
		expect((svg_props["width"] + (svg_props["left"] * 2)).to_f.round()).to eql(window_props["width"])
		expect(svg_props["top"].round()).to eql((svg_props["bottom"] - svg_props["height"]).round())

		sleep 0.2
		Hex.find_by(order:4).update(updated_at: Time.now - 4.minutes)
		page.first('button[data-testid="add-hex-button"]').click

		expect(Hex.find_by(order:4).updated_at.utc.between?(Time.now.utc - 3.seconds, Time.now.utc)).to be true
		expect(Hex.find_by(order:4).created_at.before?(Hex.find_by(order:4).updated_at)).to be true
		expect(Hex.find_by(order:4).updated_at).not_to eq(Hex.find_by(order:4).created_at)
		expect(page.current_url).not_to include('new')
		expect(page.current_url).to include('#4')
		expect(page).to have_content('a few seconds ago')

		wait_for { page.find('[data-testid="hex-wrapper"]').style('transform')["transform"].start_with?('matrix(4, 0, 0, 4,')}
		expect(page).to have_selector('svg#id-4', visible:true)
		expect(page.first('svg#id-4 path')[:fill]).to eql("#FB7185")

  end
end

RSpec.describe 'Keypresses for zooming and resetting are blocked', type: :system do
	it 'on the new page' do
		visit '/new'

		wait_for { page.has_css?('[data-testid="hex-wrapper"]') }
		wait_for { page.has_css?('[data-testid="palette-picker"]') }

		initial_hex_wrapper_transform = page.find('[data-testid="hex-wrapper"]').style('transform')["transform"]

		page.execute_script('window.dispatchEvent(new KeyboardEvent("keydown",{key:"=", ctrlKey: true}));')
		page.execute_script('window.dispatchEvent(new KeyboardEvent("keydown",{key:"=", ctrlKey: true}));')
		sleep 3
		expect(page.find('[data-testid="hex-wrapper"]').style('transform')["transform"]).to eql(initial_hex_wrapper_transform)

		page.execute_script('window.dispatchEvent(new KeyboardEvent("keydown",{key:"-", metaKey: true}));')
		page.execute_script('window.dispatchEvent(new KeyboardEvent("keydown",{key:"-", metaKey: true}));')
		page.execute_script('window.dispatchEvent(new KeyboardEvent("keydown",{key:"-", metaKey: true}));')
		sleep 3
		expect(page.find('[data-testid="hex-wrapper"]').style('transform')["transform"]).to eql(initial_hex_wrapper_transform)

		page.send_keys :escape
		page.send_keys :escape
		page.send_keys :escape
		sleep 3
		expect(page.find('[data-testid="hex-wrapper"]').style('transform')["transform"]).to eql(initial_hex_wrapper_transform)

	end
end
