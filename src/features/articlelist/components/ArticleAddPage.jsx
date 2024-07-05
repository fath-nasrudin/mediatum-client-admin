import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import { useAuth } from '../../auth/AuthProvider';

const fetchPostArticle = async (data, options = {}) => {
  const { token } = options;
  try {
    console.log('try to add article...');
    const response = await fetch(
      `${import.meta.env.VITE_API_SERVER}/admin/articles`,
      {
        credentials: 'include',
        method: 'post',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      console.log('add article response not ok');

      const errorResult = await response.json();
      console.log({ responseError: errorResult });
      throw new Error(errorResult.message);
    }

    console.log('SUCCESS_ADD_ARTICLE');
    const result = await response.json();

    return { error: null, result };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { error, result: null };
  }
};

function ArticleAddPage() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [draft, setDraft] = useState({
    title: 'Untitled',
    content: '',
  });

  const handleTitleChange = (e) => {
    setDraft({ ...draft, title: e.target.value });
  };

  const handleEditorChange = (content, editor) => {
    setDraft({ ...draft, content });
  };

  const handleSaveClick = (e) => {
    e.preventDefault();

    // reset error
    setError(null);

    // update the setArticle with the new data

    // send the update to server
    const newData = { ...draft };
    const createArticle = async () => {
      setLoading(true);
      setError(null);
      try {
        const { error, result } = await fetchPostArticle(newData, {
          token,
        });

        if (error) setError(error);

        if (result) navigate('/articles');
      } catch (error) {
        setError(error);
        console.error('ERROR:', error);
      } finally {
        setLoading(false);
      }
    };
    createArticle();
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4 mx-auto max-w-screen-lg ">
      {error ? <p className="text-red-600">Error: {error.message}</p> : ''}
      <input
        className="w-full overflow-auto text-2xl font-semibold"
        type="text"
        value={draft.title}
        onChange={handleTitleChange}
      />
      <Editor
        apiKey={import.meta.env.VITE_TINYMCE_APIKEY}
        onEditorChange={handleEditorChange}
        init={{ placeholder: 'write a post' }}
      ></Editor>
      <button className="px-2 bg-blue-300 w-full" onClick={handleSaveClick}>
        Save
      </button>
    </div>
  );
}

export default ArticleAddPage;
