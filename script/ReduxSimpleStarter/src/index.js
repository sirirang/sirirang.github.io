import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar'

const API_KEY = `AIzaSyD3SA4fD_wNS-dvl7syIcHnPurcsy9twao`;

// Create a new component 
// This componen should produce some html


// 기존 자바스크립트
// const App = function () {
//     return <div>Hi!</div>;
// }

//Arrow function 
const App = () => {
    return (
        <div>
            <SearchBar />
        </div>
    );
    
}

//컴포넌트 제작시 하나의 파일에 하나의 컴포넌트 제작

//컴포넌트 페이지 보이도록 하기
ReactDOM.render(<App />,document.querySelector(`.container`));