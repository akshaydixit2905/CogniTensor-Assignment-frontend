import React from "react";
import { NativeBaseProvider } from "native-base";
import { ToDo } from "./app/todo";
import { DefaultTheme } from "./app/theme";

export default function App() {
  return (
    <NativeBaseProvider theme={DefaultTheme}>
      <ToDo />
    </NativeBaseProvider>
  );
}