import axios from 'axios';
import React, { useEffect, useState } from 'react'

function GeoLocation () {
    const [location, setLocation] = useState({
        coordinates: { lat: "", lng: ""}
    });
    console.log(location);

    const [idCountry, setIdCountry] = useState([])

    const onSuccess = (location) => {
        setLocation({
            coordinates: {
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            }
        })
    };
    
    const onError = error => {
        setLocation({
            error,
        })
    };

    useEffect(() => {
        if( !("geolocation" in navigator) ){
            onError({
                code: 0,
                message: "Geolocation Error",
            })
        }
        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    }, []);

    useEffect(() => {
        axios.get(`/geo/1.0/reverse?lat=${location.coordinates.lat}&lon=${location.coordinates.lng}&limit=5&appid=709fa7c040f91716528ed153e06fe784`)
        .then((res)=>{
            setIdCountry(res.data)
            console.log(res);
        })
        .catch((err) => {
            console.log(err)
        })
    });
    return (
        <div>
            <h1>Lokasi</h1>
            <h1> Lat : {location.coordinates.lat} </h1>
            <h1> Long : {location.coordinates.lng} </h1>
        </div>
    )
}

export default GeoLocation;