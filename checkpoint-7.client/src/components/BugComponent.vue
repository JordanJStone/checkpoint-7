<template>
  <div class="col-12 my-3 mx-5 bug-component">
    <router-link :to="{name: 'BugDetailsPage', params: {id: bugProp.id}}" v-if="bugProp.closed == true" class="red">
      <div> {{ bugProp.title }}  {{ bugProp.creator.name }}  {{ bugProp.closed }} </div>
      <!-- NOTE Last modified date needs to be put into the line of bug info above -->
    </router-link>
    <router-link :to="{name: 'BugDetailsPage', params: {id: bugProp.id}}" v-else>
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
      bugs: computed(() => AppState.bugs),
      date: Date.now()
      // filteredBugs: computed(() => AppState.bugs.filter(closed === false))
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
.red {
  color: red;
}
</style>
