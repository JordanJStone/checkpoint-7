<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h2>
          {{ bug.title }}
        </h2>
        <form action="form-inline border justify-content-center align-items-center" @submit.prevent="createNote">
          <div class="form-row justify-content-center">
            <div class="col-12">
              <input
                type="text"
                name="title"
                id="title"
                v-model="state.newNote.body"
                class="form-control d-flex"
                placeholder="Create Note..."
              />
            </div>
            <div class="col-1">
              <button type="submit" class="btn btn-success">
                +
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="row justify-content-center">
      <!-- NOTE NoteComponent with v-for needs to go here -->
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { logger } from '../utils/Logger'
import { bugService } from '../services/BugService'
import { Appstate } from '../AppState'
import { noteService } from '../services/NoteService'
export default {
  name: 'BugDetailsPage',
  setup() {
    const route = useRoute()
    const state = reactive({
      notes: computed(() => Appstate.notes),
      newNote: {
        body: '',
        bug: route.params.id
      }
    })
    onMounted(async() => {
      try {
        await bugService.getOne(route.params.id)
      } catch (error) {
        logger.log(error)
      }
      try {
        await noteService.getNotes(route.params.id)
      } catch (error) {
        logger.log(error)
      }
    })
    return {
      state,
      bug: computed(() => Appstate.activeBug),
      async createNote() {
        try {
          await noteService.createNote(state.newNote, route.params.id)
          state.newNote.body = ''
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
