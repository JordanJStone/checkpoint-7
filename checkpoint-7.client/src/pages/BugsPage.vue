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
              placeholder="Bug title issue"
            />
          </div>
          <div class="col-4 pr-0">
            <input
              type="text"
              name="description"
              id="description"
              v-model="state.newBug.description"
              class="form-control d-flex"
              placeholder="Describe the bug"
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
    <div class="row">
      <div class="offset-9 col-3">
        Show only Open Bugs
        <input type="checkbox" />
      </div>
    </div>
    <div class="row justify-content-center text-center">
      <BugComponent v-for="bug in bugs" :key="bug.id" :bug-prop="bug" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { AppState } from '../AppState'
import { bugService } from '../services/BugService'
import { logger } from '../utils/Logger'
export default {
  name: 'BugsPage',
  setup() {
    const router = useRouter()
    const state = reactive({
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      bug: computed(() => AppState.activeBug),
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
      bugs: computed(() => AppState.bugs),
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
      // async filterBugs() {
      //   try {
      //     bugService.filterBugs()
      //   } catch (error) {
      //     logger.log(error)
      //   }
      // }
    }
  }
}
</script>

<style scoped>

</style>
