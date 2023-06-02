<template>
  <aside class="aside">
    <ul class="list aside__list">
      <li
        class="list__item"
        :class="{ list__item_selected: subCat.slug === selectedSubCat }"
        v-for="subCat in subCats"
        :key="subCat.slug"
        @click="selectSubCat(subCat.slug)"
      >
        {{ subCat.name }}
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  props: { list: { type: Array, required: false } },
  data() {
    return { selectedSubCat: "" };
  },
  computed: {
    subCats() {
      const obj = {
        name: "Все продукты",
        slug: "",
      };
      return [obj, ...this.list];
    },
  },
  methods: {
    selectSubCat(val) {
      this.selectedSubCat = val;
      this.$router.push({ name: "category", params: { subCatName: val } });
    },
  },
};
</script>

<style scoped>
.aside {
  width: 240px;
}
.aside__list {
  padding: 0;
  align-items: start;
  gap: 0;
}
.list__item {
  padding: 8px 12px;
  cursor: pointer;
  width: 100%;
  border-bottom: 1px solid #e9eef3;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #000000;
}
.list__item_selected {
  color: #202648;
  background: #e9eef3;
}
</style>
