import store from "./LoginModule";

export default (to, from, next) => {
  if (!store.state.token) {
    next();
    return;
  }
  next({ name: "Login" });
};
