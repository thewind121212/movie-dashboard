export const userRegisterTokenError = () => {
    const validState = useState('registerTokenError', () => ({
        message: '',
        error: false,
        email: ''
    }));

    const setValid = (isError: boolean, message: string, email?: string) => {
        validState.value.error = isError;
        validState.value.message = message;
        if (email) {
            validState.value.email = email;
        }
    };

    return {
        validState,
        setValid
    };
}