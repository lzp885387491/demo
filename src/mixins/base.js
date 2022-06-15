export default {
    methods: {
        /**
        * @description 跳转页面的方法
        * @param params 非必填    这个是 需要传的参数 数据  可以通过这个参数传 需要先声明一个变量接 
        * @param params 语法：let params = {key:value}; 
        * @param params 调用方法：navigator( ' 去哪个页面的name ' ,  params );
         */
        navigator(name, query) {
            if (name=='') {
                return;
            }else if (this.$route.name == name) {
                return
            } else {
                this.$router.push({
                    name,
                    query
                })
            }
        }
    }
}