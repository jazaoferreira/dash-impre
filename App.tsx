import React, { useState, useEffect } from 'react';
import { Printer, PrinterStatus } from './types';
import { generatePrinterData } from './constants';
import { PrinterCard } from './components/PrinterCard';

const App: React.FC = () => {
    const [printers, setPrinters] = useState<Printer[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // 1. Gera a lista inicial de impressoras com status "Checking"
        const initialPrinters = generatePrinterData().map((p, index) => ({
            ...p,
            id: `${p.ip}-${index}`,
            status: PrinterStatus.Checking,
            tonerLevel: 0, // Ocultar toner durante a verificação
            pageCount: 0, // Ocultar páginas durante a verificação
        }));
        setPrinters(initialPrinters);
        setIsLoading(false);

        // 2. Gera os dados finais e consistentes
        const finalPrinterData = generatePrinterData();

        // 3. Simula a verificação de cada impressora com um atraso escalonado
        finalPrinterData.forEach((finalPrinter, index) => {
            const delay = 100 + Math.random() * 1500; // Atraso aleatório para realismo
            setTimeout(() => {
                setPrinters(prevPrinters => {
                    const newPrinters = [...prevPrinters];
                    // Atualiza a impressora na posição correta com seus dados finais
                    newPrinters[index] = { ...finalPrinter, id: `${finalPrinter.ip}-${index}`};
                    return newPrinters;
                });
            }, delay);
        });

    }, []);

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            <header className="bg-white shadow-md">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <h1 className="text-3xl font-bold text-center text-gray-900 tracking-tight">
                        Dashboard de Monitoramento de Impressoras
                    </h1>
                </div>
            </header>
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {isLoading ? (
                     <div className="text-center py-20">
                        <p className="text-xl text-gray-500">Carregando dados das impressoras...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {printers.map((printer) => (
                            <PrinterCard key={printer.id} printer={printer} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default App;