import PREFECTURE from '../db/prefecture'

import osakaJSON from '../db/osaka.json'

export const getPrefecture = (prefectureName: string) => {
  return PREFECTURE.find((prefecture) => prefecture.name === prefectureName).position
}

export const getPrefecturePlace = (place: any) => {
  const prefecture = place.prefecture[0]
  let prefectureJSON: { data: string[][] } = { data: [] }

  switch (prefecture) {
    case '北海道':
      prefectureJSON = osakaJSON
    case '青森県':
      prefectureJSON = osakaJSON
    case '岩手県':
      prefectureJSON = osakaJSON
    case '宮城県':
      prefectureJSON = osakaJSON
    case '秋田県':
      prefectureJSON = osakaJSON
    case '山形県':
      prefectureJSON = osakaJSON
    case '福島県':
      prefectureJSON = osakaJSON
    case '茨城県':
      prefectureJSON = osakaJSON
    case '栃木県':
      prefectureJSON = osakaJSON
    case '群馬県':
      prefectureJSON = osakaJSON
    case '埼玉県':
      prefectureJSON = osakaJSON
    case '千葉県':
      prefectureJSON = osakaJSON
    case '東京都':
      prefectureJSON = osakaJSON
    case '神奈川県':
      prefectureJSON = osakaJSON
    case '新潟県':
      prefectureJSON = osakaJSON
    case '富山県':
      prefectureJSON = osakaJSON
    case '石川県':
      prefectureJSON = osakaJSON
    case '福井県':
      prefectureJSON = osakaJSON
    case '山梨県':
      prefectureJSON = osakaJSON
    case '長野県':
      prefectureJSON = osakaJSON
    case '岐阜県':
      prefectureJSON = osakaJSON
    case '静岡県':
      prefectureJSON = osakaJSON
    case '愛知県':
      prefectureJSON = osakaJSON
    case '三重県':
      prefectureJSON = osakaJSON
    case '滋賀県':
      prefectureJSON = osakaJSON
    case '京都府':
      prefectureJSON = osakaJSON
    case '大阪府':
      prefectureJSON = osakaJSON
    case '兵庫県':
      prefectureJSON = osakaJSON
    case '奈良県':
      prefectureJSON = osakaJSON
    case '和歌山県':
      prefectureJSON = osakaJSON
    case '鳥取県':
      prefectureJSON = osakaJSON
    case '島根県':
      prefectureJSON = osakaJSON
    case '岡山県':
      prefectureJSON = osakaJSON
    case '広島県':
      prefectureJSON = osakaJSON
    case '山口県':
      prefectureJSON = osakaJSON
    case '徳島県':
      prefectureJSON = osakaJSON
    case '香川県':
      prefectureJSON = osakaJSON
    case '愛媛県':
      prefectureJSON = osakaJSON
    case '高知県':
      prefectureJSON = osakaJSON
    case '福岡県':
      prefectureJSON = osakaJSON
    case '佐賀県':
      prefectureJSON = osakaJSON
    case '長崎県':
      prefectureJSON = osakaJSON
    case '熊本県':
      prefectureJSON = osakaJSON
    case '大分県':
      prefectureJSON = osakaJSON
    case '宮崎県':
      prefectureJSON = osakaJSON
    case '鹿児島県':
      prefectureJSON = osakaJSON
    case '沖縄県':
      prefectureJSON = osakaJSON
  }

  const result = prefectureJSON.data.find((item: string[]) => `${item[3]}${item[5]}`.indexOf(place.address) === 0)

  if (!result) {
    return []
  }

  return [result[6], result[7]]
}
