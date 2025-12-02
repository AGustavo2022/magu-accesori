import React from 'react';
import { CheckCircle2, DollarSign } from 'lucide-react';

// --- Types ---
interface PaymentOptionItem {
    id: string;
    title: string;
    description: string;
    icon: React.ElementType;
}

interface PaymentOptionsProps {
    options: PaymentOptionItem[];
    selected: string; // ahora viene del padre
    onSelect: (id: string) => void;
}

/* Opción individual */
const PaymentOption: React.FC<{
    item: PaymentOptionItem;
    selectedId: string;
    onSelect: (id: string) => void;
}> = ({ item, selectedId, onSelect }) => {

    const isSelected = selectedId === item.id;
    const Icon = item.icon;

    return (
        <label
            onClick={() => onSelect(item.id)}
            className={`flex items-start gap-4 rounded-xl border p-5 cursor-pointer transition-all duration-300 shadow-sm
                ${isSelected
                    ? 'border-blue-600 dark:border-blue-700 dark:bg-blue-900/50 ring-2 ring-blue-500'
                    : 'border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800 hover:border-blue-400 dark:hover:border-blue-600'
                }`}
        >
            <div className="flex-shrink-0 pt-0.5">
                <Icon className={`h-6 w-6 transition-colors ${
                    isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
                }`} />
            </div>

            <div className="flex-1 grid gap-1.5">
                <p className="text-lg font-semibold">{item.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
            </div>

            <div className="flex-shrink-0 pt-0.5">
                <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                    isSelected
                        ? 'border-blue-600 dark:border-blue-400'
                        : 'border-gray-400 dark:border-gray-500'
                }`}>
                    <div className={`h-2.5 w-2.5 rounded-full ${
                        isSelected ? 'bg-blue-600 dark:bg-blue-400' : 'bg-transparent'
                    }`} />
                </div>
            </div>
        </label>
    );
};

/* Listado de opciones */
const PaymentOptions: React.FC<PaymentOptionsProps> = ({ options, selected, onSelect }) => {
    return (
        <div className="space-y-4 max-w-3xl mx-auto">
            {options.map((item) => (
                <PaymentOption
                    key={item.id}
                    item={item}
                    selectedId={selected}
                    onSelect={onSelect}
                />
            ))}
        </div>
    );
};

// Opciones disponibles
const paymentOptionsData: PaymentOptionItem[] = [
    {
        id: 'transfer',
        title: 'Transferencia Bancaria (CBU/Alias)',
        description: 'Se te enviarán los datos bancarios para completar la transferencia.',
        icon: CheckCircle2,
    },
    {
        id: 'cash_on_delivery',
        title: 'Pago en Efectivo (Contra Entrega)',
        description: 'Paga en efectivo al recibir tu pedido.',
        icon: DollarSign,
    },
];


// --- Componente FINAL que exportás ---
export default function PaymentPage({
    selected,
    onSelect
}: {
    selected: string;
    onSelect: (id: string) => void;
}) {
    return (
        <div className="p-4 bg-white dark:bg-gray-950">
            <PaymentOptions
                options={paymentOptionsData}
                selected={selected}
                onSelect={onSelect}
            />
        </div>
    );
}
