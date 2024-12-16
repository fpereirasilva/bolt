import { android as androidApp } from '@nativescript/core/application';

export class AppManagerService {
    private static instance: AppManagerService;
    private isAppRunning: boolean = false;
    private targetPackageName: string = 'com.example.targetapp';

    private constructor() {}

    public static getInstance(): AppManagerService {
        if (!AppManagerService.instance) {
            AppManagerService.instance = new AppManagerService();
        }
        return AppManagerService.instance;
    }

    public launchApp(): void {
        try {
            const intent = androidApp.context.getPackageManager()
                .getLaunchIntentForPackage(this.targetPackageName);
            if (intent) {
                intent.addFlags(android.content.Intent.FLAG_ACTIVITY_NEW_TASK);
                androidApp.context.startActivity(intent);
                this.isAppRunning = true;
            }
        } catch (error) {
            console.error('Error launching app:', error);
        }
    }

    public closeApp(): void {
        try {
            const am = androidApp.context.getSystemService(android.content.Context.ACTIVITY_SERVICE);
            am.killBackgroundProcesses(this.targetPackageName);
            this.isAppRunning = false;
        } catch (error) {
            console.error('Error closing app:', error);
        }
    }

    public isRunning(): boolean {
        return this.isAppRunning;
    }

    public setTargetPackageName(packageName: string): void {
        this.targetPackageName = packageName;
    }
}