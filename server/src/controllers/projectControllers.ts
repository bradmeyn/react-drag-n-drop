import { Response, Request } from 'express';

const getProjects = async (req: Request, res: Response) => {
  res.json('All Projects');
};

export default getProjects;
