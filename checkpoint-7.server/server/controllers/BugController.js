import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { bugService } from '../services/bugService'
import { noteService } from '../services/NoteService'
// import Bug from '../models/Bug'

export class BugController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:bugId', this.getOne)
      .get('/:id/notes', this.getNotes)
      .post('', this.createBug)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }

  async createBug(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await bugService.createBug(req.body))
    } catch (error) {
      next(error)
    }
  }

  async getAll(req, res, next) {
    try {
      return res.send(await bugService.getAll(req.query))
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      return res.send(await bugService.delete(req.params.id, req.userInfo.id))
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      res.send(await bugService.getOne(req.params.bugId))
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    // if (req.params.bug === false) {
    try {
      const data = await bugService.edit(req.params.id, req.body, req.userInfo.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
    // } else {
    //   return Error
    // }
  }

  async getNotes(req, res, next) {
    try {
      const data = await noteService.getNotes({ bug: req.params.id })
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
