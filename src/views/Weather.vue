<template>
  <v-layout column>
        <weather-table/>
    </v-layout>
</template>

<script>
import Filters from "@/components/weather/Filters";
import WeatherTable from "@/components/weather/WeatherTable";
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