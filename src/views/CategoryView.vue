<template>
  <main class="main">
    <CategorySideBar />
  </main>
</template>

<script>
import CategorySideBar from "@/components/CategorySideBar.vue";
export default {
  name: "CategoryView",
  components: {
    CategorySideBar,
  },
};
</script>

<style scoped>
.main {
  width: 67%;
  margin: 35px auto;
}
</style>
