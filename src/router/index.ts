import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {name: "home", path: "/home", component: ()=> import("../views/Home.vue")},
        {name: "test", path: "/test", component: ()=> import("../views/Test.vue")}
    ],
})

export default router