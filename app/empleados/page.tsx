'use client'

import { getSession, useSession } from 'next-auth/react'
import { BookUser, Search, Send, Trash, UserRoundPen } from 'lucide-react';
import { Table } from '@/components/ui/table';
import { Department, Employee, Position } from '@/.generated/client';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';

interface EmployeeesData {
    data: Employee[];
    total: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
}

const EmployeesPage = () => {

    const { data: session } = useSession();
    const { user } = session || {};

    const [isLoading, setIsLoading] = useState(true);
    const [employeesData, setEmployeesData] = useState<EmployeeesData | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

    useEffect(() => {
        if(!modalOpen) fetchEmployees();
    }, [employeesData?.currentPage, employeesData?.pageSize, user?.organizationId, modalOpen]);
    
    // Fetch employees data when component mounts
    const fetchEmployees = async (searchFilter?: string) => {
        let searchQuery = '';
        if(searchFilter) {
            searchQuery = `&searchFilter=${searchFilter}`;
        }
        try {
            const response = await fetch(`/api/employees?organizationId=${user?.organizationId}&pageSize=${employeesData?.pageSize ?? 10}&currentPage=${employeesData?.currentPage ?? 1}${searchQuery}`);
            const data = await response.json();
            setEmployeesData(data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        } finally {
            setIsLoading(false);
        }
    };
    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || (employeesData && newPage > employeesData.totalPages)) return;
        setEmployeesData(prev => prev ? { ...prev, currentPage: newPage } : null);
    };
    const handlePageSizeChange = (newPageSize: number) => {
        setEmployeesData(prev => prev ? { ...prev, pageSize: newPageSize, currentPage: 1 } : null);
    };

    return (
        <>
        <div className="min-h-screen py-8">
            {/* Header */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center space-y-4"
                >
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary
                
                 text-primary-foreground mx-auto">
                    <BookUser className="h-8 w-8" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold">
                    Módulo de <span className="text-primary">Empleados</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Aqui podras importar y gestionar los empleados de tu organización. También podrás ver el estado de las encuestas asignadas a cada uno de ellos y enviarles recordatorios para completar sus encuestas.
                </p>
                </motion.div>
            </div>
            {/* Content */}
            { isLoading && (
                <div className="flex justify-center items-center h-64">
                    <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
                </div>
            )}
            {!isLoading && (
            <div className="container mx-auto px-6 sm:px-6 lg:px-16">
                <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                            <div className='flex h-10 w-10 items-center justify-center rounded-l rounded-bl bg-zinc-900 text-primary-foreground'>
                                <Search className='h-6 w-6' />
                            </div>
                            <input
                                type="text"
                                placeholder="Nombre o número de empleado"
                                className="border h-10 rounded-r rounded-br px-3 py-2 md:w-96 text-ellipsis sm:w-64 text-sm focus:outline-none focus:ring-0 focus:ring-zinc-900 focus:border-zinc-900"
                                onChange={e => {
                                    const value = e.target.value.toLowerCase();
                                    fetchEmployees(value);
                                }}
                            />
                        </div>
                        <button
                            className="bg-primary text-white px-4 py-2 rounded font-semibold text-sm hover:bg-primary/90 transition"
                            onClick={() => {
                                // TODO: Open add employee modal or navigate to add employee page
                                setSelectedEmployee(null);
                                setModalOpen(true);
                            }}
                        >
                            + Agregar empleado
                        </button>
                    
                </div>
                <Table className="w-full overflow-x-auto">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 text-left">Número de Empleado</th>
                            <th className="px-4 py-2 text-left">Nombre del Empleado</th>
                            <th className="px-4 py-2 text-left">Fecha de contratación</th>
                            <th className="px-4 py-2 text-left">Fecha de registro</th>
                            <th className="px-4 py-2 text-left">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employeesData?.data?.map((employee) => (
                            <tr key={employee.id} className="border-b hover:bg-gray-50">
                                <td className="px-4 py-2">{employee.employeeNumber}</td>
                                <td className="px-4 py-2">{employee.firstName} {employee.lastName}</td>
                                <td className="px-4 py-2">{ new Date(employee.hiredAt).toLocaleDateString()}</td>
                                <td className="px-4 py-2">{new Date(employee.createdAt).toLocaleDateString()}</td>
                                <td className="px-4 py-2">
                                    <div className='flex flex-row gap-x-2'>
                                        <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <button onClick={() => {
                                                    setSelectedEmployee({...employee});
                                                    console.log(employee);
                                                    setModalOpen(true);
                                                }} className='flex justify-center items-center p-2 h-8 w-8 rounded bg-slate-200 hover:bg-primary text-black hover:text-white transition'>
                                                    <UserRoundPen className='h-6 w-6' />
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent side="top">Editar empleado</TooltipContent>
                                        </Tooltip>
                                        </TooltipProvider>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <button onClick={async () => {
                                                        // TODO: Implement survey reminder functionality
                                                        toast.promise(fetch(`/api/employees/survey-reminder`, {
                                                                method: 'POST',
                                                                headers: { 'Content-Type': 'application/json' },
                                                                body: JSON.stringify({ employeeId: employee.id, organizationId: user?.organizationId }),
                                                            }), {
                                                                loading: 'Enviando recordatorio...',
                                                                success: 'Recordatorio enviado con éxito.',
                                                                error: 'Error al enviar el recordatorio.'
                                                            });
                                                    }} className='flex justify-center items-center p-2 h-8 w-8 rounded bg-slate-200 hover:bg-sky-500 text-black hover:text-white transition'>
                                                        <Send className='h-6 w-6' />
                                                    </button>
                                                </TooltipTrigger>
                                                <TooltipContent side="top">Enviar recordatorio</TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <button onClick={async () => {
                                                        if(!confirm(`¿Estás seguro de que deseas eliminar al empleado ${employee.firstName} ${employee.lastName}? Esta acción no se puede deshacer.`)) return;
                                                        toast.promise(fetch(`/api/employees/${employee.id}`, {
                                                                method: 'DELETE',
                                                            }), {
                                                                loading: 'Eliminando empleado...',
                                                                success: () => {
                                                                    fetchEmployees();
                                                                    return 'Empleado eliminado con éxito.';
                                                                },
                                                                error: 'Error al eliminar el empleado.'
                                                            });
                                                    }} className='flex justify-center items-center p-2 h-8 w-8 rounded bg-slate-200 hover:bg-red-600 text-black hover:text-white transition'>
                                                        <Trash className='h-6 w-6' />
                                                    </button>
                                                </TooltipTrigger>
                                                <TooltipContent side="top">Eliminar empleado</TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {employeesData?.data?.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-4 py-2 h-96 text-center">No se encontraron empleados</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                {/** Pagination controls */}
                <div className="flex justify-center items-center mt-4">
                {employeesData && (
                    <div className="flex items-center space-x-2 mr-12">
                        <button
                            className="px-2 py-1 rounded border text-sm"
                            disabled={employeesData.currentPage <= 5}
                            onClick={() => handlePageChange(Math.max(1, employeesData.currentPage - 5))}
                        >
                            &lt;
                        </button>
                        {employeesData.currentPage > 5 && (
                            <>
                            <button
                                className="px-3 py-1 rounded border text-sm"
                                onClick={() => handlePageChange(1)}
                            >1</button>
                            <span className="px-2 py-1 text-sm">...</span>
                            </>
                        )}
                        {Array.from(
                            { length: Math.min(5, employeesData.totalPages - Math.floor((employeesData.currentPage - 1) / 5) * 5) },
                            (_, i) => {
                                const page = Math.floor((employeesData.currentPage - 1) / 5) * 5 + i + 1;
                                return (
                                    <button
                                        key={page}
                                        className={`px-3 py-1 rounded border text-sm ${page === employeesData.currentPage ? 'bg-primary text-white' : ''}`}
                                        onClick={() => handlePageChange(page)}
                                    >
                                        {page}
                                    </button>
                                );
                            }
                        )}
                        {employeesData.currentPage + 5 <= employeesData.totalPages && (
                            <>
                            <span className="px-2 py-1 text-sm">...</span>
                            <button
                                className="px-3 py-1 rounded border text-sm"
                                onClick={() => handlePageChange(employeesData.totalPages)}
                            >{employeesData.totalPages}</button>
                            </>
                        )}
                        <button
                            className="px-2 py-1 rounded border text-sm"
                            disabled={employeesData.currentPage + 5 > employeesData.totalPages}
                            onClick={() => handlePageChange(Math.min(employeesData.totalPages, employeesData.currentPage + 5))}
                        >
                            &gt;
                        </button>
                    </div>
                )}
                    <div className="flex items-center space-x-2">
                        <label htmlFor="pageSize" className="text-sm">Empleados por página:</label>
                        <select
                            id="pageSize"
                            className="border rounded px-2 py-1 text-sm"
                            value={employeesData?.pageSize || 10}
                            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                        </select>
                    </div>
                </div>
            </div>
            )}
        </div>
        <EmployeeInfoModal
            employee={selectedEmployee}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            onSave={(updated) => {
                console.log('Saved employee:', updated);
            }}
        />
        </>
  );
};

interface EmployeeInfoModalProps {
    employee: Employee | null;
    modalOpen: boolean;
    setModalOpen: Dispatch<SetStateAction<boolean>>;
    onSave?: (updated: Employee) => void;
}

const editableFields: (keyof Employee)[] = [
    'employeeNumber',
    'firstName',
    'middleName',
    'lastName',
    'email',
    'hiredAt',
    'address',
    'departmentId',
    'positionId',
    // Add other editable fields here, but exclude IDs and relation objects
];

export const EmployeeInfoModal = ({
    employee,
    modalOpen,
    setModalOpen,
    onSave,
}: EmployeeInfoModalProps) => {

    const { data: session } = useSession();
    const { user } = session || {};

    const [form, setForm] = useState<Partial<Employee>>({});
    const [departments, setDepartments] = useState<Department[]>([]);
    const [positions, setPositions] = useState<Position[]>([]);

    useEffect(() => {
        if (employee) setForm(employee);
    }, [employee]);

    useEffect(() => {
        fetchDepartments();
        fetchPositions();
    }, []);

    const fetchDepartments = async () => {
        try {
            const response = await fetch('/api/departments');
            const data = await response.json();
        setDepartments(data);
        } catch (error) {
            console.error('Error fetching departments:', error);
        }
    };

    const fetchPositions = async () => {
        try {
            const response = await fetch('/api/positions');
            const data = await response.json();
            setPositions(data);
        } catch (error) {
            console.error('Error fetching positions:', error);
        }
    };

    const handleChange = (field: keyof Employee, value: any) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleClose = () => setModalOpen(false);

    const handleSave = async () => {
        // Remove keys with null or object values from `form` before sending.
        // We create a shallow cleaned copy then mutate the original `form` object
        // so the existing fetch(JSON.stringify(form)) calls send the cleaned payload.
        if (form && typeof form === 'object') {
            const cleaned: Record<string, any> = {};
            Object.entries(form).forEach(([k, v]) => {
                if (v === null) return;
                if (typeof v === 'object') return;
                cleaned[k] = v;
            });
            // mutate the state object in-place so later JSON.stringify(form) uses the cleaned payload
            Object.keys(form).forEach(k => delete (form as any)[k]);
            Object.assign(form as any, cleaned);
        }
        if (employee?.id) {
           const res = await fetch(`/api/employees/${employee.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({...form, updatedAt: new Date()}),
            });
            if (res.status === 200) {
                const updated = await res.json();
                onSave && onSave(updated);
                toast.success('Empleado actualizado con éxito.');
                handleClose();
            } else {
                console.error('Failed to save employee:', await res.text());
                toast.error('Error al guardar el empleado. Por favor, verifica los datos e intenta de nuevo.');
            }
        } else {
            const res = await fetch(`/api/employees`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({...form, organizationId: user?.organizationId, createdBy: user?.name}),
            });
            if (res.status === 201) {
                const created = await res.json();
                onSave && onSave(created);
                toast.success('Empleado creado con éxito.');
                handleClose();
            } else {
                console.error('Failed to create employee:', await res.text());
                toast.error('Error al crear el empleado. Por favor, verifica los datos e intenta de nuevo.');
            }
        }
    };

    return (
        <AnimatePresence>
            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogContent>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 40 }}
                    transition={{ duration: 0.25 }}
                    className="bg-white rounded-lg w-full max-w-lg mx-auto"
                >
                    <h2 className="text-xl font-semibold mb-4">Editar Empleado</h2>
                    <form
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        onSubmit={e => {
                            e.preventDefault();
                            handleSave();
                        }}
                    >
                        {editableFields.map((field) => (
                            <div key={field} className={`flex flex-col ${field === 'address' ? 'col-span-2' : ''}`}>
                                <label className="text-sm font-medium mb-1 capitalize">
                                    {field === 'employeeNumber'
                                        ? 'Número de Empleado'
                                        : field === 'firstName'
                                        ? 'Primer Nombre'
                                        : field === 'middleName'
                                        ? 'Segundo Nombre'
                                        : field === 'lastName'
                                        ? 'Apellido'
                                        : field === 'address'
                                        ? 'Dirección'
                                        : field === 'email'
                                        ? 'Correo'
                                        : field === 'departmentId'
                                        ? 'Departamento'
                                        : field === 'positionId'
                                        ? 'Posición'
                                        : field === 'hiredAt'
                                        ? 'Fecha de contratación'
                                        : field === 'createdAt'
                                        ? 'Fecha de registro'
                                        : field}
                                </label>
                                {
                                field === 'positionId' ? (
                                    <select
                                        className="border rounded px-2 h-9 py-1 text-ellipsis text-sm"
                                        value={form[field] ?? ''}
                                        onChange={e => handleChange(field, e.target.value)}
                                    >
                                        <option value="">Seleccionar posición</option>
                                        {positions.map(position => (
                                            <option key={position.id} value={position.id}>
                                                {position.title}
                                            </option>
                                        ))}
                                    </select>
                                ) : field === 'departmentId'  ? (
                                    <select
                                        className="border rounded px-2 h-9 py-1 text-ellipsis text-sm"
                                        value={form[field] ?? ''}
                                        onChange={e => handleChange(field, e.target.value)}
                                    >
                                        <option value="">Seleccionar departamento</option>
                                        {departments.map(department => (
                                            <option key={department.id} value={department.id}>
                                                {department.name}
                                            </option>
                                        ))}
                                    </select>
                                ) : field === 'hiredAt' || field === 'createdAt' ? (
                                    <input
                                        type="date"
                                        className="border rounded px-2 py-1"
                                        value={
                                            form[field]
                                                ? new Date(form[field] as any)
                                                        .toISOString()
                                                        .substring(0, 10)
                                                : ''
                                        }
                                        onChange={e =>
                                            handleChange(
                                                field,
                                                new Date(e.target.value).toISOString()
                                            )
                                        }
                                    />
                                ) : (
                                    <input
                                        type={field === 'email' ? 'email' : 'text'}
                                        className="border rounded px-2 py-1"
                                        value={
                                            form[field] instanceof Date
                                                ? (form[field] as Date).toISOString()
                                                : form[field] ?? ''
                                        }
                                        onChange={e => handleChange(field, e.target.value)}
                                    />
                                )}
                            </div>
                        ))}
                        <div className="md:col-span-2 flex justify-end space-x-2 mt-4">
                            <button
                                type="button"
                                className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                                onClick={handleClose}
                            >
                                Cerrar
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 rounded bg-primary text-white hover:bg-primary/90"
                            >
                                Guardar
                            </button>
                        </div>
                    </form>
                </motion.div>
                </DialogContent>
            </Dialog>
        </AnimatePresence>
    );
};

export default EmployeesPage;