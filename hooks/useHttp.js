import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
  try {
    const response = await fetch(url, config);
    const resData = await response.json();
    console.log("coming from sendhttp request ", resData);
    if (!response.ok) {
      throw new Error(resData.message || "Somthing went wrong !");
    }
  } catch (error) {
    throw error;
  }

  return resData;
}

const useHttp = async (url, config, initialValue) => {
  const [data, setData] = useState(initialValue);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const sendRequest = useCallback(
    async function sendRequest() {
      console.log("calling send request");
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest(url, config);
        setData(resData);
      } catch (error) {
        setError(error.message || "Something went wrong !");
      }

      setIsLoading(false);
    },
    [url, config]
  );

  console.log(data);

  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
