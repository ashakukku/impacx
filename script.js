alert("SCRIPT JS TOP"); // Alert 0

document.addEventListener('DOMContentLoaded', () => {
    alert("DOMCONTENTLOADED START"); // Alert 1

    /* // Sticky Header Refinement - COMMENTED OUT
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    */
    // alert("Debug Alert 2: After Sticky Header"); // COMMENTED OUT

    alert("BEFORE MOBILE MENU INIT"); // Alert 2 (renumbered for this test)

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('header nav'); // Assuming nav is direct child of header
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            const isExpanded = nav.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
            const iconSpan = menuToggle.querySelector('.hamburger-icon');
            if (iconSpan) {
                if (isExpanded) {
                    iconSpan.classList.add('open');
                    // Attempt to change button text
                    if (menuToggle.childNodes.length > 1 && menuToggle.childNodes[menuToggle.childNodes.length -1].nodeType === Node.TEXT_NODE) {
                         menuToggle.childNodes[menuToggle.childNodes.length -1].nodeValue = " Close";
                    }
                } else {
                    iconSpan.classList.remove('open');
                    if (menuToggle.childNodes.length > 1 && menuToggle.childNodes[menuToggle.childNodes.length -1].nodeType === Node.TEXT_NODE) {
                        menuToggle.childNodes[menuToggle.childNodes.length -1].nodeValue = " Menu";
                    }
                }
            }
        });
    }
    if (nav) {
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    if(menuToggle) {
                        menuToggle.setAttribute('aria-expanded', 'false');
                        const iconSpan = menuToggle.querySelector('.hamburger-icon');
                        if (iconSpan) iconSpan.classList.remove('open');
                        if (menuToggle.childNodes.length > 1 && menuToggle.childNodes[menuToggle.childNodes.length -1].nodeType === Node.TEXT_NODE) {
                           menuToggle.childNodes[menuToggle.childNodes.length -1].nodeValue = " Menu";
                        }
                    }
                }
            });
        });
    }
    alert("AFTER MOBILE MENU INIT"); // Alert 3 (renumbered)

    alert("BEFORE FAQ INIT"); // Alert 4 (renumbered)
    // Accordion Functionality for FAQs
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionButton = item.querySelector('button.faq-question');
        const answer = item.querySelector('.faq-answer');
        if (questionButton && answer) {
            questionButton.addEventListener('click', () => {
                const currentlyActive = questionButton.classList.contains('active');
                if (!currentlyActive) {
                    questionButton.classList.add('active');
                    answer.style.paddingTop = '15px';
                    answer.style.paddingBottom = '15px';
                    answer.style.maxHeight = answer.scrollHeight + "px";
                } else {
                    questionButton.classList.remove('active');
                    answer.style.maxHeight = null;
                    answer.style.paddingTop = '0';
                    answer.style.paddingBottom = '0';
                }
            });
        }
    });
    alert("AFTER FAQ INIT"); // Alert 5 (renumbered)

    /* // Scroll-based Transitions - COMMENTED OUT
    const sectionsToHide = document.querySelectorAll('main > section');
    sectionsToHide.forEach(section => {
        if (section.id !== 'hero') {
            section.classList.add('hidden-on-scroll');
        }
    });
    const cardsToHide = document.querySelectorAll('.enable-card, .solution-for-csr, .solution-for-ngos, .faq-item, .dashboard-item');
    cardsToHide.forEach(card => {
        card.classList.add('hidden-on-scroll');
    });

    const elementsToAnimate = document.querySelectorAll('.hidden-on-scroll');
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible-on-scroll');
                    entry.target.classList.remove('hidden-on-scroll');
                    observerInstance.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        elementsToAnimate.forEach(el => {
            if(el) observer.observe(el);
        });
    } else {
        elementsToAnimate.forEach(el => {
            if(el) {
                el.classList.remove('hidden-on-scroll');
                el.classList.add('visible-on-scroll');
            }
        });
    }
    */
    // alert("Debug Alert 5: After Scroll-based Transitions"); // COMMENTED OUT

    /* // Table Sorting Functionality - COMMENTED OUT
    const table = document.querySelector('.ngo-activities-table table');
    if (table) {
        // ...
    }
    */
    // alert("Debug Alert 6: After Table Sorting Setup"); // COMMENTED OUT

    /* // Dashboard Chart Configurations - COMMENTED OUT
    // const projectStatusData = { ... };
    // const fundingByCauseData = { ... };
    // const impactOverTimeData = { ... };
    */
    // alert("Debug Alert 6: After Chart Data Config / or after table sort"); // COMMENTED OUT (original Alert 6)

    // alert("Debug Alert 7: Before calling renderDashboardCharts"); // COMMENTED OUT
    /* // renderDashboardCharts(); - COMMENTED OUT */
    // alert("Debug Alert 8: After calling renderDashboardCharts"); // COMMENTED OUT

}); // End of DOMContentLoaded

/* // renderDashboardCharts function definition - COMMENTED OUT
function renderDashboardCharts() {
    // alert("Attempting to render dashboard charts...");
    // ... try...catch blocks for new Chart(...) ...
}
*/

/* // sortAndRebuildTable function definition - COMMENTED OUT
function sortAndRebuildTable(table, columnIndex, columnType, direction) {
    // ...
}
*/

/* // Global chart data object definitions - COMMENTED OUT
const projectStatusData = {
    // ...
};

const fundingByCauseData = {
    // ...
};

const impactOverTimeData = {
    // ...
};
*/
```
