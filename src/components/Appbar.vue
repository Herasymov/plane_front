<template>
    <v-app-bar app class="transparent elevation-0 navigation-bar">
        <v-btn fab small @click="toggleDrawer" class="elevation-4" style="z-index: 15 !important;">
            <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
    </v-app-bar>
</template>

<script>
    export default {
        name: "appbar",
        methods: {
            toggleDrawer() {
                if (this.drawer && this.width < 1260) {
                    this.$store.dispatch('toggleDrawer')
                    this.$nextTick().then(() => {
                        this.$store.dispatch('toggleDrawer')
                    })
                } else this.$store.dispatch('toggleDrawer')
            }
        }
    }
</script>

<style scoped>
    .navigation-bar {
        padding-top: 10px !important;
    }

    .nav-button {
        margin-right: 10px;
        background: none !important;
    }

    .active-class {
        background: rgba(100,100,100,0.4) !important;
    }
</style>