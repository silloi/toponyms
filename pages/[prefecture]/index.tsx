import Head from 'next/head'
import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { client } from "../../lib/client";
import { getPrefecture, getPrefecturePlace } from '../../utils/position'
import PREFECTURE from '../../db/prefecture'
import dynamic from 'next/dynamic'

export const Prefecture = ({ prefecture, center, placeList }) => {
  const router = useRouter()
  const [searchText, setSearchText] = useState('')

  /**
   * Get Map component to import leaflet with CSR
   * Because leaflet does not support SSR
   */
  const MapPlace: any = dynamic(() => import('../../components/MapPlace'), { ssr: false });

  if (router.isFallback) {
    return <div>Loading...</div>
  } else {
    return (
      <div>
        <Head>
          <title>{prefecture}の地名 | 日本の地名.com</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="p-4">
          <h1 className="text-2xl">
            <span className="text-4xl">{prefecture}</span>
            の地名</h1>
        </div>
        <MapPlace center={center} zoom={10} placeList={placeList}/>
        <div className="p-4">
          <h2 className="text-2xl">地名から探す</h2>
          <ul>
            {placeList.map((place) => {
              return (
              <li key={place.id}>
                <Link href={`/${place.prefecture[0]}/${place.name}`}>
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

export const getStaticPaths: GetStaticPaths = async () => {
  const data: any = await client.get({ endpoint: 'chimei' });

  // const paths = data.contents.map((content) => `/${content.prefecture.name}`);
  const paths = PREFECTURE.map((prefecture) => `/${prefecture.name}`)
  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const prefecture = params.prefecture.toString()

  const center = getPrefecture(prefecture)
  
  const data: any = await client.get({ endpoint: "chimei", queries: { filters: `prefecture[contains]${prefecture}`, limit: 1000 } })

  const placeList = data.contents.map((content) => {
    const { position } = getPrefecturePlace(content)
    return {
      ...content,
      position,
    }
  })

  console.log('List', placeList)
  return {
    props: {
      prefecture,
      center,
      placeList,
    },
  }
}

export default Prefecture
