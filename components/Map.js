import { useState } from "react";
import ReactMapGL,{Marker, Popup} from "react-map-gl";
import getCenter from "geolib/es/getCenter";

function Map({ searchResults }) {
   const [selctedLocation, setSelectedLocation] = useState({});

    //  Transform the search result object into the
    //  { latitude: 52.516272, longitude: 13.377722 }
    //  object
    const coordinates = searchResults.map((result) => ({
        longitude: result.long,
        latitude: result.lat,
    }));

    //The latitude and longitude of the center of location coordinates
    const center = getCenter(coordinates);

    const [viewport, setViewport] = useState({
        width: "100%",
        height: "100%",
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11,
    });

    return (
    <ReactMapGL 
        mapStyle="mapbox://styles/rohit227/ckshx4fjd0fxv17pfzijyw0ws"
        mapboxApiAccessToken={process.env.mapbox_key}
        {...viewport}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
        {searchResults.map(result => (
            <div key={result.long}>
                <Marker
                    longitude={result.long}
                    latitude={result.lat}
                    offsetLeft={-20}
                    offsetTop={-10}
                    >
                        <p 
                        role="img"
                        onClick={() => setSelectedLocation(result)}
                        className="cursor-pointer text-2xl animate-bounce"
                        aria-label="push-pin"
                        >📌</p>
                </Marker>
            </div>
        ))}
    </ReactMapGL>
    ); 
}

export default Map;
