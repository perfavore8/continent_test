<template>
  <div class="modal">
    <div
      class="backdrop"
      :class="{ backdrop_shadow: animationStart }"
      @click="close()"
    />
    <section class="section">
      <h2 class="section__header">Выбор населённого пункта:</h2>
      <button class="section__cross" @click="close()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="3 3 9 9"
        >
          <path
            fill="#979797"
            fill-rule="evenodd"
            d="M11.782 4.032a.575.575 0 1 0-.813-.814L7.5 6.687L4.032 3.218a.575.575 0 0 0-.814.814L6.687 7.5l-3.469 3.468a.575.575 0 0 0 .814.814L7.5 8.313l3.469 3.469a.575.575 0 0 0 .813-.814L8.313 7.5l3.469-3.468Z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <div class="search">
        <div class="wrapper">
          <input
            type="text"
            class="wrapper__input"
            :class="{ wrapper__input_opened: showSearchList }"
            placeholder="Например, Санкт-петербург"
            v-model="searchValue"
            @focusin="openList()"
          />
          <transition-group name="fade2">
            <template v-if="showSearchList">
              <ul class="wrapper__list list">
                <li class="list__line" />
                <li
                  class="list__item"
                  v-for="item in searchList"
                  :key="item.id"
                  @click="selectLocation(item)"
                >
                  {{ item.label }}
                </li>
              </ul>
              <button
                class="section__cross section__cross_small"
                @click="closeList()"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="3 3 9 9"
                >
                  <path
                    fill="#979797"
                    fill-rule="evenodd"
                    d="M11.782 4.032a.575.575 0 1 0-.813-.814L7.5 6.687L4.032 3.218a.575.575 0 0 0-.814.814L6.687 7.5l-3.469 3.468a.575.575 0 0 0 .814.814L7.5 8.313l3.469 3.469a.575.575 0 0 0 .813-.814L8.313 7.5l3.469-3.468Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </template>
          </transition-group>
        </div>
        <button
          class="search_btn"
          :disabled="!isAcceptBtnActive"
          @click="acceptLocation()"
        >
          Подтвердить
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import { nextTick } from "vue";
export default {
  name: "LocationModal",
  emits: { close: null },
  data() {
    return {
      animationStart: false,
      searchValue: "",
      searchList: [],
      showSearchList: false,
      timer: null,
      selectedLocation: {},
    };
  },
  computed: {
    isAcceptBtnActive() {
      return Boolean(Object.keys(this.selectedLocation).length);
    },
  },
  mounted() {
    setTimeout(() => {
      this.animationStart = true;
    }, 1);
  },
  watch: {
    searchValue(val) {
      clearTimeout(this.timer);
      if (val.length > 2) {
        this.openList();
        this.timer = setTimeout(async () => {
          this.searchList = await this.$store.dispatch(
            "getLocationsForChange",
            { term: val }
          );
        }, 300);
      }
    },
  },
  methods: {
    selectLocation(location) {
      this.selectedLocation = location;
      this.searchValue = location.label;
      this.closeList();
    },
    openList() {
      this.showSearchList = Boolean(this.searchValue.length > 2);
    },
    closeList() {
      nextTick(() => (this.showSearchList = false));
    },
    acceptLocation() {
      this.$store.commit("updateLocation", this.selectedLocation);
      this.close();
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style>
.modal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
}
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: transparent;
  opacity: 1;
  z-index: 19;
  transition: all 0.2s ease-out;
}
.backdrop_shadow {
  background-color: #353647;
  mix-blend-mode: normal;
  opacity: 0.8;
}
.section {
  position: relative;
  z-index: 20;
  padding: 28px 18px;
  background: #ffffff;
  box-shadow: 0px 2px 10px rgba(151, 151, 151, 0.2);
  border-radius: 5px;
  min-width: 750px;
  @media (max-width: 767.98px) {
    min-width: 0;
    width: 92%;
    padding: 18px;
  }
}
.section__header {
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: #272727;
  margin-bottom: 12px;
  margin-right: 40px;
}
.section__cross {
  cursor: pointer;
  position: absolute;
  top: 18px;
  right: 18px;
  width: 24px;
  height: 24px;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
}
.section__cross_small {
  width: 18px;
  height: 18px;
  padding: 3px;
}
.search {
  display: flex;
  flex-direction: row;
  gap: 18px;
  @media (max-width: 767.98px) {
    flex-wrap: wrap;
    justify-content: center;
  }
}
.wrapper__input {
  background: #ffffff;
  border: 1px solid rgba(151, 151, 151, 0.5);
  border-radius: 5px;
  width: 100%;
  padding: 12px;
  outline: none;

  font-weight: 400;
  font-size: 18px;
  line-height: 23px;
  color: #272727;
  transition: all 0.2s ease-out;
}
.wrapper__input_opened {
  border: 1px solid #272727;
  border-bottom: none;
  border-radius: 5px 5px 0 0;
}
.wrapper__input::placeholder,
.wrapper__input::-webkit-input-placeholder,
.wrapper__input:-moz-placeholder,
.wrapper__input::-moz-placeholder,
.wrapper__input:-ms-input-placeholder,
.wrapper__input::-ms-input-placeholder {
  font-weight: 400;
  font-size: 18px;
  line-height: 23px;
  color: #979797;
}
.search_btn {
  cursor: pointer;
  background: linear-gradient(270deg, #ffa800 0%, #ff6f00 60.2%);
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
  line-height: 21px;
  letter-spacing: 1.75px;
  text-transform: uppercase;
  color: #ffffff;
  border: none;
  padding: 12px 24px;
  height: 48px;
  transition: all 0.2s ease-out;
}
.search_btn:disabled {
  cursor: default;
  border: 2px solid rgba(151, 151, 151, 0.3);
  background: #fff;
  color: #26262680;
}
.wrapper {
  position: relative;
  width: 100%;
}
.wrapper__list {
  position: absolute;
  top: 100%;
  border: 1px solid #272727;
  border-top: none;
  border-radius: 0 0 5px 5px;
}
.list {
  background-color: #fff;
  padding: 12px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.list__line {
  position: absolute;
  top: 0;
  margin: 0 auto;
  width: 95%;
  height: 2px;
  background: #9797974d;
}
.list__item {
  cursor: pointer;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  color: #979797;
}
.list__item:hover,
.list__item:active {
  color: #272727;
}

.fade2-enter-active,
.fade2-leave-active {
  transition: all 0.2s ease-out;
}
.fade2-enter-from,
.fade2-leave-to {
  opacity: 0;
}
</style>
