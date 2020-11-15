'use strict';

/* Services */

angular.module('myApp.services', []).
	value('version', 'Beta').

	factory('utils', ['$rootScope', function($rootScope) {
		return {
			ngApply : function($sc, func) {
				if(!$sc.$$phase && $sc) {
					if (func) {
						$sc.$apply(function() {
							func();
						});
					} else {
						$sc.$apply();
					}
				} else if (func) {
					func();
				}
			},

			getElDim : function(el) {
			    var _x = 0,
			    	_y = 0,
			    	_w = el.offsetWidth,
			    	_h = el.offsetHeight;

			    while(el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
			        _x += el.offsetLeft - el.scrollLeft;
			        _y += el.offsetTop - el.scrollTop;
			        el = el.offsetParent;
			    }

			    return {top: _y, left: _x, outerWidth: _w, outerHeight: _h};
			},

			getViewportDim : function() {
				var el = window, 
					attr = 'inner';

				if (!('innerWidth' in window)) {
					attr = 'client';
					el = document.documentElement || document.body;
				}

				return {width : el[ attr+'Width' ], height : el[ attr+'Height' ]}
			},

			gps : function(targ, anchor) {
				// position a menu relative to an anchor
				var $targ = angular.element(targ),
					targDim = this.getElDim(targ),
					anchorDim = this.getElDim(anchor),
					viewportDim = this.getViewportDim(),
					top = anchorDim.top - targDim.outerHeight,
					right = anchorDim.left + targDim.outerWidth,
					bottom = anchorDim.top + anchorDim.outerHeight + targDim.outerHeight,
					left = anchorDim.left - (targDim.outerWidth - anchorDim.outerWidth),
					maxH = viewportDim.height,
					maxW = viewportDim.width; 

				if (bottom > maxH) {
					// position to top
					if (top < 0) {
						top = 0;
					} else {
						top = top;
					}
				} else {
					// position to bottom
					top = anchorDim.top + anchorDim.outerHeight;
				}
				
				if (right > maxW) {
					// position align right
					if (left < 0) {
						left = 0;
					} else {
						left = left;
					}
				} else {
					// position align left
					left = anchorDim.left;
				}
				
				$targ.attr('style', 'top:' + top + 'px;left:' + left + 'px;');
			},

			setLeaveWarning : function() {
				var confirmOnPageExit = function () {
				    // If we haven't been passed the event get the window.event
				    var e = window.event;

				    var message = 'Lose unsaved work?';

				    // For IE6-8 and Firefox prior to version 4
				    if (e) {
				        e.returnValue = message;
				    }

				    // For Chrome, Safari, IE8+ and Opera 12+
				    return message;
				};

				window.onbeforeunload = confirmOnPageExit;
			},

			unsetLeaveWarning : function() {
				window.onbeforeunload = null;
			},
			// TODO: remove shortcut stuff from utils and let directives broadcast/listen accordingly
			addShortcut : function(key, func, meta) {
				if (typeof $rootScope.jpgKeys === 'undefined') {
					$rootScope.jpgKeys = [];
				}

				meta = meta ? meta : false;

				$rootScope.jpgKeys.push({keyCode : key, func : func, meta : meta});
			},

			executeShortcut : function(e) {
				var stopProp = false,
					meta = e.ctrlKey || e.metaKey || e.altKey;
				
				if (typeof $rootScope.jpgKeys !== 'undefined') {
					for (var i = 0, l = $rootScope.jpgKeys.length; i < l; i ++) {
						var cut = $rootScope.jpgKeys[i];

						if (e.keyCode == cut.keyCode) {
							if ((cut.meta && meta) || (!cut.meta && !meta)) {
								$rootScope.jpgKeys[i].func();
								stopProp = true;
							}
						}
					}
				}

				if (stopProp) {
					e.preventDefault();
					return false;
				}
			},

			nothingFocused : function() {
				return document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA';
			},

			domImg : function(src, callback) {
				var img = document.createElement('img');

				img.onload = function() {
					if (typeof callback === 'function') {
						callback(img);
					}
				}

				img.src = src;
			}
		}
	}]).

	factory('canvasApi', ['utils', '$rootScope', function(utils, $rootScope) {
		var _artboard = null,
			_uniqueLayerIndex = 0,
			_copyLayer = null;

		function _isNum(val) {
			return typeof val === 'number';
		}

		/*
		Kinetic JSON: All of the following have a width and height as well
		obj.attrs.width // artboard/stage (no bg color here)
		obj.children[0] // bgLayer
		obj.children[0].children[0] // bgLayer rectangle
		obj.children[0].children[0].attrs.fill // bgColor
		obj.children[1] // canvas
		*/

		/*
		** Kinetic Adjustments
		*/

		// Create new Icon class
		Kinetic.Icon = function(config) {
	        this._initIcon(config);
	    };

	    Kinetic.Icon.prototype = {
	        _initIcon: function(config) {
            	Kinetic.Text.call(this, config);
            	this.className = 'Icon';
            },
            syncSizes : function(val) {
            	var sW = typeof parseInt(this.getAttr('strokeWidth')) !== 'undefined' ? this.getAttr('strokeWidth') : 0;

            	this._setAttr('fontSize',val);
            	// plus 2 so the icon doesn't get cutoff and become invisible
            	this._setAttr('width',val+2);
            	this._setAttr('height',val+2);
            	this.textWidth = val;
            	console.log(this);
            },
            setFontSize : function(val) {
            	this.syncSizes(val);
            }
	    };

		Kinetic.Util.extend(Kinetic.Icon, Kinetic.Text);

		// Create new Arrow class
		Kinetic.Arrow = function(config) {
	        this._initArrow(config);
	    };

	    Kinetic.Arrow.prototype = {
	        _initArrow: function(config) {
            	Kinetic.Line.call(this, config);
            	this.className = 'Arrow';
            },
            setArrowRight : function(val) {
            	this._setAttr('arrowRight',val);
            	this.refreshArrows();
            },
            setArrowLeft : function(val) {
            	this._setAttr('arrowLeft',val);
            	this.refreshArrows();
            },
            setPointL : function(val) {
            	this._setAttr('pointL',val);
            },
            setPointR : function(val) {
            	this._setAttr('pointR',val);
            },
            refreshArrows : function() {
				var shape = this,
					points = shape.getPoints(),
					fromX = points[0].x,
					fromY = points[0].y,
					toX = points[1].x,
					toY = points[1].y,
					headlenR = shape.attrs.arrowRight ? shape.attrs.arrowRight : 0,
					headlenL = shape.attrs.arrowLeft ? shape.attrs.arrowLeft : 0,
					angle;
				
				if (points.length > 2) {
					// line has arrow point data, need to reset the drag points
					fromX = points[1].x;
					fromY = points[1].y;
					toX = points[4].x;
					toY = points[4].y;
				}
				
				angle = Math.atan2(toY-fromY,toX-fromX);
				
				//shape.setAttr('pointL', [fromX, fromY]);
				//shape.setAttr('pointR', [toX, toY]);
				shape.attrs.pointL = [fromX, fromY];
				shape.attrs.pointR = [toX, toY];
				
				shape.setPoints([
					fromX+headlenL*Math.cos(angle-Math.PI/6),
					fromY+headlenL*Math.sin(angle-Math.PI/6),
					fromX, 
					fromY, 
					fromX+headlenL*Math.cos(angle+Math.PI/6),
					fromY+headlenL*Math.sin(angle+Math.PI/6),
					fromX,
					fromY,
					toX, 
					toY, 
					toX-headlenR*Math.cos(angle-Math.PI/6),
					toY-headlenR*Math.sin(angle-Math.PI/6),
					toX, 
					toY, 
					toX-headlenR*Math.cos(angle+Math.PI/6),
					toY-headlenR*Math.sin(angle+Math.PI/6)
					]);
            }
	    };

		Kinetic.Util.extend(Kinetic.Arrow, Kinetic.Line);

		// Have to create a fake adjusted coordinate attribute to use in the input binding that is 
		// binded to the real coordinate to compensate for stroke alignment
		var overrideCoords = function(attr) {
			return function(val) {
				var diff = 0,
					upper = attr.toUpperCase(),
					offset = {};
				
				if (this.attrs.strokeWidth) {
					diff = this.attrs.strokeWidth/2;
				}

				if (this.className === 'Ellipse') {
					offset.x = -this.getWidth()/2;
					offset.y = -this.getHeight()/2;

					this.setOffset(offset);
				}
				
				this._setAttr(attr, val + diff);
				this._setAttr('adjusted' + upper, val);
				return this;
			}
		}

		var overrideDimension = function(attr) {
			return function(val) {
				var diff = 0,
					upper = attr.charAt(0).toUpperCase() + attr.slice(1),
					offset = {},
					trueDim;

				if (this.attrs.strokeWidth) {
					diff = this.attrs.strokeWidth;
				}

				trueDim = val - diff;

				if (val <= 0) {
					val = 1;
				}

				if (trueDim <= 0) {
					trueDim = 1;
				}

				//Kinetic.Node.prototype.setWidth.call(this,val-diff);
				this._setAttr(attr, trueDim);
				this._setAttr('adjusted' + upper, val);

				if (typeof this.setRadius !== 'undefined') {
					// is ellipse
					if (trueDim/2 < 1) {
						trueDim = 1;
					}
					
					if (attr === 'width') {
						this.setRadius({x : trueDim/2});
					} else if (attr === 'height') {
						this.setRadius({y : trueDim/2});
					}
				}
				return this;
			}
		}

		// Only overriding selected classes, don't want to change other entities that
		// inherit from the base shape class (like text)
		var cordCls = ['Rect', 'Ellipse', 'Image', 'Icon', 'Text'];
		for (var i = 0; i < cordCls.length; i++) {
			Kinetic[cordCls[i]].prototype['setAdjustedX'] = overrideCoords('x');
			Kinetic[cordCls[i]].prototype['setX'] = overrideCoords('x');
			Kinetic[cordCls[i]].prototype['setAdjustedY'] = overrideCoords('y');
			Kinetic[cordCls[i]].prototype['setY'] = overrideCoords('y');
			Kinetic[cordCls[i]].prototype['setWidth'] = overrideDimension('width');
			Kinetic[cordCls[i]].prototype['setHeight'] = overrideDimension('height');
			Kinetic[cordCls[i]].prototype['setAdjustedWidth'] = overrideDimension('width');
			Kinetic[cordCls[i]].prototype['setAdjustedHeight'] = overrideDimension('height');

			Kinetic[cordCls[i]].prototype['setStrokeWidth'] = function(val) {
				var w = this.getAttr('width'),
					h = this.getAttr('height'),
					sW = typeof parseInt(this.getAttr('strokeWidth')) !== 'undefined' ? this.getAttr('strokeWidth') : 0;

				this._setAttr('adjustedWidth', w+val);
				this._setAttr('adjustedHeight', h+val);
				
				this._setAttr('strokeWidth', val);
			}

			/*Kinetic[cordCls[i]].prototype['getWidth'] = function() {
				var a = this.attrs['adjustedWidth'];
				return void 0 === a ? 0 : a;
			};

			Kinetic[cordCls[i]].prototype['getHeight'] = function() {
				var a = this.attrs['adjustedHeight'];
				return void 0 === a ? 0 : a;
			};

			Kinetic[cordCls[i]].prototype['getX'] = function() {
				var a = this.attrs['adjustedX'];
				return void 0 === a ? 0 : a;
			};

			Kinetic[cordCls[i]].prototype['getY'] = function() {
				var a = this.attrs['adjustedY'];
				return void 0 === a ? 0 : a;
			};*/
		}

		// fix from: https://github.com/ericdrowell/KineticJS/issues/726
		var buffFunc = {
		    _useBufferCanvas: function () {
		        if (Kinetic.UA.browser === 'chrome')
		            return false;
		        else
		            return (this.hasShadow() || this.getAbsoluteOpacity() !== 1) && this.hasFill() && this.hasStroke() && this.getStage();
		    }
		};
		Kinetic.Util.addMethods(Kinetic.Rect, buffFunc);
		Kinetic.Util.addMethods(Kinetic.Text, buffFunc);
		Kinetic.Util.addMethods(Kinetic.Ellipse, buffFunc);
		Kinetic.Util.addMethods(Kinetic.Arrow, buffFunc);
		Kinetic.Util.addMethods(Kinetic.Image, buffFunc);
		Kinetic.Util.addMethods(Kinetic.Icon, buffFunc);

		return {
			getArtboard : function() {
				return _artboard;
			},

			getLayers : function() {
				return _artboard.canvas.children;
			},

			getArtboardJSON : function() {
				return _artboard.stage.toJSON();
			},

			updateArtboard : function() {
				_artboard.stage.draw();
			},

			/*
			 * Sets the artboard width, height, and fill color
			 */
			setArtboard : function(obj, json) {
				var layers,
					l_count = 0,
					_this = this,
					addLayer = function(l, c) {
						_this.addLayer(l.attrs, l.className, null, c);
					},
					addImage = function(l, c) {
						_this.addImage({src : l.attrs.src}, l.attrs, c);
					},
					processLayers = function() {
						if (l_count < layers.length) {
							if (layers[l_count].className === 'Image') {
								addImage(layers[l_count], function() {
									l_count ++;
									processLayers();
								});
							} else {
								addLayer(layers[l_count], function() {
									l_count ++;
									processLayers();
								});
							}
						}
					};

				if (_artboard === null || json) {
					layers = json.children[1].children;

					_artboard = {};

					_artboard.el = document.getElementById(obj.id);

					_artboard.el.style.width = obj.width + 'px';
					_artboard.el.style.height = obj.height + 'px';

					_artboard.stage = new Kinetic.Stage({
						container : obj.id,
						width : obj.width,
						height : obj.height
					});

					_artboard.bgLayer = new Kinetic.Layer();
					_artboard.bgShape = new Kinetic.Rect({
						id : 'bgLayer',
						x : 0,
						y : 0,
						width : obj.width,
						height : obj.height,
						fill : obj.fill
					});

					_artboard.canvas = new Kinetic.Layer();

					_artboard.bgLayer.add(_artboard.bgShape);
					_artboard.stage.add(_artboard.bgLayer);
					_artboard.stage.add(_artboard.canvas);

					// Process children layers
					// TODO: Artboard processing and saving does not work with iconfonts
					processLayers();
				} else {
					if (obj.width) {
						if (obj.width > 1500) {
							obj.width = 1500;
						}
						_artboard.stage.setWidth(obj.width);
						_artboard.canvas.setWidth(obj.width);
						_artboard.bgLayer.setWidth(obj.width);
						_artboard.bgShape.setWidth(obj.width);
						_artboard.el.style.width = obj.width + 'px';
					}

					if (obj.height) {
						if (obj.height > 1500) {
							obj.height = 1500;
						}
						_artboard.stage.setHeight(obj.height);
						_artboard.canvas.setHeight(obj.height);
						_artboard.bgLayer.setHeight(obj.height);
						_artboard.bgShape.setHeight(obj.height);
						_artboard.el.style.height = obj.height + 'px';
					}

					// if (obj.x) {
					// 	_artboard.stage.setOffsetX(obj.x);
					// }

					// if (obj.y) {
					// 	_artboard.stage.setOffsetY(obj.y);
					// }

					//_artboard.canvas.setOffsetX(obj.x);
					//_artboard.canvas.setOffsetY(obj.y);

					if (obj.type) {
						_artboard.type = obj.type;
					}

					if (obj.fill) {
						_artboard.bgShape.setFill(obj.fill);
					}
					
					_artboard.stage.draw();

					//_artboard.canvas.setOffsetX(0);
					//_artboard.canvas.setOffsetY(0);
					//_artboard.stage.draw();
					//_artboard.stage.setOffsetX(0);
					//_artboard.stage.setOffsetY(0);
					//_artboard.stage.draw();
				}
			},

			moveLayerUp : function(layer) {
				if (layer) {
					layer.moveUp();
					_artboard.stage.draw();
				}
			},

			moveLayerDown : function(layer) {
				if (layer) {
					layer.moveDown();
					_artboard.stage.draw();
				}
			},

			resizeLayerByMouse : function(data, layer) {
				var keepAspect = data.evt.shiftKey,
					maxWidth = 9999,
					maxHeight = 9999,
					l = layer ? layer : _artboard.currentLayer,
					canvasDim = utils.getElDim(_artboard.el),
					clz,
					newX,
					newY,
					newW,
					newH,
					oldW,
					oldH,
					divW,
					divH,
					ratio,
					x1,
					x2,
					y1,
					y2,
					negativeY = false,
					negativeX = false;

				function overTop() {
					if ((data.evt.pageY - canvasDim.top) < data.tempLayerY) {
						data.dir = 't';
						return true;
					} else {
						data.dir = 'b';
						return false;
					}
				}

				function overRight() {
					if ((data.evt.pageX - canvasDim.left) > data.tempLayerX + data.tempWidth) {
						data.dir += 'r';
						return true;
					} else {
						data.dir += 'l';
						return false;
					}
				}

				function overBottom() {
					if ((data.evt.pageY - canvasDim.top) > data.tempLayerY + data.tempHeight) {
						data.dir = 'b';
						return true;
					} else {
						data.dir = 't';
						return false;
					}
				}

				function overLeft() {
					if ((data.evt.pageX - canvasDim.left) < data.tempLayerX) {
						data.dir += 'l';
						return true;
					} else {
						data.dir += 'r';
						return false;
					}
				}

				if (l) {
					clz = l.className;
					oldW = l.attrs.width;
					oldH = l.attrs.height;

					if (clz === 'Arrow') {
						x1 = data.tempPointL ? data.tempPointL[0] : l.attrs.points[0].x;
						y1 = data.tempPointL ? data.tempPointL[1] : l.attrs.points[0].y;
						x2 = data.tempPointR ? data.tempPointR[0] : l.attrs.points[1].x;
						y2 = data.tempPointR ? data.tempPointR[1] : l.attrs.points[1].y;
						
						if (data.dir === 'r' || data.drawing) {
							l.setPoints([x1, y1, x2 + data.deltaX, y2 + data.deltaY]);
							l.refreshArrows();
						} else {
							l.setPoints([x1 + data.deltaX, y1 + data.deltaY, x2, y2]);
							l.refreshArrows();
						}

					} else {
						// make sure the shape is not 0 dimension or else divide by 0 issues
						if (data.tempWidth === 0) {
							data.tempWidth = 1;
						}

						if (data.tempHeight === 0) {
							data.tempHeight = 1;
						}
						// update the handle direction according to resizing negatives
						if (data.drawing || data.dir === 'br') {
							negativeY = overTop();
							negativeX = overLeft();
						} else if (data.dir === 'bl') {
							negativeY = overTop();
							negativeX = overRight();
						} else if (data.dir === 'tl') {
							negativeY = overBottom();
							negativeX = overRight();
						} else if (data.dir === 'tr') {
							negativeY = overBottom();
							negativeX = overLeft();
						}

						// update the delta to reflect that the user is resizing negative
						if (negativeX) {
							if (data.dir === 'br' || data.dir === 'tr') {
								data.tempLayerX  = data.tempLayerX + data.tempWidth;
								data.deltaX = data.deltaX - data.tempWidth;
							} else if (data.dir === 'bl' || data.dir === 'tl') {
								data.deltaX = data.deltaX + data.tempWidth;
							}
							
							data.tempWidth = 1;
						}

						if (negativeY) {
							if (data.dir === 'br' || data.dir === 'bl') {
								data.tempLayerY  = data.tempLayerY + data.tempHeight;
								data.deltaY = data.deltaY - data.tempHeight;
							} else if (data.dir === 'tl' || data.dir === 'tr') {
								data.deltaY = data.deltaY + data.tempHeight;
							}
							
							data.tempHeight = 1;
						}

						// make measurements based on those adjustments above
						switch (data.dir) {
							case 'br':
								newX = data.tempLayerX;
								newY = data.tempLayerY;
								newW = data.tempWidth + data.deltaX;
								newH = data.tempHeight + data.deltaY;
								break;
							case 'tl':
								newX = data.tempLayerX + data.deltaX;
								newY = data.tempLayerY + data.deltaY;
								newW = data.tempWidth - data.deltaX;
								newH = data.tempHeight - data.deltaY;
								break;
							case 'tr':
								newX = data.tempLayerX;
								newY = data.tempLayerY + data.deltaY;
								newW = data.tempWidth + data.deltaX;
								newH = data.tempHeight - data.deltaY;
								break;
							case 'bl':
								newX = data.tempLayerX + data.deltaX;
								newY = data.tempLayerY;
								newW = data.tempWidth - data.deltaX;
								newH = data.tempHeight + data.deltaY;
								break;
						}

						// TODO: Error when drawing while holding shift
						if (((keepAspect && clz !== 'Image') || clz === 'Icon') || (clz === 'Image' && data.evt.shiftKey === false)) {
							// keep aspect ratio if holding shift and layer is not an icon
							// keep aspect ratio if layer is an image and NOT holding shift (in other words, allow users to distort by holding shift)
							divW = newW/data.tempWidth;
							divH = newH/data.tempHeight;
							ratio = divW < divH ? divW : divH;
							newW = ratio * data.tempWidth;
							newH = ratio * data.tempHeight;

							switch(data.dir) {
								case 'tl':
									newX = data.tempLayerX + (data.tempWidth - newW);
									newY = data.tempLayerY + (data.tempHeight - newH);
									break;
								case 'tr':
									newY = data.tempLayerY + (data.tempHeight - newH);
									break;
								case 'bl':
									newX = data.tempLayerX + (data.tempWidth - newW);
									break;
							}
						}

						newW = newW < 1 ? 1 : newW;
						newH = newH < 1 ? 1 : newH;

						this.setLayerAttr('x', newX - data.offset, 'number');
						this.setLayerAttr('y', newY - data.offset, 'number');

						if (clz === 'Icon') {
							this.setLayerAttr('fontSize', newW, 'number');
						} else {
							this.setLayerAttr('width', newW, 'number');
							this.setLayerAttr('height', newH, 'number');
						}
					}
					_artboard.canvas.draw();
				}
			},

			moveLayerByMouse : function(data) {
				if (_artboard.currentLayer) {
					_artboard.currentLayer.setX(data.tempLayerX + data.deltaX - data.offset);
					_artboard.currentLayer.setY(data.tempLayerY + data.deltaY - data.offset);
					_artboard.canvas.draw();
				}
			},

			setLayerAttr : function(attr, val, type, layer, skipDraw) {
				layer = layer ? layer : _artboard.currentLayer;

				if (layer) {
					if (type === 'number') {
						val = Math.round(parseInt(val, 10));
					} else if (type === 'decimal') {
						val = Math.round(parseFloat(val) * 100) / 100;
					}
					
					layer.setAttr(attr, val);
					if (!skipDraw) {
						_artboard.stage.draw();
					}
				}
			},

			concatLayerAttr : function(attr, val, type, layer) {
				layer = layer ? layer : _artboard.currentLayer;

				if (layer) {
					var existing = layer.getAttr(attr);

					if (type === 'number') {
						val = Math.round(parseInt(val, 10));
					} else if (type === 'decimal') {
						val = Math.round(parseFloat(val) * 100) / 100;
					}

					layer.setAttr(attr, existing + val);
					_artboard.stage.draw();
				}
			},

			flipLayerX : function() {
				if (_artboard.currentLayer) {
					_artboard.currentLayer.setScaleX(-1);
					_artboard.currentLayer.setOffsetX(_artboard.currentLayer.getWidth());
					_artboard.currentLayer.setX(_artboard.currentLayer.getX() * -1);
					_artboard.stage.draw();
				}
			},
			
			flipLayerY : function() {
				if (_artboard.currentLayer) {
					_artboard.currentLayer.setScaleY(-1);
					_artboard.stage.draw();
				}
			},

			moveArrow : function(attr, val, target) {
				if (_artboard.currentLayer || target) {
					var target = target ? target : _artboard.currentLayer,
						points =  target.getPoints(),
						newPoints = [];
					
					for (var i = points.length - 1; i >= 0; i--) {
						if (attr === 'x') {
							newPoints.push(points[i].x += val);
							newPoints.push(points[i].y);
						} else {
							newPoints.push(points[i].x);
							newPoints.push(points[i].y += val);
						}
					};

					if (attr === 'x') {
						target.setPointL([target.attrs.pointL[0] + val, target.attrs.pointL[1]]);
						target.setPointR([target.attrs.pointR[0] + val, target.attrs.pointR[1]]);
					} else {
						target.setPointL([target.attrs.pointL[0], target.attrs.pointL[1] + val]);
						target.setPointR([target.attrs.pointR[0], target.attrs.pointR[1] + val]);
					}
					
					target.setPoints(newPoints)
					_artboard.stage.draw();
				}
			},

			deleteLayer : function(layer) {
				if (layer) {
					layer.remove();
					_artboard.stage.draw();
					this.deselectAllLayers();
				}
			},

			themeShape : {
				fill : 'transparent',
				stroke : 'red',
				strokeWidth : 4,
				arrowRight : 20,
				arrowLeft : 0,
				shadowEnabled : false
			},

			themeIcon : {
				stroke : 'transparent',
				strokeWidth : 0,
				fontSize : 50,
				width : 50,
				height : 50,
				fill : '#000000',
				shadowEnabled : false
			},

			themeText : {
				stroke : 'transparent',
				strokeWidth : 0,
				fontFamily : 'sans-serif',
				fontStyle : 'normal',
				fontSize : 18,
				lineHeight : 1.2,
				align : 'left',
				fill : '#000000',
				shadowEnabled : false,
			},

			themeImage : {
				stroke : 'transparent',
				strokeWidth : 0,
				opacity : 1,
				shadowEnabled : false
			},

			theme : function(type, obj) {
				var t;

				// add any shapes to this conditional since they inherit the base shape theme
				if (type === 'Rect' || type === 'Ellipse' || type === 'Arrow') {
					type = 'Shape';
				}
				
				t = this['theme' + type];

				// if a layer object is provided, reset the theme object
				// to use the layer object's attributes that are found in the theme
				if (obj) {
					for (var prop in t) {
						if (obj.attrs.hasOwnProperty(prop)) {
							t[prop] = obj.attrs[prop];
						}
					}
					return;
				}

				return t;
			},

			addTheme : function(obj, type) {
				var _theme = this.theme(type);

				for (var prop in _theme) {
					if (_theme.hasOwnProperty(prop)) {
						obj[prop] = _theme[prop];
					}
				}
			},

			getDefault : function(type, overrides) {
				var obj,
					w2 = _artboard.stage.getWidth()/2,
					h2 = _artboard.stage.getHeight()/2,
					defaultDims = {
						x : w2 - 75,
						y : h2 - 50,
						width : 150,
						height : 100,
					};

				switch(type) {
					case 'Image':
						obj = {};
						break;
					case 'Text':
						obj = defaultDims;
						obj.text = 'Edit this text to the left.';
						break;
					case 'Icon':
						obj = {
							x : w2 - 25,
							y : h2 - 20
						}
						break;
					case 'Rect':
						obj = {};
						break;
					case 'Ellipse':
						obj = {};
						break;
					case 'Arrow':
						obj = {
							points : [25, 25, 150, 25]
						}
						obj.lineCap = 'round';
						obj.lineJoin = 'round';
						break;
				}

				obj.opacity = 1;
				obj.draggable = true;

				this.addTheme(obj, type);

				if (overrides) {
					for (var prop in overrides) {
						if (overrides.hasOwnProperty(prop)) {
							obj[prop] = overrides[prop];
						}
					}
				}

				return obj;
			},

			/*
			** Note: "layer" in this api is just a node added to the canvas "layer"
			** (in kineticjs, a "layer" is a new HTML canvas, and we use two kinetic layers,
			** one for the background color of the artboard and one to hold all artwork)
			*/
			addLayer : function(obj, type, override, callback) {
				var layer;

				obj = obj ? obj : this.getDefault(type, override);
				obj.id = 'layer' + _uniqueLayerIndex;
				_uniqueLayerIndex ++;

				if (!type) {
					console.log('Must provide "type" when creating a new layer.');
					return;
				}
				
				if (type !== 'Arrow' && (typeof obj.strokeWidth !== 'undefined' && obj.strokeWidth > 0)) {
					obj.width += obj.strokeWidth;
					obj.height += obj.strokeWidth;
				}

				switch(type) {
					case 'Image':
						layer = new Kinetic.Image(obj);
						break;
					case 'Text':
						layer = new Kinetic.Text(obj);
						break;
					case 'Icon':
						layer = new Kinetic.Icon(obj);
						break;
					case 'Rect':
						layer = new Kinetic.Rect(obj);
						break;
					case 'Ellipse':
						layer = new Kinetic.Ellipse(obj);
						break;
					case 'Arrow':
						layer = new Kinetic.Arrow(obj);
						layer.attrs.pointL = [obj.points[0], obj.points[1]];
						layer.attrs.pointR = [obj.points[2], obj.points[3]];
						break;
				}

				_artboard.canvas.add(layer);
				_artboard.stage.draw();

				if (typeof callback === 'function') {
					callback();
				}

				return layer;
			},

			// image is the oddball out when adding layers
			// since the image has to load first, it needs a callback
			addImage : function(data, overrides, callback) {
				var img = document.createElement('img'),
					_this = this,
					newImg;

				if (data.src.indexOf('data:image') == 0 && /[A-Za-z0-9+/=]/.test(data.src)) {
					img.src = data.src;

					img.onload = function() {
						newImg = _this.getDefault('Image');

						newImg.x = (_artboard.stage.getWidth()/2) - (img.width/2);
						newImg.y = (_artboard.stage.getHeight()/2) - (img.height/2);
						newImg.image = img;
						newImg.width = img.width;
						newImg.height = img.height;

						if (overrides) {
							for (var prop in overrides) {
								if (overrides.hasOwnProperty(prop)) {
									newImg[prop] = overrides[prop];
								}
							}
						}

						// TODO: Kinda scary, artboards can get really huge.
						// either store the image as a file and store the href here
						// instead. Or just delete artboards within a day or so
						newImg.src = data.src;

						newImg = _this.addLayer(newImg, 'Image');
						
						if (typeof callback === 'function') {
							callback(newImg);
						}
					};
				} else {
					alert('Darn, we don\'t support that file type.');
				}
			},

			drawShape : function(data, type, callback) {
				var canvasDim = utils.getElDim(_artboard.el),
					overrides = {
						width : 0,
						height : 0,
						x : data.evt.pageX - canvasDim.left,
						y : data.evt.pageY - canvasDim.top
					},
					obj = this.getDefault(type, overrides);

				return this.addLayer(obj, type);
			},

			drawArrow : function(data, callback) {
				var canvasDim = utils.getElDim(_artboard.el),
					x = data.evt.pageX - canvasDim.left,
					y = data.evt.pageY - canvasDim.top,
					overrides = {
						points : [x, y, x, y]
					};
				
				var	obj = this.getDefault('Arrow', overrides);

				return this.addLayer(obj, 'Arrow');
			},

			setLayerByEvent : function(evt) {
				var layer = evt.targetNode;

				if (layer && layer.attrs.id !== 'bgLayer') {
					_artboard.currentLayer = layer;

					if (_artboard.currentLayer.attrs.strokeWidth) {
						// hack for stroke issue on select by mouse
						this.concatLayerAttr('x', -_artboard.currentLayer.attrs.strokeWidth)
						this.concatLayerAttr('y', -_artboard.currentLayer.attrs.strokeWidth)
					}
				} else {
					_artboard.currentLayer = null;
				}
			},

			setLayerByID : function(id) {
				var layer = _artboard.stage.find('#' + id)[0];

				if (layer && layer.attrs.id !== 'bgLayer') {
					_artboard.currentLayer = layer;
				} else {
					_artboard.currentLayer = null;
				}
			},

			deselectAllLayers : function() {
				_artboard.currentLayer = null;
			},

			getCurrentLayer : function() {
				return _artboard.currentLayer;
			},

			stageToDataURL : function(type, callback) {
				type = type ? type : 'image/jpg';

				_artboard.stage.toDataURL({
					mimeType : type,
					callback : callback
				});
			},

			stageToJSON : function(callback) {
				_artboard.stage.toJSON({
					callback : callback
				});
			},

			copyCurrentLayer : function() {
				if (_artboard.currentLayer) {
					_copyLayer = _artboard.currentLayer;
				}
			},

			pasteCopyLayer : function(callback) { // callback is used for images
				if (_copyLayer) {
					var cls = _copyLayer.className,
						toPaste = {},
						_this = this;

					function updatePasted(l) {
						if (l.className !== 'Arrow') {
							l.setX(l.getX() + 10);
							l.setY(l.getY() + 10);
						} else {
							_this.moveArrow('x', 10, l);
							_this.moveArrow('y', 10, l);
						}

						l.moveToTop();
						_artboard.stage.draw();
					}

					if (cls !== 'Image') {
						// we can't copy an image since ownerElement attribute
						// is deprecated in modern browsers and by trying to copy it
						// we get an error So for images, we just pass the src below
						toPaste = angular.copy(_copyLayer.attrs);

						// only need to update the id on layers other than images
						if (typeof toPaste.id !== 'undefined') {
							toPaste.id = 'layer' + _uniqueLayerIndex;
							_uniqueLayerIndex ++;
						}
					}

					switch(cls) {
						case 'Rect':
						case 'Ellipse':
						case 'Icon':
						case 'Text':
							toPaste = this.addLayer(toPaste, cls);
							break;
						case 'Arrow':
							toPaste.points = [toPaste.pointL[0], toPaste.pointL[1], toPaste.pointR[0], toPaste.pointR[1]];
							toPaste = this.addLayer(toPaste, cls);
							break;
						case 'Image':
							this.addImage({
								src : _copyLayer.attrs.image.src,
							}, {
								x : _copyLayer.attrs.x,
								y : _copyLayer.attrs.y
							}, function(l) {
								updatePasted(l);

								if (typeof callback !== 'undefined') {
									callback(l);
								}
							});

							return true;
							break;
					}

					updatePasted(toPaste);

					if (typeof callback !== 'undefined') {
						callback(toPaste);
					}
					return true;
				}
			}
		}
	}]).

	factory('DB', ['$q', function($q) {
		var _artboard = null,
			_connected = false,
			_preImageData = null,
			_sessionPreview = null,
			_defaultJSON = '{"attrs":{"width":500,"height":300},"type":"image/jpeg","className":"Stage","children":[{"attrs":{"width":640,"height":360},"className":"Layer","children":[{"attrs":{"x":0,"y":0,"width":640,"height":360,"fill":"#ffffff"},"className":"Rect"}]},{"attrs":{"width":640,"height":360},"className":"Layer","children":[]}]}';

		try {
			Parse.initialize("TLEOYqL4I2QgTX0GpEzg3oD1Xv6Q3s2MiVSAEcri", "JXPYsPUbIN6Noriyy6mLrFamiuilKsMOaIfoKgzN");
			// TODO: a more accurate way of detecting an internet connection, user could have Parse cached
			_connected = true;
		} catch (e) {
			_connected = false;
			console.log(e.message);
		}

		return {
			setSessionArtboard : function(artboard) {
				_artboard = artboard;
			},

			getSessionArtboard : function() {
				return _artboard;
			},

			getLiveArtboard : function() {

			},

			saveArtboard : function(field, value, artboard) {
				artboard = artboard ? artboard : _artboard;
				
				try {
					artboard.set(field, value);
					artboard.save();
					return true;
				} catch (e) {
					return e;
				}
			},

			/* 
			** This block of code is for when/if maj supports
			** saving artboards
			// Expects a live artboard. This means you have to query for the artboard from Parse and pass in the result
			savePreviewFile : function(data, type, json) {
				var _this = this;
				
				this.getArtboardFromID(_artboard.id, function(artboardResult) {
					var artboardPreviewID = artboardResult.get('preview'),
						img,
						Preview,
						preview;

					artboardResult.set('data', json);
					console.log(json);
					artboardResult.save().done(function() {
						try {
							img = new Parse.File("makeajpg", {base64 : data}, type);
							img.save().done(function() {
								_this.getPreviewFromID(artboardPreviewID, function(previewResult) {
									artboardResult.set('preview', previewResult.id);
									artboardResult.save().done(function() {
										try {
											previewResult.set('file', img);
											previewResult.save();
										} catch(e) {
											alert('Your image didn\'t save :( Try again.');
											console.log(e);
										}
									});
								}, true);
							}).fail(function() {
								alert('Aw shuckle. We can\'t save the file!');
							});
						} catch(e) {
							alert('Sorry something went wrong. Maybe let us know or try again.')
							return;
						}
					}).fail(function() {
						alert('Your artboard cannot be saved. Sorry.');
					});
				});
			},

			getArtboardFromID : function(id, callback) {
				var Artboard = Parse.Object.extend("Artboard"),
					query = new Parse.Query(Artboard);
				
				query.equalTo("objectId", id);

				query.find({
					success: function(results) {
						if (typeof callback === 'function') {
							callback(results[0]);
						}
						return results[0];
					},
					error: function(error) {
						alert('We are really sorry but something went wrong!');
						return;
					}
				});
			},
			*/

			getPreviewFromID : function(id, callback) {
				var Preview = Parse.Object.extend("Preview"),
					query = new Parse.Query(Preview),
					preview;
				
				query.equalTo("objectId", id);

				query.first({
					success: function(result) {
						if (typeof result !== 'undefined') {
							if (typeof callback === 'function') {
								callback(result);
							}
						} else {
							// create a new one if none are found
							preview = new Preview();

							preview.save().done(function() {
								if (typeof callback === 'function') {
									callback(preview);
								}
							}).fail(function() {
								alert('Sorry, we couldn\'t save your image.');
								if (typeof callback === 'function') {
									callback(null);
								}	
							});
						}
					},
					error: function(error) {					
						alert('Uh! Wow, so sorry. That didn\'t work. Try again.');
						if (typeof callback === 'function') {
							callback(null);
						}
					}
				});
			},

			getSessionPreviewID : function() {
				return _sessionPreview ? _sessionPreview.id : null;
			},

			getSessionPreview : function(callback) {
				var id = _sessionPreview ? _sessionPreview.id : '',
					_this = this;
				
				// getPreviewFromID will create a new one if one is not found
				this.getPreviewFromID(id, function(result) {
					_sessionPreview = result;

					callback(_sessionPreview);
				});
			},

			savePreviewFile : function(data, type, callback) {
				var img,
					_this = this;

				try {
					img = new Parse.File("makeajpg", {base64 : data}, type);
					img.save().done(function() {
						_this.getSessionPreview(function(sessionPreview) {
							if (sessionPreview !== null) {
								try {
									sessionPreview.set('file', img);
									sessionPreview.save().done(function() {
										if (typeof callback === 'function') {
											callback(true);
										}
									}).fail(function() {
										if (typeof callback === 'function') {
											callback(false);
										}
									});
								} catch(e) {
									alert('Dang nabbit. We could not save your image.');
								}
							}
						});
					}).fail(function() {
						alert('Aw shuckle. We can\'t save the file!');
					});
				} catch(e) {
					if (typeof callback === 'function') {
						callback(false);
					}
				}
			},

			newArtboard : function(callback) {
				// TODO: add throttle to prevent an attack
				var Artboard = Parse.Object.extend("Artboard"),
					artboard = new Artboard(),
					deffered = $q.defer();

				try {
					artboard.save({
						data : _defaultJSON,
						preview : ''
					}, {
						success : function(artboard) {
							deffered.resolve(artboard);
						},
						error : function(artboard, err) {
							deffered.reject(err);
						}
					});
				} catch(e) {
					deffered.reject(e);
				}

				return deffered.promise;
			},

			newTemporaryArtboard  : function() {
				var mockArtboard = {};

				mockArtboard.data = _defaultJSON;
				mockArtboard.preview = '';
				mockArtboard.id = 'temp';
				mockArtboard.get = function(attr) {
					if (typeof this[attr] !== 'undefined') {
						return this[attr];
					} else {
						return null;
					}
				}

				this.setSessionArtboard(mockArtboard);

				return this.getSessionArtboard();
			},

			getTemplates : function(id) {
				var Template = Parse.Object.extend("Template"),
					query = new Parse.Query(Template),
					deffered = $q.defer();

				try {
					query.find({
						success : function(templates) {
							deffered.resolve(templates)
						},
						error : function(templates, err) {
							deffered.reject(err);
						}
					});
				} catch(e) {
					deffered.reject(e);
				}

				return deffered.promise;
			},

			getTemplateByID : function(id) {
				var Template = Parse.Object.extend("Template"),
					query = new Parse.Query(Template),
					deffered = $q.defer();

				try {
					query.get(id, {
						success : function(template) {
							deffered.resolve(template)
						},
						error : function(template, err) {
							deffered.reject(err);
						}
					});
				} catch(e) {
					deffered.reject(e);
				}

				return deffered.promise;
			},

			isConnected : function() {
				if (typeof Parse !== 'undefined') {
					_connected = true;
				} else {
					_connected = false;
				}
				return _connected;
			},

			setPreImageData : function(data) {
				_preImageData = data;
			},

			getPreImageData : function(data) {
				return _preImageData;
			}
		};
	}]);
