<template>
  <header class="header">
    <button class="header__btn" @click="back()">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="4 4 16 16"
        style="transform: rotate(-90deg)"
      >
        <g fill="none">
          <path
            d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"
          />
          <path
            fill="white"
            d="M12.707 3.636a1 1 0 0 0-1.414 0L5.636 9.293a1 1 0 1 0 1.414 1.414L11 6.757V20a1 1 0 1 0 2 0V6.757l3.95 3.95a1 1 0 0 0 1.414-1.414l-5.657-5.657Z"
          />
        </g>
      </svg>
    </button>
    <span class="header__category">{{ selectedCatName }}</span>
  </header>
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
    selectedCatName() {
      return this.$store.state.categories.selectedCategory.name;
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
  methods: {
    back() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.main {
  width: 67%;
  margin: 20px auto;
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
.header {
  width: 67%;
  margin: 35px auto;
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
}
.header__btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #030303;
}
.header__category {
  font-weight: 600;
  font-size: 44px;
  line-height: 44px;
  color: #272727;
}
</style>
