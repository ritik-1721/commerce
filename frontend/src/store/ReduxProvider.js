import { Provider } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import store from "./index";
function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

const makeStore = () => store;
export const wrapper = createWrapper(makeStore);
export default ReduxProvider;
