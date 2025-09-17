import { useEffect, useState } from 'react'
import { GearItem } from './types'

export function useGear(url: string) {
    const [items, setItems] = useState<GearItem[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    function load() {
        setLoading(true)
        setError(null)
        fetch(url)
            .then(r => r.json())
            .then(j => setItems(j.gear || []))
            .catch(() => setError('error'))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        load()
    }, [url])

    return { items, loading, error, reload: load }
}
