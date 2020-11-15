'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
	controller('HomeCtrl', ['$scope', 'utils', 'DB', '$location', function($scope, utils, DB, $location) {
		utils.unsetLeaveWarning();
		$scope.templates = null;

		DB.getTemplates()
			.then(function(templates) {
				var t;

				$scope.templates = [];

				for (var i = 0, l = templates.length; i < l; i++) {
					t = templates[i];

					$scope.templates[i] = {};
					
					if (t.get('thumb')) {
						$scope.templates[i].src = t.get('thumb').url();
					}
					$scope.templates[i].id = t.id;
					$scope.templates[i].title = t.get('title');
				};
			}, function(err) {
				$scope.templates = null;
			});

		$scope.$on('jpgUploadEvent', function(e, data) {
			utils.ngApply($scope, function() {
				DB.setPreImageData(data);
				$location.path('/new');
			});
		});
	}]).

	/*controller('ViewCtrl', ['$scope', 'utils', 'DB', '$routeParams', function($scope, utils, DB, $routeParams) {
		utils.unsetLeaveWarning();
		DB.getPreviewFromID($routeParams.id, function(previewResult) {
			utils.domImg(previewResult.get('file').url(), function(img) {
				angular.element(document.getElementById('jpg_viewer')).html(img.outerHTML);
			});
		});
	}]).*/

	/*controller('NewCtrl', ['$scope', '$rootScope', '$location', 'DB', 'utils', function($scope, $rootScope, $location, DB, utils) {
		if (DB.isConnected()) {
			DB.newArtboard()
				.then(function(result) {
					utils.ngApply($scope, function() {
						DB.setSessionArtboard(result);
						$location.path("/edit/" + result.id);
					});
				}, function(error) {
					utils.ngApply($scope, function(result, err) {
						$location.path('/');
						alert('Oops, something went wrong. Try again.');
					});
				});
		} else {
			DB.setSessionArtboard(DB.newTemporaryArtboard());
			$location.path("/edit/" + DB.getSessionArtboard().id);
		}
	}]).*/

	controller('NewCtrl', ['$scope', '$rootScope', '$location', 'DB', 'utils', function($scope, $rootScope, $location, DB, utils) {
		// All artboards will be temporary until its decided whether to support saving
		DB.setSessionArtboard(DB.newTemporaryArtboard());
		$location.path("/edit/" + DB.getSessionArtboard().id);
	}]).

	controller('EditBuffer', ['$location', 'DB', '$routeParams', function($location, DB, $routeParams) {
		var artboardID = $routeParams.id;

		if (!artboardID) {
			// user went to /e/ for some reason
			$location.path('/');
		} else {
			if (!DB.isConnected() || artboardID === 'temp') {
				DB.setSessionArtboard(DB.newTemporaryArtboard());
				$location.path("/edit/" + DB.getSessionArtboard().id);
			} else {
				DB.getTemplateByID(artboardID)
					.then(function(result) {
						DB.setSessionArtboard(result);
						$location.path('/edit/' + DB.getSessionArtboard().id);
					}, function(error) {
						$location.path('/');
						alert('Darn! We couldn\'t find that artboard.');
					});
			}
		}
	}]).

	controller('EditCtrl', ['$scope', 'canvasApi', 'DB', '$rootScope', 'utils', '$compile', 'sessionArtboard', '$location', function($scope, canvasApi, DB, $rootScope, utils, $compile, sessionArtboard, $location) {
		/*
		 * BEGIN EDITING ARTBOARD
		 */

		var sessionArtboardJSON = JSON.parse(sessionArtboard.get('data')),
			imgs = angular.element(document.getElementById('images_scroller'));

		if (typeof sessionArtboardJSON.type === 'undefined') {
			sessionArtboardJSON.type = 'image/jpeg';
		}
		
		$scope.artboard = {}; // Angular.Data variable for binding in views
		$scope.artboard.width = sessionArtboardJSON.attrs.width;
		$scope.artboard.height = sessionArtboardJSON.attrs.height;
		$scope.artboard.fill = sessionArtboardJSON.children[0].children[0].attrs.fill;
		$scope.artboard.type = sessionArtboardJSON.type;
		$scope.artboard.stageDataURL = null;
		$scope.artboard.selected = null;

		$scope.previewURL = null;
		$scope.loading = null;

		// whether or not to show shortcut tips modal
		$scope.showTips = false;

		utils.setLeaveWarning();

		$scope.icons = ["&#xe600","&#xe601","&#xe602","&#xe603","&#xe604","&#xe605","&#xe606","&#xe607","&#xe608","&#xe609","&#xe60a","&#xe60b","&#xe60c","&#xe60d","&#xe60e","&#xe60f","&#xe610","&#xe611","&#xe612","&#xe613","&#xe614","&#xe615","&#xe616","&#xe617","&#xe618","&#xe619","&#xe61a","&#xe61b","&#xe61c","&#xe61d","&#xe61e","&#xe61f","&#xe620","&#xe621","&#xe622","&#xe623","&#xe624","&#xe625","&#xe626","&#xe627","&#xe628","&#xe629","&#xe62a","&#xe62b","&#xe62c","&#xe62d","&#xe62e","&#xe62f","&#xe630","&#xe631","&#xe632","&#xe633","&#xe634","&#xe635","&#xe636","&#xe637","&#xe638","&#xe639","&#xe63a","&#xe63b","&#xe63c","&#xe63d","&#xe63e","&#xe63f","&#xe640","&#xe641","&#xe642","&#xe643","&#xe644","&#xe645","&#xe646","&#xe647","&#xe648","&#xe649","&#xe64a","&#xe64b","&#xe64c","&#xe64d","&#xe64e","&#xe64f","&#xe650","&#xe651","&#xe652","&#xe653","&#xe654","&#xe655","&#xe656","&#xe657","&#xe658","&#xe659","&#xe65a","&#xe65b","&#xe65c","&#xe65d","&#xe65e","&#xe65f","&#xe660","&#xe661","&#xe662","&#xe663","&#xe664","&#xe665","&#xe666","&#xe667","&#xe668","&#xe669","&#xe66a","&#xe66b","&#xe66c","&#xe66d","&#xe66e","&#xe66f","&#xe670","&#xe671","&#xe672","&#xe673","&#xe674","&#xe675","&#xe676","&#xe677","&#xe678","&#xe679","&#xe67a","&#xe67b","&#xe67c","&#xe67d","&#xe67e","&#xe67f","&#xe680","&#xe681","&#xe682","&#xe683","&#xe684","&#xe685","&#xe686","&#xe687","&#xe688","&#xe689","&#xe68a","&#xe68b","&#xe68c","&#xe68d","&#xe68e","&#xe68f","&#xe690","&#xe691","&#xe692","&#xe693","&#xe694","&#xe695","&#xe696","&#xe697","&#xe698","&#xe699","&#xe69a","&#xe69b","&#xe69c","&#xe69d","&#xe69e","&#xe69f","&#xe6a0","&#xe6a1","&#xe6a2","&#xe6a3","&#xe6a4","&#xe6a5","&#xe6a6","&#xe6a7","&#xe6a8","&#xe6a9","&#xe6aa","&#xe6ab","&#xe6ac","&#xe6ad","&#xe6ae","&#xe6af","&#xe6b0","&#xe6b1","&#xe6b2","&#xe6b3","&#xe6b4","&#xe6b5","&#xe6b6","&#xe6b7","&#xe6b8","&#xe6b9","&#xe6ba","&#xe6bb","&#xe6bc","&#xe6bd","&#xe6be","&#xe6bf","&#xe6c0","&#xe6c1","&#xe6c2","&#xe6c3","&#xe6c4","&#xe6c5","&#xe6c6","&#xe6c7","&#xe6c8","&#xe6c9","&#xe6ca","&#xe6cb","&#xe6cc","&#xe6cd","&#xe6ce","&#xe6cf","&#xe6d0","&#xe6d1","&#xe6d2","&#xe6d3","&#xe6d4","&#xe6d5","&#xe6d6","&#xe6d7","&#xe6d8","&#xe6d9","&#xe6da","&#xe6db","&#xe6dc","&#xe6dd","&#xe6de","&#xe6df","&#xe6e0","&#xe6e1","&#xe6e2","&#xe6e3","&#xe6e4","&#xe6e5","&#xe6e6","&#xe6e7","&#xe6e8","&#xe6e9","&#xe6ea","&#xe6eb","&#xe6ec","&#xe6ed","&#xe6ee","&#xe6ef","&#xe6f0","&#xe6f1","&#xe6f2","&#xe6f3","&#xe6f4","&#xe6f5","&#xe6f6","&#xe6f7","&#xe6f8","&#xe6f9","&#xe6fa","&#xe6fb","&#xe6fc","&#xe6fd","&#xe6fe","&#xe6ff","&#xe700","&#xe701","&#xe702","&#xe703","&#xe704","&#xe705","&#xe706","&#xe707","&#xe708","&#xe709","&#xe70a","&#xe70b","&#xe70c","&#xe70d","&#xe70e","&#xe70f","&#xe710","&#xe711","&#xe712","&#xe713","&#xe714","&#xe715","&#xe716","&#xe717","&#xe718","&#xe719","&#xe71a","&#xe71b","&#xe71c","&#xe71d","&#xe71e","&#xe71f","&#xe720","&#xe721","&#xe722","&#xe723","&#xe724","&#xe725","&#xe726","&#xe727","&#xe728","&#xe729","&#xe72a","&#xe72b","&#xe72c","&#xe72d","&#xe72e","&#xe72f","&#xe730","&#xe731","&#xe732","&#xe733","&#xe734","&#xe735","&#xe736","&#xe737","&#xe738","&#xe739","&#xe73a","&#xe73b","&#xe73c","&#xe73d","&#xe73e","&#xe73f","&#xe740","&#xe741","&#xe742","&#xe743","&#xe744","&#xe745","&#xe746","&#xe747","&#xe748","&#xe749","&#xe74a","&#xe74b","&#xe74c","&#xe74d","&#xe74e","&#xe74f","&#xe750","&#xe751","&#xe752","&#xe753","&#xe754","&#xe755","&#xe756","&#xe757","&#xe758","&#xe759","&#xe75a","&#xe75b","&#xe75c","&#xe75d","&#xe75e","&#xe75f"];

		for (var i = 0, l = $scope.icons.length; i < l; i++) {
			imgs.append($compile('<a class="icon action_link" jpg-click-broadcast="jpgAddIcon" href="">' + $scope.icons[i] + '</a>')($scope));
		}

		$scope.textAlignments = {
			left : 'Left',
			center : 'Center',
			right : 'Right'
		};

		/*$scope.fontFamilies = [
			{name : 'Sans-serif', val : 'sans-serif'},
			{name : 'Serif', val : 'serif'},
			{name : 'Monospace', val : 'monospace'},
			{name : 'Cursive', val : 'cursive'},
			{name : 'Fantasy', val : 'fantasy'}
		];*/

		$scope.fontFamilies = {
			'sans-serif' : 'Sans-serif',
			serif : 'Serif',
			monospace : 'Monospace',
			cursive : 'Cursive',
			fantasy : 'Fantasy'
		};

		$scope.fontStyles = {
			normal : 'Normal',
			italic : 'Italic',
			bold : 'Bold'
		};

		$scope.textLineHeights = [
			{name : 'Small', size : 1.1},
			{name : 'Normal', size : 1.2},
			{name : 'Medium', size : 1.5},
			{name : 'Large', size : 2},
			{name : 'Extra', size : 4}
		];

		$scope.palette = ['#ffffff', '#cccccc', '#b3b3b3', '#999999', '#666666', '#4d4d4d', '#333333', '#000000', 
					   '#ff0000', '#e60000', '#b30000', '#990000', '#800000', '#660000', '#4d0000', '#330000',
					   '#00ff00', '#00e600', '#00b300', '#009900', '#008000', '#006600', '#004d00', '#003300',
					   '#0000ff', '#0000e6', '#0000b3', '#000099', '#000080', '#000066', '#00004d', '#000033',
					   '#FFB300', '#FFFB00', '#9DFF00', '#00FFE1', '#009DFF', '#C800FF', '#FF00FF', '#FF009D', 'transparent'];

		//$scope.alphas = ['0.1', '0.3', '0.5', '0.7', '0.8', '0.9', '1',];

		$scope.layerIs = function(is, not) {
			var ret = false;

			if ($scope.artboard.currentLayer) {
				if (is) {
					for (var i = 0, l = is.length; i < l; i++) {
						if ($scope.artboard.currentLayer.className === is[i]) {
							ret = true;
							break;
						}
					}
				}

				if (not) {
					for (var i = 0, l = not.length; i < l; i++) {
						if ($scope.artboard.currentLayer.className === not[i]) {
							ret = false;
							break;
						}
					}
				}
			}
			
			return ret;
		}

		// just a hooke into layerIs so that user doesn't have to pass empty param
		$scope.layerNot = function(not, is) {
			return !$scope.layerIs(not, is);
		}

		function setLayer(layer) {
			canvasApi.setLayerByID(layer.attrs.id);
			$scope.artboard.currentLayer = canvasApi.getCurrentLayer();
			utils.ngApply($scope);
		}

		/*
		** Initialization of the artboard and canvas
		*/
		$scope.$on('jpgArtboardEvent', function(e, data) {
			canvasApi.setArtboard(data, sessionArtboardJSON);
			$scope.artboard.layers = canvasApi.getLayers();

			if (DB.getPreImageData() !== null) {
				var imgData = DB.getPreImageData();
				imgData.doResizeArtboard = true;

				$scope.$broadcast('jpgUploadEvent', imgData);
				DB.setPreImageData(null);
			}
		});
		$scope.$on('jpgArtboardUpdateEvent', function(e, data) {
			canvasApi.setArtboard(data);
		});

		$scope.$on('jpgToggleShadow', function() {
			if ($scope.artboard.currentLayer.attrs.shadowEnabled) {
				canvasApi.setLayerAttr('shadowColorBak', $scope.artboard.currentLayer.attrs.shadowColor.toString(), null, null, false);
				canvasApi.setLayerAttr('shadowColor', 'transparent', null, null, false);
				canvasApi.setLayerAttr('shadowEnabled', false);
			} else {
				canvasApi.setLayerAttr('shadowEnabled', true);
				
				if (typeof $scope.artboard.currentLayer.attrs.shadowColor === 'undefined') {
					canvasApi.setLayerAttr('shadowColor', 'black', null, null, false);
					canvasApi.setLayerAttr('shadowOffsetX', 3, 'number', null, false);
					canvasApi.setLayerAttr('shadowOffsetY', 3, 'number', null, false);
					canvasApi.setLayerAttr('shadowBlur', 3, 'number', null, false);
					canvasApi.setLayerAttr('shadowOpacity', 0.5, 'decimal');
				} else if (typeof $scope.artboard.currentLayer.attrs.shadowColorBak !== 'undefined') {
					canvasApi.setLayerAttr('shadowColor', $scope.artboard.currentLayer.attrs.shadowColorBak);
				}
			}
		});

		/*
		** Scroll fix for chrome gestures for back/forward on swipe left/right
		*/
		// TODO: Prevent swipe for history back, this prevents all scrolling
		/*$rootScope.$on('jpgDocumentWheelScroll', function(e, data) {
			document.getElementById('edit_plane').scrollLeft -= data.evt.wheelDeltaX;
			data.evt.preventDefault();
		});*/

		/*
		** Layer selection
		*/
		$rootScope.$on('jpgArtboardMouseDown', function(e, data) {
			if (!data.drawing) {
				utils.ngApply($scope, function() {
					canvasApi.setLayerByEvent(data.evt);
					$scope.artboard.currentLayer = canvasApi.getCurrentLayer();
					
					if ($scope.artboard.currentLayer) {
						canvasApi.theme($scope.artboard.currentLayer.className, $scope.artboard.currentLayer);
					}
				});
			}
		});
		$scope.$on('jpgDeselect', function(e, data) {
			utils.ngApply($scope, function() {
				canvasApi.deselectAllLayers();
				$scope.artboard.currentLayer = null;
			});
		});
		$scope.$on('jpgLayerManagerSelection', function(e, data) {
			utils.ngApply($scope, function() {
				canvasApi.setLayerByID(data.layerID);
				$scope.artboard.currentLayer = canvasApi.getCurrentLayer();
			});
		});

		/*
		** Local image upload
		*/
		$scope.$on('jpgUploadEvent', function(e, data) {
			canvasApi.addImage({
				src : data.src
			}, null, function(layer) {
				var layerCount = canvasApi.getLayers().length,
					w,
					h;

				setLayer(layer);

				if (data.doResizeArtboard) {
					w = $scope.artboard.currentLayer.attrs.width;
					h = $scope.artboard.currentLayer.attrs.height;

					canvasApi.setArtboard({
						width : w,
						height : h
					});

					$scope.artboard.width = w;
					$scope.artboard.height = h;
					canvasApi.setLayerAttr('x', 0);
					canvasApi.setLayerAttr('y', 0);
					utils.ngApply($scope);
				}
			});
		});

		$scope.$on('jpgAddText', function(e, data) {
			setLayer(canvasApi.addLayer(null, 'Text'));
		});

		$scope.$on('jpgAddRect', function(e, data) {
			setLayer(canvasApi.addLayer(null, 'Rect'));
		});

		$scope.$on('jpgAddEllipse', function(e, data) {
			setLayer(canvasApi.addLayer(null, 'Ellipse'));
		});

		$scope.$on('jpgAddArrow', function(e, data) {
			setLayer(canvasApi.addArrow(null));
		});

		$scope.$on('jpgDrawRect', function(e, data) {
			setLayer(canvasApi.drawShape(data, 'Rect'));
			$rootScope.$broadcast('jpgDrawReady');
		});

		$scope.$on('jpgDrawEllipse', function(e, data) {
			setLayer(canvasApi.drawShape(data, 'Ellipse'));
			$rootScope.$broadcast('jpgDrawReady');
		});

		$scope.$on('jpgDrawArrow', function(e, data) {
			setLayer(canvasApi.drawArrow(data));
			$rootScope.$broadcast('jpgDrawReady');
		});

		$scope.$on('jpgAddIcon', function(e, data) {
			setLayer(canvasApi.addLayer(null, 'Icon', {
				text : data.element.text(),
				fontFamily : 'icomoon'
			}));
		});

		/*
		** Export
		*/
		$scope.$on('jpgExport', function(e, data) {
			$scope.loading = true;
			utils.ngApply($scope);
			canvasApi.stageToDataURL($scope.artboard.type, function(dataURL) {
				//TODO: Save image to DB w/ unique ID
				// then save artboard data
				//console.log(DB.getSessionArtboard());

//console.log(canvasApi.getArtboardJSON());

				$scope.previewURL = null;
				$scope.artboard.stageDataURL = dataURL;				
				$scope.loading = null;
				utils.ngApply($scope);
			});

			/*canvasApi.stageToJSON(function(dataJSON) {
				DB.saveArtboard('data', dataJSON);
			});*/
		});

		$scope.$on('jpgSharePreview', function() {
			$scope.loading = true;
			utils.ngApply($scope);

			DB.savePreviewFile($scope.artboard.stageDataURL, $scope.artboard.type, function(saved) {
				if (saved) {
					$scope.previewURL = 'mjpg.co' + '/' + DB.getSessionPreviewID();
					/*setTimeout(function() {
						document.getElementById('preview_url').setSelectionRange(0, 100);
					}, 0);*/
				} else {
					$scope.previewURL = null;
					alert('Well, we can\'t share your file right now, sorry :(');
				}
				$scope.loading = null;
				utils.ngApply($scope);
			});
		});

		$scope.$on('jpgClosePreview', function() {
			utils.ngApply($scope, function() {
				$scope.artboard.stageDataURL = null;
			});
		});

		$scope.$on('jpgCloseTips', function() {
			utils.ngApply($scope, function() {
				$scope.showTips = false;
			});
		});

		$scope.$on('jpgShowTips', function() {
			utils.ngApply($scope, function() {
				$scope.showTips = true;
			});
		});

		/*
		** Layer controls
		*/
		$scope.$on('jpgLayerUp', function(e, data) {
			utils.ngApply($scope, function() {
				canvasApi.moveLayerUp(canvasApi.getCurrentLayer());
			});
		});

		$scope.$on('jpgLayerDown', function(e, data) {
			utils.ngApply($scope, function() {
				canvasApi.moveLayerDown(canvasApi.getCurrentLayer());
			});
		});

		$scope.$on('jpgLayerDelete', function(e, data) {
			utils.ngApply($scope, function() {
				canvasApi.deleteLayer(canvasApi.getCurrentLayer());
				$scope.artboard.currentLayer = null;
			});
		});

		$scope.$on('jpgLayerResize', function(e, data) {
			canvasApi.resizeLayerByMouse(data);
		});

		$scope.$on('jpgLayerMove', function(e, data) {
			canvasApi.moveLayerByMouse(data);
		});

		$scope.$on('jpgLayerMoveX', function(e, data) {
			utils.ngApply($scope, function() {
				if ($scope.artboard.currentLayer.className === 'Arrow') {
					canvasApi.moveArrow('x', data.increment);
				} else {
					canvasApi.concatLayerAttr('adjustedX', data.increment, 'number');
				}
			});
		});

		$scope.$on('jpgLayerMoveY', function(e, data) {
			utils.ngApply($scope, function() {
				if ($scope.artboard.currentLayer.className === 'Arrow') {
					canvasApi.moveArrow('y', data.increment);
				} else {
					canvasApi.concatLayerAttr('adjustedY', data.increment, 'number');
				}
			});
		});

		/*$scope.$on('jpgFlipLayerY', function() {
			canvasApi.flipLayerY();
		});

		$scope.$on('jpgFlipLayerX', function() {
			canvasApi.flipLayerX();
		});*/

		$scope.$on('jpgInputSuccess', function(e, data) {
			if (data.layerProp) {
				var validate = data.validate ? data.validate : data.type;

				canvasApi.setLayerAttr(data.layerProp, data.val, validate);
				
				if ($scope.artboard.currentLayer) {
					// set the theme to the currently selected
					canvasApi.theme($scope.artboard.currentLayer.className, $scope.artboard.currentLayer);
				}

				utils.ngApply($scope);
			}
		});

		$scope.showFitButton = function() {
			if ($scope.artboard.currentLayer && $scope.artboard.currentLayer.className !== 'Arrow') {
				return true;
			} else {
				return false;
			}
		};

		$scope.$on('jpgFitCanvasToSelectedLayer', function() {
			if ($scope.artboard.currentLayer && $scope.artboard.currentLayer.className !== 'Arrow') {
				var data = {},
					w = $scope.artboard.currentLayer.attrs.adjustedWidth,
					h = $scope.artboard.currentLayer.attrs.adjustedHeight,
					diffX,
					diffY,
					tempL;

				if ($scope.artboard.currentLayer.className === 'Icon') {
					w = $scope.artboard.currentLayer.attrs.fontSize + $scope.artboard.currentLayer.attrs.strokeWidth;
					h = w;
				}

				if (w > 0) {
					data.width = w;
					diffX = $scope.artboard.currentLayer.attrs.adjustedX;
					$scope.artboard.width = w;
				}

				if (h > 0) {
					data.height = h;
					diffY = $scope.artboard.currentLayer.attrs.adjustedY;
					$scope.artboard.height = h;
				}	

				canvasApi.setArtboard(data);

				for (var i = 0, l = $scope.artboard.layers.length; i < l; i ++) {
					tempL = $scope.artboard.layers[i];

					if (tempL.className === 'Arrow') {
						canvasApi.moveArrow('x', -diffX, tempL);
						canvasApi.moveArrow('y', -diffY, tempL);
					} else {
						canvasApi.concatLayerAttr('adjustedX', -diffX, 'number', tempL);
						canvasApi.concatLayerAttr('adjustedY', -diffY, 'number', tempL);
					}
				}

				utils.ngApply($scope);
			}
		});

		/* Add Shortcuts */

		utils.addShortcut('67', function() { // c
			canvasApi.copyCurrentLayer();
		}, true);

		utils.addShortcut('86', function() { // v
			canvasApi.pasteCopyLayer(function(l) {
				setLayer(l);
				utils.ngApply($scope);
			});
		}, true);
	}]);
