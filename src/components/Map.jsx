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
import { useUrlPosition } from "../hooks/useUrlPosition";
import { useGeoLocation } from "../hooks/useGeolocation";
import markerIconPng from "../assets/person-icon.png";
import { Icon } from "leaflet";

const BASE_URL = "http://localhost:5000";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

export default function Map({
  filterSelections,
  setCountryChoice,
  setAgeRange,
  setThemeChoice,
  setPeopleInfo,
  setViewPeopleInfo,
}) {
  console.log(filterSelections);

  const uniqueFilters = [...new Set(filterSelections)].length;

  console.log("uniqueFilters", uniqueFilters);

  const [mapPosition, setMapPosition] = useState([25, -40]);
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeoLocation();

  const [mapLat, mapLng] = useUrlPosition();

  const [allPeople, setAllPeople] = useState([]); // Unfiltered people data
  const [newPeople, setNewPeople] = useState([]); // Filtered data
  const [newZoom, setNewZoom] = useState(3);
  const [newMapPosition, setNewMapPosition] = useState([25, -40]);

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geolocationPosition)
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
  }, [geolocationPosition]);

  useEffect(() => {
    async function fetchPeopleApi() {
      try {
        const res = await fetch(`${BASE_URL}/peopleApi`);
        const data = await res.json();
        setAllPeople(data); // Store the full list of people
        setNewPeople(data); // Initialize newPeople with all people
        console.log(data);
      } catch {
        throw new Error("Unable to access people data");
      }
    }
    fetchPeopleApi();
  }, []);

  useEffect(() => {
    let filteredPeople = allPeople;

    // Apply Theme filter
    if (filterSelections[0] !== "All") {
      filteredPeople = filteredPeople.filter(
        (person) => person.theme === filterSelections[0]
      );
    }

    // Apply Country filter
    if (filterSelections[1] !== "All") {
      const personCountryCode = filterSelections[1].split(" ")[0]; // Extract country code from dropdown value
      filteredPeople = filteredPeople.filter(
        (person) => person.nat === personCountryCode
      );
    }

    // Apply Age filter
    if (filterSelections[2] !== "All") {
      const ageRange = filterSelections[2].split("-").map((x) => parseInt(x));

      if (filterSelections[2] === "65+") {
        // Handle age 65+
        filteredPeople = filteredPeople.filter(
          (person) => person.dob.age >= 65
        );
      } else {
        // Handle age range (e.g., 25-34)
        filteredPeople = filteredPeople.filter(
          (person) =>
            person.dob.age >= ageRange[0] && person.dob.age <= ageRange[1]
        );
      }
    }

    // Update map position if filteredPeople exist
    console.log("YAGA", filteredPeople);

    if (uniqueFilters > 1) {
      if (filteredPeople.length === 0) {
        alert("No people with the applied filters");
        setCountryChoice("All");
        setAgeRange("All");
        setThemeChoice("All");
        return;
      }
    }

    if (filteredPeople.length > 0) {
      setNewMapPosition([
        parseFloat(filteredPeople[0].location.coordinates.latitude),
        parseFloat(filteredPeople[0].location.coordinates.longitude),
      ]);
      setNewZoom(4);
    } else {
      setNewMapPosition([125, -40]); // Default map position
      setNewZoom(3);
    }

    setNewPeople(filteredPeople); // Update the filtered list of people
  }, [filterSelections, allPeople]);

  console.log("NEW MAP POSITION", newMapPosition);

  function handlePeopleInfo(person) {
    setPeopleInfo(person);
    setViewPeopleInfo(true);
    console.log("TRUETRUETRUE");
  }

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
        zoom={newZoom}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {newPeople.map((person, index) => (
          <Marker
            key={index} // Ensure each marker has a unique key
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
              <div
                className={styles.popup}
                onClick={() => handlePeopleInfo(person)}
              >
                Learn about {person.name.first}
                <img
                  src={person.picture.thumbnail}
                  alt="person thumbnail picture"
                />
                <span>{convertToEmoji(person.nat)}</span>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* <ChangeCenter position={mapPosition} /> */}
        <ChangeMapPosition position={newMapPosition} />
        <ChangeZoom zoom={newZoom} />
      </MapContainer>
    </div>
  );

  function ChangeCenter({ position }) {
    const map = useMap();
    map.setView(position);
    return null;
  }

  function ChangeMapPosition({ position }) {
    const map = useMap();

    useEffect(() => {
      if (position && position.length === 2) {
        map.setView(position);
      }
    }, [position, map]);
    return null;
  }

  function ChangeZoom({ zoom }) {
    const map = useMap();
    useEffect(() => {
      map.setZoom(zoom);
    }, [zoom, map]);
    return null;
  }

  function DetectClick() {
    const navigate = useNavigate();

    useMapEvent({
      click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
    });
  }
}
