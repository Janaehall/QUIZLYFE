class AddAnsweredToAskedQuestions < ActiveRecord::Migration[6.0]
  def change
    add_column :asked_questions, :answered, :boolean, default: false
  end
end
