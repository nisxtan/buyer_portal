import { useMutation, useQueryClient } from '@tanstack/react-query';
import favouriteApi from '../api/favouriteApi';
import toast from 'react-hot-toast';

export const useToggleFavourite = () => {
    const queryClient = useQueryClient();

    const addMutation = useMutation({
        mutationFn: favouriteApi.addFavourite,
        onSuccess: () => {
            toast.success('Added to favourites');
            queryClient.invalidateQueries({ queryKey: ['favourites'] });
        },
        onError: (err) => {
            const message = err.response?.data?.message || err.message || 'Failed to add favourite';
            toast.error(message);
        }
    });

    const removeMutation = useMutation({
        mutationFn: favouriteApi.removeFavourite,
        onSuccess: () => {
            toast.success('Removed from favourites');
            queryClient.invalidateQueries({ queryKey: ['favourites'] });
        },
        onError: (err) => {
            const message = err.response?.data?.message || err.message || 'Failed to remove favourite';
            toast.error(message);
        }
    });

    return { addMutation, removeMutation };
};
