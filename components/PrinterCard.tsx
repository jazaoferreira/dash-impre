import React from 'react';
import { Printer, PrinterStatus } from '../types';

interface PrinterCardProps {
  printer: Printer;
}

const statusStyles = {
  [PrinterStatus.Online]: {
    borderColor: 'border-green-500',
    bgColor: 'bg-green-500',
    text: 'Online',
  },
  [PrinterStatus.Offline]: {
    borderColor: 'border-red-500',
    bgColor: 'bg-red-500',
    text: 'Offline',
  },
  [PrinterStatus.Checking]: {
    borderColor: 'border-gray-300',
    bgColor: 'bg-gray-400 animate-pulse',
    text: 'Verificando...',
  },
};

const TonerBar: React.FC<{ level: number, isChecking: boolean }> = ({ level, isChecking }) => {
    let barColor = 'bg-blue-500';
    if (level <= 20) barColor = 'bg-yellow-500';
    if (level <= 10) barColor = 'bg-red-500';

    if (isChecking) {
        return (
            <div className="w-full bg-gray-200 rounded-full h-5">
                 <div className="h-full rounded-full bg-gray-300 animate-pulse" style={{ width: '100%' }}></div>
            </div>
        );
    }

    return (
        <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden">
            <div
                className={`h-full rounded-full ${barColor} flex items-center justify-center transition-all duration-500 ease-in-out`}
                style={{ width: `${level}%` }}
            >
                <span className="text-xs font-bold text-white shadow-sm">{level}%</span>
            </div>
        </div>
    );
};


export const PrinterCard: React.FC<PrinterCardProps> = ({ printer }) => {
    const { borderColor, bgColor, text } = statusStyles[printer.status];
    const isChecking = printer.status === PrinterStatus.Checking;
    
    const handleOpenInterface = (e: React.MouseEvent) => {
        e.stopPropagation();
        window.open(`http://${printer.ip}`, '_blank', 'noopener,noreferrer');
    };

    const handleMaintenanceClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        alert(`Funções de manutenção para: ${printer.model} (${printer.ip})`);
    };


    return (
        <div 
            className={`bg-white rounded-lg shadow-lg border-l-4 ${borderColor} p-4 flex flex-col justify-between transition-all duration-300 ${isChecking ? 'cursor-wait' : 'hover:shadow-xl hover:-translate-y-1'}`}
        >
            <div className="flex-grow">
                <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-gray-800 text-lg leading-tight pr-2">{printer.model}</h3>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full text-white ${bgColor}`}>
                        {text}
                    </span>
                </div>
                <div className="text-sm text-gray-600 space-y-1.5">
                    <p><strong className="font-medium text-gray-700">IP:</strong> {printer.ip}</p>
                    <p><strong className="font-medium text-gray-700">Departamento:</strong> {printer.department}</p>
                    <p><strong className="font-medium text-gray-700">Local:</strong> {printer.location}</p>
                    {!isChecking && (
                        <>
                            <p><strong className="font-medium text-gray-700">Serial:</strong> {printer.serial}</p>
                            <p><strong className="font-medium text-gray-700">Páginas:</strong> {printer.pageCount.toLocaleString('pt-BR')}</p>
                        </>
                    )}
                </div>
                <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-1">Nível de Toner:</p>
                    <TonerBar level={printer.tonerLevel} isChecking={isChecking} />
                </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-200 flex items-center justify-end space-x-2">
                <button 
                    onClick={handleMaintenanceClick}
                    className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Funções de Manutenção"
                    title="Funções de Manutenção"
                    disabled={isChecking}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.972.247 2.12-.698 2.658-1.56.88-1.56 3.13 0 4.01.945.538 1.248 1.687.698 2.658-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.286.948c.38 1.56 2.6 1.56 2.98 0a1.532 1.532 0 012.286-.948c1.372.836 2.942-.734 2.106-2.106a1.532 1.532 0 01.698-2.658c1.56-.88 1.56-3.13 0-4.01a1.532 1.532 0 01-.698-2.658c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.286-.948zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                </button>
                <button 
                    onClick={handleOpenInterface}
                    className="text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white py-1.5 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
                    disabled={isChecking}
                >
                    Acessar
                </button>
            </div>
        </div>
    );
};