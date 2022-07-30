# Accord

Accord is a fullstack web application modeled after the popular chat app, Discord. Signed up users have the ability to join communities or create their own community and chat through live messaging. 

Visit our live site here: 

## Technologies Used
* **Languages:** Javascript, Python, HTML/CSS
* **Backend:** Flask 
* **Frontend:** React, Redux
* **Database:** PostgreSQL
* **Hosting:** Heroku
* **Real-time Communication:** Socket.io

## Links
* [Visit Accord Live Site]
* [Feature List](https://github.com/kevin9gao/accord-flask-react-project/wiki/Feature-List)
* [Database Schema](https://github.com/kevin9gao/accord-flask-react-project/wiki/Database-Schema)
* [Frontend Routes](https://github.com/kevin9gao/accord-flask-react-project/wiki/Frontend-Routes)
* [Backend API Routes](https://github.com/kevin9gao/accord-flask-react-project/wiki/API-Routes)
* [User Stories](https://github.com/kevin9gao/accord-flask-react-project/wiki/User-Stories)
* [Redux State Shape](https://github.com/kevin9gao/accord-flask-react-project/wiki/State-Shape)


## How to the Development Environment
1. Clone this repository
    git clone https://github.com/kevin9gao/accord-flask-react-project.git
2. Install dependencies 
    pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
3. Create a **.env** file based on the example with the proper settings for your development environment
4. Setup your PostgresSQL user,password, and database and make sure it matches with your **.env** file
5. Enter your environment, migrate your database, seed your database, and run your flask app
    pipenv shell
    flask db upgrade
    flask seed all
    flask run
6. Go into your react app directory and install dependencies and run the app
    npm install
    npm start
7. Open your browser and go to the localhost address your are running the app in


## Future Features to Implement
* Friends
* Video Chat
* Audio Chat
* Threads
* Live Streaming
* Server Roles

## Techinical Implementation Details
