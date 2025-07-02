document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll('a[href^="#"]'); // Select all anchor links with a hash
    const header = document.querySelector("header");
    const headerHeight = header.offsetHeight; // Get the height of the header
    let lastScrollPosition = 0;
    let isHeaderVisible = true; // Track header visibility

    // Smooth scroll logic
    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault(); // Prevent default anchor behavior

            const targetId = link.getAttribute("href").slice(1); // Get section ID
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Adjust scroll position for fixed navbar
                const targetPosition = targetSection.offsetTop - headerHeight - 10; // Add small padding

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth", // Smooth scroll effect
                });
            }
        });
    });

    // Header hide and show logic
    window.addEventListener("scroll", () => {
        const currentScrollPosition = window.scrollY;

        if (currentScrollPosition > lastScrollPosition) {
            // User is scrolling down
            if (isHeaderVisible) {
                header.style.transform = `translateY(-${headerHeight}px)`; // Hide the header smoothly
                isHeaderVisible = false;
            }
        } else {
            // User is scrolling up
            if (!isHeaderVisible) {
                header.style.transform = `translateY(0)`; // Show the header smoothly
                isHeaderVisible = true;
            }
        }

        lastScrollPosition = currentScrollPosition;
    });
});
