<template>
  <div>
    <filters/>
    <airport_data/>
    <WeatherTable></WeatherTable>
  </div>
</template>

<script>
import Airport_data from "@/components/airport/Airport_data";
import Filters from "@/components/airport/Filters";
import WeatherTable from "@/components/airport/WeatherTable";
export default {
name: "airport",
  components: {
    Airport_data,
    WeatherTable,
    Filters
  }
}
</script>

<style scoped>

</style>