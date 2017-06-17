# IPT Knowledge Manager

This project demonstrates how to:
* Compose NGRX Reducers, Selectors and Middleware
* Compute derived data using Reselect/RxJS memoization
* NGRX Router integration
* Data normalization
* Process Observable (hot) streams of async actions, and isolating the side effects using @Effect decorator with NGRX/RxJS reactive transforms
* Integrate Material Design with third party component libraries like PrimeNG
* more: lazy loading, AOT...

It is work in progress. Users feature is completed, while Tests feature is not.

## Installation and configuration

To run the demo you need first to install latest Node.js and MongoDB. The only project configuation needed is to tell the Express.js server where to find/create the MongoDB database. This is done in `package.json` script as in following example:

```
...
"scripts": {
  ...
  "mongo": "mongod --dbpath=c:/mongo-data --port 27017",

```

## Development server

Run `npm start` for a dev server + express & mongodb backend API. It may be better to start front-end and back-end in different consoles if output seems too conflated. To do so run `npm run services` and `npm run ngserve` in two different consoles. 
Then navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

The webpack should proxy to nodejs server on port 9000 - `npm run ngserve` runs `ng serve --proxy-config proxy.conf.json`.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
