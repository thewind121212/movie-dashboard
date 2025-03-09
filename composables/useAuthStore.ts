export const useAuthState = () => {

    const userAuthState = useState<
        {
            isAuthenticated: boolean;
            accessToken: string;
            email: string;
            userId: string;
            avatarUrl: string;
        }
    >('authStore', () => ({
        isAuthenticated: false,
        accessToken: '',
        email: '',
        userId: '',
        avatarUrl: ''
    }));

    const setUserAuth = (isAuthenticated: boolean, accessToken: string, email: string, userId: string) => {
        userAuthState.value.isAuthenticated = isAuthenticated;
        userAuthState.value.accessToken = accessToken;
        userAuthState.value.email = email;
        userAuthState.value.userId = userId;
    };

    const setAvatarUrl = (avatarUrl: string) => {
        userAuthState.value.avatarUrl = avatarUrl;
        
    }

    return {
        userAuthState,
        setUserAuth,
        setAvatarUrl
    };
}