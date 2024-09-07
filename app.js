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
/*preloader*/
window.addEventListener('load', function() {
    document.getElementById('preloader').style.display = 'none';
});

/*nav dragging*/
const nav = document.querySelector('nav'); 

let startY = 0;
let initialTop = 0;

const options = { passive: false }; // Create an options object to specify non-passive

function onDrag(event) {
    const navStyle = window.getComputedStyle(nav);
    const navTop = parseInt(navStyle.top) || 0;

    nav.style.top = Math.max(0, navTop + event.movementY) + "px";
    event.preventDefault(); // Prevent default behavior
}

function onMouseDown(event) {
    startY = event.clientY;
    const navStyle = window.getComputedStyle(nav);
    initialTop = parseInt(navStyle.top) || 0;

    document.body.style.overflow = 'hidden'; // Prevent scrolling

    document.addEventListener("mousemove", onMouseMove, options);
    document.addEventListener("mouseup", onMouseUp, options);
    document.addEventListener("mouseleave", onMouseLeave, options);
}

function onMouseMove(event) {
    const deltaY = event.clientY - startY;
    nav.style.top = Math.max(0, initialTop + deltaY) + "px";
    event.preventDefault(); // Prevent default behavior
}

function onMouseUp(event) {
    document.body.style.overflow = ''; // Re-enable scrolling

    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
    document.removeEventListener("mouseleave", onMouseLeave);
}

function onMouseLeave(event) {
    document.body.style.overflow = ''; // Re-enable scrolling

    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
    document.removeEventListener("mouseleave", onMouseLeave);
}

function onTouchStart(event) {
    const touch = event.touches[0];
    startY = touch.clientY;
    const navStyle = window.getComputedStyle(nav);
    initialTop = parseInt(navStyle.top) || 0;

    document.body.style.overflow = 'hidden'; // Prevent scrolling

    document.addEventListener("touchmove", onTouchMove, options);
    document.addEventListener("touchend", onTouchEnd, options);
}

function onTouchMove(event) {
    const touch = event.touches[0];
    const deltaY = touch.clientY - startY;
    nav.style.top = Math.max(0, initialTop + deltaY) + "px";
    event.preventDefault(); // Prevent default behavior
}

function onTouchEnd(event) {
    document.body.style.overflow = ''; // Re-enable scrolling

    document.removeEventListener("touchmove", onTouchMove);
    document.removeEventListener("touchend", onTouchEnd);
}

// Add event listeners for mouse and touch events
nav.addEventListener("mousedown", onMouseDown, options);
nav.addEventListener("touchstart", onTouchStart, options);

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

/*page animation*/
document.addEventListener('DOMContentLoaded', function () {
    // Check if the current page is not the index page
    if (window.location.pathname !== '/index.html') {
        document.body.classList.add('fade-in');
    }
});

window.addEventListener('beforeunload', function () {
    // Check if the current page is not the index page
    if (window.location.pathname !== '/index.html') {
        document.body.classList.add('fade-out');
    }
});

document.addEventListener('animationend', function (event) {
    if (event.animationName === 'fadeOut') {
        // Only navigate if the current page is not the index page
        if (window.location.pathname !== '/index.html') {
            window.location.href = event.target.getAttribute('data-href');
        }
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
/*image swiping*/
document.addEventListener("DOMContentLoaded", function() {
    const wrappers = document.querySelectorAll('.wrapper');
    
    wrappers.forEach(wrapper => {
        let touchstartX = 0;
        let touchendX = 0;
        
        wrapper.addEventListener('touchstart', function(event) {
            touchstartX = event.changedTouches[0].screenX;
        }, false);
        
        wrapper.addEventListener('touchend', function(event) {
            touchendX = event.changedTouches[0].screenX;
            handleSwipe(wrapper, touchstartX, touchendX);
        }, false); 
    });

    function handleSwipe(wrapper, touchstartX, touchendX) {
        const currentProject = wrapper.closest('.project1, .project2, .project3, .project4');
        const current = currentProject.querySelector('input[type="radio"]:checked');

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