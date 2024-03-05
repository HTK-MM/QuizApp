let questions = [
    {
        "question": "Wer hat HTML erfunden?",
        "answer_1": "Peppa Pig",
        "answer_2": "Lady Gaga",
        "answer_3": "Tim Berners-Lee",
        "answer_4": "Justin Bieber",
        "right_answer": 3
    },
    {
        "question": "Welche ist der längste Fluss der Welt",
        "answer_1": "Nil",
        "answer_2": "Neckar",
        "answer_3": "Rhein",
        "answer_4": "Amazonas",
        "right_answer": 1
    },
    {
        "question": "Welches Land ist flächenmäßig das zweitgrößte der Erde?",
        "answer_1": "USA",
        "answer_2": "China",
        "answer_3": "Russland",
        "answer_4": "Kanada",
        "right_answer": 4
    },
    {
        "question": "Wie viele Knochen hat ein Erwachsenenkörper?",
        "answer_1": "300",
        "answer_2": "206",
        "answer_3": "521",
        "answer_4": "250",
        "right_answer": 2
    },
    {
        "question": "Was wird durch Antibiotika bekämpft?",
        "answer_1": "Virus",
        "answer_2": "Pilze",
        "answer_3": "Bakterien",
        "answer_4": "Fett",
        "right_answer": 3
    },
    {
        "question": "Welches Tier sieht dem Pferd sehr ähnlich?",
        "answer_1": "Esel",
        "answer_2": "Wolf",
        "answer_3": "Stier",
        "answer_4": "Hund",
        "right_answer": 1
    },
    {
        "question": "Wieviel Grad hat ein rechter Winkel?",
        "answer_1": "60",
        "answer_2": "120",
        "answer_3": "45",
        "answer_4": "90",
        "right_answer": 4
    },
    {
        "question": "Wie heißt die Hauptstadt Kolumbien?",
        "answer_1": "Ciudad de Panama",
        "answer_2": "Bogotá",
        "answer_3": "Caracas",
        "answer_4": "Madrid",
        "right_answer": 2
    },
    {
        "question": "Wie nennt man dir breiteste Taste der Tastatur?",
        "answer_1": "Windows-Taste",
        "answer_2": "Alt-Taste",
        "answer_3": "Space-Taste",
        "answer_4": "Enter-Taste",
        "right_answer": 3
    },
    {
        "question": "Welches Programm schützt vor unbefugten Zugriffen aus dem Internet?",
        "answer_1": "Snowwall",
        "answer_2": "Mainboard",
        "answer_3": "Waterfall",
        "answer_4": "Firewall",
        "right_answer": 4
    },
];


let currentQuestion = 0;
let rigthQuestions = 0;
let audioWinner = new Audio('/audio/aplaus.mp3');
let audioLoser = new Audio('/audio/wah-wah-sad.mp3');
let audioMedium = new Audio('/audio/freesound-dance.mp3');


function init() {
    showQuestion();
}

function showQuestion() {
    let question = questions[currentQuestion];
    if ((currentQuestion + 1) <= questions.length) {
        backInitStyle();
        document.getElementById('questionTxt').innerHTML = question.question;
        document.getElementById('option_1').innerHTML = question.answer_1;
        document.getElementById('option_2').innerHTML = question.answer_2;
        document.getElementById('option_3').innerHTML = question.answer_3;
        document.getElementById('option_4').innerHTML = question.answer_4;
        getFooterPage();
        percent();
    }
    else {
        openDialog();
    }
}

function backInitStyle() {
    document.getElementById('option_1').style.backgroundColor = "transparent";
    document.getElementById('option_2').style.backgroundColor = "transparent";
    document.getElementById('option_3').style.backgroundColor = "transparent";
    document.getElementById('option_4').style.backgroundColor = "transparent";
    document.getElementById('btnNext').disabled = true;
}

function percent() {
    let percent = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById('progressbar').innerHTML = percent.toFixed(0) + '%';
    document.getElementById('progressbar').style.width = percent.toFixed(0) + '%';
}

function getAnswer(answer) {
    let question = questions[currentQuestion];
    let div = document.getElementById(`option_${answer}`); // die Variable kann man so oder
    let divRight = document.getElementById('option_' + question.right_answer); // so schreiben...
    if (question.right_answer == answer) {
        div.style.backgroundColor = "lime";
        rigthQuestions++;
    }
    else {
        div.style.backgroundColor = "lightcoral";
        divRight.style.backgroundColor = "lime";
    }
    document.getElementById('btnNext').disabled = false;
}

function getFooterPage() {
    document.getElementById('allQuestions').innerHTML = questions.length;
    if ((currentQuestion + 1) <= questions.length) {
        document.getElementById('questionNumber').innerHTML = currentQuestion + 1;
    }
    else {
        document.getElementById('questionNumber').innerHTML = questions.length;
    }
}

function nextQuestion() {
    currentQuestion++;
    showQuestion();
    getFooterPage();
}

function openDialog() {
    document.getElementById('dialog').style.display = 'flex';
    document.getElementById('info').innerHTML = rigthQuestions;
    document.getElementById('total').innerHTML = questions.length;
    contentTitleDialog();
}

function contentTitleDialog() {
    if (rigthQuestions >= (questions.length * 0.75)) {
        document.getElementById('titleDialog').innerHTML = "Gratulation!!!";
        document.getElementById('dialog-container').innerHTML = `<img class="imgQuiz" src="/img/winner.jpg">`;
        audioWinner.play();
    }
    else if (rigthQuestions >= (questions.length / 2)) {
        document.getElementById('titleDialog').innerHTML = "Fast geschafft!";
        document.getElementById('dialog-container').innerHTML = `<img class="imgQuiz" src="/img/medium.jpg">`;
        audioMedium.play();
    }
    else {
        document.getElementById('titleDialog').innerHTML = "Leider nicht geschafft!";
        document.getElementById('dialog-container').innerHTML = `<img class="imgQuiz" src="/img/loser.jpg">`;
        audioLoser.play();
    }
}

function closeDialog() {
    document.getElementById('dialog').style.display = 'none';
}

function againPlay() {
    closeDialog();
    currentQuestion = 0;
    rigthQuestions = 0;
    showQuestion();
}


