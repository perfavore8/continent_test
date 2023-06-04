<template>
  <aside class="aside">
    <ul class="list aside__list">
      <li
        class="list__item"
        :class="{
          list__item_selected: subCat.slug === selectedSubCat,
          list__item_show: showForMobile,
        }"
        v-for="subCat in subCats"
        :key="subCat.slug"
        @click="selectSubCat(subCat.slug), toggleShowForMobile(subCat.slug)"
      >
        {{ subCat.name }}
      </li>
    </ul>
    <div class="aside__mobile-icon">
      <svg
        class="h-5 w-5 text-gray-400"
        viewBox="0 0 20 20"
        fill="#575757"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </div>
  </aside>
</template>

<script>
export default {
  props: { list: { type: Array, required: false } },
  data() {
    return { selectedSubCat: "", showForMobile: false };
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
  mounted() {
    if (this.$route.params.subCatName)
      this.selectedSubCat = this.$route.params.subCatName;
  },
  methods: {
    selectSubCat(val) {
      this.selectedSubCat = val;
      this.$router.push({ name: "category", params: { subCatName: val } });
    },
    toggleShowForMobile(slug) {
      if (this.showForMobile) {
        this.showForMobile = false;
        return;
      }
      if (this.selectedSubCat === slug) this.showForMobile = true;
    },
  },
};
</script>

<style scoped>
.aside {
  width: 240px;
  position: relative;
  @media (max-width: 767.98px) {
    width: 100%;
  }
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
.list__item:not(.list__item_selected):not(.list__item_show) {
  @media (max-width: 767.98px) {
    display: none;
  }
}
.aside__mobile-icon {
  position: absolute;
  top: 8px;
  right: 4px;
  width: 24px;
  height: 24px;
  display: none;
  @media (max-width: 767.98px) {
    display: block;
  }
}
</style>
