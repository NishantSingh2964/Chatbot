'use client';
import { useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import {
    ColDef,
    ModuleRegistry,
    ClientSideRowModelModule,
    ValidationModule,
    PaginationModule,
    TextFilterModule,
    NumberFilterModule,
    DateFilterModule,
    CustomFilterModule,
    themeQuartz,
    colorSchemeLight
} from 'ag-grid-community';

// Register all required modules
ModuleRegistry.registerModules([
    ClientSideRowModelModule,
    ValidationModule,
    PaginationModule,
    TextFilterModule,
    NumberFilterModule,
    DateFilterModule,
    CustomFilterModule
]);

interface DataGridProps {
    data: any[];
    title?: string;
}

// Define the theme using the new Theming API
const myTheme = themeQuartz.withPart(colorSchemeLight).withParams({
    backgroundColor: '#ffffff',
    headerBackgroundColor: '#f1f3f4',
    borderColor: '#e0e0e0',
    headerTextColor: '#202124',
    foregroundColor: '#3c4043',
    rowHoverColor: '#f8f9fa',
    headerHeight: 48,
    rowHeight: 48,
    cellHorizontalPaddingScale: 1.2,
});

export default function DataGrid({ data, title }: DataGridProps) {
    const [rowData] = useState(data);

    // Dynamic column generation
    const colDefs = useMemo<ColDef[]>(() => {
        if (!data || data.length === 0) return [];
        return Object.keys(data[0]).map(key => ({
            field: key,
            flex: 1,
            filter: true,
            sortable: true,
            resizable: true,
            headerName: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()
        }));
    }, [data]);

    if (!data || data.length === 0) return null;

    return (
        <div className="w-full mt-4 mb-4">
            {title && (
                <div className="bg-transparent px-1 py-1 border-b border-[var(--border-color)] mb-2">
                    <h3 className="text-sm font-medium text-[var(--text-secondary)]">{title}</h3>
                </div>
            )}
            <div style={{ height: 400, width: '100%' }}>
                <AgGridReact
                    theme={myTheme}
                    rowData={rowData}
                    columnDefs={colDefs}
                    pagination={true}
                    paginationPageSize={10}
                    defaultColDef={{
                        flex: 1,
                        minWidth: 100,
                        sortable: true,
                        filter: true,
                        resizable: true,
                    }}
                />
            </div>
        </div>
    );
}
