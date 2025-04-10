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
            <div class="h-[100px] flex flex-col">
                <div class="font-semibold">{{ setTextEllipsis(product.name, 40) }}</div>
                <div class="space-x-2">
                    <span class="font-semibold">$ {{ product.price }}</span>
                </div>
            </div>
            <MyButton
                label="加入購物車"
                :isLoading="false"
            ></MyButton>
        </div>
    </div>
</template>

<script setup>
// import { watch } from 'vue'
import MyImg from '@/components/MyImg/index.vue'
import MyButton from '@/components/MyButton/index.vue'
import { setTextEllipsis } from '@/utils/textUtils.js'

defineOptions({
    name: "ProductCardComponent"
})
const props = defineProps({
    product: {
        type: Object,
        default: {}
    }
})
</script>