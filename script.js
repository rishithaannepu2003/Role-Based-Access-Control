// Data Storage
let users = [
    { id: 1, name: "Alex", email: "Alex@gmail.com", role: "Admin", status: "Active" },
    { id: 1, name: "John", email: "John@gmail.com", role: "Admin", status: "InActive" },
];

let roles = [
    { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
    { id: 2, name: "Editor", permissions: ["Read", "Write"] },
];

// Render Users Table
function renderUserTable() {
    const userTable = document.getElementById("userTable");
    let html = `
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${users.map(user => `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>${user.role}</td>
                        <td>${user.status}</td>
                        <td>
                            <button onclick="editUser(${user.id})">Edit</button>
                            <button onclick="deleteUser(${user.id})">Delete</button>
                        </td>
                    </tr>
                `).join("")}
            </tbody>
        </table>
    `;
    userTable.innerHTML = html;
}

// Add User
function showAddUserModal() {
    const name = prompt("Enter User Name:");
    const email = prompt("Enter User Email:");
    const role = prompt("Enter User Role:");
    const status = "Active";

    const id = users.length ? users[users.length - 1].id + 1 : 1;
    users.push({ id, name, email, role, status });
    renderUserTable();
}

// Edit User
function editUser(userId) {
    const user = users.find(u => u.id === userId);
    if (!user) return;

    const name = prompt("Edit User Name:", user.name);
    const email = prompt("Edit User Email:", user.email);
    const role = prompt("Edit User Role:", user.role);

    user.name = name;
    user.email = email;
    user.role = role;

    renderUserTable();
}

// Delete User
function deleteUser(userId) {
    users = users.filter(user => user.id !== userId);
    renderUserTable();
}

// Render Roles Table
function renderRoleTable() {
    const roleTable = document.getElementById("roleTable");
    let html = `
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Permissions</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${roles.map(role => `
                    <tr>
                        <td>${role.id}</td>
                        <td>${role.name}</td>
                        <td>${role.permissions.join(", ")}</td>
                        <td>
                            <button onclick="showEditRoleModal(${role.id})">Edit</button>
                            <button onclick="deleteRole(${role.id})">Delete</button>
                        </td>
                    </tr>
                `).join("")}
            </tbody>
        </table>
    `;
    roleTable.innerHTML = html;
}

// Show Add Role Modal
function showAddRoleModal() {
    document.getElementById("roleModal").style.display = "block";
    document.getElementById("modalTitle").innerText = "Add Role";
    document.getElementById("roleName").value = '';
    document.querySelectorAll("#permissionsContainer input").forEach(checkbox => checkbox.checked = false);
}

// Show Edit Role Modal
function showEditRoleModal(roleId) {
    const role = roles.find(r => r.id === roleId);
    if (!role) return;

    document.getElementById("roleModal").style.display = "block";
    document.getElementById("modalTitle").innerText = "Edit Role";
    document.getElementById("roleName").value = role.name;
    
    document.querySelectorAll("#permissionsContainer input").forEach(checkbox => {
        checkbox.checked = role.permissions.includes(checkbox.value);
    });

    window.editingRoleId = roleId; // Save the role ID for editing
}

// Save Role (Add/Edit)
function saveRole() {
    const roleName = document.getElementById("roleName").value;
    const selectedPermissions = [];
    
    document.querySelectorAll("#permissionsContainer input:checked").forEach(checkbox => {
        selectedPermissions.push(checkbox.value);
    });

    if (!roleName || selectedPermissions.length === 0) {
        alert("Please enter role name and select at least one permission.");
        return;
    }

    if (window.editingRoleId) {
        // Editing an existing role
        const role = roles.find(r => r.id === window.editingRoleId);
        role.name = roleName;
        role.permissions = selectedPermissions;
        window.editingRoleId = null; // Clear the editing role ID
    } else {
        // Adding a new role
        const newRoleId = roles.length ? roles[roles.length - 1].id + 1 : 1;
        roles.push({ id: newRoleId, name: roleName, permissions: selectedPermissions });
    }

    closeRoleModal();
    renderRoleTable();
}

// Delete Role
function deleteRole(roleId) {
    roles = roles.filter(role => role.id !== roleId);
    renderRoleTable();
}

// Close Role Modal
function closeRoleModal() {
    document.getElementById("roleModal").style.display = "none";
}

// Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
}

// Sidebar Toggle for Responsive Design
function toggleSidebar() {
    document.querySelector('.sidebar').classList.toggle('active');
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
        document.body.classList.add('dark-mode');
    }
    renderUserTable();
    renderRoleTable();
});


