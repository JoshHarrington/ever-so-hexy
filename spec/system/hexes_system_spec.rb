require 'rails_helper'

RSpec.describe 'Hex zooming', :type => :system do
	let!(:hexes) { create_list(:hex, 3, draft: false)}

  before do
    driven_by(:selenium_chrome)
  end

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
