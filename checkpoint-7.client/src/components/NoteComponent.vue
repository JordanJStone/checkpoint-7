<template>
  <div class="note-component">
    <span>{{ noteProps.body }} - {{ noteProps.creator.name }}
      <i class="fa fa-trash text-danger" v-if="state.account.id == noteProps.creatorId" @click="deleteComment" aria-hidden="true"></i>
    </span>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { noteService } from '../services/NoteService'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
export default {
  name: 'NoteComponent',
  props: {
    noteProps: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      account: computed(() => AppState.account)
    })
    return {
      state,
      deleteNote() {
        try {
          console.log('this is the delete note from component', props.noteProps.bug)
          noteService.deleteNote(props.noteProps)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  },
  components: {}
}
</script>

<style scoped>

</style>
