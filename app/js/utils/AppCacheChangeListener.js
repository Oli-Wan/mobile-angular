window.applicationCache.addEventListener('updateready', function () {
    if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
        window.applicationCache.swapCache();
        if (confirm("Une nouvelle version de l'application est disponible, la télécharger?")) {
            window.location.reload();
        }
    }
});
