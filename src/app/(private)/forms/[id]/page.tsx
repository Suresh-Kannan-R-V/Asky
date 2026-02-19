import { Metadata } from 'next';
import FormDataUI from '../formData';

export const metadata: Metadata = {
    title: 'Forms | Asky',
    description:
        'Forms page for Asky',
};



export default function Forms() {
    return <FormDataUI />
}
