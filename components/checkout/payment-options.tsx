import React, { useState } from 'react';
import { Package, CreditCard, CheckCircle2, DollarSign, Zap } from 'lucide-react';

// --- 1. Tipos de Datos (Typescript para claridad) ---

// Define la estructura de una opción de pago genérica
interface PaymentOptionItem {
    id: string; // ID único, ej: 'visa', 'paypal', 'cash'
    title: string;
    description: string;
    // La prop icon debe ser el componente real de Lucide
    icon: React.ElementType; 
}

// Propiedades para el componente principal genérico PaymentOptions
interface PaymentOptionsProps {
    options: PaymentOptionItem[]; // Lista de opciones a mostrar
    initialSelectionId?: string; // ID de la opción seleccionada por defecto
    onSelect: (selectedId: string) => void; // Callback al seleccionar una opción
    title?: string; // Título opcional del componente
}


// --- 2. Componente de Opción de Pago Individual (PaymentOption) ---
// Muestra una tarjeta seleccionable que actúa como un "radio button" visual.
const PaymentOption: React.FC<{
    item: PaymentOptionItem;
    selectedId: string;
    onSelect: (id: string) => void;
}> = ({
    item,
    selectedId,
    onSelect,
}) => {
    const isSelected = selectedId === item.id;
    const Icon = item.icon; // El componente de icono

    return (
        
        <label
            // Enlaza la lógica de selección al clic del label
            onClick={() => onSelect(item.id)}
            className={`
                flex items-start gap-4 rounded-xl border p-5 cursor-pointer transition-all duration-300
                shadow-sm
                ${isSelected
                    ? 'border-blue-600 0 dark:border-blue-700 dark:bg-blue-900/50 ring-2 ring-blue-500'
                    : 'border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800 hover:border-blue-400 dark:hover:border-blue-600'
                }
            `}
        >
            {/* 1. Icono Principal */}
            <div className="flex-shrink-0 pt-0.5">
                <Icon className={`h-6 w-6 transition-colors ${isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`} />
            </div>

            {/* 2. Contenido de la Opción */}
            <div className="flex-1 grid gap-1.5">
                <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{item.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
            </div>

            {/* 3. Indicador de Selección (Radio Button Visual) */}
            <div className="flex-shrink-0 pt-0.5">
                <div className={`
                    h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all
                    ${isSelected
                        ? 'border-blue-600 dark:border-blue-400 bg-white dark:bg-gray-800'
                        : 'border-gray-400 dark:border-gray-500'
                    }
                `}>
                    <div className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${isSelected ? 'bg-blue-600 dark:bg-blue-400' : 'bg-transparent'}`} />
                </div>
            </div>
        </label>
    );
};


// --- 3. Componente Principal Genérico (PaymentOptions) ---
// Gestiona el estado de selección de las opciones pasadas por props.

const PaymentOptions: React.FC<PaymentOptionsProps> = ({ 
    options, 
    initialSelectionId, 
    onSelect,
    title = 'Selecciona tu Método de Pago' 
}) => {
    
    // Si no se proporciona una selección inicial, usamos el ID de la primera opción.
    const defaultSelection = initialSelectionId || (options.length > 0 ? options[0].id : '');
    
    // Estado para manejar qué método de pago está seleccionado por el usuario
    const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState<string>(defaultSelection);

    // Función para actualizar el estado y notificar al componente padre (onSelect prop)
    const handlePaymentSelect = (id: string) => {
        setSelectedPaymentMethodId(id);
        onSelect(id);
    };

    if (options.length === 0) {
        return (
            <div className="text-center p-6 bg-red-100 border border-red-400 text-red-700 rounded-xl max-w-3xl mx-auto">
                No hay opciones de pago disponibles. Por favor, proporciona la prop 'options'.
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-6 sm:p-8 bg-white dark:bg-gray-800 ">
            {/* <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-900 dark:text-white">
                {title}
            </h1> */}
            
            {/* Opciones de Pago */}
            <div className="space-y-4">
                {options.map((item) => (
                    <PaymentOption
                        key={item.id}
                        item={item}
                        selectedId={selectedPaymentMethodId}
                        onSelect={handlePaymentSelect}
                    />
                ))}
            </div>
            
            {/* Indicador de selección (Solo para depuración o confirmación visual) */}
            {/* <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Método seleccionado: <span className="font-bold text-blue-600 dark:text-blue-400">{selectedPaymentMethodId.toUpperCase() || 'N/A'}</span>
                </p>
            </div> */}
        </div>
    );
};


// --- 4. Componente de Página de Ejemplo (PaymentPage) ---
// Este componente simula cómo usar PaymentOptions, corrigiendo el error de importación.

// Define las opciones que pasarás al componente (simulación)
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
        description: 'Paga en efectivo al recibir tu pedido. Solo para pedidos locales.',
        icon: DollarSign,
    },
    // {
    //     id: 'mercado_pago',
    //     title: 'Mercado Pago (QR/Link)',
    //     description: 'Escanea el código QR o usa el link de pago para pagar rápidamente.',
    //     icon: Zap,
    // }
];

export default function PaymentPage() {
    // Estado para guardar la selección final del usuario en la página principal
    const [finalSelection, setFinalSelection] = useState(paymentOptionsData[0].id);

    // Función que recibirá el ID seleccionado del componente hijo
    const handlePaymentSelected = (selectedId: string) => {
        setFinalSelection(selectedId);
        console.log("Método de pago final seleccionado en la página:", selectedId);
    };

    return (
        <div className="p-4 flex items-start justify-center bg-white dark:bg-gray-950  pt-8 pb-8">
            
            {/* Componente genérico PaymentOptions (ahora definido en este archivo) */}
            <PaymentOptions
                options={paymentOptionsData}
                initialSelectionId="transfer" // Opcional: Define una selección inicial
                onSelect={handlePaymentSelected}
                title="Paso 3: Elige tu Opción de Pago"
            />

            {/* Simulación del botón de Checkout */}
            {/* <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-800 border-t dark:border-gray-700 shadow-2xl">
                <p className="text-center mb-2 text-sm text-gray-600 dark:text-gray-400">
                    Próximo paso: Revisar el pedido.
                </p>
                <button
                    // Usamos una función de consola en lugar de alert()
                    onClick={() => console.log(`Confirmando pedido con: ${finalSelection}`)}
                    className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 transition duration-300"
                >
                    Finalizar Compra con {finalSelection.toUpperCase()}
                </button>
            </div> */}
        </div>
    );
}