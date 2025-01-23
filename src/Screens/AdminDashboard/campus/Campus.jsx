import Layout from '@/Components/Sidebar/Layout'
import React from 'react'
import { CampusTable } from './Components/CampusTable'

export const Campus = () => {
    return (
        <>
            <Layout />
            <div className='min-h-screen'>
                <div className='container mx-auto px-4 py-8'>
                    <CampusTable />
                </div>
            </div>
        </>
    )
}
