import { Application } from '@nativescript/core';
import { NetworkMonitorService } from './services/network-monitor.service';

// Start the network monitoring service
NetworkMonitorService.getInstance();

Application.run({ moduleName: 'app-root' });