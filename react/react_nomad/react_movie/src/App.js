import React, { Component } from 'react';
import './App.css';
import MovieShow from './Movie';

const API_KEY = 'https://yts.am/api/v2/list_movies.json?sort_by=rating';

class App extends Component {
    // Render : componentWillMount() -> render() -> componentDidMount()
    // Update: componentWillReceiveProps() -> shouldComponentUpdate() -> componentWillUpdate ->
    // render() -> componentDidUpdate()

    //컴포넌트 안에 state가 바뀔때마다 render를 한다.

    //영화 API 불러오기 이전 코드
    // state = {}

    // componentDidMount(){
    //     setTimeout(() => {
    //         this.setState({
    //             movies : [
    //                 {   
    //                     title: "헝거게임",
    //                     poster:"https://t1.daumcdn.net/cfile/tistory/246A924F52A41A0C33"
    //                 },
    //                 {   
    //                     title:"극한직업",
    //                     poster: "https://www.rfa.org/korean/weekly_program/culture_talk/openculture-01292019140941.html/extreme_job_movie_b.jpg"
    //                 },
    //                 {
    //                     title:"어벤져스",
    //                     poster:"http://image2.megabox.co.kr/mop/poster/2019/1F/1175D3-40C3-4905-9A50-70457E37C875.large.jpg"
    //                 }
    //             ]
    //         })
    //     },3000);
    // }


    state = {}
    componentDidMount(){
        fetch(API_KEY)                        // fetch로 api 내용을 가져와라 
        .then(res =>console.log(res))// 위에 작업이 끝나면 then 안에 있는 내용을 진행해라                         
        .catch(err => console.log(err));      // fetch에서 api 내용을 가져오지 못하면 error를 내라
    }

    _renderMovies = () => {
        const movies = this.state.movies.map((movie, index) => {
            return <MovieShow key={index} title={movie.title} poster={movie.poster}/>
        })
        return movies;
    }

    render(){
        return (
            <div className="App">
                {this.state.movies ? this._renderMovies() : 'Loading'}
            </div>
            
        )
    }
}

export default App;
