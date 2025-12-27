// Initialization of Page
document.addEventListener("DOMContentLoaded", () => {
    // Fade in effect
    document.body.style.opacity = '1';

    // 3D Tilt Effect
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".tilt-me"), {
            max: 5,
            speed: 400,
            glare: true,
            "max-glare": 0.2
        });
    }

    // Smooth Page Transitions
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // Only transition for local .html files
            if (href && href.includes('.html')) {
                e.preventDefault();
                document.body.style.opacity = '0';
                setTimeout(() => {
                    window.location.href = href;
                }, 500);
            }
        });
    });
});