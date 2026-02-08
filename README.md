# Skysteraunt - The Odin Project Restaurant Page


## Features
- Modular JavaScript (ES6 modules)
- Webpack for bundling assets and code
- Dynamic page content (Home, Menu, About, Contact) generated via JavaScript
- Responsive and modern CSS styling
- Images and static assets handled with Webpack

## Getting Started

### Prerequisites
- Node.js and npm installed

### Installation
1. Clone this repository:
   ```sh
   git clone <your-repo-url>
   cd restaurantPage
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

### Running Locally
Start the development server:
```sh
npx webpack serve
```
Visit [http://localhost:8080](http://localhost:8080) in your browser.

### Building for Production
```sh
npx webpack --mode production
```
The output will be in the `dist/` folder.

## Project Structure
```
restaurantPage/
├── dist/                # Production build output
├── node_modules/        # Dependencies
├── src/                 # Source files
│   ├── assets/          # Images and static assets
│   ├── home.js          # Home page module
│   ├── menu.js          # Menu page module
│   ├── contact.js       # Contact page module
│   ├── about.js         # About page module (if present)
│   ├── restoTemplate.html # HTML template
│   └── restoTemplate.css  # CSS styles
├── package.json         # Project metadata and scripts
├── webpack.config.js    # Webpack configuration
└── README.md            # Project documentation
```

## Deployment
You can deploy this project using GitHub Pages, Netlify, or any static hosting provider. See The Odin Project's deployment guide for details.

## Credits
- Part of [The Odin Project](https://www.theodinproject.com/)

---

Feel free to customize this README for your own project and add screenshots or extra instructions as needed!
