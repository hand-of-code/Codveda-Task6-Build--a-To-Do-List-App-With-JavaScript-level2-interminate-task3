import { useState } from "react";
import "./App.css";

export default function App() {
  const [currentValue, setCurrentValue] = useState('');
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // Handle number input
  const handleNumber = (num) => {
    if (result !== null) {
      setCurrentValue(num);
      setExpression('');
      setResult(null);
    } else {
      setCurrentValue(currentValue + num);
    }
  };

  // Handle operator input
  const handleOperator = (op) => {
    if (currentValue === '' && expression === '') return;
    if (result !== null) {
      setExpression(result + ' ' + op);
      setCurrentValue('');
      setResult(null);
    } else if (currentValue !== '') {
      setExpression(expression + ' ' + currentValue + ' ' + op);
      setCurrentValue('');
    }
  };

  // Calculate expression
  const calculate = () => {
    if (currentValue === '' || expression === '') return;
    try {
      const fullExpression = expression + ' ' + currentValue;
      const calcResult = eval(fullExpression.replace(/×/g, '*').replace(/÷/g, '/'));
      const roundedResult = Math.round(calcResult * 100000000) / 100000000;
      setResult(roundedResult.toString());
      setHistory([{ expression: fullExpression + ' =', result: roundedResult }, ...history.slice(0, 9)]);
    } catch {
      setResult('Error');
    }
  };

  // Clear all
  const clear = () => {
    setCurrentValue('');
    setExpression('');
    setResult(null);
  };

  // Delete last digit
  const deleteLast = () => {
    if (result !== null) clear();
    else setCurrentValue(currentValue.slice(0, -1));
  };

  // Reuse history calculation
  const reuseCalculation = (calc) => {
    setCurrentValue(calc.result.toString());
    setExpression('');
    setResult(null);
    setShowHistory(false);
  };

  return (
    <div className="container">
      <h1>Calculator</h1>

      <div className="calculator">
        <div className="display">
          <div className="expression">{expression || '\u00A0'}</div>
          <div className="result">{result !== null ? result : currentValue || '0'}</div>
        </div>

        <div className="buttons">
          <button className="clear" onClick={clear}>Clear</button>
          <button className="delete" onClick={deleteLast}>Del</button>
          <button onClick={() => handleOperator('÷')}>÷</button>
          <button onClick={() => handleOperator('×')}>×</button>

          <button onClick={() => handleNumber('7')}>7</button>
          <button onClick={() => handleNumber('8')}>8</button>
          <button onClick={() => handleNumber('9')}>9</button>
          <button onClick={() => handleOperator('-')}>-</button>

          <button onClick={() => handleNumber('4')}>4</button>
          <button onClick={() => handleNumber('5')}>5</button>
          <button onClick={() => handleNumber('6')}>6</button>
          <button onClick={() => handleOperator('+')}>+</button>

          <button onClick={() => handleNumber('1')}>1</button>
          <button onClick={() => handleNumber('2')}>2</button>
          <button onClick={() => handleNumber('3')}>3</button>
          <button className="equal" onClick={calculate}>=</button>

          <button className="zero" onClick={() => handleNumber('0')}>0</button>
          <button onClick={() => handleNumber('.')}>.</button>
        </div>

        <button className="history-btn" onClick={() => setShowHistory(!showHistory)}>
          {showHistory ? "Hide History" : "Show History"} ({history.length})
        </button>

        {showHistory && (
          <div className="history">
            <h3>History</h3>
            {history.map((calc, i) => (
              <div key={i} className="history-item" onClick={() => reuseCalculation(calc)}>
                {calc.expression} {calc.result}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
