const apis = {
    // Task-related APIs
    getAllTasks: ["/api/Tasks", "GET"],
    createTask: ["/api/Tasks", "POST"],
    deleteTask: (id) => ["/api/Tasks/" + id, "DELETE"],
    updateTask: (id) => ["/api/Tasks/" + id, "PUT"],
    getUserTasks: (userId) => ["/api/Users/" + userId + "/tasks", "GET"],
    
    // User-related APIs
    login: "/api/Users/login",
    user: "/api/Users/register",
    updateUser: (userId) => ["/api/Users/" + userId],

    // Project-related APIs
    getProjectMembers: (projectId) => ["/api/Projects/" + projectId + "/members", "GET"],
    getUserProjects: (userId) => ["/api/Users/" + userId + "/projects", "GET"],
    createProject: ["/api/Projects/create", "POST"],
    assignRole: ["/api/Projects/assign-role", "POST"],
    addMissionToProject: (projectId) => ["/api/Projects/" + projectId + "/missions", "POST"],
    updateRole: ["/api/Projects/update-role", "PUT"],
    removeMember: ["/api/Projects/remove-member", "DELETE"],
    deleteProject: (projectId) => ["/api/Projects/" + projectId, "DELETE"],
};

const localUrl = "http://localhost:5000"
const domainUrl = "https://depi-final-project-backend.vercel.app";

export const domain = domainUrl;
