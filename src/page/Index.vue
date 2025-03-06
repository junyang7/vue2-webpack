<template>
    <div>
        <i class="ri-admin-line"></i>
        <Button @click="health">健康检测</Button>
    </div>
</template>

<script>
import Api from "@/service/api";

export default {
    name: "Index",
    methods: {
        health() {
            Api.Health().then(res => {
                console.log(res);
                this.$Message.success("ok");
            }).catch(err => {
                console.log(err);
            });
        },
    },
}
</script>

<style scoped>

</style>
