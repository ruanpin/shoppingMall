<template>
    <div class="mx-[1.5em] flex flex-col gap-8 lg:col-span-2 py-[1.3em] px-[1em]">
        <div v-if="cartNow.length">
            <div class="flex">
                <label class="inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        class="form-checkbox h-5 w-5 text-black border-balck rounded focus:ring-balck cursor-pointer"
                        :checked="checkedItems.length === cartNowCheckedAmount"
                        @change="toggleCheckboxAll"
                    />
                    <div class="px-[1.5em] font-bold text-[1.1em]">全選</div>
                </label>
            </div>
        </div>
        <div v-else class="text-center my-[3em] font-semibold text-[1.5em]">
            購物車中沒有商品
        </div>
        <div
            class="flex items-center"
            v-for="product in cartNow"
            :key="product.id"
        >
            <label class="inline-flex items-center space-x-2">
                <input
                    type="checkbox"
                    class="form-checkbox h-5 w-5 text-black border-balck rounded focus:ring-balck cursor-pointer"
                    :checked="checkedItems.includes(product.id)"
                    @change="handleCheckedChange({ id: product.id })"
                />
            </label>
            <CartProductCard
                :product="product"
                @updateQuantity="({ quantity, id }) => { emits('updateQuantity', { quantity, id }) }"
            />
        </div>
        
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import CartProductCard from './CartProductCard.vue'
defineOptions({
    name: "CartComponent"
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
const emits = defineEmits(['allCheck', 'updateCheckedItems', 'updateQuantity'])
const cartNowCheckedAmount = computed(() => {
    return props.cartNow.length
})
function toggleCheckboxAll() {
  if (props.checkedItems.length === cartNowCheckedAmount.value) {
    emits('allCheck', { allCheck: false })
  } else {
    emits('allCheck', { allCheck: true })
  }
}
function handleCheckedChange({ id }) {
    if (props.checkedItems.includes(id)) {
        emits('updateCheckedItems', { id, type: "remove" })
    } else {
        emits('updateCheckedItems', { id, type: "add" })
    }
}
</script>