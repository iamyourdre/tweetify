import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast';
import SearchBar from './SearchBar'
import useGetUsers from '../../../hooks/useGetUsers';
import SearchResult from './SearchResult';

const Modal = () => {
  const [search, setSearch] = useState('');
  const [result, setResult] = useState([]);
  const { users, loading } = useGetUsers(search);

  useEffect(() => {
    if (!search) {
      setResult([]);
      return;
    }
    const foundUsers = users.filter(user => 
      user.username.toLowerCase().includes(search.toLowerCase()) || 
      user.fullName.toLowerCase().includes(search.toLowerCase())
    );
    if (foundUsers.length > 0) {
      setResult(foundUsers);
    } else {
      setResult([]);
    }
  }, [search, users]);

  return (
    <dialog id="new_chat_modal" className="modal">
      <div className="modal-box flex flex-col gap-4">
        <p className='text-xl font-bold'>Send Message to:</p>
        <SearchBar search={search} setSearch={setSearch} />
        <div className="flex flex-col">
          {result.length > 0 && (result.map(data => (
            <SearchResult key={data._id} data={data} />
          )))}
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button></button>
      </form>
    </dialog>
  )
}

export default Modal