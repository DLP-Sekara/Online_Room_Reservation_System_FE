import { axiosInstance } from '../config/axiosService';
import type { APIResponse } from '../types/onBoarding.interfaces';
import type { Room, ServiceRequestArgs } from '../types/services.interfaces';

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

const roomService = () => {
  return {
    getAllRooms: () => handleRequest({ url: 'api/v1/rooms', method: 'get' }),

    getRoomById: (id: string) =>
      handleRequest({ url: `api/v1/rooms/${id}`, method: 'get' }),

    createRoom: (data: Room) =>
      handleRequest({ url: 'api/v1/rooms', data, method: 'post' }),

    updateRoom: (id: string, data: Partial<Room>) =>
      handleRequest({ url: `api/v1/rooms/${id}`, data, method: 'put' }),

    deleteRoom: (id: string) =>
      handleRequest({ url: `api/v1/rooms/${id}`, method: 'delete' }),
  };
};

export default roomService;
