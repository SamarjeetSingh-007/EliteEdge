# EliteEdge Admin Panel - User Guide

## 🔐 Access Information
- **Admin Page**: `admin.html` or `yourdomain.com/admin`
- **Username**: `samarjeet`
- **Password**: `PASSword@3419`

## 🌐 URL Access Options

### When Hosted on Your Domain:
- **Primary**: `https://yourdomain.com/admin.html`
- **Clean URL**: `https://yourdomain.com/admin/` (redirects to admin.html)
- **Direct**: `https://yourdomain.com/admin`

### For GitHub Pages:
- **GitHub URL**: `https://yourusername.github.io/EliteEdge/admin.html`
- **With Custom Domain**: `https://yourdomain.com/admin.html`

## 📁 File Structure for Hosting
```
/EliteEdge/
├── index.html              # Main website
├── admin.html             # Admin panel (main file)
├── admin-styles.css       # Admin styling
├── admin-script.js        # Admin functionality
├── admin.htm              # Redirect helper
├── admin/
│   └── index.html         # Clean URL redirect
├── styles.css             # Main site styles
├── script.js              # Main site scripts
└── assets/                # Images and assets
```

## 🚀 GitHub Pages Setup

### 1. Upload to GitHub:
```bash
git add .
git commit -m "Add admin panel"
git push origin main
```

### 2. Enable GitHub Pages:
- Go to repository Settings
- Scroll to Pages section
- Source: Deploy from branch `main`
- Folder: `/ (root)`

### 3. Custom Domain (Optional):
- Add your domain in Pages settings
- Create CNAME file with your domain name

## 🔒 Security Recommendations

### For Production:
1. **Change Admin Path**: Rename `admin.html` to something unique like `manage-projects-xyz.html`
2. **Use HTTPS**: Always access via secure connection
3. **Regular Backups**: Export your projects data regularly
4. **Monitor Access**: Check for unauthorized login attempts

### Example Secure Setup:
```
# Rename files for security
admin.html → secret-manage-2024.html
admin/ → private-panel/
```

### Project Management
- Add new projects with images, descriptions, and links
- Upload project screenshots
- Categorize projects (Web Dev, Mobile App, AI/ML, etc.)
- Add technology tags
- Include live demo and GitHub links
- Delete existing projects

### Real-time Updates
- Projects automatically appear on the main website
- Changes are instantly reflected without page refresh
- Local storage persistence

## 📋 How to Add a Project

1. **Access Admin Panel**
   - Open `admin.html` in your browser
   - Login with credentials above

2. **Fill Project Details**
   - **Title**: Clear, descriptive project name
   - **Category**: Select appropriate category
   - **Description**: Detailed project overview
   - **Technologies**: Comma-separated list (e.g., "React, Node.js, MongoDB")
   - **Project Link**: Live demo URL (optional)
   - **GitHub Link**: Repository URL (optional)
   - **Image**: Upload project screenshot or preview

3. **Submit**
   - Click "Add Project"
   - Project will appear in the list below
   - Check main website to see it live

## 💡 Tips for Best Results

### Images
- Use high-quality screenshots (recommended: 800x600px or similar ratio)
- Show the actual project interface
- Keep file size reasonable (<2MB)
- Supported formats: JPG, PNG, GIF

### Descriptions
- Keep it concise but informative
- Highlight key features and technologies
- Mention any special achievements or challenges

### Technologies
- Use commonly recognized names
- Separate with commas
- Examples: "React, TypeScript, Firebase, Tailwind CSS"

### Links
- Always test links before submitting
- Use full URLs (https://...)
- GitHub links should point to the main repository

## 🔧 Technical Details

### Storage
- Projects are stored in browser's localStorage
- Data persists between sessions
- Automatic sync with main website

### File Structure
```
/EliteEdge/
├── admin.html          # Admin panel interface
├── admin-styles.css    # Admin panel styling
├── admin-script.js     # Admin panel functionality
├── index.html          # Main website
├── styles.css          # Main website styles
└── script.js           # Main website scripts
```

### Security Notes
- Admin credentials are stored client-side (for demo purposes)
- In production, implement proper server-side authentication
- Consider adding HTTPS and secure session management

## 🚨 Troubleshooting

### Login Issues
- Check username/password exactly as shown above
- Clear browser cache if needed
- Ensure JavaScript is enabled

### Images Not Loading
- Check file size (<2MB recommended)
- Use supported formats (JPG, PNG, GIF)
- Try different image if upload fails

### Projects Not Appearing
- Refresh main website page
- Check browser console for errors
- Ensure localStorage is enabled

## 📱 Mobile Compatibility
- Admin panel is fully responsive
- Works on tablets and smartphones
- Touch-friendly interface

## 🔄 Data Management

### Backup Projects
Projects are stored in localStorage key: `website_projects`
To backup, copy this data from browser's developer tools.

### Clear All Data
To reset all projects:
1. Open browser developer tools (F12)
2. Go to Application/Storage tab
3. Clear localStorage for this domain

---

**Happy project managing! 🎉**

For any issues or questions, contact: Samarjeetsingh3419@gmail.com
