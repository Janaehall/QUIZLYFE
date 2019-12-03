class AskedQuestionsController < ApplicationController

    def show
        aq = AskedQuestion.find(params[:id])
        render json: aq
    end
end
