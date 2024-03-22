const tg = window.Telegram.WebApp;

const data = {
    "name": "Тестовый опрос",
    "questions": [
        {
            "question": "Как жизнь?",
            "answers": ["Хорошо", "Плохо"]
        },
        {
            "question": "Что интересного расскажешь?",
            "answers": []
        }
    ]
}

const closeAppButton = document.getElementById('close_app');
closeAppButton.addEventListener('click', () => {
    tg.sendData(JSON.stringify({data:'test'}));
    console.log(data);
    tg.close();
})