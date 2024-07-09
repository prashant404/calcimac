import React, { useState } from 'react';
import './Calculator.css';
import Confetti from 'react-confetti';
import { create, all } from 'mathjs';

const math = create(all);

const Calculator = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');
    const [memory, setMemory] = useState(null);
    const [showConfetti, setShowConfetti] = useState(false);
    const [isRadian, setIsRadian] = useState(true);
    const [prevResult, setPrevResult] = useState('');

    const handleButtonClick = (value) => {
        if (value === '=') {
            calculateResult();
        } else if (value === 'C') {
            clearInput();
        } else if (value === 'mc') {
            clearMemory();
        } else if (value === 'm+') {
            addToMemory();
        } else if (value === 'm-') {
            subtractFromMemory();
        } else if (value === 'mr') {
            recallMemory();
        } else if (value === 'Rad') {
            toggleRadian();
        } else {
            handleInput(value);
        }
    };

    const handleInput = (value) => {
        if (result && !isNaN(value)) {
            setInput(prevResult + value);
            setResult('');
        } else {
            setInput(input + value);
        }
    };

    const clearInput = () => {
        setInput('');
        setResult('');
    };

    const clearMemory = () => {
        setMemory(null);
    };

    const addToMemory = () => {
        setMemory((memory || 0) + parseFloat(result || input));
    };

    const subtractFromMemory = () => {
        setMemory((memory || 0) - parseFloat(result || input));
    };

    const recallMemory = () => {
        setInput(input + memory);
    };

    const toggleRadian = () => {
        setIsRadian(!isRadian);
    };

    const calculateResult = () => {
        try {
            const expr = input
                .replace('×', '*')
                .replace('÷', '/')
                .replace('^', '**')
                .replace('π', 'pi')
                .replace('e', 'e')
                .replace('sin', `sin${isRadian ? '' : 'd'}`)
                .replace('cos', `cos${isRadian ? '' : 'd'}`)
                .replace('tan', `tan${isRadian ? '' : 'd'}`)
                .replace('sinh', 'sinh')
                .replace('cosh', 'cosh')
                .replace('tanh', 'tanh')
                .replace('ln', 'log')
                .replace('log', 'log10')
                .replace('Rand', `random()`);

            const evalResult = math.evaluate(expr).toString();

            if (input.includes('2') && input.includes('6')) {
                setShowConfetti(true);
                setTimeout(() => setShowConfetti(false), 3000);
            }

            setResult(evalResult);
            setPrevResult(evalResult);
            setInput('');
        } catch (e) {
            setResult('Error');
        }
    };

    return (
        <div className="calculator">
            <div className="display">
                <div className="input">{input || prevResult}</div>
                <div className="result">{result}</div>
            </div>
            <div className="buttons">
                {buttonValues.map((value) => (
                    <button
                        key={value}
                        onClick={() => handleButtonClick(value)}
                        className={`${value === '0' ? 'wide' : ''} ${operators.includes(value) ? 'operator vertical-operator' : ''}`}
                    >
                        {value}
                    </button>
                ))}
            </div>
            {showConfetti && <Confetti />}
        </div>
    );
};

const buttonValues = [
    '(', ')', 'mc', 'm+', 'm-', 'mr', 'C', '+/-', '%',
    '7', '8', '9', '÷',
    '4', '5', '6', '×',
    '1', '2', '3', '−',
    '0', '.', '=', '+',
    '2nd', 'x²', 'x³', 'xʸ', 'eˣ', '10ˣ',
    '¹/x', '²√x', '³√x', 'ʸ√x', 'ln', 'log₁₀',
    'x!', 'sin', 'cos', 'tan', 'e', 'EE',
    'Rad', 'sinh', 'cosh', 'tanh', 'π', 'Rand'
];

const operators = ['+', '-', '×', '÷', '='];

export default Calculator;
