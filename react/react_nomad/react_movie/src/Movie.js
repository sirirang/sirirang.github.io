import React, { Component } from 'react';
import m_css from './Movie.css'

class Movie extends Component{
    render(){
        return (
            <div>
                <h1>{this.props.data}</h1>
                <MoviePoster poster={this.props.poster}/>
            </div>
        )
    }
}

class MoviePoster extends Component{
    render(){
        return(
            <div>
                <img src={this.props.poster} alt=""/>
            </div>
        )
    }
}

export default Movie;
