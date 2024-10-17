//===Lenis Init
const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

//===Progress Bars
//Get elements from the DOM
const progressBars = document.querySelectorAll(".progress");
//Loop through all progress bars
progressBars.forEach(progress => {
  //Set progress bar width to dataset value we set in the HTML
  progress.style.width = progress.dataset.level + "%";
});

//===GSAP Animations
window.addEventListener("load", () => {
  //Create gsap timeline
  const tl = gsap.timeline();

  //Preloader Animations
  tl.to(".preloader", {opacity: 0, delay: 0.5,});
  tl.to(".loader", {animation: "none",});
  tl.to(".loader span", {animation: "none",});
  tl.to(".preloader", {display: "none"});

  //Hero Section Animations
  tl.from(".title1", {opacity: 0, x: 300,});
  tl.from(".title2", {opacity: 0, x: -300,});
  tl.from(".title3", {opacity: 0, x: 300,});

  tl.from(".img1", {scale: 0,});
  tl.from(".img2", {scale: 0,});
});

//On scroll GSAP animations
//Headings animation
const headings = gsap.utils.toArray('.heading h1');
headings.forEach(h => {
  gsap.from(h, { 
    opacity: 0,
    y: 200,
    ease: "power3.out",
    scrollTrigger: {
      start: "top 70%",
      trigger: h,
    }
  });
});

//Progress bars animation
const progress = gsap.utils.toArray('.progress');
progress.forEach(prog => {
  gsap.from(prog, { 
    width: 0,
    ease: "power3.out",
    scrollTrigger: {
      start: "top 70%",
      trigger: prog,
    }
  });
});

//===Filter Gallery
//Get Elements from the DOM
const btns = document.querySelectorAll('.gallery-controls button');
const imgs = document.querySelectorAll('.images img');

//Add a click event to all buttons
btns.forEach(btn => {btn.addEventListener('click', filterImg);});

//Set active button on click
function setActiveBtn(e) {
  //Remove active class from all buttons
  btns.forEach(btn => {btn.classList.remove('btn-active');});
  //Add active class to clicked button
  e.target.classList.add('btn-active');
}

//Filter Images
function filterImg(e) {
  //Run the active button function
  setActiveBtn(e);
  
  //Loop through all images
  imgs.forEach(img => {
    //Expand all images
    img.classList.remove('img-shrink');
    img.classList.add('img-expand');
    
    //Get data from data attributes
    //Get image type data
    const imgType = parseInt(img.dataset.img);
    //Get button type data
    const btnType = parseInt(e.target.dataset.btn);
    
    /*
      If the image type and the type of the 
      clicked button are NOT the same
    */
    if(imgType !== btnType) {
      //Hide the image
      img.classList.remove('img-expand');
      img.classList.add('img-shrink');
    }
  });
}

//Set click event for the 'All' button
btns[0].addEventListener('click', (e) => {
  //Run the active button function
  setActiveBtn(e);
  //Loop through all images
  imgs.forEach(img => {
    //Expand all images
    img.classList.remove('img-shrink');
    img.classList.add('img-expanded');
  });
});

//===Scroll Indicator
//Get elements for the navbar from the DOM
const navbar = document.querySelector(".navbar");
const checkpoints = document.querySelectorAll(".scroll-checkpoint");
const navbarLinks = document.querySelectorAll(".navbar a");

//Add a scroll event to the window
window.addEventListener("scroll", () => {
  //If the page is scrolled over 50 px
  if(scrollY > 100) {
    //Add the navbar active class
    navbar.classList.add("navbar-active");
  } else {
    //Remove the navbar active class
    navbar.classList.remove("navbar-active");
  }
  //loop through all checkpoint elements
  for(let i = 0; i < checkpoints.length; i++) {
    //If the page offset is greater than the checkpoint offset
    if(scrollY > checkpoints[i].offsetTop - 50) {
      //Remove the active class from all links
      navbarLinks.forEach(link => link.classList.remove("link-active"));
      //Add the active class to the corresponding link
      navbarLinks[i].classList.add("link-active");
    //If the page offset is smaller than the first checkpoint offset
    } else if (scrollY < checkpoints[0].offsetTop - 50) {
      //Remove the active class from all links
      navbarLinks.forEach(link => link.classList.remove("link-active"));
    }
  }
});

//===Mouse Tracker
//Get mouse tracker element
const tracker = document.querySelector(".tracker");

//Ammount by which the page is scrolled
let scrollAmmount = 0;
//X and Y coordinates
let yPos = 0;
let xPos = 0;

//Mouse tracker function
function mouseTracker() {
  /*Get the value by which the page has been 
  scrolled and also add the mouse position on 
  the y axis*/
  scrollAmmount = window.scrollY + yPos;
  //Set the tracker position with the new values
  tracker.style.top = `${scrollAmmount}px`;
  tracker.style.left = `${xPos}px`;
}

//Add a mousemove event to the entire window
window.addEventListener("mousemove", e => {
  //Delay the effect 
  setTimeout(() => {
    /*Get the mouse coordinates and subtract the 
    tracker width and height to have it in the 
    center of the mouse cursor*/
    yPos = e.clientY - tracker.offsetHeight / 2;
    xPos = e.clientX - tracker.offsetWidth / 2;
    //Call the mouseTracker function
    mouseTracker();
  }, 100);
});

//Add a scroll event to the entire window
window.addEventListener("scroll", () => {
  //Call the mouseTracker function
  mouseTracker();
});

//Select all links and buttons on the page
const links = document.querySelectorAll("a, button");

//Loop through each link and button
links.forEach(link => {
  //Hide the tracker when the mouse enters a link or button
  link.addEventListener("mouseenter", () => {
    tracker.style.display = "none";
  });
  //Show the tracker when the mouse leaves a link or button
  link.addEventListener("mouseleave", () => {
    tracker.style.display = "block";
  });
});

//Disable mouse tracker on touchscreen devices
if ('ontouchstart' in window || navigator.maxTouchPoints) {
  tracker.style.display = "none";
}