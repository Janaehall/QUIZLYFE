class CreateAskedQuestions < ActiveRecord::Migration[6.0]
  def change
    create_table :asked_questions do |t|
      t.integer :game_board_id
      t.integer :question_id

      t.timestamps
    end
  end
end
