import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Camera as CameraIcon, X } from 'lucide-react-native';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, SHADOWS, BORDER_RADIUS } from '@/constants/theme';
import ScreenLayout from '@/components/layouts/ScreenLayout';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

export default function ScanScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  
  if (!permission) {
    // Camera permissions are still loading
    return (
      <ScreenLayout>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading camera...</Text>
        </View>
      </ScreenLayout>
    );
  }

  if (!permission.granted) {
    // Camera permissions not granted yet
    return (
      <ScreenLayout>
        <View style={styles.permissionContainer}>
          <CameraIcon size={64} color={COLORS.textSecondary} />
          <Text style={styles.permissionTitle}>Camera access needed</Text>
          <Text style={styles.permissionText}>
            We need camera access to scan product barcodes for your grocery lists
          </Text>
          <TouchableOpacity 
            style={styles.permissionButton} 
            onPress={requestPermission}
          >
            <Text style={styles.permissionButtonText}>Grant permission</Text>
          </TouchableOpacity>
        </View>
      </ScreenLayout>
    );
  }

  // Handle platform-specific implementation
  if (Platform.OS === 'web') {
    return (
      <ScreenLayout>
        <View style={styles.webContainer}>
          <Text style={styles.webTitle}>Barcode Scanner</Text>
          <Text style={styles.webText}>
            Barcode scanning is currently optimized for mobile devices.
          </Text>
          <Text style={styles.webSubText}>
            Please use the mobile app for the best scanning experience.
          </Text>
        </View>
      </ScreenLayout>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView 
        style={styles.camera} 
        facing={facing}
        barcodeScannerSettings={{
          barcodeTypes: ["ean13", "ean8", "upc_a", "upc_e"],
        }}
        onBarcodeScanned={scanned ? undefined : (result) => {
          setScanned(true);
          console.log("Barcode scanned:", result.data);
          // Here we would handle the barcode data
          setTimeout(() => setScanned(false), 2000);
        }}
      >
        <View style={styles.overlay}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.closeButton} onPress={() => console.log('Close scanner')}>
              <X size={24} color={COLORS.background} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.scannerFrame} />
          
          <View style={styles.footer}>
            <Text style={styles.scannerText}>
              Position barcode within the frame to scan
            </Text>
            
            {scanned && (
              <TouchableOpacity 
                style={styles.scanAgainButton}
                onPress={() => setScanned(false)}
              >
                <Text style={styles.scanAgainButtonText}>Tap to Scan Again</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'space-between',
  },
  header: {
    padding: SPACING.md,
    alignItems: 'flex-end',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scannerFrame: {
    alignSelf: 'center',
    width: 250,
    height: 150,
    borderWidth: 2,
    borderColor: COLORS.primary,
    backgroundColor: 'transparent',
    borderRadius: BORDER_RADIUS.md,
  },
  footer: {
    padding: SPACING.xl,
    alignItems: 'center',
  },
  scannerText: {
    color: COLORS.background,
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.md,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  scanAgainButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: BORDER_RADIUS.full,
    marginTop: SPACING.md,
  },
  scanAgainButtonText: {
    color: COLORS.background,
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.md,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.lg,
    color: COLORS.textPrimary,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  permissionTitle: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.xl,
    color: COLORS.textPrimary,
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  permissionText: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  permissionButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: BORDER_RADIUS.full,
  },
  permissionButtonText: {
    color: COLORS.background,
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.md,
  },
  webContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  webTitle: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.xl,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  webText: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.md,
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  webSubText: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});