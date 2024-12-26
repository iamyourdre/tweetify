import React, { useEffect, useState } from 'react';
import { HiMiniPlus, HiXMark } from 'react-icons/hi2';
import { useAuthContext } from '../contexts/AuthContext';
import { FaRegImage } from 'react-icons/fa6';
import Button from './Button';
import useCreatePost from '../hooks/useCreatePost';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';

const CreatePost = () => {
  const { user } = useAuthContext();
  const [threads, setThreads] = useState([{ text: '', images: [] }]);
  const [activeThreadIndex, setActiveThreadIndex] = useState(0);
  const { createMultiplePosts } = useCreatePost();

  useEffect(() => {
  }, [threads]);

  const handleAddThread = () => {
    setThreads([...threads, { text: '', images: [] }]);
  };

  const handleThreadChange = (index, newText) => {
    const newThreads = threads.map((thread, i) => (i === index ? { ...thread, text: newText } : thread));
    setThreads(newThreads);
  };

  const handleFileChange = (index, newFiles) => {
    const newThreads = threads.map((thread, i) => (i === index ? { ...thread, images: newFiles } : thread));
    setThreads(newThreads);
  };

  const handleRemoveThread = (index) => {
    const newThreads = threads.filter((_, i) => i !== index);
    setThreads(newThreads);
    if (activeThreadIndex === index) {
      setActiveThreadIndex(index-1===-1 ? 0 : index-1);
    }
  };

  const handleReset = () => {
    setThreads([{ text: '', images: [] }]);
    setActiveThreadIndex(0);
  };

  const handlePost = async () => {
    if (threads[0].text === '' && threads[0].images.length === 0) {
      document.getElementById('create_post_modal').close();
      toast.error((t) => (
        <div className='z-50'>
          Couldn't post empty content.
        </div>
      ));
    } else {
      document.getElementById('create_post_modal').close();
      toast.promise(
        createMultiplePosts(threads),
        {
          loading: 'Posting...',
          success: (data) => (
            <div>
              Post created!&nbsp;
              <NavLink to={`/p/${data._id}`} className="underline font-bold">View post</NavLink>
            </div>
          ),
          error: 'Something went wrong. Please try again.',
        }
      );
    }
    setThreads([{ text: '', images: [] }]);
    setActiveThreadIndex(0);
  };

  return (
    <dialog id="create_post_modal" className="modal max-h-screen">
      <div className="modal-box max-w-xl top-10 my-0 flex flex-col p-0">
        <div className="p-4 border-b border-gray-600">
          <HiXMark onClick={() => document.getElementById('create_post_modal').close()} className='text-xl cursor-pointer' />
        </div>
        <div className="flex flex-col overflow-auto p-4 gap-4">
          {threads.map((thread, index) => (
            <Thread
              key={index}
              data={{ profilePic: user.profilePic }}
              text={thread.text}
              images={thread.images}
              setText={(newText) => handleThreadChange(index, newText)}
              setImages={(newFiles) => handleFileChange(index, newFiles)}
              isActive={activeThreadIndex === index}
              onFocus={() => setActiveThreadIndex(index)}
              onRemove={() => handleRemoveThread(index)}
              index={index}
              handleAddThread={handleAddThread}
            />
          ))}
        </div>
        <div className="border-t border-gray-600 p-4 flex">
          <button onClick={handleReset} className="text-red-600 font-semibold">Reset</button>
          <div className="flex-1 text-right">
            <Button text={'Post All'} onClick={handlePost}/>
          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop backdrop-blur-sm bg-white bg-opacity-20">
        <button></button>
      </form>
    </dialog>
  );
};

const Thread = ({ data, text, images, setText, setImages, isActive, onFocus, onRemove, index, handleAddThread }) => {

  const [threadImages, setThreadImages] = useState([]);

  const handleTextChange = (e) => {
    if (e.target.value.length <= 300) {
      setText(e.target.value);
    }
  };
  
  const handleFileChange = (e) => {
    setThreadImages(images);
    const newFiles = Array.from(e.target.files).slice(0, 4 - images.length);
    newFiles.forEach((file) => {
      if (file.type.startsWith('image/')) {
        setThreadImages((prevImages) => [...prevImages, file]);
      }
    });
  };
  
  useEffect(() => {
    setImages(threadImages);
  }, [threadImages]);

  return (
    <>
    <div className={`flex gap-4 ${!isActive ? 'opacity-30' : ''}`} onClick={onFocus}>
      <div className="relative">
        <img className='w-10 h-10 border border-gray-700 rounded-full' src={data.profilePic} />
      </div>
      <div className="flex flex-col flex-1">
        <div className='relative'>
          <textarea
            className="textarea textarea-lg p-0 rounded-none border-0 focus:outline-none flex-1 leading-none overflow-auto mt-2 resize-none w-full"
            placeholder={index > 0 ? "Add more post" : "What's on your mind?"}
            onChange={handleTextChange}
            value={text}
            rows={isActive ? 6 : 1}
          ></textarea>
          {isActive && !text && index > 0 && (
            <HiXMark onClick={onRemove} className='text-xl cursor-pointer absolute right-0 top-0' />
          )}
        </div>
        {images.length > 0 && <ImagePreview images={images} setImages={setImages} />}
        {isActive && (
          <div className='border-t border-gray-600 pt-4 pb-4 flex flex-row gap-2'>
            <button onClick={handleAddThread} className="text-accent border border-gray-500 p-2 rounded-full hover:bg-gray-700 transition-all">
              <HiMiniPlus className='w-6 h-6 mx-auto'/>
            </button>
            {/* image uploader */}
            <label className="form-control">
              <div className="label text-white border border-accent rounded-full hover:opacity-65 bg-accent p-3">
                <FaRegImage className='w-4 h-4 mx-auto' />
              </div>
              <input type="file" hidden onChange={handleFileChange} multiple />
            </label>
            <div className={`${text.length === 300 ? 'text-red-500 font-semibold' : ''} my-auto text-sm text-right text-gray-500 flex-1`}>{text.length}/{300}</div>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

const ImagePreview = ({ images, setImages }) => {
  const handleRemoveImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  return (
    <div className="grid grid-cols-2 gap-2 mt-2">
      {images.map((file, index) => (
        <div key={index} className="relative group">
          <img src={URL.createObjectURL(file)} alt={`preview-${index}`} className="w-full h-32 object-cover rounded" />
          <HiXMark
            onClick={() => handleRemoveImage(index)}
            className="text-xl cursor-pointer absolute top-1 right-1 text-white bg-black bg-opacity-50 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
          />
        </div>
      ))}
    </div>
  );
};

export default CreatePost;