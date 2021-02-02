import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BugService {
  async getAll(query) {
    return await dbContext.Bugs.find(query).populate('creator')
  }

  async getOne(bugId) {
    const bugFound = await dbContext.Bugs.findById(bugId).populate('creator', 'name')
    if (!bugFound) {
      throw new BadRequest('No Bug exists with that ID')
    }
    return bugFound
  }

  async delete(id, userId) {
    return await dbContext.Bugs.findByIdAndDelete({ _id: id, creatorId: userId })
  }

  async createBug(body) {
    return await dbContext.Bugs.create(body)
  }

  async edit(id, title, userId) {
    const updated = await dbContext.Bugs.findOneAndUpdate({ _id: id, creatorId: userId, closed: false }, title)
    // this.getOne()
    if (!updated) {
      throw new BadRequest('No Bug exists with that ID')
    }
    return updated
  }
}

export const bugService = new BugService()
