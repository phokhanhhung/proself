"use client"

import { Provider } from "react-redux";
import store from "@/store/store";
import UserChecker from "./CheckUser";
import { CustomSessionProvider } from "./CustomSessionProvider";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <CustomSessionProvider>
        <UserChecker>{children}</UserChecker>
      </CustomSessionProvider>
    </Provider>
  );
}