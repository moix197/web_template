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

2. **Environment Configuration**

Create a `.env.local` file in the root directory with the following variables:

```env
# Database Configuration
DB_NAME=your_database_name
DB_CONN_STRING=your_mongodb_connection_string

# Google Authentication
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# File System
UPLOADS_ROOT_PATH=path_to_your_uploads_directory
```

Required environment variables:

- `DB_NAME`: Name of your MongoDB database
- `DB_CONN_STRING`: MongoDB connection string (e.g., `mongodb://localhost:27017`)
- `GOOGLE_CLIENT_ID`: Google OAuth client ID for authentication
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret for authentication
- `UPLOADS_ROOT_PATH`: Absolute path to the directory where uploaded files will be stored

Note: For Google Authentication to work, you need to:

1. Create a project in the Google Cloud Console
2. Enable the Google OAuth API
3. Create OAuth 2.0 credentials
4. Add your application's domain to the authorized domains
5. Configure the authorized redirect URIs (e.g., `http://localhost:3000/api/auth/callback/google` for development)

6. **Development**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. **Build**

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

We welcome contributions to this project! Here are some guidelines:

1. **Adding New Features**

   - New features should typically be added as separate packages in the `packages` directory
   - This maintains the modular architecture and makes features reusable
   - Follow the existing package structure and patterns

2. **Development Process**

   - Fork the repository
   - Create a feature branch
   - Add your new package or modify existing ones
   - Ensure all tests pass
   - Submit a pull request

3. **Code Style**
   - Follow the existing code style
   - Use TypeScript for type safety
   - Add proper documentation
   - Include tests for new features

## Deployment

This template is production-ready and can be deployed to any platform that supports Next.js applications. The recommended deployment platform is Vercel, as it provides the best integration with Next.js.

### Deployment Steps

1. **Prepare Your Environment**

   - Set up all required environment variables in your deployment platform
   - Ensure your database is accessible from the deployment environment
   - Configure Google OAuth credentials for production

2. **Build and Deploy**

   - The template includes all necessary build configurations
   - No additional setup is required for deployment
   - The build process will automatically handle all dependencies

3. **Post-Deployment**
   - Verify all environment variables are correctly set
   - Test authentication flow
   - Check file upload functionality
   - Monitor database connections

## License

MIT License
