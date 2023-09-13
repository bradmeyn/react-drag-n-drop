import { useState } from "react";
import { Link } from "react-router-dom";

import { Project } from "../types/types";
import Navbar from "../components/shared/Navbar/Navbar";
import NewProject from "../components/Project/NewProject/NewProject";

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  return (
    <div className="container mx-auto">
      <Navbar />
      <h1 className="font-extrabold text-slate-50 text-6xl mb-10">
        Your Projects
      </h1>
      <div className="flex flex-wrap gap-4 ">
        <NewProject />
        {projects?.map((project) => (
          <Link to={`/projects/${project.id}`}>
            <div className="p-3 rounded h-24 w-52 bg-sky-600 hover:bg-sky-600/80">
              <h2 className="text-white font-bold">{project.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Projects;
