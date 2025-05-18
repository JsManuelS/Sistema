// Initialize the database with default users
export function initializeDatabase() {
  // Check if users already exist in localStorage
  const existingUsers = localStorage.getItem('users');
  
  if (!existingUsers) {
    // Create default users
    const defaultUsers = [
      {
        id: 1,
        username: 'admin',
        password: 'admin',
        role: 'admin',
        name: 'Administrator',
        email: 'admin@example.com',
        createdAt: new Date().toISOString(),
        status: 'active'
      },
      {
        id: 2,
        username: 'jsmanuel',
        password: 'jsmanuel',
        role: 'user',
        name: 'JS Manuel',
        email: 'jsmanuel@example.com',
        createdAt: new Date().toISOString(),
        status: 'active'
      }
    ];
    
    // Store in localStorage
    localStorage.setItem('users', JSON.stringify(defaultUsers));
  }
}

// Get all users
export function getUsers() {
  return JSON.parse(localStorage.getItem('users')) || [];
}

// Get user by ID
export function getUserById(id) {
  const users = getUsers();
  return users.find(user => user.id === id);
}

// Add a new user
export function addUser(user) {
  const users = getUsers();
  const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
  
  const newUser = {
    ...user,
    id: newId,
    createdAt: new Date().toISOString(),
    status: user.role === 'admin' ? 'active' : 'pending'
  };
  
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  
  return newUser;
}

// Update an existing user
export function updateUser(id, updatedUserData) {
  const users = getUsers();
  const index = users.findIndex(user => user.id === id);
  
  if (index !== -1) {
    users[index] = {
      ...users[index],
      ...updatedUserData,
      updatedAt: new Date().toISOString()
    };
    
    localStorage.setItem('users', JSON.stringify(users));
    return users[index];
  }
  
  return null;
}

// Delete a user
export function deleteUser(id) {
  const users = getUsers();
  const filteredUsers = users.filter(user => user.id !== id);
  
  localStorage.setItem('users', JSON.stringify(filteredUsers));
  
  return true;
}

// Register new user
export function registerUser(userData) {
  const users = getUsers();
  
  // Check if username already exists
  if (users.some(user => user.username === userData.username)) {
    throw new Error('Username already exists');
  }
  
  // Check if email already exists
  if (users.some(user => user.email === userData.email)) {
    throw new Error('Email already exists');
  }
  
  return addUser({
    ...userData,
    role: 'user',
    status: 'pending'
  });
}

// Approve or reject user
export function updateUserStatus(id, status) {
  const users = getUsers();
  const index = users.findIndex(user => user.id === id);
  
  if (index !== -1) {
    users[index].status = status;
    localStorage.setItem('users', JSON.stringify(users));
    return users[index];
  }
  
  return null;
}