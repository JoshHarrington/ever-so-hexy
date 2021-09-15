class AdminController < ApplicationController
  http_basic_authenticate_with :name => "admin", :password => "sixsides"

  # GET /admin
  def index
    @hexes = Hex.all.order(created_at: :desc)
  end

  # DELETE /admin/hex/1
  def destroy_hex
    @hex = Hex.find(params[:id])
    @hex.destroy

    redirect_to admin_root_url, notice: "Hex was successfully destroyed."
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_hex
      @hex = Hex.find(params[:id])
    end
end
