class AskedQuestionSerializer
  include FastJsonapi::ObjectSerializer
  attributes :game_board_id, :question_id, :question, :answered, :correct
  belongs_to :game_board
  belongs_to :question
end
