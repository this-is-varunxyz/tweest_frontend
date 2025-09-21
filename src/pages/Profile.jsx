import React, { useContext, useEffect, useMemo, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'

const Profile = () => {

    const { backendUrl, token, navigate, formatPrice, setToken, setCartItems } = useContext(ShopContext)
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const load = async () => {
            if (!token) { navigate('/login'); return }
            try {
                const res = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } })
                if (res.data.success) {
                    setOrders(res.data.orders || [])
                }
            } catch (e) {
                // no-op
            }
        }
        load()
    }, [token])

    const totals = useMemo(() => {
        const spent = orders.reduce((sum, o) => sum + (o.amount || 0), 0)
        const count = orders.length
        const items = orders.reduce((sum, o) => sum + (Array.isArray(o.items) ? o.items.reduce((s,i)=> s + (i.quantity||0),0) : 0), 0)
        return { spent, count, items }
    }, [orders])

    return (
        <div className='border-t pt-10'>
            <div className='flex items-center justify-between mb-6'>
                <h2 className='text-2xl font-semibold'>My Profile</h2>
                <button
                    onClick={() => { localStorage.removeItem('token'); setToken(''); setCartItems({}); navigate('/login') }}
                    className='text-sm px-4 py-2 border rounded-lg hover:bg-gray-50'
                >
                    Logout
                </button>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8'>
                <div className='p-4 border rounded-lg'>
                    <p className='text-gray-500 text-sm'>Orders</p>
                    <p className='text-xl font-semibold'>{totals.count}</p>
                </div>
                <div className='p-4 border rounded-lg'>
                    <p className='text-gray-500 text-sm'>Items Purchased</p>
                    <p className='text-xl font-semibold'>{totals.items}</p>
                </div>
                <div className='p-4 border rounded-lg'>
                    <p className='text-gray-500 text-sm'>Money Spent</p>
                    <p className='text-xl font-semibold'>{formatPrice(totals.spent)}</p>
                </div>
            </div>

            <div>
                <h3 className='text-lg font-semibold mb-3'>Recent Orders</h3>
                <div className='space-y-3'>
                    {orders.map((o) => (
                        <div key={o._id} className='border p-4 rounded-lg flex flex-col md:flex-row md:items-center md:justify-between gap-3'>
                            <div>
                                <p className='text-sm text-gray-600'>Order #{o._id}</p>
                                <p className='font-medium'>{formatPrice(o.amount)} • {new Date(o.date).toDateString()}</p>
                                <p className='text-sm text-gray-600'>Payment: {o.paymentMethod}</p>
                            </div>
                            <div className='flex items-center gap-2'>
                                <span className={`inline-block w-2 h-2 rounded-full ${o.status === 'Order Placed' ? 'bg-yellow-500' : o.status === 'Out for Delivery' ? 'bg-blue-500' : 'bg-green-500'}`}></span>
                                <span className='text-sm'>{o.status}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Profile


