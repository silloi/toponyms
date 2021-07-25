// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// import osakaJSON from '../../../db/osaka.json'

// export default function getPrefecturePlaceList(req, res) {
//   const { prefecture } = req.query

//   let prefectureJSON: { data: string[][] }

//   switch (prefecture) {
//     case '大阪府':
//       prefectureJSON = osakaJSON
//   }

//   const result = prefectureJSON.data.map((item: string[]) => item[0])
//   res.status(200).json(result)
// }
