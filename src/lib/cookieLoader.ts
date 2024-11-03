import puppeteer, { Cookie } from "puppeteer";

export default async function CreateCookies(email: string, password: string): Promise<Cookie[]> {
    const browser = await puppeteer.launch()

    try {
        const page = await browser.newPage()

        await page.goto("https://api.factorialhr.com/en/users/sign_in")

        const emailInput = await page.locator("#user_email")
        const passwordInput = await page.locator("#user_password")
        const submitBtn = await page.locator(`input[name="commit"]`)


        await emailInput.fill(email)
        await passwordInput.fill(password)
        await submitBtn.click()

        await page.waitForSelector(`[title="Dashboard"]`)

        const cookies = await page.cookies()
        return cookies
    } catch (e) {
        throw e
    } finally {
        await browser.close()
    }

}