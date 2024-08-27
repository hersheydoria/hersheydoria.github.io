let intro = document.querySelector('.intro');
let logo = document.querySelector('.logo-header');
let logoSpan = document.querySelectorAll('.logo'); // Use querySelectorAll

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        logoSpan.forEach((span, idx) => {
            setTimeout(() => {
                span.classList.add('active');
            }, (idx + 1) * 400);
        });

        setTimeout(() => {
            logoSpan.forEach((span, idx) => {
                setTimeout(() => {
                    span.classList.remove('active');
                    span.classList.add('fade');
                }, (idx + 1) * 50);
            });
        }, 2000);

        setTimeout(() => {
            intro.style.top = '-100vh';
        }, 2300);
    }, 100); // Add a slight delay before starting the animation
});

const nav = document.querySelector("nav");
const toggleBtn = nav.querySelector(".toggle-btn");

toggleBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
});

// JS code to make draggable nav
function onDrag(event) {
    const navStyle = window.getComputedStyle(nav);
    const navTop = parseInt(navStyle.top);
    const navHeight = parseInt(navStyle.height);
    const windHeight = window.innerHeight;

    nav.style.top = navTop > 0 ? `${navTop + event.movementY}px` : "1px";

    // Prevent default behavior
    event.preventDefault();
}

// Start dragging
nav.addEventListener("mousedown", () => {
    document.addEventListener("mousemove", onDrag);
});

// Stop dragging when the mouse is released
document.addEventListener("mouseup", () => {
    document.removeEventListener("mousemove", onDrag);
});

// Stop dragging when the mouse leaves the window
document.addEventListener("mouseleave", () => {
    document.removeEventListener("mousemove", onDrag);
});
