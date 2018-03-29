export interface ErrorReport {
    /**
       * Gets the UUID for crash report.
       *
       * @return The UUID for crash report.
       */
    getId(): string;

    /**
     * Sets the UUID for crash report.
     *
     * @param id A UUID for crash report to set.
     */
    setId(id: string): void;

    /**
     * Gets the thread name.
     *
     * @return The thread name.
     */
    getThreadName(): string;

    /**
     * Sets the thread name.
     *
     * @param threadName A thread name to set.
     */
    setThreadName(threadName: string): void;

    /**
     * Gets the throwable.
     *
     * @return The throwable.
     */
    getThrowable(): any;

    /**
     * Sets the throwable.
     *
     * @param throwable A throwable to set.
     */
    setThrowable(throwable: any): void;

    /**
     * Gets the application start datetime.
     *
     * @return The application start datetime.
     */
    getAppStartTime(): Date;

    /**
     * Sets the application start datetime.
     *
     * @param appStartTime An application start datetime to set.
     */
    setAppStartTime(appStartTime: Date): void;

    /**
     * Gets the application error datetime.
     *
     * @return The application error datetime.
     */
    getAppErrorTime(): Date;

    /**
     * Sets the application error datetime.
     *
     * @param appErrorTime An application error datetime to set.
     */
    setAppErrorTime(appErrorTime: Date): void;

    /**
     * Gets the device information.
     *
     * @return The device information.
     */
    getDevice(): any;

    /**
     * Sets the device information.
     *
     * @param device A device information to set.
     */
    setDevice(device: any): void;
}