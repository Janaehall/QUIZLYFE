Rails.application.routes.draw do
  resources :incorrect_answers
  resources :asked_questions
  resources :game_board
  resources :users
  resources :questions
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
