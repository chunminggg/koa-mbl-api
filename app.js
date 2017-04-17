const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-body');
const app = new Koa();
const dataBase = require('./app/router.js')
const userController = require('./app/controller/user.js')

app.on('error', function(err) {
        console.error(err.stack);
        console.log(err.message);
    })
    //Set up body parsing middleware
app.use(bodyParser());
app.use(ctx => {
    // the parsed body will store in this.request.body
    // if nothing was parsed, body will be an empty object {}
    ctx.body = ctx.request.body;
    console.log(ctx.request.body)
});
router
    .post('/data', async(ctx, next) => {
        console.log(ctx.req, ctx.body)
    })
    // app.use(router.get('/user/list', userController.list));
    // app.use(router.post('/user/insert', userController.insert));
    // app.use(router.get('/user/editors', userController.editors));
    // app.use(router.get('/user/editors/:magazine', userController.magazineEditors));
    // app.use(router.get('/user/editors/type/:type', userController.typeEditors));
    // app.use(router.post('/user/hired', userController.hired));
    // app.use(router.get('/user/hire/:username', userController.hire));
app
    .use(router.routes());
// .use(router.allowedMethods());
dataBase.dateBaseConfig();
app.listen(3000, () => { console.log('Server started, please visit: http://127.0.0.1:3000'); });