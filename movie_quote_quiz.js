const questions = [
    {
      question: "'You're tacky and I hate you!'",
      answers: [
        { text: "Mean Girls", correct: false},
        { text: "School of Rock", correct: true},
        { text: "Step Brothers", correct: false},
        { text: "Terminator", correct: false},
      ]
    },
    {
      question: "'Where we're going, we don't need roads'",
      answers: [
        { text: "Ferris Bueller's Day Off", correct: false},
        { text: "Cars", correct: false},
        { text: "Karate Kid", correct: false},
        { text: "Back to the Future", correct: true},
      ]
    },
      {
      question: "'Carpe dentum, seize the teeth!'",
      answers: [
        { text: "Mrs Doubtfire", correct: true},
        { text: "Toy Story", correct: false},
        { text: "Bridesmaids", correct: false},
        { text: "Austin Powers", correct: false},
      ]
    },
      {
      question: "'Keep the change, ya filthy animal!'",
      answers: [
        { text: "Hot Fuzz", correct: false},
        { text: "Elf", correct: false},
        { text: "Home Alone", correct: true},
        { text: "Airplane", correct: false},
      ]
    },
      {
      question: "'Hold onto your butts!'",
      answers: [
        { text: "Mad Max", correct: false},
        { text: "Jurassic Park", correct: true},
        { text: "Titanic", correct: false},
        { text: "Shaun of the Dead", correct: false},
      ]
    },
  ];
  
  //assign variables from html:  
  const questionElement = document.getElementById("question");
  const answerButtons = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn");
  const currentScore = document.getElementById("current-score");
  
  //tracking user scores, start from 0, but will change as the quiz progresses:
  let currentQuestionIndex = 0;
  let score = 0;
  
  
  function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
  }
  
  //if an answer is selected before the timer is done it seems to have a bit of a freak out 
  //and tries to reset but also continue the previous count down. Need to find a way to stop countdown when an answer is selected
  function timer (){
    let time = 10;
    const interval = setInterval(function(){
      document.getElementById("time").innerHTML=`Time left: ${time}`;
      time--;
      if (time === -1){
        clearInterval(interval);
        console.log("Time up");
        Array.from(answerButtons.children).forEach(button =>{
          if(button.dataset.correct === "true"){
            button.classList.add("correct");
          }
          button.disabled = true;
          nextButton.style.display = "block";
        });
      }
    }, 1000);
    answerButtons.addEventListener("click", function(){
      clearInterval(interval);
    });
  }
  
  function showQuestion(){
    resetState();
    scoreSoFar();
    timer();
    //retreives first question from  questions array:
    let currentQuestion = questions[currentQuestionIndex];
    //adding question number to beginning of question:
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    
    //arrow functions allow us to write shorter syntax:
    currentQuestion.answers.forEach(answer => {
      const button = document.createElement("button");
      button.innerHTML = answer.text;
      button.classList.add("btn");
      //displays new questions in the div:
      answerButtons.appendChild(button);
      if(answer.correct){
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
    });
  }
  
  function resetState(){
    nextButton.style.display = "none";
    //remove placeholder/previous answer buttons. I don't fully understand exactly what is 
    //happening in the syntax, but I watched a youtube tutorial of how to get it to work and 
    //it does so I am going with it!
    while(answerButtons.firstChild){
      answerButtons.removeChild(answerButtons.firstChild);
    }
  }
  
  function selectAnswer(e){
  //The target property returns the element where the event occured, 
  //i.e. the answer the user clicked on, triggering the event listener
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect){
      selectBtn.classList.add("correct");
      score++;
    }else{
      selectBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
      if(button.dataset.correct === "true"){
        button.classList.add("correct");//once answer is assigned to a class it will take 
        //on the CSS of either the "correct" or "incorrect" class, turning the button green or red
      }
      button.disabled = true;
    });
  //   next button hidden until answer is selected and above if statement is compelted
    nextButton.style.display = "block";
  }
  
  function scoreSoFar(){
    currentScore.innerHTML = `Current score: ${score}/${questions.length}`;
  };
  
  
  function showScore(){
    resetState();
    scoreSoFar();
      if(score < 1){
      questionElement.innerHTML = `Hard luck, you scored ${score} out of ${questions.length}!`;
    }else if(score <= 3){
      questionElement.innerHTML = `Nice, you scored ${score} out of ${questions.length}!`;
    } else if(score == 4){
      questionElement.innerHTML = `Awesome, you scored ${score} out of ${questions.length}!`;
    } else if(score == 5){
      questionElement.innerHTML = `Incredible! You scored ${score} out of ${questions.length}!`;
    };
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
  }
  
  function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
      showQuestion();
    }else{
      showScore();
    }
  }
  
  nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
      handleNextButton();
    }else{
      startQuiz();
    }
  });
  
  startQuiz();