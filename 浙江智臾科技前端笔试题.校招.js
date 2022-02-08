// ------------------------------------ 浙江智臾科技前端笔试题（校招）
// 请将笔试答案通过邮件发到 jobs@dolphindb.com
// 邮件命名格式为 前端笔试-校招-<姓名>
// 将笔试答案和简历以附件或压缩包的形式发送

// ------------ 问题 1：用十六进制写出双精度浮点数 13.25 在计算机内存中的表示
// 例：双精度浮点数 3.5 在内存中表示为 00 00 00 00 00 00 0c 40 (左边为内存低地址，右边为高地址)
/* 
  js浮点采用IEEE754 64位双精度标准
  13.25 = 1101.01
  S = 0;
  E =3 + 1023 = 1026 = Ob01000010
  M = Ob10101 
  所以内存表示为 A8 00 00 00 00 00 04 20
*/


// ------------ 问题 2：实现 unique 函数
/** 对数组或 iterable 中的每一项调用 selector，selector 返回的值作为 key 对数组去重（重复值保留后出现的那个）
    要求：时间复杂度 O(n)
    
    @template T
    @param {T[] | Iterable<T>} iterable
    @param {(obj: T) => any} selector
    @returns {T[]} unique 之后所包含元素的数组
*/
export function unique(iterable, selector) {
  let res = [];
  let map = new Map();
  for (let i of iterable) {
    let key = selector(i);
    if (map.has(key)) {
      res.splice(map.get(key), 1);
    }
    res.push(i);
    map.set(key, res.length - 1);
  }
  return res;
}

const users = [
  { name: "aaa", age: 12 },
  { name: "bbb", age: 13 },
  { name: "aaa", age: 14 },
];

unique(users, (u) => u.name); // 得到 [{ name: 'bbb', age: 13 }, { name: 'aaa', age: 14 }]

// ------------ 问题 3: 构建导航菜单
// 使用数据库中的结点列表构建导航菜单

// 结点结构如下
// interface Node {
//     /** 导航菜单结点 id */
//     id: number

//     /** 导航菜单父结点 id (parent id)，根结点 pid 为 -1 */
//     pid: number

//     /** 菜单名称 */
//     name: string

//     /** 子菜单列表 */
//     children?: Node[]
// }

// 从数据库取出的结点列表数据
let data = [
  { id: 0, pid: -1, name: "面试" },
  { id: 1, pid: 0, name: "计算机基础知识及原理" },
  { id: 2, pid: 0, name: "前端技能" },
  { id: 3, pid: 0, name: "综合素质" },
  { id: 4, pid: 1, name: "编码" },
  { id: 5, pid: 1, name: "操作系统" },
  { id: 6, pid: 1, name: "网络" },
  { id: 7, pid: 1, name: "数据结构" },
  { id: 8, pid: 2, name: "js" },
  { id: 9, pid: 2, name: "异步" },
  { id: 10, pid: 2, name: "项目" },
  { id: 11, pid: 3, name: "学习能力" },
  { id: 12, pid: 3, name: "解决问题能力" },
];

/** 构建菜单
    @typedef {{
        id: number
        pid: number
        name: string
        children?: Node[]
    }} Node
    @param {Node[]} nodes
    @returns {Node} 菜单
*/
function build(nodes) {
  // 请实现这个函数，要求时间复杂度 O(n)
  // （可以直接修改结点列表 data 中的各个结点，如增加 children 属性）
  let map = new Map();
  let root = null;
  for (let node of nodes) {
    const { pid } = node;
    if (pid === -1) {
      root = node;
    } else {
      map.set(pid, map.has(pid) ? [...map.get(pid), node] : [node]);
    }
  }

  function subBuild(node) {
    const { id } = node;
    if (map.has(id)) {
      node.children = map.get(id);
      for (let i of node.children) {
        subBuild(i);
      }
    }
  }

  subBuild(root);
  return root;
}

build(data);
// 应该返回以下的对象（省略部分结点）
// {
//     id: 0,
//     pid: -1,
//     name: '面试',
//     children: [
//         {
//             id: 1,
//             pid: 0,
//             name: '计算机基础知识及原理',
//             children: [
//                 {
//                     id: 4,
//                     pid: 1,
//                     name: '编码'
//                 },
//                 {
//                     id: 5,
//                     pid: 1,
//                     name: '操作系统'
//                 },
//                 // ...
//             ]
//         },
//         {
//             id: 2,
//             pid: 0,
//             name: '前端技能',
//             children: [
//                 // ...
//             ]
//         },
//         {
//             id: 3,
//             pid: 0,
//             name: '综合素质',
//             children: [
//                 // ...
//             ]
//         }
//     ]
// }

// ------------ 问题 4
/** 给一个递增的数组 a （元素可以有相同的值），含有 a.length 个元素，一个目标值 t, 求数组 a 中小于 t 的元素个数
    （请用最高效的算法实现，并注明时间复杂度）
    
    @param {number[]} a: 递增的数组
    @param {number} t: 目标值 t
    
    @returns {number} 数组 a 中小于 t 的元素的个数
    
    例子:
        f([1, 3, 6, 6, 8, 12], 0) === 0  
        f([1, 3, 6, 6, 8, 12], 1) === 0  
        f([1, 3, 6, 6, 8, 12], 2) === 1  
        f([1, 3, 6, 6, 8, 12], 3) === 1  
        f([1, 3, 6, 6, 8, 12], 4) === 2  
        f([1, 3, 6, 6, 8, 12], 6) === 2  
        f([1, 3, 6, 6, 8, 12], 7) === 4  
        f([1, 3, 6, 6, 8, 12], 8) === 4  
        f([1, 3, 6, 6, 8, 12], 9) === 5  
        f([1, 3, 6, 6, 8, 12], 12) === 5  
        f([1, 3, 6, 6, 8, 12], 13) === 6  
*/
//二分查找 时间复杂度O(logn)
function f(a, t) {
  let left = 0;
  let right = a.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (a[mid] === t) {
      right = mid;
      break;
    } else if (a[mid] < t) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  while (a[right] >= t) right--;
  return right + 1;
}

// ------------ 问题 5：展示一个你最满意的个人项目，内容不限、形式不限
/* 
   个人项目
   github地址: https://github.com/promise6512/admin
   简介: 这是一个电商后台管理系统，分为首页、分类管理、商品管理、用户管理和权限管理等模块。
   用户可以进行修改商品分类、增加商品、修改产品信息等操作。用户管理模块可以设置新增用户和修改用户信息，
   权限管理模块可以设置用户的权限。我在项目中负责前端部分的开发，整个项目是基于react框架开发的，
   引入了路由技术，提升用户体验。通过axios来发送http请求，实现前后台交互。
   项目一开始用的是类式组件，后来我用hooks函数组件重构了项目。
   项目中遇到的一个难点是在实现商品信息修改时，由于商品界面和修改界面是两个的不同的路由，
   进入修改路由修改信息后回到原来商品界面的路由，就相当于重新刷新界面，导致状态丢失。
   这个一开始搞得我很头疼，后来我自学了redux，将这部分状态至于redux的集中管理下，解决了这一问题，
   同时也避免了两个组件间相互传值。
*/
// 可以是个人网站的链接、github 仓库地址、算法模型、自制游戏、app、论文等

// ------------ 附加题 1 (选做)：等待最先完成的任务
/** @param {number} milliseconds */
async function delay(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

/** 执行任务 a 获取结果，返回是否符合要求 */
async function task_a() {
  await delay(2000);
  const valid = Math.random() > 0.5;
  console.log("a", valid ? "满足要求" : "不满足要求");
  return valid;
}

/** 执行任务 b 获取结果，返回是否符合要求 */
async function task_b() {
  await delay(5000);
  const valid = Math.random() > 0.5;
  console.log("b", valid ? "满足要求" : "不满足要求");
  return valid;
}

/** 并行开始两个任务，task_a 和 task_b 任意一个完成且满足要求后立即 return true, 且不等待另一个任务（短路） 
    如果第一个完成的任务不满足要求，需要看第二个任务是否满足要求，只有都不满足才返回 false
*/
async function a_or_b() {
  // todo: 请实现该函数
  function getPromise(fn) {
    let count = 0;
    return (
      new Promise((resolve) => {
        fn().then((val) => {
          if (val) {
            resolve(val);
          } else {
            count++;
            if (count === 2) resolve(false);
          }
        });
      })
    );
  }
  const res = await Promise.race([getPromise(task_a), getPromise(task_b)]);
  return res;
}

console.time();
if (await a_or_b()) console.log("task_a 或 task_b 满足要求");
else console.log("task_a 且 task_b 都不满足要求");
console.timeEnd();

// 对于上面给的 task_a, 和 task_b 例子：
// 如果 task_a 满足要求，  a_or_b 应该耗时 2s
// 如果 task_a 不满足要求，a_or_b 应该耗时 5s

// 实际情况中 task_a, task_b 耗时不确定

// ------------ 附加题 2 (选做)：将问题 1 抽象为一个函数，传入任何一个 number，返回对应内存的字符串表示
// 提示：可以用 nodejs c++ addon 来实现
// https://nodejs.org/dist/latest-v17.x/docs/api/addons.html
// https://github.com/nodejs/node-addon-api/

/**
    @param {number} x
    @returns {string}
*/
function get_double_mem(x) {
  // todo: 实现该函数
  
}

// 在 nodejs 中调用
get_double_mem(3.5) === "00 00 00 00 00 00 0c 40";
