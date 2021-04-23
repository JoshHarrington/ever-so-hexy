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
    @tiles = Tile.all.where(draft: false).map{ |t|
      t.trixels.map{|tr| {
        tile_id: tr.tile_id,
        colour: tr.colour,
        position: tr.position,
        d: tr.d
      }}
    }

    @new_draft_tile = Tile.find_or_create_by(location: request.remote_ip).trixels.map{|tr|{
      tile_id: tr.tile_id,
      colour: tr.colour,
      position: tr.position,
      d: tr.d
    }}
  end
  def update
    json_data = params["_json"]
    tile_id = json_data[0]["tile_id"]
    json_data.each do |t|
      Trixel.find_by(tile_id: tile_id, position: t["position"]).update(colour: t["colour"])
    end

    tile_trixels = Tile.find(tile_id).trixels.map{|tr|{
      tile_id: tr["tile_id"],
      colour: tr["colour"],
      position: tr["position"],
      d: tr["d"]
    }}
    respond_to do |format|
      format.json { render json: tile_trixels }
    end
  end
end
