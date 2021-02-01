<template>
  <div class="container-fluid BugDetailsPage" v-if="state.bug.closed == false">
    <div class="row">
      <div class="col-12">
        <h2 :contenteditable="state.editTitle" @blur="editBugTitle">
          {{ bug.title }}
        </h2>
        <i class="fa fa-pencil" v-if="state.account.id == state.bug.creatorId" @click="state.editTitle = !state.editTitle"></i>
        <p :contenteditable="state.editDesc" @blur="editBugDesc">
          {{ bug.description }}
        </p>
        <i class="fa fa-pencil" v-if="state.account.id == state.bug.creatorId" @click="state.editDesc = !state.editDesc"></i>
        <p> - Bug Closed: {{ bug.closed }}</p>
        <p>
          Creator: {{ bug.creatorId }}
        </p>
        <form action="form-inline border justify-content-center align-items-center" @submit.prevent="createNote">
          <div class="form-row justify-content-center">
            <div class="col-11">
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
        <div class="offset-10 col-2">
          <button class="btn btn-danger mt-3" @click="closeBug">
            Close Bug
          </button>
        </div>
      </div>
    </div>
    <div class="row">
      <NoteComponent v-for="note in state.notes" :key="note.id" :note-props="note" />
    </div>
  </div>

  <div class="container-fluid BugDetailsPage" v-else>
    <h1>This Bug is Closed</h1>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { logger } from '../utils/Logger'
import { bugService } from '../services/BugService'
import { AppState } from '../AppState'
import { noteService } from '../services/NoteService'
export default {
  name: 'BugDetailsPage',
  setup() {
    const route = useRoute()
    const state = reactive({
      editTitle: false,
      editDesc: false,
      notes: computed(() => AppState.notes),
      bug: computed(() => AppState.activeBug),
      account: computed(() => AppState.account),
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
      bug: computed(() => AppState.activeBug),
      async createNote() {
        try {
          await noteService.createNote(state.newNote, route.params.id)
          state.newNote.body = ''
        } catch (error) {
          logger.error(error)
        }
      },
      editBugTitle(e) {
        // console.log('editing Bug Title', e.target.innerText)
        try {
          bugService.editBugTitle(state.bug.id, e.target.innerText)
          // console.log(state.bug.id)
        } catch (error) {
          logger.log(error)
        }
      },
      editBugDesc(e) {
        try {
          bugService.editBugDesc(state.bug.id, e.target.innerText)
        } catch (error) {
          logger.log(error)
        }
      },
      closeBug(e) {
        try {
          bugService.closeBug(state.bug.id, state.bug.closed)
        } catch (error) {
          logger.log(error)
        }
      }
    }
  }
}
</script>

<style scoped>
</style>
