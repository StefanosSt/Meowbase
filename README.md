# 🐾 Meowbase – Stefanos Stamoulis

A responsive, modern React application that fetches and displays cat images and breed data from **TheCatAPI**.  
Built with a cutting-edge React 19 + Vite toolchain, the project demonstrates **state management, caching, routing, accessibility, and testing practices**.

---

## ✨ Demo
[Live Demo](https://meowbase.pages.dev/)

---

## 🚀 Tech Stack
This project is built with a modern frontend toolchain, optimized for **performance, developer experience, and scalability**:

- **React 19** – UI foundation  
- **Vite 7** – Lightning-fast dev/build tooling  
- **TypeScript 5** – Type safety & DX  
- **React Router v7** – Client-side routing  
- **Redux Toolkit** – State management made simple  
- **TanStack React Query v5** – Data fetching, caching & syncing  
- **React Content Loader** – Skeleton loaders during fetches  
- **React to Print** – Export/print support  
- **Sass** – Styling with flexibility and modularity  

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- npm

### Setup

# Clone the repo
```
git clone https://github.com/StefanosSt/Meowbase.git
cd meowbase
```

# Install dependencies
```
npm install
```
# Start development
```
npm run dev
```
---

## 📁 Project Structure

```
src/
├── api/          # API clients and endpoints (TheCatAPI integration)
├── assets/       # includes images & icons
├── components/   # Reusable UI components
├── hooks/        # Custom React hooks
├── pages/        # Route-based pages
├── routes/       # Route endpoints setup
├── store/        # Redux store setup
├── styles/       # Global Sass styles
├── types/        # Shared TypeScript types
```

---

## 🧹 Code Quality & Formatting
Consistency and maintainability are enforced via:

- **ESLint** – Static code analysis  
- **Prettier** – Consistent formatting  
- **TypeScript ESLint plugin** – Advanced type linting  

---

## ♿ Accessibility (a11y)

- Semantic markup for screen readers
- Keyboard-friendly navigation
- Skeleton loaders to improve perceived performance

---

## 🎨 Styling & Theming

- Built with Sass for modular, maintainable styling
- Structure allows for easy integration of light/dark modes in the future

---

## 🚧 Improvements & Future Work

- Add integration/E2E tests (Cypress or Playwright)
- Centralize Modal logic in order to share functionality across the app
- Internationalization (i18n) for multilingual support
- Improvements on A11y

## 📚 Summary

### Meowbase showcases:

- Modern frontend stack (React 19 + Vite + TypeScript)
- Scalable architecture (Redux Toolkit + React Query)
- Testing setup for reliability
- Clean, extensible project structure

🐱 Built with ❤️ for cat lovers and developers alike.