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
          title: 'Economy',
          url: 'https://us-east-1.online.tableau.com/#/site/devplatembed/views/Regional/Economy'
        },
        {
          title: 'Claims Cycle Management',
          url: 'https://us-east-1.online.tableau.com/#/site/devplatembed/views/ClaimsCycleManagement/ClaimCycleConsole'
        },
        {
          title: 'Claim Decision',
          url: 'https://us-east-1.online.tableau.com/#/site/devplatembed/views/ClaimsCycleManagement/ClaimDecision'
        },
        {
          title: 'Customers',
          url: 'https://us-east-1.online.tableau.com/#/site/devplatembed/views/Superstore/Customers'
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