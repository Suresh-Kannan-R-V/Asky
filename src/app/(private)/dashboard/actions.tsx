export const handleDashboardDropdownAction = (
    action: string,
    isActive: boolean,
    setIsActive: (value: boolean) => void
) => {
    if (action === 'activate') {
        setIsActive(true);
        console.log('Activated');
        return;
    }

    if (action === 'deactivate') {
        setIsActive(false);
        console.log('Deactivated');
        return;
    }

    if (action === 'edit') {
        console.log('Edit clicked');
        return;
    }

    if (action === 'delete') {
        console.log('Delete clicked');
        return;
    }

    console.log('Unknown action:', action);
};
