class PagesController < ApplicationController
  include PagesHelper
  def home
    p "request.remote_ip"
    p request.remote_ip

    all_tiles = Tile.all.order(:order)

    @tiles = clean_tile_array(tiles: all_tiles)

    @last_tile_order_position = all_tiles.where(draft: false).last.order

  end
  def new

    draft_tile = Tile.find_or_create_by(id: session[:current_draft_tile_id])
    session[:current_draft_tile_id] = draft_tile.id


    all_tiles = Tile.all.order(:order)

    @tiles = clean_tile_array(tiles: all_tiles, is_in_editing_mode: true)

    @current_draft_tile_order_position = draft_tile.order
    @current_draft_tile_id = draft_tile.id

  end

  def update

    tile_id = params["id"]
    trixels = params["trixels"]

    tile = Tile.find(tile_id)

    session[:current_draft_tile_id] = tile.id

    trixels.each do |t|
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
