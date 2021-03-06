class GameBoard < ApplicationRecord
  belongs_to :user
  has_many :asked_questions
  has_many :questions, through: :asked_questions
end
