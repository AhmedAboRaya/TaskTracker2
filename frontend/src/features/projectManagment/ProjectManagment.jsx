import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import ProjectCard from "./ProjectCard";
import { useSelector } from "react-redux";
import CreateProject from "./CreateProject";
import { motion } from "framer-motion";

function ProjectManagement() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const userId = Cookies.get("userId");

  const fetchUserProjects = async () => {
    try {
      if (userId) {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/projects/user/${userId}/projects`
        );
        setProjects(
          Array.isArray(response.data.projects) ? response.data.projects : []
        );
      }
    } catch (error) {
      console.error("Error fetching user projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleProjectDeleted = (projectId) => {
    setProjects(projects.filter((project) => project._id !== projectId)); 
  };

  useEffect(() => {
    fetchUserProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <section className="container mx-auto px-4">
      <h1 className={`text-xl font-bold mb-4 ${darkMode ? "text-dark-primary" : "text-light-primary"}`}>
        Project Management
      </h1>
      <CreateProject onProjectCreated={fetchUserProjects} />
      {loading ? (
        <div className="flex justify-center items-center">
          <span className="loading loading-ball loading-lg"></span> {/* Added your loader here */}
        </div>
      ) : projects.length === 0 ? (
        <p>No projects available.</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {projects.map((project) => (
            <motion.div
              key={project._id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard
                project={project}
                onProjectDeleted={handleProjectDeleted}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}

export default ProjectManagement;
