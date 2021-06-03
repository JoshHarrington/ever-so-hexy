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

    tile_order = params["order"]
    trixels = params["trixels"]

    tile = Tile.find_by(order: tile_order)

    session[:current_draft_tile_id] = tile.id

    update_statuses_set = Set[]
    trixels.each do |t|
      if Trixel.find_by(tile_id: tile.id, position: t["position"]).update(colour: t["colour"])
        update_statuses_set.add(true)
      else
        update_statuses_set.add(false)
      end
    end

    respond_to do |format|
      format.json { render json: {status: update_statuses_set.include?(false) ? 'fail' : 'success'} }
      format.html { redirect_to(new_path) }
    end
  end

  def publish
    if Tile.exists?(order: params["order"]) && Tile.find_by(order: params["order"]).id == session[:current_draft_tile_id]
      Tile.find_by(order: params["order"]).update(draft: false)
      session[:current_draft_tile_id] = nil
      redirect_to root_path
    else
      redirect_to new_path
    end
  end

  def destroy
    if Tile.exists?(order: params["order"]) && Tile.find_by(order: params["order"]).id == session[:current_draft_tile_id]
      Tile.find_by(order: params["order"]).destroy
      session[:current_draft_tile_id] = nil

      respond_to do |format|
        format.json { render json: {status: 302, redirect_to: root_path} }
        format.html { redirect_to(root_path) }
      end
    else
      redirect_to new_path
    end
  end
end
