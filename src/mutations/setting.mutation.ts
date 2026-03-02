import { useMutation, useQueryClient } from '@tanstack/react-query';
import { errorToast, successToast } from '../components/common/Alert';
import type { APIResponse } from '../types/onBoarding.interfaces';
import type { UserAccount } from '../types/services.interfaces';
import settingService from '../services/setting.services';

const settingMutation = () => {
  const queryClient = useQueryClient();
  const { addNewAdmin, changePassword } = settingService();

  const addNewAdminMutation = () => {
    return useMutation({
      mutationFn: (data: UserAccount) => addNewAdmin(data),
      onSuccess: (response: APIResponse) => {
        if (response.success) {
          successToast(response.message);
          queryClient.invalidateQueries({ queryKey: ['users', 'admins'] });
        } else {
          errorToast(response.message);
        }
      },
      onError: (error: APIResponse) => {
        errorToast(error.message || 'Failed to add admin');
      },
    });
  };

  const changePasswordMutation = () => {
    return useMutation({
      mutationFn: (data: any) => changePassword(data),
      onSuccess: (response: APIResponse) => {
        if (response.success) {
          successToast(response.message);
        } else {
          errorToast(response.message);
        }
      },
      onError: (error: APIResponse) => {
        errorToast(error.message || 'Failed to change password');
      },
    });
  };

  return {
    addNewAdminMutation,
    changePasswordMutation,
  };
};

export default settingMutation;
