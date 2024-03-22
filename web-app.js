const tg = window.Telegram.WebApp;

const closeAppButton = document.getElementById('close_app');
closeAppButton.addEventListener('click', () => {
    tg.close();
})