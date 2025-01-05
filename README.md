# Wild Oasis - Customer Side Application

## Overview

The **Wild Oasis Customer Side** is a customer-facing web application designed for booking cabins and managing reservations seamlessly. Built using **Next.js**, it offers a modern and responsive user interface with features such as cabin browsing, reservation management, and user authentication.

---

## Features

### Core Features
- **Cabin Browsing**: View detailed information about available cabins.
- **Reservation Management**: Create, edit, and delete reservations.
- **Authentication**: Secure login and logout functionality using NextAuth.js.
- **Responsive Design**: Optimized for various devices with Tailwind CSS.
- **Dynamic Routing**: Cabin and reservation-specific pages with dynamic routes.
- **Global State Management**: Context API for managing reservations and user data.

### User Experience
- **Real-Time Updates**: Loading spinners and feedback for smooth navigation.
- **Reservation Reminders**: Get notified of upcoming reservations.
- **Profile Management**: Update user details directly from the account page.
- **Interactive Forms**: Easy-to-use forms for booking and editing reservations.

---

## Tech Stack

### Frontend
- **Next.js**: React-based framework for server-side rendering and routing.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Supabase**: Backend-as-a-Service for authentication and data handling.
- **NextAuth.js**: Authentication library for secure login and session management.

### Libraries & Tools
- **PostCSS**: CSS processing.
- **ESLint**: Code linting for maintaining best practices.
- **Prettier**: Code formatting for consistency.

---

## Directory Structure

### Key Folders
- **`app/`**: Contains Next.js pages, layouts, and components.
  - **`_components/`**: Reusable UI components like `CabinCard`, `ReservationForm`, and `Navigation`.
  - **`_lib/`**: Utility functions for authentication, data fetching, and Supabase integration.
  - **`_styles/`**: Global styles using Tailwind CSS.
  - **Dynamic Routes**: Pages for cabins, reservations, and user accounts.

- **`public/`**: Static assets like images and icons.

- **Configuration Files**:
  - `next.config.mjs`: Next.js configuration.
  - `tailwind.config.js`: Tailwind CSS setup.
  - `.eslintrc.json`: ESLint rules for code linting.

---

## Installation and Setup

### Prerequisites
- Node.js (v16+)
- Supabase project with API keys

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/Zahidul-Turja-wild-oasis-customer-side.git
   cd Zahidul-Turja-wild-oasis-customer-side
   ```
2. Install Dependencies:
  ```
  npm install
  ```
3. Setup environment variables:
   Create a file named `.env.local` and add the following variables
   ```
   NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
   NEXTAUTH_SECRET=<your-nextauth-secret>
   NEXTAUTH_URL=<your-application-url>
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
