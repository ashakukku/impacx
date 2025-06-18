document.addEventListener('DOMContentLoaded', () => {

    // 5. Sticky Header Refinement (Optional: Add class on scroll)
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) { // Add 'scrolled' class after 50px scroll
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // 4. Accordion Functionality for FAQs
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        if (question && answer) {
            // Initially hide answers if not using CSS to do so by default
            // answer.style.display = 'none'; // Or use max-height for animation

            question.addEventListener('click', () => {
                const currentlyActive = question.classList.contains('active');

                // Optional: Close other open items
                // faqItems.forEach(otherItem => {
                //     otherItem.querySelector('.faq-question').classList.remove('active');
                //     otherItem.querySelector('.faq-answer').style.maxHeight = null; // Or display = 'none'
                //     otherItem.querySelector('.faq-answer').style.paddingTop = '0';
                //     otherItem.querySelector('.faq-answer').style.paddingBottom = '0';
                // });

                if (!currentlyActive) {
                    question.classList.add('active');
                    // answer.style.display = 'block'; // For simple show/hide
                    // For smooth animation with max-height:
                    answer.style.maxHeight = answer.scrollHeight + "px";
                    answer.style.paddingTop = '15px'; // Add padding when open
                    answer.style.paddingBottom = '15px'; // Add padding when open
                } else {
                    question.classList.remove('active');
                    // answer.style.display = 'none'; // For simple show/hide
                    answer.style.maxHeight = null;
                    answer.style.paddingTop = '0';
                    answer.style.paddingBottom = '0';
                }
            });
        }
    });

    // 3. Scroll-based Transitions (Fade-ins using Intersection Observer)
    const elementsToAnimate = document.querySelectorAll('.hidden-on-scroll');

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible-on-scroll');
                    entry.target.classList.remove('hidden-on-scroll');
                    observerInstance.unobserve(entry.target); // Stop observing once visible
                }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the element is visible
        });

        elementsToAnimate.forEach(el => {
            observer.observe(el);
        });
    } else {
        // Fallback for older browsers (optional, could just leave elements visible)
        elementsToAnimate.forEach(el => {
            el.classList.remove('hidden-on-scroll');
            el.classList.add('visible-on-scroll');
        });
    }

    // Add .hidden-on-scroll to sections or elements that need animation
    // For demonstration, let's add it to all direct child sections of main
    // and some specific elements like cards.
    const sections = document.querySelectorAll('main > section');
    sections.forEach(section => {
        section.classList.add('hidden-on-scroll');
    });

    const cards = document.querySelectorAll('.enable-card, .solution-for-csr, .solution-for-ngos, .faq-item');
    cards.forEach(card => {
        card.classList.add('hidden-on-scroll');
    });

    // Hero badge popup - Assuming static for now. If it needs JS for hover/click:
    // const heroBadge = document.querySelector('.hero-badge');
    // const someTrigger = document.querySelector('#hero h1'); // Example trigger
    // if(heroBadge && someTrigger) {
    //    someTrigger.addEventListener('mouseenter', () => heroBadge.style.opacity = '1');
    //    someTrigger.addEventListener('mouseleave', () => heroBadge.style.opacity = '0'); // or some other logic
    // }

});
