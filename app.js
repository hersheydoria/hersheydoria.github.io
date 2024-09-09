let intro = document.querySelector('.intro');
let logo = document.querySelector('.logo-header');
let logoSpan = document.querySelectorAll('.logo');

window.addEventListener('DOMContentLoaded', () => {
    const introImage = document.querySelector('.intro-image'); // Ensure this is within DOMContentLoaded
    
    if (introImage) {
        // Wait briefly before starting the animation
        setTimeout(() => {
            // Set intro image opacity to 1 to make it visible
            introImage.style.opacity = 1;

            // Animate logo spans
            logoSpan.forEach((span, idx) => {
                setTimeout(() => {
                    span.classList.add('active');
                }, (idx + 1) * 400);  // Delay each span
            });

            // After 2 seconds, fade out logo spans and the intro image
            setTimeout(() => {
                logoSpan.forEach((span, idx) => {
                    setTimeout(() => {
                        span.classList.remove('active');
                        span.classList.add('fade'); // Add fade effect
                    }, (idx + 1) * 50);  // Quick fade delay
                });

                // Fade out intro image
                introImage.style.opacity = 0;
            }, 2000);

            // Move the intro section out of view after 2.3 seconds
            setTimeout(() => {
                intro.style.top = '-100vh';  // Slide up the intro
            }, 2300);

        }, 100);  // Initial slight delay before animation starts
    } 
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

/*skill animation*/
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
document.addEventListener('DOMContentLoaded', () => {
    const shareButton = document.querySelector('.share-btn');
    if (shareButton) {
        shareButton.addEventListener('click', () => {
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

const letters = document.querySelectorAll('.floating-letter');
letters.forEach(letter => {
  const randomTop = Math.random();
  const randomLeft = Math.random();
  const randomMoveX = (Math.random() - 0.5) * 2; // Random movement on X axis
  const randomMoveY = (Math.random() - 0.5) * 2; // Random movement on Y axis
  const randomDuration = 10 + Math.random() * 20; // Random duration between 10-30 seconds

  letter.style.setProperty('--start-top', randomTop);
  letter.style.setProperty('--start-left', randomLeft);
  letter.style.setProperty('--move-x', randomMoveX); // Random horizontal movement
  letter.style.setProperty('--move-y', randomMoveY); // Random vertical movement
  letter.style.animationDuration = `${randomDuration}s`; // Random animation speed
});

if (document.getElementById('particles-js')) {
particlesJS('particles-js',
  {
    "particles": {
      "number": {
        "value": 80, // Number of particles
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#ffffff" // Color of particles
      },
      "shape": {
        "type": "circle", // Circle particles
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 5,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 6,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "repulse" // Particles move away when hovered
        },
        "onclick": {
          "enable": true,
          "mode": "push" // New particles are added on click
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  }
);
}