import React, { useState } from 'react';
import { HiMiniPaperAirplane, HiXMark } from 'react-icons/hi2';
import { FaRegImage } from "react-icons/fa6";
import useSendMessage from '../../../hooks/useSendMessage';
import useUpdateConversations from '../../../hooks/useUpdateConversations';

const Input = () => {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);
  const { loading, sendMessage } = useSendMessage();
  const { updateConversations } = useUpdateConversations();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message && !image) return;

    const formData = new FormData();
    if (message) formData.append('message', message);
    if (image) formData.append('image', image);

    await sendMessage(formData);
    setMessage('');
    setImage(null);
    updateConversations();
  };

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage.type.startsWith('image/')) {
      setImage(selectedImage);
    } else {
      alert('Please upload an image file');
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  return (
    <form className="border-t border-gray-700 p-2 flex flex-col gap-4" onSubmit={handleSubmit}>
      {/* image conversation */}
      {image && (
        <div className='bg-base-200 rounded p-2'>
          <div className="flex items-center gap-2">
            <div className='flex line-clamp-1'>
              <img src={URL.createObjectURL(image)} alt="Conversation" className="max-h-16 max-w-16 rounded mr-3" />
              <span className="my-auto">{image.name}</span>
            </div>
            <HiXMark className="text-xl cursor-pointer" onClick={handleRemoveImage} />
          </div>
        </div>
      )}
      <div className="flex flex-row gap-2">
        <label className="form-control">
          <div className="label rounded-full bg-gray-700 px-3.5 py-3.5">
            <FaRegImage className='text-xl' />
          </div>
          <input type="file" onChange={handleImageChange} hidden />
        </label>
        <div className="rounded-3xl bg-gray-700 px-4 py-3 flex-1">
          <div className="flex gap-3">
            <input
              type="text"
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              value={message}
              className="bg-transparent focus:outline-none flex-1"
              autoFocus
            />
            <button type="submit">
              <HiMiniPaperAirplane className='text-xl' />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Input;