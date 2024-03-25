import * as getComponent from "./get_component.js"
import { components } from "./components.js";

const tg = window.Telegram.WebApp;



document.getElementById("add-question").addEventListener("click", () => {
    document.getElementById("type-selection-form").style.display = "block";
});

document.getElementById("type-selection-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const buttonId = event.submitter.id;

    switch (buttonId) {
        case "one":
            handleAddQuestion(components.RADIO_BUTTON, components.RADIO_INPUT);
            break;
        case "many":
            handleAddQuestion(components.CHECKBOX, components.CHECKBOX_INPUT);
            break;
        case "text":
            handleAddQuestion(components.TEXT);
            break;
        case "close": 
            document.getElementById("type-selection-form").style.display = "none";
            break;
        default:
            break;
    }
});


const handleAddQuestion = (questionHTML, inputHTML) => {
    const qlist = document.getElementById("questions-list");
    const lastQuestionContainer = qlist.querySelector(".question-container:last-child");
    const lastQuestionId = lastQuestionContainer.id.split("=")[1];
    let newId = lastQuestionId + 1;
    newId = newId ? newId : 1;
    const question = getComponent.getQuestion(newId, questionHTML);
    qlist.insertAdjacentHTML('beforeEnd', question);

    const addNewAns = document.getElementById("add-ans-button=" + newId);
    if (addNewAns) {
        addNewAns.addEventListener("click", (event) => {
            event.preventDefault();
            const newInput = getComponent.getInput(newId, inputHTML);
            const list = document.getElementById("list=" + newId);
            list.insertAdjacentHTML('beforeEnd', newInput);
        });
    }
   

    const deleteQuestion = document.getElementById("delete-q-button=" + newId);
    deleteQuestion.addEventListener("click", () => {
        document.getElementById("question=" + newId).remove();
    });

    const answers = document.getElementById("list=" + newId).childElementCount + 1
    const deleteAns = document.getElementById("q" + newId + "-delete-ans-button=" + 1);
    deleteAns.addEventListener("click", () => {
        // event.preventDefault();
        const list = document.getElementById("list=" + newId);
        list.removeChild(list.lastChild);
    });



}

// document.getElementById("add-question").addEventListener("click", (event) => {




//     const qlist = document.getElementById("questions-list");
//     const lastQuestionId = qlist.lastChild.id;
//     const newId = lastQuestionId + 1;
//     const question = getComponent.getQuestion(newId, components.CHECKBOX);
//     qlist.insertAdjacentHTML('beforeEnd', question);





//     const addNewAns = document.getElementById("add-ans-button=" + newId);
//     addNewAns.addEventListener("click", (event) => {
//         event.preventDefault();
//         const newInput = getComponent.getInput(newId, components.CHECKBOX_INPUT);
//         const list = document.getElementById("list=" + newId);
//         list.insertAdjacentHTML('beforeEnd', newInput);

//     });

//     const deleteQuestion = document.getElementById("delete-q-button=" + newId);
//     deleteQuestion.addEventListener("click", () => {
//         document.getElementById("question=" + newId).remove();
//     });

// const answers = document.getElementById("list=" + newId).childElementCount + 1
// const deleteAns = document.getElementById("q" + newId + "-delete-ans-button=" + 1);
// console.log(deleteAns)
// deleteAns.addEventListener("click", () => {
//     // event.preventDefault();
//     const list = document.getElementById("list=" + newId);
//     list.removeChild(list.lastChild);
// });



// })


// document.getElementById("survey").addEventListener("submit", (event) => {
//     event.preventDefault();

//     let name = document.getElementById("name").value;
//     let description = document.getElementById("description").value;

//     let questions = [];

//     let questionDivs = document.querySelectorAll("[id^='question']");
//     questionDivs.forEach(function (questionDiv) {
//         let question = questionDiv.querySelector("input[type='text']").value;
//         let answers = [];
//         let answerInputs = questionDiv.querySelectorAll("input[id^='ans']");
//         answerInputs.forEach(function (answerInput) {
//             answers.push(answerInput.value);
//         });
//         questions.push({
//             question: question,
//             answers: answers
//         });
//     });

//     let surveyData = {
//         name: name,
//         description: description,
//         questions: questions
//     };

//     console.log(JSON.stringify(surveyData));
//     tg.sendData(JSON.stringify(surveyData));
//     tg.close();
// });
