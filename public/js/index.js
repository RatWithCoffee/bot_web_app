import * as getComponent from "./get_component.js"
import { questionTypes } from "./components.js";

// TODO
// add validation
// check html to json convertion
// delete function, let

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
    const lastAnsId = lastAnsDeleteButton ? parseInt(lastAnsDeleteButton.id.split("=")[1]) : 0;
    return lastAnsId + 1;
}

const handleAddQuestion = (questionType) => {
    const newId = getNewQuestionId();
    const newQuestion = getComponent.getQuestion(newId, questionType);
    const qlist = document.getElementById("questions-list");
    qlist.insertAdjacentHTML('beforeEnd', newQuestion);

    const quest = document.querySelector('.question-container:last-child');

    quest.addEventListener("click", (event) => {
        const { target } = event;
        const { command } = target.dataset;
        if (!command) {
            return;
        }

        switch (command) {
            case 'add-ans':
                const newAnswerId = getNewAnswerId(newId);
                const newInput = getComponent.getInput(newId, questionType, newAnswerId);
                const list = document.getElementById("list=" + newId);
                list.insertAdjacentHTML('beforeEnd', newInput);

                window.location = window.location.toString().split('#')[0] + '#' + quest.querySelector('.question-container__add').id;
                break;
            case 'delete-ans':
                target.parentNode.remove();
                break;
            case 'delete-quest':
                document.getElementById("question=" + newId).classList.add('delete');
                setTimeout(() => {
                    document.getElementById("question=" + newId).remove();
                }, 400)
                break;
        }
    });

    const questuonTextArea = document.getElementById("text=" + newId);
    questuonTextArea.setAttribute("style", "height:" + (questuonTextArea.scrollHeight) + "px;overflow-y:hidden;");
    questuonTextArea.addEventListener("input", OnInput, false);

    window.location = window.location.toString().split('#')[0] + '#' + quest.id;
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
        var answers = container.querySelectorAll('[id*=q]:not([id*=button])');
        question.answers = [];
        answers.forEach(function (answer) {
            console.log(answer)
            question.answers.push(answer.value);
        });

        // Проверяем, является ли вопрос обязательным
        var switchInput = container.querySelector('[id^="switch"]');
        if (switchInput) question.optional = !switchInput.checked;

        // Добавляем вопрос в массив вопросов
        json.questions.push(question);
    });

    return  "[" + json + "]";
}




document.getElementById("survey").addEventListener("click", () => {
    const inputs = form.querySelectorAll('input[type="text"], textarea');
    let hasErrors = false;
    inputs.forEach(input => {
        if (input.value.trim() === '') {
            hasErrors = true;
            input.classList.add('error'); // Добавляем класс empty для пустых полей
        } else {
            input.classList.remove('error'); // Убираем класс empty для заполненных полей

        }
    });

    form.addEventListener('focus', (event) => {
        if (event.target.matches('input[type="text"], textarea')) {
            event.target.classList.remove('error');
        }
    }, true);

    if (document.getElementById('questions-list').children.length === 1) {
        _3Notify.warn("Добавьте хотя бы один вопрос").init();
        return;
    }

    if (hasErrors) {
        _3Notify.warn("Заполните все поля формы").init();
        return;
    }


    const surveyData = htmlToJson();
    console.log(JSON.stringify(surveyData));
    tg.sendData(JSON.stringify(surveyData));
    tg.close();
});

