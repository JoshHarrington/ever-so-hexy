require "rails_helper"

RSpec.describe HexesController do
  describe "GET #home" do
    subject { get :home }

    it "renders the index template" do
      expect(response.status).to eq(200)

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

  describe "GET #new" do
    subject { get :new }

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
