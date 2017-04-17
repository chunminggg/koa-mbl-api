'use strict';
const crypto = require('crypto');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//建立用户数据模型
const User = new Schema({
    'username': { type: String },
    'password': { type: String },
    'roles': { type: Array, default: [], index: true },
    'magazines': { type: Array, default: [] },
    'created': { type: Date, default: Date.now, index: true },
    'updated': { type: Date, default: Date.now, index: true },
})

User.path('password').set(function(v) {
    let shasum = crypto.createHash('sha1');
    shasum.update(v);
    return shasum.digest('hex');
})

User.pre('save', function(next) {
    this.updated = Date.now();
    next();
})

User.statics.findByUserName = function(userName) {
    return this.findOne({ username: username });
}

User.statics.findByRoles = function(roles) {
    if (!Array.isArray(roles)) {
        rolse = [roles];
    }
    return this.find({ roles: { $in: roles } });
}

User.statics.findBymagazine = function(magazine) {
        return this.find({ "magazindes.name": magazine });
    }
    //静态方法，按负责的杂志类型查找
User.statics.findByMagazineType = function(magazineType) {
    return this.find({ "magazines.type": magazineType });
};

//静态方法，查找(一个)没有被雇佣(即不是编辑、也不是作者)的人
User.statics.findJobless = function() {
    return this.findOne({ roles: { $nin: ["editor", "author"] } });
};

//实例方法，判断是否是编辑
User.methods.isEditor = function() {
    return this.roles.indexOf("editor") !== -1;
};

//创建模型
const model = mongoose.model('User', User);

module.exports = model;