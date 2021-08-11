# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_08_11_173309) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "hexes", force: :cascade do |t|
    t.string "ip_address"
    t.string "country_code"
    t.boolean "draft", default: true, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "order", default: 0
    t.string "trixel_colour_a1", default: "#FFFFFF"
    t.string "trixel_colour_a2", default: "#FFFFFF"
    t.string "trixel_colour_a3", default: "#FFFFFF"
    t.string "trixel_colour_a4", default: "#FFFFFF"
    t.string "trixel_colour_a5", default: "#FFFFFF"
    t.string "trixel_colour_a6", default: "#FFFFFF"
    t.string "trixel_colour_a7", default: "#FFFFFF"
    t.string "trixel_colour_b1", default: "#FFFFFF"
    t.string "trixel_colour_b2", default: "#FFFFFF"
    t.string "trixel_colour_b3", default: "#FFFFFF"
    t.string "trixel_colour_b4", default: "#FFFFFF"
    t.string "trixel_colour_b5", default: "#FFFFFF"
    t.string "trixel_colour_b6", default: "#FFFFFF"
    t.string "trixel_colour_b7", default: "#FFFFFF"
    t.string "trixel_colour_b8", default: "#FFFFFF"
    t.string "trixel_colour_b9", default: "#FFFFFF"
    t.string "trixel_colour_c1", default: "#FFFFFF"
    t.string "trixel_colour_c2", default: "#FFFFFF"
    t.string "trixel_colour_c3", default: "#FFFFFF"
    t.string "trixel_colour_c4", default: "#FFFFFF"
    t.string "trixel_colour_c5", default: "#FFFFFF"
    t.string "trixel_colour_c6", default: "#FFFFFF"
    t.string "trixel_colour_c7", default: "#FFFFFF"
    t.string "trixel_colour_c8", default: "#FFFFFF"
    t.string "trixel_colour_c9", default: "#FFFFFF"
    t.string "trixel_colour_c10", default: "#FFFFFF"
    t.string "trixel_colour_c11", default: "#FFFFFF"
    t.string "trixel_colour_d1", default: "#FFFFFF"
    t.string "trixel_colour_d2", default: "#FFFFFF"
    t.string "trixel_colour_d3", default: "#FFFFFF"
    t.string "trixel_colour_d4", default: "#FFFFFF"
    t.string "trixel_colour_d5", default: "#FFFFFF"
    t.string "trixel_colour_d6", default: "#FFFFFF"
    t.string "trixel_colour_d7", default: "#FFFFFF"
    t.string "trixel_colour_d8", default: "#FFFFFF"
    t.string "trixel_colour_d9", default: "#FFFFFF"
    t.string "trixel_colour_d10", default: "#FFFFFF"
    t.string "trixel_colour_d11", default: "#FFFFFF"
    t.string "trixel_colour_e1", default: "#FFFFFF"
    t.string "trixel_colour_e2", default: "#FFFFFF"
    t.string "trixel_colour_e3", default: "#FFFFFF"
    t.string "trixel_colour_e4", default: "#FFFFFF"
    t.string "trixel_colour_e5", default: "#FFFFFF"
    t.string "trixel_colour_e6", default: "#FFFFFF"
    t.string "trixel_colour_e7", default: "#FFFFFF"
    t.string "trixel_colour_e8", default: "#FFFFFF"
    t.string "trixel_colour_e9", default: "#FFFFFF"
    t.string "trixel_colour_f1", default: "#FFFFFF"
    t.string "trixel_colour_f2", default: "#FFFFFF"
    t.string "trixel_colour_f3", default: "#FFFFFF"
    t.string "trixel_colour_f4", default: "#FFFFFF"
    t.string "trixel_colour_f5", default: "#FFFFFF"
    t.string "trixel_colour_f6", default: "#FFFFFF"
    t.string "trixel_colour_f7", default: "#FFFFFF"
  end

end
