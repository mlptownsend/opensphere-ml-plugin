goog.provide('plugin.ml.MlPlugin');

goog.require('os.plugin.AbstractPlugin');
goog.require('os.plugin.PluginManager');


/* =========== NOTE ==========
 * If you change the package name of this particular class, be sure to modify
 * build.gcc.entry_point to match the new package/class name.
 */

 /**
 * MlPlugin
 * @extends {os.plugin.AbstractPlugin}
 * @constructor
 */
plugin.ml.MlPlugin = function() {
  plugin.ml.MlPlugin.base(this, 'constructor');
  this.id = plugin.ml.ID;
  this.errorMessage = null;
};
goog.inherits(plugin.ml.MlPlugin, os.plugin.AbstractPlugin);

/**
 * @type {string}
 * @const
 */
plugin.ml.ID = 'ml-plugin-859f0ba2-c8ba-4edd-814f-cdb556aa750f';

/**
 * @inheritDoc
 */
plugin.ml.MlPlugin.prototype.init = function() {
	
	var mlServer = 'https://openspheredemo.maplarge.com';
	//var mlServer = 'https://qa.maplarge.com';
	//var mlServer = 'https://ml-local.maplarge.net';

	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.onload = function() {
		ml.onload(function() {
			var nvp = ml.nvp();
			
			ml.auth.verifycred(function() {
				var mapContainer = os.MapContainer.getInstance();
				var internalMap = mapContainer.getMap();
				var mapDiv = ml.$('#map-container')[0];
				
				window.mapContainer = mapContainer;
				window.internalMap = internalMap;			
			
				var opts = {
					api: "OPENSPHERE",
					lat: undefined,
					lng: undefined,
					z: undefined
				};
				//opts.lat = 35;
				//opts.lng = -90;
				//opts.z = 6;
				var mlMap = new ml.ui.map.Map(mapDiv, opts, mapContainer);
				window.mlMap = mlMap;
				mlMap.onInternalMapAvailable(function() {
					var zzMap = mlMap.zzMap.get();
					window.zzMap = zzMap;

					if (nvp["som"]) {
						window.somDashboard = zzMap.createSOMDashboard();
					} else {
						var mapEditor = new ml.ui.map.editor.MapEditor(mlMap);
						mapEditor.show();
						window.mapEditor = mapEditor;
					}					
				});
			});
		});
	}
script.src = mlServer + '/JS';
document.getElementsByTagName('head')[0].appendChild(script);
};

// add the plugin to the application
os.plugin.PluginManager.getInstance().addPlugin(new plugin.ml.MlPlugin());
