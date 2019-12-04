class AddIncorrectAnswer2ToQuestions < ActiveRecord::Migration[6.0]
  def change
    add_column :questions, :incorrect_answer_2, :string
  end
end
