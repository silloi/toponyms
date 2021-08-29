import PREFECTURE from '../db/prefecture'
const PLACE_JSON = require('../db/place.json') as { data: string[][] }

export const getPrefecture = (prefectureName: string) => {
  return PREFECTURE.find((prefecture) => prefecture.name === prefectureName).position
}

export const getPrefecturePlace = (place: any) => {
  const prefecture = place.prefecture[0]

  // filter prefecture
  const PLACE = PLACE_JSON.data.filter((item: string[]) => item[1] === prefecture)

  // すでに存在しない地名なら現地名townをキーとする。現地名と同一なら地名nameをそのまま使う
  const key = place.town ?? place.name
  const city = place.city

  const placeListFilteredByCity = city ? PLACE.filter((item: string[]) => item[5] === city) : PLACE

  const result = placeListFilteredByCity.find((item: string[]) => item[8].includes(key))

  if (!result) {
    return {
      address: '',
      position: [],
    }
  }

  let address = result[1] + result[5] + result[8] + result[11].split('丁目')

  // n丁目を削除
  const pos = address.indexOf('丁目')
  if (pos > -1) {
    address = address.slice(0, pos - 1)
  }

  return {
    address,
    position: [result[12], result[13]],
  }
}
