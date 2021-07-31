import Link from 'next/link'
import PREFECTURE from '../db/prefecture'

const Footer = () => {
  const hokkaido = PREFECTURE.filter((prefecture) => prefecture.region === '北海道・東北')
  const kanto = PREFECTURE.filter((prefecture) => prefecture.region === '関東')
  const hokuriku = PREFECTURE.filter((prefecture) => prefecture.region === '北陸・甲信越')
  const tokai = PREFECTURE.filter((prefecture) => prefecture.region === '東海')
  const kansai = PREFECTURE.filter((prefecture) => prefecture.region === '関西')
  const chugoku = PREFECTURE.filter((prefecture) => prefecture.region === '中国・四国')
  const kyushu = PREFECTURE.filter((prefecture) => prefecture.region === '九州・沖縄')

  return (
      <footer>
        <p>北海道・東北</p>
        <ul className="flex space-x-4">
          {hokkaido.map((prefecture) => {
            return (
              <li key={prefecture.id}>
                <Link href={`/${prefecture.name}`}>
                  <a>{prefecture.name}</a>
                </Link>
              </li>
            )
          })}
        </ul>
        <p>関東</p>
        <ul className="flex space-x-4">
          {kanto.map((prefecture) => {
            return (
              <li key={prefecture.id}>
                <Link href={`/${prefecture.name}`}>
                  <a>{prefecture.name}</a>
                </Link>
              </li>
            )
          })}
        </ul>
        <p>北陸・甲信越</p>
        <ul className="flex space-x-4">
          {hokuriku.map((prefecture) => {
            return (
              <li key={prefecture.id}>
                <Link href={`/${prefecture.name}`}>
                  <a>{prefecture.name}</a>
                </Link>
              </li>
            )
          })}
        </ul>
        <p>東海</p>
        <ul className="flex space-x-4">
          {tokai.map((prefecture) => {
            return (
              <li key={prefecture.id}>
                <Link href={`/${prefecture.name}`}>
                  <a>{prefecture.name}</a>
                </Link>
              </li>
            )
          })}
        </ul>
        <p>関西</p>
        <ul className="flex space-x-4">
          {kansai.map((prefecture) => {
            return (
              <li key={prefecture.id}>
                <Link href={`/${prefecture.name}`}>
                  <a>{prefecture.name}</a>
                </Link>
              </li>
            )
          })}
        </ul>
        <p>中国・四国</p>
        <ul className="flex space-x-4">
          {chugoku.map((prefecture) => {
            return (
              <li key={prefecture.id}>
                <Link href={`/${prefecture.name}`}>
                  <a>{prefecture.name}</a>
                </Link>
              </li>
            )
          })}
        </ul>
        <p>九州・沖縄</p>
        <ul className="flex space-x-4">
          {kyushu.map((prefecture) => {
            return (
              <li key={prefecture.id}>
                <Link href={`/${prefecture.name}`}>
                  <a>{prefecture.name}</a>
                </Link>
              </li>
            )
          })}
        </ul>
      </footer>
  )
}

export default Footer
