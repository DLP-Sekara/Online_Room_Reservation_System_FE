import { useMutation, useQueryClient } from '@tanstack/react-query';
import { errorToast, successToast } from '../components/common/Alert';
import type { APIResponse } from '../types/onBoarding.interfaces';
import type { UserAccount } from '../types/services.interfaces';
import userService from '../services/user.services';

const userMutation = () => {
  const queryClient = useQueryClient();
  const { updateUser, deleteUser } = userService();

  const updateUserMutation = () => {
    return useMutation({
      mutationFn: ({ id, data }: { id: string; data: Partial<UserAccount> }) =>
        updateUser(id, data),
      onSuccess: (response: APIResponse) => {
        if (response.success) {
          successToast(response.message);
          queryClient.invalidateQueries({ queryKey: ['users'] });
        } else {
          errorToast(response.message);
        }
      },
      onError: (error: APIResponse) => {
        errorToast(error.message || 'Failed to update user');
      },
    });
  };

  const deleteUserMutation = () => {
    return useMutation({
      mutationFn: (id: string) => deleteUser(id),
      onSuccess: (response: APIResponse) => {
        if (response.success) {
          successToast(response.message);
          queryClient.invalidateQueries({ queryKey: ['users'] });
        } else {
          errorToast(response.message);
        }
      },
      onError: (error: APIResponse) => {
        errorToast(error.message || 'Failed to delete user');
      },
    });
  };

  return {
    updateUserMutation,
    deleteUserMutation,
  };
};

export default userMutation;
