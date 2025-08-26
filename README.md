# Book Store App

A full-stack web application for managing and browsing books with user authentication and admin features.

## Features
- User authentication (signup/login)
- Book browsing and searching
- Admin dashboard for managing books and users
- Responsive design for all device sizes
- Secure admin user creation with secret key

## Deployment Instructions

### Prerequisites
- MongoDB database (can be local or cloud-based like MongoDB Atlas)
- Render account (https://render.com)

### Environment Variables
Create a `.env` file in the `server` directory with the following variables:
```
PORT=5050
MONGO_URI=your_mongodb_connection_string_here
ADMIN_SECRET_KEY=your_admin_secret_key_here
```

### Deploying to Render

1. **Fork this repository** or use the existing repository connected to Render

2. **Set up Environment Variables in Render:**
   - Go to your Render dashboard
   - Navigate to your web service
   - In the "Environment Variables" section, add:
     - `PORT` = `5050`
     - `MONGO_URI` = `your_mongodb_connection_string`
     - `ADMIN_SECRET_KEY` = `your_chosen_secret_key`

3. **Configure Build and Start Commands in Render:**
   - Build command: `npm install && cd client && npm install`
   - Start command: `npm run dev`

4. **Configure MongoDB:**
   - Create a MongoDB database (local or cloud)
   - Update the `MONGO_URI` environment variable with your connection string

5. **Create First Admin User:**
   - After deployment, sign up as a regular user
   - Use the admin dashboard to create additional admin users
   - OR use the special admin signup with the secret key:
     - Go to `/signup`
     - Toggle "Signup as Admin"
     - Enter the admin secret key you set in environment variables

### Local Development

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   cd client
   npm install
   ```
3. Create `.env` file in the `server` directory with your configuration
4. Start the development server:
   ```
   npm run dev
   ```

## Project Structure
- `client/` - React frontend
- `server/` - Node.js/Express backend
- `server/controller/` - API controllers
- `server/model/` - MongoDB models
- `server/route/` - API routes
- `client/src/components/` - React components
- `client/src/contest/` - React context providers

## Security Notes
- Never commit `.env` files to version control
- Use strong, unique passwords for admin accounts
- Change the default admin secret key
- Regularly update dependencies