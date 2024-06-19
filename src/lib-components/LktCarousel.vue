<script setup lang="ts">
import {Carousel, Slide, Navigation, Pagination} from "vue3-carousel/dist/carousel.es";
import {computed, nextTick, ref, useSlots} from "vue";
import {LktObject} from "lkt-ts-interfaces";

// Emits
const emit = defineEmits(['create']);

const props = withDefaults(defineProps<{
    modelValue: number
    page: number
    itemsToShow?: number
    itemsToScroll?: number
    autoplay?: number
    wrapAround?: boolean
    mouseDrag?: boolean
    touchDrag?: boolean
    pauseAutoplayOnHover?: boolean
    dir?: 'ltr' | 'rtl'
    snapAlign?: 'start' | 'end' | 'center' | 'center-odd' | 'center-even'
    resource?: string
    resourceData?: LktObject
    title: string
    noResultsText: string
    createText: string
    carouselClass: string
    filters: LktObject
}>(), {
    modelValue: 0,
    page: 1,
    itemsToShow: 1,
    itemsToScroll: 1,
    autoplay: 0,
    wrapAround: false,
    mouseDrag: true,
    touchDrag: true,
    pauseAutoplayOnHover: true,
    dir: 'ltr',
    snapAlign: 'center',
    resource: '',
    resourceData: () => ({}),
    title: '',
    carouselClass: '',
    noResultsText: 'No results',
    createText: 'Create',
    filters: () => ({}),
});

let basePerms: string[] = [];

const
    currentSlide = ref(props.modelValue),
    Page = ref(props.page),
    items = ref([]),
    perms = ref(basePerms),
    editMode = ref(false),
    firstLoadReady = ref(false),
    paginator = ref(null),
    resourceMode = ref(props.resource !== ''),
    loading = ref(resourceMode.value === true)
;

const slots = useSlots();

const slides = computed((): LktObject => {
    let r = [];
    for (let k in slots) if (k.indexOf('slide-') !== -1) r.push(k);
    return r;
});

const onResults = (r: any) => {
        currentSlide.value = 0;
        //@ts-ignore
        if (Array.isArray(r)) items.value = r;
        loading.value = false;
        firstLoadReady.value = true;
        console.log('onResults', items.value, loading.value);
    },
    onPerms = (r: string[]) => {
        perms.value = r;
    },
    onLoading = () => nextTick(() => loading.value = true),
    onCreate = () => emit('create'),
    doRefresh = () => {
        //@ts-ignore
        paginator.value.doRefresh();
    },
    canCreate = computed(() => perms.value.includes('create')),
    canRead = computed(() => perms.value.includes('read')),
    canUpdate = computed(() => perms.value.includes('update')),
    canDrop = computed(() => perms.value.includes('drop'));

defineExpose({
    doRefresh
})
</script>

<template>
    <div class="lkt-carousel-page">
        <header v-if="title || slots.title">
            <h2 v-if="title">{{ title }}</h2>
            <template v-if="slots.title">
                <slot name="title"></slot>
            </template>
        </header>

        <div class="lkt-carousel-page-buttons" v-if="slots.buttons">
            <slot name="buttons"></slot>
        </div>

        <div class="lkt-carousel-page-filters" v-if="firstLoadReady && slots.filters">
            <slot name="filters" :items="items" :is-loading="loading"></slot>
        </div>

        <lkt-loader v-if="loading"></lkt-loader>

        <div class="lkt-carousel"
             :class="carouselClass"
             v-if="(!resourceMode && slides.length > 0) || (!loading && items.length > 0)"
        >
            <carousel
                v-model="currentSlide"
                :items-to-show="itemsToShow"
                :items-to-scroll="itemsToScroll"
                :autoplay="autoplay"
                :wrap-around="wrapAround"
                :mouse-drag="mouseDrag"
                :touch-drag="touchDrag"
                :pause-autoplay-on-hover="pauseAutoplayOnHover"
                :dir="dir"
                :snap-align="snapAlign"
            >
                <template v-for="(slide, i) in slides" :key="slide">
                    <slide :index="i">
                        <div class="lkt-carousel-slide">
                            <slot :name="slide"/>
                        </div>
                    </slide>
                </template>

                <template v-for="(item, i) in items" :key="slide">
                    <slide :index="i">
                        <div class="lkt-carousel-slide">
                            <slot name="item"
                                  :item="item"
                                  :can-create="canCreate"
                                  :can-read="canRead"
                                  :can-update="canUpdate"
                                  :can-drop="canDrop"
                                  :is-loading="loading"
                            />
                        </div>
                    </slide>
                </template>

                <template #addons>
                    <Navigation />
                    <Pagination />
                </template>
            </carousel>
        </div>

        <div class="lkt-carousel-page-empty" v-if="!loading && items.length === 0 && resourceMode">
            {{noResultsText}}
        </div>

        <div class="lkt-carousel-page-buttons on-bottom">
            <lkt-button
                v-if="canCreate"
                @click="onCreate"
                palette="success"
            >
                {{createText}}
            </lkt-button>
        </div>

        <lkt-paginator
            v-if="resourceMode"
            ref="paginator"
            v-model="Page"
            v-bind:resource="resource"
            v-bind:filters="filters"
            v-on:results="onResults"
            v-on:perms="onPerms"
            v-on:loading="onLoading"
        />
</div>
</template>

<style lang="css">
.lkt-carousel-slide {
    min-height: 200px;
    width: 100%;
    background-color: var(--vc-clr-primary);
    color: var(--vc-clr-white);
    font-size: 20px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.lkt-carousel-slide {
    padding: 10px;
}

.carousel__prev,
.carousel__next {
    box-sizing: content-box;
    border: 5px solid white;
}
</style>