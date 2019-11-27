class Entity < ApplicationRecord
	has_many :owners, class_name: "Ownership",
										foreign_key: "owner_id",
										dependent: :destroy
  has_many :subsidiaries, class_name: "Ownership",
  												foreign_key: "subsidiary_id",
  												dependent: :destroy
end
