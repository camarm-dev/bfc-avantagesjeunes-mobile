import { BiometricAuth } from '@aparajita/capacitor-biometric-auth';

async function setupBiometry() {
    const response = await BiometricAuth.checkBiometry()
    await BiometricAuth.setBiometryType(response.biometryType)
}

async function authenticateWithBiometry(callback: Function, error: Function) {
    const biometry = await  BiometricAuth.checkBiometry()
    if (!biometry.isAvailable) {
        await BiometricAuth.setBiometryType('fingerprintAuthentication')
    }
    await BiometricAuth.authenticate({
        reason: 'Utiliser cet avantage ?',
        cancelTitle: 'Annuler',
        allowDeviceCredential: true,
        iosFallbackTitle: 'Authentification échouée',
        androidTitle: 'Utiliser cet avantage ?',
        androidSubtitle: 'Confirmez que vous voulez utiliser cet avantage'
    }).then(callback).catch(error)
}

export {
    setupBiometry,
    authenticateWithBiometry
}
