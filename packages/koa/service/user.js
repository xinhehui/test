module.exports = {
  async storeInfo() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(1111)
        }, 1000)
      })
  }
};