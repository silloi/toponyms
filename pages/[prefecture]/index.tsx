import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { client } from "../../libs/client";
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
        <div className="p-4">
          <h1 className="text-2xl">{prefecture}の難読地名・怖い地名</h1>
        </div>
        <MapPlace center={center} placeList={placeList}/>
        <div className="p-4">
          <h2 className="text-xl">地名から探す</h2>
          <ul>
            {placeList.map((place) => {
              return (
              <li key={place.id} className="">
                <Link href={`/${prefecture.name}/${place.name}`}>
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
  const data: any = await client.get({ endpoint: 'nandoku' });

  // const paths = data.contents.map((content) => `/${content.prefecture.name}`);
  const paths = PREFECTURE.map((prefecture) => `/${prefecture.name}`)
  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const prefecture = params.prefecture.toString()

  const center = getPrefecture(prefecture)
  
  const data: any = await client.get({ endpoint: "nandoku", queries: { filters: `prefecture[contains]${prefecture}` } })

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
