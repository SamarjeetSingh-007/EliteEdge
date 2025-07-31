// FIREBASE PROJECT SYNC - runs as soon as script loads
(function() {
    console.log('🚀 FIREBASE: Script loaded, syncing projects...');
    
    // Wait for Firebase to be ready
    window.addEventListener('load', async () => {
        if (typeof FirebaseDB !== 'undefined') {
            console.log('🔥 Firebase is ready, loading projects...');
            try {
                const firebaseProjects = await FirebaseDB.loadProjects();
                
                if (firebaseProjects.length > 0) {
                    console.log('✅ FIREBASE SYNC: Loaded', firebaseProjects.length, 'projects from Firebase');
                    
                    // Convert Firebase projects to website format
                    const syncedProjects = firebaseProjects.map(project => ({
                        id: project.id,
                        title: project.title,
                        description: project.description,
                        image: project.image,
                        projectLink: project.projectLink,
                        githubLink: project.githubLink,
                        technologies: Array.isArray(project.technologies) ? project.technologies : 
                                    (project.technologies ? project.technologies.split(',').map(t => t.trim()) : []),
                        category: project.category
                    }));
                    
                    // Store in localStorage as backup
                    localStorage.setItem('website_projects', JSON.stringify(syncedProjects));
                    
                    // Load projects immediately
                    if (typeof loadDynamicProjects === 'function') {
                        loadDynamicProjects();
                    }
                } else {
                    console.log('📝 No projects found in Firebase');
                }
            } catch (error) {
                console.error('❌ Firebase sync error:', error);
                // Fallback to localStorage
                console.log('🔄 Falling back to localStorage...');
                const adminProjects = JSON.parse(localStorage.getItem('eliteedge_projects') || '[]');
                if (adminProjects.length > 0) {
                    const syncedProjects = adminProjects.map(project => ({
                        title: project.title,
                        description: project.description,
                        image: project.image,
                        projectLink: project.projectLink,
                        githubLink: project.githubLink,
                        technologies: project.technologies ? project.technologies.split(',').map(t => t.trim()) : [],
                        category: project.category
                    }));
                    
                    localStorage.setItem('website_projects', JSON.stringify(syncedProjects));
                    console.log('✅ FALLBACK SYNC: Projects synced from localStorage!');
                }
            }
        } else {
            console.log('⚠️ Firebase not available, using localStorage fallback...');
            // Original localStorage sync logic
            const adminProjects = JSON.parse(localStorage.getItem('eliteedge_projects') || '[]');
            console.log('📦 Found admin projects:', adminProjects.length);
            
            if (adminProjects.length > 0) {
                const syncedProjects = adminProjects.map(project => ({
                    title: project.title,
                    description: project.description,
                    image: project.image,
                    projectLink: project.projectLink,
                    githubLink: project.githubLink,
                    technologies: project.technologies ? project.technologies.split(',').map(t => t.trim()) : [],
                    category: project.category
                }));
                
                localStorage.setItem('website_projects', JSON.stringify(syncedProjects));
                console.log('✅ FALLBACK SYNC: Projects synced from localStorage!');
            }
        }
    });
})();

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Enhanced Modern JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animate tech cards on hover
    const techCards = document.querySelectorAll('.tech-card');
    techCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.1) rotate(2deg)';
            
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(99, 102, 241, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                width: 20px;
                height: 20px;
                top: 50%;
                left: 50%;
                margin-left: -10px;
                margin-top: -10px;
            `;
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });

        card.addEventListener('click', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = '';
            }, 10);
            
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Enhanced button interactions
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });

        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.stat-card, .tech-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// Add ripple animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 1rem;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Add close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
    `;
    
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Load dynamic projects from Firebase or admin panel
async function loadDynamicProjects() {
    console.log('🔍 Starting loadDynamicProjects function');
    
    // Wait for DOM elements if they're not ready yet
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid) {
        console.log('⏳ DOM not ready yet, retrying in 100ms...');
        setTimeout(loadDynamicProjects, 100);
        return;
    }
    
    let projects = [];
    
    // Try Firebase first
    if (typeof FirebaseDB !== 'undefined') {
        try {
            console.log('🔥 Loading projects from Firebase...');
            const firebaseProjects = await FirebaseDB.loadProjects();
            
            if (firebaseProjects.length > 0) {
                projects = firebaseProjects.map(project => ({
                    id: project.id,
                    title: project.title,
                    description: project.description,
                    image: project.image,
                    projectLink: project.projectLink,
                    githubLink: project.githubLink,
                    technologies: Array.isArray(project.technologies) ? project.technologies : 
                                (project.technologies ? project.technologies.split(',').map(t => t.trim()) : []),
                    category: project.category
                }));
                
                console.log('✅ Loaded', projects.length, 'projects from Firebase');
                localStorage.setItem('website_projects', JSON.stringify(projects));
            }
        } catch (error) {
            console.error('❌ Firebase error:', error);
            console.log('🔄 Falling back to localStorage...');
        }
    }
    
    // Fallback to localStorage if Firebase failed or not available
    if (projects.length === 0) {
        console.log('📦 Loading from localStorage...');
        const adminProjects = JSON.parse(localStorage.getItem('eliteedge_projects') || '[]');
        let websiteProjects = JSON.parse(localStorage.getItem('website_projects') || '[]');
        
        if (adminProjects.length > 0 && websiteProjects.length === 0) {
            projects = adminProjects.map(project => ({
                title: project.title,
                description: project.description,
                image: project.image,
                projectLink: project.projectLink,
                githubLink: project.githubLink,
                technologies: project.technologies ? project.technologies.split(',').map(t => t.trim()) : [],
                category: project.category
            }));
            
            localStorage.setItem('website_projects', JSON.stringify(projects));
            console.log('✅ Projects synced from localStorage!');
        } else {
            projects = websiteProjects;
        }
    }
    
    console.log('📦 Final projects to display:', projects);
    console.log('📊 Number of projects:', projects.length);
    
    const noProjectsMessage = document.getElementById('noProjectsMessage');
    
    if (projects.length === 0) {
        console.log('📝 No projects found, showing placeholder message');
        if (noProjectsMessage) {
            noProjectsMessage.style.display = 'block';
        } else {
            projectsGrid.innerHTML = `
                <div class="text-center w-100" style="grid-column: 1 / -1;">
                    <div class="placeholder-content">
                        <i class="fas fa-folder-open fa-3x mb-3 text-muted"></i>
                        <h4 class="text-muted">Projects Coming Soon</h4>
                        <p class="text-muted">Check back later for our latest work</p>
                    </div>
                </div>
            `;
        }
        return;
    }
    
    console.log('✅ Projects found! Building HTML...');
    if (noProjectsMessage) noProjectsMessage.style.display = 'none';
    
    const projectsHTML = projects.map((project, index) => {
        console.log(`🎨 Processing project ${index + 1}:`, project.title);
        return `
        <div class="project-card" data-category="${project.category || 'WEB DEVELOPMENT'}">
            <div class="project-image" style="background-image: url('${project.image}');">
                <div class="project-overlay">
                    <div class="project-links">
                        ${project.projectLink ? `<a href="${project.projectLink}" target="_blank" class="project-link" title="View Live"><i class="fas fa-external-link-alt"></i></a>` : ''}
                        ${project.githubLink ? `<a href="${project.githubLink}" target="_blank" class="project-link" title="View Code"><i class="fab fa-github"></i></a>` : ''}
                    </div>
                </div>
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tech">
                    ${project.technologies && Array.isArray(project.technologies) ? 
                        project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('') : 
                        project.technologies ? project.technologies.split(',').map(tech => 
                            `<span class="tech-tag">${tech.trim()}</span>`
                        ).join('') : ''
                    }
                </div>
            </div>
        </div>
    `;
    }).join('');
    
    console.log('🖼️ Generated HTML length:', projectsHTML.length);
    projectsGrid.innerHTML = projectsHTML;
    console.log('✅ Projects HTML inserted into DOM');
    
    // Add animation to project cards
    const projectCards = document.querySelectorAll('.project-card');
    console.log('🎬 Adding animations to', projectCards.length, 'project cards');
    
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.03)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    console.log('🎉 Project loading completed successfully!');
    
    // Set up real-time listener for future updates
    if (typeof FirebaseDB !== 'undefined' && !window.firebaseListenerSet) {
        console.log('🔥 Setting up Firebase real-time listener...');
        FirebaseDB.onProjectsUpdate((updatedProjects) => {
            console.log('🔄 Real-time update received:', updatedProjects.length, 'projects');
            // Reload projects when Firebase data changes
            loadDynamicProjects();
        });
        window.firebaseListenerSet = true;
    }
}

// Load projects on page load and DOM ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM Content Loaded - auto-loading projects');
    
    // Run auto-load with delays
    setTimeout(() => {
        console.log('📝 Auto-load attempt (500ms delay)');
        loadDynamicProjects();
    }, 500);
    
    setTimeout(() => {
        console.log('📝 Backup attempt (1500ms delay)');
        loadDynamicProjects();
    }, 1500);
    
    setTimeout(() => {
        console.log('📝 Final attempt (3000ms delay)');
        loadDynamicProjects();
    }, 3000);
});

// Also try when window is fully loaded
window.addEventListener('load', function() {
    console.log('🏁 Window fully loaded - auto-loading projects');
    setTimeout(() => {
        loadDynamicProjects();
    }, 100);
});

// Listen for storage changes (when admin adds new projects)
window.addEventListener('storage', function(e) {
    if (e.key === 'website_projects') {
        console.log('Storage changed, reloading projects');
        loadDynamicProjects();
    }
});

// Manual refresh function (for testing)
window.refreshProjects = loadDynamicProjects;

console.log('EliteEdge website loaded successfully! 🚀');
