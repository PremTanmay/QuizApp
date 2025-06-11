"use client";
import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
import appStore, { persistor } from "@/utils/appStore";
import { PersistGate } from "redux-persist/integration/react";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export function Providers({ children }) {
//   return (
//     <Provider store={appStore}>
//       <PersistGate loading={null} persistor={persistor}>
//         {children}
//         <ToastContainer />
//       </PersistGate>
//     </Provider>
//   );
// }
export function Providers({ children }) {
  return (
    <Provider store={appStore}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
        {/* <ToastContainer /> */}
      </PersistGate>
    </Provider>
  );
}
