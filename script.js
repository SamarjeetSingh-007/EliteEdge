// IMMEDIATE PROJECT SYNC - runs as soon as script loads
(function() {
    console.log('🚀 IMMEDIATE: Script loaded, syncing projects...');
    
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
        console.log('✅ IMMEDIATE SYNC: Projects synced automatically!');
    }
})();

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

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

// Enhanced Modern JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

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
            // Add gentle rotation and scale
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

        // Add click interaction
        card.addEventListener('click', function() {
            // Pulse effect on click
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = '';
            }, 10);
            
            // Brief scale animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Parallax effect for floating shapes
    const shapes = document.querySelectorAll('.floating-shape');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.3;
            shape.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });

    // Central orb interaction
    const orbCore = document.querySelector('.orb-core');
    if (orbCore) {
        orbCore.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse-glow 1s ease-in-out infinite';
            this.style.transform = 'translate(-50%, -50%) scale(1.2)';
        });

        orbCore.addEventListener('mouseleave', function() {
            this.style.animation = 'pulse-glow 3s ease-in-out infinite';
            this.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    }

    // Dynamic connection lines animation
    const connectionLines = document.querySelectorAll('.connection-line');
    
    // Animate connection lines based on mouse position
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        connectionLines.forEach((line, index) => {
            const intensity = (mouseX + mouseY) * 0.5;
            line.style.strokeOpacity = 0.3 + (intensity * 0.4);
            line.style.strokeWidth = 1 + (intensity * 2);
        });
    });

    // Scroll indicator functionality
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.transform = 'translateY(20px)';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.transform = 'translateY(0)';
            }
        });
    }

    // Enhanced button interactions
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });

        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });

        btn.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-1px) scale(1.02)';
        });

        btn.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
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

    // Mobile navbar toggle enhancement
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on links
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });

    // Performance optimization: Throttle scroll events
    let scrollTimer = null;
    const throttledScroll = function() {
        if (scrollTimer !== null) {
            clearTimeout(scrollTimer);
        }
        scrollTimer = setTimeout(function() {
            // Scroll-dependent animations go here
        }, 10);
    };

    window.addEventListener('scroll', throttledScroll);
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

// Enhanced parallax effect for hero section
const hero = document.querySelector('.hero');
const heroGraphic = document.querySelector('.hero-graphic');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.3;
    
    if (heroGraphic && scrolled < window.innerHeight) {
        heroGraphic.style.transform = `translateY(${rate}px) rotate(${scrolled * 0.05}deg)`;
    }
});

// Interactive tech cards with mouse tracking
const techCards = document.querySelectorAll('.tech-card');
techCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        card.style.transform = `perspective(1000px) rotateX(${y / 10}deg) rotateY(${x / 10}deg) translateZ(20px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// Smooth reveal animation for hero elements
window.addEventListener('load', () => {
    const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-subtitle, .hero-stats, .hero-buttons');
    
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 200 + (index * 200));
    });
});

// Add magnetic effect to buttons
const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
buttons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0)';
    });
});

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

// Add floating animation to hero cards with mouse interaction
const floatingCards = document.querySelectorAll('.floating-card');
floatingCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.05)';
        card.style.transition = 'all 0.3s ease';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Add loading animation
window.addEventListener('load', () => {
    const loader = document.createElement('div');
    loader.id = 'loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-logo">
                <img src="assets/Minimalist_Logo_for_EliteEdge-removebg-preview.png" alt="EliteEdge" class="loader-logo-img">
                EliteEdge
            </div>
            <div class="loader-spinner"></div>
        </div>
    `;
    
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #0f0f23;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99999;
        opacity: 1;
        transition: opacity 0.5s ease;
    `;
    
    const loaderContent = loader.querySelector('.loader-content');
    loaderContent.style.cssText = `
        text-align: center;
    `;
    
    const loaderLogo = loader.querySelector('.loader-logo');
    loaderLogo.style.cssText = `
        font-size: 2rem;
        font-weight: 700;
        background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
    `;
    
    const loaderLogoImg = loader.querySelector('.loader-logo-img');
    loaderLogoImg.style.cssText = `
        width: 40px;
        height: 40px;
        object-fit: contain;
        filter: drop-shadow(0 0 15px rgba(99, 102, 241, 0.5));
        animation: pulse 2s ease-in-out infinite;
    `;
    
    const loaderSpinner = loader.querySelector('.loader-spinner');
    loaderSpinner.style.cssText = `
        width: 40px;
        height: 40px;
        border: 3px solid rgba(99, 102, 241, 0.3);
        border-top: 3px solid #6366f1;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto;
    `;
    
    // Add spinner and pulse animations
    const spinStyle = document.createElement('style');
    spinStyle.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        @keyframes pulse {
            0%, 100% { transform: scale(1); filter: drop-shadow(0 0 15px rgba(99, 102, 241, 0.5)); }
            50% { transform: scale(1.1); filter: drop-shadow(0 0 25px rgba(99, 102, 241, 0.8)); }
        }
    `;
    document.head.appendChild(spinStyle);
    
    document.body.appendChild(loader);
    
    // Remove loader after a short delay
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
            spinStyle.remove();
        }, 500);
    }, 1500);
});

// Add particle background effect
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(99, 102, 241, 0.5);
            border-radius: 50%;
            animation: float-particle ${5 + Math.random() * 10}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 10}s;
        `;
        particlesContainer.appendChild(particle);
    }
    
    // Add particle animation
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes float-particle {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(particleStyle);
}

// Initialize particles
createParticles();

// Load dynamic projects from admin panel
function loadDynamicProjects() {
    console.log('🔍 Starting loadDynamicProjects function');
    
    // Wait for DOM elements if they're not ready yet
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid) {
        console.log('⏳ DOM not ready yet, retrying in 100ms...');
        setTimeout(loadDynamicProjects, 100);
        return;
    }
    
    // SYNC LOGIC: Check if we need to sync admin projects to website projects
    const adminProjects = JSON.parse(localStorage.getItem('eliteedge_projects') || '[]');
    let projects = JSON.parse(localStorage.getItem('website_projects') || '[]');
    
    console.log('� Current state:');
    console.log('  - Admin projects:', adminProjects.length);
    console.log('  - Website projects:', projects.length);
    
    // If we have admin projects but no website projects, sync them
    if (adminProjects.length > 0 && projects.length === 0) {
        console.log('🔄 Syncing admin projects to website projects...');
        
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
        console.log('✅ Projects synced successfully!');
    }
    
    console.log('📦 Final projects to display:', projects);
    console.log('📊 Number of projects:', projects.length);
    
    const noProjectsMessage = document.getElementById('noProjectsMessage');
    
    console.log('🎯 DOM elements found:');
    console.log('  - projectsGrid:', projectsGrid ? 'Found' : 'NOT FOUND');
    console.log('  - noProjectsMessage:', noProjectsMessage ? 'Found' : 'NOT FOUND');
    
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
        <div class="project-card" data-category="${project.category}">
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
}

// Auto-execute debug functionality on page load
function autoLoadProjects() {
    console.log('🔄 Auto-loading projects (like debug button)...');
    
    // Get both admin and website projects
    const adminProjects = JSON.parse(localStorage.getItem('eliteedge_projects') || '[]');
    const websiteProjects = JSON.parse(localStorage.getItem('website_projects') || '[]');
    
    console.log('📊 Storage Analysis:');
    console.log('  - Admin projects (eliteedge_projects):', adminProjects.length, adminProjects);
    console.log('  - Website projects (website_projects):', websiteProjects.length, websiteProjects);
    
    // If we have admin projects but no website projects, sync them
    if (adminProjects.length > 0 && websiteProjects.length === 0) {
        console.log('� Syncing admin projects to website projects...');
        
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
        console.log('✅ Projects synced successfully!');
    }
    
    // Force load projects
    loadDynamicProjects();
}

// Load projects on page load and DOM ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM Content Loaded - auto-loading projects');
    
    // Run auto-load immediately
    setTimeout(() => {
        console.log('📝 Auto-load attempt (500ms delay)');
        autoLoadProjects();
    }, 500);
    
    // Backup attempts
    setTimeout(() => {
        console.log('📝 Backup attempt (1500ms delay)');
        autoLoadProjects();
    }, 1500);
    
    setTimeout(() => {
        console.log('📝 Final attempt (3000ms delay)');
        autoLoadProjects();
    }, 3000);
});

// Also try when window is fully loaded
window.addEventListener('load', function() {
    console.log('🏁 Window fully loaded - auto-loading projects');
    setTimeout(() => {
        autoLoadProjects();
    }, 100);
});

// Try again when page becomes visible (in case of tab switching)
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        console.log('👁️ Page became visible - auto-loading projects');
        autoLoadProjects();
    }
});

// Listen for storage changes (when admin adds new projects)
window.addEventListener('storage', function(e) {
    if (e.key === 'website_projects') {
        console.log('Storage changed, reloading projects'); // Debug log
        loadDynamicProjects();
    }
});

// Listen for cross-tab communication from admin panel
window.addEventListener('message', function(e) {
    if (e.data && e.data.type === 'PROJECTS_UPDATED') {
        console.log('Received projects update from admin panel'); // Debug log
        loadDynamicProjects();
    }
});

// Manual refresh function (for testing)
window.refreshProjects = loadDynamicProjects;

// Force check projects on window focus (when switching back to main site)
window.addEventListener('focus', function() {
    loadDynamicProjects();
});

// Add smooth reveal animation for sections
const revealSections = document.querySelectorAll('section');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

revealSections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    revealObserver.observe(section);
});

// Add counter animation for stats (if you want to add stats section later)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);
        
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Initialize tooltips for service features
document.querySelectorAll('.service-features li').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(5px)';
        this.style.transition = 'transform 0.2s ease';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
    });
});

console.log('EliteEdge website loaded successfully! 🚀');
