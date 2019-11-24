class CreateEmployees < ActiveRecord::Migration[6.0]
  def change
    create_table :employees do |t|
      t.string :name
      t.string :email
      t.string :position
      t.integer :phone_number
      t.integer :salary
      t.date :date_hired

      t.timestamps
    end
  end
end
