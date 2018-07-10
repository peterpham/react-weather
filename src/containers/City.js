import React, {Component} from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';

export class City extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            "status":"unknown"
            ,"data": []
            ,"keyword":undefined
            ,"results":[]
        };
        this.keyUpHandler = this.keyUpHandler.bind(this);
        this.startSearch = debounce(this.startSearch, 800);
    }
    
    componentDidMount(){
        this.getCities();
    }

    getCities(){
        axios.get('/data/city.list.min.json')
            .then(res => {
                this.setState({
                    "status":"success"
                    , "data":res.data.map(i => {
                        return {name: i.name, country: i.country};
                    })
                });
            })
    }

    keyUpHandler(e){
        this.startSearch(e.target.value);
    }
    
    startSearch(keyword) {
        let results = keyword.trim().length === 0 ? [] : this.state.data.filter(x => x.name.toLowerCase().startsWith(keyword.toLowerCase()))
        this.setState({keyword, results})
    }

    render() {
        if (this.state.status !== "success")
            return <div class="city-container"></div>;
        else    
            return (
                <div class="city-container">
                    <input type="search" onKeyUp={this.keyUpHandler} placeholder="Search a city" />
                    <ul>
                        {this.state.results.map(city => <li onClick={()=>this.props.onChange(city)}>{city.name}, {city.country}</li> )}
                    </ul>
                </div>
            )
    }

}