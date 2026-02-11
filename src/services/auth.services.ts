import type { APIResponse, LoginTypes } from '../types/onBoarding.interfaces';
import { axiosInstance } from '../config/axiosService';

type args = {
  url: string;
  data?: APIInput;
  method?: 'get' | 'post' | 'put' | 'delete';
};

type APIInput = LoginTypes;

const handleRequest = async ({
  url,
  data,
  method = 'post',
}: args): Promise<APIResponse> => {
  try {
    const response = (await (method === 'get'
      ? axiosInstance.get(url, { params: data })
      : axiosInstance[method](url, data))) as any;

    return response as APIResponse;
  } catch (error: any) {
    return error as APIResponse;
  }
};

const authService = () => {
  return {
    signInService: (data: LoginTypes) =>
      handleRequest({ url: 'api/v1/admin/login', data }),
  };
};

export default authService;
