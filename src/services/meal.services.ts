import { axiosInstance } from '../config/axiosService';
import type { APIResponse } from '../types/onBoarding.interfaces';
import type {
  MealPlan,
  FoodItem,
  ServiceRequestArgs,
} from '../types/services.interfaces';

const handleRequest = async ({
  url,
  data,
  method = 'post',
}: ServiceRequestArgs): Promise<APIResponse> => {
  try {
    const response = (await (method === 'get'
      ? axiosInstance.get(url, { params: data })
      : axiosInstance[method](url, data))) as any;

    return response as APIResponse;
  } catch (error: any) {
    return error as APIResponse;
  }
};

const mealService = () => {
  return {
    // Meal Plans
    getAllMealPlans: () => handleRequest({ url: 'api/v1/meal-plans', method: 'get' }),

    createMealPlan: (data: MealPlan) =>
      handleRequest({ url: 'api/v1/meal-plans', data, method: 'post' }),

    updateMealPlan: (id: string, data: Partial<MealPlan>) =>
      handleRequest({ url: `api/v1/meal-plans/${id}`, data, method: 'put' }),

    deleteMealPlan: (id: string) =>
      handleRequest({ url: `api/v1/meal-plans/${id}`, method: 'delete' }),

    // Food Items
    getAllFoodItems: () => handleRequest({ url: 'api/v1/food-items', method: 'get' }),

    addFoodItem: (data: FoodItem) =>
      handleRequest({ url: 'api/v1/food-items', data, method: 'post' }),

    updateFoodItem: (id: string, data: Partial<FoodItem>) =>
      handleRequest({ url: `api/v1/food-items/${id}`, data, method: 'put' }),

    deleteFoodItem: (id: string) =>
      handleRequest({ url: `api/v1/food-items/${id}`, method: 'delete' }),
  };
};

export default mealService;
