export const useAuthState = () => {

    const userAuthState = useState<
        {
            isAuthenticated: boolean;
            accessToken: string;
            email: string;
            userId: string;
            name: string,
            birthdate: string | null,
            country: string | null,
            timezone: string | null,
            bio: string | null,
            gender: string | null,
            createdAt: string,
            avatarUrl: string | '',
        }
    >('authStore', () => ({
        isAuthenticated: false,
        accessToken: '',
        email: '',
        userId: '',
        name: '', 
        birthdate: null,
        country: null,
        timezone: null,
        bio: null,
        gender: null,
        createdAt: '',
        avatarUrl: '',
    }));

    const setUserAuth = (isAuthenticated: boolean, accessToken: string, email: string, userId: string, userAvatar?: string) => {
        userAuthState.value.isAuthenticated = isAuthenticated;
        userAuthState.value.accessToken = accessToken;
        userAuthState.value.email = email;
        userAuthState.value.userId = userId;
    };

    const setUserInfo = ({
        name,
        birthdate,
        country,
        timezone,
        bio,
        gender,
        createdAt,
        avatarUrl,
    } : {
        name: string,
        birthdate: string | null,
        country: string | null,
        timezone: string | null,
        bio: string | null,
        gender: string | null,
        createdAt: string ,
        avatarUrl: string | '' ,
    }) => {
        userAuthState.value.name = name;
        userAuthState.value.birthdate = birthdate;
        userAuthState.value.country = country;
        userAuthState.value.timezone = timezone;
        userAuthState.value.bio = bio; 
        userAuthState.value.gender = gender
        userAuthState.value.createdAt = createdAt;
        userAuthState.value.avatarUrl = avatarUrl;
    }


    return {
        userAuthState,
        setUserInfo,
        setUserAuth
    };
}