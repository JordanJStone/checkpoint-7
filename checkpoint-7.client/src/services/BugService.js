import { AppState } from '../AppState'
import { api } from './AxiosService'

class BugService {
  async getBugs() {
    const res = await api.get('api/bugs')
    console.log(res)
    AppState.bugs = res.data
  }

  async getOne(id) {
    const res = await api.get('api/bugs/' + id)
    AppState.activeBug = res.data
  }

  async createBug(bugData) {
    const res = await api.post('api/bugs', bugData)
    return res.data.id
  }

  async editBugTitle(bugId, newTitle) {
    const bugData = { title: newTitle }
    await api.put('api/bugs/' + bugId, bugData)
  }

  async editBugDesc(bugId, newDesc) {
    const bugData = { description: newDesc }
    await api.put('api/bugs/' + bugId, bugData)
  }
// NOTE We can't delete bugs, may need to alter to close a bug
  // async deleteBug(id) {
  // if (confirm('Confirm deletion?'))
  //   await api.delete('api/bugs/' + id)
  //   this.getBugs()
  // }
}

export const bugService = new BugService()
