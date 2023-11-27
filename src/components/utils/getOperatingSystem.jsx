export default function getOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        console.log("Windows Phone")
        return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        console.log("Android")
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        console.log("iOS")
        return "iOS";
    }

    return "unknown";
}