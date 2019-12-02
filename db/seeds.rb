require 'rest-client'

request = RestClient.get 'https://opentdb.com/api.php?amount=50'
array = JSON.parse(request)["results"]

array.each do |question|
  new_question = Question.create(
    category: question["category"],
    title: question["question"],
    correct_answer: question["correct_answer"],
    difficulty: question["difficulty"]
    )
    question["incorrect_answers"].each do |incorrect_answer|
      IncorrectAnswer.create(
        answer: incorrect_answer,
        question_id: new_question.id
      )
    end
end


