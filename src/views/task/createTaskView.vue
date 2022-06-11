<template>
  <div>
    <h1 class="title">创建任务</h1>
    <form-template v-on:onSubmit="getCreateTask"></form-template>
  </div>
</template>

<script>
import { getCreateTaskApi } from "@/api/api"
import formTemplate from "@/components/formTemplateView.vue";
export default {
  data() {
    return {};
  },
  components: {
    "form-template": formTemplate,
  },
  created() {
    
  },
  methods:{
    async getCreateTask(val){
      console.log(val);
      let { name,desc,duration,level }= val
      let res = await getCreateTaskApi({name,desc,duration,level})
      if(res.data.status==1){
        console.log(res.data);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  margin: 0;
  padding: 20px;
}
</style>