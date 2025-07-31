// Firebase Configuration for EliteEdge
// ACTUAL CONFIG FROM FIREBASE CONSOLE

const firebaseConfig = {
    apiKey: "AIzaSyDQc4l-IbyK0IHSWU9lApARC2t4TdcARuo",
    authDomain: "eliteedge-007.firebaseapp.com",
    projectId: "eliteedge-007",
    storageBucket: "eliteedge-007.firebasestorage.app",
    messagingSenderId: "667974600428",
    appId: "1:667974600428:web:dfe71165a6b82544f687c9",
    measurementId: "G-PMLVLV3G1Z"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Firebase Database Functions
const FirebaseDB = {
    // Load all projects from Firebase
    async loadProjects() {
        try {
            console.log('🔥 Loading projects from Firebase...');
            const snapshot = await db.collection('projects').orderBy('createdAt', 'desc').get();
            const projects = [];
            
            snapshot.forEach(doc => {
                projects.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            
            console.log('✅ Loaded', projects.length, 'projects from Firebase');
            return projects;
        } catch (error) {
            console.error('❌ Error loading projects:', error);
            return [];
        }
    },

    // Save a new project to Firebase
    async saveProject(project) {
        try {
            console.log('🔥 Saving project to Firebase:', project.title);
            
            const projectData = {
                ...project,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            };
            
            const docRef = await db.collection('projects').add(projectData);
            console.log('✅ Project saved with ID:', docRef.id);
            return docRef.id;
        } catch (error) {
            console.error('❌ Error saving project:', error);
            throw error;
        }
    },

    // Update an existing project
    async updateProject(projectId, updates) {
        try {
            console.log('🔥 Updating project:', projectId);
            
            const updateData = {
                ...updates,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            };
            
            await db.collection('projects').doc(projectId).update(updateData);
            console.log('✅ Project updated successfully');
        } catch (error) {
            console.error('❌ Error updating project:', error);
            throw error;
        }
    },

    // Delete a project
    async deleteProject(projectId) {
        try {
            console.log('🔥 Deleting project:', projectId);
            await db.collection('projects').doc(projectId).delete();
            console.log('✅ Project deleted successfully');
        } catch (error) {
            console.error('❌ Error deleting project:', error);
            throw error;
        }
    },

    // Listen for real-time updates
    onProjectsUpdate(callback) {
        console.log('🔥 Setting up real-time listener...');
        return db.collection('projects')
            .orderBy('createdAt', 'desc')
            .onSnapshot(snapshot => {
                const projects = [];
                snapshot.forEach(doc => {
                    projects.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
                console.log('🔄 Real-time update: Found', projects.length, 'projects');
                callback(projects);
            }, error => {
                console.error('❌ Real-time listener error:', error);
            });
    }
};

// Make it globally available
window.FirebaseDB = FirebaseDB;

console.log('🔥 Firebase initialized successfully!');
