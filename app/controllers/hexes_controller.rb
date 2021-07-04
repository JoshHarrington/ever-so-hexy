class HexesController < ApplicationController
  include HexesHelper
  def home
    all_hexes = Hex.where.not(order: 0).order(:order)

    @hexes = hide_private_hex_data(hexes: all_hexes)

    @last_hex_order_position = all_hexes.where(draft: false).length > 0 ? all_hexes.where(draft: false).last.order : 1

  end
  def new

    draft_hex = Hex.where(id: session[:current_draft_hex_id]).first_or_create do |hex|
      hex.ip_address = request.remote_ip
    end

    session[:current_draft_hex_id] = draft_hex.id

    all_hexes = Hex.where.not(order: 0).order(:order)

    @hexes = hide_private_hex_data(hexes: all_hexes, is_in_editing_mode: true, current_draft_hex_id: draft_hex.id)

    @current_draft_hex_order_position = draft_hex.order
    @current_draft_hex_id = draft_hex.id

  end

  def update

    hex_order = params["order"]
    hex_from_request = params["hex"]

    hex = Hex.find_by(order: hex_order)

    session[:current_draft_hex_id] = hex.id

    update_statuses_set = Set[]

    if hex.update(
      trixel_colour_a1: hex_from_request["trixel_colour_a1"],
      trixel_colour_a2: hex_from_request["trixel_colour_a2"],
      trixel_colour_a3: hex_from_request["trixel_colour_a3"],
      trixel_colour_a4: hex_from_request["trixel_colour_a4"],
      trixel_colour_a5: hex_from_request["trixel_colour_a5"],
      trixel_colour_a6: hex_from_request["trixel_colour_a6"],
      trixel_colour_a7: hex_from_request["trixel_colour_a7"],
      trixel_colour_b1: hex_from_request["trixel_colour_b1"],
      trixel_colour_b2: hex_from_request["trixel_colour_b2"],
      trixel_colour_b3: hex_from_request["trixel_colour_b3"],
      trixel_colour_b4: hex_from_request["trixel_colour_b4"],
      trixel_colour_b5: hex_from_request["trixel_colour_b5"],
      trixel_colour_b6: hex_from_request["trixel_colour_b6"],
      trixel_colour_b7: hex_from_request["trixel_colour_b7"],
      trixel_colour_b8: hex_from_request["trixel_colour_b8"],
      trixel_colour_b9: hex_from_request["trixel_colour_b9"],
      trixel_colour_c1: hex_from_request["trixel_colour_c1"],
      trixel_colour_c2: hex_from_request["trixel_colour_c2"],
      trixel_colour_c3: hex_from_request["trixel_colour_c3"],
      trixel_colour_c4: hex_from_request["trixel_colour_c4"],
      trixel_colour_c5: hex_from_request["trixel_colour_c5"],
      trixel_colour_c6: hex_from_request["trixel_colour_c6"],
      trixel_colour_c7: hex_from_request["trixel_colour_c7"],
      trixel_colour_c8: hex_from_request["trixel_colour_c8"],
      trixel_colour_c9: hex_from_request["trixel_colour_c9"],
      trixel_colour_c10: hex_from_request["trixel_colour_c10"],
      trixel_colour_c11: hex_from_request["trixel_colour_c11"],
      trixel_colour_d1: hex_from_request["trixel_colour_d1"],
      trixel_colour_d2: hex_from_request["trixel_colour_d2"],
      trixel_colour_d3: hex_from_request["trixel_colour_d3"],
      trixel_colour_d4: hex_from_request["trixel_colour_d4"],
      trixel_colour_d5: hex_from_request["trixel_colour_d5"],
      trixel_colour_d6: hex_from_request["trixel_colour_d6"],
      trixel_colour_d7: hex_from_request["trixel_colour_d7"],
      trixel_colour_d8: hex_from_request["trixel_colour_d8"],
      trixel_colour_d9: hex_from_request["trixel_colour_d9"],
      trixel_colour_d10: hex_from_request["trixel_colour_d10"],
      trixel_colour_d11: hex_from_request["trixel_colour_d11"],
      trixel_colour_e1: hex_from_request["trixel_colour_e1"],
      trixel_colour_e2: hex_from_request["trixel_colour_e2"],
      trixel_colour_e3: hex_from_request["trixel_colour_e3"],
      trixel_colour_e4: hex_from_request["trixel_colour_e4"],
      trixel_colour_e5: hex_from_request["trixel_colour_e5"],
      trixel_colour_e6: hex_from_request["trixel_colour_e6"],
      trixel_colour_e7: hex_from_request["trixel_colour_e7"],
      trixel_colour_e8: hex_from_request["trixel_colour_e8"],
      trixel_colour_e9: hex_from_request["trixel_colour_e9"],
      trixel_colour_f1: hex_from_request["trixel_colour_f1"],
      trixel_colour_f2: hex_from_request["trixel_colour_f2"],
      trixel_colour_f3: hex_from_request["trixel_colour_f3"],
      trixel_colour_f4: hex_from_request["trixel_colour_f4"],
      trixel_colour_f5: hex_from_request["trixel_colour_f5"],
      trixel_colour_f6: hex_from_request["trixel_colour_f6"],
      trixel_colour_f7: hex_from_request["trixel_colour_f7"]
    )
      status_passed = true
    else
      status_passed = false
    end

    respond_to do |format|
      format.json { render json: {status: status_passed ? 'success' : 'fail'} }
      format.html { redirect_to(new_path) }
    end
  end

  def publish
    if Hex.exists?(order: params["order"]) && Hex.find_by(order: params["order"]).id == session[:current_draft_hex_id]
      Hex.find_by(order: params["order"]).update(draft: false)
      session[:current_draft_hex_id] = nil
      redirect_to root_path
    else
      redirect_to new_path
    end
  end

  def destroy
    if Hex.exists?(order: params["order"]) && Hex.find_by(order: params["order"]).id == session[:current_draft_hex_id]
      Hex.find_by(order: params["order"]).destroy
      session[:current_draft_hex_id] = nil

      respond_to do |format|
        format.json { render json: {status: 302, redirect_to: root_path} }
        format.html { redirect_to(root_path) }
      end
    else
      redirect_to new_path
    end
  end
end
