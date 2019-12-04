class UsersController < ApplicationController

    def index
        user = User.all 
        render json: user
    end

    def create
        user = User.create(params[:id])
        render json: user
    end

end
