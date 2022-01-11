import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet'
import Head from 'next/head'
import Link from 'next/link'

// set static icon image
// https://github.com/PaulLeCam/react-leaflet/issues/453#issuecomment-731732137
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

let DefaultIcon = L.icon({
  iconUrl: 'leaflet/dist/images/marker-icon.png',
  shadowUrl: 'leaflet/dist/images/marker-shadow.png'
});

L.Marker.prototype.options.icon = DefaultIcon;

const Map = ({ center, zoom, placeList }) => {
  return (
    <div>
      <Head>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
          integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
          crossOrigin="" />
      </Head>
      <MapContainer center={center} zoom={zoom || 10} style={{ height: "50vh" }}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright";>OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {placeList.map((place) => {
          return (
            <Marker key={place.id} position={place.position}>
              <Tooltip permanent interactive>
                <Link href={`/${place.prefecture[0]}/${place.name}`}>
                  <a className="font-bold">{place.name}</a>
                </Link>
              </Tooltip>
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  )
}

export default Map
