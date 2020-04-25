// import { createStore } from "redux";

window.onload = function () {
  render();
};

const counter = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};

const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  dispatch({});

  return { getState, dispatch, subscribe };
};

const store = createStore(counter);

const render = () => {
  document.querySelector(".count").innerHTML = `Count: ${store.getState()}`;
};
const counterUns = store.subscribe(render);
const helloUns = store.subscribe(() => {
  console.log("hello");
});

document.querySelector(".inc-btn").addEventListener("click", () => {
  store.dispatch({ type: "INCREMENT" });
});
