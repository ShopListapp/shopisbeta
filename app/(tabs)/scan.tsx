import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { Camera as CameraIcon, X, Flashlight, RotateCcw } from 'lucide-react-native';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, SHADOWS, BORDER_RADIUS, LAYOUT } from '@/constants/theme';
import ScreenLayout from '@/components/layouts/ScreenLayout';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

const { width, height } = Dimensions.get('window');

export default function ScanScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [flashEnabled, setFlashEnabled] = useState(false);
  
  if (!permission) {
    return (
      <ScreenLayout>
        <View style={styles.loadingContainer}>
          <View style={styles.loadingIconContainer}>
            <CameraIcon size={32} color={COLORS.textSecondary} strokeWidth={1.5} />
          </View>
          <Text style={styles.loadingText}>Loading camera...</Text>
        </View>
      </ScreenLayout>
    );
  }

  if (!permission.granted) {
    return (
      <ScreenLayout>
        <View style={styles.permissionContainer}>
          <View style={styles.permissionIconContainer}>
            <CameraIcon size={48} color={COLORS.primary} strokeWidth={1.5} />
          </View>
          <Text style={styles.permissionTitle}>Camera Access Needed</Text>
          <Text style={styles.permissionText}>
            We need camera access to scan product barcodes and add items to your grocery lists automatically.
          </Text>
          <TouchableOpacity 
            style={styles.permissionButton} 
            onPress={requestPermission}
            activeOpacity={0.8}
          >
            <Text style={styles.permissionButtonText}>Enable Camera</Text>
          </TouchableOpacity>
        </View>
      </ScreenLayout>
    );
  }

  if (Platform.OS === 'web') {
    return (
      <ScreenLayout>
        <View style={styles.webContainer}>
          <View style={styles.webIconContainer}>
            <CameraIcon size={48} color={COLORS.primary} strokeWidth={1.5} />
          </View>
          <Text style={styles.webTitle}>Barcode Scanner</Text>
          <Text style={styles.webText}>
            Barcode scanning is optimized for mobile devices with camera access.
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
        enableTorch={flashEnabled}
        barcodeScannerSettings={{
          barcodeTypes: ["ean13", "ean8", "upc_a", "upc_e", "code128"],
        }}
        onBarcodeScanned={scanned ? undefined : (result) => {
          setScanned(true);
          console.log("Barcode scanned:", result.data);
          setTimeout(() => setScanned(false), 3000);
        }}
      >
        <View style={styles.overlay}>
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.headerButton} 
              onPress={() => console.log('Close scanner')}
              activeOpacity={0.7}
            >
              <X size={20} color={COLORS.card} strokeWidth={2} />
            </TouchableOpacity>
            
            <Text style={styles.headerTitle}>Scan Barcode</Text>
            
            <TouchableOpacity 
              style={[styles.headerButton, flashEnabled && styles.headerButtonActive]} 
              onPress={() => setFlashEnabled(!flashEnabled)}
              activeOpacity={0.7}
            >
              <Flashlight size={20} color={COLORS.card} strokeWidth={2} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.scanArea}>
            <View style={styles.scannerFrame}>
              <View style={[styles.corner, styles.topLeft]} />
              <View style={[styles.corner, styles.topRight]} />
              <View style={[styles.corner, styles.bottomLeft]} />
              <View style={[styles.corner, styles.bottomRight]} />
            </View>
          </View>
          
          <View style={styles.footer}>
            <Text style={styles.instructionText}>
              Position the barcode within the frame
            </Text>
            <Text style={styles.subInstructionText}>
              Make sure the barcode is clearly visible and well-lit
            </Text>
            
            <View style={styles.controls}>
              <TouchableOpacity 
                style={styles.controlButton}
                onPress={() => setFacing(current => (current === 'back' ? 'front' : 'back'))}
                activeOpacity={0.7}
              >
                <RotateCcw size={20} color={COLORS.card} strokeWidth={2} />
                <Text style={styles.controlButtonText}>Flip</Text>
              </TouchableOpacity>
              
              {scanned && (
                <TouchableOpacity 
                  style={[styles.controlButton, styles.scanAgainButton]}
                  onPress={() => setScanned(false)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.scanAgainButtonText}>Scan Again</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.textPrimary,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: SPACING.xl,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerButtonActive: {
    backgroundColor: COLORS.primary,
  },
  headerTitle: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.lg,
    color: COLORS.card,
  },
  scanArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerFrame: {
    width: width * 0.7,
    height: width * 0.4,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: COLORS.primary,
    borderWidth: 3,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: BORDER_RADIUS.md,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopRightRadius: BORDER_RADIUS.md,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomLeftRadius: BORDER_RADIUS.md,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomRightRadius: BORDER_RADIUS.md,
  },
  footer: {
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.xl + LAYOUT.tabBarHeight,
    alignItems: 'center',
  },
  instructionText: {
    color: COLORS.card,
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.md,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  subInstructionText: {
    color: 'rgba(255,255,255,0.8)',
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.sm,
    textAlign: 'center',
    marginBottom: SPACING.xl,
    lineHeight: 20,
  },
  controls: {
    flexDirection: 'row',
    gap: SPACING.md,
    alignItems: 'center',
  },
  controlButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: 'rgba(0,0,0,0.5)',
    minWidth: 60,
  },
  controlButtonText: {
    color: COLORS.card,
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.xs,
    marginTop: 4,
  },
  scanAgainButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
  },
  scanAgainButtonText: {
    color: COLORS.card,
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.sm,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  loadingIconContainer: {
    width: 80,
    height: 80,
    borderRadius: BORDER_RADIUS.xxl,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
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
  permissionIconContainer: {
    width: 100,
    height: 100,
    borderRadius: BORDER_RADIUS.xxl,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
  },
  permissionTitle: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.xxl,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  permissionText: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.xl,
    lineHeight: 22,
    maxWidth: 300,
  },
  permissionButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: BORDER_RADIUS.xl,
    ...SHADOWS.medium,
  },
  permissionButtonText: {
    color: COLORS.card,
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.md,
  },
  webContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  webIconContainer: {
    width: 100,
    height: 100,
    borderRadius: BORDER_RADIUS.xxl,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
  },
  webTitle: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.xxl,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  webText: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.md,
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SPACING.sm,
    lineHeight: 22,
  },
  webSubText: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});