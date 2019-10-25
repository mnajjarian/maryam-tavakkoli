
export interface InitState {
    data?: any;
    isLoading: boolean;
    error?: string;
}
type Action = 
| { type: 'request'}
| { type: 'success', results: ''}
| { type: 'failur', error: string }

export const authReducer = (state: InitState, action: Action): InitState => {
    switch (action.type) {
        case 'request':
            return { isLoading: true }
        case 'success':
            return { isLoading: false, data: action.results };
        case 'failur':
            return { isLoading: false, error: action.error };
        default:
            return state;
    }
}