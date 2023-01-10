import Card from './Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-regular-svg-icons';
import NewCard from './NewCard';

const tasks = [
  {
    id: 1,
    summary: 'Come up with a project name',
  },
  {
    id: 2,
    summary: 'Something else',
  },
  {
    id: 3,
    summary: 'Come with with design',
  },
];

const List = ({ title }) => {
  return (
    <div className='p-3 bg-slate-600 rounded w-full'>
      <h2 className='p-3 font-bold underline-offset-1 text-slate-100 '>
        {title}
      </h2>
      <ol>
        {tasks.map((task) => (
          <Card {...task} />
        ))}
      </ol>
      <NewCard />
    </div>
  );
};

export default List;
