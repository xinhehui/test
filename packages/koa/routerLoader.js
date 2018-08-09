const router = require('koa-router');
const Router = new router();
const fs = require('fs');

const services = require('./controllerLoader').loadService();//这里引入service


/**
 * 返回router中间件
 */
const setRouters = (app) => {
    const routers = require('./routers')(app);
    const svs = {};
    services.forEach((service) => {
        svs[service.name] = service.module;
    })
    Object.keys(routers).forEach((key) => {
        const [method, path] = key.split(' ');
        Router[method](path, (ctx) => {
            const handler = routers[key];//注意这里的变化
            handler(ctx, svs);//注意这里的变化
          })
        })
        return Router.routes()
    }
    
    module.exports = setRouters;