import { useMutation, useQueryClient } from '@tanstack/react-query';
import { errorToast, successToast } from '../components/common/Alert';
import type { APIResponse } from '../types/onBoarding.interfaces';
import type { Room } from '../types/services.interfaces';
import roomService from '../services/room.services';

const roomMutation = () => {
  const queryClient = useQueryClient();
  const { createRoom, updateRoom, deleteRoom } = roomService();

  const createRoomMutation = () => {
    return useMutation({
      mutationFn: (data: Room) => createRoom(data),
      onSuccess: (response: APIResponse) => {
        if (response.success) {
          successToast(response.message);
          queryClient.invalidateQueries({ queryKey: ['rooms'] });
        } else {
          errorToast(response.message);
        }
      },
      onError: (error: APIResponse) => {
        errorToast(error.message || 'Failed to create room');
      },
    });
  };

  const updateRoomMutation = () => {
    return useMutation({
      mutationFn: ({ id, data }: { id: string; data: Partial<Room> }) =>
        updateRoom(id, data),
      onSuccess: (response: APIResponse) => {
        if (response.success) {
          successToast(response.message);
          queryClient.invalidateQueries({ queryKey: ['rooms'] });
        } else {
          errorToast(response.message);
        }
      },
      onError: (error: APIResponse) => {
        errorToast(error.message || 'Failed to update room');
      },
    });
  };

  const deleteRoomMutation = () => {
    return useMutation({
      mutationFn: (id: string) => deleteRoom(id),
      onSuccess: (response: APIResponse) => {
        if (response.success) {
          successToast(response.message);
          queryClient.invalidateQueries({ queryKey: ['rooms'] });
        } else {
          errorToast(response.message);
        }
      },
      onError: (error: APIResponse) => {
        errorToast(error.message || 'Failed to delete room');
      },
    });
  };

  return {
    createRoomMutation,
    updateRoomMutation,
    deleteRoomMutation,
  };
};

export default roomMutation;
