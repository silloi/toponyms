import Head from 'next/head';
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { client } from "../libs/client";
import { getPrefecturePlace } from '../utils/position'
import PREFECTURE from '../db/prefecture'
import dynamic from 'next/dynamic'

export const Home = ({ placeList }) => {
  const router = useRouter()

  const regionList = Array.from(new Set(PREFECTURE.map((prefecture) => prefecture.region)))

  /**
   * Get Map component to import leaflet with CSR
   * Because leaflet does not support SSR
   */
  const MapPlace: any = dynamic(() => import('../components/MapPlace'), { ssr: false });

  if (router.isFallback) {
    return <div>Loading...</div>
  } else {
    return (
      <div>
        <Head>
          <title>難読地名・怖い地名</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="p-4">
          <h1 className="text-2xl">難読地名・怖い地名</h1>
        </div>
        <MapPlace center={PREFECTURE[19].position} zoom={5} placeList={placeList}/>
        <div className="p-4">
          <h2 className="text-xl">最新登録された地名</h2>
          <ul>
            {placeList.map((place) => {
              return (
              <li key={place.id}>
                <Link href={`/${place.prefecture[0].name}/${place.name}`}>
                  <a className="hover:underline text-blue-600">{place.name}</a>
                </Link>
              </li>
            )})}
          </ul>
        </div>
      </div>
    )
  }
}

export const getStaticProps: GetStaticProps = async () => {
  const data: any = await client.get({ endpoint: "nandoku" })

  const placeList = data.contents.map((content) => {
    const { position } = getPrefecturePlace(content)
    return {
      ...content,
      position,
    }
  })

  return {
    props: {
      placeList,
    },
  }
}

export default Home
