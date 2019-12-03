class AddCorrectToAskedQuestions < ActiveRecord::Migration[6.0]
  def change
    add_column :asked_questions, :correct, :boolean
  end
end
