<template>
  <v-layout column>
        <weather-table/>
    </v-layout>
</template>

<script>
import Filters from "@/views/weather/Filters";
import WeatherTable from "@/views/weather/WeatherTable";
export default {
  name: "Weather",
  components: {
    WeatherTable,
    Filters
  }
}
</script>

<style scoped>

</style>