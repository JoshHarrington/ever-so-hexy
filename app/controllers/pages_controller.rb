class PagesController < ApplicationController
  def home
    p "request.remote_ip"
    p request.remote_ip

    @tiles = Tile.all.where(draft: false)

  end
  def new
    @tiles = Tile.all.where(draft: false)
  end
end
