class AddPointValueToQuestions < ActiveRecord::Migration[6.0]
  def change
    add_column :questions, :point_value, :integer
  end
end
