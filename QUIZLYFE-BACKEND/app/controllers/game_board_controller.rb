class GameBoardController < ApplicationController

    def index
        gameboards = GameBoard.all
        render json: gameboards
    end

    def show
        gameboard = GameBoard.find(params[:id])
        options = {
            include: [:asked_questions]
    }
        render json: GameBoardSerializer.new(gameboard, options)
        # render json: gameboard, include: :asked_questions 
    end

    def update
       gameboard = GameBoard.find(params[:id])
       gameboard.score = params[:data][:attributes][:score]
       gameboard.save
    end

    def create
        gameboard = GameBoard.create(score: params[:score], user_id: params[:user_id])
        array = [Question.all.select{|q| q.difficulty == "easy"}.sample(3), Question.all.select{|q| q.difficulty=="medium"}.sample(3), Question.all.select{|q| q.difficulty == "hard"}.sample(3)].flatten
        gameboard.questions = array
        render json: gameboard
    end
end
