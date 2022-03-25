/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import api from "../../services/api";
import Food from "../../components/Food";
import ModalAddFood from "../../components/ModalAddFood";
import ModalEditFood from "../../components/ModalEditFood";
import { useFood } from "../../hooks/useFood";
import { Foods } from "../../types/foods";
import { FoodsContainer } from "./styles";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const { foods, setFoods } = useFood();

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
  };

  useEffect(() => {
    async function loadFoods() {
      const response = await api.get(`/foods`);
      setFoods(response.data);
    }

    loadFoods();
  }, []);

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood isOpen={isOpen} setIsOpen={toggleModal} />
      <ModalEditFood isOpen={editModalOpen} setIsOpen={toggleEditModal} />
      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map((food: Foods, index: number) => (
            <Food key={index} food={food} openEditFoodModal={toggleEditModal} available/>
          ))}
      </FoodsContainer>
    </>
  );
};

export default Dashboard;
