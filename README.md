# NextHire

NextHire is a comprehensive job portal designed to streamline job searching and hiring processes for students, recruiters, and companies. Built with MERN stack (MongoDB, Express.js, React.js, and Node.js), NextHire offers a seamless and intuitive user experience for managing job postings, applications, and user profiles.

## Features

### For Job Seekers
- **Search and Filter Jobs**: Search for jobs by title, location, industry, and more.
- **Apply for Jobs**: Submit applications directly through the platform.
- **Track Applications**: Monitor the status of your job applications (pending, accepted, or rejected).

### For Recruiters
- **Post Jobs**: Create detailed job postings with requirements, salary, location, and more.
- **Manage Applications**: View and manage applications for posted jobs.
- **Company Profiles**: Showcase your company’s details and branding.

### General
- **User Authentication**: Secure login and registration system for students and recruiters.
- **Responsive Design**: Optimized for all devices using TailwindCSS.
- **Admin Features**: Advanced tools for managing job listings and user data.

## Technologies Used

### Frontend
- **React**: Dynamic and interactive user interface.
- **Redux Toolkit**: State management for seamless user experience.
- **TailwindCSS**: Modern and responsive UI design.
- **React Router**: Efficient navigation between pages.

### Backend
- **Node.js**: Server-side logic.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: Database for storing user, job, and application data.
- **Cloudinary**: Media storage for profile pictures and company logos.

### Tools and Libraries
- **JWT**: Secure user authentication.
- **Multer**: File uploads.
- **Redux-Persist**: State persistence across sessions.

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud-based)

### Clone the Repository
```bash
git clone https://github.com/your-username/NextHire.git
cd NextHire
```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add the following:
   ```env
   MONGO_URI=your-mongodb-connection-string
   CLOUD_NAME=your-cloudinary-cloud-name
   API_KEY=your-cloudinary-api-key
   API_SECRET=your-cloudinary-api-secret
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd Frontend/vite-project
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Access the Application
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8000`

## API Endpoints

### User Routes
- `POST /api/v1/user/register`: Register a new user.
- `POST /api/v1/user/login`: Login an existing user.
- `POST /api/v1/user/logout`: Logout the user.

### Job Routes
- `POST /api/v1/job/post`: Create a new job posting.
- `GET /api/v1/job/get`: Retrieve all job postings.
- `GET /api/v1/job/get/:id`: Retrieve details of a specific job.

### Application Routes
- `POST /api/v1/application/apply/:id`: Apply for a job.
- `GET /api/v1/application/get`: Retrieve all applications for the logged-in user.
- `GET /api/v1/application/:id/applicants`: Retrieve applicants for a specific job.

## Contribution
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Description of changes"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.


---

Enjoy using NextHire!
