import { reactive } from './reactive.js';
import { effect } from './effect.js';
const obj = {
  a: 1,
  b: 2,
};
const state = reactive(obj);

function fn() {
  console.log('fn');
  state.a = state.a + 1;
}
// 运行函数fn1，运行期间用到的所有响应式数据，都会收集为对应关系
let isRun = false;
const effectFn = effect(fn, {
  lazy: true,
  scheduler: (eff) => {
    Promise.resolve().then(() => {
      if (!isRun) {
        isRun = true;
        eff();
      }
    });
  },
});
effectFn();

state.a++;
state.a++;
state.a++;
state.a++;
state.a++;
state.a++;
state.a++;
state.a++;
state.a++;
state.a++;
state.a++;
state.a++;
