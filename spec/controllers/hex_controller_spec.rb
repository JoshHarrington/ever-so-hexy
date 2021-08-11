require "rails_helper"

RSpec.describe HexesController do
  render_views

  describe "GET #home" do
    before :each do
      get :home, format: 'html'
    end

    it "renders the index template" do
      expect(response.status).to eq(200)

      expect(subject).to render_template(:home)
      expect(subject).to render_template("home")
      expect(subject).to render_template("hexes/home")
    end

    it "does not render a different template" do
      expect(subject).to_not render_template("hexes/new")
    end

    it "does not have the google tag manager tags in ci" do
      expect(response.body).to_not include("window,document,'script','dataLayer','GTM-KDXB5J9'")
    end

    it "renders the application layout" do
      expect(subject).to render_template("layouts/application")
    end
  end

  describe "GET #new" do
    before :each do
      get :new, format: 'html'
    end

    it "renders the new template" do
      expect(response.status).to eq(200)

      expect(subject).to render_template(:new)
      expect(subject).to render_template("new")
      expect(subject).to render_template("hexes/new")
    end

    it "does not render a different template" do
      expect(subject).to_not render_template("hexes/home")
    end

    it "renders the application layout" do
      expect(subject).to render_template("layouts/application")
    end
  end
end
