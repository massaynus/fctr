import puppeteer, { Cookie } from "puppeteer";
import waitFor from "../utils/waitFor";

export default async function CreateCookies(email: string, password: string): Promise<Cookie[]> {
    const browser = await puppeteer.launch({ headless: false, slowMo: 30, defaultViewport: { width: 1920, height: 1080 } })

    try {
        const page = await browser.newPage()

        await page.goto("https://api.factorialhr.com/en/users/sign_in")

        const emailInput = await page.locator("#user_email")
        const passwordInput = await page.locator("#user_password")
        const submitBtn = await page.locator(`input[name="commit"]`)


        await emailInput.fill(email)
        await passwordInput.fill(password)
        await submitBtn.click()

        const clockInEl = await page.locator(`a[href="/attendance/clock-in"]`)
        await clockInEl.click()

        await page.waitForNetworkIdle()

        await waitFor(10 * 1000)
        const cookies = await page.cookies('https://api.factorialhr.com')
        return cookies
    } catch (e) {
        throw e
    } finally {
        await browser.close()
    }

}