import { useState } from 'react';
import Login from './components/Login';
import RegisterForm from './components/RegisterForm';
import { Route, Routes } from 'react-router-dom';
import QuestionnaireForm from './components/QuestionnaireForm';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/" element={<Login />} />
        <Route path="/questionnaire" element={<QuestionnaireForm />} />
      </Routes>
    </>
  );
}

export default App;
