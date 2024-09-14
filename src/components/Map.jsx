import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";

import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { useGeoLocation } from "../hooks/useGeolocation";

// import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerIconPng from "../assets/person-icon.png";
import { Icon } from "leaflet";

const BASE_URL = "http://localhost:5000";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

export default function Map() {
  // const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([25, -40]);
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeoLocation();

  const [mapLat, mapLng] = useUrlPosition();

  const [peopleExamples, setPeopleExamples] = useState([]);

  const [flag, setFlag] = useState();

  const [newPeople, setNewPeople] = useState([]);

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  useEffect(
    function () {
      if (geolocationPosition)
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    },
    [geolocationPosition]
  );

  useEffect(function () {
    async function fetchPeople() {
      try {
        const res = await fetch(`${BASE_URL}/people`);
        const data = await res.json();
        setPeopleExamples(data);
      } catch {
        throw new Error("Unable to access people data");
      }
    }
    fetchPeople();
  }, []);

  useEffect(function () {
    async function fetchPeopleApi() {
      try {
        const res = await fetch(`${BASE_URL}/peopleApi`);
        const data = await res.json();
        setNewPeople(data);

        console.log(data[0].name);
      } catch {
        throw new Error("Unable to access people data");
      }
    }
    fetchPeopleApi();
  }, []);

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <button
          type="position"
          onClick={getPosition}
          className={styles.position}
        >
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={3}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {peopleExamples.map((person) => (
          <Marker
            position={person.position}
            icon={
              new Icon({
                iconUrl: markerIconPng,
                iconSize: [30, 51],
                iconAnchor: [12, 41],
              })
            }
          >
            <Popup>
              Learn about {person.name}! {person.flag}
            </Popup>
          </Marker>
        ))}
        {newPeople.map((person, index) => (
          <Marker
            position={[
              parseFloat(person.location.coordinates.latitude),
              parseFloat(person.location.coordinates.longitude),
            ]}
            icon={
              new Icon({
                iconUrl: markerIconPng,
                iconSize: [30, 51],
                iconAnchor: [12, 41],
              })
            }
          >
            <Popup>
              Learn about {person.name.first} {convertToEmoji(person.nat)}
            </Popup>
          </Marker>
        ))}

        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );

  function ChangeCenter({ position }) {
    const map = useMap();
    map.setView(position);
    return null;
  }

  function DetectClick() {
    const navigate = useNavigate();

    useMapEvent({
      click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
    });
  }
}
