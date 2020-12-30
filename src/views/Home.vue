<template>
  <div class="home">
    <sidebar/>
    <appbar/>
    <v-main>
      <router-view/>
    </v-main>
  </div>
</template>

<script>

import Sidebar from '../components/Sidebar'
import Appbar from "../components/Appbar";
export default {
  name: 'Home',
  components: {
    Sidebar,
    Appbar
  }
}
</script>
