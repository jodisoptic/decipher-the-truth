// Quiz functionality
let quizAnswers = [true, true, true, true, true]; // Correct answers for each question
let userAnswers = [];
let answeredQuestions = 0;

function checkAnswer(button, isAI) {
    const card = button.parentElement.parentElement;
    const options = card.querySelector('.quiz-options');
    const feedback = card.querySelector('.quiz-feedback');
    const questionIndex = Array.from(document.querySelectorAll('.quiz-card')).indexOf(card);
    
    // Prevent re-answering
    if (card.classList.contains('answered')) {
        return;
    }
    
    card.classList.add('answered');
    
    const isCorrect = isAI === quizAnswers[questionIndex];
    userAnswers[questionIndex] = isCorrect;
    
    // Disable all buttons
    const buttons = options.querySelectorAll('.quiz-btn');
    buttons.forEach(btn => {
        btn.disabled = true;
        if ((btn.textContent === 'AI Generated' && isAI) || 
            (btn.textContent === 'Real Art' && !isAI)) {
            btn.classList.add(isCorrect ? 'correct' : 'incorrect');
        }
    });
    
    // Show feedback
    feedback.classList.add('show');
    feedback.classList.add(isCorrect ? 'correct' : 'incorrect');
    feedback.textContent = isCorrect ? 
        '✓ Correct! Great job identifying AI art!' : 
        '✗ Incorrect. Learn more on the Information page.';
    
    answeredQuestions++;
    
    // Check if all questions answered
    if (answeredQuestions === 5) {
        setTimeout(showResults, 1000);
    }
}

function showResults() {
    const correctCount = userAnswers.filter(answer => answer === true).length;
    document.getElementById('correctCount').textContent = correctCount;
    document.getElementById('quizResults').style.display = 'block';
    window.scrollTo(0, document.body.scrollHeight);
}

function resetQuiz() {
    userAnswers = [];
    answeredQuestions = 0;
    
    document.querySelectorAll('.quiz-card').forEach(card => {
        card.classList.remove('answered');
        const buttons = card.querySelectorAll('.quiz-btn');
        buttons.forEach(btn => {
            btn.disabled = false;
            btn.classList.remove('correct', 'incorrect');
        });
        const feedback = card.querySelector('.quiz-feedback');
        feedback.classList.remove('show', 'correct', 'incorrect');
    });
    
    document.getElementById('quizResults').style.display = 'none';
    window.scrollTo(0, 0);
}

// Set active nav link
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});