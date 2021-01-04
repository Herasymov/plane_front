<template>
  <div class="home">
    <sidebar/>
    <v-main>
      <router-view/>
    </v-main>
  </div>
</template>

<script>

import Sidebar from '../components/Sidebar'
export default {
  name: 'Home',
  components: {
    Sidebar
  }
}
</script>
