export enum PrinterStatus {
  Online = 'online',
  Offline = 'offline',
  Checking = 'checking',
}

export interface Printer {
  id: string;
  model: string;
  ip: string;
  department: string;
  location: string;
  status: PrinterStatus;
  pageCount: number;
  tonerLevel: number;
  serial: string;
  statusMessage?: string;
}