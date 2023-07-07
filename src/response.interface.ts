export interface IResponse {
    isSuccess: boolean;

    message: string;

    data?: object;

    error?: object;

    errorCode?: number;
}
