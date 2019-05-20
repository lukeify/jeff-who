var isDevelopment = function() {
    return browser.management.getSelf().then(function(extensionInfo) {
        return extensionInfo.installType === 'development';
    }).catch(function(error) {
        console.log(error);
    });
};

browser.runtime.onMessage.addListener(function(request, sender) {
    console.log(request);
    if (request.type === 'isDevelopment') {
        return isDevelopment();
    }
    return newPromise();
});