// components/TextEditor.js
import React from 'react';

const TextEditor = ({ content, onTextChange }) => {
  const handleInputChange = (event) => {
    const newContent = event.target.value;
    onTextChange(newContent);
  };

  return (
    <div className="text-editor">
      <textarea value={content} onChange={handleInputChange} />
    </div>
  );
};

export default TextEditor;