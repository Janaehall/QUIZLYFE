class CreateQuestions < ActiveRecord::Migration[6.0]
  def change
    create_table :questions do |t|
      t.string :title
      t.string :correct_answer
      t.string :category
      t.string :difficulty

      t.timestamps
    end
  end
end
