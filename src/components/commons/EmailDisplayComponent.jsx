import { ContentCopy, MailOutline } from "@mui/icons-material"
import { Box, IconButton, Tooltip } from "@mui/material"

export const EmailDisplayComponent = ({ email }) => {
    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Tooltip title={email}>
                    <IconButton
                        color="primary"
                        onClick={() => window.location.href = `mailto:${email}`}
                    >
                        <MailOutline fontSize="small" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Copy Email">
                    <IconButton
                        color="default"
                        onClick={() => copyToClipboard(email)}
                    >
                        <ContentCopy fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Box>
        </>
    )
}
