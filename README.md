# PersonalSite

My personal website formulated as a React application using TypeScript.

Latest release is hosted on [jacobwilliamson.dev](https://www.jacobwilliamson.dev)

## How to Run

This project was bootstrapped with create-react-app, and follows the same steps as any other create-react-app application.

### Prerequisites

* Node
* NPM

### Instructions

1. Clone the repository
2. Open a terminal in the repository's directory
3. Run `npm i`
4. Run `npm start` to run a development server

If you'd like to build the production code, run `npm run build` and then you can run `serve -s build` to serve the code locally.

## How to Host

I host my website on Azure using the Azure Storage static website hosting feature. [Scott Hanselman](https://hanselman.com) has a [great tutorial](https://www.youtube.com/watch?v=G_gDYlRBAZw) on how to do this. You'll need to do some extra configuration to get the routing to work properly. I recommend following [this guide](https://antbutcher.medium.com/hosting-a-react-js-app-on-azure-blob-storage-azure-cdn-for-ssl-and-routing-8fdf4a48feeb) by Anthony Butcher.

## Project Structure

There are 2 main components to the website. Website content is located in public/data and the React app is located in src.

### Website Content

The following files are required in the public/data folder:
* about.json
* contacts.json
* githubactivity.json
* projects.json
* resume.json

### React App

The React app takes a functional component approach and uses TypeScript for strict type checking. Components are provided by the [Material UI](https://mui.com) component library. 

The React code is split into different folders based on the role of the files. The folders are:
* components - for reusable React components
* hooks - for hooks, mainly ones that fetch external data
* styles - for themes and other special styles
* types - for typescript definitions
* utils - other functions that are used across components that aren't components themselves

## Coding Style

Coding style is enforced by ESLint, and the specific rules can be found in .eslintrc.

Simple styling is applied through the MUI componen's props. When more complex styling is required (e.g., applying many styles or using psuedoselectors), using MUI's `styled` API is used.