document.addEventListener('DOMContentLoaded', () => {
    alert("Debug Alert 1: DOMContentLoaded Start");

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
    alert("Debug Alert 2: After Sticky Header");

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
                // Ensure text node exists before trying to set its value
                if (menuToggle.childNodes.length > 1 && menuToggle.childNodes[menuToggle.childNodes.length -1].nodeType === Node.TEXT_NODE) {
                    menuToggle.childNodes[menuToggle.childNodes.length -1].nodeValue = " Close";
                }
            } else {
                iconSpan.classList.remove('open');
                 if (menuToggle.childNodes.length > 1 && menuToggle.childNodes[menuToggle.childNodes.length -1].nodeType === Node.TEXT_NODE) {
                    menuToggle.childNodes[menuToggle.childNodes.length -1].nodeValue = " Menu";
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
                    if(menuToggle) { // Check if menuToggle exists
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
    alert("Debug Alert 3: After Mobile Menu");

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
    alert("Debug Alert 4: After FAQ Accordion");

    // Scroll-based Transitions (Corrected Order)
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
            if(el) observer.observe(el); // Check if el is not null
        });
    } else {
        elementsToAnimate.forEach(el => {
            if(el) { // Check if el is not null
                el.classList.remove('hidden-on-scroll');
                el.classList.add('visible-on-scroll');
            }
        });
    }
    alert("Debug Alert 5: After Scroll-based Transitions");

    // Table Sorting Functionality
    // Note: sortAndRebuildTable function is defined outside DOMContentLoaded
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

                headers.forEach(th => {
                    th.classList.remove('sorted-asc', 'sorted-desc');
                    if (Array.from(th.parentNode.children).indexOf(th) === columnIndex) {
                        th.classList.add(newDirection === 'asc' ? 'sorted-asc' : 'sorted-desc');
                    }
                });
            });
        });
    }
    // No specific alert here, Alert 5 covers this initialization phase.

    // Dashboard Chart Configurations
    const projectStatusData = {
        type: 'pie',
        data: {
            labels: ["Completed", "In Progress", "Pending Review", "On Hold"],
            datasets: [{
                label: 'Project Status',
                data: [60, 25, 10, 5],
                backgroundColor: [
                    'rgba(76, 175, 80, 0.8)',
                    'rgba(33, 150, 243, 0.8)',
                    'rgba(255, 193, 7, 0.8)',
                    'rgba(158, 158, 158, 0.8)'
                ],
                borderColor: [
                    'rgba(76, 175, 80, 1)',
                    'rgba(33, 150, 243, 1)',
                    'rgba(255, 193, 7, 1)',
                    'rgba(158, 158, 158, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Project Status Distribution' }
            }
        }
    };

    const fundingByCauseData = {
        type: 'bar',
        data: {
            labels: ["Education", "Healthcare", "Environment", "Livelihoods", "Water Security"],
            datasets: [{
                label: 'Funding Amount (in Lakhs ₹)',
                data: [120, 190, 75, 150, 60],
                backgroundColor: 'rgba(230, 57, 70, 0.7)',
                borderColor: 'rgba(230, 57, 70, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: { y: { beginAtZero: true, ticks: { callback: function(value) { return value + 'L'; } } } },
            plugins: {
                legend: { display: false },
                title: { display: true, text: 'Funding by Cause' }
            }
        }
    };

    const impactOverTimeData = {
        type: 'line',
        data: {
            labels: ["Jan '24", "Feb '24", "Mar '24", "Apr '24", "May '24", "Jun '24"],
            datasets: [{
                label: 'Beneficiaries Reached',
                data: [500, 750, 1200, 900, 1500, 1800],
                borderColor: 'rgba(33, 150, 243, 1)',
                backgroundColor: 'rgba(33, 150, 243, 0.1)',
                fill: true,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: { y: { beginAtZero: true } },
            plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Impact Over Time' }
            }
        }
    };
    alert("Debug Alert 6: After Chart Data Config");

    alert("Debug Alert 7: Before calling renderDashboardCharts");
    renderDashboardCharts();
    alert("Debug Alert 8: After calling renderDashboardCharts");

}); // End of DOMContentLoaded

function renderDashboardCharts() {
    alert("Attempting to render dashboard charts...");

    const projectStatusCtx = document.getElementById('projectStatusChart');
    if (projectStatusCtx) {
        try {
            new Chart(projectStatusCtx, projectStatusData);
        } catch (error) {
            alert("Error rendering Project Status Pie Chart: " + error.message);
            console.error("Error rendering Project Status Pie Chart:", error);
        }
    } else {
        console.warn('Canvas element with ID "projectStatusChart" not found.');
    }

    const fundingByCauseCtx = document.getElementById('fundingByCauseChart');
    if (fundingByCauseCtx) {
        try {
            new Chart(fundingByCauseCtx, fundingByCauseData);
        } catch (error) {
            alert("Error rendering Funding by Cause Bar Chart: " + error.message);
            console.error("Error rendering Funding by Cause Bar Chart:", error);
        }
    } else {
        console.warn('Canvas element with ID "fundingByCauseChart" not found.');
    }

    const impactOverTimeCtx = document.getElementById('impactOverTimeChart');
    if (impactOverTimeCtx) {
        try {
            new Chart(impactOverTimeCtx, impactOverTimeData);
        } catch (error) {
            alert("Error rendering Impact Over Time Line Chart: " + error.message);
            console.error("Error rendering Impact Over Time Line Chart:", error);
        }
    } else {
        console.warn('Canvas element with ID "impactOverTimeChart" not found.');
    }
}

function sortAndRebuildTable(table, columnIndex, columnType, direction) {
    const tbody = table.querySelector('tbody');
    if (!tbody) return;
    const rows = Array.from(tbody.querySelectorAll('tr'));

    const monthMap = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };

    rows.sort((rowA, rowB) => {
        const cellAEl = rowA.querySelectorAll('td')[columnIndex];
        const cellBEl = rowB.querySelectorAll('td')[columnIndex];
        if (!cellAEl || !cellBEl) return 0;

        const cellA = cellAEl.textContent.trim();
        const cellB = cellBEl.textContent.trim();

        let valA = cellA;
        let valB = cellB;

        if (columnType === 'number') {
            valA = parseFloat(cellA.split('/')[0]);
            valB = parseFloat(cellB.split('/')[0]);
            if (isNaN(valA)) valA = -Infinity;
            if (isNaN(valB)) valB = -Infinity;
        } else if (columnType === 'date') {
            const partsA = cellA.split(' ');
            const partsB = cellB.split(' ');
            if (partsA.length === 3 && partsB.length === 3 && monthMap.hasOwnProperty(partsA[1]) && monthMap.hasOwnProperty(partsB[1])) {
                valA = new Date(parseInt(partsA[2]), monthMap[partsA[1]], parseInt(partsA[0]));
                valB = new Date(parseInt(partsB[2]), monthMap[partsB[1]], parseInt(partsB[0]));
            } else {
                return 0;
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

    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    rows.forEach(row => tbody.appendChild(row));
}
```
