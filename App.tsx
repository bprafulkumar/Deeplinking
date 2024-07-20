// import { View, Text } from "react-native";
// import React from "react";
// import { TodoContext } from "./allContext/todoContext/todoContext";
// import Todo from "./Components/todoItems/Todo";
// import CustomButton from "./Components/todoItems/CustomButton";

// export default function App() {
//   return (
//       <TodoContext>
//           <CustomButton />
//           <Todo/>
//       </TodoContext>
//   );
// }

// import React, {Component} from 'react';
// import {Text, View} from 'react-native';
// import {CounterProvider} from './allContext/contextApi/CounterContext';
// import Counter from './Components/Counter/Counter';

// export default class App extends Component {
//   render() {
//     return (
//       <CounterProvider>
//         <Counter />
//       </CounterProvider>
//     );
//   }
// }

import { View, Text } from "react-native";
import React from "react";
import { Provider } from "react-redux";
import TodoRedux from "./todoRedux/TodoRedux";
import store from "./reduxFlow/store";
import CustomInput from "./todoRedux/CustomInput";

export default function App() {
  return (
    <Provider store={store}>
      <CustomInput/>
      <TodoRedux/>
    </Provider>
  );
}

