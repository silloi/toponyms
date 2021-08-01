import Head from 'next/head'
import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { client } from "../../libs/client";
import { getPrefecturePlace } from '../../utils/position'
import dynamic from 'next/dynamic'

export const Place = ({ place }) => {
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
        <div className="px-4">
          <h1 className="text-2xl">{place.name}（{place.kana}）</h1>
          <p>{place.address}</p>
        </div>
        <MapPlace center={place.position} placeList={[place]} />
      </div>
    )
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data: any = await client.get({ endpoint: 'nandoku' });

  const paths = data.contents.map((content) => `/${content.prefecture[0]}/${content.name}`);
  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  /*
   * タイトルに紐づく、ページの生成に必要なデータを返す
   * 引数の `params` の中に `title` が入ってる
   * (この page は `/{title}` というパスでアクセスされる)
   */
  const prefecture = params.prefecture.toString()
  const place = params.place.toString()
  
  const data: any = await client.get({ endpoint: "nandoku", queries: { filters: `name[equals]${place}` } })

  const { address, position }  = getPrefecturePlace(data.contents[0])
  return {
    props: {
      // `props` key の inside で結果を返す
      place: 
        { ...data.contents[0],
          address,
          position,
        },
    },
  }
}

export default Place
