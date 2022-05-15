import React from 'react';
import './style.css';
import DynamicForm from './containers/dynamicForm';
import Container from '@mui/material/Container';

export default function App() {
  return (
    <Container className="parent-container" fixed>
      <h1>Dynamic Form</h1>
      <DynamicForm />
    </Container>
  );
}
