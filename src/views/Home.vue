<template>
    <el-config-provider :locale="locale">
        <div>
            <h2>{{ $t("main.欢迎语") }}</h2>
            ʕ • ᴥ • ʔ 
<br>          づ♡ど
        </div>
        <div>
            <el-form :model="queryBody" label-width="60px" class="demo-ruleForm" :size="formSize" status-icon>
                <el-form-item :label="$t('e.复合词')">
                    <el-input v-model="queryBody.words" :placeholder="$t('e.每一个字都是一个词')" />
                </el-form-item>
                <el-form-item :label="$t('e.单词')">
                    <el-input v-model="queryBody.sentencesText" :placeholder="$t('e.单词以空格分离')" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search()" :icon="Search">{{ $t('e.查询') }}</el-button>
                    <el-button @click="resetForm(queryBody)">{{ $t('e.重置') }}</el-button>
                    <el-button @click="toggle()">{{ $t('e.切换语言') }}</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-affix :offset="0">
            <div class="demo-pagination-block color">
                <el-pagination v-model:current-page="page.pageNum" v-model:page-size="page.pageSize"
                    :page-sizes="[10, 20, 30, 40, 50]" :small="small" :disabled="disabled" :background="background"
                    layout="total, sizes, prev, pager, next, jumper" :total="page.total" @size-change="handleSizeChange"
                    @current-change="handleCurrentChange" />
            </div>
        </el-affix>

        <el-divider content-position="center">{{ $t('e.分隔线') }}</el-divider>
        <div>
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="wantType" :label="$t('e.寻找类型')">
                    <template #default="scope">
                        <div @click="showText(scope.row.wantType,'寻找类型')" class="miniTxet">
                            {{ filters.wantType(scope.row.wantType) }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="request" :label="$t('e.想要找这样的人')" >
                    <template #default="scope">
                        <div @click="showText(scope.row.request,'想要找这样的人')" class="miniTxet">
                            {{ scope.row.request }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="introduction" :label="$t('e.光之子自述')" >
                    <template #default="scope">
                        <div @click="showText(scope.row.introduction, '光之子自述')" class="miniTxet">
                            {{ scope.row.introduction }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="age" :label="$t('e.年龄')" />
                <el-table-column prop="gender" :label="$t('e.性别')">
                    <template #default="scope">
                        {{ filters.gender(scope.row.gender) }}
                    </template>
                </el-table-column>
                <el-table-column prop="contact" :label="$t('e.联系方式')" >
                    <template #default="scope">
                        <div @click="showText(scope.row.contact, '联系方式')" class="miniTxet">
                            {{ filters.contact(scope.row.contact) }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="updateTime" :label="$t('e.更新时间')" >
                    <template #default="scope">
                        {{ filters.time(scope.row.updateTime) }}
                    </template>
                </el-table-column>
                <el-table-column prop="server" :label="$t('e.区服')" >
                    <template #default="scope">
                        {{ filters.server(scope.row.server) }}
                    </template>
                </el-table-column>
                <el-table-column prop="language" :label="$t('e.语言')" >
                    <template #default="scope">
                        {{ filters.language(scope.row.language) }}
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-divider content-position="center">{{ $t('e.分隔线') }}</el-divider>
        <!-- <el-divider content-position="center">{{ $t('e.分隔线') }}</el-divider> -->
            <!-- <div class="demo-pagination-block">
                <el-pagination v-model:current-page="page.pageNum" v-model:page-size="page.pageSize"
                    :page-sizes="[10, 20, 30, 40, 50]" :small="small" :disabled="disabled" :background="background"
                    layout="total, sizes, prev, pager, next, jumper" :total="page.total" @size-change="handleSizeChange"
                    @current-change="handleCurrentChange" />
            </div> -->

        <el-backtop :right="100" :bottom="100" />
    </el-config-provider>

    <el-dialog v-model="dialogTableVisible" :title="$t('e.' + dialogTitle)" class="size80">
        <el-input
            v-model="dialogText"
            :rows="15"
            type="textarea"
            placeholder="Please input"
            class="autoHeigth"
        />
    </el-dialog>
</template>

<script lang="ts" setup>
import { inject, ref, reactive, watchEffect, onMounted, computed } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { find } from '../http/index'
import { QueryBody, Page } from '../classes/index'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import { useI18n } from "vue-i18n";



const { locale: vueI18n_locale, t } = useI18n();

const title:any =  inject("title");
title.value = "查询";

const queryBody = reactive(new QueryBody());
const page = reactive(new Page());
const tableData = ref<any[]>([]);
watchEffect(() => {
    try {
        let arr: string[] = [];
        queryBody.sentencesText.split(" ").forEach(str => {
            if (0 < str.trim().length) arr.push(str);
        })
        queryBody.sentences = arr;
    } catch (err) { }
});

const search = async () => {
    let data = (await find(queryBody, page)).data.data;
    tableData.value = data.users;
    page.pageNum = data.pageNum || page.pageNum;
    page.pageSize = data.PageSize || page.pageSize;
    page.total = data.total || page.total;
}
const filters = {
    gender(value) {
        let re:string = value;
        if (value == 1) {
            re = t('data.男孩子')
        }
        else if (value == 2) {
            re = t('data.女孩子')
        }
        else if (value == 3) {
            re = t('data.光之子')
        }
        return re;
    },
    wantType(value: Array<any>) {
        let re:Array<string> = [];
        value.forEach(e=>{
            let word:string = t('data.' + e);
            re.push(word.startsWith("data.") ? e : word);
        });
        return re.join(t('system.分隔符'));
    },
    server(value: Array<any>) {
        let re:Array<string> = [];
        let map = {
            1: "国服",
            2: "国际服",
            3: "测试服"
        };
        value.forEach(e=>{
            re.push(t('data.' + map[e]))
        });
        return re.join(t('system.分隔符'));
    },
    language(value: string) {
        return t('data.' + value);
    },
    time(value: string) {
        let date = new Date(value.replace(/[年月]/g, "-").replace(/日/g, ""))
        return date.toString() == 'Invalid Date' ? value : date.toLocaleDateString();
    },
    contact(value: Array<string>) {
        let re:Array<string> = [];
        value.forEach(a=>{
            if(typeof a == "string" && 0 < a.length) {
                re.push(a)
            }
        });
        return re.join(t('system.分隔符'));
    }
}
onMounted(search);

const dialogText = ref("")
const dialogTableVisible = ref(false)
const dialogTitle = ref("详细文本")
const small = ref(false)
const formSize = ref('default')
const background = ref(false)
const disabled = ref(false)
const handleSizeChange = (val: number) => {
    page.pageNum = 1;
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
    if (language.value === 'zh-cn') {
        language.value = 'en';
    } else {
        language.value = 'zh-cn';
        val = "zh";
    }
    vueI18n_locale.value = val;
    localStorage.setItem("lang", val);
}
function showText(e, val = "详细文本"){
    dialogText.value = e;
    dialogTitle.value = val;
    dialogTableVisible.value = true;
}

</script>
<style>
    .color{
        background-color: white;
    }
    .miniTxet{
        overflow: hidden; 
        max-height:200px;
    }
    .autoHeigth{
        resize: vertical;
        box-sizing: border-box;
    }
    .size80{
        width: 80vw;
    }
</style>