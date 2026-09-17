// Interactive button behavior
document.addEventListener('DOMContentLoaded', () => {
    const ctaButton = document.getElementById('cta-btn');

    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            const articlesSection = document.getElementById('articles');
            articlesSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
});