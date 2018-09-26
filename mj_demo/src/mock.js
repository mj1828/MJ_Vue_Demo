import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

let axiosmock = window.axiosmock = new MockAdapter(axios)

const getMockString = (n = 8) => {
    const chrs = 'abcdefghijklmnopqrstuvwxyzaoeiuaoeiu   '
    let str = ''
    for (let i = 0; i < n; i++) {
        str += chrs[Math.floor(Math.random() * chrs.length)]
    }
    return str
}
let data = []
for (let i = 0; i < 9; i++) {
    data.push({
        id: getMockString(),
        goodsName: getMockString(),
        compName: getMockString(),
        use: getMockString(),
        date: getMockString()
    })
}

let parentMenus = [
    { id:"1",name: "系统管理", path: "/system", icon: "xtgl.png" },
    { id:"2",name: "统计管理", path: "/statistics", icon: "xtgl.png" },
    { id:"3",name: "日志管理", path: "/log", icon: "xtgl.png" }
];
let system = [
    { name: "应用管理", path: "/system/app", icon: "xtgl.png" },
    { name: "用户管理", path: "/system/user", icon: "xtgl.png" }
];

let statics = [
    { name: "统计", path: "/statistics/statistics", icon: "xtgl.png" }
];

let logs = [
    { name: "系统日志", path: "/log/systemLog", icon: "xtgl.png" },
    { name: "登录日志", path: "/log/loginLog", icon: "xtgl.png" },
    { name: "应用日志", path: "/log/appLog", icon: "xtgl.png" },
];

let users = [
    {id:1,userName:"笨小孩",email:"zhangyc_java@163.com",phone:"13333123161",addTime:"2018-09-01"}
]

//登录
axiosmock.onPost('/api/login').reply(200, {
    result: true,
    userName: 'root'
    
})

//导航菜单
axiosmock.onGet('/api/listParent').reply(200, {
    Result: true,
    Message: parentMenus
})

//子菜单
axiosmock.onGet('/api/listSon/1').reply(200, {
    Result: true,
    Message: system
})

axiosmock.onGet('/api/listSon/2').reply(200, {
    Result: true,
    Message: statics
})

axiosmock.onGet('/api/listSon/3').reply(200, {
    Result: true,
    Message: logs
})

//用户管理
axiosmock.onGet('/api/user/list').reply(200, {
    Result: true,
    Message: users
})

axiosmock.onAny().passThrough()