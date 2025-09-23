import { setLoading } from '@store/loadingSlice';
import { store } from '@store/store';

const getApiConfig = () => ({
    baseUrl: import.meta.env.VITE_API_URL,
    apiKey: import.meta.env.VITE_API_KEY,
});

// Base request function without loading state
const baseRequest = <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const { baseUrl, apiKey } = getApiConfig();
  const url = `${baseUrl}${endpoint}`;

  return fetch(url, {
    headers: {
      'x-api-key': apiKey,
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })
    .then((response) => {
      if (!response.ok) {
        const error = new Error('An error occurred while fetching data.') as Error & { code?: number; info?: unknown };
        error.code = response.status;

        return response.json()
          .then((data) => {
            error.info = data;
            throw error;
          })
          .catch(() => {
            error.info = response.statusText;
            throw error;
          });
      }
      return response.json();
    });
};

// Request function for fetching data (with loading state)
const request = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
    store.dispatch(setLoading(true));

    try {
        return await baseRequest<T>(endpoint, options);
    } finally {
        store.dispatch(setLoading(false));
    }
};

const buildQuery = (params: Record<string, unknown>): string => {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            if (typeof value === 'boolean') {
                searchParams.append(key, value ? '1' : '0');
            } else {
                searchParams.append(key, String(value));
            }
        }
    });

    return searchParams.toString();
};

const fetchData = async (endpoint: string, params: Record<string, unknown> = {}) => {
    const queryString = buildQuery(params);
    const fullEndpoint = `${endpoint}${queryString ? `?${queryString}` : ''}`;
    return request(fullEndpoint);
};

// Fetch cats for Catlist page receiving params(has_breeds)
const fetchCats = async (params: Record<string, unknown> = {}) => {
    return fetchData('images/search', params);
};


// Export the API service as an object with all methods
export const apiService = {
    fetchData,
    fetchCats,
};