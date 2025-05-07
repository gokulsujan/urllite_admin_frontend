import { useEffect, useState } from "react"
import { Card, Typography, Avatar, Box } from "@mui/material"
import api from "../utils/axios"
import { AssessmentOutlined } from "@mui/icons-material"

export const UrlComponent = ({ id, shorturl, longUrl }) => {
    const [urlMeta, setUrlMeta] = useState({})

    function completeUrlForFavicon(url, baseUrl) {
        const isFullUrl = /^(http:\/\/|https:\/\/|www\.)/i.test(url);
        if (isFullUrl) {
            return url;
        }

        // Extract origin (protocol + domain) from base URL
        const { origin } = new URL(baseUrl);

        // Attach endpoint to origin
        return origin + '/' + url.replace(/^\/+/, '');
    }


    useEffect(() => {
        const fetchUrlData = async () => {
            try {
                const response = await api.get("/api/v1/url/" + id, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`
                    }
                })
                if (response.status === 200) {
                    setUrlMeta(response.data.result.meta)
                } else {
                    showSnackbar("Failed to fetch URL data", "error", "bottom", "right")
                }
            } catch (error) {
                showSnackbar("Failed to fetch URL data: " + error.message, "error", "bottom", "right")
            }
        }

        fetchUrlData()
    }, [id])

    return (
        <Card sx={{ mb: 2, p: 2 }}>
            <Box display="flex" alignItems="center" mb={1}>
                {urlMeta.favicon && (
                    <Box
                        component="img"
                        src={completeUrlForFavicon(urlMeta.favicon, longUrl)}
                        alt="favicon"
                        sx={{ width: 32, height: 32, flexShrink: 0 }}
                    />
                )}
                <Typography variant="subtitle1">{urlMeta.title || shorturl}</Typography>
            </Box>
            <Typography variant="body2" color="textSecondary" gutterBottom>
                {longUrl}
            </Typography>
            {urlMeta.interactions !== undefined && (
                <Box display="flex" alignItems="center">
                    <AssessmentOutlined sx={{ position: 'relative', color: 'green', top: '2px', marginRight: 1 }} />
                    {urlMeta.interactions} engagements
                </Box>
            )}
        </Card>
    )
}
