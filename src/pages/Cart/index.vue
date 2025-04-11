<template>
    <div class="grid grid-cols-1 lg:grid-cols-3 max-w-[1440px] mx-auto">
        <Cart
            :cartNow="cartNow"
            :checkedItems="checkedItems"
            @allCheck="handleAllCheck"
            @updateCheckedItems="handleUpdateCheckedItems"
            @updateQuantity="({ quantity, id }) => { emits('updateQuantity', { quantity, id }) }"
        />
        <OrderCheckout
            :cartNow="cartNow"
            :checkedItems="checkedItems"
        />
    </div>
</template>

<script setup>
import  { ref } from 'vue'
import Cart from './components/Cart.vue'
import OrderCheckout from './components/OrderCheckout.vue'

defineOptions({
    name: "CartPage"
})
const props = defineProps({
    cartNow: {
        type: Object,
        default: []
    }
})
const emits = defineEmits(['updateCart', 'updateQuantity'])
const checkedItems = ref([])
function handleAllCheck({ allCheck }) {
    if (allCheck) {
        checkedItems.value = props.cartNow.map(e => e.id)
    } else {
        checkedItems.value = []
    }
}
function handleUpdateCheckedItems({ id, type }) {
    if (type === 'add') {
        checkedItems.value.push(id)
    } else if (type === 'remove') {
        checkedItems.value = checkedItems.value.filter(idFromOrigin => idFromOrigin !== id)
    }
}

</script>