import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet'
import Head from 'next/head'

const Map = ({ center, placeList }) => {
  const [zoom, setZoom] = useState(13);

  return (
    <div>
      <Head>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
    integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
    crossorigin=""/>
      </Head>
      <MapContainer center={center} zoom={zoom} style={{ height: "50vh" }}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright";>OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {placeList.map((place) => {
          return (
            <Marker key={place.id} position={place.position}>
              <Tooltip permanent interactive>
                <strong><a href={`/${place.prefecture[0]}/${place.name}`}>{place.name}</a></strong>
              </Tooltip>
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  )
}

export default Map
