import { Call, ContentCopy, WhatsApp } from "@mui/icons-material"
import { IconButton, Tooltip } from "@mui/material"

export const MobileNumberDisplayComponent = ({ mobileNumber }) => {
    return (
        <>
            <Tooltip title={`Send WhatsApp to ${mobileNumber}`}>
                <IconButton
                    color="success"
                    onClick={() => window.open(`https://wa.me/${mobileNumber}`, '_blank')}
                >
                    <WhatsApp fontSize="small" />
                </IconButton>
            </Tooltip>
            <Tooltip title={`Call ${mobileNumber}`}>
                <IconButton
                    color="primary"
                    onClick={() => window.open(`tel:${mobileNumber}`, '_blank')}
                >
                    <Call fontSize="small" />
                </IconButton>
            </Tooltip>
            <Tooltip title="Copy to Clipboard">
                <IconButton
                    color="default"
                    onClick={() => copyToClipboard(mobileNumber)}
                >
                    <ContentCopy fontSize="small" />
                </IconButton>
            </Tooltip>
        </>
    )
}
