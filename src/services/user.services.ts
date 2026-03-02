import { axiosInstance } from '../config/axiosService';
import type { APIResponse } from '../types/onBoarding.interfaces';
import type { UserAccount, ServiceRequestArgs } from '../types/services.interfaces';

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

const userService = () => {
  return {
    getAllUsers: () => handleRequest({ url: 'api/v1/users', method: 'get' }),

    updateUser: (id: string, data: Partial<UserAccount>) =>
      handleRequest({ url: `api/v1/users/${id}`, data, method: 'put' }),

    deleteUser: (id: string) =>
      handleRequest({ url: `api/v1/users/${id}`, method: 'delete' }),
  };
};

export default userService;
