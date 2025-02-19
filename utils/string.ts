export const  getErrorMessage = (error: any): string => {
    return  error.message.split(':')[1].replace(error.status,'').trimStart() as string
}