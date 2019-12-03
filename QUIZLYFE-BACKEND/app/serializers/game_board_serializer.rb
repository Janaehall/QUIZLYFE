class GameBoardSerializer
  include FastJsonapi::ObjectSerializer
  attributes :score, :user_id, :asked_questions, :user
  belongs_to :user
  has_many :asked_questions
  # has_many :questions, through: :asked_questions
end
