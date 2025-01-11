# Hospital Food Management System

## Overview

This project is a **Hospital Food Management System** that enables the management of patient food requirements, pantry staff tasks, and meal deliveries. The system includes functionalities for hospital food managers, inner pantry staff, and delivery personnel. It also provides a dashboard for easy tracking of patient information, food/diet charts, pantry performance, and meal delivery statuses.

The project is developed using **Next.js**, **React**, **TypeScript**, and **Node.js**.

## Features

### 1. **Hospital Food Manager**
- **Manage Patient Details**: Add, update, and view patient information (Name, Diseases, Allergies, Room Number, Bed Number, etc.).
- **Create Food/Diet Charts**: Define meal plans for patients with specific instructions (e.g., "no salt," "low sugar").
- **Manage Inner Pantry**: Input pantry details, assign tasks to pantry staff, and monitor meal preparation.
- **Track Meal Deliveries**: Track the status of meal preparation and delivery for different meal times (Morning, Evening, and Night).

### 2. **Inner Pantry Staff**
- **View Assigned Tasks**: View and manage meal preparation tasks.
- **Assign Meals to Delivery Personnel**: Assign specific meal boxes to delivery staff.
- **Track Meal Delivery**: Monitor meal deliveries to patients and update delivery status when completed.

### 3. **Delivery Personnel**
- **Mark Deliveries as Completed**: Log into the pantry portal and mark deliveries as "Done" once meals are successfully delivered.

### 4. **Dashboards**
- **Hospital Food Manager Dashboard**: Track food deliveries, patient details, and meal preparation status.
- **Inner Pantry Dashboard**: Monitor meal preparation tasks and real-time updates on deliveries.

## Technologies Used

- **Backend**: Next.js (with API routes), JWT Authentication, MongoDB
- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Deployment**: Deployed on Render
  
## Getting Started

### Prerequisites

To run the project locally, make sure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (for the database)

### Installation

1. Clone the repository:

git clone https://github.com/GIRISHGHUGARE/Hospital-Food-Management.git
cd hospital-food-management

2. Install dependencies:

bash
Copy code
npm install

3. Set up environment variables:

Create a .env file in the root of the project and configure the following variables:
env
Copy code
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret-key

4. Run the application:

bash
Copy code
npm run dev
Your application should now be running at http://localhost:3000.

## Features Yet to be Implemented
Delivery Personnel Functionality: The feature allowing delivery personnel to log in and mark deliveries as completed is still in progress.

## Deployment
The application has been deployed to Render and can be accessed at the following link:

Deployed Application: [Live Link]

## Credentials for Testing
You can use the following credentials to test different roles in the application:

### Hospital Food Manager:

Email: hospital_manager@xyz.com
Password: Password@2025

### Inner Pantry Staff:

Email: hospital_pantry@xyz.com
Password: Password@2025

### Delivery Personnel:

Email: hospital_delivery@xyz.com
Password: Password@2025

## Learnings and Challenges
This project allowed me to expand my skill set by working with Next.js and TypeScript. Coming from a React MERN stack background, I was able to learn new technologies through extensive research and tutorials.

### Some challenges I faced include:

Implementing CORS for cross-origin requests.
Managing JWT authentication and ensuring secure token storage.
Handling multiple roles with different functionalities.
