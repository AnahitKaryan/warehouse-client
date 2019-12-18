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

git checkout temp <br />

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
│   │   ├── assets - components styles and images
│   │   |   ├── css - all styles
│   │   |   |    ├── styles.css - whole styles
│   │   |   |    └── userDataFor.css - user data form styles
│   │   |   └── images - all images
│   │   |        ├── product.jpg
│   │   |        ├── sender.jpg
│   │   |        ├── user.png
│   │   |        ├── shop.jpg
│   │   |        ├── w1.jpg
│   │   |        ├── w2.jpg
│   │   |        ├── w3.jpg
│   │   |        └── warehouse.svg
│   │   ├── Components
│   │   |   ├── Bests - best partner component
│   │   |   |    ├── best.jsx - best sender and shop
│   │   |   |    └── bestsList.jsx - beasts list component
│   │   |   ├── Tables - all tables
│   │   |   |    ├── Products
│   │   |   |    |   ├── list.jsx - products data create
│   │   |   |    |   ├── modal.jsx - products data change 
│   │   |   |    |   ├── deleteModal.jsx - product delete params 
│   │   |   |    |   └── tableProducts.jsx - products table
│   │   |   |    ├── Histories
│   │   |   |    |   ├── list.jsx - histories data create
│   │   |   |    |   └── tableHistoriess.jsx - histories table
│   │   |   |    ├── paginacion
│   │   |   |    |   ├── paginacionTabla.jsx - create table paginacion
│   │   |   |    ├── Senders
│   │   |   |    |   ├── list.jsx - senders data create
│   │   |   |    |   ├── modal.jsx - senders data change
│   │   |   |    |   └── tableSenders.jsx - senders table
│   │   |   |    └── Shops
│   │   |   |        ├── list.jsx - shops data create
│   │   |   |        ├── modal.jsx- shops data change
│   │   |   |        └── tableShops.jsx - shops table
│   │   |   ├── carousel.jsx - create slide component
│   │   |   ├── footer.jsx - create footer component
│   │   |   ├── header.jsx - create header component
│   │   |   ├── home.jsx - create home component
│   │   |   ├── login.jsx - create login form
│   │   |   ├── forgotPassword.jsx - forgot password page
│   │   |   ├── userPage.jsx - user personal information page
│   │   |   ├── notFound.jsx - notFount page
│   │   |   └── register.jsx - create register form
│   │   ├── configs - all files configuration settings
│   │   |   └── config.js -Contains application configuration settings
│   │   ├── DAO - Fetch request implementetion.
│   │   |   └── DAO.js
│   │   ├── app.js - project primary file 
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