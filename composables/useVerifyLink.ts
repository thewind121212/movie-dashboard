export const useVerifyLinkState = () => {
    const validState = useState('verifyLinkToken', () => ({
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

    const resetDefault = () => {
        validState.value.error = false;
        validState.value.message = '';
        validState.value.email
    }

    return {
        validState,
        setValid,
        resetDefault
    };
}