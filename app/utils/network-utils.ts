import { connectionType } from '@nativescript/core';
import { android as androidApp } from '@nativescript/core/application';

export class NetworkUtils {
    public static isConnectionGood(type: connectionType): boolean {
        if (type === connectionType.mobile) {
            const telephonyManager = androidApp.context
                .getSystemService(android.content.Context.TELEPHONY_SERVICE);
            
            if (telephonyManager) {
                const networkType = telephonyManager.getDataNetworkType();
                return NetworkUtils.isHighSpeedNetwork(networkType);
            }
        }
        return false;
    }

    private static isHighSpeedNetwork(networkType: number): boolean {
        return (
            networkType === android.telephony.TelephonyManager.NETWORK_TYPE_LTE ||
            networkType === android.telephony.TelephonyManager.NETWORK_TYPE_NR
        );
    }
}