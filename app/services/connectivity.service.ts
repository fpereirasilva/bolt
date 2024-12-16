import { Connectivity, ConnectivityEventData, connectionType } from '@nativescript/core';
import { android as androidApp } from '@nativescript/core/application';
import { NetworkUtils } from '../utils/network-utils';

export class ConnectivityService {
    private static instance: ConnectivityService;
    private connectionChangeCallbacks: ((isGoodConnection: boolean) => void)[] = [];

    private constructor() {
        this.setupConnectionListener();
    }

    public static getInstance(): ConnectivityService {
        if (!ConnectivityService.instance) {
            ConnectivityService.instance = new ConnectivityService();
        }
        return ConnectivityService.instance;
    }

    public addConnectionChangeCallback(callback: (isGoodConnection: boolean) => void): void {
        this.connectionChangeCallbacks.push(callback);
    }

    public checkConnection(): boolean {
        const connectionType = Connectivity.getConnectionType();
        return NetworkUtils.isConnectionGood(connectionType);
    }

    private setupConnectionListener(): void {
        Connectivity.addEventListener(
            ConnectivityEventData.connectionTypeChanged,
            () => this.onConnectionChanged()
        );
    }

    private onConnectionChanged(): void {
        const isGoodConnection = this.checkConnection();
        this.connectionChangeCallbacks.forEach(callback => callback(isGoodConnection));
    }
}