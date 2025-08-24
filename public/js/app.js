let users = [];
let currentUserId = null;
let isEditMode = false;

const UNSPLASH_ACCESS_TOKEN = '4eDpR9sbV7ILSpeNPvZw8BUqqnvnymf4x_OltPaoB6w';
const UNSPLASH_API_URL = 'https://api.unsplash.com';

const userModal = document.getElementById('userModal');
const deleteModal = document.getElementById('deleteModal');
const userForm = document.getElementById('userForm');
const usersGrid = document.getElementById('usersGrid');
const addUserBtn = document.getElementById('addUserBtn');
const closeModal = document.getElementById('closeModal');
const cancelBtn = document.getElementById('cancelBtn');
const submitBtn = document.getElementById('submitBtn');
const modalTitle = document.getElementById('modalTitle');
const submitText = document.getElementById('submitText');
const submitLoading = document.getElementById('submitLoading');

document.addEventListener('DOMContentLoaded', function() {
    loadUsers();
    setupEventListeners();
    loadRandomBackgroundImage();
});

function setupEventListeners() {
    addUserBtn.addEventListener('click', openAddUserModal);
    closeModal.addEventListener('click', closeUserModal);
    cancelBtn.addEventListener('click', closeUserModal);
    userForm.addEventListener('submit', handleFormSubmit);
    
    userModal.addEventListener('click', function(e) {
        if (e.target === userModal) {
            closeUserModal();
        }
    });
    
    deleteModal.addEventListener('click', function(e) {
        if (e.target === deleteModal) {
            closeDeleteModal();
        }
    });
}

async function loadRandomBackgroundImage() {
    try {
        const response = await fetch(`${UNSPLASH_API_URL}/photos/random?query=event&orientation=landscape`, {
            headers: {
                'Authorization': `Client-ID ${UNSPLASH_ACCESS_TOKEN}`
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            document.body.style.backgroundImage = `linear-gradient(to bottom right, rgba(239, 239, 239, 0.9), rgba(255, 255, 255, 0.9)), url(${data.urls.regular})`;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center';
            document.body.style.backgroundAttachment = 'fixed';
        }
    } catch (error) {
        console.log('Could not load background image:', error);
    }
}

async function loadUsers() {
    try {
        const response = await fetch('/api/users');
        const result = await response.json();
        
        if (result.success) {
            users = result.data;
            renderUsers();
            updateStats();
        } else {
            showToast('Error', 'Failed to load users', 'error');
        }
    } catch (error) {
        console.error('Error loading users:', error);
        showToast('Error', 'Failed to load users', 'error');
    }
}

function renderUsers() {
    if (users.length === 0) {
        usersGrid.innerHTML = `
            <div class="flex items-center justify-center py-12">
                <div class="text-center">
                    <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-users text-gray-400 text-2xl"></i>
                    </div>
                    <p class="text-gray-500 text-lg">No users found</p>
                    <p class="text-gray-400 text-sm">Add your first user to get started</p>
                </div>
            </div>
        `;
        return;
    }

    usersGrid.innerHTML = users.map(user => `
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
            <div class="flex items-start space-x-4">
                <div class="flex-shrink-0">
                    <img src="${user.profile_picture ? `/uploads/${user.profile_picture}` : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'}" 
                         alt="${user.name}" 
                         class="w-16 h-16 rounded-full object-cover border-2 border-gray-200">
                </div>
                <div class="flex-1 min-w-0">
                    <h3 class="text-lg font-semibold text-pinterest-dark truncate">${user.name}</h3>
                    <p class="text-gray-600 text-sm truncate">${user.email}</p>
                    <p class="text-gray-500 text-sm">${user.phone}</p>
                    <p class="text-xs text-gray-400 mt-1">Joined ${new Date(user.created_at).toLocaleDateString()}</p>
                </div>
                <div class="flex-shrink-0">
                    <div class="flex space-x-2">
                        <button onclick="editUser(${user.id})" 
                                class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200" 
                                title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="deleteUser(${user.id})" 
                                class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200" 
                                title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function updateStats() {
    document.getElementById('totalUsers').textContent = users.length;
    
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const newThisMonth = users.filter(user => {
        const userDate = new Date(user.created_at);
        return userDate.getMonth() === currentMonth && userDate.getFullYear() === currentYear;
    }).length;
    
    document.getElementById('newUsers').textContent = newThisMonth;
    document.getElementById('activeUsers').textContent = users.length; // All users are considered active for now
}

function openAddUserModal() {
    isEditMode = false;
    currentUserId = null;
    modalTitle.textContent = 'Add New User';
    submitText.textContent = 'Add User';
    userForm.reset();
    document.getElementById('userId').value = '';
    document.getElementById('fileUploadArea').classList.remove('hidden');
    document.getElementById('imagePreview').classList.add('hidden');
    userModal.classList.remove('hidden');
}

function editUser(userId) {
    const user = users.find(u => u.id === userId);
    if (!user) return;
    
    isEditMode = true;
    currentUserId = userId;
    modalTitle.textContent = 'Edit User';
    submitText.textContent = 'Update User';
    
    document.getElementById('userId').value = user.id;
    document.getElementById('userName').value = user.name;
    document.getElementById('userEmail').value = user.email;
    document.getElementById('userPhone').value = user.phone;
    
    if (user.profile_picture) {
        document.getElementById('previewImg').src = `/uploads/${user.profile_picture}`;
        document.getElementById('fileUploadArea').classList.add('hidden');
        document.getElementById('imagePreview').classList.remove('hidden');
    } else {
        document.getElementById('fileUploadArea').classList.remove('hidden');
        document.getElementById('imagePreview').classList.add('hidden');
    }
    
    userModal.classList.remove('hidden');
}

function closeUserModal() {
    userModal.classList.add('hidden');
    userForm.reset();
    document.getElementById('fileUploadArea').classList.remove('hidden');
    document.getElementById('imagePreview').classList.add('hidden');
}

async function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', document.getElementById('userName').value);
    formData.append('email', document.getElementById('userEmail').value);
    formData.append('phone', document.getElementById('userPhone').value);
    
    const profilePicFile = document.getElementById('userProfilePic').files[0];
    if (profilePicFile) {
        formData.append('profile_picture', profilePicFile);
    }
    
    submitLoading.classList.remove('hidden');
    submitText.classList.add('hidden');
    
    try {
        const url = isEditMode ? `/api/users/${currentUserId}` : '/api/users';
        const method = isEditMode ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
            showToast('Success', result.message, 'success');
            closeUserModal();
            loadUsers();
        } else {
            showToast('Error', result.message, 'error');
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        showToast('Error', 'Failed to save user', 'error');
    } finally {
        submitLoading.classList.add('hidden');
        submitText.classList.remove('hidden');
    }
}

function deleteUser(userId) {
    currentUserId = userId;
    deleteModal.classList.remove('hidden');
    
    document.getElementById('confirmDelete').onclick = async () => {
        try {
            const response = await fetch(`/api/users/${userId}`, {
                method: 'DELETE'
            });
            
            const result = await response.json();
            
            if (result.success) {
                showToast('Success', result.message, 'success');
                closeDeleteModal();
                loadUsers();
            } else {
                showToast('Error', result.message, 'error');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            showToast('Error', 'Failed to delete user', 'error');
        }
    };
}

function closeDeleteModal() {
    deleteModal.classList.add('hidden');
    currentUserId = null;
}

function previewImage(input) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('previewImg').src = e.target.result;
            document.getElementById('fileUploadArea').classList.add('hidden');
            document.getElementById('imagePreview').classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    }
}

function removeImage() {
    document.getElementById('userProfilePic').value = '';
    document.getElementById('fileUploadArea').classList.remove('hidden');
    document.getElementById('imagePreview').classList.add('hidden');
}

function showToast(title, message, type = 'info') {
    const toast = document.getElementById('toast');
    const toastIcon = document.getElementById('toastIcon');
    const toastTitle = document.getElementById('toastTitle');
    const toastMessage = document.getElementById('toastMessage');
    
    let iconClass = '';
    let bgColor = '';
    
    switch (type) {
        case 'success':
            iconClass = 'fas fa-check text-white';
            bgColor = 'bg-green-500';
            break;
        case 'error':
            iconClass = 'fas fa-exclamation-triangle text-white';
            bgColor = 'bg-red-500';
            break;
        case 'warning':
            iconClass = 'fas fa-exclamation-circle text-white';
            bgColor = 'bg-yellow-500';
            break;
        default:
            iconClass = 'fas fa-info-circle text-white';
            bgColor = 'bg-blue-500';
    }
    
    toastIcon.className = `w-6 h-6 rounded-full flex items-center justify-center ${bgColor}`;
    toastIcon.innerHTML = `<i class="${iconClass}"></i>`;
    
    toastTitle.textContent = title;
    toastMessage.textContent = message;
    
    toast.classList.remove('translate-x-full');
    
    setTimeout(() => {
        toast.classList.add('translate-x-full');
    }, 5000);
}

document.addEventListener('DOMContentLoaded', function() {
    const uploadArea = document.getElementById('fileUploadArea');
    const fileInput = document.getElementById('userProfilePic');
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    ['dragenter', 'dragover'].forEach(eventName => {
        uploadArea.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, unhighlight, false);
    });
    
    function highlight(e) {
        uploadArea.classList.add('border-pinterest-red', 'bg-red-50');
    }
    
    function unhighlight(e) {
        uploadArea.classList.remove('border-pinterest-red', 'bg-red-50');
    }
    
    uploadArea.addEventListener('drop', handleDrop, false);
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        
        if (files.length > 0) {
            fileInput.files = files;
            previewImage(fileInput);
        }
    }
    
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });
});
