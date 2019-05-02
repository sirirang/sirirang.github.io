import React, { Component } from "react";
import PropTypes from "prop-types";
import LinesEllipsis from "react-lines-ellipsis";

class Movie extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    // genres: PropTypes.string.isRequired,
  };
  render() {
    // const overview = [this.props.genres];
    // console.log(overview);
    return (
      <div className="Movie">
        <div className="Movie__Columns">
          <MoviePoster poster={this.props.poster} alt={this.props.title} />
        </div>
        <div className="Movie__Columns">
          <h1>{this.props.title}</h1>
          
          {/* <div className="Movie__Genres">
            {this.props.genres.map((genres, index) => {
              return <MovieGenre genres={genres} key={index} />;
            })}
          </div> */}

          <div className="Movie__synopsis">
            <LinesEllipsis
              text={this.props.synopsis}
              maxLine="2"
              ellipsis="..."
              trimRight
              basedOn="letters"
            />
          </div>
        </div>
      </div>
    );
  }
}

class MoviePoster extends Component {
  static propTypes = {
    poster: PropTypes.string.isRequired
  };
  render() {
    return (
      <div>
        <img src={this.props.poster} alt={this.props.alt} />
      </div>
    );
  }
}

// function MovieGenre({ genres }) {
//   return <span className="Movie__Genre">{genres}</span>;
// }

// MovieGenre.propTypes = {
//   genres: PropTypes.string.isRequired
// };

export default Movie;
