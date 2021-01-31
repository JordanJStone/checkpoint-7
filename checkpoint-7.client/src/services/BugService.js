import { Appstate } from '../AppState'
import { api } from './AxiosService'

class BugService {
  async getBugs() {
    const res = await api.get('api/bugs')
    Appstate.bugs = res.data
  }

  async getOne(id) {
    const res = await api.get('api/bugs/' + id)
    Appstate.activeBug = res.data
  }

  async createBug(bugData) {
    const res = await api.post('api/bugs', bugData)
    return res.data.id
  }
// NOTE We can't delete bugs, may need to alter to close a bug
  // async deleteBug(id) {
  //   await api.delete('api/bugs/' + id)
  //   this.getBugs()
  // }
}

export const bugService = new BugService()
