window.applicationCache.addEventListener('updateready', function () {
    if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
        window.applicationCache.swapCache();
        if (confirm('A new version of this application is available. Load it?')) {
            window.location.reload();
        }
    }
});
