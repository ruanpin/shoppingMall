<template>
    <div v-show="isFetching" class="flex items-center justify-center h-[100%]">
        <Loader2
            class="animate-spin"
            :class="[
                color,
                size
            ]"
        />
    </div>
      <slot></slot>
</template>
<script setup>
import { Loader2 } from 'lucide-vue-next';
defineOptions({
    name: "MyloadingComponent"
})
const props = defineProps({
  isFetching: {
    type: Boolean,
    required: true,
  },
  size: {
    type: String,
    default: 'w-8 h-8',
  },
  color: {
    type: String,
    default: 'text-gray-500',
  },
});
</script>
