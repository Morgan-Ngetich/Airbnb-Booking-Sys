# Airbnb: A Full-Stack Property Rental Application


## Project Description
This project is a full-stack project of a popular vacation rental online marketplace Airbnb. It allows users to sign up, list their properties for rent, browse available properties, make bookings, leave reviews, and receive notifications. The project includes both frontend and backend components, providing a comprehensive solution for property rental management.

****To view the website click** [https://airbnb-booking-sys-1.onrender.com](https://airbnb-booking-sys-1.onrender.com)**

## Table of Contents
1. [Introduction](#introduction)
2. [How the Project Works](#how-the-project-works)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Features](#features)
6. [Technologies Used](#technologies-used)
7. [Authors](#authors)
8. [License](#license)

## Introduction
The project aims to replicate the core functionalities of Airbnb, allowing users to search for, book, and list properties for short-term rentals. It provides a user-friendly interface for property owners to manage their listings and for travelers to find and book accommodations.

## How the Project Works
The project utilizes a Flask backend to handle user authentication, property management, booking processing, review submissions, and notification delivery. The frontend is built with React to provide a responsive and intuitive user interface. The backend and front end communicate through RESTful API endpoints, enabling seamless interaction between the client and server.

## Installation
1. Clone the repository:
```
git clone git@github.com:Morgan-Ngetich/Airbnb-Booking-Sys.git
```

2. Install dependencies for the frontend and backend:
```
cd client
```
```
npm install
```
```
cd ../server
```
```
pip install -r requirements.txt
```

4. Set up the database:
- Create a PostgreSQL database.
- Configure the database URI in the backend `.env` file.
- Run the backend server: ```Flask run```

4. Run the frontend application: ```npm start```

5. Access the application in your web browser.

## Usage
- **Sign up** for an account to list properties or book accommodations.
- **Browse available properties** and view property details.
- **Make bookings** for selected properties.
- **Leave reviews** for properties you have booked.
- **Receive notifications** for booking updates and new reviews.

## Features
- User authentication and authorization.
- Property listing management.
- Booking system with calendar integration.
- Review system for guests and hosts.
- Notification system for booking and review updates.
- Responsive design for mobile and desktop.

## Technologies Used
- **Frontend:** React, Bootstrap, React-Icons, Font-Awesome
- **Backend:** Flask, SQLAlchemy, PostgreSQL, SQLlite, FWt_Forms
- **Authentication:** bcrypt, Flask-Login
- **Data Serialization:** Marshmallow
- **API Development:** Flask-RESTful
- **Database Management:** PostgreSQL, SQLlite
- **Deployment:** Render

## Authors
- [Morgan Ngetich](https://github.com/Morgan-Ngetich)
- [Cheda]()

## License
This project is licensed under the [MIT](https://github.com/Morgan-Ngetich/Airbnb-Booking-Sys/blob/main/LICENSE) License - see the [LICENSE.md](https://github.com/Morgan-Ngetich/Airbnb-Booking-Sys/blob/main/LICENSE) file for details.
