class Entity < ApplicationRecord
  has_many :ownerships_as_parent, :foreign_key => "parent_id", :class_name => "Ownership"
  has_many :subsidiaries, :through => :ownerships_as_parent

  has_many :ownerships_as_subsidiary, :foreign_key => "subsidiary_id", :class_name => "Ownership"
  has_many :parents, :through => :ownerships_as_subsidiary

  def family_tree
    self.subsidiaries.map { |diary| { key: diary.id, name: diary.name } }
  end
end
