# TypeScript Interview Challenges

A collection of coding challenges designed for junior developer interviews. Each challenge tests different skills while maintaining realistic complexity and time expectations.

## 🚀 Quick Start

```bash
# Clone and setup
git clone <repository-url>
cd typescript-interview-challenges
npm run install:all

# Work on a specific challenge
cd challenges/01-connect4
npm run dev
```

## 📋 Available Challenges

### 1. [Connect 4 Game](./challenges/01-connect4/)
**⏱️ 45-90 min | 🎯 Medium**
- **Skills:** Game logic, algorithms, 2D arrays, win detection
- **Focus:** Problem-solving, state management, testing
- Implement a terminal-based Connect 4 game with complete game logic

### 2. [Todo CLI with Persistence](./challenges/02-todo-cli/)
**⏱️ 60-90 min | 🎯 Medium**
- **Skills:** File I/O, CLI interfaces, CRUD operations, async/await
- **Focus:** Data persistence, command parsing, error handling
- Build a command-line todo app that saves to JSON files

### 3. [Refactor Legacy Calculator](./challenges/03-refactor-legacy/)
**⏱️ 60-90 min | 🎯 Medium**
- **Skills:** Code refactoring, design patterns, clean code principles
- **Focus:** Code quality, TypeScript best practices, architecture
- Improve a working but poorly written calculator application

### 4. [Library REST API](./challenges/04-rest-api/)
**⏱️ 90-120 min | 🎯 Medium-Hard**
- **Skills:** REST APIs, Express.js, middleware, validation
- **Focus:** API design, HTTP methods, testing with supertest
- Create a RESTful API for a library management system

### 5. [Sales Data Processing](./challenges/05-data-processing/)
**⏱️ 75-90 min | 🎯 Medium**
- **Skills:** Data transformation, CSV/JSON processing, aggregation
- **Focus:** Data manipulation, performance, reporting
- Process and analyze sales data with various reporting features

## 🎯 Interview Flow Suggestions

### For Different Skill Assessments:

**Problem Solving & Algorithms**
→ Start with Connect 4 (Challenge 1)

**Real-World Development Skills**
→ Todo CLI (Challenge 2) or REST API (Challenge 4)

**Code Quality & Refactoring**
→ Legacy Calculator (Challenge 3)

**Data Processing & Analysis**
→ Sales Data Processing (Challenge 5)

### Recommended Combinations:

**60-minute interview:**
- Connect 4 (partial implementation + discussion)

**90-minute interview:**
- Todo CLI OR Connect 4 (full implementation)

**2-hour interview:**
- Connect 4 + Legacy Refactoring (focus areas)

## 📝 Interview Questions to Pair With Challenges

### Technical Discussion Questions:

**Architecture & Design:**
- "How would you scale this solution for 1000+ users?"
- "What design patterns could improve this code?"
- "How would you add user authentication to this API?"

**Problem Solving:**
- "Walk me through your approach to debugging this issue"
- "How would you optimize this for better performance?"
- "What edge cases are you considering?"

**Code Quality:**
- "How do you ensure code quality in a team environment?"
- "What would you change about your solution given more time?"
- "How would you make this code more testable?"

**Real-World Scenarios:**
- "How would you handle this in a production environment?"
- "What monitoring/logging would you add?"
- "How would you deploy and maintain this application?"

## 🛠️ Setup for Interviewers

### Before the Interview:
1. Clone repo and test all challenges work
2. Choose challenge based on role requirements
3. Set up screen sharing and development environment
4. Prepare follow-up questions specific to the challenge

### During the Interview:
1. Let candidate choose their preferred challenge (if multiple fit)
2. Give 5-10 minutes to read and ask clarifying questions
3. Encourage thinking out loud and incremental development
4. Focus on problem-solving approach, not just completion
5. Ask follow-up questions about trade-offs and improvements

### Assessment Criteria:
- **Problem-solving approach:** How they break down the problem
- **Code organization:** Structure, naming, separation of concerns
- **TypeScript usage:** Type safety, interfaces, proper typing
- **Testing mindset:** Do they think about edge cases and testing?
- **Communication:** Can they explain their approach clearly?
- **Debugging skills:** How they handle errors and unexpected behavior

## 🚀 Workspace Commands

```bash
# Install all dependencies
npm run install:all

# Build all challenges
npm run build:all

# Test all challenges
npm run test:all

# Lint all challenges
npm run lint:all

# Format all challenges
npm run format:all
```

## 📁 Repository Structure

```
typescript-interview-challenges/
├── challenges/
│   ├── 01-connect4/
│   ├── 02-todo-cli/
│   ├── 03-refactor-legacy/
│   ├── 04-rest-api/
│   └── 05-data-processing/
├── package.json (workspace root)
└── README.md
```

Each challenge is a complete, standalone TypeScript project with its own dependencies, tests, and documentation.

---

**Good luck with your interviews! 🚀**