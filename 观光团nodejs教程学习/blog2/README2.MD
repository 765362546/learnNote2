
###参考第一遍的实验，进行第二次实验

###使用默认的ejs引擎和默认的路由


1. 规划
   
   * 用户管理相关
     * 注册------新增
     * 登录------查询
     * 个人中心---查询
     * 修改个人信息---更新
     * session---保存session信息
     * 注销-------删除session
   
   * 博客管理相关
     * 发表博客---新增
     * 查看博客---查询
     * 博客列表---查询
     * 修改博客---更新
     
   * 用户模型
     * 用户名（唯一）
     * 密码
     
   * 博客模型
     * 博客标题
     * 博客内容
     * 作者（关联用户表）
     * 发表时间
     
   * 其他
     * 使用bootstrap
     * 使用ajax进行post访问
     * post路由返回resJson
     * 使用mvc
        * routes 路由
        * models 模型
        * views  页面
        * controllers  控制器
     * public存放js/img/css
     * 使用mogodb/mongoose/connect-mongo
     * 使用express-session
     * config 存放数据库连接等配置文件
     
2. 开始
    
    * 拆分页面头部和尾部
    * 头部添加公共导航栏
    
    * 增加用户模型
    * 增加用户注册路由/用户注册页面/用户注册控制器
    * 修改用户注册位ajax方式--修改header.ejs添加公共js库
    * 修改用户注册控制器--先判断是否存在，如果不存在就注册，否则提示相应的注册信息
    * 增加用户登录路由/登录页面/登录控制器
    * 增加session，增加个人中心路由/页面/控制器
        * session，用户登录/注册成功时，将数据库中查询到的用户信息保存到session.user
        * 将session信息保存到动态视图助手中？补充学习静态视图助手和动态视图助手
    * 修改公共页面头部，根据用户登录情况，来显示不同的页面
        * 登录成功/注册成功 显示 首页/个人中心/注销，以后需要加上发表微博和微博列表
        * 没有登录        显示 首页/登录/注册
        
    * 增加注销路由/注销控制器，注销后跳转到登录页面    
    * 增加个人中心路由/控制器
    * 增加修改个人信息页面/控制器----修改后需要刷新session
    
    用户管理部分完成
    
    -----
    
    * 导航栏增加发表博客和博客列表连接
    * 增加发表微博页面/路由/控制器(初始化页面)
    * 增加博客模型
    * 增加查看博客页面/路由/控制器
    * 增加修改博客路由/控制器---直接在查看界面进行修改，增加了两个按钮，修改博客和提交修改
    两个按钮的功能分别是修改页面元素为可编辑和提交修改post请求
    * 查看博客页面，修改控制器和页面，增加author的关联查询;
    关联查询的方法：xxModel.findxx({}).populate('关联的字段名，即外键名').exec(function(err,data){});
    populate 英语翻译：填充
    * 增加博客列表页面/路由/控制器
    
    * 已经完成所有功能，但是需要继续优化，
    比如博客列表界面的时间显示效果
    * !!!完成时间格式化显示
    * <h3>完成时间格式化工具类,<br>
    控制器将此工具函数通过render参数传递给ejs模板,<br>
    然后模板调用此函数格式化时间戳为正常的日期<br>
    相比于页面使用JavaScript语句处理,效率高了很多
    </h3>
    
3. 结束语
    
    第一遍按照教程视频(观光团nodejs视频教程)的操作,完成实验。第二遍重新捋顺了思路，然后完成教程中的目标，并在其中学习到了很多新的东西。
    
4. 下一步

    等学习完angularjs教程后,使用angularjs第三遍完成此实验。
    
   
   * 补充页面访问验证 
    