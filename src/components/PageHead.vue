<template>
    <el-button @click="toggle()">切换语言</el-button>
</template>

<script>
  export default {
    props: {
        language: {
            type: String,
            required: true,
        },
        vueI18n_locale: {
            type: String,
            required: true,
        },
    },
  };
</script>
<script lang="ts" setup>
import { ref, reactive, watchEffect, onMounted, computed } from 'vue';
import { useI18n } from "vue-i18n";
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import en from 'element-plus/dist/locale/en.mjs';

const { locale: vueI18n_locale } = useI18n();

// const language = ref('zh-cn');
const locale = computed(() => (language.value === 'zh' ? zhCn : en));
const toggle = () => {
    let val = language.value === 'zh' ? "en" : "zh";
    language.value = val;
    vueI18n_locale.value = val;
    localStorage.setItem("lang", val);
}


</script>

<style>
.infinite-list {
    height: 300px;
    padding: 0;
    margin: 0;
    list-style: none;
}

.infinite-list .infinite-list-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    background: var(--el-color-primary-light-9);
    margin: 10px;
    color: var(--el-color-primary);
}

.infinite-list .infinite-list-item+.list-item {
    margin-top: 10px;
}
</style>
<style scoped>
.demo-pagination-block+.demo-pagination-block {
    margin-top: 10px;
}

.demo-pagination-block .demonstration {
    margin-bottom: 16px;
}
</style>