export default async function waitFor(amount: number): Promise<void> {
    await new Promise(res => setTimeout(res, amount))
}