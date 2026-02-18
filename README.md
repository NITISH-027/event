# College Event Bridge

A secure, mobile-centric event management platform designed to centralize event discovery and enable structured publishing, browsing, and engagement across educational institutions.

## 🚀 Quick Start - View the Site Now!

**Want to see the site immediately?** Just run these commands:

```bash
npm install      # Install dependencies (1-2 minutes)
npm run dev      # Start the development server
```

Then open **http://localhost:3000** in your browser! 

👉 **For detailed instructions, see [HOW_TO_VIEW.md](HOW_TO_VIEW.md)**

> **Note:** You can view the site and UI without any additional setup. Full functionality (login, creating events, etc.) requires Supabase configuration - see [Getting Started](#getting-started) below.

## 🌐 Deploy to Vercel

**Ready to deploy your app?** 

👉 **[Follow the Vercel Deployment Guide](VERCEL_DEPLOYMENT.md)** - Complete step-by-step instructions to deploy in 5 minutes!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/NITISH-027/event&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY,NEXT_PUBLIC_APP_NAME&envDescription=Supabase%20credentials%20required%20for%20authentication%20and%20database&envLink=https://github.com/NITISH-027/event/blob/main/VERCEL_DEPLOYMENT.md)

---

## Abstract

Communication of campus events in educational institutions remains largely fragmented and inefficient due to reliance on notice boards, messaging groups, and unstructured social media dissemination. College Event Bridge addresses these challenges by providing:

- **Authenticated Access Control**: Database-level row security policies ensure data integrity
- **Mobile-First Design**: Responsive interface optimized for mobile devices
- **Event Management**: Create, browse, and manage campus events with structured information
- **Real-time Interaction**: Comment system for event engagement
- **Secure Media Storage**: Controlled image uploads with public read access
- **Cross-Institution Discovery**: Search and filter events across multiple institutions

## Technology Stack

- **Frontend**: Next.js 16 with TypeScript and Tailwind CSS
- **Backend**: Supabase (PostgreSQL with Row-Level Security)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage for event images
- **PWA**: Progressive Web Application support

## Features

### Core Features

1. **Authentication System**
   - User registration with email and password
   - Secure login with session management
   - Profile management

2. **Event Management**
   - Create events with title, description, date, time, location, and category
   - Upload event images
   - Edit and delete owned events
   - Browse and search events
   - Filter by category and institution

3. **Interaction System**
   - Comment on events
   - View event organizer information
   - Real-time comment updates

4. **Security Model**
   - Row-Level Security (RLS) policies
   - Ownership-based authorization (`auth.uid() = created_by`)
   - Protected routes for authenticated users
   - Secure image storage

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/NITISH-027/event.git
cd event
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Set up the database:

Follow the instructions in `DATABASE_SCHEMA.md` to create the necessary tables and security policies in your Supabase project.

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Database Schema

The application uses three main tables:

1. **profiles** - User metadata and institutional information
2. **events** - Event details with foreign key to creator
3. **comments** - User comments on events

See `DATABASE_SCHEMA.md` for complete schema definition and RLS policies.

## Security Implementation

The application implements a multi-layered security approach:

1. **Authentication Layer**: Only authenticated users can create events and comments
2. **Authorization Layer**: Database policies enforce `auth.uid() = created_by`
3. **Storage Security**: Image uploads restricted to authenticated users
4. **Route Protection**: Restricted pages require valid sessions

## Mobile Application

The platform is designed as a Progressive Web Application (PWA) and can be:

- Installed on mobile devices as a standalone app
- Packaged as an Android APK for demonstration purposes
- Accessed via web browser on any device

**Note:** For PWA functionality, you may want to add custom icon files:
- `/public/icon-192.png` (192x192px)
- `/public/icon-512.png` (512x512px)

These icons are referenced in `/public/manifest.json` for the installable app experience.

## Event Lifecycle Workflow

1. User authentication
2. Event form submission with client-side validation
3. Image upload to secure storage (if provided)
4. Database insertion with ownership identifier
5. Real-time dashboard update
6. Event browsing and interaction

## Performance and Scalability

- Cloud-hosted backend supports concurrent user requests
- Horizontal scalability through Supabase infrastructure
- Efficient indexing for fast queries
- Low latency response times
- Optimized for moderate concurrent access

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

For questions or support, please open an issue on GitHub.

## Acknowledgments

This project was developed to address the fragmented communication challenges in educational institutions and demonstrate modern cloud-native technologies for campus event management.
