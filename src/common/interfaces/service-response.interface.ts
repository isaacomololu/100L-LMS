export interface ServiceResponse<T> {
    error?: Error;
    data?: T;
    isError: boolean;
    errMessage?: string;
}
  
//   export interface MicroserviceResponse {
//     status: boolean;
//     data: Record<string, any> | null;
//     error: string | null;
// }
  