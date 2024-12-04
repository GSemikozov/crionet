# Crionet weather app

React + TypeScript + Vite template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Current architecture principles

1. components for presentation without logic
2. containers for connection to the data layer
3. state management on RTK (redux toolkit with slices and react-query under the hood)
4. ui from shadcn (redix + tailwind, pretty easy for prototyping)
5. interaction with api - via graphql + apollo (api + libs folder)

## Further improvements

1. if logic suppose to be more complicated with a lot of additional features - it is easy to move to FSD (feature sliced design)
2. then add router and pages (react-router-dom or similar)
3. cover all important functionality by tests (jest or react-test-library)

- api calls, both success and error flow
- reducers
- hooks
- helpers

## How To Run

Firstly, we use `geocoding-api.open-meteo.com` to get and display weather info

1. npm i
2. npm run dev
