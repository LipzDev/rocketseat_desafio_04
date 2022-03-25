export type Foods = {
  id?: number;
  name?: string;
  price?: string;
  image?: string;
  description?: string;
  isAvailable?: boolean;
  selectedFoodId?: number;
}

export type FoodsFunctions = {
  addFood: (formContent: Foods) => void;
  editFood: any;
  removeFood: any;
  setSelectedFoodId: (id: number) => void;
  selectedFoodId: number;
  setFoods: ((content: Foods[]) => void);
  foods: Foods[]; 
}