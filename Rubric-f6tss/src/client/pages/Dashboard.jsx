import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getRubrics from '@wasp/queries/getRubrics';
import createRubric from '@wasp/actions/createRubric';

export function Dashboard() {
  const { data: rubrics, isLoading, error } = useQuery(getRubrics);
  const createRubricFn = useAction(createRubric);
  const [newRubricTitle, setNewRubricTitle] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateRubric = () => {
    createRubricFn({ title: newRubricTitle });
    setNewRubricTitle('');
  };

  return (
    <div className='p-4'>
      <div className='flex gap-x-4 py-5'>
        <input
          type='text'
          placeholder='New Rubric'
          className='px-1 py-2 border rounded text-lg'
          value={newRubricTitle}
          onChange={(e) => setNewRubricTitle(e.target.value)}
        />
        <button
          onClick={handleCreateRubric}
          className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded'
        >
          Add Rubric
        </button>
      </div>
      <div>
        {rubrics.map((rubric) => (
          <div
            key={rubric.id}
            className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'
          >
            <div>{rubric.title}</div>
            <div>{rubric.questions.length}Questions</div>
            <div>
              <Link
                to={`/rubric/${rubric.id}`}
                className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2'
              >
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}