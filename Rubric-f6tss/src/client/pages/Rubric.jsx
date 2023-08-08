import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getRubric from '@wasp/queries/getRubric';
import createQuestion from '@wasp/actions/createQuestion';
import sendRubric from '@wasp/actions/sendRubric';

export function Rubric() {
  const { rubricId } = useParams();
  const { data: rubric, isLoading, error } = useQuery(getRubric, { rubricId });
  const createQuestionFn = useAction(createQuestion);
  const sendRubricFn = useAction(sendRubric);
  const [newQuestionText, setNewQuestionText] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateQuestion = () => {
    createQuestionFn({
      text: newQuestionText,
      grade: '',
      comments: '',
      rubricId
    });
    setNewQuestionText('');
  };

  const handleSendRubric = () => {
    sendRubricFn({ rubricId });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Rubric: {rubric.title}</h1>

      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">Questions</h2>
        {rubric.questions.map((question) => (
          <div key={question.id} className="bg-gray-100 p-4 mb-4 rounded-lg">
            <h3 className="text-lg font-bold mb-2">{question.text}</h3>
            <p className="mb-2">Grade: {question.grade}</p>
            <p className="mb-2">Comments: {question.comments}</p>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">New Question</h2>
        <input
          type="text"
          placeholder="Question text"
          className="px-1 py-2 border rounded text-lg mb-2"
          value={newQuestionText}
          onChange={(e) => setNewQuestionText(e.target.value)}
        />
        <button
          onClick={handleCreateQuestion}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Question
        </button>
      </div>

      <button
        onClick={handleSendRubric}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Send Rubric
      </button>
    </div>
  );
}