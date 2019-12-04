class User < ApplicationRecord
  has_many :game_boards

  validates :name, presence: true, length: {minimum: 3}

end
