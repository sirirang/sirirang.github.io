import React, { Component } from "react";
import "./App.css";
import "./Movie.css";
import MovieShow from "./Movie";

const API_KEY = "https://yts.am/api/v2/list_movies.json?sort_by=download_count";

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

  state = {};
  // componentDidMount() {
  //   fetch(API_KEY) // fetch로 api 내용을 가져와라
  //     .then(res => res.json()) // 위에 작업이 끝나면 then 안에 있는 내용을 진행해라
  //     .then(json => console.log(json)) // 위에 작업이 끝나면 then 안에 있는 내용을 진행해라
  //     .catch(err => console.log(err)); // fetch에서 api 내용을 가져오지 못하면 error를 내라
  //    계속해서 then 을 사용하게 되면 CallBack HELL 이 되어버림 그래서 함수들을 만들어서 작업진행
  // }

  componentDidMount() {
    this._getMovies();
  }

  _renderMovies = () => {
    const movies = this.state.movies.map(movie => {
      console.log(movie);
      return (
        <MovieShow
          key={movie.id}
          title={movie.title}
          poster={movie.medium_cover_image}
          genres={movie.genres}
          synopsis={movie.synopsis}
        />
      );
    });
    return movies;
  };

  _getMovies = async () => {
    const movies = await this._callApi(); //await 내가 준 명령어가 끝나길 기다리는 것 현재 같은 경우 callApi함수가 끝나길 대기
    this.setState({
      movies
    });
  };

  _callApi = () => {
    return fetch(API_KEY) // fetch로 api 내용을 가져와라
      .then(res => res.json()) // 위에 작업이 끝나면 then 안에 있는 내용을 진행해라
      .then(json => json.data.movies) // 위에 작업이 끝나면 then 안에 있는 내용을 진행해라
      .catch(err => console.log(err)); // fetch에서 api 내용을 가져오지 못하면 error를 내라
  };

  render() {
    const { movies } = this.state;
    return (
      <div className={movies ? "App" : "App--loading"}>
        {this.state.movies ? this._renderMovies() : "Loading"}
      </div>
    );
  }
}

export default App;
