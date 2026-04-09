import { useQuery } from '@tanstack/react-query';
import propertyApi from '../api/propertyApi';
import favouriteApi from '../api/favouriteApi';

export const useProperties = (page = 1, search = "") => {
    const propertiesQuery = useQuery({
        queryKey: ['properties', page, search],
        queryFn: async () => {
            const res = await propertyApi.getAllProperties(page, 6, search);
            return res;
        },
    });

    const favouritesQuery = useQuery({
        queryKey: ['favourites'],
        queryFn: async () => {
            const res = await favouriteApi.getFavourites();
            return res.data;
        },
        retry: false,
    });

    return {
        properties: propertiesQuery.data?.data || [],
        pagination: propertiesQuery.data?.meta || null,
        isPropertiesLoading: propertiesQuery.isLoading,
        favourites: favouritesQuery.data || [],
        isFavouritesLoading: favouritesQuery.isLoading,
        isFavourite: (propertyId) => {
            if (!favouritesQuery.data) return false;
            return favouritesQuery.data.some(fav => fav.id === propertyId);
        }
    };
};
