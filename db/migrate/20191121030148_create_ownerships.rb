class CreateOwnerships < ActiveRecord::Migration[6.0]
  def change
    create_table :ownerships do |t|
      t.integer :parent_id
      t.integer :subsidiary_id
      t.float :ownership_percentage

      t.timestamps
    end
    add_index :ownerships, :parent_id
    add_index :ownerships, :subsidiary_id
    add_index :ownerships, [:parent_id, :subsidiary_id], unique: true
  end
end
