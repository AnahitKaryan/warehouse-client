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

### `npm start`

Runs the app in the development mode.<br />
 Open [http://localhost:3000] to view it in the browser.<br />

The page will reload if you make edits. You will also see any lint errors in the console. <br />

2) Run project for `production` 

### `npm run build`

Runs the app in the production mode.<br />
Open [http://localhost:5000] to view it in the browser.<br />

## Project structure

├── warehouse-client
│   ├── src - Source codes.
│   │   ├── assets - css files
│   │   |   └── styles.css - user data form styles
│   │   └── Components
│   │   |   └── Tables - all tables
│   │   |   |    └── Products
│   │   |   |    |   └── List.jsx - products data create
│   │   |   |    |   └── Modal.jsx - products data change 
│   │   |   |    |   └── TableProducts.jsx - products table
│   │   |   |    └── Senders
│   │   |   |    |   └── List.jsx - senders data create
│   │   |   |    |   └── Modal.jsx - senders data change
│   │   |   |    |   └── TableSenders.jsx - senders table
│   │   |   |    └── Shops
│   │   |   |    |   └── List.jsx - shops data create
│   │   |   |    |   └── Modal.jsx- shops data change
│   │   |   |    |   └── TableShops.jsx - shops table
│   │   |   └── Home.jsx
│   │   |   └── Login.jsx
│   │   |   └── Register.jsx
│   │   ├── configs - all files configuration settings
│   │   |   └── config.js -Contains application configuration settings
│   │   └── DAO - Fetch request implementetion.
│   │   |   └── DAO.js
│   │   ├── App.js - project primary file 
│   │   └── index.css - base css file.
│   │   └── index.js - base js file.
│   ├── public - base html file.
│   │   ├── index.html
|   ├── package.json-  the project name,version,scripts and dependencies.
|   ├── package-lock.json-  the project name,version and dependencies.
|   ├── .gitignore - lists the files the git should ignor.
|   ├── README.md - a guide to describing and using this project.



























├── frontend
|  ├── config - Contains config files .
|  |  ├── jest
|  |  |  ├── cssTransform.js -  transform config option to specify how css are transformed.
|  |  |  └── fieTransform.js -  Transform config option to specify how assets are transformed.
|  |  ├── env.js - The environment variables configuration
|  |  ├── modules.js - Modules configuration 
|  |  ├── paths.js - Paths configuration
|  |  ├── webpack.config.js - webpack configuration 
|  |  └── webpackDevServer.config.js - webpack dev server configuration
|  ├── public - Contains main index.js files and logo.
|  ├── scripts - Contains scripts for start , build or test .
|  |  ├──  build.js - create program for production mode
|  |  └──  start.js - start program
|  ├── src - Contains all components and logic files.
|  |  ├── components - All components for this project.
|  |  |  ├──  audioTable.jsx - show audio file, edit, delete.  
|  |  |  ├──  home.jsx - show home page.
|  |  |  ├──  imageTable.jsx - show image file, edit, delete. 
|  |  |  ├──  login.jsx - login user.
|  |  |  ├──  modal.jsx - show edit modal. 
|  |  |  ├──  navbar.jsx - show sign up and sign in button, when user logged show view all, upload and logout button
|  |  |  ├──  pagination.jsx - Change page number and get new data 
|  |  |  ├──  register.jsx - User registration
|  |  |  ├──  upload.jsx - upload new file
|  |  |  └──  view.jsx - show file
|  |  ├── config - Contains all project config.
|  |  |  └──  config.js - Api configuration for send and get data
|  |  ├──  DAO Sending requests .
|  |  |  ├──  audio.DAO.js - Add, get, update, delete audio file requests
|  |  |  ├──  image.DAO.js - Add, get, update, delete image file requests
|  |  |  └──  user.DAO.js - User registration, login and logout request
|  |  ├── store - Mobx store for all components.
|  |  |  ├──  audio.stor.js - Store for audio file
|  |  |  ├──  image.stor.js - Store for image file
|  |  |  ├──  upload.store.js - Store for uploading file
|  |  |  └──  user.store.js - Store or user
|  |  ├── app.js - Start .
|  |  └── index.js - App component render this.
├── .babelrc - babel configuration
├── .gitignore 
├── package-lock.json
├── package.json 
└── README.md
