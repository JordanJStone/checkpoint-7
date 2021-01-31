<template>
  <div class="col-12 my-3 mx-5">
    <router-link :to="{name: 'BugDetailsPage', params: {id: bugProp.id}}">
      <h4> {{ bugProp.title }}</h4>
      <h6> {{ bugProp.creator.name }}</h6>
    </router-link>
    <!-- NOTE Put a icon here to close, NOT DELETE a bug -->
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
