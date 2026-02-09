document.addEventListener('DOMContentLoaded', () => {
    // Add smooth entrance animations for grid items
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });

    // Sidebar link active state switching
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Mock search interaction
    const searchInput = document.querySelector('.search-bar input');
    searchInput.addEventListener('focus', () => {
        document.querySelector('.search-bar').style.width = '400px';
    });
    searchInput.addEventListener('blur', () => {
        document.querySelector('.search-bar').style.width = '300px';
    });
});
