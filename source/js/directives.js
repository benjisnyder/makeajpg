'use strict';

/* Directives */

angular.module('myApp.directives', []).

	directive('jpgDropzone', function($rootScope) {
		return function(scope, element, attrs) {
			var newDropzone = new Dropzone(document.body, {
				url : '/',
				createImageThumbnails : false,
				previewsContainer : null,
				clickable : false,
				maxFilesize : 2,
				resize : function(file) {
				},
				init : function() {
					this.on('addedfile', function(file) { 
						var reader = new FileReader();
					
						reader.onload = function(fileEvent) {
							scope.$broadcast('jpgUploadEvent',
								{
									src : fileEvent.target.result
								}
							);
						};

						reader.readAsDataURL(file);
					});
				}
			});
		}
	}).

	directive('jpgArtboard', ['utils', '$rootScope', '$document', function(utils, $rootScope, $document) {
		return {
			scope : {
				width : '=',
				height : '=',
				fill : '=',
				type : '='
			},
			link : function(scope, element, attrs) {			
				function updateArtboard() {
					scope.$parent.$broadcast('jpgArtboardUpdateEvent',
						{
							width : parseInt(scope.width, 10),
							height : parseInt(scope.height, 10),
							fill : scope.fill,
							type : scope.type
						}
					);
				}

				/*document.addEventListener("mousewheel", function(e) {
					$rootScope.$broadcast('jpgDocumentWheelScroll', {
						evt : e
					})
				});*/

				scope.$parent.$broadcast('jpgArtboardEvent',
					{
						id : attrs.id,
						width : parseInt(scope.width, 10),
						height : parseInt(scope.height, 10),
						fill : scope.fill
					}
				);

				element.on('mousedown', function(evt) {
					$rootScope.$broadcast('jpgArtboardMouseDown',
						{
							evt : evt
						}
					);
				});

				element.on('mouseup', function(evt) {
					$rootScope.$broadcast('jpgArtboardMouseUp');
				});

				scope.$watch('width', updateArtboard);
				scope.$watch('height', updateArtboard);
				scope.$watch('fill', updateArtboard);
				scope.$watch('type', updateArtboard);
			}
		};
	}]).

	directive('jpgDrawPlane', ['$rootScope', '$document', function($rootScope, $document) {
		return function(scope, element, attrs) {
			var mouseDownEvt = null,
				reset = function() {
					element.removeClass('selected');
					$document.off('mousedown');
					element.off('mousemove');
					mouseDownEvt = null;
				};

			// jpgReset and jpgEnd are needed so that other components can
			// bind to a drawing reset while still being able to respond
			// differently dependent on whether its an actual draw ending event
			$rootScope.$on('jpgResetDraw', function() {
				reset();
			});

			$rootScope.$on('jpgEndDraw', function() {
				reset();
			});

			$rootScope.$on('jpgStartDraw', function(e, data) {
				element.addClass('selected');

				$document.on('mousedown', function(evt) {
					if (element[0] === evt.target) {
						mouseDownEvt = evt;

						$rootScope.$broadcast(data.drawEvt, {
							evt : evt
						});
					} else {
						$rootScope.$broadcast('jpgEndDraw');
					}
				});
			});

			$rootScope.$on('jpgDrawReady', function() {
				if (mouseDownEvt !== null) {
					$rootScope.$broadcast('jpgArtboardMouseDown', {
						evt : mouseDownEvt,
						drawing : true
					});
				}
			});

			element.on('mouseup', function(evt) {
				$rootScope.$broadcast('jpgArtboardMouseUp');
				$rootScope.$broadcast('jpgEndDraw');
			});
		}
	}]).

	directive('jpgDraw', ['$rootScope', 'utils', function($rootScope, utils) {
		return function(scope, element, attrs) {
			var cls = 'selected',
				broadcast = function(hide) {
					// reset the drawing plane/clear out existing/pending shapes
					$rootScope.$broadcast('jpgResetDraw');
					
					// check if we should be drawing this elements target shape
					if ((element.hasClass(cls) && hide !== false) || hide === true) {
						$rootScope.$broadcast('jpgEndDraw');
					} else {
						$rootScope.$broadcast('jpgStartDraw',
							{
								drawEvt : attrs.jpgDrawEvt
							}
						);
						element.addClass(cls);
					}
				}

			if (attrs.jpgShortcut) {
				utils.addShortcut(attrs.jpgShortcut, function() {
					broadcast();
				});
			}

			element.on('click', function(evt) {
				broadcast();
			});

			// reset anytime a new drawing is ended
			$rootScope.$on('jpgEndDraw', function(e) {
				element.removeClass(cls);
			});

			// reset anytime a new drawing is started
			$rootScope.$on('jpgStartDraw', function(e) {
				element.removeClass(cls);
			});
		}
	}]).
	
	directive('jpgUpload', function() {
		return function(scope, element, attrs) {
			element.bind('change', function() {
				if (this.files && this.files[0]) {
					var reader = new FileReader();
					
					reader.onload = function(e) {
						scope.$broadcast('jpgUploadEvent',
							{
								file : e
							}
						);

						element.val('');
					};

					reader.readAsDataURL(this.files[0]);
				}
				return false;
			});
		};
	}).

	directive('jpgClickBroadcast', ['utils', function(utils) {
		return function(scope, element, attrs) {
			function broadcast() {
				scope.$broadcast(attrs.jpgClickBroadcast,
					{
						element : element,
						attrs : attrs
					}
				);
				return false;
			}

			if (attrs.jpgShortcut) {
				utils.addShortcut(attrs.jpgShortcut, function() {
					broadcast();
				});
			}

			element.bind('click', function() {
				broadcast();
			});
		};
	}]).

	directive('jpgInput', ['utils', '$rootScope', function(utils, $rootScope) {
		return {
			require : 'ngModel',
			scope : {
				layerProp : '@'
			},
			link : function(scope, element, attrs, ngModel) {
				var _this = this,
					$body = angular.element(document).find('body');

				var validate = function() {
					var validation = element[0].validity,
						val;

					if (!validation.valid) {
						utils.ngApply(scope, function() {
							element.val(element.attr('data-temp'));
							element.removeClass('error');
							ngModel.$setViewValue(element.attr('data-temp'));
						});
					} else {
						val = element.val();

						scope.$parent.$broadcast('jpgInputSuccess', 
							{
								layerProp : scope.layerProp,
								val : val,
								type : attrs.type,
								validate : attrs.jpgValidate
							}
						);
					}
				}

				element.on('focus', function() {
					element.attr('data-temp', element.val());

					if (typeof attrs.jpgColor !== 'undefined') {
						$rootScope.$broadcast('jpgColorFocus', {
							element : element
						});
					}
				});

				element.on('keyup', function() {
					var validation = element[0].validity;

					if (!validation.valid) {
						element.addClass('error');
					} else {
						element.removeClass('error');
					}
				});

				element.on('blur', function() {
					validate();

					if (typeof attrs.jpgColor !== 'undefined') {
						$rootScope.$broadcast('jpgColorBlur', {
							element : element
						});
					}
				});

				//if (attrs.jpgInput === 'change') {
					element.on('change', function() {
						validate();
					});
				//}
			}
		}
	}]).

	directive('jpgShareInput', function(utils, $rootScope) {
		return function(scope, element, attrs, ngModel) {
			element.on('click', function() {
				element[0].setSelectionRange(0, 100);
			});

			scope.$watchCollection('previewURL', function() {
				setTimeout(function() {
					element[0].setSelectionRange(0, 100);
				}, 0);
			});
		}
	}).

	directive('jpgColorPicker', ['utils', '$rootScope', function(utils, $rootScope) {
		return {
			restrict : 'EA',
			scope : {
				palette : '=',
				alphas : '='
			},
			template : '<span class="swatch_holder" ng-repeat="swatch in palette"><a class="swatch" href="" title="{{swatch}}" style="background-color: {{swatch}};"></a></span>',
			link : function(scope, element, attrs) {
				var cls = 'selected',
					$pickerTarget;
				
				element.on('mousedown', function(e) {
					var $targ = angular.element(e.target),
						val;
						
					if ($targ.hasClass('swatch')) {
						$pickerTarget.val($targ.attr('title'));
						$pickerTarget.triggerHandler('change');
						element.removeClass(cls);
					}
					return false;
				});

				$rootScope.$on('jpgColorFocus', function(e, data) {
					element.addClass(cls);
					utils.gps(element[0], data.element[0]);
					$pickerTarget = data.element;
				});

				$rootScope.$on('jpgColorBlur', function(e, data) {
					element.removeClass(cls);
				});
			}
		}
	}]).

	directive('jpgDeselect', function() {
		return function(scope, element, attrs) {
			element.on('click', function(evt) {
				if (evt.target.id === attrs.id) {
					scope.$parent.$broadcast('jpgDeselect',
						{
							evt : evt
						}
					);
				}
			});
		}
	}).

	directive('jpgLayerManager', ['$rootScope', 'utils', '$document', function($rootScope, utils, $document) {
		return {
			restrict : 'EA',
			scope : {
				layers : '=',
				current : '=',
				order : '='
			},
			template : '<div id="layers"><a id="{{ layer.attrs.id }}" href="" class="{{ layer.attrs.id == current.attrs.id ? \'selected\' : \'\' }}" ng-repeat="layer in layers.slice().reverse()">{{ layer.className }}</a></div>',
			link : function(scope, element, attrs) {
				element.on('click', function(e) {
					var target = e.target;

					if (target.tagName === 'A') {
						scope.$parent.$broadcast('jpgLayerManagerSelection',
							{
								layerID : target.id
							}
						);
						return false;
					}
				});

				$document.on('keydown', function(e) {
					var shift = e.shiftKey,
						increment = 1,
						eventName,
						stopProp = false;

					if (utils.nothingFocused()) {
						// if focused in input or textarea do nothing
						if (shift) {
							increment = 10;
						}

						if (e.keyCode === 38 || e.keyCode === 37) { // up or left 
							increment = shift ? -10 : -1;
						}

						switch(e.keyCode) {
							case 38: // up
							case 40: //down
								eventName = 'jpgLayerMoveY';
								stopProp = true;
								break;
							case 39: // right
							case 37: // left
								eventName = 'jpgLayerMoveX';
								stopProp = true;
								break;
							case 8: // backspace
								eventName = 'jpgLayerDelete';
								stopProp = true;
								break;
						}

						if (scope.current) {
							scope.$parent.$broadcast(eventName,
								{
									shift : shift,
									increment : increment
								}
							);
						}

						// pass the event into the execute shortcut method to
						// check if there are any events
						utils.executeShortcut(e);

						if (stopProp) {
							e.preventDefault();
							return false;
						}
					}
				});
			}
		}
	}]).
	
	directive('jpgLayerHandles', ['$document', 'utils', '$rootScope', function($document, utils, $rootScope) {
		return {
			scope : {
				layer : '=',
			},
			template : '<a class="jpg_handle tl" data-dir="tl" href=""></a><a class="jpg_handle tr" data-dir="tr" href=""></a><a class="jpg_handle br" data-dir="br" href=""></a><a class="jpg_handle bl" data-dir="bl" href=""></a>' + 
					   '<a class="jpg_handle l point" data-dir="l" href="" style="top: {{layer.attrs.pointL[1] + layer.getY()}}px;left: {{layer.attrs.pointL[0] + layer.getX()}}px;"></a><a class="jpg_handle r point" data-dir="r" href="" style="top: {{layer.attrs.pointR[1] + layer.getY()}}px;left: {{layer.attrs.pointR[0] + layer.getX()}}px;"></a>',
			link : function(scope, element, attrs) {
				var $body = angular.element(document).find('body'),
					isResize;

				// artboardmouseup can come from the artboard or the handles
				$rootScope.$on('jpgArtboardMouseUp', function() {
					$document.off('mousemove');
					$body.removeClass('dragging');
					$body.removeClass('resizing');
					utils.ngApply(scope.$parent);
				});

				function handleDown(data) {
					if(scope.layer) {
						var tempX = data.evt.pageX,
							tempY = data.evt.pageY,
							tempLayerX = scope.layer.attrs.x,
							tempLayerY = scope.layer.attrs.y,
							tempWidth = scope.layer.attrs.width,
							tempHeight = scope.layer.attrs.height,
							isResize = data.evt.target.tagName == 'A' ? true : false,
							dir = angular.element(data.evt.target).attr('data-dir'),
							offset = scope.layer.attrs.strokeWidth ? scope.layer.attrs.strokeWidth/2 : 0,
							tempPointR = scope.layer.attrs.pointR,
							tempPointL = scope.layer.attrs.pointL;

						if (data.drawing) {
							isResize = true;
						}

						$document.on('mouseup', function() {
							$rootScope.$broadcast('jpgArtboardMouseUp');
						});

						$document.on('mousemove', function(evt) {
							var deltaX = evt.pageX - tempX,
								deltaY = evt.pageY - tempY,
								obj = {
									evt : evt,
									deltaX : deltaX,
									deltaY : deltaY,
									tempX : tempX,
									tempY : tempY,
									tempLayerX : tempLayerX,
									tempLayerY : tempLayerY,
									tempWidth : tempWidth,
									tempHeight : tempHeight,
									offset : offset,
									tempPointR : tempPointR,
									tempPointL : tempPointL,
									dir : dir,
									drawing : data.drawing ? data.drawing : false
								};

							if (isResize) {
								$body.addClass('resizing');
								scope.$parent.$broadcast('jpgLayerResize', obj);
							} else {
								$body.addClass('dragging');
								scope.$parent.$broadcast('jpgLayerMove', obj);
							}

							utils.ngApply(scope.$parent);
						});
					}
				}

				// the user might be clicking on the handles or on the html canvas/layer
				// this is to catch the instance where they click a layer thats already selected
				element.on('mousedown', function(evt) {
					handleDown({evt : evt});
				});

				$rootScope.$on('jpgArtboardMouseDown', function(e, data) {
					handleDown(data);
				});

				/* TODO: Add support for inline text edit
				element.on('dblclick', function() {
					if (scope.layer.className === 'Text') {
						var area = angular.element('<textarea class="edit_text"></textarea>');

						area.val(scope.layer.attrs.text);

						element.append(area);
					}
				}); */

				scope.$watchCollection('layer.attrs', function() {
					var stroke,
						style,
						w,
						h,
						x,
						y;

					if (scope.layer) {
						stroke =  scope.layer.attrs.strokeWidth ? scope.layer.attrs.strokeWidth : 0;
						style = 'width:' + ((scope.layer.attrs.width + (stroke)) + 4) + 'px;' +
								'height:' + ((scope.layer.attrs.height + (stroke)) + 4) + 'px;' +
								'top:' + (scope.layer.attrs.y - 2 - (stroke/2)) + 'px;' +
								'left:' + (scope.layer.attrs.x - 2 - (stroke/2)) + 'px;'; // stroke/2 because html canvas sets 0, 0 in the middle of the stroke

						element.attr('style', style);
					}
				});
			}
		}
	}]).

	directive('jpgToggle', ['$document', 'utils', function($document, utils) {
		return function(scope, element, attrs) {
			var cls = 'selected',
				$targ,
				toggle = function(el, targId) {
					var clickedToggleId = angular.element(el).attr('jpg-toggle'),
						show = function() {
							$targ.addClass(cls);
							element.addClass(cls);
						},
						hide = function() {
							$targ.removeClass(cls);
							element.removeClass(cls);
							$targ = null;
						};
					
					if (clickedToggleId === targId) {
						$targ = angular.element(document.getElementById(targId));

						if ($targ.hasClass(cls)) {
							hide();
						} else {
							show();
						}
					} else {
						if ($targ && el.tagName !== 'INPUT') {
							hide();
						}
					}

					return false;
				}

			if (attrs.jpgShortcut) {
				utils.addShortcut(attrs.jpgShortcut, function() {
					toggle(element, attrs.jpgToggle);
				});
			}

			$document.on('click', function(e) {
				toggle(e.target, attrs.jpgToggle)
			});
		}
	}]).

	directive('appVersion', ['version', function(version) {
		return function(scope, elm, attrs) {
			elm.text(version);
		};
	}]);