import React, {createContext, useContext, useState} from 'react'
import api from '../services/api';

const FoodContext = createContext({});

export const FoodProvider = ({children}) => {
  const [foods, setFoods] = useState([]);
  const [foodId, setFoodId] = useState(0);

  async function addFood(formContent){
    try{
      await api.post(`/foods/`, formContent);

    } catch(err) {
      console.log(err);
    }
  }

  async function removeFood(id){
    try{
      await api.delete(`/foods/${id}`);

    } catch(err) {
      console.log(err);
    }
  }

  async function editFood(id, content){
    try{
      await api.put(`/foods/${id}`, content);

    } catch(err) {
      console.log(err);
    }
  }


  return (
    <FoodContext.Provider value={{addFood, editFood, removeFood, setFoods, foods, setFoodId, foodId}}>
      {children}
    </FoodContext.Provider>
  )
}

export function useFood(){
  const context = useContext(FoodContext);

  return context;
}
