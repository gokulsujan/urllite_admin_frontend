import { Box, Card, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import api from "../utils/axios";
import { UrlComponent } from "../urls/UrlComponent";

const shortUrls = [
    { id: 1, short: "sho.rt/abc", original: "https://example.com/longurl1" },
    { id: 2, short: "sho.rt/xyz", original: "https://example.com/longurl2" }
];

export const UserUrlsComponent = ({ userID }) => {
    const [urls, setUrls] = useState([])
    useEffect(() => {
        const fetchUserUrls = async () => {
            let response = await api.get(`/api/v1/admin/user/${userID}/urls`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            })

            if (response.status == 200) {
                setUrls(response.data.result.urls)
            }
        }
        fetchUserUrls()
    }, [userID])
    return (
        <>
            <Box>
                {urls.map(url => (
                    <UrlComponent key={url.id} id={url.id} shorturl={url.short_url} longUrl={url.LongUrl} status={url.status} createdAt={url.created_at} />
                ))}
            </Box>
        </>
    )
}
