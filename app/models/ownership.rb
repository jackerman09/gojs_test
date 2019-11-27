class Ownership < ApplicationRecord
	belongs_to :parent, foreign_key: "parent_id", class_name: "Entity"
	belongs_to :subsidiary, foreign_key: "subsidiary_id", class_name: "Entity"
end
