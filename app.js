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
/*box animation*/
document.addEventListener("DOMContentLoaded", function () {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetElement = entry.target;
                const boxes = targetElement.querySelectorAll('.box, .container-box, .footer-box');
                
                boxes.forEach((box, index) => {
                    setTimeout(() => {
                        box.classList.add('animate');
                    }, index * 300); // Staggered animation delay
                });
            } else {
                const boxes = entry.target.querySelectorAll('.box, .container-box, .footer-box');
                boxes.forEach(box => box.classList.remove('animate'));
            }
        });
    }, { threshold: 0.5 }); // Trigger when at least 50% of the element is in view

    document.querySelectorAll('.box, .container-box, .footer-box').forEach(el => observer.observe(el));
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

// app.js
document.addEventListener('DOMContentLoaded', function () {
    const elements = document.querySelectorAll('.project h5, .project p');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => {
        observer.observe(el);
    });
});

// Add this script to your HTML file
document.addEventListener("DOMContentLoaded", function() {
    const wrapper = document.querySelector('.wrapper');
    let touchstartX = 0;
    let touchendX = 0;
    
    wrapper.addEventListener('touchstart', function(event) {
        touchstartX = event.changedTouches[0].screenX;
    }, false);
    
    wrapper.addEventListener('touchend', function(event) {
        touchendX = event.changedTouches[0].screenX;
        handleSwipe();
    }, false); 
    
    function handleSwipe() {
        const current = document.querySelector('.project1 input[type="radio"]:checked') || 
                        document.querySelector('.project2 input[type="radio"]:checked') ||
                        document.querySelector('.project3 input[type="radio"]:checked') || 
                        document.querySelector('.project4 input[type="radio"]:checked');
        
        if (touchendX < touchstartX) {
            // Swipe left
            const next = current.nextElementSibling;
            if (next && next.type === "radio") {
                next.checked = true;
            }
        }
        
        if (touchendX > touchstartX) {
            // Swipe right
            const prev = current.previousElementSibling;
            if (prev && prev.type === "radio") {
                prev.checked = true;
            }
        }
    }
});
