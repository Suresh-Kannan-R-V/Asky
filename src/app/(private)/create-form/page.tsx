/* eslint-disable @typescript-eslint/no-unused-vars */
import { Metadata } from 'next';
import CreateFormUI from './createFormUI';

export const metadata: Metadata = {
    title: 'Create Form | Asky',
    description:
        'Create Form page for Asky',
};

export default function CreateForm() {
    return <CreateFormUI />;
}
