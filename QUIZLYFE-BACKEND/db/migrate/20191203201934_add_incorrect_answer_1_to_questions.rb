class AddIncorrectAnswer1ToQuestions < ActiveRecord::Migration[6.0]
  def change
    add_column :questions, :incorrect_answer_1, :string
  end
end
