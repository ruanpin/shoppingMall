<template>
      <div v-show="loading && !error" class="absolute inset-0 flex justify-center items-center bg-gray-100">
        <Loader2 class="w-10 h-10 text-gray-500 animate-spin" />
      </div>
      <div v-show="error" class="absolute inset-0 flex justify-center items-center bg-gray-100 gap-x-1 w-full">
        <CloudAlert class="w-6 h-6"/>
        <p class="text-gray-500">image fail to load.</p>
      </div>
      <img
        :src="imgSrc"
        class=" object-cover transition-opacity duration-500"
        :class="{
          'opacity-0': loading,
          'opacity-100': !loading
        }"
        @load="handleImgLoad"
        @error="handleError"
        alt="Image"
      />
</template>

<script setup>
import { Loader2, CloudAlert } from 'lucide-vue-next';
import { ref } from 'vue'

defineOptions({
  name: "MyImgComponent"
})
const props = defineProps({
  imgSrc: {
    type: String,
    required: true,
  },
})
const loading = ref(true)
const error = ref(false)

function handleImgLoad () {
  loading.value = false
}
function handleError () {
  loading.value = false
  error.value = true
}
</script>