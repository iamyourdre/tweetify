import React, { useEffect, useState } from 'react';
import { HiXMark } from 'react-icons/hi2';
import { useAuthContext } from '../contexts/AuthContext';
import { FaRegImage } from 'react-icons/fa6';
import Button from './Button';
import useCreatePost from '../hooks/useCreatePost';
import toast from 'react-hot-toast';
import { NavLink, useParams } from 'react-router-dom';

const CreateComment = () => {
  const { user } = useAuthContext();
  const { postId } = useParams();
  const [thread, setThread] = useState({ text: '', images: [] });
  const { createComment } = useCreatePost();

  const handleThreadChange = (newText) => {
    setThread({ ...thread, text: newText });
  };

  const handleFileChange = (newFiles) => {
    setThread({ ...thread, images: newFiles });
  };

  const handleReset = () => {
    setThread({ text: '', images: [] });
  };

  const handlePost = async () => {
    if (thread.text === '' && thread.images.length === 0) {
      document.getElementById('create_comment_modal').close();
      toast.error((t) => (
        <div className='z-50'>
          Couldn't post empty content.
        </div>
      ));
    } else {
      document.getElementById('create_comment_modal').close();
      toast.promise(
        createComment(thread, postId),
        {
          loading: 'Posting...',
          success: (data) => (
            <div>
              Comment created!&nbsp;
              <NavLink to={`/p/${data._id}`} className="underline font-bold">View comment</NavLink>
            </div>
          ),
          error: 'Something went wrong. Please try again.',
        }
      );
    }
    setThread({ text: '', images: [] });
  };

  return (
    <dialog id="create_comment_modal" className="modal max-h-screen">
      <div className="modal-box max-w-xl top-10 my-0 flex flex-col p-0">
        <div className="p-4 border-b border-gray-600">
          <div className="text-lg font-semibold text-center">Create Comment</div>
          <HiXMark onClick={() => document.getElementById('create_comment_modal').close()} className='text-xl cursor-pointer absolute top-0 left-0 my-5 mx-4'/>
        </div>
        <div className="flex flex-col overflow-auto p-4 gap-4">
          <Thread
            data={{ profilePic: user.profilePic }}
            text={thread.text}
            images={thread.images}
            setText={handleThreadChange}
            setImages={handleFileChange}
          />
        </div>
        <div className="border-t border-gray-600 p-4 flex">
          <button onClick={handleReset} className="text-red-600 font-semibold">Reset</button>
          <div className="flex-1 text-right">
            <Button text={'Send Comment'} onClick={handlePost}/>
          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop backdrop-blur-sm bg-white bg-opacity-20">
        <button></button>
      </form>
    </dialog>
  );
};


const CreateCommentSide = () => {
  const { user } = useAuthContext();
  const { postId } = useParams();
  const [thread, setThread] = useState({ text: '', images: [] });
  const { createComment } = useCreatePost();

  const handleThreadChange = (newText) => {
    setThread({ ...thread, text: newText });
  };

  const handleFileChange = (newFiles) => {
    setThread({ ...thread, images: newFiles });
  };

  const handleReset = () => {
    setThread({ text: '', images: [] });
  };

  const handlePost = async () => {
    if (thread.text === '' && thread.images.length === 0) {
      document.getElementById('create_comment_modal').close();
      toast.error((t) => (
        <div className='z-50'>
          Couldn't post empty content.
        </div>
      ));
    } else {
      document.getElementById('create_comment_modal').close();
      toast.promise(
        createComment(thread, postId),
        {
          loading: 'Posting...',
          success: (data) => (
            <div>
              Comment created!&nbsp;
              <NavLink to={`/p/${data._id}`} className="underline font-bold">View comment</NavLink>
            </div>
          ),
          error: 'Something went wrong. Please try again.',
        }
      );
    }
    setThread({ text: '', images: [] });
  };

  return (
    <div className="">
      <div className="top-10 my-0 flex flex-col p-0">
        <div className="p-4 py-5 border-b border-gray-700">
          <div className="text-lg font-semibold text-center">Create Comment</div>
          <HiXMark onClick={() => document.getElementById('create_comment_modal').close()} className='text-xl cursor-pointer absolute top-0 left-0 my-5 mx-4'/>
        </div>
        <div className="flex flex-col overflow-auto p-4 gap-4">
          <Thread
            data={{ profilePic: user.profilePic }}
            text={thread.text}
            images={thread.images}
            setText={handleThreadChange}
            setImages={handleFileChange}
          />
        </div>
        <div className="border-t border-gray-700 p-4 flex">
          <button onClick={handleReset} className="text-red-600 font-semibold">Reset</button>
          <div className="flex-1 text-right">
            <Button text={'Send Comment'} onClick={handlePost}/>
          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop backdrop-blur-sm bg-white bg-opacity-20">
        <button></button>
      </form>
    </div>
  );
};

const Thread = ({ data, text, images, setText, setImages }) => {
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
    <div className="flex gap-4">
      <div className="relative">
        <img className='w-10 h-10 border border-gray-700 rounded-full' src={data.profilePic} />
      </div>
      <div className="flex flex-col flex-1">
        <div className='relative'>
          <textarea
            className="textarea textarea-lg p-0 rounded-none border-0 focus:outline-none flex-1 leading-none overflow-auto mt-2 resize-none w-full"
            placeholder="What's on your mind?"
            onChange={handleTextChange}
            value={text}
            rows={6}
          ></textarea>
        </div>
        {images.length > 0 && <ImagePreview images={images} setImages={setImages} />}
        <div className='border-t border-gray-600 pt-4 pb-4 flex flex-row gap-2'>
          {/* image uploader */}
          <label className="form-control">
            <div className="label text-white border border-accent rounded-full hover:opacity-65 bg-accent p-3">
              <FaRegImage className='w-4 h-4 mx-auto' />
            </div>
            <input type="file" hidden onChange={handleFileChange} multiple />
          </label>
          <div className={`${text.length === 300 ? 'text-red-500 font-semibold' : ''} my-auto text-sm text-right text-gray-500 flex-1`}>{text.length}/{300}</div>
        </div>
      </div>
    </div>
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

export {CreateComment, CreateCommentSide};