require 'rest-client'

request = RestClient.get 'https://opentdb.com/api.php?amount=50'
array = JSON.parse(request)["results"]

array.each do |question|
  correct = question["correct_answer"].gsub(/&quot;/, "'").gsub(/&#039;/, "'")
  incorrect = question["incorrect_answers"].map{|ans| ans.gsub(/&quot;/, "'").gsub(/&#039;/, "'")}
  quest = question["question"].gsub(/&quot;/, "'").gsub(/&#039;/, "'")
  new_question = Question.create(
    category: question["category"],
    title: quest,
    correct_answer: correct,
    difficulty: question["difficulty"],
    incorrect_answer_1: incorrect[0],
    incorrect_answer_2: incorrect[1],
    incorrect_answer_3: incorrect[2]
    )
    new_question.set_point_value
end

User.create(name: "Janae")
gb = GameBoard.create(user_id: 1)
array = [Question.all.select{|q| q.difficulty == "easy"}.sample(3), Question.all.select{|q| q.difficulty=="medium"}.sample(3), Question.all.select{|q| q.difficulty == "hard"}.sample(3)].flatten
gb.questions = array





