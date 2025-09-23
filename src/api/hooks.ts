import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from './apiService';


// Dynamic infinite cats with toggleable parameters
export function useDynamicInfiniteCats(params = {}, limit = 10) {
    return useInfiniteQuery({
        queryKey: ['cats-infinite-dynamic', params, limit],
        queryFn: ({ pageParam = 0 }) => apiService.fetchCats({ ...params, limit, page: pageParam }),
        getNextPageParam: (lastPage, pages) => {
            if (Array.isArray(lastPage) && lastPage.length < limit) return undefined;
            return pages.length;
        },
        staleTime: 1000 * 60 * 5,
        initialPageParam: 0,
    });
}

// Fetch all breeds
export function useBreeds() {
    return useQuery({
        queryKey: ['breeds'],
        queryFn: () => apiService.fetchBreeds(),
        staleTime: 1000 * 60 * 10,
    });
}

// Fetch Favorites
export function useFavorites(params = {}) {
    return useQuery({
        queryKey: ['favorites', params],
        queryFn: () => apiService.fetchFavorites(params),
        staleTime: 1000 * 60 * 2,
    });
}

// Add to Favorites
export function useAddToFavorites() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ imageId, subId }: { imageId: string; subId?: string }) => 
            apiService.addToFavorites(imageId, subId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['favorites'] });
        },
    });
}

// Remove from Favorites
export function useRemoveFromFavorites() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (favoriteId: number) => apiService.removeFromFavorites(favoriteId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['favorites'] });
        },
    });
}

// Fetch single cat by ID
export function useCatById(catId: string, options = {}) {
    return useQuery({
        queryKey: ['cat', catId],
        queryFn: () => apiService.fetchCatById(catId),
        staleTime: 1000 * 60 * 5,
        ...options,
    });
}
