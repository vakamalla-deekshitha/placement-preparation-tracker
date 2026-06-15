document.addEventListener('DOMContentLoaded', () => {
    // Problem databases
    const defaultDsaProblems = [
        { id: 1, name: "Two Sum", topic: "Arrays", difficulty: "Easy", platform: "LeetCode", completed: false },
        { id: 2, name: "Reverse a String", topic: "Strings", difficulty: "Easy", platform: "GeeksforGeeks", completed: false },
        { id: 3, name: "Maximum Subarray (Kadane)", topic: "Arrays", difficulty: "Medium", platform: "LeetCode", completed: false },
        { id: 4, name: "Merge Intervals", topic: "Arrays", difficulty: "Medium", platform: "LeetCode", completed: false },
        { id: 5, name: "Longest Substring Without Repeating Characters", topic: "Strings", difficulty: "Medium", platform: "LeetCode", completed: false },
        { id: 6, name: "Valid Parentheses", topic: "Stacks", difficulty: "Easy", platform: "LeetCode", completed: false },
        { id: 7, name: "Container With Most Water", topic: "Two Pointers", difficulty: "Medium", platform: "LeetCode", completed: false },
        { id: 8, name: "Search in Rotated Sorted Array", topic: "Binary Search", difficulty: "Medium", platform: "LeetCode", completed: false },
        { id: 9, name: "Merge k Sorted Lists", topic: "Heaps", difficulty: "Hard", platform: "LeetCode", completed: false },
        { id: 10, name: "LinkedList Cycle Detection", topic: "LinkedLists", difficulty: "Easy", platform: "LeetCode", completed: false },
        { id: 11, name: "Reverse LinkedList", topic: "LinkedLists", difficulty: "Easy", platform: "LeetCode", completed: false },
        { id: 12, name: "Binary Tree Inorder Traversal", topic: "Trees", difficulty: "Easy", platform: "LeetCode", completed: false },
        { id: 13, name: "Lowest Common Ancestor of a Binary Tree", topic: "Trees", difficulty: "Medium", platform: "LeetCode", completed: false },
        { id: 14, name: "Kth Largest Element in an Array", topic: "Heaps", difficulty: "Medium", platform: "LeetCode", completed: false },
        { id: 15, name: "Climbing Stairs", topic: "DP", difficulty: "Easy", platform: "LeetCode", completed: false },
        { id: 16, name: "0-1 Knapsack Problem", topic: "DP", difficulty: "Medium", platform: "GeeksforGeeks", completed: false },
        { id: 17, name: "Longest Common Subsequence", topic: "DP", difficulty: "Medium", platform: "LeetCode", completed: false },
        { id: 18, name: "Word Search", topic: "Backtracking", difficulty: "Medium", platform: "LeetCode", completed: false },
        { id: 19, name: "N-Queens", topic: "Backtracking", difficulty: "Hard", platform: "LeetCode", completed: false },
        { id: 20, name: "Graph Valid Tree", topic: "Graphs", difficulty: "Medium", platform: "LeetCode", completed: false },
        { id: 21, name: "Number of Islands", topic: "Graphs", difficulty: "Medium", platform: "LeetCode", completed: false }
    ];

    const defaultAptitude = [
        { id: 1, name: "Quantitative: Percentages & Averages", completed: false },
        { id: 2, name: "Quantitative: Profit and Loss", completed: false },
        { id: 3, name: "Quantitative: Simple & Compound Interest", completed: false },
        { id: 4, name: "Quantitative: Time and Work", completed: false },
        { id: 5, name: "Quantitative: Time, Speed and Distance", completed: false },
        { id: 6, name: "Quantitative: Permutations & Combinations", completed: false },
        { id: 7, name: "Quantitative: Probability", completed: false },
        { id: 8, name: "Logical: Syllogisms & Venn Diagrams", completed: false },
        { id: 9, name: "Logical: Blood Relations & Directions", completed: false },
        { id: 10, name: "Logical: Coding & Decoding", completed: false }
    ];

    const defaultSubjects = [
        { id: 1, name: "DBMS: Normalization (1NF, 2NF, 3NF, BCNF)", completed: false },
        { id: 2, name: "DBMS: ACID Properties & Transactions", completed: false },
        { id: 3, name: "DBMS: Indexes (B-Trees & Hash Index)", completed: false },
        { id: 4, name: "OS: Process Scheduling Algorithms", completed: false },
        { id: 5, name: "OS: Deadlock (Prevention, Avoidance & Banker's)", completed: false },
        { id: 6, name: "OS: Virtual Memory & Page Replacement", completed: false },
        { id: 7, name: "CN: OSI Layers & TCP/IP Protocol Suite", completed: false },
        { id: 8, name: "CN: TCP Handshake & Congestion Control", completed: false },
        { id: 9, name: "OOP: Polymorphism, Inheritance & Abstraction", completed: false }
    ];

    const defaultMocks = [
        {
            id: 1,
            company: "TechCorp (General Placement)",
            date: "2026-05-10",
            rating: 4,
            feedback: "Solid coding skills. Needed slight assistance in dynamic programming optimization, but excellent system design responses.",
            status: "Passed"
        }
    ];

    // Load from LocalStorage or fallback
    let dsaProblems = JSON.parse(localStorage.getItem('preptracker_dsa')) || defaultDsaProblems;
    let aptitude = JSON.parse(localStorage.getItem('preptracker_apt')) || defaultAptitude;
    let subjects = JSON.parse(localStorage.getItem('preptracker_subj')) || defaultSubjects;
    let mocks = JSON.parse(localStorage.getItem('preptracker_mocks')) || defaultMocks;

    let dsaDifficultyFilter = 'all';

    // DOM selectors
    const dsaList = document.getElementById('dsa-list');
    const aptList = document.getElementById('apt-list');
    const subjList = document.getElementById('subj-list');
    const mockLogsContainer = document.getElementById('mock-logs-container');

    const overallProgressCircle = document.getElementById('overall-progress-circle');
    const overallProgressText = document.getElementById('overall-progress-text');
    const dsaProgressText = document.getElementById('dsa-progress-text');
    const dsaProgressBar = document.getElementById('dsa-progress-bar');
    const aptProgressText = document.getElementById('apt-progress-text');
    const aptProgressBar = document.getElementById('apt-progress-bar');
    const subjProgressText = document.getElementById('subj-progress-text');
    const subjProgressBar = document.getElementById('subj-progress-bar');
    const mockProgressText = document.getElementById('mock-progress-text');
    const mockProgressBar = document.getElementById('mock-progress-bar');

    const addMockForm = document.getElementById('add-mock-form');

    // Initialize Page
    function init() {
        renderDsa();
        renderAptitude();
        renderSubjects();
        renderMockLogs();
        calculateProgress();
        setupFilters();
    }

    // Progress Calculations
    function calculateProgress() {
        const totalDsa = dsaProblems.length;
        const completedDsa = dsaProblems.filter(p => p.completed).length;
        const dsaPercent = totalDsa > 0 ? (completedDsa / totalDsa) * 100 : 0;
        dsaProgressText.textContent = `${Math.round(dsaPercent)}% (${completedDsa}/${totalDsa})`;
        dsaProgressBar.style.width = `${dsaPercent}%`;

        const totalApt = aptitude.length;
        const completedApt = aptitude.filter(a => a.completed).length;
        const aptPercent = totalApt > 0 ? (completedApt / totalApt) * 100 : 0;
        aptProgressText.textContent = `${Math.round(aptPercent)}% (${completedApt}/${totalApt})`;
        aptProgressBar.style.width = `${aptPercent}%`;

        const totalSubj = subjects.length;
        const completedSubj = subjects.filter(s => s.completed).length;
        const subjPercent = totalSubj > 0 ? (completedSubj / totalSubj) * 100 : 0;
        subjProgressText.textContent = `${Math.round(subjPercent)}% (${completedSubj}/${totalSubj})`;
        subjProgressBar.style.width = `${subjPercent}%`;

        // Mock rating threshold: standard is at least 3 completed mock logs
        const mockTarget = 5;
        const completedMock = mocks.filter(m => m.status === 'Passed').length;
        const mockPercent = Math.min((mocks.length / mockTarget) * 100, 100);
        mockProgressText.textContent = `${Math.round(mockPercent)}% (${mocks.length}/${mockTarget})`;
        mockProgressBar.style.width = `${mockPercent}%`;

        // Overall
        const totalItems = totalDsa + totalApt + totalSubj + mocks.length;
        const completedItems = completedDsa + completedApt + completedSubj + completedMock;
        const overallPercent = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

        overallProgressText.textContent = `${overallPercent}%`;
        
        // Progress Ring SVG offset: stroke-dasharray = 440
        const radius = 70;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (overallPercent / 100) * circumference;
        overallProgressCircle.style.strokeDashoffset = offset;
    }

    // Render DSA problems
    function renderDsa() {
        let html = '';
        const filtered = dsaProblems.filter(p => {
            if (dsaDifficultyFilter === 'all') return true;
            return p.difficulty.toLowerCase() === dsaDifficultyFilter.toLowerCase();
        });

        if (filtered.length === 0) {
            dsaList.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-muted">No DSA problems found.</td></tr>';
            return;
        }

        filtered.forEach(p => {
            const diffClass = p.difficulty === 'Easy' ? 'badge-easy' : (p.difficulty === 'Medium' ? 'badge-medium' : 'badge-hard');
            const checkIcon = p.completed ? 'fa-square-check text-success' : 'fa-square text-muted';
            html += `
                <tr>
                    <td>
                        <button class="btn btn-link p-0 text-decoration-none dsa-toggle" data-id="${p.id}">
                            <i class="fa-regular ${checkIcon} fs-4"></i>
                        </button>
                    </td>
                    <td class="fw-semibold text-light">${p.name}</td>
                    <td class="text-muted">${p.topic}</td>
                    <td><span class="badge ${diffClass}">${p.difficulty}</span></td>
                    <td><span class="small text-muted">${p.platform}</span></td>
                    <td class="text-end">
                        <button class="btn btn-sm btn-outline-danger dsa-delete" data-id="${p.id}"><i class="fa-solid fa-trash"></i></button>
                    </td>
                </tr>
            `;
        });
        dsaList.innerHTML = html;

        // Add listeners
        document.querySelectorAll('.dsa-toggle').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(btn.getAttribute('data-id'));
                const problem = dsaProblems.find(p => p.id === id);
                problem.completed = !problem.completed;
                localStorage.setItem('preptracker_dsa', JSON.stringify(dsaProblems));
                renderDsa();
                calculateProgress();
            });
        });

        document.querySelectorAll('.dsa-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(btn.getAttribute('data-id'));
                if (confirm('Delete this DSA problem task?')) {
                    dsaProblems = dsaProblems.filter(p => p.id !== id);
                    localStorage.setItem('preptracker_dsa', JSON.stringify(dsaProblems));
                    renderDsa();
                    calculateProgress();
                }
            });
        });
    }

    // Render Aptitude Checklist
    function renderAptitude() {
        let html = '';
        aptitude.forEach(item => {
            const checkClass = item.completed ? 'text-success' : 'text-muted';
            const icon = item.completed ? 'fa-circle-check text-success' : 'fa-circle text-muted';
            html += `
                <div class="list-group-item d-flex justify-content-between align-items-center bg-transparent py-3">
                    <div class="d-flex align-items-center gap-2">
                        <i class="fa-solid ${icon} fs-5 cursor-pointer apt-toggle" data-id="${item.id}"></i>
                        <span class="${item.completed ? 'text-decoration-line-through text-muted' : 'text-light'}">${item.name}</span>
                    </div>
                </div>
            `;
        });
        aptList.innerHTML = html;

        document.querySelectorAll('.apt-toggle').forEach(icon => {
            icon.addEventListener('click', () => {
                const id = parseInt(icon.getAttribute('data-id'));
                const topic = aptitude.find(a => a.id === id);
                topic.completed = !topic.completed;
                localStorage.setItem('preptracker_apt', JSON.stringify(aptitude));
                renderAptitude();
                calculateProgress();
            });
        });
    }

    // Render Core CS Subjects
    function renderSubjects() {
        let html = '';
        subjects.forEach(item => {
            const icon = item.completed ? 'fa-circle-check text-success' : 'fa-circle text-muted';
            html += `
                <div class="list-group-item d-flex justify-content-between align-items-center bg-transparent py-3">
                    <div class="d-flex align-items-center gap-2">
                        <i class="fa-solid ${icon} fs-5 cursor-pointer subj-toggle" data-id="${item.id}"></i>
                        <span class="${item.completed ? 'text-decoration-line-through text-muted' : 'text-light'}">${item.name}</span>
                    </div>
                </div>
            `;
        });
        subjList.innerHTML = html;

        document.querySelectorAll('.subj-toggle').forEach(icon => {
            icon.addEventListener('click', () => {
                const id = parseInt(icon.getAttribute('data-id'));
                const subject = subjects.find(s => s.id === id);
                subject.completed = !subject.completed;
                localStorage.setItem('preptracker_subj', JSON.stringify(subjects));
                renderSubjects();
                calculateProgress();
            });
        });
    }

    // Render Mock Interview Logs
    function renderMockLogs() {
        let html = '';
        if (mocks.length === 0) {
            mockLogsContainer.innerHTML = '<div class="col-12 text-center text-muted py-4">No mock logs registered. Click "Add Mock Log" to add one!</div>';
            return;
        }

        mocks.forEach(m => {
            let stars = '';
            for (let i = 0; i < 5; i++) {
                stars += i < m.rating ? '<i class="fa-solid fa-star text-stars"></i>' : '<i class="fa-regular fa-star text-secondary"></i>';
            }

            const statusClass = m.status === 'Passed' ? 'bg-success' : (m.status === 'Needs Improvement' ? 'bg-warning' : 'bg-secondary');

            html += `
                <div class="col-md-6 col-lg-4">
                    <div class="card bg-dark-light border-secondary p-3 h-100 d-flex flex-column justify-content-between">
                        <div>
                            <div class="d-flex justify-content-between align-items-start mb-2">
                                <h6 class="fw-bold text-light m-0">${m.company}</h6>
                                <span class="badge ${statusClass} text-white">${m.status}</span>
                            </div>
                            <small class="text-muted d-block mb-2"><i class="fa-regular fa-calendar me-1"></i>${m.date}</small>
                            <div class="mb-3">${stars}</div>
                            <p class="small text-muted mb-3" style="text-overflow: ellipsis; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;">
                                ${m.feedback}
                            </p>
                        </div>
                        <div class="text-end">
                            <button class="btn btn-sm btn-outline-danger mock-delete" data-id="${m.id}"><i class="fa-solid fa-trash"></i></button>
                        </div>
                    </div>
                </div>
            `;
        });
        mockLogsContainer.innerHTML = html;

        document.querySelectorAll('.mock-delete').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.getAttribute('data-id'));
                if (confirm('Delete this mock interview log?')) {
                    mocks = mocks.filter(m => m.id !== id);
                    localStorage.setItem('preptracker_mocks', JSON.stringify(mocks));
                    renderMockLogs();
                    calculateProgress();
                }
            });
        });
    }

    // Add Mock Log Form
    addMockForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const company = document.getElementById('mock-company').value;
        const date = document.getElementById('mock-date').value;
        const rating = parseInt(document.getElementById('mock-rating').value);
        const feedback = document.getElementById('mock-feedback').value;
        const status = document.getElementById('mock-status').value;

        const newLog = {
            id: Date.now(),
            company,
            date,
            rating,
            feedback,
            status
        };

        mocks.push(newLog);
        localStorage.setItem('preptracker_mocks', JSON.stringify(mocks));
        
        // Reset form and close modal
        addMockForm.reset();
        const modalEl = document.getElementById('addMockModal');
        const modal = bootstrap.Modal.getInstance(modalEl);
        modal.hide();

        renderMockLogs();
        calculateProgress();
    });

    // Set up Filters
    function setupFilters() {
        document.querySelectorAll('.dsa-filter').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                dsaDifficultyFilter = item.getAttribute('data-filter');
                document.querySelector('.dropdown-toggle').textContent = `Difficulty: ${dsaDifficultyFilter.toUpperCase()}`;
                renderDsa();
            });
        });
    }

    init();
});
