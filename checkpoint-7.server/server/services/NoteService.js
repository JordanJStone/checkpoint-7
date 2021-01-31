import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NoteService {
  async getAll(query) {
    return await dbContext.Notes.find(query).populate('creator')
  }

  async getNotes(query = {}) {
    return await dbContext.Notes.find(query)
  }

  async delete(id, userId) {
    return await dbContext.Notes.findByIdAndDelete({ _id: id, creatorId: userId })
  }

  async create(body) {
    return await dbContext.Notes.create(body)
  }

  async edit(id, title) {
    const update = await dbContext.Notes.findByIdAndUpdate(id, title, { new: true })
    if (!update) {
      throw new BadRequest('No Note exists with that ID')
    }
    return update
  }
}

export const noteService = new NoteService()
