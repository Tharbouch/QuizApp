
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { useEffect, useState } from 'react';

axios.defaults.baseURL = "http://localhost:4000/api/";

export const useAxios = (config: AxiosRequestConfig): [AxiosResponse | undefined, AxiosError | undefined, boolean, any] => {
    const [response, setResponse] = useState<AxiosResponse>();
    const [error, setError] = useState<AxiosError>();
    const [isLoading, setLoading] = useState(false)
    const [controller, setController] = useState<AbortController>();

    const axiosFetch = async (configuration: AxiosRequestConfig) => {

        try {
            setLoading(true)
            const abortionController = new AbortController()
            setController(abortionController)

            configuration.signal = abortionController.signal;

            const response = await axios.request(configuration)

            setResponse(response);
        }
        catch (error) {

            setError(error as AxiosError);
        }
        finally {
            setLoading(false)
        }
    }

    const customAxios = () => {
        axiosFetch(config)
    }

    useEffect(() => {

        // useEffect cleanup function
        return () => controller && controller.abort();
    }, [controller])

    return [response, error, isLoading, customAxios];
}