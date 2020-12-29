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
                        <filters/>
                        <v-spacer/>
                    </v-layout>
                </v-layout>
            </template>

            <template v-slot:item="{ item }">
                <tr  @click="openItem(item)">
                    <td class="text-xs-left" style="width: 15%;">
                        <label class="text-truncate">
                            {{item.phone}}</label>
                    </td>
                    <td class="text-xs-left" style="width: 20%;">
                        <label class="text-truncate">
                            {{item.name}}</label>
                    </td>
                    <td class="text-xs-left" style="width: 20%;">
                        <v-layout align-center>
                            <div class="tier-div"
                                 v-if="item.idTier"
                                 :style="{'background-color': tiers.getTier(item.idTier).color}"></div>
                            <label style="margin-left: 10px;">{{item.idTier ? tiers.getTier(item.idTier).displayName :
                                '-'}}</label>
                        </v-layout>
                    </td>
                    <td class="text-xs-left" style="width: 10%;" @click.stop="">
                        <v-switch v-model="item.isActivate"
                                  @click.prevent="openBlockModal(item)"
                                  color="accent"></v-switch>
                    </td>
                </tr>
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

        <v-slide-x-reverse-transition>
            <template v-if="curCustomer">
                <h-istory-table :customer="curCustomer"
                                @switchPartnerStatus="switchPartnerStatus($event)"
                                @close="curCustomer = null"/>
            </template>
        </v-slide-x-reverse-transition>

        <v-dialog v-model="showModal"
                  width="400"
                  height="600"
                  :overlay-opacity="0.2"
                  content-class="elevation-0"
                  style="background: none !important;">
            <accept-modal :is-visible="showModal"
                          @close="showModal = false"
                          @toggleStatus="toggleStatus($event)"
                          :customer="blockedCustomer"/>
        </v-dialog>

        <v-snackbar v-model="snackbar"
                    top
                    app
                    style="margin-top: -50px;"
                    color="accent"
                    multi-line>
            Список будет отправлен Вам на почту. Это может занять несколько минут.
            <template v-slot:action="{ attrs }">
                <v-btn
                        color="white"
                        text
                        v-bind="attrs"
                        icon
                        @click="snackbar = false"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </template>
        </v-snackbar>
    </v-layout>
</template>

<script>
    import Filters from "./Filters";

    import moment from 'moment';

    export default {
        components: {
            Filters
        },
        name: "customers-table",
        filters: {
            twoDigits(value) {
                if (!value && value !== 0) return '-';
                return value.toFixed(2);
            }
        },
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
                    text: 'город',
                    align: 'left',
                    sortable: false,
                    value: 'city',
                },
                {
                    text: 'Партнеры (Пролив: бензин+дизель/газ)',
                    align: 'left',
                    sortable: false,
                    value: 'createDate',
                },
                {
                    text: '',
                    align: 'left',
                    sortable: false,
                    value: 'actions',
                }
            ],
            phone: '',
            items: [],
            loading: false,
            perPage: 50,
            page: 1,
            totalCount: 1,
            curCustomer: null,
            showModal: false,
            blockedCustomer: null,
            loadingXls: false,
            snackbar: false
        }),
        computed: {
            width() {
                return this.$store.state.width
            },
            height() {
                return this.$store.state.height
            },
            tiers() {
                return this.$store.state.tiers
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
                    headers: {token: localStorage.getItem("token")},
                    params: {
                        page: this.page,
                        limit: this.perPage,
                        ...this.$route.query,
                        startDate: this.$route.query.startDate ?
                            moment(this.$route.query.startDate).format("YYYY-MM-DDTHH:mm:ss.SSSSZ") : null,
                        endDate: this.$route.query.endDate ?
                            moment(this.$route.query.endDate).format("YYYY-MM-DDTHH:mm:ss.SSSSZ") : null
                    }
                };
                console.log(params)
                this.$http.get("/customers", params)
                    .then(response => {
                        console.log('customer response', response.data.data)
                        this.items = response.data.data.items;
                        this.totalCount = response.data.data.count
                    }).catch(error => {
                    console.log(error)
                    switch (error.response.status) {
                        case 406:
                            // this.$router.history.push({name: 'login'})
                            break;
                        case 401:
                            this.$router.history.push({name: 'login'});
                            break;
                        default:
                            console.log('error');
                            break;
                    }
                }).finally(() => {
                    setTimeout(() => {
                        this.loading = false
                    }, 500)
                })
            },
            openItem(customer) {
                this.curCustomer = customer
            },
            openBlockModal(customer) {
                this.blockedCustomer = customer;
                this.showModal = true;
            },
            toggleStatus(isBlocked) {
                this.blockedCustomer.isActivate = !this.blockedCustomer.isActivate;
                if (isBlocked) {
                    for (let p in this.blockedCustomer.partners)
                        if (this.blockedCustomer.partners[p].isActivate)
                            this.blockedCustomer.partners[p].isActivate = false;
                }
            },
            switchPartnerStatus(partner) {
                this.curCustomer.partners[partner.idPartner].isActivate = partner.isActivate
            }
        },
        created() {
            const query = this.$route.query;
            this.page = parseInt(query.page || 1);
            this.phone = query.phone || '';
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


    .tier-div {
        width: 16px;
        height: 16px;
        min-width: 16px;
        min-height: 16px;
        margin-right: 5px;
        transform: rotate(45deg);
        border: 2px white;
    }

    .expanded-td {
        padding: 0 7% 0 7%;
    }

    .overlay-div {
        height: 50px;
        border: 5px;
        max-width: 95%;
        margin: 0 auto;
        margin-top: -35px;
    }

    .status-indicator {
        min-width: 20px;
        max-width: 20px;
        height: 20px;
        border-radius: 10px;
        margin-right: 5px;
    }
</style>