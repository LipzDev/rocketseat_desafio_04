/* eslint-disable react-hooks/exhaustive-deps */
import { FiEdit3, FiTrash } from 'react-icons/fi';
import {useFood} from '../../hooks/useFood';
import api from '../../services/api';
import { Foods } from '../../types/foods';
import { Container } from './styles';

type FoodProps = {
  food: Foods;
  openEditFoodModal: () => void;
  available: boolean;
}

const Food = ({food, openEditFoodModal}: FoodProps) => {
  const {removeFood, setSelectedFoodId, setFoods, foods} = useFood();

  async function isAvailableInStock(food: Foods) {
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

  function handleDelete(id: number){
    removeFood(id);
  }

  function handleEdit(id: number){
    setSelectedFoodId(id);
    openEditFoodModal();
  }

  function handleChange(food: Foods){
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
            onClick={() => handleEdit(food.id as number)}
            data-testid={`edit-food-${food.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(food.id as number)}
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