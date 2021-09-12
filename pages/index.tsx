import Head from 'next/head'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { client } from "../libs/client";
import { getPrefecturePlace } from '../utils/position'
import PREFECTURE from '../db/prefecture'
import dynamic from 'next/dynamic'
import Tag from '../components/Tag'

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

  const truncate = (text: string) => {
    return text.length > 140 ? text.substr(0, 140) + '…' : text
  }

  if (router.isFallback) {
    return <div>Loading...</div>
  } else {
    return (
      <div>
        <Head>
          <title>日本の地名.com</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="p-4">
          <h1 className="text-4xl pb-2">日本の地名.com</h1>
          <p className="text-sm">難読地名・怖い地名・廃村・忌み地・禁足地</p>
        </div>

        <div className="p-4">
          <ul className="flex flex-wrap mb-2 space-x-2">
            <Tag
              checked={hash === ""}
              replace
            />
            {categoryList.map((category) => (
              <Tag
                name={category.name}
                checked={hash === category.name}
                replace
              />
            ))}
          </ul>
        </div>

        <MapPlace center={PREFECTURE[19].position} zoom={5} placeList={placeListFiltered}/>
        <div className="p-4">
          <h2 className="text-2xl mb-2">最新登録された地名</h2>
          <ul className="">
            {placeList.slice(0, 10).map((place) => {
              return (
              <li key={place.id} className="w-full border-2 rounded mb-2">
                <Link href={`/${place.prefecture[0]}/${place.name}`}>
                  <a className="w-full h-full block p-4">
                    <h3 className="text-2xl mb-2">{place.name}</h3>
                    {place.citationQuote1 ? (
                      <blockquote cite={truncate(place.citationQuote1) || ''} className="px-4 py-2 mb-2 border-l-4">
                        {truncate(place.citationQuote1)}
                      </blockquote>
                    ) : null}
                  </a>
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
  const data: any = await client.get({ endpoint: "chimei", queries: { limit: 1000 } })

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
