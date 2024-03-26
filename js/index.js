import * as getComponent from "./get_component.js"
import { questionTypes } from "./components.js";

const tg = window.Telegram.WebApp;

const tx = document.getElementsByTagName("textarea");

function OnInput() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + "px";
}

for (let i = 0; i < tx.length; i++) {
    tx[i].style.height = tx[i].scrollHeight + 'px'; // Устанавливаем высоту
    tx[i].style.overflowY = 'hidden'; // Устанавливаем скрытие вертикальной прокрутки
    tx[i].addEventListener("input", OnInput, false);
}



document.getElementById("add-question").addEventListener("click", () => {
    document.getElementById("popup-background").style.display = "flex";
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
    }


    document.getElementById("popup-background").style.display = "none";
});

const getNewQuestionId = () => {
    const qlist = document.getElementById("questions-list");
    const lastQuestionContainer = qlist.querySelector(".question-container:last-child");
    const lastQuestionId = parseInt(lastQuestionContainer.id.split("=")[1]);
    let newId = lastQuestionId + 1;
    return newId;
}

const getNewAnswerId = (questionId) => {
    const alist = document.getElementById("list=" + questionId);
    const lastAnsDeleteButton = alist.querySelector(".checkbox-container:last-child");
    const lastAnsId = parseInt(lastAnsDeleteButton.id.split("=")[1]);
    return lastAnsId + 1;
}

const handleAddQuestion = (questionType) => {
    const newId = getNewQuestionId();
    const newQuestion = getComponent.getQuestion(newId, questionType);
    const qlist = document.getElementById("questions-list");
    qlist.insertAdjacentHTML('beforeEnd', newQuestion);

    const questuonTextArea = document.getElementById("text=" + newId);
    console.log(questuonTextArea)
    questuonTextArea.setAttribute("style", "height:" + (questuonTextArea.scrollHeight) + "px;overflow-y:hidden;");
    questuonTextArea.addEventListener("input", OnInput, false);


    const addNewAns = document.getElementById("add-ans-button=" + newId);
    if (addNewAns) {
        addNewAns.addEventListener("click", () => {
            const newAnswerId = getNewAnswerId(newId);
            const newInput = getComponent.getInput(newId, questionType, newAnswerId);
            const list = document.getElementById("list=" + newId);
            list.insertAdjacentHTML('beforeEnd', newInput);
            const deleteAns = document.getElementById("q" + newId + "-delete-ans-button=" + newAnswerId);
            deleteAns.addEventListener("click", () => {
                const aForDeletion = document.getElementById("q" + newId + "-" + "ans=" + newAnswerId);
                aForDeletion.parentNode.remove();
            });
        });
    }

    const deleteQuestion = document.getElementById("delete-q-button=" + newId);
    deleteQuestion.addEventListener("click", () => {
        document.getElementById("question=" + newId).remove();

    });
}


const htmlToJson = () => {
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
        if (switchInput) question.optional = !switchInput.checked;

        // Добавляем вопрос в массив вопросов
        json.questions.push(question);
    });

    return json;
}




document.getElementById("survey").addEventListener("click", () => {
    const surveyData = htmlToJson();
    console.log(JSON.stringify(surveyData));
    tg.sendData(JSON.stringify(surveyData));
    tg.close();
});
