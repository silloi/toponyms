import osakaJSON from '../db/osaka.json'

export default function getPrefecturePlace(place: any) {
  const prefecture = place.prefecture[0]
  let prefectureJSON: { data: string[][] } = { data: [] }

  switch (prefecture) {
    case '北海道':
      prefectureJSON = osakaJSON
    case '大阪府':
      prefectureJSON = osakaJSON
  }

  const result = prefectureJSON.data.find((item: string[]) => `${item[3]}${item[5]}`.indexOf(place.address) === 0)

  if (!result) {
    return []
  }

  return [result[6], result[7]]
}
