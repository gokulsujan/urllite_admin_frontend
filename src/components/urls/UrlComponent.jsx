import { useEffect, useState } from "react"
import {
    Card, Typography, Box, Stack,
    Skeleton,
    Link
} from "@mui/material"
import {
    AssessmentOutlined,
    CheckCircleOutline,
    CancelOutlined,
    HourglassEmpty,
    CalendarToday
} from "@mui/icons-material"
import api from "../utils/axios"
import { useSnackbar } from "../commons/SnackbarComponent"
import { Link as RouterLink } from "react-router-dom"

export const UrlComponent = ({ id, shorturl, longUrl, status, createdAt }) => {
    const [urlMeta, setUrlMeta] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const showSnackbar = useSnackbar()

    useEffect(() => {
        const fetchUrlData = async () => {
            try {
                const response = await api.get("/api/v1/url/" + id, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`
                    }
                })
                if (response.status === 200) {
                    const data = response.data.result
                    setUrlMeta(data.meta)
                } else {
                    showSnackbar("Failed to fetch URL data", "error", "bottom", "right")
                }
            } catch (error) {
                showSnackbar("Failed to fetch URL data: " + error.message, "error", "bottom", "right")
            }

            setIsLoading(false)
        }

        fetchUrlData()
    }, [id])

    function completeUrlForFavicon(url, baseUrl) {
        if (!url || typeof url !== 'string') {
            return null; // or return a default URL if needed
        }

        const isFullUrl = /^(http:\/\/|https:\/\/|www\.)/i.test(url);
        if (isFullUrl) {
            return url;
        }

        debugger
        const { origin } = new URL(baseUrl);
        return origin + '/' + url.replace(/^\/+/, '');
    }


    const getStatusIcon = (status) => {
        switch (status.toLowerCase()) {
            case "active":
                return <CheckCircleOutline sx={{ color: "green", mr: 1 }} />;
            case "inactive":
                return <CancelOutlined sx={{ color: "red", mr: 1 }} />;
            case "pending":
                return <HourglassEmpty sx={{ color: "orange", mr: 1 }} />;
            default:
                return <HourglassEmpty sx={{ color: "gray", mr: 1 }} />;
        }
    }

    return (
        <Card sx={{ mb: 2, p: 2 }}>
            <Box display="flex" alignItems="center" mb={1}>
                {isLoading ? (<Skeleton variant="circular" width={40} height={40} />) : (
                    <Box
                        component="img"
                        src={completeUrlForFavicon(urlMeta.favicon, longUrl)}
                        alt="favicon"
                        sx={{ width: 32, height: 32, flexShrink: 0, mr: 1 }}
                    />
                )}
                <Typography variant="subtitle1">
                    <Link component={RouterLink} to={`/url/${id}`} underline="hover">
                        {urlMeta.title || shorturl}
                    </Link>
                </Typography>
            </Box>

            <Typography variant="body2" color="textSecondary" gutterBottom>
                {longUrl}
            </Typography>

            {urlMeta.interactions !== undefined && (
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Box display="flex" alignItems="center">
                        <AssessmentOutlined sx={{ position: 'relative', color: 'green', top: '2px', mr: 1 }} />
                        {urlMeta.interactions} engagements
                    </Box>

                    <Box display="flex" alignItems="center">
                        {getStatusIcon(status)}
                        <Typography variant="body2" color="textSecondary" ml={1}>
                            <strong>Status:</strong> {status}
                        </Typography>
                    </Box>

                    <Box display="flex" alignItems="center">
                        <CalendarToday sx={{ color: "gray", mr: 1 }} />
                        <Typography variant="body2" color="textSecondary">
                            <strong>Created at:</strong> {new Date(createdAt).toLocaleString()}
                        </Typography>
                    </Box>
                </Box>
            )}

        </Card>
    )
}
