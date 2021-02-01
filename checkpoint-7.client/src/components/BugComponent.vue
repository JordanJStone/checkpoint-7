<template>
  <div class="col-12 my-3 mx-5 bug-component">
    <router-link :to="{name: 'BugDetailsPage', params: {id: bugProp.id}}">
      <div> {{ bugProp.title }}  {{ bugProp.creator.name }}  {{ bugProp.closed }} </div>
      <!-- NOTE Last modified date needs to be put into the line of bug info above -->
    </router-link>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { bugService } from '../services/BugService'
import { logger } from '../utils/Logger'
export default {
  name: 'BugComponent',
  props: {
    bugProp: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      account: computed(() => AppState.account),
      bugs: computed(() => AppState.bugs)
    })
    return {
      state,

      deleteBug(bugProp) {
        try {
          console.log('this is the delete bug', props.bugProp.id)
          bugService.deleteBug(props.bugProp.id)
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
