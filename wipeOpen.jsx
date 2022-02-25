var mainComp = app.project.activeItem;
var activeLayers =  mainComp.selectedLayers;
var targetLayer = activeLayers[0];

var layerEffects = targetLayer.property("ADBE Effect Parade");
var wipeEffect = layerEffects.addProperty("ADBE Linear Wipe");
wipeEffect.name = "Linear Wipe Open";

var playheadTime = mainComp.time;
var wipeDuration = 1.3;

var trCompletion = wipeEffect.property("Transition Completion");
trCompletion.setValueAtTime(playheadTime, 100);
trCompletion.setValueAtTime(playheadTime + wipeDuration, 0);

var wipeAngle = wipeEffect.property("Wipe Angle");
wipeAngle.setValue(0);

var easeOut = new KeyframeEase(0, 33);
var easeIn = new KeyframeEase(0, 100);

trCompletion.setTemporalEaseAtKey(1, [easeOut]);
trCompletion.setTemporalEaseAtKey(2, [easeIn]);