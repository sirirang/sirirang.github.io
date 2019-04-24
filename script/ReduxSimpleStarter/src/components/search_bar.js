import React, {Component} from 'react';


//함수형 기반 컴포넌트
// const SearchBar = () => {
//     return <input type="text"/>
// };


//클래스기반 컴포넌트
//render 메소드로 정의
class SearchBar extends Component {
    constructor(props){
        super(props);

        console.log(this);
        this.state = {term: ''};
    }

    render() {
        return (
            <div>
                <input type="text" 
                value={this.state.term}
                onChange={event => this.setState({ term: event.target.value })}/>
            </div>
        );
    }
}

export default SearchBar;