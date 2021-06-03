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

ActiveRecord::Schema.define(version: 2021_06_03_152656) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "tiles", force: :cascade do |t|
    t.string "ip_address"
    t.string "country_code"
    t.boolean "draft", default: true, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "order", default: 0
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

  add_foreign_key "trixels", "tiles"
end
