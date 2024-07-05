import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';
import React, { useState } from 'react';

const fetchDeleteArticle = async (id, options = {}) => {
  const { token } = options;
  try {
    console.log('deleting article...');
    const response = await fetch(
      `${import.meta.env.VITE_API_SERVER}/admin/articles/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        method: 'delete',
        credentials: 'include',
      }
    );

    if (!response.ok) {
      console.log('response not ok');
      const resultError = await response.json();
      console.log({ resultError });
      throw new Error(resultError.message);
    }

    console.log('delete success');
    console.log({ result: true });
    return { error: null, result: true };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { error, result: null };
  }
};

function ArticleDeletePage() {
  const navigate = useNavigate();
  const { articleName } = useParams();
  const articleNameArray = articleName?.split('-');
  const articleId = articleNameArray.pop();
  const articleTitle = articleNameArray.join(' ');
  const { token } = useAuth();
  const [error, setError] = useState(null);
  const handleDeleteClick = async (e) => {
    e.preventDefault();

    // set error
    setError(null);

    const { error, result } = await fetchDeleteArticle(articleId, { token });
    if (error) return setError(error);

    navigate('/articles');
  };

  const errorContent = (
    <div className="ring-1 ring-gray-500 m-4 p-4 rounded-md flex flex-col gap-4 items-center">
      <p className="">{error.message}</p>
      <div className="flex gap-8">
        <Link to="/articles">
          <button className=" px-8 py-1 rounded-md bg-gray-300 w-fit">
            Go to Article List
          </button>
        </Link>
      </div>
    </div>
  );

  const mainContent = (
    <div className="ring-1 ring-gray-500 m-4 p-4 rounded-md flex flex-col gap-4 items-center">
      <div className="text-center">
        <h1 className="text-xl font-semibold">{articleTitle}</h1>
        <h2 className="text-sm font-semibold text-gray-500">{articleId}</h2>
      </div>
      <p className="">
        Are you sure want to delete this article? This action cannot be undone
      </p>
      <div className="flex gap-8">
        <Link to="/articles">
          <button className=" px-8 rounded-md bg-gray-300 w-min">Cancel</button>
        </Link>
        <button
          className=" px-8 rounded-md bg-red-300 w-min"
          onClick={handleDeleteClick}
        >
          Delete
        </button>
      </div>
    </div>
  );

  return error ? errorContent : mainContent;
}

export default ArticleDeletePage;
