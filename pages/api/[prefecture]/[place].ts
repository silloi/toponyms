// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import osakaJSON from '../../../db/osaka.json'

export default function getPrefecturePlace(req, res) {
  const prefecture = req.query.prefecture
  const place = req.query.place

  let prefectureJSON: { data: string[][] }

  switch (prefecture) {
    case '大阪府':
      prefectureJSON = osakaJSON
  }

  const result = prefectureJSON.data.find((item: string[]) => `${item[1]}${item[3]}${item[5]}`.indexOf(place) === 0)
  res.status(200).json(result)
}
