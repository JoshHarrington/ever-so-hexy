class PagesController < ApplicationController
  def home
    p "request.remote_ip"
    p request.remote_ip

    @tiles = Tile.all.order(created_at: :asc).map{ |t|
      if t.draft == true
        helpers.basicTile(tile_id: t.id, colour: "#8e8e8e")
      else
        t.trixels.map{|tr| {
          tile_id: tr.tile_id,
          colour: tr.colour,
          position: tr.position,
          d: tr.d
        }}
      end
    }

  end
  def new

    draft_tile = Tile.find_or_create_by(id: session[:current_draft_tile_id])
    session[:current_draft_tile_id] = draft_tile.id

    @tiles = Tile.all.order(created_at: :asc).map{ |t|
      if t.draft == true && t.id != draft_tile.id
        helpers.basicTile(tile_id: t.id, colour: "#8e8e8e")
      else
        t.trixels.map{|tr| {
          tile_id: tr.tile_id,
          colour: tr.colour,
          position: tr.position,
          d: tr.d
        }}
      end
    }

    @current_draft_tile_id = draft_tile.id


  end

  def update

    json_data = params["_json"]
    tile_id = json_data[0]["tile_id"]

    tile = Tile.find(tile_id)

    session[:current_draft_tile_id] = tile.id

    json_data.each do |t|
      Trixel.find_by(tile_id: tile.id, position: t["position"]).update(colour: t["colour"])
    end

    tile_trixels = Tile.find(tile.id).trixels.map{|tr|{
      tile_id: tr["tile_id"],
      colour: tr["colour"],
      position: tr["position"],
      d: tr["d"]
    }}
    respond_to do |format|
      format.json { render json: tile_trixels }
    end
  end

  def publish
    if params["id"] == nil
      redirect_to new_path
    else
      Tile.find(params["id"]).update(draft: false)
      session[:current_draft_tile_id] = nil
      redirect_to root_path
    end
  end
end
