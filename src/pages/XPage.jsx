import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import PostTypeSelector from '../components/PostTypeSelector';
import TextTweetForm from '../components/forms/TextTweetForm';
import MediaTweetForm from '../components/forms/MediaTweetForm';
import ThreadForm from '../components/forms/ThreadForm';
import ThreadMediaForm from '../components/forms/ThreadMediaForm';

export default function XPage() {
  const [type, setType] = useState(null);
  return (
    <div>
      {!type ? (
        <PostTypeSelector onSelect={setType} />
      ) : (
        <div className="max-w-xl mx-auto py-6">
          {type === 'text' && <TextTweetForm />}
          {type === 'media' && <MediaTweetForm />}
          {type === 'thread' && <ThreadForm />}
          {type === 'threadMedia' && <ThreadMediaForm />}
        </div>
      )}
    </div>
  );
}