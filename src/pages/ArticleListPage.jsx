import React, { useState } from 'react';

const articleListInit = () => ({
  limitNumber: 0,
  totalItems: 14,
  totalPages: 1,
  currentPage: 1,
  items: [
    {
      _id: '667d0854e58fb977cfaf30bc',
      title: 'Manfaat Mempelajari Bahasa Pemrograman',
      user: {
        _id: '667d0853e58fb977cfaf30ba',
        first_name: 'admin',
        last_name: 'admin',
        username: 'admin',
      },
      is_published: true,
      created_at: '2024-06-27T06:36:04.090Z',
      updated_at: '2024-06-27T06:36:04.090Z',
      __v: 0,
    },
    {
      _id: '667d0854e58fb977cfaf30be',
      title: 'Bagaimana cara mendapat 1000 tahun extra live span',
      user: {
        _id: '667d0853e58fb977cfaf30ba',
        first_name: 'admin',
        last_name: 'admin',
        username: 'admin',
      },
      is_published: true,
      created_at: '2024-06-27T06:36:04.096Z',
      updated_at: '2024-06-27T06:36:04.096Z',
      __v: 0,
    },
    {
      _id: '667d0854e58fb977cfaf30c0',
      title: 'content 3',
      user: {
        _id: '667d0853e58fb977cfaf30ba',
        first_name: 'admin',
        last_name: 'admin',
        username: 'admin',
      },
      is_published: false,
      created_at: '2024-06-27T06:36:04.107Z',
      updated_at: '2024-06-27T06:36:04.107Z',
      __v: 0,
    },
    {
      _id: '667d0854e58fb977cfaf30c2',
      title: 'content 4',
      user: {
        _id: '667d0853e58fb977cfaf30ba',
        first_name: 'admin',
        last_name: 'admin',
        username: 'admin',
      },
      is_published: false,
      created_at: '2024-06-27T06:36:04.110Z',
      updated_at: '2024-06-27T06:36:04.110Z',
      __v: 0,
    },
    {
      _id: '667d0854e58fb977cfaf30c4',
      title: 'content 5',
      user: {
        _id: '667d0853e58fb977cfaf30ba',
        first_name: 'admin',
        last_name: 'admin',
        username: 'admin',
      },
      is_published: false,
      created_at: '2024-06-27T06:36:04.116Z',
      updated_at: '2024-06-27T06:36:04.116Z',
      __v: 0,
    },
    {
      _id: '667d0854e58fb977cfaf30c6',
      title: 'content 6',
      user: {
        _id: '667d0853e58fb977cfaf30ba',
        first_name: 'admin',
        last_name: 'admin',
        username: 'admin',
      },
      is_published: false,
      created_at: '2024-06-27T06:36:04.122Z',
      updated_at: '2024-06-27T06:36:04.122Z',
      __v: 0,
    },
    {
      _id: '667d0854e58fb977cfaf30c8',
      title: 'content 7',
      user: {
        _id: '667d0853e58fb977cfaf30ba',
        first_name: 'admin',
        last_name: 'admin',
        username: 'admin',
      },
      is_published: false,
      created_at: '2024-06-27T06:36:04.128Z',
      updated_at: '2024-06-27T06:36:04.128Z',
      __v: 0,
    },
    {
      _id: '667d0854e58fb977cfaf30ca',
      title: 'content 8',
      user: {
        _id: '667d0853e58fb977cfaf30ba',
        first_name: 'admin',
        last_name: 'admin',
        username: 'admin',
      },
      is_published: false,
      created_at: '2024-06-27T06:36:04.134Z',
      updated_at: '2024-06-27T06:36:04.134Z',
      __v: 0,
    },
    {
      _id: '667d0854e58fb977cfaf30cc',
      title: 'content 9',
      user: {
        _id: '667d0853e58fb977cfaf30ba',
        first_name: 'admin',
        last_name: 'admin',
        username: 'admin',
      },
      is_published: false,
      created_at: '2024-06-27T06:36:04.144Z',
      updated_at: '2024-06-27T06:36:04.144Z',
      __v: 0,
    },
    {
      _id: '667d0854e58fb977cfaf30ce',
      title: 'content 10',
      user: {
        _id: '667d0853e58fb977cfaf30ba',
        first_name: 'admin',
        last_name: 'admin',
        username: 'admin',
      },
      is_published: false,
      created_at: '2024-06-27T06:36:04.148Z',
      updated_at: '2024-06-27T06:36:04.148Z',
      __v: 0,
    },
    {
      _id: '667d0854e58fb977cfaf30d0',
      title: 'content 11',
      user: {
        _id: '667d0853e58fb977cfaf30ba',
        first_name: 'admin',
        last_name: 'admin',
        username: 'admin',
      },
      is_published: false,
      created_at: '2024-06-27T06:36:04.155Z',
      updated_at: '2024-06-27T06:36:04.155Z',
      __v: 0,
    },
    {
      _id: '667d0854e58fb977cfaf30d2',
      title: 'content 12',
      user: {
        _id: '667d0853e58fb977cfaf30ba',
        first_name: 'admin',
        last_name: 'admin',
        username: 'admin',
      },
      is_published: false,
      created_at: '2024-06-27T06:36:04.162Z',
      updated_at: '2024-06-27T06:36:04.162Z',
      __v: 0,
    },
    {
      _id: '667d0854e58fb977cfaf30d4',
      title: 'content 13',
      user: {
        _id: '667d0853e58fb977cfaf30ba',
        first_name: 'admin',
        last_name: 'admin',
        username: 'admin',
      },
      is_published: false,
      created_at: '2024-06-27T06:36:04.171Z',
      updated_at: '2024-06-27T06:36:04.171Z',
      __v: 0,
    },
    {
      _id: '667d0854e58fb977cfaf30d6',
      title: 'content 14',
      user: {
        _id: '667d0853e58fb977cfaf30ba',
        first_name: 'admin',
        last_name: 'admin',
        username: 'admin',
      },
      is_published: false,
      created_at: '2024-06-27T06:36:04.178Z',
      updated_at: '2024-06-27T06:36:04.178Z',
      __v: 0,
    },
  ],
});

function ArticleListPage() {
  const [articleList, setArticleList] = useState(articleListInit);
  return (
    <div className="p-4">
      <table className="w-full">
        <tbody>
          {articleList.items.map((articleItem) => (
            <tr className="ring-1 p-2">
              <td className="ring-1 px-2 flex gap-2">
                <button className="px-2 ring-1 rounded-md bg-red-300">
                  Edit
                </button>
                <button className="px-2 ring-1 rounded-md bg-blue-300">
                  Delete
                </button>
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
