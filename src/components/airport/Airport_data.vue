<template>
    <v-layout column class="content-layout">
        <v-data-table :headers="headers"
                      :items="items"
                      hide-default-footer
                      disable-sort
                      :mobile-breakpoint="200"
                      fixed-header
                      no-data-text="Нет данных"
                      loading-text="Загрузка"
                      :loading="loading"
                      class="scroll-y elevation-3"
                      :style="{'min-height': height - 140 + 'px'}"
                      style="margin-top: 20px; width: 100%; margin-left: -15px;">
            <template v-slot:top>
                <v-layout justify-start column align-start>
                    <v-layout>
                        <v-layout class="table-badge primary elevation-3" align-center justify-center>
                            <v-icon large color="white">mdi-airport</v-icon>
                        </v-layout>
                        <label class="table-title">Данные аеропорта</label>
                    </v-layout>

                    <v-layout style="padding: 0 20px 0 20px; width: 100%;"
                              justify-space-between>
                        <v-spacer/>
                    </v-layout>
                </v-layout>
            </template>
        </v-data-table>
    </v-layout>
</template>

<script>
    export default {
        name: "airport_data",
        data: () => ({
            headers: [
                {
                    text: 'Аеропорт',
                    align: 'left',
                    sortable: false,
                    value: 'code',
                },
                {
                    text: 'Координаты lat',
                    align: 'left',
                    sortable: false,
                    value: 'location_lat',
                },
                {
                    text: 'Координаты lng',
                    align: 'left',
                    sortable: false,
                    value: 'location_lng',
                },
                {
                    text: 'Город',
                    align: 'left',
                    sortable: false,
                    value: 'city',
                },
                {
                    text: 'Страна',
                    align: 'left',
                    sortable: false,
                    value: 'country',
                },
                {
                    text: 'Штат',
                    align: 'left',
                    sortable: false,
                    value: 'state',
                },
                {
                    text: 'Зипкод',
                    align: 'left',
                    sortable: false,
                    value: 'zipcode',
                }
            ],
            items: [],
            loading: false,
            showModal: false
        }),
        watch: {
            '$route'() {
                this.getItems()

            }
        },
        computed: {
            width() {
                return this.$store.state.width
            },
            height() {
                return this.$store.state.height
            }
        },
        methods: {
            getItems() {
                this.loading = true;
                const params = {
                        ...this.$route.query
                };
                console.log(params)
                this.$http.post("/airport/info", params)
                    .then(response => {
                        this.items = response.data.data.info;
                        console.log(this.items);
                    })
                    .catch(error => {
                    console.log(error)
                    switch (error.response.status) {
                        case 406:
                            break;
                        case 401:
                            console.log('error!!');
                            break;
                        default:
                            console.log('error55555555');
                            break;
                    }
                }).finally(() => {
                    setTimeout(() => {
                        this.loading = false
                    }, 500)
                })
            }
        },
        mounted() {
            this.getItems()
        }
    }
</script>

<style scoped>
    .content-layout {
        padding: 20px 15px 0 35px;
    }

    .table-badge {
        max-width: 80px;
        min-width: 80px;
        height: 80px;
        margin: -25px 20px 0 20px;
        border-radius: 5px;
    }

    .table-title {
        font-size: 16pt;
        margin-top: 15px;
        font-weight: 500;
    }
</style>