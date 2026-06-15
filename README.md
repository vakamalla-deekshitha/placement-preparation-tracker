# PrepTracker - Placement Preparation Tracker

PrepTracker is a comprehensive, responsive web application designed for students and graduates preparing for software engineering placements and campus recruitment. It provides structured progress tracking across DSA questions, quantitative/logical aptitude topics, core computer science subjects (OS, DBMS, CN), and mock interview performance log analysis.

## Features

- **Consolidated Dashboard**: Displays overall preparation metrics using a circular progress ring SVG alongside individual progress bars for each track.
- **Structured DSA Checklist**: Tracks standard interview coding problems across key topics (Arrays, Trees, Graphs, DP) and offers difficulty filter options (Easy, Medium, Hard).
- **Aptitude Progress Log**: Track preparation of common placement topics such as Profit/Loss, Time/Work, and Blood Relations.
- **Core Subject Checkpoint**: Revise fundamental concepts like DBMS normalization, ACID, OSI layers, and OOP principles.
- **Mock Interview Logs**: Document company-specific interview logs, date, rating (1-5 star scale), interviewer feedback, and outcome status (Passed, Needs Improvement, Pending Result).
- **Data Persistence**: Uses LocalStorage to save topic progress and mock interview notes across page visits.
- **Responsive Layout**: Designed with Bootstrap 5 to support seamless usage on mobile phones, tablets, and laptops.

## Technologies Used

- **HTML5** (Semantics, SVG indicators)
- **CSS3** (Glassmorphism layout, hover interactions)
- **Bootstrap 5** (Navbar, cards, responsive grid, modals, check-toggles)
- **Vanilla JavaScript** (Checklist manipulation, circular math calculations, localStorage manager)
- **FontAwesome** (Aesthetic placement icons)

## Project Folder Structure

```text
├── index.html
├── style.css
├── script.js
├── README.md
└── .gitignore
```

## Installation Instructions

1. Clone this repository:
   ```bash
   git clone https://github.com/vakamalla-deekshitha/placement-preparation-tracker.git
   ```
2. Navigate into the repository folder:
   ```bash
   cd placement-preparation-tracker
   ```
3. Open `index.html` in any web browser to run the application immediately. No builds or installations are required!

## Usage Instructions

1. **Dashboard Check**: Observe the overall progression wheel which dynamically updates as items are checked or mock interviews are added.
2. **DSA Problems**: Check the square checkmarks as you solve problems. Click the garbage can icon to remove custom items. Filter problems using the Difficulty dropdown.
3. **Aptitude & Core**: Click on the circle icons in the Aptitude and Core CS panels to toggle complete status. Finished items will show a strike-through.
4. **Mock Log**: Click the "Add Mock Log" button, fill in the details of your interview session, select a rating and status, and save. It will display a card summary immediately.

## Future Enhancements

- **Custom DSA Problem Addition**: Allow adding custom problem links, platform targets, and titles dynamically.
- **Analytics Charts**: Integrate historical line charts tracking preparation intensity over weeks.
- **Timer Module**: Implement a Pomodoro or LeetCode problem countdown timer within the tracker.
- **Study Resources Links**: Connect each concept directly to articles or videos for fast learning reference.
