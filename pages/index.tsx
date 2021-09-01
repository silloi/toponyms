import Head from 'next/head';
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { client } from "../libs/client";
import { getPrefecturePlace } from '../utils/position'
import PREFECTURE from '../db/prefecture'
import dynamic from 'next/dynamic'

export const Home = ({ placeList, categoryList }) => {
  const router = useRouter()
  const [hash, setHash] = useState('')

  const [placeListFiltered, setPlaceListFiltered] = useState(placeList)

  useEffect(() => {
    const newHash = decodeURIComponent(router.asPath.split('#')[1] ?? '')
    setHash(newHash)

    if (newHash) {
      setPlaceListFiltered(placeList.filter((place) => place.categories.some((category) => category.name === newHash)))
    } else {
      setPlaceListFiltered(placeList)
    }
  }, [router.asPath])

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
          <h1 className="text-4xl">難読地名・怖い地名</h1>
        </div>

        <div className="p-4">
          <ul className="flex flex-wrap mb-2 space-x-2">
            <li className={"px-1.5 mb-1 border-2 rounded-md " + (hash === '' ? 'bg-blue-100' : '')}>
              <Link href="/">
                <a>すべて</a>
              </Link>
            </li>
            {categoryList.map((category) => (
              <li key={category.createdAt} className={"px-1.5 mb-1 border-2 rounded-md " + (hash === category.name ? 'bg-blue-100' : '')}>
                <Link href={`/#${category.name}`}>
                  <a>#{category.name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <MapPlace center={PREFECTURE[19].position} zoom={5} placeList={placeListFiltered}/>
        <div className="p-4">
          <h2 className="text-2xl">最新登録された地名</h2>
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

export const getStaticProps: GetStaticProps = async () => {
  const data: any = await client.get({ endpoint: "nandoku" })

  const placeList = data.contents.map((content) => {
    const { position } = getPrefecturePlace(content)
    return {
      ...content,
      position,
    }
  })

  const dataCategories: any = await client.get({ endpoint: "category" })
  const categoryList = dataCategories.contents

  return {
    props: {
      placeList,
      categoryList,
    },
  }
}

export default Home
