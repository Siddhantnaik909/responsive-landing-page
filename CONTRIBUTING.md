# Contributing to NexGen

Thank you for showing interest in contributing to NexGen! We love community participation and welcome all kinds of contributions: from simple documentation fixes and mobile responsive improvements to custom micro-animations and advanced JS integrations.

---

## 📜 Code of Conduct

By participating in this project, you agree to maintain a respectful, welcoming, inclusive, and professional environment for everyone. Please treat all contributors with kindness and constructive feedback.

---

## 🛠️ How Can I Contribute?

### 1. Reporting Bugs
If you spot a bug or rendering issue on specific devices:
- Open a GitHub issue.
- Describe the unexpected behavior clearly.
- Mention your environment (browser name, version, and screen size/resolution).
- If possible, attach screenshots or console error logs.

### 2. Suggesting Enhancements
Want to suggest a new section or animation style?
- Open an issue explaining your proposed enhancement.
- Explain *why* it would improve the landing page experience and visual appeal.
- If you're willing to implement it yourself, mention that!

### 3. Pull Requests (PRs)
To submit a code contribution:
1. **Fork the Repository** to your own GitHub account.
2. **Clone the Fork** to your local machine:
   ```bash
   git clone https://github.com/YOUR-USERNAME/responsive-landing-page.git
   cd responsive-landing-page
   ```
3. **Create a new Branch** specifically for your changes:
   ```bash
   git checkout -b feature/your-awesome-feature
   ```
4. **Make and Test Your Changes**:
   - Write clean, commented code.
   - Test your layout on multiple screen sizes using responsive developer tools in your browser.
   - Verify there are no console errors.
5. **Commit Your Changes** with descriptive commit messages:
   ```bash
   git commit -m "Refactor mobile drawer menu with improved glassmorphism contrast"
   ```
6. **Push to Your Branch**:
   ```bash
   git push origin feature/your-awesome-feature
   ```
7. **Open a Pull Request** against the `main` branch of the original repository.

---

## 🎨 Coding & Design Standards

To preserve the cohesive visual design of NexGen, please adhere to these standards:

- **Semantic HTML**: Use proper HTML5 semantic elements (e.g. `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
- **Clean Styling (CSS)**:
  - Do not use TailwindCSS or external frameworks unless explicitly discussed.
  - Rely on the defined CSS custom variables (`:root` inside `style.css`) for HSL colors, fonts, shadow properties, and transition durations.
  - Keep layout styles inside `style.css` and responsive styles inside `responsive.css`.
- **Vanilla JavaScript**: Keep logic lightweight, clean, and free of heavy dependencies (like jQuery). Focus on optimized performance and DOM manipulation.
