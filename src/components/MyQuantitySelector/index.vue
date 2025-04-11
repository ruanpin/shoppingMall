<template>
    <div class="flex items-center">
      <div class="flex items-center rounded-[999px] border-gray-300 border-1 px-[.7em]">
        <div
          @click="handleDecrement"
          class="
            w-4 h-4 text-xl flex justify-center items-center rounded-l-[999px] transition duration-300
            cursor-pointer
          "
        >
          <Minus />
        </div>
  
        <span class="w-12 h-8 flex justify-center items-center">{{ quantity }}</span>
  
        <div
          @click="handleIncrement"
          class="
            w-4 h-4 text-xl flex justify-center items-center rounded-l-[999px] transition duration-300
            cursor-pointer
          "
        >
          <Plus />
        </div>
      </div>
    </div>
</template>

<script setup>
import { Minus, Plus } from 'lucide-vue-next'

const props = defineProps({
    quantity: {
      type: Number,
      required: true
    },
    Stock: {
      type: Number,
      default: 99
    },
})
const emits = defineEmits(['updateQuantity'])

function handleDecrement() {
    if (props.quantity > 1) {
        emits('updateQuantity', props.quantity - 1)
    }
}

function handleIncrement() {
    if (props.quantity < props.Stock) {
        emits('updateQuantity', props.quantity + 1)
    }
}
</script>