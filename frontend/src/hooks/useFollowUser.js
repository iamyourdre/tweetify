import { useState, useEffect } from "react";
import useAxios from "./useAxios";
import toast from "react-hot-toast";

const useFollowUser = (userId) => {
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchFollowing();
      fetchFollowers();
      checkIsFollowing();
    }
  }, [userId]);

  const fetchFollowing = async () => {
    setLoading(true);
    try {
      const res = await useAxios.get(`/users/following/${userId}`);
      console.log('Following:', res.data); // Debugging log
      setFollowing(res.data);
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchFollowers = async () => {
    setLoading(true);
    try {
      const res = await useAxios.get(`/users/followers/${userId}`);
      console.log('Followers:', res.data); // Debugging log
      setFollowers(res.data);
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  const checkIsFollowing = async () => {
    setLoading(true);
    try {
      const res = await useAxios.get(`/users/isFollowing/${userId}`);
      setIsFollowing(res.data.isFollowing);
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  const followUser = async () => {
    setLoading(true);
    try {
      await useAxios.post(`/users/follow/${userId}`);
      setIsFollowing(true);
      fetchFollowing();
      fetchFollowers();
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  const unfollowUser = async () => {
    setLoading(true);
    try {
      await useAxios.post(`/users/unfollow/${userId}`);
      setIsFollowing(false);
      fetchFollowing();
      fetchFollowers();
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  return { following, followers, isFollowing, loading, followUser, unfollowUser };
};

export default useFollowUser;