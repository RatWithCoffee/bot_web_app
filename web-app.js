const tg = window.Telegram.WebApp;


document.getElementById("survey").addEventListener("submit", function(event) {
    event.preventDefault(); 

    let name = document.getElementById("name").value;
    let description = document.getElementById("description").value;
    
    let questions = [];

    let questionDivs = document.querySelectorAll("[id^='question']");
    questionDivs.forEach(function(questionDiv) {
        let question = questionDiv.querySelector("input[type='text']").value;
        let answers = [];
        let answerInputs = questionDiv.querySelectorAll("input[id^='ans']");
        answerInputs.forEach(function(answerInput) {
            answers.push(answerInput.value);
        });
        questions.push({
            question: question,
            answers: answers
        });
    });

    let surveyData = {
        name: name,
        description: description,
        questions: questions
    };

    console.log(JSON.stringify(surveyData));
    tg.sendData(JSON.stringify(surveyData));
    tg.close();
});
