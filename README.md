# Premier Real Estate Website

A modern, fully responsive static website for a real estate company built with HTML, CSS, and JavaScript, featuring Netlify CMS for content management. This website showcases professional real estate services with a sleek, modern design and smooth user experience.

## 🌟 Features

### Design & Layout
- **Modern Minimal Design**: Clean white background with dark gray text and blue accent color
- **Fully Responsive**: Optimized for all screen sizes (desktop, tablet, mobile)
- **Sticky Header**: Navigation that stays at the top with smooth background transitions
- **Professional Typography**: Using Inter font family for excellent readability

### Sections
1. **Home**: Hero banner with animated headline text and call-to-action buttons
2. **About Us**: Company history, mission, values, and team members with fade-in animations
3. **Our Services**: Grid layout with 6 service cards featuring icons and descriptions
4. **Media**: Dynamic gallery with photos and videos loaded from CMS
5. **Contact Us**: Contact form, address, phone, email, social media links, and map placeholder

### Interactive Features
- **Smooth Scroll Navigation**: Seamless scrolling between sections
- **Scroll Animations**: Elements animate in as they come into view
- **Lightbox Gallery**: Click images to view them in a modal overlay
- **Tab System**: Switch between photos and videos in the media section
- **Contact Form**: Fully functional with validation and success notifications
- **Mobile Menu**: Hamburger menu for mobile devices
- **Loading Animation**: Professional loading screen on page load

### CMS Integration
- **Netlify CMS**: Browser-based content management system
- **Dynamic Content**: Media posts loaded from markdown files
- **Admin Panel**: Non-technical users can manage content at `/admin`
- **Git-based**: All content stored in Git repository
- **Auto-deploy**: Site rebuilds automatically when content is published

### Performance & UX
- **Loading Animation**: Spinner with fade-out transition
- **Hover Effects**: Subtle animations on buttons, cards, and interactive elements
- **Form Validation**: Real-time validation with error messages
- **Notification System**: Success/error messages for form submissions
- **Keyboard Navigation**: ESC key closes modals and mobile menu
- **Optimized Performance**: Throttled scroll events and lazy loading

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Git for version control
- Netlify account for deployment (optional)

### Installation
1. Download or clone the project files
2. Open `index.html` in your web browser
3. The website will load with a loading animation and then display the full site

### File Structure
```
premier-real-estate/
├── index.html              # Main HTML file
├── css/
│   └── styles.css          # All CSS styles and animations
├── js/
│   └── scripts.js          # JavaScript functionality
├── admin/
│   ├── index.html          # Netlify CMS admin interface
│   └── config.yml          # CMS configuration
├── _posts/                 # Markdown files for media posts
├── images/                 # Image uploads (created by CMS)
├── videos/                 # Video files
├── netlify.toml           # Netlify configuration
├── package.json           # Project dependencies
└── README.md              # This documentation
```

## 🎨 Customization

### Colors
The website uses a minimal color palette:
- **Primary Blue**: `#2563eb` (buttons, accents, links)
- **Dark Gray**: `#1f2937` (headings)
- **Medium Gray**: `#6b7280` (body text)
- **Light Gray**: `#f8fafc` (backgrounds)
- **White**: `#ffffff` (main background)

### Content Management
To manage content through the CMS:
1. Deploy the site to Netlify
2. Enable Netlify Identity
3. Access the admin panel at `yourdomain.com/admin`
4. Create and edit media posts through the browser interface

### Styling
To change the design:
1. Modify colors in `css/styles.css`
2. Adjust spacing and typography
3. Update animations and transitions
4. Customize responsive breakpoints

## 📱 Responsive Design

The website is fully responsive with breakpoints at:
- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

### Mobile Features
- Hamburger menu navigation
- Optimized touch targets
- Simplified layouts for small screens
- Touch-friendly interactions

## 🔧 Technical Details

### CSS Features
- **CSS Grid & Flexbox**: Modern layout techniques
- **CSS Custom Properties**: For consistent theming
- **CSS Animations**: Smooth transitions and keyframes
- **Backdrop Filter**: Glassmorphism effects
- **CSS Transforms**: 3D transforms and scaling

### JavaScript Features
- **Intersection Observer API**: For scroll animations
- **Event Delegation**: Efficient event handling
- **Form Validation**: Real-time input validation
- **Throttling**: Performance optimization for scroll events
- **Modular Functions**: Clean, maintainable code
- **Dynamic Content Loading**: CMS integration

### Performance Optimizations
- **Lazy Loading**: Images load as needed
- **Throttled Events**: Smooth scrolling performance
- **Minimal Dependencies**: No external libraries
- **Optimized Animations**: Hardware-accelerated transforms

## 🎯 Browser Support

- **Chrome**: 60+
- **Firefox**: 55+
- **Safari**: 12+
- **Edge**: 79+

## 📝 Usage Examples

### Adding a New Service
```html
<div class="service-card slide-in">
    <div class="service-icon">
        <i class="fas fa-chart-bar"></i>
    </div>
    <h3>Market Analysis</h3>
    <p>Comprehensive market research and property valuation.</p>
</div>
```

### Creating a Media Post via CMS
1. Go to `yourdomain.com/admin`
2. Click "New Media Post"
3. Fill in title, description, and select type (photo/video)
4. Upload image or paste YouTube URL
5. Click "Publish"

## 🚀 Deployment

### Netlify Deployment
1. Push your code to a GitHub repository
2. Connect the repository to Netlify
3. Configure build settings:
   - Build command: (leave empty)
   - Publish directory: `.`
4. Enable Netlify Identity for admin access
5. Deploy the site

### Local Development
1. Clone the repository
2. Install dependencies: `npm install`
3. Start local server: `npm start`
4. Access the site at `http://localhost:8000`
5. For CMS development: `npm run dev`

### CMS Setup
1. Enable Netlify Identity in your Netlify dashboard
2. Configure registration settings
3. Invite users to the admin panel
4. Access CMS at `yourdomain.com/admin`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Support

For questions or support, please contact:
- Email: info@premierrealestate.com
- Phone: (555) 123-4567

---

**Built with ❤️ for modern real estate professionals** 