import { useEffect, useState } from "react"
export const useQuote = (id) => {
    // url to get quotes
    const url = `https://cipzafrw5h.execute-api.ap-south-1.amazonaws.com/dev/quotes?id=${id}`

    // states
    const [error, setError] = useState(null)
    const [quote, setQuote] = useState('')
    const [isPending, setIsPending] = useState(false)

    useEffect(() => {
        const controller = new AbortController()

        const getQuote = async () => {
            setError(null)
            setIsPending(true)
            try {
                const res = await fetch(url, { signal: controller.signal })
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                const json = await res.json()
                console.log(json);
                setQuote(json)
                setIsPending(false)
            } catch (err) {
                if (err.name === "AbortError") {
                    console.log("the fetch was aborted")
                } else {
                    setIsPending(false)
                    setError('Could not fetch the data')
                }
            }
            return () => {
                controller.abort()
            }
        }
        getQuote()
    }, [url])
    return { error, quote, isPending }
}