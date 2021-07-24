require 'rails_helper'

RSpec.describe 'Home page Hex zooming', type: :system do
	let!(:hexes) { create_list(:hex, 3, draft: false)}

  it 'can load the homepage and zoom to a hex' do
    visit '/'

		expect(page.find('[data-testid="hex-wrapper"]').style('transform')["transform"]).to start_with('matrix(1.4, 0, 0, 1.4,')
		expect(page.find('[data-testid="hex-wrapper"]').style('transform')["transform"]).to end_with('0, 0)')

    expect(page).to have_css('svg#id-1')
		expect(page).to have_css('svg#id-2')

		page.first('svg#id-2').click

		expect(page.current_url).to include('/#2')
		expect(page.current_url).not_to include('/#1')


		expect(page).to have_text('a few seconds ago')
		expect(page).to have_text('Brazil')

		expect(page.find('[data-testid="hex-wrapper"]').style('transform')["transform"]).to start_with('matrix(4, 0, 0, 4,')
		expect(page.find('[data-testid="hex-wrapper"]').style('transform')["transform"]).not_to end_with('0, 0)')

		expect(page).to have_selector('svg#id-2', visible: true)

		expect(page).to have_selector('[aria-label="Zoom out"]', visible: true)

		page.find('[aria-label="Zoom out"] button').click

		expect(page).to have_selector('svg#id-1', visible: true)

		expect(page.find('[data-testid="hex-wrapper"]').style('transform')["transform"]).to start_with('matrix(1.4, 0, 0, 1.4,')
		expect(page.find('[data-testid="hex-wrapper"]').style('transform')["transform"]).to end_with('0, 0)')

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

		expect(page).to have_selector('svg#id-2', visible: true)

		expect(page).to have_selector('svg#id-6', visible: false)

		page.find('[aria-label="Zoom out"] button').click

		expect(page.find('[data-testid="hex-wrapper"]').style('transform')["transform"]).to start_with('matrix(1, 0, 0, 1,')
		expect(page.find('[data-testid="hex-wrapper"]').style('transform')["transform"]).to end_with('0, 0)')

	end
end

RSpec.describe 'New page view', type: :system do
	let!(:hexes) { create_list(:hex, 3, draft: false)}

  it 'can load the new page and fill one trixel' do
    visit '/new'

		sleep 1

		expect(page.find('[data-testid="hex-wrapper"]').style('transform')["transform"]).to start_with('matrix(4, 0, 0, 4,')
		expect(page.find('[data-testid="hex-wrapper"]').style('transform')["transform"]).not_to end_with('0, 0)')

		expect(page).to have_selector('svg#id-4', visible: true)

		expect(page.first('svg#id-4 path')[:fill]).to eql("#fff")
		page.first('svg#id-4 path').click
		expect(page.first('svg#id-4 path')[:fill]).to eql("#FB7185")


  end
end
