import React, {createContext, useContext, useState} from 'react'
import api from '../services/api';
import { Foods, FoodsFunctions } from "../types/foods";

const FoodContext = createContext({} as FoodsFunctions);

type FoodProviderProps = {
  children: React.ReactNode;
}

export const FoodProvider = ({children}: FoodProviderProps) => {
  const [foods, setFoods] = useState<Foods[]>([]);
  const [selectedFoodId, setSelectedFoodId] = useState(1);

  async function addFood(formContent: Foods){
    try{
      await api.post(`/foods/`, formContent);   
      
      let newObj = {
        ...formContent,
        id: foods.length + 1
      }

      setFoods(foods.concat(newObj));   

    } catch(err) {
      console.log(err);
    }
  }

  async function removeFood(id: Foods){
    try{      
      await api.delete(`/foods/${id}`);
      setFoods(foods.filter(food => food.id !== id));

    } catch(err) {
      console.log(err);
    }
  }

  async function editFood(id: Foods, content: Foods){
    try{
        await api.put(`/foods/${id}`, content);
        setFoods(foods.filter(food => {
          if(food.id === id){
            food.image = content.image;
            food.name = content.name;
            food.description = content.description;
            food.price = content.price;
            food.isAvailable = content.isAvailable;
          }
          return food;
        }          
      ));
        
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <FoodContext.Provider value={{addFood, editFood, removeFood, setFoods, foods, setSelectedFoodId, selectedFoodId}}>
      {children}
    </FoodContext.Provider>
  )
}

export function useFood(){
  const context = useContext(FoodContext);

  return context;
}
