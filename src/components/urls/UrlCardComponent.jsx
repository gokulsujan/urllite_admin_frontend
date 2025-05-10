import { Language } from "@mui/icons-material";
import { Box, Card, IconButton, Link, Skeleton, Tooltip, Typography } from "@mui/material"
import { useEffect } from "react"
import { Link as RouterLink } from "react-router-dom";

export const UrlCardComponent = ({ urlID, urlFavicon, urlTitle, longUrl, shorUrl, isLoading }) => {

    function completeUrlForFavicon(url, baseUrl) {
        if (!url || typeof url !== 'string') {
            return null; // or return a default URL if needed
        }

        const isFullUrl = /^(http:\/\/|https:\/\/|www\.)/i.test(url);
        if (isFullUrl) {
            return url;
        }

        const { origin } = new URL(baseUrl);
        return origin + '/' + url.replace(/^\/+/, '');
    }
    return (
        <>
            <Card sx={{
                p: 2,
                mb: 4,
                boxShadow: 3,
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'flex-start', sm: 'center' },
                justifyContent: 'space-between',
                gap: 2
            }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {isLoading ? (
                        <Skeleton variant="circular" width={72} height={72} sx={{ mr: 3 }} />
                    ) : (
                        <Box
                            component="img"
                            src={completeUrlForFavicon(urlFavicon, longUrl)}
                            alt="favicon"
                            sx={{ width: 50, height: 50, flexShrink: 0, mr: 1 }}
                        />
                    )}
                </Box>
                <Typography variant="subtitle1">
                    <Link component={RouterLink} to={`/url/${urlID}`} underline="hover">
                        {urlTitle || shorUrl}
                    </Link>
                </Typography>
            </Card>
        </>
    )
}
