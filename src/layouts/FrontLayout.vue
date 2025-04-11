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
            >{{ tab.name }}</div>
            <div
                class="
                    bg-[#DB1214] rounded-[999px] w-[20px] h-[20px] text-[10px]
                    font-bold text-white flex justify-center items-center
                    relative -translate-x-5
                "
                :class="{
                    'opacity-0': cartTotalQuantity <= 0
                }"
            >
                <div>{{ cartTotalQuantity }}</div>
            </div>
        </div>
        <router-view v-slot="{ Component }">
            <keep-alive>
                <component
                    :is="Component"
                    :cartNow="cartNow"
                    @updateCart="handleUpdateCart"
                    @updateQuantity="handleUpdateQuantity"
                    @deleteProducts="handleDeleteProducts"
                />
            </keep-alive>
        </router-view>
    </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  getCartData,
  updateQuantityInCart,
  deleteProducts
} from '@/services/cartService.js'
import { notification } from '@/assets/notification.js'
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
async function handleDeleteProducts({ checkedItems }) {
    try {
        if (!checkedItems.length) return notification.warning("刪除失敗，請先勾選商品")
        await deleteProducts(cartNow.value, checkedItems)
        await handleUpdateCart()
        notification.success("刪除成功")
    } catch (err) {
        console.error('刪除商品發生錯誤：', err)
    }
}
</script>