import { CSSProperties, ReactNode, useState } from 'react';
import Project from './Project';

interface ProjectItem {
  id: number;
  content: ReactNode;
  style?: CSSProperties;
  shadowColor?: string;
  cubeColor?: string;
}

const Projects = () => {
  const [openProjectId, setOpenProjectId] = useState(-1);
  const projects: ProjectItem[] = [
    {
      id: 1,
      content: (
        <>
          <h1>Project 1</h1>
          <p>This is my first project.</p>
        </>
      ),
      style: {
        transform: 'translateX(-400px)',
      },
      cubeColor: '#f7a',
      shadowColor: '#f7d',
    },
    {
      id: 2,
      content: (
        <>
          <h1>Project 2</h1>
          <p>This is my second project.</p>
        </>
      ),
      cubeColor: '#a7a',
      shadowColor: '#a7d',
    },
    {
      id: 3,
      content: (
        <>
          <h1>Project 3</h1>
          <p>This is my third project.</p>
        </>
      ),
      style: {
        transform: 'translateX(400px)',
      },
      cubeColor: '#17a',
      shadowColor: '#17d',
    },
    {
      id: 4,
      content: (
        <>
          <h1>Project 4</h1>
          <p>This is my forth project.</p>
        </>
      ),
      style: {
        transform: 'translateX(800px)',
      },
      cubeColor: '#67a',
      shadowColor: '#67d',
    },
  ];

  console.log('openProjectId', openProjectId);

  return (
    <div>
      {projects.map((p, idx) => (
        <Project
          key={idx}
          {...p}
          openProjectId={openProjectId}
          onClick={(id) => setOpenProjectId(id)}
        />
      ))}
    </div>
  );
};

export default Projects;
