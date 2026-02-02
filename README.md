# WiseWay Admin Dashboard

A modern, beginner-friendly React Admin Dashboard with complete CRUD operations, dark/light theme switching, and localStorage persistence.

## 🚀 Features

- **Profile Management** - Edit and save profile data with modal-based editing
- **Dark/Light Mode** - Instant theme switching with smooth transitions
- **Logo Navigation** - Click logo to navigate to Dashboard
- **Products CRUD** - Add, Edit, Delete products with search functionality
- **Orders CRUD** - Manage orders with status filtering
- **Customers CRUD** - Customer management with search
- **localStorage Persistence** - All data persists across page refreshes
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Beginner-Friendly** - Extensive comments and simple patterns

## 🛠️ Technologies

- **React** - UI library
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **React Icons** - Icon library
- **localStorage** - Data persistence (No backend required)

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Vercel will auto-detect Create React App
6. Click "Deploy"

### Manual Deployment

```bash
# Build the project
npm run build

# The build folder is ready to be deployed
# Upload the contents of the build folder to any static hosting
```

## 📚 Project Structure

```
admin/
├── public/             # Static files
├── src/
│   ├── components/     # Reusable components
│   │   ├── common/     # Modal, Table, FormInput, DeleteConfirmation
│   │   ├── layout/     # Sidebar, Topbar
│   │   └── ui/         # ToggleSwitch, etc.
│   ├── context/        # ThemeContext for dark/light mode
│   ├── hooks/          # Custom hooks (useTheme)
│   ├── layouts/        # MainLayout
│   ├── pages/          # Page components
│   │   ├── Dashboard/
│   │   ├── Products/   # Products CRUD
│   │   ├── Orders/     # Orders CRUD
│   │   ├── Customers/  # Customers CRUD
│   │   ├── Profile/    # Profile management
│   │   └── Settings/
│   ├── routes/         # Route configuration
│   ├── utils/          # Helper functions (localStorageHelper)
│   ├── App.jsx         # Main app component
│   ├── index.css       # Global styles with theme variables
│   └── index.js        # Entry point
└── package.json
```

## 🎨 Features Breakdown

### 1. Profile Page

- Modal-based editing
- Save data to localStorage
- Password change functionality
- Fully responsive

### 2. Dark/Light Mode

- React Context implementation
- Instant theme switching
- Applies to all components
- Persists in localStorage

### 3. CRUD Operations

#### Products

- Add new products
- Edit existing products
- Delete with confirmation
- Search by name/category
- localStorage persistence

#### Orders

- Manage customer orders
- Filter by status (Pending, Processing, Delivered, Cancelled)
- Edit order details
- Delete orders

#### Customers

- Add/edit customer information
- Search by name/email/location
- Track total orders
- Manage customer status

## 💾 localStorage Keys

- `theme` - Current theme (light/dark)
- `profileData` - User profile information
- `products` - Products array
- `orders` - Orders array
- `customers` - Customers array

## 🎓 Beginner-Friendly

This project is designed for interns and beginners:

- **Extensive comments** explaining every section
- **Simple patterns** using only `useState` and `useEffect`
- **No complex state management** - just React hooks
- **No backend required** - everything in localStorage
- **Reusable components** with clear props documentation

## 📱 Responsive Design

The dashboard is fully responsive and works on:

- Desktop (1920px, 1440px, 1024px)
- Tablet (768px)
- Mobile (414px, 375px)

## 🔧 Customization

### Change Theme Colors

Edit `src/index.css`:

```css
:root {
  --primary-500: #3b82f6; /* Change this */
  --primary-600: #2563eb; /* And this */
  --primary-700: #1d4ed8; /* And this */
}
```

### Add New CRUD Page

1. Copy any CRUD page (Products/Orders/Customers)
2. Modify the data structure
3. Update table columns
4. Add route in `src/routes/AppRoutes.jsx`
5. Add nav item in `src/components/layout/Sidebar.jsx`

## 📄 License

MIT

## 👨‍💻 Author

Built with ❤️ for learning and portfolio projects

---

**Perfect for:**

- Internship portfolios
- Learning React
- Admin dashboard templates
- Practice projects
