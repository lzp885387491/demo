<template>
  <div class="quill-wrap">
    <quill-editor ref="myQuillEditor" v-model="content" />
  </div>
</template>
<script>
import "quill/dist/quill.snow.css";
import { quillEditor } from "vue-quill-editor";

export default {
  components: { quillEditor },
  data() {
    return {
      content: "",
    };
  },
};
</script>
<style>
.ql-container {
  min-height: 300px;
}
.quill-editor {
  width: 880px;
}
</style>
