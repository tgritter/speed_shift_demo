class ChangeIntegerLimitInEmployees < ActiveRecord::Migration[6.0]
  def change
    change_column :employees, :phone_number, 'bigint USING CAST(phone_number AS bigint)'
  end
end
