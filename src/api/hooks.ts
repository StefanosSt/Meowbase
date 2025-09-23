import { useInfiniteQuery } from '@tanstack/react-query';
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
