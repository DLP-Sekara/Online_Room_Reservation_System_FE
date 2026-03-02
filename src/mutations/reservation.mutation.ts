import { useMutation, useQueryClient } from '@tanstack/react-query';
import { errorToast, successToast } from '../components/common/Alert';
import type { APIResponse } from '../types/onBoarding.interfaces';
import type { Reservation, AvailabilityCheck } from '../types/services.interfaces';
import reservationService from '../services/reservation.services';

const reservationMutation = () => {
  const queryClient = useQueryClient();
  const {
    createReservation,
    updateReservation,
    deleteReservation,
    checkRoomAvailability,
    calculateBillAndComplete,
  } = reservationService();

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

  const updateReservationMutation = () => {
    return useMutation({
      mutationFn: ({ id, data }: { id: string; data: Partial<Reservation> }) =>
        updateReservation(id, data),
      onSuccess: (response: APIResponse) => {
        if (response.success) {
          successToast(response.message);
          queryClient.invalidateQueries({ queryKey: ['reservations'] });
        } else {
          errorToast(response.message);
        }
      },
      onError: (error: APIResponse) => {
        errorToast(error.message || 'Failed to update reservation');
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

  const checkRoomAvailabilityMutation = () => {
    return useMutation({
      mutationFn: (data: AvailabilityCheck) => checkRoomAvailability(data),
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

  const calculateBillAndCompleteMutation = () => {
    return useMutation({
      mutationFn: (id: string) => calculateBillAndComplete(id),
      onSuccess: (response: APIResponse) => {
        if (response.success) {
          successToast(response.message);
          queryClient.invalidateQueries({ queryKey: ['reservations'] });
        } else {
          errorToast(response.message);
        }
      },
      onError: (error: APIResponse) => {
        errorToast(error.message || 'Failed to complete billing');
      },
    });
  };

  return {
    createReservationMutation,
    updateReservationMutation,
    deleteReservationMutation,
    checkRoomAvailabilityMutation,
    calculateBillAndCompleteMutation,
  };
};

export default reservationMutation;
