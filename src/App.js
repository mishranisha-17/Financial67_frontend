import logo from './logo.svg';
import './App.css';

import Button from '@mui/material/Button';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import BalanceSheetForm from './components/pages/BalanceSheet/BalanceSheetForm';
import CashflowStatement from './components/pages/CashflowStatement/CashFlowForm';
import Company from './components/pages/Company Model/Company';


function App() {
  return (
    <div>
      <BalanceSheetForm></BalanceSheetForm>
      <Company></Company>
    </div>
  );
}

export default App;
