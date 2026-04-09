import { useQuery } from '@tanstack/react-query';
import propertyApi from '../api/propertyApi';

export const usePropertyDetails = (id) => {
    const query = useQuery({
        queryKey: ['property', id],
        queryFn: async () => {
            const res = await propertyApi.getPropertyById(id);
            return res.data;
        },
        enabled: !!id,
    });

    return {
        property: query.data,
        isLoading: query.isLoading,
        error: query.error
    };
};
