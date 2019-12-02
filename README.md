## The Warehouse react app

The  Warehouse app  whichenables ype to register and have acaunt and that stores warehouse information in tables( what products exist, which stores and shippers the warehouse works warehouse).<br />

## Prerequisites

you need `git` to `clone` the repository. You can get git from [http://git-scm.com/]. <br />
you need `node`, you can `download` here [https://nodejs.org/en/download/] <br />
you need `npm`, you can `install`  npm install npm@latest -g <br />

## Run the Application
Clone and install the dependencies.<br />

git clone https://github.com/AnahitKaryan/warehouse-client.git <br />

cd warehouse-client <br />

git checkout warehouse-client-branch <br />

In the `project` directory, you can `run`: <br />
The first `install` dependencies nmp ci , then <br />

Enter config folder config.j files and fill in the appropriate data: <br />host,port,protocol.


1) Run project for `development` <br />

### `npm run dev`

Runs the app in the development mode.<br />
Open [http://localhost:3000] to view it in the browser.<br />

The page will reload if you make edits. You will also see any lint errors in the console. <br />

2) Run project for `production` 

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.<br />

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!<br />

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.<br />

### `npm start`

Runs the app in the production mode.<br />
Open [http://localhost:5000] to view it in the browser.<br />

## Project structure

├── warehouse-client
│   ├── src - Source codes.
│   │   ├── assets - css files
│   │   |   └── styles.css - user data form styles
│   │   ├── Components
│   │   |   ├── Tables - all tables
│   │   |   |    ├── Products
│   │   |   |    |   ├── List.jsx - products data create
│   │   |   |    |   ├── Modal.jsx - products data change 
│   │   |   |    |   └── TableProducts.jsx - products table
│   │   |   |    ├── Senders
│   │   |   |    |   ├── List.jsx - senders data create
│   │   |   |    |   ├── Modal.jsx - senders data change
│   │   |   |    |   └── TableSenders.jsx - senders table
│   │   |   |    └── Shops
│   │   |   |        ├── List.jsx - shops data create
│   │   |   |        ├── Modal.jsx- shops data change
│   │   |   |        └── TableShops.jsx - shops table
│   │   |   ├── Home.jsx
│   │   |   ├── Login.jsx
│   │   |   └── Register.jsx
│   │   ├── configs - all files configuration settings
│   │   |   └── config.js -Contains application configuration settings
│   │   ├── DAO - Fetch request implementetion.
│   │   |   └── DAO.js
│   │   ├── App.js - project primary file 
│   │   ├── index.css - base css file.
│   │   ├── .eslintrc.json - eslint configuretions.
│   │   └── index.js - base js file.
│   └── public - base html file.
│       ├── index.html - base html file
│       └── fav.png - title icon
├── package.json-  the project name,version,scripts and dependencies.
├── package-lock.json-  the project name,version and dependencies.
├── .gitignore - lists the files the git should ignor.
└── README.md - a guide to describing and using this project.