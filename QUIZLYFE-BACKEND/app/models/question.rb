class Question < ApplicationRecord
  has_many :asked_questions
  has_many :game_boards, through: :asked_questions

  def set_point_value
    if self.difficulty == "easy"
      self.point_value = 100
    elsif self.difficulty == "medium"
      self.point_value = 200
    elsif self.difficulty == "hard"
      self.point_value = 300
    end
    self.save
  end
end
