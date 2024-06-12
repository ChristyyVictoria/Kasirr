<!-- src/components/Cashier.vue -->

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-2">
        <SideBar />
      </div>
      <div class="col-md-10 mt-5">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from './SideBar.vue';

export default {
  components: {
    SideBar,
  },
};
</script>

<style scoped>
.container-fluid {
  padding-left: 0;
}
</style>
