/**
 * Created by malei on 2017/6/12.
 */

var ModelUser = require('../model/user');
module.exports.login={
    get:function (req, res, next) {
        //res.send('登录');
        res.render('login', {title: '登录'})
    },
    post: function (req, res, next) {
        var postData = {
            username: req.body.username
        };
        var resJson={
            status:false,
            msg:''
        };
        ModelUser.findOne(postData, function (err, data) {
            if (err) console.log(err);
            console.log(data);
            if (data) {
                if (data.password == req.body.password) {
                    req.session.user = data;
                    resJson.msg='登录成功';
                    resJson.status=true;
                    res.send(resJson);
                    //res.redirect('/user/' + data._id);
                    //res.send('登录成功');
                } else {
                    resJson.msg='非法密码'
                    res.send(resJson);
                }
            } else {
                resJson.msg='无此用户';
                res.send(resJson);
                //console.log('aaa')
            }
        });


    }

};

module.exports.reg={
    get:function (req, res, next) {
        //res.send('注册');
        res.render('reg', {title: '注册'})
    },
    post:function (req, res, next) {
        //console.log(req.body);
        var postData = {
            username: req.body.username,
            password: req.body.password
        };
        //console.log(postData);

        var resJson={
            status:false,
            msg:''
        };
        ModelUser.findOne({username: postData.username}, function (err, data) {
            if (err) console.log(err);
            if (data) {
                //res.send('该用户名已被注册');
                resJson.msg='该用户名已被注册';
                res.send(resJson);
            } else {
                ModelUser.create(postData, function (err, data) {
                    if (err){
                        resJson.msg='注册异常';
                        //console.log(err);
                        res.send(resJson);
                    }
                    resJson.msg='注册成功';
                    resJson.status=true;
                    req.session.user = data;
                    res.send(resJson);
                });
            }
        });

    }
};

module.exports.logout={
    get:function (req, res, next) {
        //res.send('退出');
        delete req.session.user; //退出时先清理会话信息
        res.redirect('/');
    }

};

module.exports.user={
    get: function (req, res, next) {
        //console.log(req.params);
        var getData = {
            // _id:req.param('_id')
            _id: req.params._id
        };
        if (getData._id) {
            ModelUser.findById(getData, function (err, data) {
                if (err) console.log(err);
                //console.log(data);
                if (data) {
                    res.render('userinfo', {
                        title: data.username + '的个人信息',
                        view: data
                    });
                } else {
                    res.send('查询不到您的个人信息');
                }
            });
        } else {
            res.send('非法访问')
        }

    }
};

//登录后才能访问
module.exports.loginYes=function (req,res,next) {
    var user=req.session.user;
    if(!user){
        res.redirect('/login');
    }else{
        next();
    }
};

//登录后不能访问

module.exports.loginNo=function (req,res,next) {
    var user=req.session.user;
    if(user){
        res.redirect('/user/'+user._id);
    }else{
        next();
    }
};