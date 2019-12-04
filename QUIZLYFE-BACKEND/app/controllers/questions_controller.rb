class QuestionsController < ApplicationController

    def show
        quest = Question.find(params[:id])
        render json: quest
    end
end
