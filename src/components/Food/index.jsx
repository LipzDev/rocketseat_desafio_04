/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { FiEdit3, FiTrash } from 'react-icons/fi';
import {useFood} from '../../hooks/useFood';
import api from '../../services/api.ts';
import { Container } from './styles';

const Food = ({food, openEditFoodModal}) => {
  const {removeFood, setSelectedFoodId, setFoods, foods} = useFood();

  async function isAvailableInStock(food){
    try{
      const response = await api.get(`/foods/${food.id}`);

      const newObject = {
        ...response.data,
        isAvailable: !food.isAvailable
      }

      await api.put(`/foods/${food.id}`, newObject);

      setFoods(foods.filter(food => {
        if(food.id === newObject.id){
          food.isAvailable = !food.isAvailable;
        }
        return food;
      }));
      
    } catch(err) {
      console.log(err);
    }
  }

  function handleDelete(id){
    removeFood(id);
  }

  function handleEdit(id){
    setSelectedFoodId(id);
    openEditFoodModal();
  }

  function handleChange(food){
    isAvailableInStock(food);
  }

  return (
    <Container available={food?.isAvailable}>
      <header>
        <img src={food.image} alt={food.name} />
      </header>
      <section className="body">
        <h2>{food.name}</h2>
        <p>{food.description}</p>
        <p className="price">
          R$ <b>{food.price}</b>
        </p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={() => handleEdit(food.id)}
            data-testid={`edit-food-${food.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(food.id)}
            data-testid={`remove-food-${food.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{food?.isAvailable ? 'Disponível' : 'Indisponível'}</p>

          <label htmlFor={`available-switch-${food.id}`} className="switch">
            <input
              id={`available-switch-${food.id}`}
              type="checkbox"
              checked={food?.isAvailable}
              onChange={() => handleChange(food)}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  );
}

export default Food