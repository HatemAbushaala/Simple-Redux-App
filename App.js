import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Button,
  TouchableHighlight,
} from 'react-native';

// step 1
// run this command in terminal in order to install required packages
// $npm i redux react-redux

// step 2
// create actions and reducer
// in this qpp for simplicity we want to store only array of strings , initially will be set to a,b,c

const addItem = (newItem) => {
  return { type: 'ADD_ITEM', item: newItem };
};
const deleteItem = (deletedItem) => {
  return { type: 'DELETE_ITEM', item: deletedItem };
};

// here we update the state and return it to user
const reducer = (state = ['a', 'b', 'c', 'd'], action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return [...state, action.item];
    case 'DELETE_ITEM':
      const newState = state.filter((val) => val !== action.item);
      return newState;

    default:
      return state;
  }
};

// step 3
// import libraries that we going to use
import { combineReducers, createStore } from 'redux';
import { useSelector, useDispatch, Provider } from 'react-redux';

// step 4
// create store by combining step 2 and 3
const store = createStore(combineReducers({ specialIdentifier: reducer }));

// step 5
// wrap our app with <Provider store={store}> component and pass store as prop

// step 6
// get data from current state inside component
// useSelector((state) => state.specialIdentifier);

// step 7
// execute action
// const dispatch = useDispatch();
// then used when you want to execute action , for example when button pressed
// dispatch({type:'---',optionalData:'----'})

export default function App() {
  return (
    <Provider store={store}>
      <ListComponent />
    </Provider>
  );
}

const ListComponent = () => {
  const data = useSelector((state) => state.specialIdentifier);
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.item}
        data={data}
        renderItem={({ item }) => (
          <TouchableHighlight
            onPress={() => {
              dispatch(deleteItem(item));
            }}
          >
            <Text>{item}</Text>
          </TouchableHighlight>
        )}
      />
      <Button
        title="add new"
        onPress={() => {
          dispatch(addItem('new'));
        }}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
