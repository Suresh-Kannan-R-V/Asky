'use client';

import { Button, CustomCard, Dropdown, Header, Input, Progress } from "@components";
import { EllipsisVertical, Pause, Pencil, Play, Plus, Search, Trash2 } from "lucide-react";
import React from "react";
import { handleDashboardDropdownAction } from "./actions";

export const DashBoard = () => {

    const [isActive, setIsActive] = React.useState(true);
    const dropdownItems = (isActive: boolean) => [
        {
            key: isActive ? 'deactivate' : 'activate',
            label: isActive ? 'Deactivate' : 'Activate',
            startContent: isActive ? <Pause size={16} /> : <Play size={16} />,
        },
        { key: 'new', label: 'Edit', startContent: <Pencil size={16} /> },
        { key: 'delete', label: 'Delete', startContent: <Trash2 size={16} />, className: 'text-danger' },
    ];

    return (
        <div className="flex flex-col gap-4">
            <Header headerTitle="DashBoards" />

            <div className="p-1 py-2 grid gap-5">
                <div className="flex justify-between">
                    <div>
                        <Input startContent={<Search />} placeholder="Search..." />
                    </div>
                    <Button startContent={<Plus />}>Create New</Button>
                </div>

                <div className="grid grid-cols-3 gap-4 h-[calc(100vh-160px)]
                    overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 scrollbar-w-5">
                    <CustomCard isDisabled={!isActive} isPressable>
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-semibold text-lg">TITLE</p>
                                    <p className="text-xs text-gray-400">description</p>
                                </div>

                                <Dropdown
                                    className="w-8 z-10"
                                    triggerLabel={<EllipsisVertical className="text-gray-500" />}
                                    items={dropdownItems(isActive)}
                                    onAction={(key) =>
                                        handleDashboardDropdownAction(key, isActive, setIsActive)
                                    }
                                />
                            </div>
                            <div>
                                <div className="p-1 pb-3"><Progress value={80} label="Count" customColor="text-primary-500" valueLabel="80 / 100" /></div>
                                <div className="border-t py-2 px-1 flex justify-between items-center">
                                    <p className="text-xs text-danger">Dead Line : {"EndDate"}</p>
                                    <p className="text-xs text-gray-400">Created At : {"CreateDate"}</p>
                                </div>
                            </div>
                        </div>
                    </CustomCard>
                </div>
            </div>
        </div>
    );
};
