document.addEventListener("DOMContentLoaded", function () {
  const scroller = document.querySelector('.scroller__inner');
  const images = [...document.querySelectorAll('.scroller__inner img')];
  
  // Clone the images to create an infinite loop effect
  images.forEach(image => {
      const clone = image.cloneNode(true);
      scroller.appendChild(clone); // Append the cloned images after the original images
  });

  // Get the width of the scroller container (with the cloned images)
  const scrollerWidth = scroller.scrollWidth;
  let scrollPosition = 0;
  const speed = 0.5; // Adjust the scroll speed as needed

  // Function to move the scroller smoothly
  function smoothScroll() {
      scrollPosition += speed;
      
      // Reset scroll position when one set of images has completely moved out of view
      if (scrollPosition >= scrollerWidth / 2) {
          scrollPosition = 0; // Reset to the start of the loop
      }

      // Apply the transformation to move the scroller
      scroller.style.transform = `translateX(-${scrollPosition}px)`;
      
      // Keep the animation going
      requestAnimationFrame(smoothScroll);
  }

  smoothScroll(); // Start the smooth scrolling
});
