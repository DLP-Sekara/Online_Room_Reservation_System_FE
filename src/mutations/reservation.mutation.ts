import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { errorToast, successToast } from '../components/common/Alert';
import type { APIResponse } from '../types/onBoarding.interfaces';
import type { Reservation, AvailabilityCheck } from '../types/services.interfaces';
import reservationService from '../services/reservation.services';

const reservationMutation = () => {
  const queryClient = useQueryClient();
  const {
    getAllReservations,
    getReservationById,
    createReservation,
    deleteReservation,
    getAvailableRooms,
    checkOutGuest,
  } = reservationService();

  const getAllReservationsQuery = () => {
    return useQuery({
      queryKey: ['reservations'],
      queryFn: () => getAllReservations(),
    });
  };

  const getReservationByIdQuery = (id: string) => {
    return useQuery({
      queryKey: ['reservation', id],
      queryFn: () => getReservationById(id),
      enabled: !!id,
    });
  };

  const createReservationMutation = () => {
    return useMutation({
      mutationFn: (data: Reservation) => createReservation(data),
      onSuccess: (response: APIResponse) => {
        if (response.success) {
          successToast(response.message);
          queryClient.invalidateQueries({ queryKey: ['reservations'] });
        } else {
          errorToast(response.message);
        }
      },
      onError: (error: APIResponse) => {
        errorToast(error.message || 'Failed to create reservation');
      },
    });
  };

  const deleteReservationMutation = () => {
    return useMutation({
      mutationFn: (id: string) => deleteReservation(id),
      onSuccess: (response: APIResponse) => {
        if (response.success) {
          successToast(response.message);
          queryClient.invalidateQueries({ queryKey: ['reservations'] });
        } else {
          errorToast(response.message);
        }
      },
      onError: (error: APIResponse) => {
        errorToast(error.message || 'Failed to delete reservation');
      },
    });
  };

  const getAvailableRoomsMutation = () => {
    return useMutation({
      mutationFn: (data: AvailabilityCheck) => getAvailableRooms(data),
      onSuccess: (response: APIResponse) => {
        if (!response.success) {
          errorToast(response.message);
        }
      },
      onError: (error: APIResponse) => {
        errorToast(error.message || 'Failed to check room availability');
      },
    });
  };

  const checkOutGuestMutation = () => {
    return useMutation({
      mutationFn: (id: string) => checkOutGuest(id),
      onSuccess: (response: APIResponse) => {
        if (response.success) {
          successToast(response.message);
          queryClient.invalidateQueries({ queryKey: ['reservations'] });
        } else {
          errorToast(response.message);
        }
      },
      onError: (error: APIResponse) => {
        errorToast(error.message || 'Failed to complete checkout');
      },
    });
  };

  return {
    getAllReservationsQuery,
    getReservationByIdQuery,
    createReservationMutation,
    deleteReservationMutation,
    getAvailableRoomsMutation,
    checkOutGuestMutation,
  };
};

export default reservationMutation;
