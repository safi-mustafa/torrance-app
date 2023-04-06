import * as FileSystem from 'expo-file-system';
import { Platform } from 'react-native';
const { StorageAccessFramework } = FileSystem;

export default DownloadFile = (setDownloadProgress) => {
    const downloadPath = FileSystem.documentDirectory + (Platform.OS == 'android' ? '' : '');

    const ensureDirAsync = async (dir, intermediates = true) => {
        const props = await FileSystem.getInfoAsync(dir)
        if (props.exist && props.isDirectory) {
            return props;
        }
        let _ = await FileSystem.makeDirectoryAsync(dir, { intermediates })
        return await ensureDirAsync(dir, intermediates)
    }

    const downloadCallback = downloadProgress => {
        const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
        setDownloadProgress(progress);
    };

    const fileDownload = async (fileUrl) => {
        if (Platform.OS == 'android') {
            const dir = ensureDirAsync(downloadPath);
        }

        let fileName = fileUrl.split('Reports/')[1];
        //alert(fileName)
        const downloadResumable = FileSystem.createDownloadResumable(
            fileUrl,
            downloadPath + fileName,
            {},
            downloadCallback
        );

        try {
            const { uri } = await downloadResumable.downloadAsync();
            if (Platform.OS == 'android')
                saveAndroidFile(uri, fileName)
            else
                saveIosFile(uri);
        } catch (e) {
            console.error('download error:', e);
        }
    }

    const saveAndroidFile = async (fileUri, fileName = 'File') => {
        try {
            const fileString = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.Base64 });

            const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
            if (!permissions.granted) {
                return;
            }

            try {
                await StorageAccessFramework.createFileAsync(permissions.directoryUri, fileName, 'application/pdf')
                    .then(async (uri) => {
                        await FileSystem.writeAsStringAsync(uri, fileString, { encoding: FileSystem.EncodingType.Base64 });
                        alert('Report Downloaded Successfully')
                    })
                    .catch((e) => {
                    });
            } catch (e) {
                throw new Error(e);
            }

        } catch (err) {
        }
    }

    const saveIosFile = (fileUri) => {
        console.log("🚀 ~ file: downloadFile.js ~ line 73 ~ saveIosFile ~ fileUri", fileUri)
        // your ios code
        // i use expo share module to save ios file
    }
}