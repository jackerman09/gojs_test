class Ownership < ApplicationRecord
	belongs_to :owner, class_name: "Entity"
	belongs_to :subsidiary, class_name: "Entity"
end
