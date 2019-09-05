import React from 'react';

// import { Container } from './styles';

const MainPage = (props) => (
    <div>
        <button onClick={() => props.history.push('/secondary')}>
            Go to Todolist
        </button>
    </div>
);

export default MainPage;
