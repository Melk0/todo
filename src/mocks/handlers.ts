import { http, HttpResponse } from 'msw';

// Исходные данные для имитации
let todos = [
  { id: 1, title: 'Задача 1', completed: false },
  { id: 2, title: 'Задача 2', completed: true },
];

export const handlers = [
  // Обработка GET-запроса для получения списка задач
  http.get('/api/todos', async () => {
    return new HttpResponse(JSON.stringify(todos));
  }),

  // Обработка POST-запроса для добавления новой задачи
  http.post('/api/todos', async (info) => {
    const newTodo = await info.request.json() as { title: string; completed: boolean };
    const newTodoWithId = { id: Date.now(), ...newTodo }; // Генерация уникального ID
    todos.push(newTodoWithId);
    return  HttpResponse.json(newTodoWithId, {
      status: 201,
    })
  }),

  // Обработка PUT-запроса для обновления задачи
  http.put('/api/todos/:id', async (info) => {
    const { id } = info.params;
    const { title, completed } = await info.request.json() as { title: string; completed: boolean };

    const todoIndex = todos.findIndex(todo => todo.id === Number(id));
    if (todoIndex === -1) {
      return  HttpResponse.json('Задача не найдена', {
        status: 404,
      })
    }

    todos[todoIndex] = { id: Number(id), title, completed };
    return  HttpResponse.json(todos[todoIndex], {
      status: 200,
    })
  }),

  // Обработка DELETE-запроса 
  http.delete('/api/todos/:id', (info) => {
    const { id } = info.params;
    const todoIndex = todos.findIndex(todo => todo.id === Number(id));
    if (todoIndex === -1) {
      return  HttpResponse.json('Задача не найдена', {
        status: 200,
      })
    }

    todos.splice(todoIndex, 1);
    return  HttpResponse.json(todos[todoIndex], {
      status: 204,
    })
  }),
];
