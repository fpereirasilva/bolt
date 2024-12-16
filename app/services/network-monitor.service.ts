import { ConnectivityService } from './connectivity.service';
import { AppManagerService } from './app-manager.service';
import { android as androidApp } from '@nativescript/core/application';

export class NetworkMonitorService {
    private static instance: NetworkMonitorService;
    private checkInterval: number = 5 * 60 * 1000; // 5 minutes
    private timer: any;
    private connectivityService: ConnectivityService;
    private appManager: AppManagerService;

    private constructor() {
        this.connectivityService = ConnectivityService.getInstance();
        this.appManager = AppManagerService.getInstance();
        
        this.initialize();
    }

    public static getInstance(): NetworkMonitorService {
        if (!NetworkMonitorService.instance) {
            NetworkMonitorService.instance = new NetworkMonitorService();
        }
        return NetworkMonitorService.instance;
    }

    private initialize(): void {
        this.startMonitoring();
        this.setupBootReceiver();
        this.setupConnectionCallback();
    }

    private startMonitoring(): void {
        // Initial check
        this.checkNetworkAndManageApp();

        // Set up periodic checking
        this.timer = setInterval(() => {
            this.checkNetworkAndManageApp();
        }, this.checkInterval);
    }

    private setupConnectionCallback(): void {
        this.connectivityService.addConnectionChangeCallback(
            (isGoodConnection: boolean) => {
                if (isGoodConnection && !this.appManager.isRunning()) {
                    this.appManager.launchApp();
                } else if (!isGoodConnection && this.appManager.isRunning()) {
                    this.appManager.closeApp();
                }
            }
        );
    }

    private checkNetworkAndManageApp(): void {
        const isGoodConnection = this.connectivityService.checkConnection();
        
        if (isGoodConnection && !this.appManager.isRunning()) {
            this.appManager.launchApp();
        } else if (!isGoodConnection && this.appManager.isRunning()) {
            this.appManager.closeApp();
        }
    }

    private setupBootReceiver(): void {
        if (androidApp.context) {
            const receiver = new android.content.BroadcastReceiver({
                onReceive: (context: android.content.Context, intent: android.content.Intent) => {
                    if (intent.getAction() === android.content.Intent.ACTION_BOOT_COMPLETED) {
                        this.startMonitoring();
                    }
                }
            });

            const filter = new android.content.IntentFilter(android.content.Intent.ACTION_BOOT_COMPLETED);
            androidApp.context.registerReceiver(receiver, filter);
        }
    }

    public stopMonitoring(): void {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }
}