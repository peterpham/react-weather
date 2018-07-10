import React, {Component} from 'react';
import axios from 'axios';

// @see https://openweathermap.org/api
const OPEN_WEATHER_MAP_API_KEY = 'API_KEY_HERE';
const OPEN_WEATHER_MAP_API_ENDPOINT = 'https://api.openweathermap.org/data/2.5';

export class Weather extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            "status":"unknown"
            , "main":""
            , "description":""
            , "icon":""
            , "daynight": ""
        };
    }
    
    // componentDidMount is called when React render
    componentDidMount(){
        this.getCurrentWeather();
    }

    // componentWillReceiveProps is called when props are about to change (but not yet changed)
    componentWillReceiveProps(nextProps){
        this.getCurrentWeather(nextProps.city);
    }

    getCurrentWeather(city = this.props.city){
        axios.get(`${OPEN_WEATHER_MAP_API_ENDPOINT}/weather?q=${city.name},${city.country}&appid=${OPEN_WEATHER_MAP_API_KEY}`)
            .then(res => {
                let weather = res.data.weather[0];
                let daynight = res.data.dt > res.data.sys.sunrise && res.data.dt < res.data.sys.sunset ? "day" : "night";
                let icon = `wi wi-owm-${daynight}-${weather.id}`;

                this.setState({
                    "status": "success"
                    , "main": weather.main
                    , "description": weather.description
                    , "icon": icon
                    , "daynight": daynight
                });
            })
            .catch(er => {
                this.setState({
                    "status": "error"
                })
            })
    }

    render(){
        if (this.state.status === 'unknown')
            return <div class="weather-card">Loading...</div>;
        else if (this.state.status === 'error') 
            return <div class="weather-card error">Unable to get current weather</div>;
        else    
            return (
                <div className={"weather-card " + this.state.daynight}>
                    <i title={this.state.main} class={this.state.icon}></i>
                    {this.state.description}
                    <span>{this.props.city.name}, {this.props.city.country}</span>
                </div>
            )
    }
}

Weather.defaultProps = {
    "city": {
        "name": "Sydney"
        , "country": "AU"
    }
};