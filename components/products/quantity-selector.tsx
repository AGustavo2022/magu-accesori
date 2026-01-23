"use client"

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button'; // Ajusta el path si es necesario
import { Input } from '@/components/ui/input'; // Ajusta el path si es necesario
import { Minus, Plus } from 'lucide-react'; // Iconos de Lucide React

// --- Interfaz de Props ---
interface QuantitySelectorProps {
  initialQuantity?: number;
  maxStock: number; // Stock disponible del producto
  onQuantityChange: (newQuantity: number) => void;
  minQuantity?: number; // Mínimo permitido (usualmente 1)
}

// --- Componente ---
export const QuantitySelector = ({
  initialQuantity = 1,
  maxStock,
  onQuantityChange,
  minQuantity = 1,
}: QuantitySelectorProps) => {
  const [cantidad, setCantidad] = useState(
    Math.max(minQuantity, Math.min(initialQuantity, maxStock)) // Inicializa respetando min/max
  );

  // Función para manejar el cambio y notificar al componente padre
  const handleUpdate = useCallback(
    (newQuantity: number) => {
      // 1. Asegurar que la cantidad esté dentro de los límites
      const validatedQuantity = Math.max(
        minQuantity,
        Math.min(newQuantity, maxStock)
      );

      // 2. Actualizar el estado interno solo si hay cambio
      if (validatedQuantity !== cantidad) {
        setCantidad(validatedQuantity);
        onQuantityChange(validatedQuantity);
      }
    },
    [cantidad, maxStock, minQuantity, onQuantityChange]
  );

  // Lógica para decrementar la cantidad
  const handleDecrement = () => {
    handleUpdate(cantidad - 1);
  };

  // Lógica para incrementar la cantidad
  const handleIncrement = () => {
    handleUpdate(cantidad + 1);
  };

  // Lógica para manejar la entrada manual en el Input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);

    // Permitir que el input esté vacío o sea 0 momentáneamente durante la edición
    if (isNaN(value)) {
      setCantidad(0);
      return;
    }

    // Validar y actualizar
    handleUpdate(value);
  };

  // Lógica para validar el valor final si el usuario hace blur (sale del input)
  const handleInputBlur = () => {
    // Si el valor queda en 0 o NaN después de la edición manual, lo restablecemos al mínimo
    if (cantidad < minQuantity) {
      handleUpdate(minQuantity);
    }
  };

  return (
    <div className="flex items-center space-x-2 w-full max-w-[150px]">
      {/* Botón de Decremento */}
      <Button
        variant="outline"
        size="icon"
        onClick={handleDecrement}
        disabled={cantidad <= minQuantity} // Deshabilitado si alcanza el mínimo
        className="h-8 w-8 shrink-0"
      >
        <Minus className="h-4 w-4" />
        <span className="sr-only">Disminuir cantidad</span>
      </Button>

      {/* Input para la Cantidad */}
      <Input
        type="number"
        value={cantidad}
        onChange={handleInputChange}
        onBlur={handleInputBlur} // Importante para validar el valor final ingresado
        min={minQuantity}
        max={maxStock}
        className="w-12 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />

      {/* Botón de Incremento */}
      <Button
        variant="outline"
        size="icon"
        onClick={handleIncrement}
        disabled={cantidad >= maxStock} // Deshabilitado si alcanza el stock máximo
        className="h-8 w-8 shrink-0"
      >
        <Plus className="h-4 w-4" />
        <span className="sr-only">Aumentar cantidad</span>
      </Button>
    </div>
  );
};