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
        </div>
        <RouterView />
    </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
const tabs = [
    { name: "課程", path: "/" },
    { name: "購物車", path: "/cart" },
]
defineOptions({
    name: "FrontLayout"
})
const router = useRouter()
const route = useRoute()
function pushTo (path) {
    router.push(path)
}
</script>