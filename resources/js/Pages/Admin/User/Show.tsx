import React from 'react';
import route from 'ziggy-js';

import DashboardAdminLayout from '@/Layouts/MainDashboardAdminTailwind';
import { User } from '@/types';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';
import { Dialog, DialogContent } from '@mui/material';

interface Props {
    user: User;
}

export default function Show(props: Props) {
    let user = props.user;
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <DashboardAdminLayout>
            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                    <div className="py-4 sm:px-20 bg-white border-b border-gray-200">
                        <div className="flex flex-col gap-3 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg p-4">
                            <div className='flex flex-col gap-3 md:flex-row justify-between items-center mb-4 md:mb-0'>
                                <div className='text-2xl text-center'>
                                    User Details
                                </div>
                                <div className="flex flex-row justify-center md:justify-end w-1/2">
                                    <button>
                                        <InertiaLink
                                            className="bg-blue-500 text-white hover:bg-blue-600 py-3 px-5 rounded-lg text-md font-semibold focus:outline-none border-2"
                                            href={route('user.index')}
                                        >
                                            Kembali
                                        </InertiaLink>
                                    </button>
                                    <button>
                                        <InertiaLink
                                            className="bg-yellow-500 text-white hover:bg-yellow-600 py-3 px-5 rounded-lg text-md font-semibold focus:outline-none border-2"
                                            href={route('user.edit', user.id)}
                                        >
                                            Edit
                                        </InertiaLink>
                                    </button>
                                    <button
                                        className="bg-red-500 text-white hover:bg-red-600 py-3 px-5 rounded-lg text-md font-semibold focus:outline-none border-2"
                                        onClick={handleClickOpen}
                                    >
                                        <label htmlFor="my-modal">Delete</label>
                                    </button>
                                </div>
                            </div>
                            <table className='w-full'>
                                <thead>
                                    <tr className='border-b py-3 border-black'>
                                        <th className=''>Properti</th>
                                        <th className=''>Keterangan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className='border-b py-3 border-black'>
                                        <td className='py-3 text-center'>Nama</td>
                                        <td className='py-3 text-center'>{user.name}</td>
                                    </tr>
                                    <tr className='border-b py-3 border-black'>
                                        <td className='py-3 text-center'>Email</td>
                                        <td className='py-3 text-center'>{user.email}</td>
                                    </tr>
                                    <tr className='border-b py-3 border-black'>
                                        <td className='py-3 text-center'>No Telepon</td>
                                        <td className='py-3 text-center'>{user.phone_number}</td>
                                    </tr>
                                    <tr className='border-b py-3 border-black'>
                                        <td className='py-3 text-center'>Status</td>
                                        <td className='py-3 text-center'>{user.roles.map((role) => role.name).join(', ')}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Dialog open={open} onClose={handleClose}
            >
                <DialogContent className="w-full">
                    <div>
                        <h3 className="font-bold text-lg">Confirm to Delete</h3>
                        <p className="py-4">Are you sure to do this.</p>
                        <div className="flex justify-end">
                            <button
                                className="bg-red-500 text-white hover:bg-red-600 py-3 px-5 rounded-lg text-md font-semibold focus:outline-none border-2"
                                onClick={
                                    () => {
                                        Inertia.post(route('user.destroy', user.id), {
                                            _method: 'DELETE',
                                        });
                                    }
                                }
                            >Yes</button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </DashboardAdminLayout>
    )
}
