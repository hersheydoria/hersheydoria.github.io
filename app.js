let intro = document.querySelector('.intro');
let logo = document.querySelector('.logo-header');
let logoSpan = document.querySelectorAll('.logo');
let introImage = document.querySelector('.intro-image'); // Add this line

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        // Animate image
        introImage.style.opacity = 1;

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

            // Fade out image
            introImage.style.opacity = 0;
        }, 2000);

        setTimeout(() => {
            intro.style.top = '-100vh';
        }, 2300);
    }, 100); // Add a slight delay before starting the animation
});

const nav = document.querySelector("nav");
const toggleBtn = nav.querySelector(".toggle-btn");

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

document.addEventListener("DOMContentLoaded", function () {
    // Create an intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the 'animate' class to skill-per elements
                const skillBars = entry.target.querySelectorAll('.skill-per');
                skillBars.forEach(bar => {
                    // Ensure animation class is removed before adding
                    bar.classList.remove('animate');
                    // Trigger reflow to restart the animation
                    void bar.offsetWidth; 
                    bar.classList.add('animate');
                });
            } else {
                // Optionally remove the animation class if not in view
                const skillBars = entry.target.querySelectorAll('.skill-per');
                skillBars.forEach(bar => bar.classList.remove('animate'));
            }
        });
    }, { threshold: 0.5 }); // Trigger when at least 50% of the element is in view

    // Observe each .skill-box
    document.querySelectorAll('.skill-box').forEach(box => observer.observe(box));
});
/*pages animation*/
document.addEventListener('DOMContentLoaded', function () {
    document.body.classList.add('fade-in');
});

window.addEventListener('beforeunload', function () {
    document.body.classList.add('fade-out');
});

document.addEventListener('animationend', function (event) {
    if (event.animationName === 'fadeOut') {
        window.location.href = event.target.getAttribute('data-href');
    }
});
/*share button*/
document.querySelector('.share-btn').addEventListener('click', () => {
    if (navigator.share) {
        navigator.share({
            title: 'Check out this website!',
            text: 'Visit this awesome website I found!',
            url: window.location.href,
        }).then(() => {
            console.log('Thanks for sharing!');
        })
        .catch(console.error);
    } else {
        alert('Your browser does not support the Web Share API. Please share this link manually.');
    }
});

/*project portfolio*/
const text = document.querySelectorAll('h4');
text.forEach(h4 => {
    h4.innerHTML = h4.textContent.split('').map((text, wave) => 
        `<span style="transition-delay: ${wave * 25}ms">${text}</span>`
    ).join('');
});
