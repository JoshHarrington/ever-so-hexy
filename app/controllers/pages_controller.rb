class PagesController < ApplicationController
  def home
    p "request.remote_ip"
    p request.remote_ip

    @tiles = Tile.all.where(draft: false).map{ |t|
      t.trixels.map{|tr| {
        tile_id: tr.tile_id,
        colour: tr.colour,
        position: tr.position,
        d: tr.d
      }}
    }

  end
  def new
    @tiles = Tile.all.where(draft: false)
  end
end
