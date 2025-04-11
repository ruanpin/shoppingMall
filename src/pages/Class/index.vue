<template>
    <div
        class="
            relative grid grid-cols-1 justify-items-center gap-3 gap-y-[3em] py-[2em]
        "
        :class="{
            'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4': !isFetching,
            'min-h-[calc(100vh-50px)]': isFetching
        }"
    >
        <MyLoading :isFetching="isFetching">
            <ProductCard
                v-for="product in classesList"
                :key="product.id"
                :product="product"
                :cartNow="cartNow"
                @updateCart="() => { emits('updateCart') }"
            />
        </MyLoading>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useHttpRequestStore } from '@/stores/httpRequest.js'
import MyLoading from '@/components/Myloading/index.vue'
import ProductCard from './components/ProductCard.vue'

defineOptions({
    name: "ClassPage"
})
const props = defineProps({
    cartNow: {
        type: Object,
        default: []
    }
})
const emits = defineEmits(['updateCart'])
const { request_GET } = useHttpRequestStore()
const classesList = ref([])
const isFetching = ref(false)
const fetchData = async () => {
    try {
        isFetching.value = true
        const result = await request_GET({
            url: "macros/s/AKfycbyGmoZukCQze0nw3UF-VX9ELODVy5Rs6CIQ1U-YbwNHfG3JIjGz4JThKAvWJB1P0qTg/exec"
        })
        // console.log(result);
        classesList.value = result
    } catch (err) {
        console.error(err)
    } finally {
        isFetching.value = false
    }
}
onMounted(() => {
    fetchData();
})
</script>