import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {HomePage} from './pages/HomePage.tsx';
import {TodoForm} from './entities/todo/TodoForm.tsx';

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create" element={<TodoForm />} />
      <Route path="/edit/:id" element={<TodoForm />} />
    </Routes>
  </Router>
);

export default App;
