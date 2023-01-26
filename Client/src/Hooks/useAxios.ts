
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { useEffect, useState } from 'react';

axios.defaults.baseURL = "http://localhost:4000/api";

export const useAxios = (config: AxiosRequestConfig): [AxiosResponse | undefined, String | undefined, boolean, any] => {

    type customeErrorResponse = {
        message: String
    }


    const [response, setResponse] = useState<AxiosResponse>();
    const [error, setError] = useState<String>();
    const [isLoading, setLoading] = useState(false)
    const [controller, setController] = useState<AbortController>();

    const axiosFetch = async (configuration: AxiosRequestConfig) => {

        try {
            setLoading(true)
            const abortionController = new AbortController()
            setController(abortionController)

            configuration.signal = abortionController.signal;

            const response = await axios.request(configuration)
            setResponse(response)
        }
        catch (error) {
            let customError = error as AxiosError<customeErrorResponse>
            customError?.response ? setError(customError.response?.data.message) : setError(customError.message)
        }
        finally {
            setLoading(false)
        }
    }

    const customAxios = async () => {
        await axiosFetch(config)
    }

    useEffect(() => {

        // useEffect cleanup function
        return () => controller && controller.abort();
    }, [controller])

    return [response, error, isLoading, customAxios];
}