export const useAuthState = () => {

    const userAuthState = useState<
        {
            isAuthenticated: boolean;
            accessToken: string;
            email: string;
            userId: string;
        }
    >('authStore', () => ({
        isAuthenticated: false,
        accessToken: '',
        email: '',
        userId: '',
    }));

    const setUserAuth = (isAuthenticated: boolean, accessToken: string, email: string, userId: string) => {
        userAuthState.value.isAuthenticated = isAuthenticated;
        userAuthState.value.accessToken = accessToken;
        userAuthState.value.email = email;
        userAuthState.value.userId = userId;
    };


    return {
        userAuthState,
        setUserAuth
    };
}