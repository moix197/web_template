# Base Template Monorepo

A modular Next.js-based monorepo template with reusable packages for building web applications.

## Project Structure

//pretier-ignore
├── apps/
│ └── base-app/ # Main Next.js application
└── packages/
│ ├── auth/ # Authentication package
│ ├── base-ui/ # Core UI components
│ ├── dashboard/ # Dashboard functionality
│ ├── db/ # Database utilities
│ ├── file_explorer/ # File management system
│ ├── forms/ # Form components and utilities
│ ├── notifications/ # Notification system
│ └── text-editor/ # Rich text editor package

## Features

- 🏗️ **Monorepo Structure**: Using Turborepo for efficient package management
- 🎨 **UI Components**: Reusable components built with Tailwind CSS and Flowbite
- 📝 **Forms**: Flexible form system with validation
- 🗄️ **File Management**: Built-in file explorer with upload capabilities
- 🔐 **Authentication**: User authentication system
- 📊 **Dashboard**: Configurable dashboard system
- 📱 **Responsive Design**: Mobile-first approach
- 🌗 **Dark Mode**: Built-in dark mode support

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

#### base-ui

Core UI components including:

- Buttons
- Navigation
- Tables
- Layout components

#### forms

Form handling with:

- Input components
- Validation
- Multi-step forms
- File uploads

#### dashboard

Configurable dashboard system:

- Custom layouts
- Data management
- Navigation

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
