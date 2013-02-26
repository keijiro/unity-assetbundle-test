#pragma strict

var baseURL = "https://github.com/keijiro/unity-assetbundle-test/raw/master/Bundles/";

private var usedSize = 0L;

function Start() {
	var platform = "webplayer";

#if UNITY_IPHONE
	platform = "ios";
#elif UNITY_ANDROID
	platform = "android";
#endif

	usedSize = Caching.spaceOccupied;

	while (true) {
		for (var i = 0; i < 4; i++) {
			var url = baseURL + platform + "/bundle" + i + ".unity3d";

			var www = WWW.LoadFromCacheOrDownload(url, 0, 0);
			yield www;

			var bundle = www.assetBundle;
			usedSize = Caching.spaceOccupied;

			for (var asset in bundle.LoadAll(Texture2D)) {
				renderer.material.mainTexture = asset as Texture2D;
				yield;
			}

			renderer.material.mainTexture = null;
			bundle.Unload(true);
		}
	}
}

function OnGUI() {
	var text = "Cached: " + (1.0 / (1024 * 1024) * usedSize).ToString(".00") + " MB";
	GUI.Label(Rect(0, 0, Screen.width, Screen.height), text);
}
