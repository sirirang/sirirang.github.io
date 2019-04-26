import React, { Component } from 'react';
import './App.css';
import Movie from './Movie'

class App extends Component {
    render(){
        const movies = [
            {
                title: "헝거게임",
                poster:"https://t1.daumcdn.net/cfile/tistory/246A924F52A41A0C33"
            },
            {
                title:"극한직업",
                poster: "https://www.rfa.org/korean/weekly_program/culture_talk/openculture-01292019140941.html/extreme_job_movie_b.jpg"
            },
            {
                title:"어벤져스",
                poster:"http://image2.megabox.co.kr/mop/poster/2019/1F/1175D3-40C3-4905-9A50-70457E37C875.large.jpg"
            },
        ]

        return (
            <div className="App">
                {movies.}
            </div>
        )
    }
}

export default App;
