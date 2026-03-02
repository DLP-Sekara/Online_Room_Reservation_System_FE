import { useMutation, useQueryClient } from '@tanstack/react-query';
import { errorToast, successToast } from '../components/common/Alert';
import type { APIResponse } from '../types/onBoarding.interfaces';
import type { MealPlan, FoodItem } from '../types/services.interfaces';
import mealService from '../services/meal.services';

const mealMutation = () => {
  const queryClient = useQueryClient();
  const {
    createMealPlan,
    updateMealPlan,
    deleteMealPlan,
    addFoodItem,
    updateFoodItem,
    deleteFoodItem,
  } = mealService();

  const createMealPlanMutation = () => {
    return useMutation({
      mutationFn: (data: MealPlan) => createMealPlan(data),
      onSuccess: (response: APIResponse) => {
        if (response.success) {
          successToast(response.message);
          queryClient.invalidateQueries({ queryKey: ['meal-plans'] });
        } else {
          errorToast(response.message);
        }
      },
      onError: (error: APIResponse) => {
        errorToast(error.message || 'Failed to create meal plan');
      },
    });
  };

  const updateMealPlanMutation = () => {
    return useMutation({
      mutationFn: ({ id, data }: { id: string; data: Partial<MealPlan> }) =>
        updateMealPlan(id, data),
      onSuccess: (response: APIResponse) => {
        if (response.success) {
          successToast(response.message);
          queryClient.invalidateQueries({ queryKey: ['meal-plans'] });
        } else {
          errorToast(response.message);
        }
      },
      onError: (error: APIResponse) => {
        errorToast(error.message || 'Failed to update meal plan');
      },
    });
  };

  const deleteMealPlanMutation = () => {
    return useMutation({
      mutationFn: (id: string) => deleteMealPlan(id),
      onSuccess: (response: APIResponse) => {
        if (response.success) {
          successToast(response.message);
          queryClient.invalidateQueries({ queryKey: ['meal-plans'] });
        } else {
          errorToast(response.message);
        }
      },
      onError: (error: APIResponse) => {
        errorToast(error.message || 'Failed to delete meal plan');
      },
    });
  };

  const addFoodItemMutation = () => {
    return useMutation({
      mutationFn: (data: FoodItem) => addFoodItem(data),
      onSuccess: (response: APIResponse) => {
        if (response.success) {
          successToast(response.message);
          queryClient.invalidateQueries({ queryKey: ['food-items'] });
        } else {
          errorToast(response.message);
        }
      },
      onError: (error: APIResponse) => {
        errorToast(error.message || 'Failed to add food item');
      },
    });
  };

  const updateFoodItemMutation = () => {
    return useMutation({
      mutationFn: ({ id, data }: { id: string; data: Partial<FoodItem> }) =>
        updateFoodItem(id, data),
      onSuccess: (response: APIResponse) => {
        if (response.success) {
          successToast(response.message);
          queryClient.invalidateQueries({ queryKey: ['food-items'] });
        } else {
          errorToast(response.message);
        }
      },
      onError: (error: APIResponse) => {
        errorToast(error.message || 'Failed to update food item');
      },
    });
  };

  const deleteFoodItemMutation = () => {
    return useMutation({
      mutationFn: (id: string) => deleteFoodItem(id),
      onSuccess: (response: APIResponse) => {
        if (response.success) {
          successToast(response.message);
          queryClient.invalidateQueries({ queryKey: ['food-items'] });
        } else {
          errorToast(response.message);
        }
      },
      onError: (error: APIResponse) => {
        errorToast(error.message || 'Failed to delete food item');
      },
    });
  };

  return {
    createMealPlanMutation,
    updateMealPlanMutation,
    deleteMealPlanMutation,
    addFoodItemMutation,
    updateFoodItemMutation,
    deleteFoodItemMutation,
  };
};

export default mealMutation;
