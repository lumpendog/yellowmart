import { useEffect, useState } from 'react';
import API from '../api';
import httpService from '../services/http.service';

const useMockData = () => {
  const statusConst = {
    idle: 'Not stated',
    pending: 'In progress',
    success: 'Ready',
    error: 'Error occur'
  };
  const { furniture, categories } = API;
  const totalCount =
    furniture.furniture.length + categories.categoriesArray.length;

  const [status, setStatus] = useState(statusConst.idle);
  const [count, setCount] = useState(0);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  const incrementCount = () => {
    setCount((prevState) => prevState + 1);
  };

  const updateProgress = () => {
    if (count !== 0 && status === statusConst.idle) {
      setStatus(statusConst.pending);
    }
    const newProgress = Math.floor((count / totalCount) * 100);
    if (newProgress > progress) {
      setProgress(newProgress);
    }
    if (progress === 100) {
      setStatus(statusConst.success);
    }
  };

  useEffect(() => {
    updateProgress();
  }, [count]);

  const initialize = async () => {
    try {
      for (const item of categories.categoriesArray) {
        await httpService.put('category/' + item._id, item);
        incrementCount();
      }
      for (const item of furniture.furniture) {
        const newItem = { ...item, category: item.category._id };
        await httpService.put('furniture/' + item._id, newItem);
        incrementCount();
      }
    } catch (error) {
      setError(error);
      setStatus(statusConst.error);
    }
  };

  return { status, progress, error, initialize };
};

export default useMockData;
