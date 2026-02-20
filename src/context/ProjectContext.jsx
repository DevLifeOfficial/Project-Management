import { createContext, useState, useEffect, useContext } from "react";

const ProjectContext = createContext();

export function ProjectProvider({ children }) {
  
  const [project, setProject] = useState(() => {
    const saved = localStorage.getItem("projects");
    if (saved) {
      return JSON.parse(saved);
    }
    return [];
  });
  
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("projects");
    if (saved) {
      setProject(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(project));
  }, [project]);

  // Project Functions
  const addProject = (newProject) => {
    setProject((prev) => [...prev, newProject]);
  };

  const updateProject = (updatedProject) => {
    setProject((prev) =>
      prev.map((proj) =>
        proj.id === updatedProject.id ? updatedProject : proj,
      ),
    );
  };

  const deleteProject = (id) => {
    setProject((prev) => prev.filter((proj) => proj.id !== id));
  };


  // Task Functions
  const addTask = (projectId, newTask) =>{
    setProject((prev) =>
    prev.map((proj) =>
      proj.id === projectId
        ? { ...proj, tasks: [...proj.tasks, newTask]}
        : proj,
     ),
    )}

  const updateTask = (projectId, updateTask) =>{
    setProject((prev) =>
    prev.map((proj) =>
      proj.id === projectId
        ? { ...proj, tasks: proj.tasks.map((task) => task.id === updateTask.id ? updateTask : task)}
        : proj,
     ),
    )}

  const deleteTask = (projectId, taskId) =>{
    setProject((prev) =>
    prev.map((proj) =>
      proj.id === projectId
        ? { ...proj, tasks: proj.tasks.filter((task) => task.id !== taskId)}
        : proj,
      ),
    )}

  return (
    <ProjectContext.Provider
      value={{
        project,
        setProject,
        addProject,
        selectedProjectId,
        setSelectedProjectId,
        deleteProject,
        updateProject,
        addTask,
        updateTask,
        deleteTask
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export const useProject = () => useContext(ProjectContext);
