require 'rails_helper'

RSpec.describe 'Home page Hex zooming', type: :system do
	let!(:hexes) { create_list(:hex, 3, draft: false)}

  it 'can load the homepage and zoom to a hex' do
    visit '/'

		wait_for { page.has_css?('[data-testid="hex-wrapper"]') }

		expect(page.find('[data-testid="hex-wrapper"]').style('transform')["transform"]).to start_with('matrix(1.4, 0, 0, 1.4,')

    expect(page).to have_css('svg#id-1')
		expect(page).to have_css('svg#id-2')

		page.first('svg#id-2').click

		wait_for { page.current_url.include?('/#') }

		expect(page.current_url).to include('/#2')
		expect(page.current_url).not_to include('/#1')

		svg_props = page.evaluate_script('document.querySelector("svg#id-2").getBoundingClientRect()')
		window_props = page.evaluate_script('document.body.getBoundingClientRect()')

		## "is the svg centrally aligned?"
		expect((svg_props["width"] + (svg_props["left"] * 2)).to_f.round()).to eql(window_props["width"])
		expect(svg_props["top"].round()).to eql((svg_props["bottom"] - svg_props["height"]).round())

		expect(page).to have_text('a few seconds ago')
		expect(page).to have_text('Brazil')

		expect(page.find('[data-testid="hex-wrapper"]').style('transform')["transform"]).to start_with('matrix(4, 0, 0, 4,')
		expect(page.find('[data-testid="hex-wrapper"]').style('transform')["transform"]).not_to end_with('0, 0)')

		expect(page).to have_selector('svg#id-2', visible: true)

		expect(page).to have_selector('[aria-label="Zoom out"]', visible: true)

		page.find('[aria-label="Zoom out"] button').click

		wait_for { page.current_url.exclude?('/#') }

		expect(page).to have_selector('svg#id-1', visible: true)

		expect(page.find('[data-testid="hex-wrapper"]').style('transform')["transform"]).to start_with('matrix(1.4, 0, 0, 1.4,')

  end
end

RSpec.describe 'Mobile view hex zooming', type: :system do
	let!(:hexes) {create_list(:hex, 6, draft: false)}

	before do
		Capybara.page.current_window.resize_to(411, 731) # Pixel 2 size window
	end

	it 'loads the homepage' do
		visit '/'

		expect(page.find('[data-testid="hex-wrapper"]').style('transform')["transform"]).to start_with('matrix(1, 0, 0, 1,')
		expect(page.find('[data-testid="hex-wrapper"]').style('transform')["transform"]).to end_with('0, 0)')

    expect(page).to have_css('svg#id-1')
		expect(page).to have_css('svg#id-2')

		page.first('svg#id-2').click

		expect(page).to have_text('a few seconds ago')
		expect(page).to have_text('Brazil')

		expect(page.find('[data-testid="hex-wrapper"]').style('transform')["transform"]).to start_with('matrix(3, 0, 0, 3,')
		expect(page.find('[data-testid="hex-wrapper"]').style('transform')["transform"]).not_to end_with('0, 0)')

		wait_for { page.has_css?('svg#id-2') }
		expect(page).to have_selector('svg#id-2', visible: true)

		expect(page).to have_selector('svg#id-6', visible: false)

		page.find('[aria-label="Zoom out"] button').click

		expect(page.find('[data-testid="hex-wrapper"]').style('transform')["transform"]).to start_with('matrix(1, 0, 0, 1,')
		expect(page.find('[data-testid="hex-wrapper"]').style('transform')["transform"]).to end_with('0, 0)')

	end
end

RSpec.describe 'Keypress on Homepage', type: :system do
	let!(:hexes) { create_list(:hex, 3, draft: false)}

  it 'zoom in/out and reset page zoom level' do
		visit '/'

		default_scale = 1.4

		wait_for { page.has_css?('[data-testid="hex-wrapper"]') }

		page.execute_script('window.dispatchEvent(new KeyboardEvent("keydown",{key:"=", ctrlKey: true}));')
		wait_for { page.find('[data-testid="hex-wrapper"]').style('transform')["transform"].exclude?(default_scale.to_s) }
		expect(page.find('[data-testid="hex-wrapper"]').style('transform')["transform"]).not_to start_with("matrix(#{default_scale}, 0, 0, #{default_scale},")

		page.send_keys :escape
		wait_for { page.find('[data-testid="hex-wrapper"]').style('transform')["transform"].include?(default_scale.to_s) }
		expect(page.find('[data-testid="hex-wrapper"]').style('transform')["transform"]).to start_with("matrix(#{default_scale}, 0, 0, #{default_scale},")

		sleep 0.2
		page.execute_script('window.dispatchEvent(new KeyboardEvent("keydown",{key:"=", ctrlKey: true}));')

		wait_for { page.find('[data-testid="hex-wrapper"]').style('transform')["transform"].exclude?(default_scale.to_s) }
		last_hex_wrapper_scale = page.find('[data-testid="hex-wrapper"]').style('transform')["transform"]
		expect(last_hex_wrapper_scale).not_to start_with("matrix(#{default_scale}, 0, 0, #{default_scale},")

		page.execute_script('window.dispatchEvent(new KeyboardEvent("keydown",{key:"-", ctrlKey: true}));')
		wait_for { page.find('[data-testid="hex-wrapper"]').style('transform')["transform"] != last_hex_wrapper_scale }
		expect(page.find('[data-testid="hex-wrapper"]').style('transform')["transform"]).not_to eql(last_hex_wrapper_scale)

		next_hex_wrapper_scale = page.find('[data-testid="hex-wrapper"]').style('transform')["transform"]
		page.execute_script('window.dispatchEvent(new KeyboardEvent("keydown",{key:"-", metaKey: true}));')
		wait_for { page.find('[data-testid="hex-wrapper"]').style('transform')["transform"] != next_hex_wrapper_scale }
		expect(page.find('[data-testid="hex-wrapper"]').style('transform')["transform"]).not_to eql(next_hex_wrapper_scale)

		sleep 0.2
		page.execute_script('window.dispatchEvent(new KeyboardEvent("keydown",{key:"0", metaKey: true}));')
		wait_for { page.find('[data-testid="hex-wrapper"]').style('transform')["transform"].include?(default_scale.to_s + ', 0, 0, ' + default_scale.to_s)}
		expect(page.find('[data-testid="hex-wrapper"]').style('transform')["transform"]).to start_with("matrix(#{default_scale}, 0, 0, #{default_scale},")

		page.first('svg').click
		wait_for { page.find('[data-testid="hex-wrapper"]').style('transform')["transform"].exclude?(default_scale.to_s)}
		expect(page.find('[data-testid="hex-wrapper"]').style('transform')["transform"]).not_to start_with("matrix(#{default_scale}, 0, 0, #{default_scale},")
		expect(page.current_url).to include('/#1')

		sleep 0.2
		page.send_keys :escape
		wait_for { page.find('[data-testid="hex-wrapper"]').style('transform')["transform"].include?(default_scale.to_s + ', 0, 0, ' + default_scale.to_s)}
		expect(page.find('[data-testid="hex-wrapper"]').style('transform')["transform"]).to start_with("matrix(#{default_scale}, 0, 0, #{default_scale},")
		expect(page.current_url).not_to include('/#1')

	end
end

RSpec.describe 'Home page Hex zooming', type: :system do
	let!(:hexes) { create_list(:hex, 56, draft: false)}

  it 'can load the homepage and zoom to a hex' do
    visit '/'

		expect(page.find('[data-testid="hex-wrapper"]').style('transform')["transform"]).to start_with('matrix(1.4, 0, 0, 1.4,')

		wait_for { page.has_css?('svg#id-55') }
    expect(page).not_to have_css('svg#id-1')

		page_container = page.evaluate_script('document.querySelector("[data-react-class=Home]").getBoundingClientRect()')
		page_container_width = page_container["width"]

		page.evaluate_script("document.querySelector('[data-testid=hex-wrapper]').style.transform = 'scale(1.4) translate(-#{page_container_width/2}px, 0px)'")

		wait_for { page.has_css?('svg#id-56') }

  end
end
