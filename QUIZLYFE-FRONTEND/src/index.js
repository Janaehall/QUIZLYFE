let questionArr;
let correct;
let modal;
let modalContent;
let gameBoardId;
function main(){
  document.addEventListener('DOMContentLoaded', function(){
      gameBoard()
    })
}
function gameBoard() {
  modalContent = document.getElementById('modal-content')
  modal = document.getElementById('myModal')
  fetchGameBoard()
  addChoiceListener()
}
  function fetchGameBoard(){
    fetch('http://localhost:3000/game_board/1')
    .then(resp => resp.json())
    .then(board => {
      gameBoardId = board["data"]["id"]
      askedQuestionArr = board.included
      questionArr = board.included.map(aq => aq.attributes.question)
      renderBoard(board)
    })
  }
  function renderBoard(board) {
    if (board["included"].every(aq => aq["attributes"]["answered"] === true)) {
      //add more code here
      let body = document.getElementsByTagName('body')[0]
      body.innerText = `You won! Your score: ${board["data"]["attributes"]["score"]}`
    }
    else {
      let score = document.getElementById('score')
      let user = document.getElementById('user')
      score.innerText = `Score: ${board["data"]["attributes"]["score"]}`
      user.innerText = board["data"]["attributes"]["user"]["name"]
      board["included"].forEach(aq => renderAskedQuestion(aq))
    }
  }
  function renderAskedQuestion(aq) {
    let question = aq["attributes"]["question"]
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
    // let getId = document.getElementById(`${aq.id}`)
    // let modal = document.getElementById('myModal')
    // let questionContent = document.getElementById('question-content')
    // getId.addEventListener('click', function(event){
    //   if (event.target.className === "unanswered-card") {
    //     modalContent = document.getElementsByClassName('modal-content')[0]
    //     questionContent.style.backgroundColor = "white"
    //     modalContent.style.backgroundColor = "white"
    //     // let questionContent = document.createElement('div')
    //     // questionContent.id = 'question-content'
    //     questionContent.innerText = question.title
    //     modal.style.display = "block"
    //     modal.dataset.id = aq.id
    //     let choices = document.createElement('div')
    //     choices.id = `choices`
    //     choices.dataset.id = aq.id
    //     choices.innerHTML = ''
    //     newArray.forEach(answer => {
    //       if(answer[0] != null ) {
    //         choices.insertAdjacentHTML('beforeend', `<button class="choice" id="${answer[1]}"> ${answer[0]}</button><br>`)
    //       }
    //     })
    //     questionContent.appendChild(choices)
    //   }
    // })
    addCardListener(aq, question)
  }
  function addCardListener(aq, question) {
    let questionCard = document.getElementById(`${aq.id}`)
    // let modal = document.getElementById('myModal')
    // let questionContent = document.getElementById('question-content')
    const newArray = shuffle([[question['correct_answer'], "correct_answer", question["point_value"]], [question['incorrect_answer_1'], "incorrect_answer", question["point_value"]], [question['incorrect_answer_2'], "incorrect_answer", question["point_value"]], [question['incorrect_answer_3'], "incorrect_answer", question["point_value"]]])
    questionCard.addEventListener('click', function(event){
      if (event.target.className === "unanswered-card") {
        // modalContent = document.getElementById('modal-content')
        // questionContent.style.backgroundColor = "white"
        modalContent.style.backgroundColor = "white"
        // let questionContent = document.createElement('div')
        // questionContent.id = 'question-content'
        modalContent.innerText = question.title
        modal.style.display = "block"
        modal.dataset.id = aq.id
        let choices = document.createElement('div')
        choices.id = 'choices'
        choices.dataset.id = aq.id
        choices.innerHTML = ''
        newArray.forEach(answer => {
          if(answer[0] != null ) {
            choices.insertAdjacentHTML('beforeend', `<button class="choice" id="${answer[1]}"> ${answer[0]}</button><br>`)
          }
        })
        modalContent.appendChild(choices)
      }
    })
  }
    // function setTableRowData(question, aq){
    //   let tableRow
    //   if(question.difficulty==="easy"){
    //     tableRow = document.getElementById('row-1')
    //   }
    //   else if(question.difficulty==="medium"){
    //     tableRow = document.getElementById('row-2')
    //   }
    //   else if(question.difficulty==="hard"){
    //     tableRow = document.getElementById('row-3')
    //   }
    //   if(aq["attributes"]["answered"] === false) {
    //     tableRow.insertAdjacentHTML('beforeend', `<td><div class="unanswered-card" id=${aq.id}>${question.point_value}</div></td>`)
    //   }
    //   else if(aq["attributes"]["answered"] === true) {
    //     console.log('hello')
    //     tableRow.insertAdjacentHTML('beforeend', `<td><div class="answered-card" id=${aq.id}>Answered</div></td>`)
    //   }
    // }
    function addChoiceListener() {
      // let modalContent = document.getElementById('modal-content')
      // let modal = document.getElementById("myModal")
      // let modalContent = document.getElementsByClassName("modal-content")[0]
      modalContent.addEventListener('click', function(event){
      let score = document.getElementById('score')
        if(event.target.className === "choice") {
          if(event.target.id === "correct_answer"){
            scoreVal = parseInt(score.innerText.split(' ')[1]) + parseInt(questionArr[event.target.parentElement.dataset.id-1]['point_value'])
            score.innerText = `Score: ${scoreVal}` 
            correct = true
            updateScore(scoreVal)
            //get modal
            modalContent.innerHTML = ''
            //'answer correct, + x points'
            modalContent.innerHTML = '<h3>You answered correctly!</h3>'
            modalContent.style.backgroundColor = "green"
            // questionContent.style.backgroundColor = "green"
          }
          else if (event.target.id === "incorrect_answer"){
            correct = false
            let correctAns = document.getElementById("correct_answer").innerText
            modalContent.innerHTML = ''
            //'answer correct, + x points'
            modalContent.innerHTML = `<h3>You answered incorrectly!</h3><br><h3>Correct Answer:</h3><p>${correctAns}</p>`
            modalContent.style.backgroundColor = "red"
            // questionContent.style.backgroundColor = "red"
          }
          let id = myModal.dataset.id
          card = document.getElementById(`${id}`)
          card.innerText = 'Answered'
          card.className = 'answered-card'
          updateAskedQuestion(id)
          let continueBtn = document.createElement('button')
          continueBtn.innerText = "Continue"
          modalContent.appendChild(continueBtn)
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
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      'answered': true,
      'correct': correct
      })
    }
    fetch(`http:/localhost:3000/asked_questions/${id}`, reqObj)
    .catch(error => console.log(error.message))
  }
  function updateScore(scoreVal){
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
    fetch(`http://localhost:3000/game_board/${gameBoardId}`, reqObj)
    .catch(error => console.log(error.message))
  }
function fetchUser(newUser){
  let reqObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'name': newUser
    })
  }
  fetch(`http://localhost:3000/users`, reqObj)
}
main();
