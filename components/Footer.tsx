import Link from 'next/link'
import PREFECTURE from '../db/prefecture'

const Footer = () => {
  const regionList = Array.from(new Set(PREFECTURE.map((prefecture) => prefecture.region)))

  return (
    <footer className="px-4 py-2">
      <h2 className="text-lg">都道府県から探す</h2>
      {regionList.map((region: string) => {
        return (
          <div className="mb-2">
            <p className="w-40">{region}</p>
            <ul className="flex flex-wrap">
              {PREFECTURE.filter((prefecture) => prefecture.region === region).map((prefecture) => {
                return (
                  <li key={prefecture.id} className="pr-2">
                    <Link href={`/${prefecture.name}`}>
                      <a className="hover:underline text-gray-500">{prefecture.name}</a>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </footer>
  )
}

export default Footer
