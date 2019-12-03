require 'rest-client'

request = RestClient.get 'https://opentdb.com/api.php?amount=50'
array = JSON.parse(request)["results"]

array.each do |question|
  new_question = Question.create(
    category: question["category"],
    title: question["question"],
    correct_answer: question["correct_answer"],
    difficulty: question["difficulty"],
    incorrect_answer_1: question["incorrect_answers"][0],
    incorrect_answer_2: question["incorrect_answers"][1],
    incorrect_answer_3: question["incorrect_answers"][2]
    )
    new_question.set_point_value
end

User.create(name: "Janae")
gb = GameBoard.create(user_id: 1)
array = [Question.all.select{|q| q.difficulty == "easy"}.sample(3), Question.all.select{|q| q.difficulty=="medium"}.sample(3), Question.all.select{|q| q.difficulty == "hard"}.sample(3)].flatten
gb.questions = array



