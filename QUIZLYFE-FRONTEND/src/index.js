let askedQuestionArr;
let questionArr;
let correct;
let formDiv= document.getElementById('form-div')
let gameDiv = document.getElementById('game-div')
let myCounter;

function fetchGameBoard(gameBoard){
  fetch(`http://localhost:3000/game_board/${gameBoard.id}`)
  .then(resp => resp.json())
  .then(board => {
    askedQuestionArr = board.included
    questionArr = board.included.map(aq => aq.attributes.question)
    renderBoard(board)
  })
}
function renderBoard(board) {
  let score = document.getElementById('score')
  let user = document.getElementById('user')
  score.innerText = `Score: ${board["data"]["attributes"]["score"]}`
  user.innerText = board["data"]["attributes"]["user"]["name"]
  board["included"].forEach(aq => renderAskedQuestion(aq))
}

function renderAskedQuestion(aq) {
  // askedQ = askedQuestionArr.find(askedQuestion => askedQuestion.id === aq.id)
  // console.log(askedQuestionArr.indexOf(aq))
  let question = aq["attributes"]["question"]
  const newArray = shuffle([[question['correct_answer'], "correct_answer", question["point_value"]], [question['incorrect_answer_1'], "incorrect_answer", question["point_value"]], [question['incorrect_answer_2'], "incorrect_answer", question["point_value"]], [question['incorrect_answer_3'], "incorrect_answer", question["point_value"]]])
  let tableRow
  if(question.difficulty==="easy"){
    tableRow = document.getElementById('row-1')
  }
  else if(question.difficulty==="medium"){
    tableRow = document.getElementById('row-2')
  }
  else if(question.difficulty==="hard"){
    tableRow = document.getElementById('row-3')
  }
  if(aq["attributes"]["answered"] === false) {
    tableRow.insertAdjacentHTML('beforeend', `<td><div class="unanswered-card" id=${aq.id}>${question.point_value}</div></td>`)
  }
  else if(aq["attributes"]["answered"] === true) {
    tableRow.insertAdjacentHTML('beforeend', `<td><div class="answered-card" id=${aq.id}>Answered</div></td>`)
  }
  // create event listener
  let getId = document.getElementById(`${aq.id}`)
  let modal = document.getElementById('myModal')
  let questionContent = document.getElementById('question-content')

  getId.addEventListener('click', function(event){
    if (event.target.className === "unanswered-card") {
      modalContent = document.getElementsByClassName('modal-content')[0]
      questionContent.style.backgroundColor = "white"
      modalContent.style.backgroundColor = "white"
      questionContent.innerText = question.title
      modal.style.display = "block"
      modal.dataset.id = aq.id
      myCounter = setInterval(decrementCounter, 1000)
      resetCounter()
      decrementCounter()
      let choices = document.createElement('div')
      choices.id = `choices`
      // choices.addEventListener('click', function(){
      //   // clearInterval(myCounter)
      // })
      choices.dataset.id = askedQuestionArr.indexOf(aq)
      choices.innerHTML = ''
      newArray.forEach(answer => {
        if(answer[0] != null ) {
          choices.insertAdjacentHTML('beforeend', `<button class="choice" id="${answer[1]}"> ${answer[0]}</button><br>`)
        }
      })
      questionContent.appendChild(choices)
    }
   })
}
function addChoiceListener() {
    let questionContent = document.getElementById('question-content')
    let modal = document.getElementById("myModal")
    let modalContent = document.getElementsByClassName("modal-content")[0]
    questionContent.addEventListener('click', function(event){
    let score = document.getElementById('score')
    let counter = document.getElementById('counter')

      if(event.target.className === "choice") {
        clearInterval(myCounter)
        counter.innerText = ''

        if(event.target.id === "correct_answer"){
          scoreVal = parseInt(score.innerText.split(' ')[1]) + parseInt(questionArr[event.target.parentElement.dataset.id]['point_value'])
          score.innerText = `Score: ${scoreVal}` 
          correct = true

          let reqObj =  {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              'data': {
                'attributes': {
                  'score': scoreVal
                }
              }
            })
          }

          fetch(`http://localhost:3000/game_board/1`, reqObj)
          .catch(error => console.log(error.message))
          questionContent.innerHTML = ''
          questionContent.innerHTML = '<h3>You answered correctly!</h3>'
          modalContent.style.backgroundColor = "green"
          questionContent.style.backgroundColor = "green"
        }

        else if (event.target.id === "incorrect_answer"){
      
          correct = false
          let correctAns = document.getElementById("correct_answer").innerText
          questionContent.innerHTML = ''
          questionContent.innerHTML = `<h3>You answered incorrectly!</h3><br><h3>Correct Answer:</h3><p>${correctAns}</p>`
          modalContent.style.backgroundColor = "red"
          questionContent.style.backgroundColor = "red"
        }
                // counter.innerText = ''
        let id = myModal.dataset.id
        card = document.getElementById(`${id}`)
        card.innerText = 'Answered'
        card.className = 'answered-card'
        updateAskedQuestion(id)
        let continueBtn = document.createElement('button')
        continueBtn.innerText = "Continue"
        questionContent.appendChild(continueBtn)
        continueBtn.addEventListener('click', function(){
          modal.style.display = 'none'
        })
      }
  })
}

// grab answers and shuffle
function shuffle(array){
 return array.sort(() => Math.random() - 0.5);
}

function updateAskedQuestion(id){
  let reqObj =  {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
     'answered': true,
     'correct': correct
    })
  }
  fetch(`http:/localhost:3000/asked_questions/${id}`, reqObj)
}

function fetchUser(){
  let userData = document.getElementById('inputid')
  let newUsername = userData.value

    let reqObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newUsername
      })
    }
  
    fetch(`http://localhost:3000/users`, reqObj)
      .then(resp => resp.json())
      .then(user => createGameBoard(user))


  }


  function createGameBoard(user){
    let reqObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        score: 0, 
        user_id: user.id 
      })
    }

    fetch('http://localhost:3000/game_board', reqObj)
    .then(resp => resp.json())
    .then(gameBoard => fetchGameBoard(gameBoard))
  }



function postUser(user){
  let userForm = document.querySelector('#user-form')
  userForm.addEventListener('submit', function(event){
    event.preventDefault()
    if(event.target.id === 'user-form'){
      fetchUser();
      elementDisplayHandler(formDiv, 'none');
      elementDisplayHandler(gameDiv, 'block');
  }
})
}

function elementDisplayHandler(element, display){
   element.style.display = display
 }


function decrementCounter() {
  console.log('goodbye')
  let modal = document.getElementById('myModal')
  let id = modal.dataset.id
  let questionContent = document.getElementById('question-content')
  let modalContent = document.getElementById('modal-content')
  // // let counterVal = setInterval(function() {
    let counter = document.getElementById('counter')
    let cnt = parseInt(counter.innerText)
    counter.innerText = cnt - 1
    // let correctAns = document.getElementById("correct_answer").innerText
    if(cnt <= 0 || Number.isNaN(cnt)){
      console.log('hello')
      clearInterval(myCounter)
      counter.innerText = ''
      correct = false
      questionContent.innerHTML = ''
      questionContent.innerHTML = `<h3>You ran out of time! </h3></p>`
      modalContent.style.backgroundColor = "red"
      questionContent.style.backgroundColor = "red"
      updateAskedQuestion(id)
      card = document.getElementById(`${id}`)
        card.innerText = 'Answered'
        card.className = 'answered-card'
        let continueBtn = document.createElement('button')
        continueBtn.innerText = "Continue"
        questionContent.appendChild(continueBtn)
        continueBtn.addEventListener('click', function(){
          modal.style.display = 'none'
        })
    }
  // }, 1000)
}


function resetCounter(){
  let counter = document.getElementById('counter')
  counter.innerText = 10
}




function main(){
  document.addEventListener('DOMContentLoaded', function(){
      addChoiceListener()
      postUser();
    })
}

main();
