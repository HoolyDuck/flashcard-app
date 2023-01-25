export class ApiError extends Error {
    constructor(message: string, public status: number) {
        super(message);
        this.message = message;
        this.status = status;
    }

    static badRequest(message: string) {
        return new ApiError(message, 400);
    }

    static internal(message: string) {
        return new ApiError(message, 500);
    }
}