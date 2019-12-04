class GameBoardController < ApplicationController

    def show
        gameboard = GameBoard.find(params[:id])
        options = {
            include: [:asked_questions]
    }
        render json: GameBoardSerializer.new(gameboard, options)
        # render json: gameboard, include: :asked_questions
        
    end

    def update
        gameboard = gameboard.find(params[:id])
        gameboard.score = params[:data][:attributes][:score]
        gameboard.save
    end
    
end
