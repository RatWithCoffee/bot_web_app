import * as getComponent from "./get_component.js"
import { questionTypes } from "./components.js";

const tg = window.Telegram.WebApp;



document.getElementById("add-question").addEventListener("click", () => {
    document.getElementById("type-selection-form").style.display = "block";
});

document.getElementById("type-selection-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const buttonId = event.submitter.id;

    switch (buttonId) {
        case "one":
            handleAddQuestion(questionTypes.RADIO);
            break;
        case "many":
            handleAddQuestion(questionTypes.CHECKBOX);
            break;
        case "text":
            handleAddQuestion(questionTypes.TEXT);
            break;
        case "close":
            document.getElementById("type-selection-form").style.display = "none";
            break;
        default:
            break;
    }
});

const getNewQuestionId = () => {
    const qlist = document.getElementById("questions-list");
    const lastQuestionContainer = qlist.querySelector(".question-container:last-child");
    const lastQuestionId = parseInt(lastQuestionContainer.id.split("=")[1]);
    let newId = lastQuestionId + 1;
    return newId;
}

const handleAddQuestion = (questionType) => {
    const newId = getNewQuestionId();
    const newQuestion = getComponent.getQuestion(newId, questionType);
    const qlist = document.getElementById("questions-list");
    qlist.insertAdjacentHTML('beforeEnd', newQuestion);


    const addNewAns = document.getElementById("add-ans-button=" + newId);

    if (addNewAns) {
        addNewAns.addEventListener("click", () => {
            const answerNum = document.getElementById("list=" + newId).childElementCount + 1;
            const newInput = getComponent.getInput(newId, questionType);
            const list = document.getElementById("list=" + newId);
            list.insertAdjacentHTML('beforeEnd', newInput);
            const deleteAns = document.getElementById("q" + newId + "-delete-ans-button=" + answerNum);
            deleteAns.addEventListener("click", () => {
                const aForDeletion = document.getElementById("q" + newId + "-" + "ans=" + answerNum);
                console.log(aForDeletion)
                aForDeletion.parentNode.remove();
            });
        });
    }

    const deleteQuestion = document.getElementById("delete-q-button=" + newId);
    deleteQuestion.addEventListener("click", () => {
        document.getElementById("question=" + newId).remove();

    });
}


function htmlToJson() {
    var json = {}; // Объект JSON, который будет содержать информацию об опросе
    json.questions = []; // Массив для хранения вопросов

    // Получаем информацию об опросе
    var nameInput = document.getElementById('name');
    var descriptionInput = document.getElementById('description');

    json.name = nameInput.value; // Название опроса
    json.description = descriptionInput.value; // Описание опроса

    // Получаем все контейнеры с вопросами
    var questionContainers = document.querySelectorAll('.question-container');
    var questionContainersArray = Array.from(questionContainers);
    var slicedQuestionContainers = questionContainersArray.slice(1);
    console.log(questionContainers)

    slicedQuestionContainers.forEach(function (container) {
        console.log(container)
        var question = {}; // Объект для хранения информации о вопросе

        // Получаем текст вопроса
        var questionInput = container.querySelector('[id^="text"]');
        question.text = questionInput.value;

        // Определяем тип вопроса
        if (container.querySelector('input[type="radio"]')) {
            question.type = "radio";
        } else if (container.querySelector('input[type="checkbox"]')) {
            question.type = "checkbox";
        } else {
            question.type = "text";
        }

        // Получаем все ответы на вопрос
        var answers = container.querySelectorAll('[id^="q"]');
        question.answers = [];
        answers.forEach(function (answer) {
            question.answers.push(answer.value);
        });

        // Проверяем, является ли вопрос обязательным
        var switchInput = container.querySelector('[id^="switch"]');
        question.optional = !switchInput.checked;

        // Добавляем вопрос в массив вопросов
        json.questions.push(question);
    });

    return json;
}

var result = htmlToJson();
console.log(JSON.stringify(result, null, 4)); // Выводим JSON в консоль



document.getElementById("survey").addEventListener("click", () => {
    console.log(htmlToJson());

    // console.log(JSON.stringify(surveyData));
    // tg.sendData(JSON.stringify(surveyData));
    // tg.close();
});
