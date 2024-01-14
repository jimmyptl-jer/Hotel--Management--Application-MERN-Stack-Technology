import React, { createContext, useContext, useState } from "react";
import Toast from "../Components/Toast";
import { useQuery } from "react-query";

import * as apiClient from "../api-client";

// Define the shape of a ToastMessage
type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

// Define the type of AppContext
type AppContextType = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean;
};

// Create the AppContext with an initial value of undefined
const AppContext = createContext<AppContextType | undefined>(undefined);

// Create the AppContextProvider component
export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);

  const { isError } = useQuery("validateToken", apiClient.validateToken, {
    retry: false,
  });

  return (
    // Provide the value for the context using AppContext.Provider
    <AppContext.Provider
      value={{
        // Define a function to show a toast message
        showToast: (toastMessage) => {
          setToast(toastMessage);
        },
        isLoggedIn: !isError,
      }}
    >
      <>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(undefined)}
          />
        )}
        {children}
      </>
    </AppContext.Provider>
  );
};

// Create the useAppContext hook to access the context values
export const useAppContext = () => {
  // Use the useContext hook to get the current context value
  const context = useContext(AppContext);

  // If the context is undefined, throw an error
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }

  // Return the context value with non-null assertion
  return context!;
};
