class AddIncorrectAnswer3ToQuestions < ActiveRecord::Migration[6.0]
  def change
    add_column :questions, :incorrect_answer_3, :string
  end
end
