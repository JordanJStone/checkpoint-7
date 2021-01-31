<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col my-5">
        <form action="form-inline border justify-content-center align-items-center" @submit.prevent="createBug">
          <div class="col-4 pr-0">
            <input
              type="text"
              name="title"
              id="title"
              v-model="state.newBug.title"
              class="form-control d-flex"
              placeholder="Report Bug"
            />
          </div>
          <div class="col-1 pl-0">
            <button type="submit" class="btn btn-success">
              +
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="row justify-content-center text-center">
      <!-- NOTE A component needs to go here to iterate over -->
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Appstate } from '../AppState'
import { bugService } from '../services/BugService'
import { logger } from '../utils/Logger'
export default {
  name: 'BugsPage',
  setup() {
    const router = useRouter()
    const state = reactive({
      account: computed(() => Appstate.account),
      user: computed(() => Appstate.user),
      newBug: {}
    })
    onMounted(async() => {
      try {
        await bugService.getBugs()
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      state,
      bugs: computed(() => Appstate.bugs),
      async createBug() {
        try {
          // console.log('this is your new bug', state.newBug)
          const id = await bugService.createBug(state.newBug)
          state.newBug = {}
          router.push({ name: 'BugDetailsPage', params: { id } })
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
