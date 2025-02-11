# Healthcare Referral Management System

## Overview

This project is a Healthcare Referral Management System designed to streamline the process of creating, managing, and tracking patient referrals. It provides a user-friendly interface for healthcare professionals to submit referrals, view existing referrals, and manage their status.

## Features

- Patient referral form with synthetic data generation
- Referral listing and detailed view
- Referral status management
- Notifications for new referrals and status updates
- Google Maps integration for address autocomplete

## Tech Stack

- Frontend: React with Next.js 15
- Styling: Tailwind CSS
- Form Handling: React Hook Form with Zod validation
- State Management: React Context API
- Notifications: Custom hook with local storage persistence
- Maps Integration: Google Maps JavaScript API

## Prerequisites

- Node.js (v18 or later)
- npm (v7 or later)
- Google Maps API key

## Getting Started

1. **Install Node.js and npm**
   - Download and install Node.js (which includes npm) from [nodejs.org](https://nodejs.org/)
   - Verify the installation by running `node --version` and `npm --version` in your terminal

2. **Clone the repository**
   \`\`\`
   git clone https://github.com/louis-adriano/healthcare-referral-management-system.git
   cd healthcare-referral-management-system
   \`\`\`

3. **Install dependencies**
   \`\`\`
   npm install
   \`\`\`

4. **Set up environment variables**
   - Copy the `.env.example` file to `.env.local`:
     \`\`\`
     cp .env.example .env.local
     \`\`\`
   - Open `.env.local` and add your environment variables:
     \`\`\`
     NEXTAUTH_URL=[http://localhost:3000](http://localhost:3000)NEXTAUTH_SECRET=your_nextauth_secret_here
     GOOGLE_CLIENT_ID=your_google_client_id_here
     GOOGLE_CLIENT_SECRET=your_google_client_secret_here
     NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
     \`\`\`


5. **Set up Google OAuth 2.0**
- Go to the [Google Cloud Console](https://console.cloud.google.com/)
- Create a new project or select an existing one
- Enable the Google+ API
- Create OAuth 2.0 credentials (Client ID and Client Secret)
- Add authorized redirect URIs:
- `http://localhost:3000/api/auth/callback/google` (for development)
- `https://healthcare-referral-management-system.vercel.app/api/auth/callback/google` (for production)

6. **Set up Google Maps API**
- In the same Google Cloud Console project, enable the Maps JavaScript API and Places API
- Create an API key and restrict it to these APIs
- Add your domain to the list of allowed referrers

7. **Run the development server**
   \`\`\`
   npm run dev
   \`\`\`


8. **Open the application**
- Open your browser and navigate to `http://localhost:3000`

You should now see the Healthcare Referral Management System running locally on your machine.

## Usage

- Users can log in using their Google account
- Once logged in, users will be directed to the dashboard
- From the dashboard, users can create new referrals or view existing ones
- The referral form includes address autocomplete powered by Google Maps API
- Users can view and manage referrals, including updating their status
- Notifications will appear for new referrals and status updates

## Deployment

This project is set up for easy deployment on Vercel. Follow these steps:

1. Push your code to a GitHub repository
2. Import your project into Vercel
3. Set up the environment variables in the Vercel project settings
4. Deploy!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.