"use client"

import { Provider } from "react-redux";
import store from "@/store/store";
import Navbar from '../components/Navbar/Navbar';

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <Navbar />
      {children}
    </Provider>
  );
}