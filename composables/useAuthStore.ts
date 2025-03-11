export const useAuthState = () => {

    const userAuthState = useState<
        {
            isAuthenticated: boolean;
            accessToken: string;
            email: string;
            userId: string;
            avatarUrl: string;
            refeshTrigger: boolean;
            isTwoFaEnabled: 'fetching' | 'enabled' | 'disabled';
        }
    >('authStore', () => ({
        isAuthenticated: false,
        accessToken: '',
        email: '',
        userId: '',
        avatarUrl: '',
        isTwoFaEnabled: 'fetching',
        refeshTrigger: false,
    }));

    const setUserAuth = (isAuthenticated: boolean, accessToken: string, email: string, userId: string) => {
        userAuthState.value.isAuthenticated = isAuthenticated;
        userAuthState.value.accessToken = accessToken;
        userAuthState.value.email = email;
        userAuthState.value.userId = userId;
    };

    const sendRefeshTrigger = () => {
        if (userAuthState.value.refeshTrigger) return
        userAuthState.value.refeshTrigger = true
        setTimeout(() => {
            userAuthState.value.refeshTrigger = false
        },2000)
    }


    return {
        userAuthState,
        setUserAuth,
        sendRefeshTrigger,
    };
}