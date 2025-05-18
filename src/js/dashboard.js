import { getUsers, addUser, updateUser, deleteUser, updateUserStatus } from './database.js';

document.addEventListener('DOMContentLoaded', () => {
  // Check if user is logged in
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  if (!currentUser) {
    // Redirect to login page if not logged in
    window.location.href = '/index.html';
    return;
  }
  
  // Update user info in sidebar
  document.getElementById('username').textContent = currentUser.username;
  document.getElementById('userRole').textContent = currentUser.role;
  
  // Format current date
  const date = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById('currentDate').textContent = date.toLocaleDateString('en-US', options);
  
  // Set welcome message
  document.getElementById('welcomeMessage').textContent = `Welcome back, ${currentUser.username}!`;
  
  // Show/hide Users nav item based on role
  if (currentUser.role !== 'admin') {
    document.getElementById('usersNavItem').classList.add('hidden');
  }
  
  // Mobile sidebar toggle
  const sidebarToggle = document.getElementById('mobileSidebarToggle');
  const sidebarContent = document.getElementById('sidebarContent');
  
  sidebarToggle.addEventListener('click', () => {
    sidebarContent.classList.toggle('hidden');
  });
  
  // Navigation
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = link.getAttribute('href').substring(1);
      
      // Update active section
      sections.forEach(section => {
        section.classList.add('hidden');
        section.classList.remove('active');
      });
      
      const targetSection = document.getElementById(targetId);
      targetSection.classList.remove('hidden');
      targetSection.classList.add('active');
      
      // Update page title
      document.getElementById('pageTitle').textContent = link.querySelector('span').textContent;
      
      // Hide sidebar on mobile after navigation
      if (window.innerWidth < 768) {
        sidebarContent.classList.add('hidden');
      }
      
      // Load section specific content
      if (targetId === 'users' && currentUser.role === 'admin') {
        loadUsers();
      }
    });
  });
  
  // Check for hash in URL and navigate to that section
  const hash = window.location.hash.substring(1);
  if (hash) {
    const hashLink = document.querySelector(`a[href="#${hash}"]`);
    if (hashLink) {
      hashLink.click();
    }
  }
  
  // Logout
  document.getElementById('logoutBtn').addEventListener('click', () => {
    sessionStorage.removeItem('currentUser');
    window.location.href = '/index.html';
  });
  
  // User management (admin only)
  if (currentUser.role === 'admin') {
    const userModal = document.getElementById('userModal');
    const userForm = document.getElementById('userForm');
    const addUserBtn = document.getElementById('addUserBtn');
    const cancelUserBtn = document.getElementById('cancelUserBtn');
    const deleteModal = document.getElementById('deleteModal');
    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    let userToDelete = null;
    
    // Add user button
    addUserBtn.addEventListener('click', () => {
      // Reset form
      userForm.reset();
      document.getElementById('userId').value = '';
      document.getElementById('modalTitle').textContent = 'Add New User';
      
      // Show modal
      userModal.classList.remove('hidden');
    });
    
    // Cancel user form
    cancelUserBtn.addEventListener('click', () => {
      userModal.classList.add('hidden');
    });
    
    // Cancel delete
    cancelDeleteBtn.addEventListener('click', () => {
      userToDelete = null;
      deleteModal.classList.add('hidden');
    });
    
    // Confirm delete
    confirmDeleteBtn.addEventListener('click', () => {
      if (userToDelete) {
        deleteUser(userToDelete);
        deleteModal.classList.add('hidden');
        loadUsers();
      }
    });
    
    // Submit user form
    userForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const userId = document.getElementById('userId').value;
      const user = {
        name: document.getElementById('name').value,
        username: document.getElementById('userUsername').value,
        password: document.getElementById('userPassword').value,
        email: document.getElementById('email').value,
        role: document.getElementById('role').value
      };
      
      if (userId) {
        // Update existing user
        updateUser(parseInt(userId), user);
      } else {
        // Add new user
        addUser(user);
      }
      
      // Hide modal and reload users
      userModal.classList.add('hidden');
      loadUsers();
    });
    
    // Initial load of users if on users page
    if (document.getElementById('users').classList.contains('active')) {
      loadUsers();
    }
    
    // Update user count on home page
    updateUserCount();
  }
});

// Load users
function loadUsers() {
  const users = getUsers();
  const tableBody = document.getElementById('usersTableBody');
  
  // Clear table
  tableBody.innerHTML = '';
  
  // Add users to table
  users.forEach(user => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">${user.id}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">${user.name}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">${user.username}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">${user.email}</td>
      <td class="px-6 py-4 whitespace-nowrap">
        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
        }">${user.role}</span>
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }">${user.status}</span>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">${formatDate(user.createdAt)}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
        ${user.status === 'pending' ? `
          <button class="approve-user-btn text-green-600 hover:text-green-900" data-id="${user.id}">Approve</button>
          <button class="reject-user-btn text-red-600 hover:text-red-900" data-id="${user.id}">Reject</button>
        ` : `
          <button class="edit-user-btn text-indigo-600 hover:text-indigo-900" data-id="${user.id}">Edit</button>
          <button class="delete-user-btn text-red-600 hover:text-red-900" data-id="${user.id}">Delete</button>
        `}
      </td>
    `;
    
    tableBody.appendChild(tr);
  });
  
  // Add event listeners to buttons
  document.querySelectorAll('.edit-user-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const userId = parseInt(btn.dataset.id);
      editUser(userId);
    });
  });
  
  document.querySelectorAll('.delete-user-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const userId = parseInt(btn.dataset.id);
      showDeleteConfirmation(userId);
    });
  });
  
  document.querySelectorAll('.approve-user-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const userId = parseInt(btn.dataset.id);
      updateUserStatus(userId, 'active');
      loadUsers();
    });
  });
  
  document.querySelectorAll('.reject-user-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const userId = parseInt(btn.dataset.id);
      deleteUser(userId);
      loadUsers();
    });
  });
  
  // Update user count on home page
  updateUserCount();
}

// Edit user
function editUser(userId) {
  const users = getUsers();
  const user = users.find(u => u.id === userId);
  
  if (user) {
    // Set form values
    document.getElementById('userId').value = user.id;
    document.getElementById('name').value = user.name;
    document.getElementById('userUsername').value = user.username;
    document.getElementById('userPassword').value = user.password;
    document.getElementById('email').value = user.email;
    document.getElementById('role').value = user.role;
    
    // Update modal title
    document.getElementById('modalTitle').textContent = 'Edit User';
    
    // Show modal
    document.getElementById('userModal').classList.remove('hidden');
  }
}

// Show delete confirmation
function showDeleteConfirmation(userId) {
  window.userToDelete = userId;
  document.getElementById('deleteModal').classList.remove('hidden');
}

// Format date
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

// Update user count on home page
function updateUserCount() {
  const userCount = getUsers().length;
  const userCountElement = document.getElementById('userCount');
  
  if (userCountElement) {
    userCountElement.textContent = userCount.toString();
  }
}