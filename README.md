# Base Template Monorepo

> ⚠️ **Work in Progress**: This is an ongoing development project and is not yet a finished product. Features and documentation are being actively developed and may change.

A modular Next.js-based monorepo template with reusable packages for building web applications.

## Project Structure

//pretier-ignore
├── apps/
│ └── base-app/ # Main Next.js application
└── packages/
│ ├── base-dashboard/ # Dashboard functionality
│ ├── base-ui/ # Core UI components
│ ├── book/ # Book/documentation system
│ ├── cubone_explorer/ # File management system
│ ├── db/ # Database utilities
│ ├── filex_explorer/ # Alternative file management system
│ ├── forms/ # Form components and utilities
│ ├── next-ui/ # Next.js specific UI components
│ ├── notifications/ # Notification system
│ ├── scroll-animation/ # Scroll-based animations
│ ├── text_editor/ # Rich text editor package
│ ├── validation/ # Form validation utilities
│ └── web_auth/ # Authentication package

## Features

- 🏗️ **Monorepo Structure**: Using Turborepo for efficient package management
- 🎨 **UI Components**: Reusable components built with Tailwind CSS and Flowbite
- 📝 **Forms**: Flexible form system with validation
- 🗄️ **File Management**: Built-in file explorer with upload capabilities
- 🔐 **Authentication**: User authentication system
- 📊 **Dashboard**: Configurable dashboard system
- 📱 **Responsive Design**: Mobile-first approach
- 🌗 **Dark Mode**: Built-in dark mode support

## Data-Driven Architecture

This template was built with modularity as a core principle from the ground up. The entire system is designed to be data-driven, making it incredibly flexible and easy to customize.

### The Power of Data-Driven Design

The dashboard and all its components are automatically generated based on data structures defined in the `./src/data` directory. This means:

- 🎯 **Zero Code Changes**: You don't need to write any code to add new features
- 📊 **Automatic UI Generation**: The system automatically creates:
  - Database tables and operations
  - Menu items and navigation
  - Forms for data input and editing
  - List views and detail pages
  - Search and filter functionality
  - CRUD operations

### How It Works

1. Define your data structure in `./src/data`
2. The system automatically:
   - Creates necessary database tables
   - Generates API endpoints
   - Builds UI components
   - Sets up form validation
   - Implements data operations

### Example

```typescript
// ./src/data/products.ts
export const products = {
	name: "products",
	fields: {
		name: { type: "string", required: true },
		price: { type: "number", required: true },
		description: { type: "text" },
		category: { type: "select", options: ["Electronics", "Clothing", "Books"] },
	},
};
```

This simple definition automatically creates:

- A products table in the database
- A products section in the dashboard
- Create/Edit forms with validation
- List view with sorting and filtering
- API endpoints for all operations

### Benefits

- 🚀 **Rapid Development**: Add new features in minutes, not days
- 🔄 **Consistent UI**: All generated components follow the same design patterns
- 🛠️ **Maintainable**: Changes to the data structure automatically propagate through the system
- 📱 **Responsive**: All generated components are mobile-friendly
- 🔒 **Secure**: Built-in validation and security measures

## Getting Started

1. **Installation**

```bash
npm install
```

2. **Development**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

3. **Build**

```bash
npm run build
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Package Configuration

### Base App

The main Next.js application that ties all packages together. Configure your app by:

- Setting up environment variables
- Configuring dashboard items
- Customizing themes

### Packages

#### base-dashboard

Configurable dashboard system:

- Custom layouts
- Data management
- Navigation

#### base-ui

Core UI components including:

- Buttons
- Navigation
- Tables
- Layout components

#### book

Documentation and book system:

- Markdown support
- Table of contents
- Search functionality

#### cubone_explorer

File management system:

- File upload/download
- Directory navigation
- File preview

#### db

Database utilities:

- Connection management
- Query builders
- Migration tools

#### filex_explorer

Alternative file management system:

- Advanced file operations
- Custom file types
- Extended preview capabilities

#### forms

Form handling with:

- Input components
- Validation
- Multi-step forms
- File uploads

#### next-ui

Next.js specific UI components:

- Server components
- Client components
- Next.js specific hooks

#### notifications

Notification system:

- Toast messages
- Alert components
- Notification center

#### scroll-animation

Scroll-based animations:

- Scroll triggers
- Animation presets
- Performance optimized

#### text_editor

Rich text editor package:

- WYSIWYG editing
- Markdown support
- Custom plugins

#### validation

Form validation utilities:

- Schema validation
- Custom validators
- Error handling

#### web_auth

Authentication system:

- User management
- Role-based access
- Session handling

## Development

### Adding New Features

1. Create a new package in the `packages` directory
2. Add it to the workspace in root `package.json`
3. Import and use in the base app

### Styling

- Uses Tailwind CSS
- Configure theme in `tailwind.config.ts`
- Follows design system conventions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## License

[Your chosen license]
