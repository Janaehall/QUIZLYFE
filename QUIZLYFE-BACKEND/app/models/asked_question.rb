class AskedQuestion < ApplicationRecord
  belongs_to :game_board
  belongs_to :question
end
