
function fetchData (cb) {
  setTimeout(() => {
    cb('peanut butter')
  }, 1000)
}

// 回调函数
test('the data is peanut butter', done => {
  function callback(data) {
    expect(data).toBe('peanut butter');
    // 如果不加done， 一旦fetchData完成，测试也就执行完成，然后再调用回调。
    done();
  }

  fetchData(callback);
});

function fetchPromiseData (cb) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('peanut butter')
    }, 1000)
  })  
}
// promise验证
test('the data is peanut butter', () => {
  // assertions（1）代表的是在当前的测试中至少有一个断言是被调用的，否则判定为失败
  expect.assertions(1);

  return expect(fetchPromiseData()).resolves.toBe('peanut butter');

  // return expect(fetchData()).rejects.toMatch('error');

  // 如果删掉return语句，那么你的测试将在fetchData完成之前结束。
  // return fetchPromiseData().then(data => {
  //   expect(data).toBe('peanut butter');
  // });
});


test('the data is peanut butter', async () => {
  expect.assertions(1);
  const data = await fetchPromiseData();
  expect(data).toBe('peanut butter');
});

test('the fetch fails with an error', async () => {
  // expect.assertions(1);
  try {
    await fetchPromiseData();
  } catch (e) {
    expect(e).toMatch('error');
  }
});

test('the data is peanut butter', async () => {
  expect.assertions(1);
  await expect(fetchPromiseData()).resolves.toBe('peanut butter');
});

// test('the fetch fails with an error', async () => {
//   expect.assertions(1);
//   await expect(fetchPromiseData()).rejects.toMatch('error');
// });
