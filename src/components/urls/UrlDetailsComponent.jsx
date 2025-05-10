import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSnackbar } from "../commons/SnackbarComponent";
import api from "../utils/axios";
import { UrlComponent } from "./UrlComponent";
import { Box, CircularProgress } from "@mui/material";

export const UrlDetailsComponent = () => {
    const { urlID } = useParams();
    const [isLoading, setIsLoading] = useState(true)
    const [urlMeta, setUrlMeta] = useState({})
    const [urlData, setUrlData] = useState({})
    const showSnackbar = useSnackbar()

    useEffect(() => {
        const fetchUrlData = async () => {
            try {
                const response = await api.get("/api/v1/url/" + urlID, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`
                    }
                })
                if (response.status === 200) {
                    const data = response.data.result
                    setUrlMeta(data.meta)
                    setUrlData(data.url)
                } else {
                    showSnackbar("Failed to fetch URL data", "error", "bottom", "right")
                }
            } catch (error) {
                showSnackbar("Failed to fetch URL data: " + error.message, "error", "bottom", "right")
            }

            setIsLoading(false)
        }

        fetchUrlData()
    }, [urlID])

    if (isLoading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh"
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <UrlComponent
            id={urlID}
            shorturl={urlData.short_url}
            longUrl={urlData.LongUrl}
            status={urlData.status}
            createdAt={urlData.created_at}
        />
    );
}
