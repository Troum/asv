<template>
  <div>
    <div id="slider-container" ref="sliderContainer">
      <div class="slider-item" v-for="(item, index) in items" :key="index">
        <slot :item="item"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const currentIndex = ref(1);

const items = ref([
  { backgroundColor: "#ffcccb", content: ["Item 1", "This is the content for item 1."] },
  { backgroundColor: "#a6e3e9", content: ["Item 2", "This is the content for item 2."] },
  { backgroundColor: "#b5e7a0", content: ["Item 3", "This is the content for item 3."] }
]);

const sliderContainer = ref(null);

const showItem = (index) => {
  const container = sliderContainer?.value;
  const itemWidth = container.querySelector('.slider-item').offsetWidth;
  const newPosition = -index * itemWidth;
  if (container) {
    container.style.transform = `translateX(${newPosition}px)`;
  }
};

const nextItem = () => {
  currentIndex.value = (currentIndex.value + 1) % items.value.length;
  showItem(currentIndex.value);
};

const prevItem = () => {
  currentIndex.value = (currentIndex.value - 1 + items.value.length) % items.value.length;
  showItem(currentIndex.value);
};

onMounted(() => {
  showItem(currentIndex.value);
});
</script>

<style scoped>
body {
  margin: 0;
  overflow: hidden;
}

#slider-container {
  display: flex;
  width: 300%; /* Three times the width to accommodate the three sections */
  transition: transform 0.5s ease;
}

.slider-item {
  flex: 1;
  min-width: 100%;
  box-sizing: border-box;
}
</style>
