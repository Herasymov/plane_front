<template>
  <v-layout column class="content-layout">
    <v-layout justify-start
              class="filters-layout"
              align-center>
        <v-text-field prepend-icon="mdi-account"
                      color="accent"
                      placeholder="Код аеропорта"
                      clearable
                      v-model="airportCode"
                      class="code-input"/>
    </v-layout>
  </v-layout>
</template>

<script>
    export default {
        name: "filters",
        data: () => ({
            airportCode: ""
        }),
        watch: {
            airportCode(to) {
                this.updateQuery('airportCode', to)
            }
        },
        methods: {
            updateQuery(key, to) {
                const query = {...this.$route.query};

                if (to) {
                    this.$router.history.push({name: 'airport', query: {...query, page: 1, [key]: to}})
                } else {
                    delete query[key];
                    this.$router.history.push({name: 'airport', query: {...query, page: 1}})
                }
            }
        },
        created() {
            const query = this.$route.query;
            this.airportCode = query.airportCode || '';
        }
    }
</script>

<style scoped>
    .content-layout {
        margin: 2%;
        max-width: 100%;
        background-color: white;
        padding-left: 43%;
    }
    .code-input {
        max-width: 200px;
    }

    .filters-layout {
        padding-right: 25px;
        z-index: 10;
        width: 100%
    }
</style>