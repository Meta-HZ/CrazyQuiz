import { Response } from 'express'
import { db } from './config/firebase'

type EntryType = {
    name: string,
    score: number
  }
  
  type Request = {
    body: EntryType,
    params: { entryId: string }
  }

  const addScore = async (req: Request, res: Response) => {
    const { name, score } = req.body
    try {
      const entry = db.collection('scores').doc()
      const entryObject = {
        id: entry.id,
        name,
        score,
      }
  
      entry.set(entryObject)
  
      res.status(200).send({
        status: 'success',
        message: 'entry added successfully',
        data: entryObject
      })
    } catch(error) {
        //log error message
        res.status(500).json(error)
    }
  }

  export { addScore }