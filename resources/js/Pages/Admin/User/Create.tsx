import React from 'react';
import route from 'ziggy-js';

import AppLayout from '@/Layouts/MainDashboardAdminTailwind';
import { NewUser, Role } from '@/types';
import { InertiaLink, useForm } from '@inertiajs/inertia-react';

import Form from './Form';

interface Props{
    roles : Array<Role>,
}

export default function Create(props: Props) {
    let form = useForm <NewUser>(
        {
            name: '',
            email: '',
            phone_number: '',
            password: '',
            roles: [],
        }
    );

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        form.clearErrors();
        form.post(route('user.store'), {
            onError: (errors) => {
                console.log(errors);
            },
            onSuccess: () => {
                console.log('success');
            }
        });
    }

    return (
        <AppLayout>
            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg p-12">
                    <div className="flex justify-between">
                        <div className="text-2xl">
                            Tambah User
                        </div>
                        <button className="bg-[#FFA500] text-white hover:bg-[#df9100] py-3 px-5 w-24 rounded-lg text-md font-semibold">
                            <InertiaLink href={route('user.index')}>
                                Kembali
                            </InertiaLink>
                        </button>
                    </div>
                    <form className="flex-col gap-5 pt-5" onSubmit={onSubmit}>
                        <Form
                            form={form}
                            roles = {props.roles}
                            className="my-5 mx-2"
                        />
                        <div className="flex justify-end">
                            <button
                                className="bg-[#FFA500] text-white hover:bg-[#df9100] py-3 px-5 rounded-lg text-md font-semibold m-5 mt-10 w-24"
                                type="submit"
                                disabled={form.processing}
                            >
                                Submit
                            </button>   
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    )
}
