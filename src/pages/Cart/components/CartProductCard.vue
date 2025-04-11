<template>
    <div class="flex justify-center items-center md:flex-row flex-col gap-8 p-[1.5em] w-full">
      <div
        class="w-[150px] h-[150px] bg-gray-200 rounded overflow-hidden relative"
        :class="{ 'opacity-35': product.price === null }"
      >
        <MyImg :imgSrc="product.imageUrl" />
      </div>
  
      <div class="flex flex-col items-center w-full">
        <div
          class="flex flex-col items-center w-full gap-y-3"
          :class="{ 'opacity-35': product.price === null }"
        >
          <div class="font-semibold mb-0 w-full text-[1.3em] space-x-2">
            <span>{{ product.name }}</span>
          </div>
  
          <div class="flex justify-between w-full">
            <div class="font-semibold">單價:</div>
            <div>$ {{ product.price }}</div>
          </div>
  
          <div class="flex justify-between items-center w-full">
            <div class="font-semibold">數量:</div>
            <div>
              <QuantitySelector
                :quantity="product.quantity"
                @updateQuantity="(quantity) => { emits('updateQuantity', { quantity, id: product.id }) }"
              />
            </div>
          </div>
  
          <div class="flex justify-between w-full">
            <div class="font-semibold">總價:</div>
            <div class="font-semibold">
              $ {{ (product.quantity * (product?.price ?? 0)).toFixed(2) }}
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import MyImg from '@/components/MyImg/index.vue'
import QuantitySelector from '@/components/MyQuantitySelector/index.vue'
defineOptions({
    name: "CartProductCardComponent"
})
const props = defineProps({
    product: {
        type: Object,
        default: {}
    }
})
const emits = defineEmits(['updateQuantity'])
</script>