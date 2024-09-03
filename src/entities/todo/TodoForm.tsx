import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAddTodoMutation, useUpdateTodoMutation, useGetTodosQuery } from '../../shared/api/todoApi.ts';
import { TextField, Button, Container, FormControlLabel, Checkbox } from '@mui/material';

export const TodoForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: todos } = useGetTodosQuery();
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (id) {
      const todo = todos.find(todo => todo.id === Number(id));
      if (todo) {
        setTitle(todo.title);
        setCompleted(todo.completed);
      }
    }
  }, [id, todos]);

  const handleSave = () => {
    if (id) {
      updateTodo({ id: Number(id), title, completed });
    } else {
      addTodo({ title, completed });
    }
    navigate('/');
  };

  return (
    <Container>
      <TextField
        label="Название"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <FormControlLabel
        control={<Checkbox checked={completed} onChange={() => setCompleted(!completed)} />}
        label="Выполнено"
      />
      <Button onClick={handleSave}>Сохранить</Button>
    </Container>
  );
};

