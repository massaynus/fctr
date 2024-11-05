import axios, { AxiosResponse } from "axios";
import { Cookie } from "puppeteer";

export async function post(url: string, request: any, cookies: Cookie[]): Promise<AxiosResponse> {

    return await axios.post(url, request, {
        headers: {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9",
            "cache-control": "no-cache",
            "content-type": "application/json",
            "pragma": "no-cache",
            "priority": "u=1, i",
            "sec-ch-ua": "\"Chromium\";v=\"130\", \"Microsoft Edge\";v=\"130\", \"Not?A_Brand\";v=\"99\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            "x-deployment-phase": "default",
            "cookie": cookies.map(c => `${c.name}=${c.value}`).join(';')
        },
    })

}