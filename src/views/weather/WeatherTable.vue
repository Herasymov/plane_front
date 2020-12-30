<template>
    <v-layout column class="content-layout">
        <v-data-table :headers="headers"
                      :items="items"
                      hide-default-footer
                      disable-sort
                      :mobile-breakpoint="200"
                      fixed-header
                      no-data-text="Список зафиксированых погодных проишествий пуст"
                      loading-text="Загрузка"
                      :items-per-page="perPage"
                      :loading="loading"
                      class="scroll-y elevation-3"
                      item-key="idCustomer"
                      :style="{'min-height': height - 140 + 'px'}"
                      style="margin-top: 20px; width: 100%; margin-left: -15px;">
            <template v-slot:top>
                <v-layout justify-start column align-start>
                    <v-layout>
                        <v-layout class="table-badge primary elevation-3" align-center justify-center>
                            <v-icon large color="white">mdi-account</v-icon>
                        </v-layout>
                        <label class="table-title">Список погодных проишествий</label>
                    </v-layout>

                    <v-layout style="padding: 0 20px 0 20px; width: 100%;"
                              justify-space-between>
<!--                        <filters/>-->
                        <v-spacer/>
                    </v-layout>
                </v-layout>
            </template>


            <template v-slot:footer>
                <v-layout justify-center fill-height align-end>
                    <v-pagination v-model="page"
                                  color="accent"
                                  :total-visible="10"
                                  :length="pagesCount"/>
                </v-layout>
            </template>
        </v-data-table>
    </v-layout>
</template>

<script>
    // import Filters from "./Filters";

    import moment from 'moment';

    export default {
        // components: {
        //     Filters
        // },
        name: "customers-table",
        // filters: {
        //     twoDigits(value) {
        //         if (!value && value !== 0) return '-';
        //         return value.toFixed(2);
        //     }
        // },
        data: () => ({
            headers: [
                {
                    text: 'Погода',
                    align: 'left',
                    sortable: false,
                    value: 'type',
                },
                {
                    text: 'Уровень',
                    align: 'left',
                    sortable: false,
                    value: 'severity',
                },
                {
                    text: 'Аеропорт',
                    align: 'left',
                    sortable: false,
                    value: 'airport',
                },
                {
                    text: 'Город',
                    align: 'left',
                    sortable: false,
                    value: 'city',
                },
                {
                    text: 'Дата начала',
                    align: 'left',
                    sortable: false,
                    value: 'createDate',
                },
                {
                    text: 'Дата окончания',
                    align: 'left',
                    sortable: false,
                    value: 'endDate',
                },
                {
                    text: '',
                    align: 'left',
                    sortable: false,
                    value: 'actions'
                }
            ],
            items: [],
            loading: false,
            perPage: 10,
            page: 1,
            totalCount: 1,
            curCustomer: null,
            showModal: false
        }),
        computed: {
            width() {
                return this.$store.state.width
            },
            height() {
                return this.$store.state.height
            },
            pagesCount() {
                return Math.ceil(this.totalCount / this.perPage) || 1
            }
        },
        watch: {
            '$route'(to) {
                const query = to.query;

                this.page = query.page;
                this.phone = query.phone;
                this.startDate = query.startDate;
                this.endDate = query.endDate;

                this.getItems()
            },
            page(to) {
                const query = this.$route.query;
                this.$router.history.push({name: this.$route.name, query: {...query, page: to}})
                this.getItems();
                window.scrollTo(0, 0);
            },
        },
        methods: {
            getItems() {
                this.loading = true;
                const params = {
                    params: {
                        page: this.page,
                        limit: this.perPage,
                        weatherType: "Rain",
                        startDate: "2017-05-24",
                        endDate: "2017-05-25"
                        // ...this.$route.query,
                        // startDate: this.$route.query.startDate ?
                        //     moment(this.$route.query.startDate).format("YYYY-MM-DDTHH:mm:ss.SSSSZ") : null,
                        // endDate: this.$route.query.endDate ?
                        //     moment(this.$route.query.endDate).format("YYYY-MM-DDTHH:mm:ss.SSSSZ") : null
                    }
                };
                console.log(params)
                this.$http.get("/statistics/stat", params)
                    .catch(error => {
                    console.log(error)
                    switch (error.response.status) {
                        case 406:
                            break;
                        case 401:
                            this.$router.history.push({name: 'login'});
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
        created() {
            const query = this.$route.query;
            this.page = parseInt(query.page || 1);
            this.page = query.page || '';
            this.startDate = query.startDate || '';
            this.endDate = query.endDate || '';
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