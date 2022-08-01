# Accord

Accord is a fullstack web application modeled after the popular chat app, Discord. Signed up users have the ability to join communities or create their own community and chat through live messaging.

Visit our live site here :https://accord-flask-react.herokuapp.com/

![image](https://user-images.githubusercontent.com/46208016/182058926-efc02305-5efe-4614-be87-c83d6d794d33.png)


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


## How to Start the Development Environment
1. Clone this repository
    git clone https://github.com/kevin9gao/accord-flask-react-project.git
2. Install dependencies
    pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
3. Create a **.env** file based on the example with the proper settings for your development environment
4. Setup your PostgresSQL user,password, and database and make sure it matches with your **.env** file
5. Enter your environment, migrate your database, seed your database, and run your flask app
    * pipenv shell
    * flask db upgrade
    * flask seed all
    * flask run
6. Go into your react app directory and install dependencies and run the app
    * npm install
    * npm start
7. Open your browser and go to the localhost address your are running the app in

## Features
# Servers
As a signed in user, one can access servers that the user is apart of, as well as being able to join other serversvia Discover page.  The signed in user has the capability to create servers if so desired, thereofre, that user becomes the owner of said server which enables the ability to edit and delete that specific server.  Servers can be found on the very left navigation bar, and he/she can create a server by clicking the "+" icon, which will have a form pop up to the user.  The user can edit and delete the created server by clicking the drop-down menu next to the server's name at the top of the following navigation bar.
![image](https://user-images.githubusercontent.com/46208016/182059011-67c2c302-8010-47dc-90bc-00dfd200fb2d.png)
![image](https://user-images.githubusercontent.com/46208016/182057530-89ff1321-0329-4adc-99e1-70f5f8d3dac9.png)
![image](https://user-images.githubusercontent.com/46208016/182057572-3cdc9070-4268-4b80-a317-e20adb322bf2.png)

# Channels
As a signed in user, one can access the channels in a unique server.  If the user is the owner of the server, the user is able to create, edit, and delete channels within said server.  Channels can be found in the second-left navigation bar after the user has clicked on which server he/she wants to view.  The user can then click on the settings icon (cog wheel) and can choose to edit/delete that specific channel once the Edit Channel form pops up.
![image](https://user-images.githubusercontent.com/46208016/182057818-a7572f2d-bf12-4bd3-bfaf-6943a0d7a10e.png)
![image](https://user-images.githubusercontent.com/46208016/182057840-f261cdbb-4be5-4ea9-8fbf-021d68b447d4.png)

# Live Chat
A signed in user can view and create messages in specific channels.  This feature also allows users to see the chat history.
![image](https://user-images.githubusercontent.com/46208016/182058340-0a7277d4-2032-430a-b5f8-a151fbcafb5f.png)

# Direct Messaging via Private Servers
A signed in user can view other users and create direct messages.  This feature also allows users to see the chat history.
![image](https://user-images.githubusercontent.com/46208016/182058485-1cca2842-7641-4b2b-9e2c-3208a1256e86.png)


## Future Features to Implement
* Friends
* Video Chat
* Audio Chat
* Threads
* Live Streaming
* Server Roles

## Technical Implementation Details
