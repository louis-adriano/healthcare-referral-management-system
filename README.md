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
   git clone https://github.com/your-username/healthcare-referral-management-system.git
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
   - Open `.env.local` and add your Google Maps API key:
     \`\`\`
     NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
     \`\`\`

5. **Set up Google Maps API**
   - Go to the [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the Maps JavaScript API and Places API for your project
   - Create an API key and restrict it to these APIs
   - Copy the API key and paste it into your `.env.local` file

6. **Run the development server**
   \`\`\`
   npm run dev
   \`\`\`

7. **Open the application**
   - Open your browser and navigate to `http://localhost:3000`

You should now see the Healthcare Referral Management System running locally on your machine.

