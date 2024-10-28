import { SessionProvider } from "next-auth/react";

export const CustomSessionProvider = (
  {children}: 
  {children: React.ReactNode}
) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}