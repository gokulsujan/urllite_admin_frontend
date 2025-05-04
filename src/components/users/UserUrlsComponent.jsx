import { Box, Card, Typography } from "@mui/material"

const shortUrls = [
    { id: 1, short: "sho.rt/abc", original: "https://example.com/longurl1" },
    { id: 2, short: "sho.rt/xyz", original: "https://example.com/longurl2" }
];

export const UserUrlsComponent = () => {
    return (
        <>
            <Box>
                {shortUrls.map(url => (
                    <Card key={url.id} sx={{ mb: 2, p: 2 }}>
                        <Typography variant="subtitle1">{url.short}</Typography>
                        <Typography variant="body2" color="textSecondary">{url.original}</Typography>
                    </Card>
                ))}
            </Box>
        </>
    )
}
