function applyWipePreset(type) {
    if (!app.project.activeItem || !(app.project.activeItem instanceof CompItem)) {
        alert("Open a composition.");
        return
    }

    if (app.project.activeItem.selectedLayers.length < 1) {
        alert("Select a layer.")
        return
    }

    var mainComp = app.project.activeItem;
    var activeLayers =  mainComp.selectedLayers;
    var playheadTime = mainComp.time;
    var wipeDuration = 1.3;

    for (var i=0; i < activeLayers.length; i++) {
        var wipeTargetLayer = activeLayers[i];
        var layerEffects = wipeTargetLayer.property("ADBE Effect Parade");

        var wipeEffect = layerEffects.addProperty("ADBE Linear Wipe");

        var trCompletion = wipeEffect.property("ADBE Linear Wipe-0001");
        var wipeAngle = wipeEffect.property("ADBE Linear Wipe-0002");

        if (type == 'open' || !type) {
            wipeEffect.name = "Linear Wipe Open";
            trCompletion.setValueAtTime(playheadTime, 100);
            trCompletion.setValueAtTime(playheadTime + wipeDuration, 0);
            wipeAngle.setValue(0);
        } else if (type == 'close') {
            wipeEffect.name = "Linear Wipe Close";
            trCompletion.setValueAtTime(playheadTime, 0);
            trCompletion.setValueAtTime(playheadTime + wipeDuration, 100);
            wipeAngle.setValue(180);
        }

        var easeOut = new KeyframeEase(0, 33);
        var easeIn = new KeyframeEase(0, 100);

        trCompletion.setTemporalEaseAtKey(1, [easeOut]);
        trCompletion.setTemporalEaseAtKey(2, [easeIn]);
    }
}


applyWipePreset('open');
applyWipePreset('close');