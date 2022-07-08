// 地址：http://8.131.89.181:7001 账号：xiaoming 密码: 999999

import axios from 'axios';

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // console.log('response', response.data);
    // 总结：只要你调用接口  接口返回数据时，就会走到我这个响应拦截器中
    if (response.data.status == 401) {
        // 就认为你没有登录或者是登录失效
        window.location.href = '/'
    }
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

const baseURL = '/api';
/**
 * @returns token值 放到请求头中
 * @description token值 放到请求头中
 */
const getPostConfig = function () {
    return {
        baseURL,
        headers: {
            contentType: 'application/json',
            authorization: sessionStorage.getItem('token')
        }
    }
}

/**
 * @description上传头像 1.接口名:/upload/image
 * @dparam 2.类型：‘post’
 * @dparam 3.描述:此接口用于上传图片
 */
export const uploadImg = function (payload = {}) {
    return axios.post("/upload/image", payload, getPostConfig());
}

/**
 * @description返回头像列表的接口 1.接口名:/avatar/list
 */
export const avatarList = function (payload = {}) {
    return axios.post("/avatar/list", payload, getPostConfig());
}




/**
 * @description 获取用户信息
 */
export const getIserInfoApi = function (payload = {}) {
    return axios.post("/user/info", payload, getPostConfig());
}

/**
 * @description  登录接口
 * @dparam payload.username:<string>  //必填    用户名
 * @dparam payload.password:<string>  //必填    密码，该密码要通过rsa加密
 * @dparam payload.captcha:<string>   //必填    验证码
 */
export const getLginApi = function (payload) {
    return axios.post('/user/login', payload, getPostConfig())
}

/**
 * @description  验证码接口
 */
export const getCaotchApi = function () {
    return `${baseURL}/captcha?` + Math.random();
}

/**
 * @description  注册接口
 * @dparam payload.username:[string],   //必填 用户名称
 * @dparam payload.password:[string],   //必填 用户密码
 * @dparam payload.email:[string],   //必填 用户邮箱
 * @dparam payload.phone:[string],   //必填 手机号
 * @dparam payload.captcha:[string],   //必填 验证码
 */
export const getRegisterApi = function (payload = {}) {
    return axios.post('/user/register', payload, getPostConfig())
}

/**
 * @description个人信息接口
 */
export const getUserInfoApi = function (payload = {}) {
    return axios.post('/user/info', payload, getPostConfig())
}

/**
 * @description修改个人信息接口
 * @param payload.phone : <string>,    //手机号 
 * @param payload.email : <string>,    //邮箱 
 * @param payload.sex   : <number>,    //性别 1 ： 男   0： 女
 * @param payload.avatarName: <string>, //昵称
 * @param payload.name  ：<string>,    //真实姓名
 * @param payload.provinceNo: <string>,  //省编号
 * @param payload.cityNo: <string>,    //市编号
 * @param payload.areaNo: <string>,    //区编号
 * @param payload.townNo: <string>,    //镇编号
 * @param payload.desc:   <string>,    //个人介绍
 */
export const setUpdateInfoApi = function (payload = {}) {
    return axios.post('/user/update', payload, getPostConfig())
}

/**
 * @description查询题库列表 /question/list
 * @param payload.type <number>,      // 必填项  题目类型  1：单选题  2：多选题  3：填空题  4：问答题   注：暂只支持单选；
 * @param payload.pagination <bur>    // 非必填  表示是否需要分页  如果传 false：不分页   true:分页   默认不传是分页;  
 * @param payload.pageSize <number>   // 非必填  每页获取几条数据  如果不传 默认是获取10条；
 * @param payload.pageNum <number>    // 非必填  想获取第几页的数据  如果不传 默认是第1页；
 **/
export const getListInfoApi = function (payload = {}) {
    console.log(payload);
    return axios.post('/question/list', payload, getPostConfig())
}

/**
 * @description 删除题列表 /question/delete
 * @param payload.id: <number>,   // 必填项 题目id
 * @param payload.type:<number>,  // 必填 题目类型
 **/
export const getDeleteApi = function (payload = {}) {
    console.log(payload);
    return axios.post('/question/delete', payload, getPostConfig())
}

/**
 * @description 创建题接口 /question/delete
 * @param payload.type:<number>, //题目类型
 * @param payload.title:<string>, //题目标题
 * @param payload.questionA:<string>,  // 选项a,
 * @param payload.questionB:<string>,  // 选项b,
 * @param payload.questionC:<string>,  // 非必填 选项c,
 * @param payload.questionD:<string>,  // 非必填 选项d,
 * @param payload.answer:<string>,     // 答案  如果是单选题则传 A 或者  B 或  C 或 D (大写)
 * @param payload.level: <number>,     // 难度系数  1：简单  2：普通 3：困难
 **/
export const getCreateApi = function (payload = {}) {
    console.log(payload);
    return axios.post('/question/create', payload, getPostConfig())
}
/**
 * 
 * @description 修改题接口
 * @param payload.id: <number>,   // 必填 题目id
 * @param payload.type:<number>,  // 必填 题目类型
 * @param payload.title:<string>, // 非必填 题目标题
 * @param payload.questionA:<string>,  // 选项A,
 * @param payload.questionB:<string>,  // 选项B,
 * @param payload.questionC:<string>,  // 非必填 选项c,
 * @param payload.questionD:<string>,  // 非必填 选项D,
 * @param payload.answer:<string>,     // 答案  如果是单选题则传 A 或者  B 或  C 或 D (大写)
 * @param payload.level: <number>,     // 难度系数  1：简单  2：普通 3：困难
 */
export const getUpdateApi = function (payload = {}) {
    console.log(payload);
    return axios.post('/question/update', payload, getPostConfig())
}


/**
 * @description 创建任务接口
 * @param payload.name string-任务名称
 * @param payload.desc string-任务描述releaseTaskApi
 * @param payload.duration  number-任务描述
 * @param payload.level  number-任务等级  1:紧急 --- 0:普通任务
 */
export const getCreateTaskApi = function (payload = {}) {
    return axios.post('/task/create', payload, getPostConfig())
}

/**
 * @description 发布任务接口
 * @param payload.userIds <array[number]>-用户id,如果给多个人发送任务，可以传数组，数组中是每一个人的id；
 * @param payload.taskId number-任务Id
 */
export const releaseTaskApi = function (payload = {}) {
    return axios.post('/task/release', payload, getPostConfig())
}

/**
 * @description 查询用户信息列表
 * @param payload.pagination boolean 非必填  表示是否需要分页  如果传 false：不分页   true:分页   默认不传是分页; 
 * @param payload.pageSize number 非必填  每页获取几条数据  如果不传 默认是获取10条；
 * @param payload.pageNum number 非必填  想获取第几页的数据  如果不传 默认是第1页；
 */
export const getUserList = function (payload = {}) {
    return axios.post('/user/list', payload, getPostConfig())
}

/**
 * @description 查询任务列表列表
 * @param payload.pagination : <boolean>,    //非必填  表示是否需要分页  如果传 false：不分页   true:分页   默认不传是分页;  
 * @param payload.pageSize number 非必填  每页获取几条数据  如果不传 默认是获取10条；
 * @param payload.pageNum number 非必填  想获取第几页的数据  如果不传 默认是第1页；
 */
export const getTaskListApi = function (payload = {}) {
    return axios.post('/task/list', payload, getPostConfig())
}

/**
 * @description 查询任务详情
 * @param payload.taskId : <number>,    //任务id
 */
export const getTaskdetailApi = function (payload = {}) {
    return axios.post('/task/detail', payload, getPostConfig())
}

/**
 * @param params 入参
 * @description 创建角色  /role/create
 * @param payload.roleName <striing> 角色名字
 * @param payload.userId <Number> //用户id  表示这个角色要哪一个用户创建的
 * @param payload.groupId <Number> 非必填  分组id
 * @param res 出参：-----------
 * @param res.status 1:成功  0、或者其他的 失败
 * @param res.msg 返回的描述信息
 * @param res.data 返回的数据
 */
export const createRoleApi = function (payload = {}) {
    return axios.post('/role/create', payload, getPostConfig())
}

/**
 * @param params 入参
 * @description 角色列表  /role/list
 * @param payload.pagination  <boolean> 非必填  表示是否需要分页  如果传 false：不分页   true:分页   默认不传是分页; 
 * @param payload.pageSize  <Number>非必填  每页获取几条数据  如果不传 默认是获取10条
 * @param payload.pageNum   <Number>非必填  想获取第几页的数据  如果不传 默认是第1页；
 */
export const getRoleListApi = function (payload = { pagination: false }) {
    return axios.post('/role/list', payload, getPostConfig())
}

/**
 * @description 创建角色组 /roleGroup/create
 * @param payload.groupName <striing>分组名字
 */
export const setRoleGroupCreateApi = function (payload = {}) {
    return axios.post('/roleGroup/create', payload, getPostConfig())
}

/**
 * @description 角色分组列表 /roleGroup/list
 * @param payload.pagination : <boolean>,    //非必填  表示是否需要分页  如果传 false：不分页   true:分页   默认不传是分页; 
 * @param payload.pageSize   : <number>,     //非必填  每页获取几条数据  如果不传 默认是获取10条；
 * @param payload.pageNum    : <number>,     //非必填  想获取第几页的数据  如果不传 默认是第1页；
 */
export const getRoleGroupListApi = function (payload = { pagination: false }) {
    return axios.post('/roleGroup/list', payload, getPostConfig())
}

/**
 * @description 创建评论 /comment/create
 * @param payload.commentContent:<string>, //要评论的内容
 * @param payload.taskId:<number> //要评论任务的id
 * @param payload.userId:<number> //评论的用户id  是谁评论的
 */
export const setCommentCreateApi = function (payload = {}) {
    return axios.post('/comment/create', payload, getPostConfig())
}

/**
 * @description 获取评论列表 /comment/list
 * @param payload.pagination : <boolean>,    //非必填  表示是否需要分页  如果传 false：不分页   true:分页   默认不传是分页; 
 * @param payload.pageSize   : <number>,     //非必填  每页获取几条数据  如果不传 默认是获取10条；
 * @param payload.pageNum    : <number>,     //非必填  想获取第几页的数据  如果不传 默认是第1页；
 */
export const getCommentListApi = function (payload = {}) {
    return axios.post('/comment/list', payload, getPostConfig())
}

/**
 * @description 获取权限列表 /comment/list
 * @param payload.pagination : <boolean>,    //非必填  表示是否需要分页  如果传 false：不分页   true:分页   默认不传是分页; 
 * @param payload.pageSize   : <number>,     //非必填  每页获取几条数据  如果不传 默认是获取10条；
 * @param payload.pageNum    : <number>,     //非必填  想获取第几页的数据  如果不传 默认是第1页；
 */
export const getPermissionListApi = function (payload = { pagination: false }) {
    return axios.post('/permission/list', payload, getPostConfig())
}

/**
 * @description 创建权限接口 /permission/create
 * @param payload.title :<string>, //标题  
 * @param payload.type  :<number>  //类型   1代表左侧栏  2代表页面  3代表功能
 * @param payload.pid   :<number>  //pid如果为空就是最大的一级  如果等于某项的id就是它的子级；
 */
export const getPermissionCreateApi = function (payload = { pagination: false }) {
    return axios.post('/permission/create', payload, getPostConfig())
}

/**
 * @description 删除权限接口 /permission/delete
 * @param payload.id: <arr>,   // 必填项 权限的id  如果有子级 就把子级跟父级的id都传过来 是一个数组
 */
export const getPermissionDeleteApi = function (payload = { pagination: false }) {
    return axios.post('/permission/delete', payload, getPostConfig())
}

/**
 * @description 修改权限接口 /permission/update
 * @param payload.id   : <number>     //id
 * @param payload.title: <string>,    //标题
 * @param payload.type : <number>,    //类型
 * @param payload.pid  : <number>,    //父id
 */
export const getPermissionUpdateApi = function (payload = { pagination: false }) {
    return axios.post('/permission/update', payload, getPostConfig())
}
