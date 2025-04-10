<template>
    <button
      :class="[
        'flex items-center justify-center rounded-md font-semibold cursor-pointer focus:outline-none transition duration-300 ease-in-out',
        buttonSizeClass,
        buttonColorClass,
        { 'opacity-50 cursor-not-allowed!': isLoading }
      ]"
      :disabled="isLoading"
      @click="handleClick"
    >
        <span v-if="isLoading" class="mr-2">
            <Loader2
                class="animate-spin"
                :class="[
                    color,
                    size
                ]"
            />
        </span>
        <span v-else>{{ label }}</span>
    </button>
</template>
  
<script setup>
    import { computed } from 'vue'
    import { Loader2 } from 'lucide-vue-next';
    defineOptions({
        name: "MyButton"
    })
    const props = defineProps({
        label: {
            type: String,
            required: true,
        },
        size: {
            type: String,
            default: 'medium',
        },
        color: {
            type: String,
            default: 'blue',
        },
        isLoading: {
            type: Boolean,
            default: false,
        },
    });
  
    const emit = defineEmits(['click']);
    
    const handleClick = () => {
        emit('click');
    };
  
    const buttonSizeClass = computed(() => {
        switch (props.size) {
        case 'small':
            return 'px-4 py-2 text-sm';
        case 'large':
            return 'px-6 py-3 text-lg';
        default:
            return 'px-5 py-2.5 text-base';
        }
    });
  
    const buttonColorClass = computed(() => {
        switch (props.color) {
        case 'blue':
            return 'bg-blue-500 hover:bg-blue-600 text-white';
        case 'gray':
            return 'bg-gray-500 hover:bg-gray-600 text-white';
        case 'red':
            return 'bg-red-500 hover:bg-red-600 text-white';
        default:
            return 'bg-blue-500 hover:bg-blue-600 text-white';
        }
    });
</script>
  