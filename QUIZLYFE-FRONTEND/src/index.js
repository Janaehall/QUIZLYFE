let askedQuestionArr;
let questionArr;
document.addEventListener('DOMContentLoaded', function(){
    fetch('http://localhost:3000/game_board/1')
    .then(resp => resp.json())
    .then(board => {
      askedQuestionArr = board.included
      questionArr = board.included.map(aq => aq.attributes.question)
      renderBoard(board)
    })
    addChoiceListener()
  })
  function renderBoard(board) {
    let score = document.getElementById('score')
    let user = document.getElementById('user')
    console.log(board["data"]["attributes"]["score"])
    score.innerText = `Score: ${board["data"]["attributes"]["score"]}`
    user.innerText = board["data"]["attributes"]["user"]["name"]
    board["included"].forEach(aq => renderAskedQuestion(aq))
    
  }
  function renderAskedQuestion(aq) {
    let question = aq["attributes"]["question"]
    const newArray = shuffle([[question['correct_answer'], "correct_answer", question["point_value"]], [question['incorrect_answer_1'], "incorrect_answer", question["point_value"]], [question['incorrect_answer_2'], "incorrect_answer", question["point_value"]], [question['incorrect_answer_3'], "incorrect_answer", question["point_value"]]])
    
    // let findForm = document.getElementById('form')
    // let questionContent = document.getElementById('question-content')
    
    // console.log(question)
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
    console.log(tableRow)
    tableRow.insertAdjacentHTML('beforeend', `<td><div class="card" id=${aq.id}>${question.point_value}</div></td>`)

    // create event listener
    let getId = document.getElementById(`${aq.id}`)
    let modal = document.getElementById('myModal')
    let questionContent = document.getElementById('question-content')

    getId.addEventListener('click', function(event){
      modalContent = document.getElementsByClassName('modal-content')[0]
      questionContent.innerText = question.title
      modal.style.display = "block"
      let choices = document.createElement('div')
      choices.id = `choices`
      choices.dataset.id = aq.id
      choices.innerHTML = ''
      newArray.forEach(answer => choices.insertAdjacentHTML('beforeend', `<button class="choice" value="${answer[1]}"> ${answer[0]}</button><br>`))
      questionContent.appendChild(choices)
    
     })

    // addChoiceListener(question)
    let getSpan = document.getElementsByClassName("close")[0]

    getSpan.addEventListener('click', function(event){
      modal.style.display = 'none'
    })
  
  }

  function addChoiceListener() {
    let questionContent = document.getElementById('question-content')
    questionContent.addEventListener('click', function(event){
        
      let score = document.getElementById('score')
      if(event.target.className === "choice") {
        if(event.target.value === "correct_answer"){
          scoreVal = parseInt(score.innerText.split(' ')[1]) + parseInt(questionArr[event.target.parentElement.dataset.id-1]['point_value'])
          score.innerText = `Score: ${scoreVal}` 
          // let reqObj =  {
          //   method: 'PATCH',
          //   headers: {
          //     'Content-Type': 'application/json'
          //   },
          //   body: JSON.stringify({
          //     'data': {
          //       'attributes': {
          //         'score': scoreVal
          //       }
          //     }
          //   })
          // }

          // fetch(`http://localhost:3000/game_board/1`, reqObj)
        }
      }
    })
  }

  // grab answers and shuffle

  function shuffle(array){
   return array.sort(() => Math.random() - 0.5);
  }
