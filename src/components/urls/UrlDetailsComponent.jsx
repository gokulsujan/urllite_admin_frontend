import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSnackbar } from "../commons/SnackbarComponent";
import api from "../utils/axios";
import { UrlComponent } from "./UrlComponent";
import { Box, CircularProgress } from "@mui/material";
import PieChartComponent from "../commons/PieChartComponent";

const locationData = [
    { location: "Delhi", value: 120 },
    { location: "Mumbai", value: 100 },
    { location: "Bangalore", value: 75 },
    { location: "Chennai", value: 60 },
    { location: "Hyderabad", value: 50 },
    { location: "Kolkata", value: 40 },
    { location: "Pune", value: 30 }
];

export const UrlDetailsComponent = () => {
    const { urlID } = useParams();
    const [isLoading, setIsLoading] = useState(true)
    const [urlMeta, setUrlMeta] = useState({})
    const [urlData, setUrlData] = useState({})
    const [cityClicks, setCityClicks] = useState([])
    const [regionClicks, setRegionClicks] = useState([])
    const [countryClicks, setCountryClicks] = useState([])

    const showSnackbar = useSnackbar()
    let urlLogs = []

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
        }

        const fetchUrlLogData = async () => {
            try {
                const response = await api.get("/api/v1/url/" + urlID + "/logs", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`
                    }
                })
                if (response.status === 200) {
                    urlLogs = response.data.result.logs
                } else {
                    showSnackbar("Failed to fetch URL data", "error", "bottom", "right")
                }
            } catch (error) {
                showSnackbar("Failed to fetch URL data: " + error.message, "error", "bottom", "right")
            }

            setIsLoading(false)
            constructChartAnalyticalData()
        }

        const constructChartAnalyticalData = () => {
            const cityMap = {};
            const regionMap = {}
            const countryMap = {}

            urlLogs.forEach(log => {
                const city = log.city;
                const region = log.region
                const country = log.country
                cityMap[city] = (cityMap[city] || 0) + 1;
                regionMap[region] = (regionMap[region] || 0) + 1
                countryMap[country] = (countryMap[country] || 0) + 1
            });

            const cityData = Object.entries(cityMap).map(([city, count]) => ({
                city,
                value: count
            }));

            const regionData = Object.entries(regionMap).map(([region, count]) => ({
                region,
                value: count
            }));

            const countryData = Object.entries(countryMap).map(([country, count]) => ({
                country,
                value: count
            }));

            setCityClicks(cityData)
            setRegionClicks(regionData)
            setCountryClicks(countryData)
        }

        fetchUrlData()
        fetchUrlLogData()
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
        <>
            <UrlComponent
                id={urlID}
                shorturl={urlData.short_url}
                longUrl={urlData.LongUrl}
                status={urlData.status}
                createdAt={urlData.created_at}
            />
            <Box
                display="flex"
                flexWrap="wrap"
                justifyContent="center"
                gap={2}
                mt={2}
            >
                <PieChartComponent
                    data={cityClicks}
                    labelKey="city"
                    valueKey="value"
                    title="Clicks by City"
                />
                <PieChartComponent
                    data={regionClicks}
                    labelKey="region"
                    valueKey="value"
                    title="Clicks by Region"
                />
                <PieChartComponent
                    data={countryClicks}
                    labelKey="country"
                    valueKey="value"
                    title="Clicks by Country"
                />
            </Box>
        </>
    );
}
