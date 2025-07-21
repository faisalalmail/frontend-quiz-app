const menuContainer = document.getElementById("menu-container");
const questionContainer = document.getElementById("question-container");
const completedContainer = document.getElementById("completed-container");
const question = document.getElementById("question");
const a1 = document.getElementById("A1");
const a2 = document.getElementById("A2");
const a3 = document.getElementById("A3");
const a4 = document.getElementById("A4");
const questionNumber = document.getElementById("question-number");
const subjectName = document.getElementById("subject-name");
const subjectNameR = document.getElementById("subject-name-r");
const subjectIcon = document.getElementById("subject-icon");
const subjectIconR = document.getElementById("subject-icon-r");
const a1button = document.getElementById("a1button");
const a1text = document.getElementById("a1text");
const submittion = document.getElementById("submittion");
let quiz;
let selectedAnswer = 0;
let selectedID = 0;
let correctAnswer;
let selectedQuiz;
let qnum = 0;
let score = 0;
const answers = document.getElementsByClassName("answer");




fetch('/data.json').then((response) => {  
  if(!response.ok) return console.log('Oops! Something went wrong.');
  
  return response.json();}).then((data) => {
  quiz=data;
});


function startQuiz(subject){

    menuContainer.style.display = "none";
    questionContainer.style.display = "flex";
    selectedQuiz = quiz.quizzes.find(q => q.title === subject);
    const icon = document.createElement('img');
    icon.src = selectedQuiz.icon;
    icon.alt = "More details";
    icon.width = 30;
    icon.height = 30;
    subjectIcon.classList.add(selectedQuiz.title);
    subjectIcon.appendChild(icon);

    subjectIconR.classList.add(selectedQuiz.title);
    const iconR = icon.cloneNode();
    subjectIconR.appendChild(iconR);

      loadQuestion(qnum);
    

}

function selectAnswer(answer){
    clearSelections();
  selectedAnswer = answer.dataset.name;
  selectedID = answer.id;


  answer.style.outline = "3px solid var(--purple600)";
  const SelectionLetter = answer.querySelector(".selection");
  SelectionLetter.style.background = "var(--purple600)";
  SelectionLetter.style.color = "white";
}

function submitAnswer(){


  if (selectedAnswer === 0){
    console.log('no answer selected');
  const selectError = document.getElementById("select-error");
  selectError.style.display = "flex";
  }else if(selectedAnswer === correctAnswer){
    correctAnswerProc();
    //call correct question proceduce

  }else if(selectedAnswer !== correctAnswer){
    wrongAnswerProc();
  }
}


function wrongAnswerProc(){
  submittion.textContent = ("Next Question");
  qnum = qnum +1;
  const correctSelected = document.getElementById(selectedID);



  correctSelected.style.outline = "3px solid var(--red500)";

  const SelectionLetter = correctSelected.querySelector(".selection");
  SelectionLetter.style.background = "var(--red500)";
  SelectionLetter.style.color = "white";

  submittion.onclick = function() { loadQuestion(); };


    const icon = document.createElement('img');
    icon.src = "assets/images/icon-incorrect.svg";
    icon.alt = "More details";
    icon.width = 30;
    icon.setAttribute("id","icon");
    icon.height = 30;
    correctSelected.appendChild(icon);


  const correctOne = document.querySelector(`[data-name="${correctAnswer}"]`);

    const cicon = document.createElement('img');
    cicon.src = "assets/images/icon-correct.svg";
    cicon.alt = "More details";
    cicon.width = 30;
    cicon.setAttribute("id","icon");
    cicon.height = 30;
    correctOne.appendChild(cicon);




}


function correctAnswerProc(){
  submittion.textContent = ("Next Question");
  qnum = qnum +1;
  const correctSelected = document.getElementById(selectedID);
  console.log(selectedAnswer);
  correctSelected.style.outline = "3px solid var(--green500)";

  const SelectionLetter = correctSelected.querySelector(".selection");
  SelectionLetter.style.background = "var(--green500)";
  SelectionLetter.style.color = "white";
  score = score + 1;
  console.log("score is" +score)

  submittion.onclick = function() { loadQuestion(); };

    
    const icon = document.createElement('img');
    icon.src = "assets/images/icon-correct.svg";
    icon.alt = "More details";
    icon.setAttribute("id","icon");
    icon.width = 30;
    icon.height = 30;
    correctSelected.appendChild(icon);



}

    function loadQuestion(){
      console.log(qnum);

  const progress = document.getElementById("progress");
  let width = (qnum*10)+'%';
  console.log(width);
  progress.style.width = width;


if(qnum<10){

      clearSelections();
     /*  reset the submit button */
       submittion.textContent = ("Submit answer");
  submittion.onclick = function() { submitAnswer(); };

    question.textContent = selectedQuiz.questions[qnum].question;
    /* question.textContent = quiz.quizzes[title.subject]; */
    correctAnswer = selectedQuiz.questions[qnum].answer;
    subjectName.textContent = selectedQuiz.title;
    subjectNameR.textContent = selectedQuiz.title;


    a1.textContent = selectedQuiz.questions[qnum].options[0];
    a1button.dataset.name = selectedQuiz.questions[qnum].options[0];

    a2.textContent = selectedQuiz.questions[qnum].options[1];
    a2button.dataset.name = selectedQuiz.questions[qnum].options[1];

    a3.textContent = selectedQuiz.questions[qnum].options[2];
    a3button.dataset.name = selectedQuiz.questions[qnum].options[2];

    a4.textContent = selectedQuiz.questions[qnum].options[3];
    a4button.dataset.name = selectedQuiz.questions[qnum].options[3];

    questionNumber.textContent = (qnum+1);
}else if(qnum==10){
  showResults();
}
}

function clearSelections(){
    const selectError = document.getElementById("select-error");
  selectError.style.display = "none";
selectedAnswer = 0;
selectedID = 0;
  for (let an of answers){
    an.style.outline = 0;
    const images = an.querySelectorAll('img'); // Select all <img> tags within the div
  images.forEach(img => img.remove());
  const SelectionLetter = an.querySelector(".selection");
  SelectionLetter.style.background = "var(--grey50)";
  SelectionLetter.style.color = "var(--grey500)";
  }
}


function showResults(){
  const scoreDiv = document.getElementById("score");
  scoreDiv.textContent = score;
  questionContainer.style.display = "none";
  completedContainer.style.display = "flex";

}

function playAgain(){
/*   menuContainer.style.display = 'flex';
  completedContainer.style.display = 'none'; */

  location.reload();


}

function toggleTheme(){
  
  const html = document.documentElement;
  if (!html.classList.contains("dark")){
  html.classList.add("dark");

  const choices = document.getElementsByClassName("choice");
  for( let choice of choices){
    choice.classList.add("dark");
  }


  const texts = document.querySelectorAll(".textPreset1l,.textPreset1m,.textPreset6,.textPreset3,.textPreset4,.textPreset0");
  for (let text of texts){
  
    text.classList.add("dark");
    
  }

  const switcher = document.getElementById("theme-switcher");

  const timages = switcher.querySelectorAll('img'); // Select all <img> tags within the div
  timages.forEach(img => img.remove());
  const sunDark = document.createElement("img");
    sunDark.src = ("assets/images/icon-sun-light.svg")
    sunDark.alt = "Sun Dark";
    sunDark.classList.add("theme-icon");
    switcher.insertBefore(sunDark,switcher.firstChild);

    const moonDark = document.createElement("img");
    moonDark.src = ("assets/images/icon-moon-light.svg");
    moonDark.alt = "Moon Dark";
    moonDark.classList.add("theme-icon");
    switcher.appendChild(moonDark);


  const progressBar = document.getElementById("progress-bar");
  progressBar.classList.add("dark");


  const scoreCard = document.getElementById("score-card");
  scoreCard.classList.add("dark");


  }
  else{ //else starts here

  html.classList.remove("dark");

  const choices = document.getElementsByClassName("choice");
  for( let choice of choices){
    choice.classList.remove("dark");
  }


  const texts = document.querySelectorAll(".textPreset1l,.textPreset1m,.textPreset6,.textPreset3,.textPreset4,.textPreset0");
  for (let text of texts){
  
    text.classList.remove("dark");
    
  }

  const switcher = document.getElementById("theme-switcher");

  const timages = switcher.querySelectorAll('img'); // Select all <img> tags within the div
  timages.forEach(img => img.remove());
  const sunDark = document.createElement("img");
    sunDark.src = ("assets/images/icon-sun-dark.svg")
    sunDark.alt = "Sun Dark";
    sunDark.classList.add("theme-icon");
    switcher.insertBefore(sunDark,switcher.firstChild);

    const moonDark = document.createElement("img");
    moonDark.src = ("assets/images/icon-moon-dark.svg");
    moonDark.alt = "Moon Dark";
    moonDark.classList.add("theme-icon");
    switcher.appendChild(moonDark);


  const progressBar = document.getElementById("progress-bar");
  progressBar.classList.remove("dark");


    const scoreCard = document.getElementById("score-card");
  scoreCard.classList.remove("dark");
  }

}