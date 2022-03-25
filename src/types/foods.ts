export type Foods = {
  id?: number;
  name?: string;
  price?: number;
  image?: string;
  description?: string;
  isAvailable?: boolean;
}

export type FoodsFunctions = {
  addFood?: (formContent: Foods) => void;
  editFood?: (id: Foods, content: Foods) => void;
  removeFood?: (id: Foods, content: Foods) => void;
  setSelectedFoodId?: (id: number) => void;
  selectedFoodId?: number;
  setFoods: ((content: Foods[]) => void);
  foods?: Foods[]; 
}