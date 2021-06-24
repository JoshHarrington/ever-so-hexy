require "rails_helper"

RSpec.describe HexesController do
  describe "GET #home" do
    subject { get :home }

    it "renders the index template" do
      expect(subject).to render_template(:home)
      expect(subject).to render_template("home")
      expect(subject).to render_template("hexes/home")
    end

    it "does not render a different template" do
      expect(subject).to_not render_template("hexes/new")
    end

    it "renders the application layout" do
      expect(subject).to render_template("layouts/application")
    end
  end

  describe "Check home view contents" do
    render_views

    let!(:hex) { create(:hex, draft: false) }

    it "renders the index page" do
      get :home

      expect(response.status).to eq(200)

      expect(response.body).to include("data-react-props=\"{&quot;allHexes&quot;:[{&quot;draft&quot;:false,&quot;order&quot;:0},{&quot;draft&quot;:false,&quot;order&quot;:0,&quot;trixel_colour_a1&quot;:&quot;#fff")

      ## Need to get the server rendering setup before this will work
      # expect(response.body).to match /<p>An experimental collaborative art project.*/im
      expect(response.body).to match /<title>Ever So Hexy<\/title>/im
    end

  end

  describe "GET #new" do
    subject { get :new }

    it "renders the new template" do
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

  describe "Check new view contents" do
    render_views


    it "renders the index page" do
      get :new

      expect(response.status).to eq(200)

      expect(response.body).to include("data-react-props=\"{&quot;allHexes&quot;:[{&quot;draft&quot;:true,&quot;order&quot;:1,&quot;trixel_colour_a1&quot;:&quot;#fff")
      expect(response.body).to match /<title>Ever So Hexy | New Hexagon<\/title>/im
    end
  end
end
