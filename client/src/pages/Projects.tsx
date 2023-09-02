import { useState } from "react";
import { Link } from "react-router-dom";

import { Project } from "../types/types";

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  return (
    <div className="text-start p-3 container mx-auto">
      <h1 className="font-extrabold text-slate-50 text-2xl mb-3">
        Your Projects
      </h1>
      <div className="flex flex-wrap gap-4 ">
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
