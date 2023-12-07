import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '@/lib/utils';

const CommentCount = ({ articleId }) => {
  const [commentCount, setCommentCount] = useState(0);

  const fetchCommentCount = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/articles/${articleId}/comments`
      );

      setCommentCount(response.data.length);
    } catch (error) {
      console.error('Hiba a kommentek lekérdezésekor:', error);
    }
  };

  useEffect(() => {
    fetchCommentCount();
  }, [articleId]);

  return (
    <p className='text-sm font-medium text-gray-900'>
      Kommentek száma: {commentCount}
    </p>
  );
};

export default CommentCount;
