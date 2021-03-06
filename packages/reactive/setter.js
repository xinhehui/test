let data = { price: 5, quantity: 2 }
let target = null
class Dep {
  constructor () {
    this.subscribers = []
  }
  depend () {
    if (target && !this.subscribers.includes(target)) {
      this.subscribers.push(target) 
    }
  }
  notify () {
    this.subscribers.forEach(sub => sub())
  }
}
Object.keys(data).forEach(key => {
  let internalValue = data[key]

  const dep = new Dep()

  Object.defineProperty(data, key, {
    get() {
      dep.depend()
      return internalValue
    },
    set(newVal) {
      internalValue = newVal
      dep.notify()
    }
  })
})
function watcher(myFun) {
  target = myFun
  target()
  target = null
}
watcher(() => {
  data.total = data.price * data.quantity
})
console.log("total = " + data.total)
data.price = 20
console.log("total = " + data.total)
data.quantity = 10
console.log("total = " + data.total)