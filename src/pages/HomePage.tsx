import React from 'react';
import {TodoList} from '../entities/todo/TodoList.tsx';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Button onClick={() => navigate('/create')}>Создать задачу</Button>
      <TodoList />
    </div>
  );
};


