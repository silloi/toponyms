import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { ExternalLinkIcon } from '@heroicons/react/solid'
import { client } from "../../libs/client";
import { getPrefecturePlace } from '../../utils/position'
import dynamic from 'next/dynamic'
import Tag from '../../components/Tag'

export const Place = ({ place }) => {
  const router = useRouter()

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
          <h1 className="text-4xl mb-2">{place.name}（{place.kana}）</h1>
          <ul className="flex flex-wrap mb-2 space-x-2">
            {place.categories.map((category) => {
              return (
                <Tag
                  name={category.name}
                />
              )
            })}
          </ul>
          <p>{place.address}</p>
        </div>
        <MapPlace center={place.position} zoom={17} placeList={[place]} />
        <div className="p-4">
          <h2 className="text-2xl pb-2">解説</h2>
          {place.citationQuote1 ?  (
            <blockquote cite={place.citationUrl1 || ''} className="px-4 py-2 mb-2 border-l-4 whitespace-pre-line">
              <p>
                {place.citationQuote1}
              </p>
              {place.citationUrl1 ? 
                <a href={place.citationUrl1}><ExternalLinkIcon className="h-5 w-5 text-blue-600" /></a>
                : null 
              }
            </blockquote>
          ) : null}
        </div>
      </div>
    )
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data: any = await client.get({ endpoint: 'chimei' });

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
  
  const data: any = await client.get({ endpoint: "chimei", queries: { filters: `name[equals]${place}` } })

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
