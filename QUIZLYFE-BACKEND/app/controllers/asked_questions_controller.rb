class AskedQuestionsController < ApplicationController

    def show
        aq = AskedQuestion.find(params[:id])
        render json: aq
    end

    def update
        aq = AskedQuestion.find(params[:id])
        aq.answered = params[:answered]
        aq.correct = params[:correct]
        aq.save
    end
end
