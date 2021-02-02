<template>
  <div class="col-12 my-3 mx-5 bug-component">
    <router-link :to="{name: 'BugDetailsPage', params: {id: bugProp.id}}" v-if="bugProp.closed == true" class="red">
      <div> {{ bugProp.title }}  {{ bugProp.creator.name }}  {{ bugProp.closed }} </div>
      <p>{{ bugProp.updatedAt.substring(0, bugProp.updatedAt.indexOf('T')) }}</p>
    </router-link>
    <router-link :to="{name: 'BugDetailsPage', params: {id: bugProp.id}}" v-else>
      <div> {{ bugProp.title }}  {{ bugProp.creator.name }}  {{ bugProp.closed }} </div>
      <p>{{ bugProp.updatedAt.substring(0, bugProp.updatedAt.indexOf('T')) }}</p>
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
      // date: computed(()=>{
      //   return new Date(bugProp.updatedAt.substring(0, bugProp.updatedAt.indexOf('T')).toLocaleString('en-US', {month: 'short', day: 'numeric', year: 'numeric'}))
      // })
      // filteredBugs: computed(() => AppState.bugs.filter(closed === false))
    })
    return {
      state,

      deleteBug(bugProp) {
        try {
          // console.log('this is the delete bug', props.bugProp.id)
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
