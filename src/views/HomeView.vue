<template>
  <main class="main">
    <h2 class="main__header">Категории товаров</h2>
    <div class="grid">
      <transition-group name="list" mode="out-in">
        <div
          class="grid__item item"
          v-for="cat in categories"
          :key="cat.slug"
          @click="selectCat(cat)"
        >
          <div class="item__section">
            <h3 class="item__name" :style="{ color: cat.text_color }">
              {{ cat.name }}
            </h3>
          </div>
          <img class="item__img" :src="cat.image" />
        </div>
      </transition-group>
    </div>
  </main>
</template>

<script>
export default {
  name: "HomeView",
  computed: {
    categories() {
      return this.$store.state.categories.categories;
    },
    location() {
      return this.$store.state.location.location;
    },
    locationId() {
      return this.location.id;
    },
  },
  async mounted() {
    await this.getCategories();
  },
  watch: {
    locationId() {
      this.getCategories();
    },
  },
  methods: {
    selectCat(cat) {
      this.$store.commit("updateSelectedCategory", cat);
      this.$router.push("/category/" + cat.slug);
    },
    getCategories() {
      return this.$store.dispatch("getCategories", {
        city_id: this.location.id,
      });
    },
  },
};
</script>

<style scoped>
.main {
  width: 67%;
  margin: 35px auto;
  @media (max-width: 767.98px) {
    width: 92%;
  }
}
.main__header {
  font-weight: 600;
  font-size: 44px;
  line-height: 44px;
  margin-bottom: 20px;

  color: #272727;
}
.grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(275px, 0.8fr));
  justify-content: center;
  gap: 20px;
}
.grid__item {
  position: relative;
}
.item {
  cursor: pointer;
  border-radius: 5px;
}
.item__section {
  width: 100%;
  height: 100%;
  padding: 20px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
}
.item__name {
  font-weight: 600;
  font-size: 24px;
  line-height: 28px;
}
.item__img {
  width: 100%;
  border-radius: inherit;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.2s ease-out;
}
.list-enter-active {
  transition-delay: 0.2s;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
}
</style>
