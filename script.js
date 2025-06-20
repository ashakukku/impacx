document.addEventListener('DOMContentLoaded', () => {

    // Sticky Header Refinement
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

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('header nav');
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            const isExpanded = nav.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
            const iconSpan = menuToggle.querySelector('.hamburger-icon');
            if (isExpanded) {
                iconSpan.classList.add('open');
                menuToggle.childNodes[menuToggle.childNodes.length -1].nodeValue = " Close"; // Update text node
            } else {
                iconSpan.classList.remove('open');
                menuToggle.childNodes[menuToggle.childNodes.length -1].nodeValue = " Menu"; // Update text node
            }
        });
    }

    if (nav) {
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                     const iconSpan = menuToggle.querySelector('.hamburger-icon');
                    iconSpan.classList.remove('open');
                    menuToggle.childNodes[menuToggle.childNodes.length -1].nodeValue = " Menu";
                }
            });
        });
    }

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
                    answer.style.maxHeight = answer.scrollHeight + "px";
                    answer.style.paddingTop = '15px';
                    answer.style.paddingBottom = '15px';
                } else {
                    questionButton.classList.remove('active');
                    answer.style.maxHeight = null;
                    answer.style.paddingTop = '0';
                    answer.style.paddingBottom = '0';
                }
            });
        }
    });

    // Scroll-based Transitions
    // Step 1: Add hidden-on-scroll to elements that need animation
    const sectionsToHide = document.querySelectorAll('main > section');
    sectionsToHide.forEach(section => {
        if (section.id !== 'hero') { // Exclude hero from initially being hidden by this script logic
            section.classList.add('hidden-on-scroll');
        }
    });
    const cardsToHide = document.querySelectorAll('.enable-card, .solution-for-csr, .solution-for-ngos, .faq-item, .dashboard-item');
    cardsToHide.forEach(card => {
        card.classList.add('hidden-on-scroll');
    });

    // Step 2: NOW query for all elements that are meant to be animated
    const elementsToAnimate = document.querySelectorAll('.hidden-on-scroll');

    // Step 3: Setup IntersectionObserver
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible-on-scroll');
                    entry.target.classList.remove('hidden-on-scroll'); // Important to remove if it's a one-time animation
                    observerInstance.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 }); // Adjust threshold as needed
        elementsToAnimate.forEach(el => observer.observe(el));
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        // Make all targeted elements visible immediately
        elementsToAnimate.forEach(el => {
            el.classList.remove('hidden-on-scroll');
            el.classList.add('visible-on-scroll');
        });
    }

    // Table Sorting Functionality
    const table = document.querySelector('.ngo-activities-table table');
    if (table) {
        const headers = table.querySelectorAll('th.sortable-header');
        let currentSort = { column: null, direction: 'asc' };

        headers.forEach(header => {
            header.addEventListener('click', () => {
                const columnIndex = Array.from(header.parentNode.children).indexOf(header);
                const columnType = header.dataset.columnType || 'text';

                let newDirection = 'asc';
                if (currentSort.column === columnIndex) {
                    newDirection = currentSort.direction === 'asc' ? 'desc' : 'asc';
                }

                currentSort = { column: columnIndex, direction: newDirection };
                sortAndRebuildTable(table, columnIndex, columnType, newDirection);

                // Update header classes for sort indicators
                headers.forEach(th => {
                    th.classList.remove('sorted-asc', 'sorted-desc');
                    if (Array.from(th.parentNode.children).indexOf(th) === columnIndex) {
                        th.classList.add(newDirection === 'asc' ? 'sorted-asc' : 'sorted-desc');
                    }
                });
            });
        });
    }
});

function sortAndRebuildTable(table, columnIndex, columnType, direction) {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));

    const monthMap = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };

    rows.sort((rowA, rowB) => {
        const cellA = rowA.querySelectorAll('td')[columnIndex].textContent.trim();
        const cellB = rowB.querySelectorAll('td')[columnIndex].textContent.trim();

        let valA = cellA;
        let valB = cellB;

        if (columnType === 'number') {
            // For "85/100", extract the "85" part
            valA = parseFloat(cellA.split('/')[0]);
            valB = parseFloat(cellB.split('/')[0]);
        } else if (columnType === 'date') {
            // Assuming format "DD Mon YYYY", e.g., "01 Jul 2024"
            const partsA = cellA.split(' '); // ["DD", "Mon", "YYYY"]
            const partsB = cellB.split(' ');
            if (partsA.length === 3 && partsB.length === 3 && monthMap.hasOwnProperty(partsA[1]) && monthMap.hasOwnProperty(partsB[1])) {
                valA = new Date(parseInt(partsA[2]), monthMap[partsA[1]], parseInt(partsA[0]));
                valB = new Date(parseInt(partsB[2]), monthMap[partsB[1]], parseInt(partsB[0]));
            } else { // Fallback for unexpected date format
                valA = cellA;
                valB = cellB;
            }
        }

        if (valA < valB) {
            return direction === 'asc' ? -1 : 1;
        }
        if (valA > valB) {
            return direction === 'asc' ? 1 : -1;
        }
        return 0;
    });

    // Remove existing rows
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    // Append sorted rows
    rows.forEach(row => tbody.appendChild(row));
}
