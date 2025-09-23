# Eighty20 - Personal Productivity App

A productivity application that combines the Eisenhower Matrix with the 80/20 Rule (Pareto Principle) to help you identify and focus on the most impactful tasks.

## 🎯 Features

- **Eisenhower Matrix**: Organize tasks by urgency and importance
- **80/20 Analytics**: Identify which 20% of tasks drive 80% of results
- **Task Management**: Create, edit, and track tasks
- **Responsive Design**: Works on desktop and mobile devices

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Eighty20
```

2. Install dependencies:
```bash
npm install
```

3. Set up the database:
```bash
npx prisma migrate dev
npx prisma generate
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Database**: SQLite with Prisma ORM
- **UI Components**: Custom component library
- **Deployment**: Vercel (free tier)

## 📊 Database Schema

The app uses SQLite with the following main tables:

- **Tasks**: Core task information (title, description, urgency, importance, status)
- **TaskAnalytics**: Analytics data for productivity insights

## 🎨 Design System

### Color Palette
- **Quadrant 1 (Urgent & Important)**: Red - Do First
- **Quadrant 2 (Important, Not Urgent)**: Yellow - Schedule  
- **Quadrant 3 (Urgent, Not Important)**: Blue - Delegate
- **Quadrant 4 (Neither)**: Green - Eliminate

## 📱 Pages

- **Dashboard** (`/`): Main Eisenhower Matrix view
- **Tasks** (`/tasks`): Task management interface
- **Analytics** (`/analytics`): Productivity insights (coming soon)

## 🔧 Development

### Project Structure
```
src/
├── app/                    # Next.js app directory
├── components/
│   ├── ui/               # Basic UI components
│   ├── matrix/           # Eisenhower Matrix components
│   ├── tasks/            # Task management components
│   └── analytics/        # Analytics components
├── lib/                   # Utility functions
└── types/                 # TypeScript types
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🚀 Deployment

The app is designed to deploy easily to Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

## 📈 Roadmap

### Stage 1 (Current): Core Implementation
- ✅ Basic Eisenhower Matrix
- ✅ Task management
- ✅ SQLite database
- ✅ Responsive design

### Stage 2: Advanced Features
- [ ] 80/20 analytics dashboard
- [ ] Task reporting
- [ ] Export functionality
- [ ] Calendar integration

### Stage 3: Enterprise Features
- [ ] Cloud sync
- [ ] Mobile app
- [ ] AI-powered insights
- [ ] Team collaboration

## 🤝 Contributing

This is a personal productivity app, but contributions are welcome! Please feel free to submit issues and enhancement requests.

## 📄 License

This project is for personal use. Feel free to use and modify for your own productivity needs.

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS. Following the 80/20 principle to focus on what matters most.