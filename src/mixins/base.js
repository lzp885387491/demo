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
                            meta: {
                                identifys: [1, 2]
                            }
                        },
                        {
                            icon: "",
                            title: "Html题库",
                            name: "htmlQuestion",
                            link: "htmlQuestion",
                            children: [],
                            meta: {
                                identifys: [1, 2]
                            }
                        },
                        {
                            icon: "",
                            title: "JS题库",
                            name: "jsQuestion",
                            children: [],
                            link: "jsQuestion",
                            meta: {
                                identifys: [1, 2]
                            }
                        },
                        {
                            icon: "",
                            title: "css题库",
                            name: "cssQuestion",
                            children: [],
                            link: "cssQuestion",
                            meta: {
                                identifys: [1, 2]
                            }
                        },
                    ],
                },
                {
                    icon: "el-icon-menu",
                    title: "匹配比赛",
                    name: "",
                    children: [],
                    link: "",
                    meta: {
                        identifys: [1, 2]
                    }
                },
                {
                    icon: "el-icon-document",
                    title: "报名系统",
                    name: "",
                    children: [],
                    link: "",
                    meta: {
                        identifys: [1, 2]
                    }
                },
                {
                    title: "刷题系统",
                    name: "",
                    link: "",
                    icon: "el-icon-setting",
                    children: [],
                    meta: {
                        identifys: [1, 2]
                    }
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
                            meta: {
                                identifys: [1, 2]
                            }
                        },
                        {
                            icon: '',
                            title: '设置头像',
                            link: 'SetAvatr',
                            name: 'SetAvatr',
                            children: [],
                            meta: {
                                identifys: [1, 2]
                            }
                        },
                        {
                            icon: "",
                            link: "myTaskView",
                            title: "我的任务",
                            name: "myTaskView",
                            children: [],
                            meta: {
                                identifys: [1, 2]
                            }
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
                            meta: {
                                identifys: [1]
                            }
                        },
                        {
                            icon: "",
                            title: "任务列表",
                            link: "taskListView",
                            name: "taskListView",
                            children: [],
                            meta: {
                                identifys: [1, 2]
                            }
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
                            meta: {
                                identifys: [1, 2]
                            }
                        },
                        {
                            icon: "",
                            title: "创建角色",
                            name: "createRole",
                            children: [],
                            link: "createRole",
                            meta: {
                                identifys: [1, 2]
                            }
                        },
                        {
                            icon: "",
                            title: "权限管理",
                            name: "JurisdictionCeShiView",
                            children: [],
                            link: "JurisdictionCeShiView",
                            meta: {
                                identifys: [1]
                            }
                        },
                    ],
                },
                {
                    title: "用户列表",
                    name: "userListView",
                    icon: "el-icon-menu",
                    link: "userListView",
                    children: [],
                    meta: {
                        identifys: [1, 2]
                    }
                },
            ], // home页左侧侧边栏   和  角色管理 下边的 功能权限里 的数据    公用的
        };
    },
    methods: {
        /**
        * @description 跳转页面的方法
        * @param params.name 必填    这个是需要跳转到哪个页面，就把那个页面的name传过来就OK
        * @param params.query 非必填    这个是 需要传的参数 数据  可以通过这个参数传 需要先声明一个变量接 
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