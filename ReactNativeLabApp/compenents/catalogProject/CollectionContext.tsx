import React, { createContext, useContext, useMemo, useState } from 'react'
import { GearItem } from './types'

type Ctx = {
    list: GearItem[]
    add: (item: GearItem) => void
    remove: (id: number) => void
    has: (id: number) => boolean
    toggle: (item: GearItem) => void
}

const Ctx = createContext<Ctx>({ list: [], add: () => { }, remove: () => { }, has: () => false, toggle: () => { } })

export function CollectionProvider({ children }: { children: React.ReactNode }) {
    const [list, setList] = useState<GearItem[]>([])
    function add(item: GearItem) { setList(p => (p.find(x => x.id === item.id) ? p : [...p, item])) }
    function remove(id: number) { setList(p => p.filter(x => x.id !== id)) }
    function has(id: number) { return list.some(x => x.id === id) }
    function toggle(item: GearItem) { has(item.id) ? remove(item.id) : add(item) }
    const value = useMemo(() => ({ list, add, remove, has, toggle }), [list])
    return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useCollection() { return useContext(Ctx) }
