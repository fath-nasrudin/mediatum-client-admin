import { useEffect, useState } from 'react';
import { useAuth } from '../../auth/AuthProvider';
import { Link } from 'react-router-dom';

const getArticlelist = async (options = {}) => {
  const { token } = options;
  try {
    console.log('try to fetch article list...');
    const response = await fetch(`${'http://localhost:3000'}/admin/articles`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      console.log('response not ok');
      const resultError = await response.json();
      console.log({ resultError });
      throw new Error(resultError.message);
    }

    console.log('fetch articlelist success');
    const result = await response.json();
    console.log({ result });
    return { error: null, result: result };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { error, result: null };
  }
};

function ArticleListPage() {
  const [articleList, setArticleList] = useState(null);
  const [error, setError] = useState(null);
  const { token } = useAuth();
  console.log({ token });

  // fetch articlelist
  useEffect(() => {
    setError(null);
    const fetchArticlelist = async () => {
      const { result, error } = await getArticlelist({ token });

      if (error) setError(error);

      setArticleList(result);
    };
    fetchArticlelist();
  }, []);

  // create articlename
  const generateArticleName = (title, id) => {
    return title.split(' ').join('-') + '-' + id;
  };

  return (
    <div className="p-4">
      <table className="w-full">
        <tbody>
          {articleList?.items?.map((articleItem) => (
            <tr key={articleItem._id} className="ring-1 p-2">
              <td className="ring-1 px-2 flex gap-2">
                <Link
                  to={`/articles/${generateArticleName(
                    articleItem.title,
                    articleItem._id
                  )}`}
                >
                  <button className="px-2 ring-1 rounded-md bg-blue-300">
                    Edit
                  </button>
                </Link>
                <Link
                  to={`/articles/${generateArticleName(
                    articleItem.title,
                    articleItem._id
                  )}/delete`}
                >
                  <button className="px-2 ring-1 rounded-md bg-red-300">
                    Delete
                  </button>
                </Link>
              </td>
              <td className="ring-1 px-2">{articleItem.title}</td>
              <td className="ring-1 px-2">
                {new Date(articleItem.updated_at).toLocaleDateString('id-ID')}
              </td>
              <td className="ring-1 px-2">
                {articleItem.is_published ? (
                  <p className="px-2 text-green-600">published</p>
                ) : (
                  <p className="px-2 text-red-600">draft</p>
                )}
              </td>
              <td>
                {articleItem.is_published ? (
                  <p className="ring-1 ring-gray-500 px-2 rounded-md flex justify-center ">
                    Unpublish
                  </p>
                ) : (
                  <p className="ring-1 ring-gray-500 px-2 rounded-md flex justify-center">
                    publish
                  </p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ArticleListPage;
