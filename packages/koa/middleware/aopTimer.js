// https://www.zhihu.com/question/40703562/answer/489148819
// 统计每个middleware时间，算出controller时间

private wrapMiddleware() {
  let self = this;
  let app_use = this.app.use;
  let app = this.app;
  this.app.use = function (fn: Function, name: string) {
      self.midNames.push(name || 'index_' + self.midNames.length);
      return app_use.call(app, self.wrapUse(fn, name));
  }
}

private wrapUse(fn: Function, name: string) {
  return async (ctx: any, next: Function) => {
      this.introMid(ctx);
      await fn(ctx, next);
      this.outMid(ctx);
  }
}

private introMid(ctx: any) {
  let time = this.getMidTimer(ctx);
  time.list.push(gethrTime());
}

private getMidTimer(ctx: any) {
  let id = ctx.requestId;
  if (!this.times[id]) {
      this.times[id] = {
          prev: 0,
          list: [],
          diff: []
      }
  }
  return this.times[id];
}

private outMid(ctx: any) {
  let convertNum = 1000000;
  let time = this.getMidTimer(ctx);
  let start = time.list.pop();
  let diff = gethrTime() - start - time.prev; //当前中间件内部时间减去上层中间件的时间
  time.prev += diff;
  time.diff.unshift(diff); //更新上层中间件的时间
  if (time.list.length === 0) { //所有中间件都被pop掉之后，结束所有mid
      let data: any = {};
      let sum = 0;
      time.diff.forEach((diff: number, index: number) => {
          sum += diff;
          let name = this.midNames[index];
          if (name === 'router') {
              name = `router:${ctx.request.url}`;
          }
          data[name] = diff / convertNum;
      });
      delete this.times[ctx.requireId];
      data['sum'] = sum / convertNum;
      ctx.accessLogObj.msg = JSON.stringify(data);
      this.logger.access(ctx.accessLogObj);
  }
}