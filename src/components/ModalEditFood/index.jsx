import { FiCheckSquare } from "react-icons/fi";

import React, { useState, useEffect } from "react";
import Modal from "../Modal";
import Input from "../Input";
import { useFood } from "../../hooks/useFood.jsx";
import { Form } from "./styles";
import api from "../../services/api";

const ModalEditFood = ({ isOpen, setIsOpen }) => {
  const { editFood, selectedFoodId } = useFood();
  const [ data, setData ] = useState([]);

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const newFormContent = {
    image: image,
    name: name,
    price: price,
    description: description,
  };

  function handleEdit() {
    editFood(selectedFoodId, newFormContent);
  }

  useEffect(() => {
    async function loadContent() {
      await api.get(`/foods/${selectedFoodId}`).then(response => setData(response.data)).catch(
      setData('Loading...')
      )
    }

    loadContent();
  }, [selectedFoodId]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form onSubmit={handleEdit}>
        <h1>Editar Prato</h1>
        <Input
          name="image"
          placeholder="Cole o link aqui"
          onChange={(event) => setImage(event.target.value)}
          initialValue={data?.image}
        />
        <Input
          name="name"
          placeholder="Ex: Moda Italiana"
          onChange={(event) => setName(event.target.value)}
          initialValue={data?.name}
        />
        <Input
          name="price"
          placeholder="Ex: 19.90"
          onChange={(event) => setPrice(event.target.value)}
          initialValue={data?.price}
        />
        <Input
          name="description"
          placeholder="Descrição"
          onChange={(event) => setDescription(event.target.value)}
          initialValue={data?.description}
        />
        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalEditFood;

// class ModalEditFood extends Component {
//   constructor(props) {
//     super(props);

//     this.formRef = createRef()
//   }

//   handleSubmit = async (data) => {
//     const { setIsOpen, handleUpdateFood } = this.props;

//     handleUpdateFood(data);
//     setIsOpen();
//   };

//   render() {
//     const { isOpen, setIsOpen, editingFood } = this.props;

//
//   }
// };

// export default ModalEditFood;
