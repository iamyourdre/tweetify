import React, { useState } from 'react';
import { HiMiniPaperAirplane, HiOutlineDocumentPlus, HiXMark } from 'react-icons/hi2';

const Input = () => {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);

  const handleSend = () => {
    // Handle send message logic here
    console.log('Message sent:', message);
    setMessage('');
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    console.log('File uploaded:', selectedFile);
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  return (
    <div className="border-t border-gray-700 p-2 flex flex-col gap-4">
      {/* file preview */}
      {file && (
      <div className='bg-base-200 rounded p-2'>
        <div className="flex items-center gap-2">
          {file.type.startsWith('image/') ? (
          <div className='flex line-clamp-1'>
            <img src={URL.createObjectURL(file)} alt="Preview" className="max-h-16 max-w-16 rounded mr-3" /> 
            <span className="my-auto">{file.name}</span>
          </div>
        ) : (
          <div className='flex'><HiOutlineDocumentPlus className='text-xl mr-2' /> {file.name}</div>
          )}
          <HiXMark className="text-xl cursor-pointer" onClick={handleRemoveFile} />
        </div>
      </div>
      )}
      <div className="flex flex-row gap-2">
        <label className="form-control">
          <div className="label rounded-full bg-gray-700 px-3.5 py-3.5">
            <HiOutlineDocumentPlus className='text-xl' />
          </div>
          <input type="file" onChange={handleFileChange} hidden/>
        </label>
        <div className="rounded-3xl bg-gray-700 px-4 py-3 flex-1">
          <div className="flex gap-3">
            <input
              type="text"
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              value={message}
              className="bg-transparent focus:outline-none flex-1"
            />
            <HiMiniPaperAirplane className='text-2xl'/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Input;