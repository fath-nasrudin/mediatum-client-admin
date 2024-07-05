import React from 'react';
import { useParams } from 'react-router-dom';

function ArticleEditPage() {
  const { articleName } = useParams();
  return <div>{articleName}</div>;
}

export default ArticleEditPage;
