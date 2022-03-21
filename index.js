// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>JS Starter</h1>`;

const PENDING = 0;
const FULFILLED = 1;
const REJECTED = 2;

function CustomPromise(executor) {
  let state = PENDING;
  let value = null;
  let handlers = [];
  let catches = [];

  function resolve(result) {
    if (state !== PENDING) return;

    state = FULFILLED;
    value = result;

    handlers.forEach((h) => h(value));
  }

  function reject(err) {
    if (state !== PENDING) return;

    state = FULFILLED;
    value = result;

    catches.forEach((c) => c(err));
  }

  this.then = function (callback) {
    if (state === FULFILLED) {
      callback(value);
    } else {
      handlers.push(callback);
    }

    //return a promise
  };

  executor(resolve, reject);
}

const doWork = (res, rej) => {
  setTimeout(() => {
    res('Hello world');
  }, 1000);
};

let someText = new CustomPromise(doWork);

someText.then((val) => {
  console.log('1st log: ' + val);
});

someText.then((val) => {
  console.log('2st log: ' + val);
});

setTimeout(() => {
  someText.then((val) => {
    console.log('3rd log: ' + val);
  });
}, 3000);
