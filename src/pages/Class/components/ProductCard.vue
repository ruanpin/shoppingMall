<template>
    <div
        class="flex justify-center w-[220px] h-[450px]"
    >
        <div class="flex flex-col">
            <div class="flex justify-center items-start w-[220px] h-[320px] overflow-hidden">
                <div class="rounded w-[220px] h-[320px] overflow-hidden relative">
                    <MyImg :imgSrc="product.imageUrl"/>
                </div>
            </div>
            <div class="flex flex-col">
                <div class="font-bold h-[50px]">{{ setTextEllipsis(product.name, 26) }}</div>
                <div class="space-x-2">
                    <span class="font-bold">狀態: </span>
                    <span class="font-semibold text-gray-500"> {{ product.status }}</span>
                </div>
                <div class="space-x-2">
                    <span class="font-semibold text-[1.25em]">$ {{ product.price }}</span>
                </div>
            </div>
            <MyButton
                label="加入購物車"
                :isLoading="false"
                :isNotAllowed="product.status === '尚未開始' || product.status === '已結束'"
                @click="handleClick"
            ></MyButton>
        </div>
    </div>
</template>

<script setup>
// import { watch } from 'vue'
import MyImg from '@/components/MyImg/index.vue'
import MyButton from '@/components/MyButton/index.vue'
import { setTextEllipsis } from '@/utils/textUtils.js'
import { addProductToCart } from '@/services/cartService.js'

defineOptions({
    name: "ProductCardComponent"
})
const props = defineProps({
    product: {
        type: Object,
        default: {}
    },
    cartNow: {
        type: Object,
        default: []
    }
})
const emits = defineEmits(['updateCart'])
function handleClick () {
    const target = {
        id: props.product.id,
        imageUrl: props.product.imageUrl,
        name: props.product.name,
        price: props.product.price,
        quantity: 1
    }
    addProductToCart(props.cartNow, target)
    emits('updateCart')
}
</script>