// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next"

export default function Hello(req: NextApiRequest, res: NextApiResponse) {
  res.statusCode = 200
  res.json({ name: 'John Doe' })
}
