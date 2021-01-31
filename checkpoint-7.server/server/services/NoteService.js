import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NoteService {
  // Put a get all function here
  async getNotes(query = {}) {
    return await dbContext.Notes.find(query)
  }
}

export const noteService = new NoteService()
