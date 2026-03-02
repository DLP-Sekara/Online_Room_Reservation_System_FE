import { axiosInstance } from '../config/axiosService';
import type { APIResponse } from '../types/onBoarding.interfaces';
import type {
  Reservation,
  AvailabilityCheck,
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

const reservationService = () => {
  return {
    getAllReservations: () =>
      handleRequest({ url: 'api/v1/reservations', method: 'get' }),

    getReservationById: (id: string) =>
      handleRequest({ url: `api/v1/reservations/${id}`, method: 'get' }),

    createReservation: (data: Reservation) =>
      handleRequest({ url: 'api/v1/reservations', data, method: 'post' }),

    updateReservation: (id: string, data: Partial<Reservation>) =>
      handleRequest({ url: `api/v1/reservations/${id}`, data, method: 'put' }),

    deleteReservation: (id: string) =>
      handleRequest({ url: `api/v1/reservations/${id}`, method: 'delete' }),

    checkRoomAvailability: (data: AvailabilityCheck) =>
      handleRequest({
        url: 'api/v1/reservations/check-availability',
        data,
        method: 'post',
      }),

    checkGuestAvailability: (phone: string) =>
      handleRequest({
        url: `api/v1/reservations/guest-availability/${phone}`,
        method: 'get',
      }),

    calculateBillAndComplete: (id: string) =>
      handleRequest({
        url: `api/v1/reservations/${id}/complete-billing`,
        method: 'post',
      }),
  };
};

export default reservationService;
