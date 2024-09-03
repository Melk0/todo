import React from 'react';
import { useGetTodosQuery, useDeleteTodoMutation } from '../../shared/api/todoApi.ts';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const TodoList: React.FC = () => {
  const { data: todos, error, isLoading } = useGetTodosQuery();
  const [deleteTodo] = useDeleteTodoMutation();
  const navigate = useNavigate();

  if (isLoading) return <div>Загрузка</div>;
  if (error) return <div>Ошибка</div>;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Название</TableCell>
            <TableCell>Выполнено</TableCell>
            <TableCell>Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todos.map(todo => (
            <TableRow key={todo.id}>
              <TableCell>{todo.title}</TableCell>
              <TableCell>{todo.completed ? 'Да' : 'Нет'}</TableCell>
              <TableCell>
                <Button onClick={() => navigate(`/edit/${todo.id}`)}>Изменить</Button>
                <Button onClick={() => deleteTodo(todo.id)}>Удалить</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

