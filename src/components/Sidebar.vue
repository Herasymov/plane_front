<template>
    <v-navigation-drawer app
                         fixed
                         light
                         width="300"
    >
        <v-layout column fill-height>
            <v-layout class="title-label" align-center justify-start style="padding-left: 25px;">
                <v-img src="../assets/logo.svg"
                       max-height="60"
                       max-width="240"></v-img>
            </v-layout>
            <v-list nav
                    style="margin-top: 0; width: 100%; background: none;">
                <v-list-item
                        v-for="(t, i) in tabs"
                        :key="i"
                        :to="t.to"
                        link
                        active-class="primary white--text"
                        :title="t.title"
                >
                    <v-list-item-avatar>
                        <v-icon>{{ t.icon }}</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title>{{ t.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-layout>
    </v-navigation-drawer>
</template>

<script>
    export default {
        name: "sidebar",
        data: () => ({
            tabs: [
                {title: 'Погодные условия', to: {name: 'weather'}, icon: 'mdi-weather-snowy-heavy'},
                {title: 'Аэропорты', to: {name: 'airport'}, icon: 'mdi-airport'},
                {title: 'Чат', to: {name: 'chat'}, icon: 'mdi-chat'}
            ]
        })
    }
</script>

<style scoped>
    .title-label {
        font-size: 32pt;
        max-height: 80px;
        padding-top: 20px;
        padding-bottom: 10px;
    }
</style>