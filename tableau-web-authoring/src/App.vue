<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="glossy">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title>{{getTitle()}}</q-toolbar-title>

        <q-toggle v-model="authoringMode" label="Edit Mode" color="green" keep-color/>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Tableau Dashboards</q-item-label>
        <q-item v-for="(dashboard, index) in dashboards" :key="dashboard.url" 
          clickable v-on:click="changeDashboard(index)" :class="isActive(index)">
          <q-item-section>
            <q-item-label>{{dashboard.title}}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <tableau-embedded-viz :vizUrl="getUrl()" :authoringMode="authoringMode"/>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import TableauEmbeddedViz from './components/TableauEmbeddedViz.vue'
export default {
  name: 'LayoutDefault',
  components: {
    'tableau-embedded-viz': TableauEmbeddedViz
  },
  data(){
    return {
      authoringMode: false,
      index: 0,
      dashboards: [
        {
          title: 'Customer Analysis',
          url: 'https://10ax.online.tableau.com/#/site/datadevday/views/Superstore/Customers'
        },
        {
          title: 'Product Drilldown',
          url: 'https://10ax.online.tableau.com/#/site/datadevday/views/Superstore/Product'
        },
        {
          title: 'Iris Identification',
          url: 'https://10ax.online.tableau.com/#/site/datadevday/views/TempIris/IrisSpeciesIdentification'
        },
        {
          title: 'NCAA Golf',
          url: 'https://10ax.online.tableau.com/#/site/datadevday/views/2019NCAAD1MensGolfChampionshipbyChrisDeMartinitableauonlineconverted/NCAAD1MensChampionship'
        },
      ]
    }
  },
  methods: {
    changeDashboard: function(index) {
      this.index = index;
    },
    getTitle: function() {
      return this.dashboards[this.index].title;
    },
    getUrl: function() {
      return this.dashboards[this.index].url;
    },
    isActive: function(index) {
      return index===this.index ? 'tab-active' : '';
    }
  },
  setup () {
    return {
      leftDrawerOpen: ref(false)
    }
  }
}
</script>

<style lang="sass">
.tab-active
  background-color: $blue
  color: #FFF
</style>