class QuestionSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :correct_answer, :difficulty, :category, :incorrect_answer_1, :incorrect_answer_2, :incorrect_answer_3
  has_many :asked_questions
  has_many :game_boards, through: :asked_questions
end
