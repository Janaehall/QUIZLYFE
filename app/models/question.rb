class Question < ApplicationRecord
  has_many :incorrect_answers
  has_many :asked_questions
  has_many :game_boards, through: :asked_questions
end
