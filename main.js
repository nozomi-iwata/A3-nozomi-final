
//------------------Setting for Sound music using shoelace, code from week 13 resources, and I added loop to keep let music loop---------//

// Create a new Audio object for bg music
const bgMusic = new Audio('audio/japan-samurai-soundtrack.mp3');
// Set the loop property to true so the music will automatically loop once it ends
bgMusic.loop = true; 

// Get the sound button element from the DOM
const soundBtn = document.querySelector('#sound-btn');
// Add an event listener to the sound button, listening for click events
soundBtn.addEventListener('click', () => {
  // Shoelace icons reference link: https://shoelace.style/components/icon#default-icons 
	if (bgMusic.paused) {
    // If paused, play the background music
		bgMusic.play();
    // Change the button icon to 'volume-up'
		soundBtn.name = 'volume-up';
	} else {
    // If music is playing, pause it
		bgMusic.pause();
    // Change the button icon to 'volume-mute'
		soundBtn.name = 'volume-mute';
	}
});

//------------------Setting for fullpage scroll down interaction from Fullpage.js and GSAP JS animation, reference link: https://alvarotrigo.com/fullPage/ , https://gsap.com/ ---------//

// Initialisation script for the FullPage.js library
var myFullpage = new fullpage('#fullpage', {
  // Define anchors for each section in the fullpage
  anchors: ['home', 'history', 'the-seven-virtues-of-bushido', 'implement-bushido-values'],
  // Enable auto-scrolling between sections
  autoScrolling: true,
  // Enable horizontal scrolling between sections
  scrollHorizontally: true,
  // Enable the navigation bar (about the bullet nav bar)
  navigation: true,
  // Position the nav bar on the right
  navigationPosition: 'right',
  // Define the tooltips for each navigation item
  navigationTooltips: ['Home', 'History', 'Seven Virtues', 'Implement Values'],
  // Show the tooltip of the active navigation item
  showActiveTooltip: true,

  // Triggered when leaving a section
  onLeave: function(origin, destination) {
      // Update the tooltip colour based on the destination section index
      updateTooltipColor(destination.index);
  },
  // Triggered after a section is loaded
  afterLoad: function(origin, destination) {
      // Toggle the logo visibility based on the destination section index
      toggleLogo(destination.index);
      // Play section-specific animations based on the destination section index
      playSectionAnimations(destination.index);
  },

  // Triggered after FullPage.js renders the page
  afterRender: function() {
      // Update the tooltip colour for the first section (index 0) when the page loads
      updateTooltipColor(0);
      //Toggle the logo visibility for the first section (index 0) when the page loads
      toggleLogo(0);
  }
});

//NOTE: index 0= section 1, index 1= section 2, index 2= section 3, index3= section 4, it is a bit confusing but that's how works

// Function to update tooltip colour for navigation based on section index; so, it means that tooltip colour will be white on section 1 and 3, will be balck on section 2 and 4 for better readabilty and improve user experience. 
function updateTooltipColor(sectionIndex) {
  // Select all tooltip elements in the navigation
  const tooltips = document.querySelectorAll('#fp-nav ul li .fp-tooltip');

  // Check if the section index is 0 or 2
  if (sectionIndex === 0 || sectionIndex === 2) {
    // If section index is 0 or 2, update white tooltip 
    tooltips.forEach(tooltip => {
        tooltip.classList.remove('tooltip-black'); // Remove the 'tooltip-black' class (if any)
        tooltip.classList.add('tooltip-white'); // Add the 'tooltip-white' class to apply white color
    });
  // Check if the section index is 1 or 3
  } else if (sectionIndex === 1 || sectionIndex === 3) {
    // If section index is 1 or 3, update black tooltip 
    tooltips.forEach(tooltip => {
        tooltip.classList.remove('tooltip-white');
        tooltip.classList.add('tooltip-black');
    });
  }
}

// Function to toggle logo visibility based on section index; so, it means that logo colour will be white on section 1 and 3, will be balck on section 2 and 4 for better visibility and improve user experience. 
function toggleLogo(sectionIndex) {
  // Select the white and black logo elements
  const whiteLogo = document.querySelector('.logo-white');
  const blackLogo = document.querySelector('.logo-black');

  // Check if the section index is 0 or 2
  if (sectionIndex === 0 || sectionIndex === 2) {
    // If section index is 0 or 2, display the white logo and hide the black logo
    whiteLogo.style.display = 'block';  // Show the white logo
    blackLogo.style.display = 'none'; // Hide the black logo
  // Check if the section index is 1 or 3
  } else if (sectionIndex === 1 || sectionIndex === 3) {
    // If section index is 1 or 3, display the black logo and hide the white logo
    whiteLogo.style.display = 'none'; // Hide the white logo
    blackLogo.style.display = 'block';// Show the black logo
  }
}

// Function to play animations based on section index; so it means that I set GSAP animation for each section but, I only want them to start playing animation when user is heading to the section. 
function playSectionAnimations(sectionIndex) {
  // Check if the user is navigating to index 1 (History section)
  if (sectionIndex === 1) {
      // Play the GSAP animation for index 1 when the user navigates to it
      tl.play();
  // Check if the user is navigating to index 2 (Seven Virtues carousel section)
  } else if (sectionIndex === 2) {
      // Play the GSAP animation for index 2 when the user navigates to it (section 3)
      headingSection3Animation.play();
  // Check if the user is navigating to index 3 (Implement virtues section)
  } else if (sectionIndex === 3) {
      // Play the GSAP animation for section 4 when the user navigates to it (dialog section)
      headingSection4Animation.play();
  }
}

// GSAP animation timeline setting for History contents in Section 2, Referene link : https://gsap.com/docs/v3/GSAP/Timeline/ 
// The animation is paused initially and will play when triggered it means like when the user navigates to this section).
const tl = gsap.timeline({ paused: true });

tl.from('.heading1-section2', {
  duration: 1, // Duration of the animation
  ease: "power2.inOut", // Easing function for smooth animation
  x: -1000 // Starting position (1000px left of its final position)
})
.from('.japanese-vertical-writing-bushido', {
  duration: 0.7,
  ease: "power2.inOut",
  y: 1000
}, "-=0.5") // This starts 0.5 seconds earlier 
.from('.paragraph-row-part1', {
  duration: 0.7,
  ease: "power2.inOut",
  y: 1000
}, "-=0.5")
.from('.samurai-people-photo', {
  duration: 0.7,
  ease: "power2.inOut",
  x: -1000,
}, "-=0.9")
.from('.samurai-japanese-letter-history-section', {
  duration: 1,
  ease: "power2.inOut",
  x: 1000
}, "-=0.9")
.from('.japanese-vertical-writing-history', {
  duration: 1,
  ease: "power2.inOut",
  y: 1000
}, "-=0.7")
.from('.paragraph-row-part2', {
  duration: 1,
  ease: "power2.inOut",
  y: 1000
}, "-=0.7")
.from('.samurai-drawing-history', {
  duration: 1,
  ease: "power2.inOut",
  x: 1000
}, "-=0.7")
.from('.kendo-man-photo', {
  duration: 1,
  ease: "power2.inOut",
  x: -1000
}, "-=0.1")
.from('.japanese-vertical-writing-seven-virtues', {
  duration: 1,
  ease: "power2.inOut",
  y: 1000
}, "-=0.8")
.from('.japanese-letter-hero', {
  duration: 1,
  ease: "power2.inOut",
  x: -1000
}, "-=0.8")
.from('.paragraph-row-part3', {
  duration: 1,
  ease: "power2.inOut",
  y: 1000
}, "-=0.8");

// GSAP animation setting for heading and carousel in section 3
const headingSection3Animation = gsap.timeline({ paused: true }); // Timeline for Section 3

headingSection3Animation
.from('.heading-1-white', {
  duration: 1,
  ease: "power2.inOut",
  x: -1000
})
.from('.carousel', {
  duration: 1,
  ease: "power2.inOut",
  x: -1000, 
}, "-=0.6")
.from('.nav-links', {
  duration: 1,
  ease: "power2.inOut",
  scale: 0.5, 
  opacity: 0 // Fade in effect
}, "-=0.6");

// GSAP animation setting for in section 4
const headingSection4Animation = gsap.timeline({ paused: true }); // Timeline for Section 3

headingSection4Animation
.from('.heading1-section4', {
  duration: 1,
  ease: "power2.inOut",
  x: -1500
})
.from('.circle-body', {
  duration: 1,
  ease: "power2.inOut",
  scale: 0.5, // Start at half the size
  opacity: 0
}, "-=0.2");

//------------------Setting for Carousel on section 3, code is based on the resources from Session 10 (Week 12)'s Product Caousel and changed some part for my design, reference Link: https://codepen.io/alphardex/pen/dyPQyKY ---------//

// Select all navigation links, slide images, and overlay bars in the carousel
const navLinks = document.querySelectorAll(".carousel .nav-link");
const slides = document.querySelectorAll(".carousel .slides img");
const overlays = document.querySelectorAll(".carousel .bar");
let maxZIndex = navLinks.length;
const easeInOutQuart = "cubic-bezier(0.77, 0, 0.175, 1)"; // Custom easing function for smooth animation

// Initialise first slide and nav link as active
slides[0].classList.add("active");
navLinks[0].classList.add("active");

// Loop through each navigation link to set up click event listeners and overlay z-index
navLinks.forEach((navLink, index) => {
  overlays[index].style.zIndex = navLinks.length - index;

  // Add click event listener to each navigation link
  navLink.addEventListener("click", () => {
    // Update active nav link
    document.querySelector(".carousel .nav-link.active").classList.remove("active");
    navLink.classList.add("active");

    // Animate current slide out
    const currentSlide = document.querySelector(".carousel .slides img.active");
    currentSlide.animate([
      { transform: "translateX(0)", opacity: 1 }, // Start state: slide is fully visible
      { transform: "translateX(5%)", opacity: 0 } // End state: slide moves slightly right and fades out
    ], { duration: 600, easing: "ease-in", fill: "forwards" })
    .onfinish = () => {
      // Update active slide means that once the slide-out animation completes, remove 'active' class from the current slide
      currentSlide.classList.remove("active");

      // Set the new active slide and animate it in
      const newSlide = slides[index];
      newSlide.classList.add("active");
      newSlide.animate([
        { transform: "translateX(-5%)", opacity: 0 }, // Start state: slide starts slightly left and transparent
        { transform: "translateX(0)", opacity: 1 } // End state: slide moves to center and becomes visible
      ], { duration: 600, easing: "ease-out", fill: "forwards" });
    };

    // Animate overlay
    maxZIndex++; // Increment z-index to bring the overlay on top of others
    overlays[index].style.zIndex = maxZIndex;
    overlays[index].animate(
      [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], // Scale from zero to full width
      { duration: 1200, fill: "forwards", easing: easeInOutQuart }
    );
  });
});

//------------------Setting for carousel on section 4 ------------------------//

/// Set up each dialog
eachDialog('.dialog-overview-1', '.open-dialog-1', '.symbol-1-chugi-loyality');
eachDialog('.dialog-overview-2', '.open-dialog-2', '.symbol-2-makoto-honesty');
eachDialog('.dialog-overview-3', '.open-dialog-3', '.symbol-3-jin-compassion');
eachDialog('.dialog-overview-4', '.open-dialog-4', '.symbol-4-meiyo-honour');
eachDialog('.dialog-overview-5', '.open-dialog-5', '.symbol-5-yu-courage');
eachDialog('.dialog-overview-6', '.open-dialog-6', '.symbol-6-rei-respect');
eachDialog('.dialog-overview-7', '.open-dialog-7', '.symbol-7-gi-integrity');
eachDialog('.dialog-overview-8', '.open-dialog-8', '.symbol-bushido');


// Function to handle dialog open and close events
function eachDialog(dialogClass, openButtonClass, symbolClass) {
  const dialog = document.querySelector(dialogClass);
  const openButton = document.querySelector(openButtonClass);
  const closeButton = dialog.querySelector('sl-button[slot="footer"]');
  
  // Event listeners for opening and closing dialog
  openButton.addEventListener('click', () => openDialog(dialog));
  closeButton.addEventListener('click', () => closeDialog(dialog));
  
  // Additional trigger via symbol click
  document.querySelector(symbolClass).addEventListener('click', () => openDialog(dialog));
  
  // Function to open dialog and disable background interaction
  // NOTE: So, the reason why I need to set JS like these bellow is because I had an issue that fullpage.js and dialog don't want to be friend each other (the problem from my panicky email), so after move dialogs out, I had an new issue that bg function unneessarily working during dialog pops up, and affects (make another bug) for scroll function, so temporary needed to disable bg scroll and fullpage.js function during dialog is pop up, then back the fuction after close dialog, and somehow worked at the end!! :)
  function openDialog(dialog) {
      dialog.show();
      document.body.style.overflow = 'hidden'; // Disable background scrolling - https://www.w3schools.com/jsref/prop_style_overflow.asp
      fullpage_api.setAllowScrolling(false); // Disable fullpage.js - https://alvarotrigo.com/fullPage/docs/#setallowscrollingboolean-directions
  }
  
  // Function to close dialog and re-enable background interaction
  function closeDialog(dialog) {
      dialog.hide();
      document.body.style.overflow = ''; // Restore background scrolling
      fullpage_api.setAllowScrolling(true); // Re-enable fullpage.js scrolling
  }

  // Listen for the dialog's `sl-after-hide` event to ensure scrolling is re-enabled after any close action, this one is to fix the mess of scroll function after close! 
  dialog.addEventListener('sl-after-hide', () => { // shoelace Events - https://shoelace.style/components/dialog#events
      document.body.style.overflow = ''; // Restore background scrolling
      fullpage_api.setAllowScrolling(true); // Re-enable fullpage.js scrolling
  });
}

// -------------------setting for logo function --------------------------------------// 

// These settings bellow are for that when user click logo, back to home page
// Select both logo elements (white and black) from the DOM
const logos = document.querySelectorAll('.logo-white, .logo-black');

// Add a click event listener to each logo to navigate to the 'home' section when clicked
logos.forEach(logo => {
  logo.addEventListener('click', () => fullpage_api.moveTo('home')); //fullpage.js - https://alvarotrigo.com/fullPage/docs/#movetosection-slide
});


// ---------------------- setting for an arrow-----------------------------------------//

// Add a click event listener to the arrow 
document.querySelector('.arrow').addEventListener('click', () => {
  // When clicked, scroll to the section with anchor 'history' (second section)
  fullpage_api.moveTo('history'); 
});


/* Note:
When I use varidation with https://beautifytools.com/javascript-validator.php,
showing these error but, these codes are from third party library (fullpage.js and gsap). 

Line Col Errors
30	  22	'fullpage' is not defined.
130	  12	'gsap' is not defined.
194	  34	'gsap' is not defined.
215	  34	'gsap' is not defined.
313	  7	  'fullpage_api' is not defined.
320	  7	  'fullpage_api' is not defined.
326	  7	  'fullpage_api' is not defined.
338	  40	'fullpage_api' is not defined.
347	  3	  'fullpage_api' is not defined.
30	  5	  'myFullpage' is defined but never used.

*/
