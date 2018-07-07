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
    
    componentDidMount(){
        this.getCurrentWeather();
    }

    getCurrentWeather(){
        axios.get(`${OPEN_WEATHER_MAP_API_ENDPOINT}/weather?q=${this.props.city},${this.props.countrycode}&appid=${OPEN_WEATHER_MAP_API_KEY}`)
            .then(res => {
                let weather = res.data.weather[0];

                const date = new Date();
                const sunrise = new Date(res.data.sys.sunrise * 1000); //Convert a Unix timestamp to time
                const sunset = new Date(res.data.sys.sunset * 1000);
                let icon = "";
                let daynight = "";
                /* Get suitable icon for weather */
                if (date.getHours() >= sunrise.getHours() && date.getHours() < sunset.getHours()) {
                    icon = `wi wi-owm-day-${weather.id}`;
                    daynight = "day";
                }
                else if (date.getHours() >= sunset.getHours()) {
                    icon = `wi wi-owm-night-${weather.id}`;
                    daynight = "night";
                }

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
                </div>
            )
    }
}

Weather.defaultProps = {"city": "Sydney", "countrycode": "au"};