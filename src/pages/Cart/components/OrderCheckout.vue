<template>
    <div class="m-[1.5em] flex flex-col justify-center lg:col-span-1 min-w-[300px] px-[1em]">
      <div class="flex flex-col gap-y-3 bg-[#F7F7F7] rounded-[18px] p-[1.3em] md:p-[2em] pt-[1.3em] font-semibold">
        <div class="text-[1.8em] mb-[1.2em]">訂單總覽</div>
  
        <div class="flex justify-between items-center">
          <div>小計</div>
          <div>$ {{ total.toFixed(2) }}</div>
        </div>
  
        <div class="flex justify-between items-center text-[1.5em]">
          <div>總計</div>
          <div>$ {{ total.toFixed(2) }}</div>
        </div>
  
        <div class="">
            <MyButton
                class="w-full"
                label="結帳"
                :isLoading="false"
            ></MyButton>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import MyButton from '@/components/MyButton/index.vue'
defineOptions({
    name: "OrderCheckoutComponent"
})
const props = defineProps({
    cartNow: {
        type: Object,
        default: []
    },
    checkedItems: {
        type: Object,
        default: []
    }
})
const total = computed(() => {
  return props.cartNow.reduce((total, e) => {
    if (props.checkedItems.includes(e.id)) {
      total += Number((e.quantity * Number(e.price)).toFixed(2))
    }
    return total
  }, 0)
})
</script>