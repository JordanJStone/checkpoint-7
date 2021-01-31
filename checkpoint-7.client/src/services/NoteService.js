import { Appstate } from '../AppState'
import { api } from './AxiosService'

class NoteService {
  async getNotes(id) {
    const res = await api.get('api/notes/' + id + '/comments')
    Appstate.notes[id] = res.data
  }

  async createNote(newNote) {
    await api.post('api/notes', newNote)
    this.getNotes(newNote.bug)
  }

  async deleteNote(note) {
    await api.delete('api/notes/' + note.id)
    this.getNotes(note.bug)
  }
}

export const noteService = new NoteService()
