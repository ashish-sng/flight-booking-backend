# Flight Search App - Backend

<h1>Demo Video of the app.</h1>

https://github.com/ashish-sng/flight-booking-fare/assets/68745052/e19ed16b-726e-4ade-a401-e3ef4abe673e

<h1> A few example picutres are attached below as the data is genereated because no free apis were available that were free and provide data on fares so it might be difficult to find flights at times in this generated data.<h1>

![screencapture-ashishsng-flight-fare-app-netlify-app-flights-2023-06-06-22_19_04](https://github.com/ashish-sng/flight-booking-fare/assets/68745052/97273fe0-0441-4534-a7d6-312947a9d132)

![screencapture-localhost-3000-flights-2023-06-06-22_02_50](https://github.com/ashish-sng/flight-booking-fare/assets/68745052/47e5d8d1-f871-44b5-ac5a-00027c42c30c)

![screencapture-localhost-3000-flights-2023-06-06-22_03_57](https://github.com/ashish-sng/flight-booking-fare/assets/68745052/a5199d3d-bc44-4183-ad92-be64024dab18)


![screencapture-localhost-3000-flights-2023-06-06-22_04_49](https://github.com/ashish-sng/flight-booking-fare/assets/68745052/e79a54c7-6555-4eef-aaad-5805ee054561)


The backend of the Flight Search App is responsible for handling the server-side logic and database operations. It provides the necessary APIs for user authentication, flight search, and data retrieval from the MongoDB Atlas database.

## Features

- **User Authentication:** The backend supports user registration and login functionality using JSON Web Tokens (JWT) for secure authentication.
- **Flight Search API:** It provides an API endpoint to search for available flights based on the source and destination cities.
- **Date Filtering:** The backend implements date filtering to retrieve flights based on the desired departure date.
- **MongoDB Integration:** The backend integrates with MongoDB Atlas, a cloud-based MongoDB database service, to store and retrieve flight data.
- **Dummy Data:** The backend uses pre-generated dummy flight data, which has been inserted into the MongoDB Atlas database for demonstration purposes.

## Technologies Used

- **Backend Framework:** Node.js with Express.js
- **Database:** MongoDB (MongoDB Atlas)
- **Authentication:** JSON Web Tokens (JWT)
- **API Communication:** Axios

## Backend Setup

To set up the backend of the Flight Search App, follow these steps:

1. Clone the repository: `git clone https://github.com/ashish-sng/flight-booking-backend.git`
2. Install the dependencies: `npm install`
3. Configure the MongoDB connection:
   - Create a MongoDB Atlas account and set up a new cluster.
   - Update the MongoDB connection details in the backend configuration (`/backend/config/database.js`).
4. Insert Dummy Data:
   - The backend uses dummy flight data for demonstration purposes.
   - The dummy data has been created and inserted into MongoDB Atlas during the development process.
   - The app will retrieve and filter the flights from the MongoDB Atlas database.
5. Start the backend server: `npm start`
6. The backend server will run on `http://localhost:4000`.

## Project Structure

The backend of the Flight Search App follows a modular structure with different directories serving specific purposes. Here's an overview of the project structure:

- `/backend`: Contains the server-side code written in Node.js and Express.js.
  - `/config`: Contains the configuration files for the backend, including the MongoDB connection details.
  - `/controllers`: Contains the logic for handling different routes and API endpoints.
  - `/models`: Contains the data models and schemas used in the backend.
  - `/routes`: Contains the API routes and endpoints for the backend.

## Contributions

Contributions to the backend of the Flight Search App are welcome! If you encounter any issues or have suggestions for improvement, please feel free to submit a pull request or open an issue in the GitHub repository.

## License

This project is licensed under the [MIT License](LICENSE).
