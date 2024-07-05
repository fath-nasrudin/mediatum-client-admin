import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import { useAuth } from '../../auth/AuthProvider';

const getArticleItem = async (articleId, options = {}) => {
  const { token } = options;
  try {
    console.log('try to fetch article item...');
    const response = await fetch(
      `${import.meta.env.VITE_API_SERVER}/admin/articles/${articleId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      }
    );

    if (!response.ok) {
      console.log('response not ok');
      const resultError = await response.json();
      console.log({ resultError });
      throw new Error(resultError.message);
    }

    console.log('fetch article item success');
    const result = await response.json();
    console.log({ result });
    return { error: null, result: result };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { error, result: null };
  }
};

const editArticle = async (id, data, options = {}) => {
  const { token } = options;
  try {
    console.log('try to edit article...');
    const response = await fetch(
      `${import.meta.env.VITE_API_SERVER}/admin/articles/${id}`,
      {
        credentials: 'include',
        method: 'put',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      console.log('edit article response not ok');

      const errorResult = await response.json();
      console.log({ responseError: errorResult });
      throw new Error(errorResult.message);
    }

    console.log('SUCCESS_EDIT_ARTICLE');
    const result = await response.json();

    return { error: null, result };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { error, result: null };
  }
};

function ArticleEditPage() {
  const { articleName } = useParams();
  const { token } = useAuth();
  const articleId = articleName.split('-').pop();
  const [articleItem, setArticleItem] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [draft, setDraft] = useState({
    title: 'Untitled',
    content: '',
  });

  // fetch only on first render
  useEffect(() => {
    // cancel if the status is loading
    if (loading) return;

    const fetchData = async () => {
      setLoading(true);
      setError(false);
      const { error, result } = await getArticleItem(articleId, { token });

      if (error) return setError(error);

      setArticleItem(result);
      setDraft({ ...draft, title: result.title });
      setLoading(false);
    };
    fetchData().finally();
  }, []);

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
    setArticleItem({ ...articleItem, ...draft });

    // send the update to server
    const newData = { ...articleItem, ...draft };
    const fetchEditArticle = async () => {
      setLoading(true);
      setError(null);
      try {
        const { error, result } = await editArticle(articleId, newData, {
          token,
        });

        if (error) setError(error);
      } catch (error) {
        setError(error);
        console.error('ERROR:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEditArticle();
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
        initialValue={articleItem?.content || ''}
        onEditorChange={handleEditorChange}
      ></Editor>
      <button className="px-2 bg-blue-300 w-full" onClick={handleSaveClick}>
        Save
      </button>
    </div>
  );
}

export default ArticleEditPage;
