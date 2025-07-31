// Admin credentials (in a real app, this would be handled server-side)
const ADMIN_CREDENTIALS = {
    username: 'samarjeet',
    password: 'PASSword@3419'
};

// Local storage key for projects
const PROJECTS_KEY = 'eliteedge_projects';

// DOM elements
let loginModal, adminPanel, projectForm, projectsList;

// Initialize admin panel
document.addEventListener('DOMContentLoaded', function() {
    loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
    adminPanel = document.getElementById('adminPanel');
    projectForm = document.getElementById('projectForm');
    projectsList = document.getElementById('projectsList');
    
    // Check Firebase connection
    setTimeout(() => {
        if (typeof FirebaseDB !== 'undefined') {
            console.log('🔥 Firebase connected to admin panel!');
            showNotification('Firebase connected! Projects will sync across all devices 🚀', 'success');
        } else {
            console.log('⚠️ Firebase not available, using localStorage only');
            showNotification('Firebase not available - using local storage only', 'warning');
        }
    }, 1000);
    
    // Show login modal on load
    loginModal.show();
    
    // Initialize event listeners
    initializeEventListeners();
    
    // Load existing projects
    setTimeout(() => {
        loadProjects();
        updateStats();
    }, 500);
});

function initializeEventListeners() {
    // Login form
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    
    // Project form
    projectForm.addEventListener('submit', handleProjectSubmission);
    
    // Image preview for URL
    document.getElementById('projectImageUrl').addEventListener('input', handleImageUrlPreview);
}

function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('loginError');
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        loginModal.hide();
        adminPanel.classList.remove('d-none');
        adminPanel.classList.add('fade-in');
        errorDiv.classList.add('d-none');
        
        // Clear form
        document.getElementById('loginForm').reset();
        
        showNotification('Welcome back, Samarjeet! 👋', 'success');
    } else {
        errorDiv.classList.remove('d-none');
        
        // Add shake animation to modal
        const modalContent = document.querySelector('.modal-content');
        modalContent.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            modalContent.style.animation = '';
        }, 500);
    }
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        adminPanel.classList.add('d-none');
        loginModal.show();
        showNotification('Logged out successfully', 'info');
    }
}

function handleImageUrlPreview(e) {
    const imageUrl = e.target.value;
    const previewDiv = document.getElementById('imagePreview');
    
    if (imageUrl && isValidImageUrl(imageUrl)) {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.style.cssText = `
            max-width: 200px;
            max-height: 150px;
            object-fit: cover;
            border-radius: 12px;
            border: 2px solid var(--glass-border);
        `;
        
        img.onload = function() {
            previewDiv.innerHTML = `
                <img src="${imageUrl}" style="max-width: 200px; max-height: 150px; object-fit: cover; border-radius: 12px; border: 2px solid var(--glass-border);">
                <p class="mt-2 text-muted small">✅ Image loaded successfully</p>
            `;
        };
        
        img.onerror = function() {
            previewDiv.innerHTML = `
                <p class="mt-2 text-danger small">❌ Failed to load image. Please check the URL.</p>
            `;
        };
        
        // Temporary loading state
        previewDiv.innerHTML = `
            <p class="mt-2 text-muted small">🔄 Loading image...</p>
        `;
    } else if (imageUrl) {
        previewDiv.innerHTML = `
            <p class="mt-2 text-warning small">⚠️ Please enter a valid image URL</p>
        `;
    } else {
        previewDiv.innerHTML = '';
    }
}

function isValidImageUrl(url) {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    const urlLower = url.toLowerCase();
    return imageExtensions.some(ext => urlLower.includes(ext)) || 
           url.includes('imgur.com') || 
           url.includes('githubusercontent.com') ||
           url.includes('cloudinary.com') ||
           url.includes('unsplash.com');
}

function handleProjectSubmission(e) {
    e.preventDefault();
    
    // Get form values directly
    const title = document.getElementById('projectTitle').value.trim();
    const category = document.getElementById('projectCategory').value;
    const description = document.getElementById('projectDescription').value.trim();
    const projectLink = document.getElementById('projectLink').value.trim();
    const githubLink = document.getElementById('githubLink').value.trim();
    const technologies = document.getElementById('projectTechnologies').value.trim();
    const imageUrl = document.getElementById('projectImageUrl').value.trim();
    
    // Validation
    if (!title || !category || !description || !imageUrl) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    if (!isValidImageUrl(imageUrl)) {
        showNotification('Please enter a valid image URL', 'error');
        return;
    }
    
    // Show loading
    showLoading(true);
    
    // Test if image loads
    const testImg = new Image();
    testImg.onload = function() {
        const project = {
            id: Date.now().toString(),
            title: title,
            category: category,
            description: description,
            projectLink: projectLink || null,
            githubLink: githubLink || null,
            technologies: technologies,
            image: imageUrl,
            dateAdded: new Date().toISOString()
        };
        
        // Save project
        saveProject(project);
        
        // Reset form
        projectForm.reset();
        document.getElementById('imagePreview').innerHTML = '';
        
        // Reload projects list
        loadProjects();
        updateStats();
        
        showLoading(false);
        showNotification('Project added successfully! 🎉', 'success');
        
        // Clear form draft
        clearFormDraft();
        
        // Scroll to projects list
        document.getElementById('projectsList').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    };
    
    testImg.onerror = function() {
        showLoading(false);
        showNotification('Failed to load the image. Please check the URL and try again.', 'error');
    };
    
    testImg.src = imageUrl;
}

async function saveProject(project) {
    // Try to save to Firebase first
    if (typeof FirebaseDB !== 'undefined') {
        try {
            console.log('🔥 Saving project to Firebase:', project.title);
            await FirebaseDB.saveProject(project);
            showNotification('Project saved to Firebase successfully! 🔥', 'success');
        } catch (error) {
            console.error('❌ Firebase save error:', error);
            showNotification('Firebase error, saved locally instead', 'warning');
        }
    }
    
    // Also save to localStorage as backup
    let projects = getProjects();
    projects.unshift(project); // Add to beginning of array
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
    
    // Also update the main website's projects data
    updateMainWebsiteProjects(projects);
}

function getProjects() {
    const projects = localStorage.getItem(PROJECTS_KEY);
    return projects ? JSON.parse(projects) : [];
}

async function loadProjects() {
    let projects = [];
    
    // Try to load from Firebase first
    if (typeof FirebaseDB !== 'undefined') {
        try {
            console.log('🔥 Loading projects from Firebase...');
            projects = await FirebaseDB.loadProjects();
            console.log('✅ Loaded', projects.length, 'projects from Firebase');
        } catch (error) {
            console.error('❌ Firebase load error:', error);
            console.log('🔄 Falling back to localStorage...');
        }
    }
    
    // Fallback to localStorage if Firebase failed
    if (projects.length === 0) {
        projects = getProjects();
        console.log('📦 Loaded', projects.length, 'projects from localStorage');
    }
    
    if (projects.length === 0) {
        projectsList.innerHTML = `
            <div class="text-center text-muted py-5">
                <i class="fas fa-folder-open fa-3x mb-3"></i>
                <p>No projects added yet. Add your first project above!</p>
            </div>
        `;
        return;
    }
    
    projectsList.innerHTML = projects.map(project => `
        <div class="project-card slide-in-up">
            <div class="row align-items-center">
                <div class="col-md-2">
                    <img src="${project.image}" alt="${project.title}" class="project-image">
                </div>
                <div class="col-md-7">
                    <h5 class="project-title">${project.title}</h5>
                    <span class="project-category">${getCategoryName(project.category)}</span>
                    <p class="project-description">${project.description}</p>
                    <div class="project-technologies">
                        ${project.technologies ? project.technologies.split(',').map(tech => 
                            `<span class="tech-tag">${tech.trim()}</span>`
                        ).join('') : ''}
                    </div>
                </div>
                <div class="col-md-3 text-end">
                    <div class="project-links mb-2">
                        ${project.projectLink ? `<a href="${project.projectLink}" target="_blank" class="project-link"><i class="fas fa-external-link-alt me-1"></i>Live</a>` : ''}
                        ${project.githubLink ? `<a href="${project.githubLink}" target="_blank" class="project-link"><i class="fab fa-github me-1"></i>Code</a>` : ''}
                    </div>
                    <button class="delete-btn" onclick="deleteProject('${project.id}')">
                        <i class="fas fa-trash me-1"></i>Delete
                    </button>
                    <div class="text-muted small mt-2">
                        Added: ${new Date(project.dateAdded).toLocaleDateString()}
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function deleteProject(projectId) {
    if (confirm('Are you sure you want to delete this project?')) {
        let projects = getProjects();
        projects = projects.filter(project => project.id !== projectId);
        localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
        
        // Update main website
        updateMainWebsiteProjects(projects);
        
        loadProjects();
        updateStats();
        showNotification('Project deleted successfully', 'info');
    }
}

function getCategoryName(category) {
    const categories = {
        'web': 'Web Development',
        'mobile': 'Mobile App',
        'desktop': 'Desktop Application',
        'ai': 'AI/ML Project',
        'other': 'Other'
    };
    return categories[category] || category;
}

function updateStats() {
    const projects = getProjects();
    document.getElementById('totalProjects').textContent = projects.length;
    
    if (projects.length > 0) {
        const lastProject = projects[0]; // Most recent project
        const lastUpdated = new Date(lastProject.dateAdded).toLocaleDateString();
        document.getElementById('lastUpdated').textContent = lastUpdated;
    } else {
        document.getElementById('lastUpdated').textContent = 'Never';
    }
}

function updateMainWebsiteProjects(projects) {
    // This function would typically make an API call to update the main website
    // For now, we'll store it in localStorage with a different key that the main site can access
    const webProjects = projects.map(project => ({
        title: project.title,
        description: project.description,
        image: project.image,
        projectLink: project.projectLink,
        githubLink: project.githubLink,
        technologies: project.technologies ? project.technologies.split(',').map(t => t.trim()) : [],
        category: project.category
    }));
    
    console.log('Updating main website projects:', webProjects); // Debug log
    localStorage.setItem('website_projects', JSON.stringify(webProjects));
    
    // Force trigger storage event for same-page updates
    window.dispatchEvent(new StorageEvent('storage', {
        key: 'website_projects',
        newValue: JSON.stringify(webProjects),
        url: window.location.href
    }));
    
    // Also try to refresh the main website if it's open in another tab
    try {
        if (window.opener && !window.opener.closed) {
            window.opener.postMessage({
                type: 'PROJECTS_UPDATED',
                projects: webProjects
            }, '*');
        }
    } catch (e) {
        console.log('Could not communicate with main website tab');
    }
}

function showLoading(show) {
    const overlay = document.getElementById('loadingOverlay');
    if (show) {
        overlay.classList.remove('d-none');
    } else {
        overlay.classList.add('d-none');
    }
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.admin-notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `admin-notification alert alert-${type === 'error' ? 'danger' : type} position-fixed`;
    notification.style.cssText = `
        top: 20px;
        right: 20px;
        z-index: 10000;
        min-width: 300px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        info: 'fas fa-info-circle',
        warning: 'fas fa-exclamation-triangle'
    };
    
    notification.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="${icons[type] || icons.info} me-2"></i>
            <span>${message}</span>
            <button type="button" class="btn-close btn-close-white ms-auto" onclick="this.parentElement.parentElement.remove()"></button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add shake animation for login error
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(shakeStyle);

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K to focus search (if implemented later)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // Focus search input when implemented
    }
    
    // Escape to close modals
    if (e.key === 'Escape') {
        const openModals = document.querySelectorAll('.modal.show');
        openModals.forEach(modal => {
            const modalInstance = bootstrap.Modal.getInstance(modal);
            if (modalInstance) {
                modalInstance.hide();
            }
        });
    }
});

// Auto-save form data (in case of accidental refresh)
let autoSaveTimer;
function autoSaveFormData() {
    clearTimeout(autoSaveTimer);
    autoSaveTimer = setTimeout(() => {
        const formData = {
            title: document.getElementById('projectTitle').value,
            category: document.getElementById('projectCategory').value,
            description: document.getElementById('projectDescription').value,
            projectLink: document.getElementById('projectLink').value,
            githubLink: document.getElementById('githubLink').value,
            technologies: document.getElementById('projectTechnologies').value,
            imageUrl: document.getElementById('projectImageUrl').value
        };
        localStorage.setItem('admin_form_draft', JSON.stringify(formData));
    }, 1000);
}

// Load draft data on page load
function loadFormDraft() {
    const draft = localStorage.getItem('admin_form_draft');
    if (draft) {
        const data = JSON.parse(draft);
        if (data.title) document.getElementById('projectTitle').value = data.title;
        if (data.category) document.getElementById('projectCategory').value = data.category;
        if (data.description) document.getElementById('projectDescription').value = data.description;
        if (data.projectLink) document.getElementById('projectLink').value = data.projectLink;
        if (data.githubLink) document.getElementById('githubLink').value = data.githubLink;
        if (data.technologies) document.getElementById('projectTechnologies').value = data.technologies;
        if (data.imageUrl) {
            document.getElementById('projectImageUrl').value = data.imageUrl;
            // Trigger preview
            handleImageUrlPreview({target: {value: data.imageUrl}});
        }
    }
}

// Clear draft after successful submission
function clearFormDraft() {
    localStorage.removeItem('admin_form_draft');
}

// Add auto-save listeners
document.addEventListener('DOMContentLoaded', function() {
    const formInputs = document.querySelectorAll('#projectForm input, #projectForm textarea, #projectForm select');
    formInputs.forEach(input => {
        input.addEventListener('input', autoSaveFormData);
        input.addEventListener('change', autoSaveFormData);
    });
    
    // Load any existing draft
    setTimeout(loadFormDraft, 500);
});

console.log('Admin panel loaded successfully! 🔐');

// Test function to check main website sync
function testMainWebsiteSync() {
    const projects = getProjects();
    console.log('Current projects in admin:', projects);
    
    updateMainWebsiteProjects(projects);
    
    const webProjects = JSON.parse(localStorage.getItem('website_projects') || '[]');
    console.log('Projects in main website storage:', webProjects);
    
    showNotification(`Sync test complete! Found ${projects.length} admin projects, ${webProjects.length} web projects`, 'info');
}
