export default {
    data() {
        return {
            data: "",
            sidebarData: [
                {
                    icon: "el-icon-location",
                    title: "题库管理",
                    name: "questionView",
                    children: [
                        {
                            icon: "",
                            title: "题库管理",
                            name: "questionView",
                            children: [],
                            link: "questionView",
                        },
                        {
                            icon: "",
                            title: "Html题库",
                            name: "htmlQuestion",
                            link: "htmlQuestion",
                            children: [],
                        },
                        {
                            icon: "",
                            title: "JS题库",
                            name: "jsQuestion",
                            children: [],
                            link: "jsQuestion",
                        },
                        {
                            icon: "",
                            title: "css题库",
                            name: "cssQuestion",
                            children: [],
                            link: "cssQuestion",
                        },
                    ],
                },
                {
                    icon: "el-icon-menu",
                    title: "匹配比赛",
                    name: "",
                    children: [],
                    link: "",
                },
                {
                    icon: "el-icon-document",
                    title: "报名系统",
                    name: "",
                    children: [],
                    link: "",
                },
                {
                    title: "刷题系统",
                    name: "",
                    link: "",
                    icon: "el-icon-setting",
                    children: [],
                },
                {
                    title: "个人中心",
                    name: "",
                    icon: "el-icon-postcard",
                    children: [
                        {
                            icon: "",
                            title: "修改个人信息",
                            link: "modifyPersonalInformation",
                            name: "modifyPersonalInformation",
                            children: [],
                        },
                        {
                            icon: '',
                            title: '设置头像',
                            link: 'SetAvatr',
                            name: 'SetAvatr',
                            children:[]
                        },
                        {
                            icon: "",
                            link: "myTaskView",
                            title: "我的任务",
                            name: "myTaskView",
                            children: [],
                        },
                    ],
                },
                {
                    title: "任务中心",
                    name: "",
                    icon: "el-icon-chat-line-square",
                    children: [
                        {
                            icon: "",
                            title: "创建任务",
                            name: "createTaskView",
                            link: "createTaskView",
                            children: [],
                        },
                        {
                            icon: "",
                            title: "任务列表",
                            link: "taskListView",
                            name: "taskListView",
                            children: [],
                        },
                    ],
                },
                {
                    title: "角色管理",
                    name: "",
                    icon: "el-icon-loading",
                    children: [
                        {
                            icon: "",
                            title: "角色管理",
                            name: "roleManagement",
                            children: [],
                            link: "roleManagement",
                        },
                        {
                            icon: "",
                            title: "创建角色",
                            name: "createRole",
                            children: [],
                            link: "createRole",
                        },
                        {
                            icon: "",
                            title: "权限管理",
                            name: "JurisdictionCeShiView",
                            children: [],
                            link: "JurisdictionCeShiView",
                        },
                    ],
                },
                {
                    title: "用户列表",
                    name: "userListView",
                    icon: "el-icon-menu",
                    link: "userListView",
                    children: [],
                },
            ], // home页左侧侧边栏   和  角色管理 下边的 功能权限里 的数据    公用的
        }; 
    },
    methods: {
        /**
        * @description 跳转页面的方法
        * @param params 非必填    这个是 需要传的参数 数据  可以通过这个参数传 需要先声明一个变量接 
        * @param params 语法：let params = {key:value}; 
        * @param params 调用方法：navigator( ' 去哪个页面的name ' ,  params );
         */
        navigator(name, query) {
            if (name == '') {
                return;
            } else if (this.$route.name == name) {
                return;
            } else {
                this.$router.push({
                    name,
                    query
                })
            }
        }
    }
}