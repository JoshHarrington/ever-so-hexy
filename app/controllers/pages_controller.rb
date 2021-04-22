class PagesController < ApplicationController
  def home
    p "request.remote_ip"
    p request.remote_ip
  end
  def new
  end
end
