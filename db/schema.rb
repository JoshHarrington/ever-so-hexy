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

ActiveRecord::Schema.define(version: 2021_06_09_220821) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "hexes", force: :cascade do |t|
    t.string "ip_address"
    t.string "country_code"
    t.boolean "draft", default: true, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "order", default: 0
    t.string "trixel_colour_a1"
    t.string "trixel_colour_a2"
    t.string "trixel_colour_a3"
    t.string "trixel_colour_a4"
    t.string "trixel_colour_a5"
    t.string "trixel_colour_a6"
    t.string "trixel_colour_a7"
    t.string "trixel_colour_b1"
    t.string "trixel_colour_b2"
    t.string "trixel_colour_b3"
    t.string "trixel_colour_b4"
    t.string "trixel_colour_b5"
    t.string "trixel_colour_b6"
    t.string "trixel_colour_b7"
    t.string "trixel_colour_b8"
    t.string "trixel_colour_b9"
    t.string "trixel_colour_c1"
    t.string "trixel_colour_c2"
    t.string "trixel_colour_c3"
    t.string "trixel_colour_c4"
    t.string "trixel_colour_c5"
    t.string "trixel_colour_c6"
    t.string "trixel_colour_c7"
    t.string "trixel_colour_c8"
    t.string "trixel_colour_c9"
    t.string "trixel_colour_c10"
    t.string "trixel_colour_c11"
    t.string "trixel_colour_d1"
    t.string "trixel_colour_d2"
    t.string "trixel_colour_d3"
    t.string "trixel_colour_d4"
    t.string "trixel_colour_d5"
    t.string "trixel_colour_d6"
    t.string "trixel_colour_d7"
    t.string "trixel_colour_d8"
    t.string "trixel_colour_d9"
    t.string "trixel_colour_d10"
    t.string "trixel_colour_d11"
    t.string "trixel_colour_e1"
    t.string "trixel_colour_e2"
    t.string "trixel_colour_e3"
    t.string "trixel_colour_e4"
    t.string "trixel_colour_e5"
    t.string "trixel_colour_e6"
    t.string "trixel_colour_e7"
    t.string "trixel_colour_e8"
    t.string "trixel_colour_e9"
    t.string "trixel_colour_f1"
    t.string "trixel_colour_f2"
    t.string "trixel_colour_f3"
    t.string "trixel_colour_f4"
    t.string "trixel_colour_f5"
    t.string "trixel_colour_f6"
    t.string "trixel_colour_f7"
  end

  create_table "trixels", force: :cascade do |t|
    t.bigint "tile_id"
    t.string "colour", default: "white", null: false
    t.string "position", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "d"
    t.index ["tile_id"], name: "index_trixels_on_tile_id"
  end

  add_foreign_key "trixels", "hexes", column: "tile_id"
end
