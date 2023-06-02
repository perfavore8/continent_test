<template>
  <header>
    <div class="location">
      <div class="location__marker">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="#dadada"
            d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Z"
          />
        </svg>
      </div>
      <span class="location__span" @click="toggleLocationModal(true)">
        {{ location.city }}
      </span>
    </div>
  </header>
  <router-view />
  <transition name="fade1">
    <LocationModal
      v-if="showLocationModal"
      @close="() => toggleLocationModal(false)"
    />
  </transition>
</template>

<script>
import LocationModal from "@/components/LocationModal.vue";
export default {
  components: { LocationModal },
  data() {
    return {
      showLocationModal: false,
    };
  },
  computed: {
    location() {
      return this.$store.state.location.location;
    },
  },
  mounted() {
    const localLocation = JSON.parse(localStorage.getItem("location"));
    if (Object.keys(localLocation).length) {
      this.$store.commit("updateLocation", localLocation);
    } else {
      this.$store.dispatch("getLocation", { id: 1 });
    }
  },
  methods: {
    toggleLocationModal(val) {
      this.showLocationModal = val;
    },
  },
};
</script>

<style>
@import url("@/assets/Futura_PT/stylesheet.css");
* {
  box-sizing: border-box;
}
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
body {
  font-family: "Futura PT";
  font-style: normal;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
header {
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(39, 39, 39, 0.1);
  height: 4.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.location {
  width: 67%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
}
.location__marker {
}
.location__span {
  cursor: pointer;
  font-weight: 600;
  font-size: 15px;
  line-height: 24px;
  color: #272727;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.5);
}
</style>
