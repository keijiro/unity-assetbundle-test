#pragma strict

private static function MakeDestPath(platform : String, index : int) {
	return "Bundles/" + platform + "/bundle" + (index / 10).ToString() + ".unity3d";
}

@MenuItem("Tool/Build Asset Bundles")
static function BuildAssetBundlesTool() {
	var options = BuildAssetBundleOptions.DeterministicAssetBundle;
	var assets = new Texture2D[10];
	for (var i = 0; i < 40; i++) {
		var path = "Assets/Images/image" + i.ToString("00") + ".png";
		assets[i % 10] = AssetDatabase.LoadMainAssetAtPath(path) as Texture2D;
		if (i % 10 == 9) {
            BuildPipeline.BuildAssetBundle(null, assets, MakeDestPath("android", i), options, BuildTarget.Android);
            BuildPipeline.BuildAssetBundle(null, assets, MakeDestPath("ios", i), options, BuildTarget.iPhone);
            BuildPipeline.BuildAssetBundle(null, assets, MakeDestPath("webplayer", i), options, BuildTarget.WebPlayer);
        }
	}
}
