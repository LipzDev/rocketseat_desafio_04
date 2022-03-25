/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import Modal from '../Modal';
import Input from '../Input';
import {useFood} from '../../hooks/useFood'
import { FoodsFunctions } from '../../types/foods';
import { Form } from './styles';

type ModalAddFoodProps = {
  isOpen: boolean;
  setIsOpen: any;
}

const ModalAddFood = ({ isOpen, setIsOpen }: ModalAddFoodProps) => {
  const {addFood} = useFood();

  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const formData = {
    image: image,
    name: name,
    price: price,
    description: description,
  }

  function handleSubmit(){
    addFood(formData);

    // Reset form
    setImage('');
    setName('');
    setPrice('');
    setDescription('');     

    if(isOpen){
      setIsOpen(false);
    }
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" onChange={(event: any) => setImage(event.target.value)}/>

        <Input name="name" placeholder="Ex: Moda Italiana" onChange={(event: any) => setName(event.target.value)}/>
        <Input name="price" placeholder="Ex: 19.90" onChange={(event: any) => setPrice(event.target.value)} />

        <Input name="description" placeholder="Descrição" onChange={(event: any) => setDescription(event.target.value)} />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}

export default ModalAddFood