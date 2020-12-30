<template>
    <v-layout justify-start
              class="filters-layout"
              align-center>
        <v-text-field prepend-icon="mdi-account"
                      color="accent"
                      placeholder="ФИО"
                      clearable
                      v-model="name"
                      class="phone-input"/>
        <v-text-field prepend-icon="mdi-card"
                      color="accent"
                      placeholder="Номер карты"
                      clearable
                      v-model="externalId"
                      class="phone-input"/>
        <div>{{ new Date() | dateFormat('YYYY.MM.DD') }}</div>
        <v-text-field prepend-icon="mdi-phone"
                      color="accent"
                      placeholder="Номер телефона"
                      clearable
                      v-model="phone"
                      class="phone-input"/>

        <v-menu
                ref="startMenu"
                v-model="startMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                :nudge-bottom="-15"
                min-width="290px"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-text-field
                        v-model="startDateString"
                        placeholder="С"
                        prepend-icon="mdi-calendar"
                        class="date-input"
                        readonly
                        color="accent"
                        v-bind="attrs"
                        v-on="on"
                        clearable
                ></v-text-field>
            </template>
            <v-date-picker v-model="startDate"
                           no-title
                           first-day-of-week="1"
                           locale="ru">
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="startMenu = false">Cancel</v-btn>
                <v-btn text color="primary" @click="saveDate(startDate, 'startDateString')">OK</v-btn>
            </v-date-picker>
        </v-menu>
        <label class="date-divider">-</label>
        <v-menu
                ref="endMenu"
                v-model="endMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                :nudge-bottom="-15"
                min-width="290px"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-text-field
                        v-model="endDateString"
                        placeholder="По"
                        class="date-input"
                        readonly
                        color="accent"
                        v-bind="attrs"
                        v-on="on"
                        clearable
                ></v-text-field>
            </template>
            <v-date-picker v-model="endDate"
                           no-title
                           :min="minDate"
                           first-day-of-week="1"
                           locale="ru">
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="endMenu = false">Cancel</v-btn>
                <v-btn text color="primary" @click="saveDate(endDate, 'endDateString')">OK</v-btn>
            </v-date-picker>
        </v-menu>
    </v-layout>
</template>

<script>
    import moment from 'moment'

    export default {
        name: "filters",
        data: () => ({
            startMenu: false,
            endMenu: false,
            startDate: "",
            startDateString: "",
            endDate: "",
            endDateString: "",
            phone: "",
            name: "",
            externalId: ""
        }),
        computed: {
            minDate() {
                return this.startDate ? this.startDate : ""
            }
        },
        watch: {
            phone(to) {
                this.updateQuery('phone', to)
            },
            name(to) {
                this.updateQuery('name', to)
            },
            externalId(to) {
                this.updateQuery('externalId', to)
            },
            startDateString(to) {
                const query = {...this.$route.query};
                console.log('to', to)
                if (to) {
                    this.$router.history.push({name: 'customers', query: {...query, page: 1, startDate: this.startDate}})
                } else {
                    delete query["startDate"];
                    console.log(query)
                    this.$router.history.push({name: 'customers', query: {...query, page: 1}})
                }
            },
            endDateString(to) {
                const query = {...this.$route.query};

                if (to) {
                    this.$router.history.push({name: 'customers', query: {...query, page: 1, endDate: this.endDate}})
                } else {
                    delete query["endDate"];
                    this.$router.history.push({name: 'customers', query: {...query, page: 1}})
                }
            }
        },
        methods: {
            saveDate(date, key) {
                this[key] = moment(date).format("DD.MM.YY");
                this.startMenu = false;
                this.endMenu = false;
            },
            updateQuery(key, to) {
                const query = {...this.$route.query};

                if (to) {
                    this.$router.history.push({name: 'customers', query: {...query, page: 1, [key]: to}})
                } else {
                    delete query[key];
                    this.$router.history.push({name: 'customers', query: {...query, page: 1}})
                }
            }
        },
        created() {
            const query = this.$route.query;
            this.phone = query.phone || '';
            this.name = query.name || '';
            this.externalId = query.externalId || '';

            this.startDate = query.startDate || '';
            if (this.startDate) {
                this.saveDate(this.startDate, 'startDateString')
            }

            this.endDate = query.endDate || '';
            if (this.endDate) {
                this.saveDate(this.endDate, 'endDateString')
            }
        }
    }
</script>

<style scoped>
    .phone-input {
        max-width: 200px;
        margin-right: 15px;
    }

    .filters-layout {
        padding-right: 25px;
        z-index: 10;
        width: 100%
    }

    .date-input {
        max-width: 130px;
        margin: 0 10px 0 0;
    }

    .date-divider {
        margin: 0 10px 0 0;
    }
</style>