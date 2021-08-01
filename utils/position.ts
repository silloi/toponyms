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

  const result = PLACE.find((item: string[]) => `${item[5]}${item[8]}`.includes(key))

  if (!result) {
    return []
  }

  return [result[12], result[13]]
}
