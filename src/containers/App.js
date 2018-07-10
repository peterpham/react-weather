import React, {Component} from 'react';
import {Weather} from './Weather';
import {City} from './City';

export default class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            city: this.getDataFromLocalStorage()
        };
       this.onChangeCity = this.onChangeCity.bind(this);
    }
    
    getDataFromLocalStorage(){
        
        try {
            let name = window.localStorage.getItem('name') || "",
            country = window.localStorage.getItem("country") || "";
            if (name.length && country.length) {
                return {name, country};
            } else {
                throw new Error("no data in localstorage");
            }
        } catch (er) {
            return {
                name: "Sydney"
                , country: "AU"
            }
        }
    }
    
    onChangeCity(city) {
        this.setState({city});
        try {
            window.localStorage.setItem('name', city.name);
            window.localStorage.setItem('country', city.country);
        } catch (er) {
            // silent error
        }
    }
    
    render () {
        return (
            <React.Fragment>
                <City onChange={this.onChangeCity} />
                <Weather city={this.state.city} />
            </React.Fragment>
        );
    }
}