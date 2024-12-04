# Crionet Weather App

This project uses **React**, **TypeScript**, and **Vite** as the foundation, providing a minimal yet powerful setup with Hot Module Replacement (HMR) and ESLint rules.

The app retrieves and displays weather information using the `geocoding-api.open-meteo.com`.  
**Important:** The API requests are case-sensitive, so ensure proper formatting in search requests (for instance, try to search by `ge` and `Gr`, and see a difference).

---

## Current Architecture Principles

1. **Components**: Focused on presentation without logic.
2. **Containers**: Handle data-layer connections.
3. **State Management**:  
   - **RTK (Redux Toolkit)** with slices and **React Query** under the hood.
4. **UI**: Uses **shadcn** (Radix + Tailwind) for rapid prototyping and clean design.
5. **API Interaction**: Managed via **GraphQL** using **Apollo** (`api` and `libs` folders).

---

## Further Improvements

1. If the app's logic grows more complex, consider transitioning to **FSD (Feature-Sliced Design)** for better scalability.
2. Add routing for navigation:
   - Use **React Router DOM** or similar routing libraries.
3. Increase test coverage using **Jest** or **React Testing Library**:
   - Test API calls (both success and error flows).
   - Validate reducers.
   - Test hooks and helpers.

---

## How to Run

1. Install dependencies:
```bash
   npm i
```
2. Start the development server:
```bash
   npm run dev
```

## Screenshots

![App Default State](./assets/app1.png)
![App Search State](./assets/app2.png)
![App Details / Info State](./assets/app3.png)
