export interface ErrorReport {
    getId(): string;
    setId(id: string): void;
    getThreadName(): string;
    setThreadName(threadName: string): void;
    getThrowable(): any;
    setThrowable(throwable: any): void;
    getAppStartTime(): Date;
    setAppStartTime(appStartTime: Date): void;
    getAppErrorTime(): Date;
    setAppErrorTime(appErrorTime: Date): void;
    getDevice(): any;
    setDevice(device: any): void;
}
