import { ref, onMounted, onUnmounted } from 'vue'

export function useSearch() {
    const isSearchVisible = ref(false)
    const searchValue = ref('')

    let containerRef: HTMLElement | null = (null)

    const toggleSearch = (el?: string) => {
        if (el) {
            containerRef = document.getElementById(el)
        } 
        
        isSearchVisible.value = !isSearchVisible.value
    }

    const closeSearch = () => {
        isSearchVisible.value = false
    }

    const openSearch = () => {
        isSearchVisible.value = true
    }

    const resetSearch = () => {
        searchValue.value = ''
    }


    const handerClickOutSide = (e: Event) => {
        if (searchValue.value !== '') {
            return
        }
        if (!containerRef?.contains(e.target as HTMLElement) &&  window.innerWidth > 1024) {
            isSearchVisible.value = false;
        }
    }

    onMounted(() => {
        document.addEventListener('click', handerClickOutSide)
    })

    onUnmounted(() => {
        document.removeEventListener('click', handerClickOutSide)
    })


    return {
        isSearchVisible,
        searchValue,
        toggleSearch,
        closeSearch,
        openSearch,
        resetSearch
    }
}
