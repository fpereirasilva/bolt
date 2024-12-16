## Android Network Monitor Service

A NativeScript-based service that monitors mobile network connectivity (4G/5G) and manages target app state based on connection quality.

### Features

- Monitors network connectivity every 5 minutes
- Specifically checks for 4G (LTE) or 5G (NR) connections
- Automatically starts monitoring on device boot
- Launches target app when good connection is detected
- Closes target app when connection quality is poor
- Continues monitoring while device is running

### Project Structure

```
app/
├── App_Resources/
│   └── Android/
│       └── src/
│           └── main/
│               └── AndroidManifest.xml
├── services/
│   ├── network-monitor.service.ts
│   ├── connectivity.service.ts
│   └── app-manager.service.ts
└── utils/
    └── network-utils.ts
```

### Installation

1. Clone this repository:
```bash
git clone https://github.com/yourusername/android-network-monitor
cd android-network-monitor
```

2. Install dependencies:
```bash
npm install
```

3. Update the target app package name:
Open `app/services/app-manager.service.ts` and replace `com.example.targetapp` with your target app's package name.

### Required Permissions

The following Android permissions are needed:
- `ACCESS_NETWORK_STATE`
- `INTERNET`
- `RECEIVE_BOOT_COMPLETED`
- `KILL_BACKGROUND_PROCESSES`

These are already configured in the AndroidManifest.xml file.

### Usage

1. Build the project:
```bash
ns build android
```

2. Run on device:
```bash
ns run android
```

### How It Works

1. **Network Monitoring**
   - The service checks network connectivity every 5 minutes
   - It specifically looks for 4G (LTE) or 5G (NR) connections
   - Connection changes are monitored through Android's connectivity events

2. **App Management**
   - When good connection is detected, the target app is launched
   - When connection quality drops, the target app is closed
   - App state is managed using Android's ActivityManager

3. **Boot Receiver**
   - Service automatically starts when device boots
   - Uses Android's BOOT_COMPLETED broadcast receiver

### Implementation Details

The implementation is split into several focused modules:

1. **NetworkMonitorService**
   - Main service coordinator
   - Manages lifecycle and initialization
   - Coordinates between other services

2. **ConnectivityService**
   - Handles network connectivity monitoring
   - Implements connection quality checks
   - Manages network state listeners

3. **AppManagerService**
   - Manages target app lifecycle
   - Handles app launch and termination
   - Tracks app running state

4. **NetworkUtils**
   - Utility functions for network operations
   - Connection type checking
   - Network quality assessment

### Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### License

This project is licensed under the MIT License - see the LICENSE file for details.