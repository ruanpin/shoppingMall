<template>
    <div class="flex flex-col items-center w-full">
        <div class="w-full flex justify-center gap-x-2 border border-gray-300 shadow-lg p-[.3em]">
            <div
                v-for="tab in tabs"
                :key="tab.name"
                class="
                    cursor-pointer font-bold py-[.5em] px-[1em] rounded hover:bg-gray-100 duration-200 transition
                "
                :class="{
                    'bg-gray-100': route.path === tab.path
                }"
                @click="pushTo(tab.path)"
            >{{ tab.name }}</div>{{ cartTotalQuantity }}
        </div>
        <RouterView
            :cartNow="cartNow"
            @updateCart="handleUpdateCart"
            @updateQuantity="handleUpdateQuantity"
        />
    </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  getCartData,
  updateQuantityInCart,
} from '@/services/cartService.js'
const tabs = [
    { name: "課程", path: "/" },
    { name: "購物車", path: "/cart" },
]
defineOptions({
    name: "FrontLayout"
})
const router = useRouter()
const route = useRoute()
const cartNow = ref([])
const cartTotalQuantity = computed(() => (
    cartNow.value.reduce((sum, item) => sum + item.quantity, 0)
))
function pushTo (path) {
    router.push(path)
}
async function handleUpdateCart () {
    cartNow.value = await getCartData()
}
onMounted(async () => {
    try {
        await handleUpdateCart()
    } catch (err) {
        console.error('載入購物車發生錯誤：', err)
    }
})
async function handleUpdateQuantity({ quantity, id }) {
    try {
        await updateQuantityInCart(cartNow.value, id, quantity)
        await handleUpdateCart()
    } catch (err) {
        console.error('更新商品數量發生錯誤：', err)
    }
}
</script>