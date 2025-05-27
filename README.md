# Red Bird Racing Website

## Overview
The official website for Red Bird Racing (EVRT), HKUST's Formula Student racing team. This website showcases our team's journey, achievements, and commitment to engineering excellence through competitive motorsport.

## Features
- Responsive design optimized for all devices
- Dynamic content loading with vanilla JavaScript
- Modern CSS architecture with CSS variables and utility classes
- Image gallery with modal viewer and keyboard navigation
- Blog/news system with category filtering
- Team member showcase
- Partner/sponsor showcase with tier system
- Timeline visualization of team history

## Technology Stack
- HTML5
- CSS3 (with custom properties/variables)
- Vanilla JavaScript (ES6+)
- No build process required - pure frontend implementation

## Project Structure
rbr-evmt-web\
├── assets/ # Static assets (images, videos, fonts)\
├── styles\
│   ├── base/ # Base styles, variables, typography\
│   ├── components/ # Component-specific styles\
│   └── pages/ # Page-specific styles\
├── scripts/\
│   ├── components/ # Reusable component classes\
│   ├── pages/ # Page-specific JavaScript\
│   ├── data/ # JSON data files\
│   └── utils/ # Utility functions\
└── pages/ # HTML pages\

## Key Components
1. **Hero Section**: Dynamic hero sections with customizable content per page
2. **Navigation**: Responsive navigation with mobile menu support
3. **Gallery**: Filterable image gallery with modal viewer
4. **Timeline**: Interactive timeline showing team history
5. **Team Cards**: Showcase of team members and departments
6. **Partner Display**: Tiered display of sponsors and partners

## Setup and Development
1. Clone the repository
```bash
git clone [repository-url]
```

2. No build process required - open `index.html` in a browser

3. For development:
   - Use a local server (e.g., Live Server VS Code extension)
   - All components are modular and follow OOP principles
   - Styles use CSS custom properties for theming

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design works on mobile devices
- Progressive enhancement approach

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## File References
- Project structure: 
markdown:README.md
startLine: 7
endLine: 12
- CSS architecture:
css:styles/base/variables.css
startLine: 1
endLine: 76
- Component example:
javascript:scripts/components/hero.js
startLine: 1
endLine: 56

## License
This project is proprietary to Red Bird Racing (EVRT) - HKUST.

## Contact
- Email: redbirdracinghkustevrt@gmail.com
- Instagram: @red.bird.racing_hkust
- Facebook: HKUST Red Bird Racing EVRT

## Content Management
All website content is managed through JSON data files for easy updates without touching the core code.

### Updating Content
Key content files are located in `scripts/data/`:

1. **Hero Content** (`hero.json`):
```javascript
{
    "home": {
        "title": "Your Title Here",
        "description": "Your description text",
        "button": {
            "text": "Button Text",
            "link": "/target-page.html"
        }
    }
    // Add more pages as needed
}
```

2. **Team Members** (`teams.json`):
```javascript
{
    "teams": [
        {
            "name": "Team Name",
            "description": "Team description",
            "image": "../assets/images/team/team-image.jpg"
        }
        // Add more teams
    ]
}
```

3. **Partners** (`partners.json`):
```javascript
{
    "partners": [
        {
            "name": "Partner Name",
            "tier": "Platinum|Gold|Silver|Bronze",
            "logo": "/assets/images/partners/logo.png",
            "website": "https://partner-website.com"
        }
        // Add more partners
    ]
}
```

4. **Timeline** (`timeline.json`):
```javascript
{
    "milestones": [
        {
            "year": "2023",
            "title": "Milestone Title",
            "description": "Milestone description"
        }
        // Add more milestones
    ]
}
```

5. **Blog Posts** (`blog-posts.json`):
```javascript
{
    "posts": [
        {
            "category": "Category Name",
            "title": "Post Title",
            "description": "Post description",
            "date": "DD MMM YYYY",
            "readTime": "X min read",
            "image": "/path/to/image.jpg",
            "content": "Full post content with HTML support"
        }
        // Add more posts
    ]
}
```

### Adding Images
1. Place new images in the appropriate subfolder within `assets/images/`
2. Recommended image specifications:
   - Hero images: 1920x1080px
   - Team photos: 800x600px
   - Partner logos: 400x400px
   - Blog images: 1200x800px
   - Gallery images: 1200x1200px
   - File formats: .jpg, .png
   - Max file size: 500KB (use compression if needed)

### HTML Page Structure
Each page follows this basic structure:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Standard meta tags and CSS -->
</head>
<body>
    <header class="header" id="header-section"></header>
    <main>
        <section class="hero" id="hero-section"></section>
        <!-- Page-specific sections -->
    </main>
    <footer class="footer" id="footer-section"></footer>
    <!-- Required scripts -->
</body>
</html>
```

### Style Customization
Global styles can be modified in `styles/base/variables.css`:
```css
:root {
    /* Colors */
    --color-primary-800: #your-color-code;
    
    /* Typography */
    --font-size-base: 16px;
    
    /* Spacing */
    --spacing-md: 1rem;
    
    /* Add more custom properties as needed */
}
```

### Best Practices
1. Always compress images before adding them to the project
2. Maintain consistent naming conventions for files and classes
3. Test all changes across different devices and browsers
4. Keep content updates in the JSON files only
5. Back up data files before making major changes