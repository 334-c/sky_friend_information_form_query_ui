<template>
    <el-config-provider :locale="locale">
    <div>
        <!-- <el-form :inline="true" :model="formInline" class="demo-form-inline"> -->
        <el-form :model="queryBody" label-width="60px" class="demo-ruleForm" :size="formSize" status-icon>
            <el-form-item label="复合词">
                <el-input v-model="queryBody.words" placeholder="复合词" />
            </el-form-item>
            <el-form-item label="单词">
                <el-input v-model="queryBody.sentencesText" placeholder="单词以空格分离" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="search()">Query</el-button>
                <el-button @click="resetForm(queryBody)">Reset</el-button>
            </el-form-item>
        </el-form>
    </div>
    <el-divider content-position="center">Rabindranath Tagore</el-divider>
    <div>
        <el-table :data="tableData" height="300" stripe style="width: 100%">
            <el-table-column prop="updateTime" label="Date" width="180" />
            <el-table-column prop="request" label="Name" width="180" />
            <el-table-column prop="introduction" label="Address" />
        </el-table>
    </div>

    <el-divider content-position="center">{{ $t('main.message') }}</el-divider>

    <div class="demo-pagination-block">
        <el-pagination v-model:current-page="page.PageNum" v-model:page-size="page.pageSize" :page-sizes="[10, 20, 30, 40, 50]"
            :small="small" :disabled="disabled" :background="background" layout="total, sizes, prev, pager, next, jumper"
            :total="page.total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
</el-config-provider>
</template>






<script lang="ts" setup>
import { ref, reactive, watchEffect, onMounted, computed } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { find } from '../http/index'
import { QueryBody, Page } from '../classes/index'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import { useI18n } from "vue-i18n";
const { locale: vueI18n_locale } = useI18n();
//  ------- 实际代码 ------------
const queryBody = reactive(new QueryBody());
const page = reactive(new Page());
const tableData = ref<any[]>([]);
watchEffect(()=>{
    try{
        let arr: string[] = [];
        queryBody.sentencesText.split(" ").forEach(str=>{
            if(0 < str.trim().length) arr.push(str);
        })
        queryBody.sentences = arr;
    }catch(err){}
});

const search = async()=>{
    let data = (await find(queryBody)).data.data;
    tableData.value = data.users;
    page.PageNum = data.PageNum;
    page.pageSize = data.PageSize;
    page.total = data.total;
}
onMounted(search);

const small = ref(false)
const formSize = ref('default')
const background = ref(false)
const disabled = ref(false)
const handleSizeChange = (val: number) => {
    page.PageNum = 1;
    search();
}
const handleCurrentChange = (val: number) => {
    search()
}
const resetForm = (queryBody: QueryBody) => {
    queryBody.words = "";
    queryBody.sentencesText = "";
}

const language = ref('zh-cn');
const locale = computed(() => (language.value === 'zh-cn' ? zhCn : en));
const toggle = () => {
    let val = "en";
    if(language.value === 'zh-cn') {
        language.value = 'en';
    } else {
        language.value = 'zh-cn';
        val = "zh";
    }
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
