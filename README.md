# ToDoApp

## Features
- Modular JavaScript (ES modules)
- Webpack for bundling assets and code
- Static assets handled with Webpack

## Getting Started

### Prerequisites
- Node.js and npm installed

### Installation
1. Install dependencies:
   ```sh
   npm install
   ```

### Running Locally
Start the development server:
```sh
npm run start
```
Visit [http://localhost:8080](http://localhost:8080) in your browser.

### Building for Production
```sh
npm run build
```
The output will be in the `dist/` folder.

## Project Structure
```
ToDoApp/
├── dist/                # Production build output
├── node_modules/        # Dependencies
├── src/                 # Source files
│   ├── assets/          # Images and static assets
│   ├── index.html       # HTML template
│   ├── index.js         # App entry
│   ├── main.js          # Main module (app logic)
│   └── restoTemplate.css # Styles (rename when ready)
├── package.json         # Project metadata and scripts
├── webpack.common.js    # Webpack common config
├── webpack.dev.js       # Webpack dev config
├── webpack.prod.js      # Webpack prod config
└── README.md            # Project documentation
```

## Notes
- Consider renaming `restoTemplate.css` to `styles.css` when you’re ready to align naming.
