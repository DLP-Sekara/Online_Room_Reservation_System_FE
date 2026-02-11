import { useMutation } from '@tanstack/react-query';
import { errorToast, successToast } from '../utils/Alert';
import type { APIResponse, LoginTypes } from '../types/onBoarding.interfaces';
import authService from '../services/auth.services';
import { useNavigate } from 'react-router-dom';
import { setLocalStorageData } from '../helpers/StorageHelper';

const authMutation = () => {
  const navigate = useNavigate();
  const { signInService } = authService();

  const signInMutation = () => {
    return useMutation({
      mutationFn: (data: LoginTypes) => signInService(data),
      onSuccess: (response: APIResponse) => {
        if (response.success) {
          setLocalStorageData('token', response.data.token);
          setLocalStorageData('userData', response.data.user);

          successToast(response.message);

          navigate('/dashboard', { replace: true });
        } else {
          errorToast(response.message);
        }
      },

      onError: (error: APIResponse) => {
        errorToast(error.message);
      },
    });
  };

  return { signInMutation };
};

export default authMutation;
