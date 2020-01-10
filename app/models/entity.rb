class Entity < ApplicationRecord
  has_many :ownerships_as_parent, :foreign_key => "parent_id", :class_name => "Ownership"
  has_many :subsidiaries, :through => :ownerships_as_parent

  has_many :ownerships_as_subsidiary, :foreign_key => "subsidiary_id", :class_name => "Ownership"
  has_many :parents, :through => :ownerships_as_subsidiary

  def family_tree
    subsidiaries = self.subsidiaries.where.not(id: self.id)
    parents = self.parents #includes self
    family = subsidiaries + parents
    family.map { |diary| { key: diary.id, name: diary.name } }.to_json
  end

  def relationships
    subsidiary_relationships = self.ownerships_as_parent.where.not(subsidiary_id: self.id)
    parent_relationships = self.ownerships_as_subsidiary.where.not(parent_id: self.id)
    relationships = subsidiary_relationships + parent_relationships
    relationships.map { 
      |diary| { from: diary.parent_id, to: diary.subsidiary_id, ownership: diary.ownership_percentage }
    }.to_json
  end

  def extended_family_tree
  end

  def extended_relationships
  end
end
