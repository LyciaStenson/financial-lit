// This is a simple game with the scroll box and guessing the anwsers

import { getCurrentUser, getQuestionData, setScore, randomScore } from "@/src/firebaseBridge";

//The currentQuestion "struct" is in the same layout as the Firebase Database. Any change to that we will have to change to be the same other wise it won't work


let choice = {
    Answer: "",
    Result: false
}

let question = {
    question: "",
    choices: [choice]
}

let currentQuestion = {
    question: "",
    choices: [choice]
}

let questionLoaded = false;
let allQuestionComplete = false;

let questions = [];

let currentScore = 0;

export function getCurrentQuestion() {

    return currentQuestion;
}

export function hasAllQuestionBeenCompleted(){
    return allQuestionComplete;
}

export function hasQuestionsLoaded() {
    return questionLoaded;
}

export async function checkCurrentQuestion(result) {
    if (checkForLastQuestion()) return; //End of the quiz here
    console.log(result);

    if (result == true) {
        setScore(currentScore += 1);
        currentQuestion = questions.pop();
    } else {
        currentQuestion = questions.pop();
    }
}

export async function loadQuiz() {
    if (!questionLoaded) {
        await loadAllQuestions();
        
        //currentScore = getCurrentUser().scoreAmount;

        currentQuestion = questions.pop();
       
        questionLoaded = true;

        console.log("Loaded all questions");
    }
}

function checkForLastQuestion() {
    if (questions.length <= 0) {
        console.log("All question completed!");
        allQuestionComplete = true;
        return true;
    }

    return false;
}

async function loadAllQuestions() {
    try {
        const data = await getQuestionData();
        data.forEach(item => {
            let question = {  // Create a new question object inside the loop
                question: "",
                choices: [choice]
            };
            question.question =  item.question;
            question.choices = item.choices;
            questions.push(question);
        });
    } catch (error) {
        console.error('Error loading quiz:', error);
    }
}