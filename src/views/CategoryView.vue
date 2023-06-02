<template>
  <main class="main">
    <CategorySideBar :list="subCats" />
    <div class="grid">
      <CategoryGridCard
        v-for="item in filteredProducts"
        :key="item"
        :item="item"
      />
    </div>
  </main>
</template>

<script>
import CategorySideBar from "@/components/CategorySideBar.vue";
import CategoryGridCard from "@/components/CategoryGridCard.vue";
export default {
  name: "CategoryView",
  components: {
    CategorySideBar,
    CategoryGridCard,
  },
  computed: {
    city_id() {
      return this.$store.state.location.location.id;
    },
    products() {
      return this.$store.state.products.products;
    },
    filteredProducts() {
      return this.products.filter((product) => {
        const tags = [];
        product.tags.forEach((tag) => tags.push(tag.slug));
        if (!this.selectedSubCat) return true;
        return tags.includes(this.selectedSubCat);
      });
    },
    subCats() {
      return this.$store.state.categories.selectedCategory?.children;
    },
    selectedCat() {
      return this.$route.params.catName;
    },
    selectedSubCat() {
      return this.$route.params.subCatName;
    },
  },
  created() {
    const localSelectedCategory = JSON.parse(
      localStorage.getItem("selectedCategory")
    );
    if (
      !Object.keys(localSelectedCategory).length ||
      localSelectedCategory.slug !== this.selectedCat
    ) {
      this.$router.push("/");
    } else {
      this.$store.commit("updateSelectedCategory", localSelectedCategory);
      this.$store.dispatch("getProducts", {
        city_id: this.city_id,
        slug: this.selectedCat,
      });
    }
  },
};
</script>

<style scoped>
.main {
  width: 67%;
  margin: 35px auto;
  display: grid;
  grid-template-columns: min-content auto;
  gap: 34px;
}
.grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 275px);
  gap: 24px;
}
</style>
