module.exports = {
  async getUser(ctx, service) {
    // ctx.body = 'getUser1';
    ctx.body = await service.user.storeInfo();//开心的使用service
  },
  async getUserInfo() {
      ctx.body = 'getUserInfo';
  }
};