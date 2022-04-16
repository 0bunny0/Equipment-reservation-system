# Equipment-reservation-system
## Purpose

a Wechat applet which can help students to allow students to borrow photographic equipment online.

## major functions

first page is login page, then it divide into two parts: if you are a teacher, you can manage the background data, like Pass the student's Application or decline their application. if you are a student, you can apply what equipment you need through the online form, as soon as the teacher pass your apply, you can borrow the equiement.

| 页面                   | 事件名称                             | 备注                   |
| ---------------------- | ------------------------------------ | ---------------------- |
| 选择身份界面           | 点击选择身份                         | 进入学生界面或管理界面 |
| 学生主页               | 点击进入设备预约表                   |                        |
| 点击进入实验室预约表   |                                      |                        |
| 点击查看预约须知       |                                      |                        |
| 点击查看我的预约       | 进行中预约和历史预约                 |                        |
| 点击查看实验室课表     |                                      |                        |
|                        |                                      |                        |
| 教师主页               | 登录界面                             | 输入密码即可查看       |
| 点击查看设备预约情况   | 分为未处理预约、待归还预约和全部预约 |                        |
| 点击查看实验室预约情况 |                                      |                        |

## Build environment

Setting up the environment for 微信开发者工具

（sorry i don't know how to describe it in English)

**一、学生端预约功能的实现：**

1.业务逻辑

I.使用自定义组件的方式来实现设备的增加和删除（实验室预约没有此组件）。

II.使用自定义组件的方式来实现设备的预约以及归还时间的设置。

III.使用缓存技术来完成借用条例的选中和待选。

2.关键技术

 I.小程序云开发中的云数据库

 II.小程序云开发中的云函数

 III.自定义组件

**二、教师端管理功能的实现：**

1.业务逻辑

I.使用自定义组件方式来实现不同状态借用订单的显示切换。

II.使用云数据库获取数据并进行列表渲染。

III.使用云函数进行预约状态的更改以及库存的增减 （实验室没有库存的增减，只更改预约状态）。

2.关键技术

 I.小程序云开发中的云数据库

 II.小程序云开发中的云函数

 III.自定义组件

 IV.小程序内置的wxs模块

**三、学生端查看我的预约功能的实现：**

1.业务逻辑

I.使用自定义组件方式来实现不同状态借用订单的显示切换。

II.通过缓存技术存储学生借用订单，同时渲染列表。

III.使用云数据库实时获取订单状态信息从而对订单状态进行检查和更新。

2.关键技术

I.自定义组件

II.小程序内置的wxs模块

III.小程序云开发中的云数据库

**四、设备或实验室预约订单搜索功能的实现：**

1.业务逻辑

I.通过input组件对关键字进行模糊搜索。

II.使用云数据库获取数据并进行列表渲染。

III.使用云函数进行预约状态的更改以及库存的增减 （实验室没有库存的增减，只更改预约状态）。

2.关键技术

 I.正则表达式进行模糊搜索

 II.小程序云开发中的云数据库

III.小程序内置的wxs模块

**五、后台数据库管理**

由于本小程序是依靠小程序原生环境进行开发，加之本小程序目前需求不大，所以选择的时微信小程序提供的云环境、云开发作为后台服务端。