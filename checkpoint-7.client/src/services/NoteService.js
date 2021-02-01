import { AppState } from '../AppState'
import { api } from './AxiosService'

class NoteService {
  async getNotes(id) {
    const res = await api.get('api/bugs/' + id + '/notes')
    // console.log(res)
    AppState.notes = res.data
    console.log(AppState.notes)
  }

  async createNote(newNote) {
    await api.post('api/notes', newNote)
    this.getNotes(newNote.bug)
  }

  async deleteNote(note) {
    if (confirm('Confirm deletion?')) { await api.delete('api/notes/' + note.id) }
    this.getNotes(note.bug)
  }
}

export const noteService = new NoteService()
