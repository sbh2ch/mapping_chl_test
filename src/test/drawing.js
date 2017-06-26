/**
 * Created by kiost on 2017-06-26.
 */
/*!
 * drawing - v1.0.0 - 2017-04-27 08:53:43
 *
 * Copyright(c) 2017, NAVER corp, Team mantle <dl_mantle@navercorp.com>
 */
!function (t) {
    function e(o) {
        if (n[o])return n[o].exports;
        var i = n[o] = {i: o, l: !1, exports: {}};
        return t[o].call(i.exports, i, i.exports, e), i.l = !0, i.exports
    }

    var n = {};
    e.m = t, e.c = n, e.i = function (t) {
        return t
    }, e.d = function (t, n, o) {
        e.o(t, n) || Object.defineProperty(t, n, {configurable: !1, enumerable: !0, get: o})
    }, e.n = function (t) {
        var n = t && t.__esModule ? function () {
            return t.default
        } : function () {
            return t
        };
        return e.d(n, "a", n), n
    }, e.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, e.p = "", e(e.s = 11)
}([function (t, e, n) {
    "use strict";
    e.__esModule = !0, e.default = naver.maps ? naver.maps.__export() : null
}, function (t, e, n) {
    "use strict";
    e.__esModule = !0, e.DOC_EL = document.documentElement, e.KEY_CODES = {
        shift: 16,
        escape: 27
    }, e.ANCHOR_POINT_OPTIONS = {
        strokeColor: "#000",
        fillColor: "#fff",
        strokeWeight: 2,
        radius: 4
    }, e.MID_POINT_OPTIONS = {
        strokeColor: "#808080",
        fillColor: "#fff",
        strokeWeight: 2,
        radius: 4
    }, e.DEFAULT_CONTROL_POINT_OPTIONS = {
        anchorPointOptions: e.ANCHOR_POINT_OPTIONS,
        midPointOptions: e.MID_POINT_OPTIONS
    }, e.DRAWING_MODE = {
        HAND: 0,
        RECTANGLE: 1,
        ELLIPSE: 2,
        POLYLINE: 3,
        ARROWLINE: 4,
        POLYGON: 5,
        MARKER: 6
    }, e.DRAWING_STYLE = {
        HORIZONTAL: 1,
        VERTICAL: 2,
        HORIZONTAL_2: 3,
        VERTICAL_2: 4
    }, e.DRAWING_EVENT = {
        START: "drawing_start",
        ADD: "drawing_added",
        REMOVE: "drawing_removed",
        CANCLE: "drawing_cancled",
        SELECT: "drawing_selected"
    }, e.EDIT_STATE = {
        NONE: 0,
        ADD_POINT: 1,
        MOVE_POINT: 2,
        DRAW: 3
    }, e.ICON_SIZE = 28, e.CONTROL_POINT_DATA_ATTR = "_idx", e.MODE_TYPE_DATA_ATTR = "_dm", e.BUTTON_STATE = {
        DEFAULT: 0,
        HOVER: 1,
        ON: 2
    }, e.COLOR = {WHITE: "#ffffff", HOVER: "#f0f5ff"};
    var o = Math.floor(window.devicePixelRatio || 1) > 1 ? 2 : 1, i = 0 === window.location.protocol.indexOf("https"),
        r = i ? "https://ssl.pstatic.net/static" : "http://static.naver.net";
    e.ASSET_PATH = r + "/maps/mantle/drawing/" + o + "x/", e.SUBMODULES_INIT_EVENT = "__sbinit"
}, function (t, e, n) {
    "use strict";
    function o(t) {
        var e = {
            map: null,
            drawingControl: [a.DRAWING_MODE.RECTANGLE, a.DRAWING_MODE.ELLIPSE, a.DRAWING_MODE.POLYLINE, a.DRAWING_MODE.ARROWLINE, a.DRAWING_MODE.POLYGON, a.DRAWING_MODE.MARKER],
            drawingControlOptions: {position: naver.maps.Position.TOP_CENTER, style: a.DRAWING_STYLE.HORIZONTAL},
            drawingMode: a.DRAWING_MODE.HAND,
            controlPointOptions: {anchorPointOptions: a.ANCHOR_POINT_OPTIONS, midPointOptions: a.MID_POINT_OPTIONS},
            rectangleOptions: null,
            ellipseOptions: null,
            polygonOptions: null,
            polylineOptions: null,
            arrowlineOptions: null,
            markerOptions: null
        }, n = r({}, e, t);
        if (t) {
            var o = r({}, e.drawingControlOptions, t.drawingControlOptions),
                i = r({}, e.controlPointOptions, t.controlPointOptions);
            n.drawingControlOptions = o, n.controlPointOptions = i
        }
        return n
    }

    var i = this && this.__extends || function () {
            var t = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (t, e) {
                    t.__proto__ = e
                } || function (t, e) {
                    for (var n in e)e.hasOwnProperty(n) && (t[n] = e[n])
                };
            return function (e, n) {
                function o() {
                    this.constructor = e
                }

                t(e, n), e.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
            }
        }(), r = this && this.__assign || Object.assign || function (t) {
            for (var e, n = 1, o = arguments.length; n < o; n++) {
                e = arguments[n];
                for (var i in e)Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
            }
            return t
        };
    e.__esModule = !0;
    var s = n(0), a = n(1), l = n(9), d = n(10), p = n(8), h = function (t) {
        function e(e) {
            var n = t.call(this) || this;
            return s.default.Event.trigger(naver.maps, a.SUBMODULES_INIT_EVENT, n), n._overlays = {}, n._overlayListener = {}, n._drawingModeListener = n.addListener("drawingMode_changed", s.default.bind(n._drawingMode_changed, n)), n._contextMenu = new p.ContextMenu, n._drawingTool = new d.DrawingTool(n), n._drawingControl = new l.DrawingControl(n), n.setOptions(o(e)), n._init(), n
        }

        return i(e, t), e.prototype._init = function () {
            var t = this;
            this._toolListener = this._drawingTool.addListener(a.DRAWING_EVENT.ADD, function (e) {
                t._onDrawingAdded(e);
                var n = e.name + "Added";
                t.trigger(n, e), t.trigger(a.DRAWING_EVENT.ADD, e)
            }), this._contextMenuListener = this._contextMenu.addListener(a.DRAWING_EVENT.REMOVE, function (e) {
                t.removeDrawing(e)
            }), this._keyListeners = [s.default.Event.addDOMListener(a.DOC_EL, "keydown", function (e) {
                return t._onKeydown(e)
            }), s.default.Event.addDOMListener(a.DOC_EL, "keyup", function (e) {
                return t._onKeyup(e)
            })]
        }, e.prototype.getMap = function () {
            return this.get("map")
        }, e.prototype.setMap = function (t) {
            t ? (this._addMapListener(t), this._setOverlayClickable(!0)) : (this._removeMapListener(), this._setOverlayClickable(!1)), this._drawingControl.setMap(t), this._contextMenu.setMap(t), this.set("map", t)
        }, e.prototype._addMapListener = function (t) {
            var e = this;
            this._mapListener = t.addListener("click", function () {
                e._stopEditing()
            })
        }, e.prototype._removeMapListener = function () {
            this.removeListener(this._mapListener), this._mapListener = null
        }, e.prototype.destroy = function () {
            this.setMap(null), this.removeListener(this._drawingModeListener), this.removeListener(this._toolListener), this.removeListener(this._contextMenuListener), this._drawingModeListener = null, this._toolListener = null, this._contextMenuListener = null, this._drawingControl.destroy(), this._drawingTool.destroy(), this._contextMenu.destroy(), this._drawingControl = null, this._drawingTool = null, this._contextMenu = null, s.default.Event.removeDOMListener(this._keyListeners), this._keyListeners = null;
            var t = this.getDrawings();
            for (var e in t)this._removeDrawing(e);
            this._overlays = null, this._overlayListener = null, s.default.Event.clearInstanceListeners(this)
        }, e.prototype.getDrawings = function () {
            return this._overlays
        }, e.prototype.toGeoJson = function () {
            var t, e, n = this.getDrawings(), o = [], i = [];
            for (var r in n)if (n.hasOwnProperty(r)) {
                var a = n[r];
                a.getBounds ? o.push(a) : i.push(a)
            }
            for (var l = 0; l < o.length; l++) {
                var a = o[l];
                e ? (e.features.push(a.toFeature()), t = t.union(a.getBounds())) : (e = a.toGeoJson(), t = a.getBounds())
            }
            for (var l = 0; l < i.length; l++) {
                var a = i[l], d = a.getPosition();
                e ? (e.features.push(a.toFeature()), t = t.extend(d)) : (e = a.toGeoJson(), t = new s.default.PointBounds(d, d))
            }
            if (e && t) e.bbox = t.getMin().toArray().concat(t.getMax().toArray()); else {
                var p = this.get("map").getBounds();
                e = {bbox: p.getMin().toArray().concat(p.getMax().toArray())}
            }
            return e
        }, e.prototype.getDrawing = function (t) {
            return this._overlays[t]
        }, e.prototype.addDrawing = function (t, e, n) {
            var o;
            for (var i in a.DRAWING_MODE)if (e === a.DRAWING_MODE[i]) {
                o = i.toLowerCase();
                break
            }
            t.setOptions({
                id: n || null,
                name: o,
                map: this.getMap()
            }), this._addDrawing(t), this.get("map") && this.get("drawingMode") === a.DRAWING_MODE.HAND && t.setClickable(!0)
        }, e.prototype.removeDrawing = function (t) {
            this._stopEditing();
            var e = t;
            "string" == typeof t && (e = this.getDrawing(t)), this._removeDrawing(e.id);
            var n = e.name + "Removed";
            this.trigger(n, e), this.trigger(a.DRAWING_EVENT.REMOVE, e)
        }, e.prototype.getOptions = function (t) {
            return this.get(t)
        }, e.prototype.setOptions = function (t, e) {
            if ("string" == typeof t) {
                var n = t;
                if ("map" === t)return void this.setMap(e);
                if ("drawingControlOptions" === t && e) {
                    var o = this.get("drawingControlOptions");
                    e.position = e.position || o.position || naver.maps.Position.TOP_CENTER, e.style = e.style || o.style || a.DRAWING_STYLE.HORIZONTAL
                }
                this.set(n, e)
            } else for (var n in t)this.setOptions(n, t[n])
        }, e.prototype._drawingMode_changed = function (t) {
            this.get("map") && (this._stopEditing(), 0 !== t ? this._setOverlayClickable(!1) : this._setOverlayClickable(!0))
        }, e.prototype._addDrawing = function (t) {
            var e = this;
            t.id || (t.id = s.default.guid()), this._overlays[t.id] = t, this._overlayListener[t.id] = [t.addListener("click", function (t) {
                e._onClickOverlay(t)
            }), t.addListener("rightclick", function (t) {
                e._onRightclickOverlay(t)
            })]
        }, e.prototype._removeDrawing = function (t) {
            this.removeListener(this._overlayListener[t]), delete this._overlayListener[t], this._overlays[t].setMap(null), this._overlays[t] = null, delete this._overlays[t]
        }, e.prototype._startEditing = function (t) {
            this._stopEditing(), t.setEditable(!0, this.get("controlPointOptions")), this._currentEditingOverlay = t;
            var e = t.name + "Selected";
            this.trigger(e, t), this.trigger(a.DRAWING_EVENT.SELECT, t)
        }, e.prototype._stopEditing = function () {
            this._currentEditingOverlay && (this._currentEditingOverlay.setEditable(!1), this._currentEditingOverlay = null)
        }, e.prototype._onDrawingAdded = function (t) {
            this._addDrawing(t), this.set("drawingMode", a.DRAWING_MODE.HAND)
        }, e.prototype._setOverlayClickable = function (t) {
            if (this.getDrawings()) {
                var e = this.getDrawings();
                for (var n in e)e[n].setClickable(t)
            }
        }, e.prototype._onClickOverlay = function (t) {
            this.get("map") && this._currentEditingOverlay !== t.overlay && t.overlay.setEditable && this._startEditing(t.overlay)
        }, e.prototype._onRightclickOverlay = function (t) {
            this.get("map") && this._contextMenu.show(t.overlay, t.coord)
        }, e.prototype._onKeydown = function (t) {
            t = s.default.DOMEvent.fix(t);
            var e = t.which;
            for (var n in a.KEY_CODES)if (a.KEY_CODES.hasOwnProperty(n) && e === a.KEY_CODES[n]) {
                this.set(n, !0), this._currentEditingOverlay && this._currentEditingOverlay.set(n, !0);
                break
            }
        }, e.prototype._onKeyup = function (t) {
            t = s.default.DOMEvent.fix(t);
            var e = t.which || t.keyCode;
            for (var n in a.KEY_CODES)if (a.KEY_CODES.hasOwnProperty(n) && e === a.KEY_CODES[n]) {
                this.set(n, null), this._currentEditingOverlay && this._currentEditingOverlay.set(n, null);
                break
            }
        }, e
    }(s.default.KVO);
    e.DrawingManager = h
}, function (t, e, n) {
    "use strict";
    var o = this && this.__extends || function () {
            var t = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (t, e) {
                    t.__proto__ = e
                } || function (t, e) {
                    for (var n in e)e.hasOwnProperty(n) && (t[n] = e[n])
                };
            return function (e, n) {
                function o() {
                    this.constructor = e
                }

                t(e, n), e.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
            }
        }();
    e.__esModule = !0;
    var i = n(0), r = function (t) {
        function e() {
            return null !== t && t.apply(this, arguments) || this
        }

        return o(e, t), e.prototype._createControlPoints = function () {
            for (var t = this.getPath().getLength(), e = 0; e < t; e++) {
                if (e > 0) {
                    var n = e - 1 + "," + e;
                    this.addMidPoint(n)
                }
                this.addControlPoint(e)
            }
            this.addMidPoint("len,0")
        }, e.prototype.getProjectedPath = function () {
            return this._project(this.getPaths()).paths[0]
        }, e.prototype._drawControlPoints = function () {
            for (var t = this.getShape().options.paths[0], e = this.__selectedMidPointIdx && 2 * this.__selectedMidPointIdx - 1, n = this.getControlPoints(), o = 0, i = n.length; o < i; o++) {
                var r = n[o], s = e && o > e, a = void 0, l = void 0;
                if (o % 2 == 0) a = s ? o / 2 + 1 : o / 2, l = t[a]; else if (o === e) a = Math.ceil(o / 2), l = t[a]; else {
                    a = s ? Math.ceil(o / 2) : Math.floor(o / 2);
                    var d = t[a], p = t[a + 1] || t[0];
                    l = d.clone().add(p).div(2, 2)
                }
                r.setCenter(l)
            }
        }, e.prototype._onDownMidPoint = function (t, e) {
            0 === t && (t = this.getPath().getLength()), this.__selectedMidPointIdx = t, this.getPath().insertAt(t, e)
        }, e.prototype._onMoveMidPoint = function (t, e) {
            0 === t && (t = this.getPath().getLength() - 1), this.getPath().setAt(t, e)
        }, e.prototype._onUpMidPoint = function () {
            if (this.__selectedMidPointIdx = null, !this.get("escape")) {
                var t = this.getPath().getLength() - 1;
                this.addMidPoint(t - 1 + "," + t), this.addControlPoint(t), this._drawControlPoints()
            }
        }, e
    }(i.default.Polygon);
    e.EditablePolygon = r
}, function (t, e, n) {
    "use strict";
    var o = this && this.__extends || function () {
            var t = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (t, e) {
                    t.__proto__ = e
                } || function (t, e) {
                    for (var n in e)e.hasOwnProperty(n) && (t[n] = e[n])
                };
            return function (e, n) {
                function o() {
                    this.constructor = e
                }

                t(e, n), e.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
            }
        }();
    e.__esModule = !0;
    var i = n(0), r = n(1), s = function (t) {
        function e() {
            return null !== t && t.apply(this, arguments) || this
        }

        return o(e, t), e.prototype._onAfterDraw = function () {
            this.get("editable") && this._drawControlPoints()
        }, e.prototype.isValid = function () {
            return this.getPath().getLength() > 1
        }, e.prototype.updateLastPath = function (t) {
            var e = this.getPath();
            e.pop(), e.push(t)
        }, e.prototype.updateLastOrthogonalPath = function (t) {
            var e = this.getPath(), n = e.getAt(e.getLength() - 2);
            this.updateLastPath(this._getOrthogonalCoord(n, t))
        }, e.prototype.addPath = function (t) {
            this.getPath().push(t)
        }, e.prototype.removeLastPath = function () {
            this.getPath().pop()
        }, e.prototype._getOrthogonalCoord = function (t, e) {
            var n = i.default.Math.getVector(t, e);
            return Math.abs(n.x) > Math.abs(n.y) ? new i.default.Point(e.x, t.y) : new i.default.Point(t.x, e.y)
        }, e.prototype._createControlPoints = function () {
            for (var t = this.getPath().getLength(), e = 0; e < t; e++) {
                if (e > 0) {
                    var n = e - 1 + "," + e;
                    this.addMidPoint(n)
                }
                this.addControlPoint(e)
            }
        }, e.prototype._drawControlPoints = function () {
            for (var t = this.getShape().options.path, e = this.__selectedMidPointIdx && 2 * this.__selectedMidPointIdx - 1, n = this.getControlPoints(), o = 0, i = n.length; o < i; o++) {
                var r = n[o], s = e && o > e, a = void 0, l = void 0;
                if (o % 2 == 0) a = s ? o / 2 + 1 : o / 2, l = t[a]; else if (o === e) a = Math.ceil(o / 2), l = t[a]; else {
                    a = s ? Math.ceil(o / 2) : Math.floor(o / 2);
                    var d = t[a], p = t[a + 1];
                    l = d.clone().add(p).div(2, 2).round()
                }
                r.setCenter(l)
            }
        }, e.prototype._onDownControlPoint = function (t, e) {
            this.__selectedPoint = {idx: t, coord: this.getPath().getAt(t).clone()}
        }, e.prototype._onMoveControlPoint = function (t, e) {
            var n = this.getPath(), o = n.getAt(t - 1) || n.getAt(t + 1);
            this.get("shift") ? n.setAt(t, this._getOrthogonalCoord(o, e.coord)) : n.setAt(t, e.coord)
        }, e.prototype._setOverayShape = function (t) {
            for (var e = this.getMap().getProjection(), n = this.getProjectedPath(), o = [], i = 0, r = n.length; i < r; i++) {
                var s = n[i];
                o.push(e.fromOffsetToCoord(s.add(t)))
            }
            this.setPath(o)
        }, e.prototype.getProjectedPath = function () {
            return this._project(this.getPath()).path
        }, e.prototype._onDownMidPoint = function (t, e) {
            this.__selectedMidPointIdx = t, this.getPath().insertAt(t, e)
        }, e.prototype._onMoveMidPoint = function (t, e) {
            this.getPath().setAt(t, e)
        }, e.prototype._onUpMidPoint = function () {
            if (this.__selectedMidPointIdx = null, this.__selectedPoint = null, !this.get("escape")) {
                var t = this.getPath().getLength() - 1;
                this.addMidPoint(t - 1 + "," + t), this.addControlPoint(t), this._drawControlPoints()
            }
        }, e.prototype.escape_changed = function (t) {
            this.get("escape") && this.cancelEditing()
        }, e.prototype.cancelEditing = function () {
            var t = this.get("_editState");
            if (t)if (t === r.EDIT_STATE.MOVE_POINT) {
                var e = this.__selectedPoint.idx, n = this.__selectedPoint.coord;
                this.cleanUpMovePoint(), this.getPath().setAt(e, n)
            } else if (t === r.EDIT_STATE.ADD_POINT) {
                var o = this.__selectedMidPointIdx;
                delete this.__selectedMidPointIdx, this.cleanUpAddPoint(), this.getPath().removeAt(o)
            }
        }, e
    }(i.default.Polyline);
    e.EditablePolyline = s
}, function (t, e, n) {
    "use strict";
    var o = this && this.__extends || function () {
            var t = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (t, e) {
                    t.__proto__ = e
                } || function (t, e) {
                    for (var n in e)e.hasOwnProperty(n) && (t[n] = e[n])
                };
            return function (e, n) {
                function o() {
                    this.constructor = e
                }

                t(e, n), e.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
            }
        }();
    e.__esModule = !0;
    var i = n(0), r = n(1), s = ["lb", "rb", "rt", "lt"], a = function (t) {
        function e() {
            return null !== t && t.apply(this, arguments) || this
        }

        return o(e, t), e.prototype._onAfterDraw = function () {
            this.get("editable") && this._drawControlPoints()
        }, e.prototype.setCorners = function (t, e) {
            var n = this.getProjection(), o = n.fromCoordToOffset(t).round(), r = n.fromCoordToOffset(e).round(),
                s = i.default.PointBounds.bounds(o, r), a = s.getMin(), l = s.getMax(),
                d = n.fromOffsetToCoord(new i.default.Point(a.x, l.y)),
                p = n.fromOffsetToCoord(new i.default.Point(l.x, a.y)), h = new i.default.PointBounds(d, p);
            this.setBounds(h)
        }, e.prototype.setSquareCorners = function (t, e) {
            var n = this.getProjection(), o = n.fromCoordToOffset(t).round(), i = n.fromCoordToOffset(e).round(),
                r = this._calcSquareBoundsWithOffset(o, i);
            this.setBounds(r)
        }, e.prototype.getControlPointsOffset = function () {
            var t = this.getShape().options, e = t.minBoundPoint, n = t.maxBoundPoint;
            return [new i.default.Point(e.x, n.y), n, new i.default.Point(n.x, e.y), e]
        }, e.prototype._createControlPoints = function () {
            for (var t = 0, e = s.length; t < e; t++)this.addControlPoint(t)
        }, e.prototype._drawControlPoints = function () {
            for (var t = this.getControlPointsOffset(), e = this.getControlPoints(), n = 0, o = e.length; n < o; n++) {
                e[n].setCenter(t[n])
            }
        }, e.prototype._onDownControlPoint = function (t, e) {
            this.__diagonalOffset = this._getDiagonalOffset(t), this.__selectedPoint = {offset: this._getCornerOffset(t)}
        }, e.prototype._onMoveControlPoint = function (t, e) {
            var n;
            n = this.get("shift") ? this._calcSquareBoundsWithOffset(this.__diagonalOffset, e.offset) : this._calcBoundsWithOffset(this.__diagonalOffset, e.offset), this.setBounds(n)
        }, e.prototype._onUpControlPoint = function () {
            this.__selectedPoint = null, this.__diagonalOffset = null
        }, e.prototype._setOverayShape = function (t) {
            var e = this._calcBoundsWithOffsetDelta(t);
            this.setBounds(e)
        }, e.prototype._getDiagonalIdx = function (t) {
            return t < 2 ? t + 2 : t - 2
        }, e.prototype._getDiagonalOffset = function (t) {
            var e = this._getDiagonalIdx(t);
            return this.getControlPointsOffset()[e]
        }, e.prototype._getCornerOffset = function (t) {
            return this.getControlPointsOffset()[t]
        }, e.prototype._calcBoundsWithOffsetDelta = function (t) {
            var e = this.getProjection(), n = this.getShape().options, o = n.minBoundPoint.add(t),
                r = n.maxBoundPoint.add(t), s = e.fromOffsetToCoord(new i.default.Point(o.x, r.y)),
                a = e.fromOffsetToCoord(new i.default.Point(r.x, o.y));
            return new i.default.PointBounds(s, a)
        }, e.prototype._calcBoundsWithOffset = function (t, e) {
            var n = this.getProjection(), o = i.default.PointBounds.bounds(t, e), r = o.getMin(), s = o.getMax(),
                a = n.fromOffsetToCoord(new i.default.Point(r.x, s.y)),
                l = n.fromOffsetToCoord(new i.default.Point(s.x, r.y));
            return new i.default.PointBounds(a, l)
        }, e.prototype._calcSquareBoundsWithOffset = function (t, e) {
            var n = i.default.Math.getVector(t, e), o = Math.abs(n.x), r = Math.abs(n.y), s = e.clone();
            return o > r ? t.x < e.x ? s.x = e.x - (o - r) : s.x = e.x + (o - r) : t.y < e.y ? s.y = e.y - (r - o) : s.y = e.y + (r - o), this._calcBoundsWithOffset(t, s)
        }, e.prototype.escape_changed = function (t) {
            this.get("escape") && this.get("_editState") === r.EDIT_STATE.MOVE_POINT && this.cancelEditing()
        }, e.prototype.cancelEditing = function () {
            if (this.get("_editState")) {
                var t = this._calcBoundsWithOffset(this.__diagonalOffset, this.__selectedPoint.offset);
                this.cleanUpMovePoint(), this.setBounds(t)
            }
        }, e
    }(i.default.Rectangle);
    e.EditableRectangle = a
}, function (t, e, n) {
    "use strict";
    var o = this && this.__extends || function () {
            var t = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (t, e) {
                    t.__proto__ = e
                } || function (t, e) {
                    for (var n in e)e.hasOwnProperty(n) && (t[n] = e[n])
                };
            return function (e, n) {
                function o() {
                    this.constructor = e
                }

                t(e, n), e.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
            }
        }();
    e.__esModule = !0;
    var i = n(0), r = n(1), s = function (t) {
        function e() {
            return null !== t && t.apply(this, arguments) || this
        }

        return o(e, t), e.prototype.setEditable = function (t, e) {
            this.get("editable") !== t && (t ? (this._controlPointOptions = e || r.DEFAULT_CONTROL_POINT_OPTIONS, this._createControlPoints(), this._drawControlPoints(), this._addEditListener()) : (this.get("_editState") && this.cancelEditing(), this._removeEditListener(), this._removeControlPoints(), this._controlPointOptions = null), this.set("editable", t))
        }, e.prototype.getEditable = function () {
            return this.get("editable")
        }, e.prototype.draw = function () {
            this.getMap() && (this._draw(), this._onAfterDraw && this._onAfterDraw())
        }, e.prototype._setControlPointsOptions = function () {
            (this instanceof i.default.Polyline || this instanceof i.default.Polygon) && (this._hasMidPoint = !0)
        }, e.prototype._initControlPoints = function () {
            this._controlPoints || (this._setControlPointsOptions(), this._controlPoints = [])
        }, e.prototype.addControlPoint = function (t) {
            this._initControlPoints();
            var e = new i.default.shapes.Circle(this._controlPointOptions.anchorPointOptions), n = e.getShapeElement();
            n.setAttribute(r.CONTROL_POINT_DATA_ATTR, t), this._hasMidPoint ? this._controlPoints.splice(2 * t, 0, e) : this._controlPoints.splice(t, 0, e), this.getWrapElement().appendChild(n)
        }, e.prototype.getControlPoints = function () {
            return this._controlPoints
        }, e.prototype.addMidPoint = function (t) {
            if (this._initControlPoints(), this._hasMidPoint) {
                var e = new i.default.shapes.Circle(this._controlPointOptions.midPointOptions), n = e.getShapeElement(),
                    o = t.split(",");
                if (n.setAttribute(r.CONTROL_POINT_DATA_ATTR, t), "len" === o[0]) this._controlPoints.push(e); else {
                    var s = 2 * o[0] + 1;
                    this._controlPoints.splice(s, 0, e)
                }
                this.getWrapElement().appendChild(n)
            }
        }, e.prototype._removeControlPoints = function () {
            for (var t = this.getWrapElement(), e = 0, n = this._controlPoints.length; e < n; e++) {
                var o = this._controlPoints[e];
                t.removeChild(o.getShapeElement(0)), o = null
            }
            this._controlPoints = null, this._hasMidPoint = null
        }, e.prototype._addEditListener = function () {
            var t = this;
            this._overlayDListener = i.default.Event.addDOMListener(this.getWrapElement(), "mousedown", function (e) {
                e = i.default.DOMEvent.fix(e);
                var n = e.target.getAttribute(r.CONTROL_POINT_DATA_ATTR);
                if (!n)return void t._moveOverlay(e);
                n.indexOf(",") > -1 ? t.get("_editState") === r.EDIT_STATE.ADD_POINT ? (t._onUpMidPoint && t._onUpMidPoint(), t.cleanUpAddPoint()) : t._addPoint(n, e) : t.get("_editState") === r.EDIT_STATE.MOVE_POINT ? (t._onUpControlPoint && t._onUpControlPoint(), t.cleanUpMovePoint()) : t._movePoint(n, e)
            })
        }, e.prototype._removeEditListener = function () {
            i.default.Event.removeDOMListener(this._overlayDListener), this._overlayDListener = null
        }, e.prototype._addPoint = function (t, e) {
            var n = this, o = this.getMap(), s = o.getMapView(), a = o.getMapAction(), l = t.split(","),
                d = parseInt(l[1], 10), p = o.getMapView().getMapOffset(),
                h = new i.default.Point(e.pageX, e.pageY).sub(p).sub(this.get("containerTopLeft")),
                c = o.getProjection().fromOffsetToCoord(h);
            o.setOptions("draggable", !1), this._onDownMidPoint && this._onDownMidPoint(d, c), this._addingPointListeners = [s.addListener("mousemove", function (t) {
                t = a.fromEventToPointerEvent(t), n._onMoveMidPoint && n._onMoveMidPoint(d, t.coord)
            }), s.addListener("mouseup", function () {
                n._onUpMidPoint && n._onUpMidPoint(), n.cleanUpAddPoint(), o.setOptions("draggable", !0)
            })], this.set("_editState", r.EDIT_STATE.ADD_POINT)
        }, e.prototype._movePoint = function (t, e) {
            var n = this, o = this.getMap(), i = o.getMapView(), s = o.getMapAction();
            t = parseInt(t, 10), o.setOptions("draggable", !1), this._onDownControlPoint && this._onDownControlPoint(t, e), this._movingPointListeners = [i.addListener("mousemove", function (e) {
                e = s.fromEventToPointerEvent(e), n._onMoveControlPoint && n._onMoveControlPoint(t, e)
            }), i.addListener("mouseup", function () {
                n._onUpControlPoint && n._onUpControlPoint(), n.cleanUpMovePoint(), o.setOptions("draggable", !0)
            })], this.set("_editState", r.EDIT_STATE.MOVE_POINT)
        }, e.prototype.cleanUpMovePoint = function () {
            this.removeListener(this._movingPointListeners), this._movingPointListeners = null, this.set("_editState", r.EDIT_STATE.NONE)
        }, e.prototype.cleanUpAddPoint = function () {
            this.removeListener(this._addingPointListeners), this._addingPointListeners = null, this.set("_editState", r.EDIT_STATE.NONE)
        }, e.prototype._moveOverlay = function (t) {
            var e = this, n = this.getMap(), o = (n.getProjection(), t), s = new i.default.Point(o.pageX, o.pageY);
            n.setOptions({draggable: !1, scrollWheel: !1});
            var a, l = this.getWrapElement(), d = parseInt(l.style.left, 10), p = parseInt(l.style.top, 10);
            this._docListeners = [i.default.Event.addDOMListener(r.DOC_EL, "mousemove", function (t) {
                var e = i.default.DOMEvent.fix(t), n = new i.default.Point(e.pos().pageX, e.pos().pageY);
                a = n.clone().sub(s), l.style.left = d + a.x + "px", l.style.top = p + a.y + "px"
            }), i.default.Event.addDOMListener(r.DOC_EL, "mouseup", function (t) {
                e._setOverayShape(a), i.default.Agent.browser.msie && 8 === i.default.Agent.browser.version && (l.style.left = "0px", l.style.top = "0px"), i.default.Event.removeDOMListener(e._docListeners), e._docListeners = null, n.setOptions({
                    draggable: !0,
                    scrollWheel: !0
                })
            })]
        }, e
    }(i.default.AbstractShapeOverlay);
    e.EditableShapeOverlay = s
}, function (t, e, n) {
    "use strict";
    e.__esModule = !0, e.mixin = function (t, e) {
        for (var n = 0, o = e.length; n < o; n++) {
            var i = e[n].prototype;
            for (var r in i)i.hasOwnProperty(r) && ("constructor" === r || t.prototype[r] || (t.prototype[r] = i[r]))
        }
    }
}, function (t, e, n) {
    "use strict";
    var o = this && this.__extends || function () {
            var t = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (t, e) {
                    t.__proto__ = e
                } || function (t, e) {
                    for (var n in e)e.hasOwnProperty(n) && (t[n] = e[n])
                };
            return function (e, n) {
                function o() {
                    this.constructor = e
                }

                t(e, n), e.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
            }
        }();
    e.__esModule = !0;
    var i = n(0), r = n(1), s = new i.default.Point(-10, 0), a = function (t) {
        function e() {
            var e = t.call(this) || this;
            return e._element = e._createElement(), e
        }

        return o(e, t), e.prototype.destroy = function () {
            this._element = null, this.setMap(null)
        }, e.prototype.onAdd = function () {
            var t = this;
            this._dListeners = [i.default.Event.addDOMListener(this._element, "mouseover", function (t) {
                t = i.default.DOMEvent.fix(t), t.target.style.background = r.COLOR.HOVER
            }), i.default.Event.addDOMListener(this._element, "mouseout", function (t) {
                t = i.default.DOMEvent.fix(t), t.target.style.background = r.COLOR.WHITE
            }), i.default.Event.addDOMListener(this._element, "click", function (e) {
                t.trigger(r.DRAWING_EVENT.REMOVE, t._overlay), t.hide()
            })], this.getPanes().overlayLayer.appendChild(this._element)
        }, e.prototype.draw = function () {
            if (this.getMap() && this._isShow) {
                var t = this.getMap().getProjection().fromCoordToOffset(this._coord);
                i.default.DOM.setOffsetWithAnchor(this._element, t, s)
            }
        }, e.prototype.onRemove = function () {
            i.default.Event.removeDOMListener(this._dListeners), i.default.Event.removeListener(this._clickListener), i.default.DOM.removeElement(this._element), this._coord = null, this._dListeners = null
        }, e.prototype._createElement = function () {
            for (var t = ["display:none", "position:absolute", "padding:0", "cursor:pointer", "margin:0", "list-style:none", "font-size: 13px", "background:#fff", "color:#000", "z-index:1", "box-shadow: 0 1px 2px 0.5px rgba(0, 0, 0, 0.3)", "box-sizing: content-box !important;"], e = ["margin:0", "padding:4px 14px;"], n = ["\uc0ad\uc81c"], o = i.default.DOM.createElement("ul", t.join(";")), r = 0, s = n.length; r < s; r++) {
                var a = i.default.DOM.createElement("li", e.join(";"));
                i.default.DOM.setText(a, n[r]), o.appendChild(a)
            }
            return o
        }, e.prototype.show = function (t, e) {
            var n = this;
            this._isShow && this.hide(), this._coord = e, this._overlay = t, i.default.DOM.visible(this._element, !0), this._isShow = !0, this.draw(), this._clickListener = this.getMap().addListenerOnce("click", function () {
                n.hide()
            })
        }, e.prototype.hide = function () {
            i.default.Event.removeListener(this._clickListener), this._coord = null, this._overlay = null, i.default.DOM.visible(this._element, !1), this._isShow = !1
        }, e
    }(naver.maps.OverlayView);
    e.ContextMenu = a
}, function (t, e, n) {
    "use strict";
    function o(t) {
        var e = t;
        return e.getAttribute(s.MODE_TYPE_DATA_ATTR) || (e = e.parentNode), +e.getAttribute(s.MODE_TYPE_DATA_ATTR)
    }

    var i = this && this.__extends || function () {
            var t = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (t, e) {
                    t.__proto__ = e
                } || function (t, e) {
                    for (var n in e)e.hasOwnProperty(n) && (t[n] = e[n])
                };
            return function (e, n) {
                function o() {
                    this.constructor = e
                }

                t(e, n), e.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
            }
        }();
    e.__esModule = !0;
    var r = n(0), s = n(1), a = function (t) {
        function e(e) {
            var n = t.call(this) || this;
            return n.bindTo(["drawingControl", "drawingControlOptions", "drawingMode"], e), n._addListenersToButtons(), e.map && n.setMap(e.map), n
        }

        return i(e, t), e.prototype.destroy = function () {
            r.default.Event.removeDOMListener(this._buttonListeners), this.unbind(["drawingControl", "drawingControlOptions", "drawingMode"]), this.remove()
        }, e.prototype._addListenersToButtons = function () {
            var t = this, e = this.getElement();
            this._buttonListeners = [r.default.Event.addDOMListener(e, "mousedown", function (t) {
                t = r.default.DOMEvent.fix(t), t.preventDefault()
            }), r.default.Event.addDOMListener(e, "mouseover", function (e) {
                return t._onMouseover(e)
            }), r.default.Event.addDOMListener(e, "mouseout", function (e) {
                return t._onMouseout(e)
            }), r.default.Event.addDOMListener(e, "click", function (e) {
                return t._onClick(e)
            })]
        }, e.prototype._onMouseover = function (t) {
            t = r.default.DOMEvent.fix(t);
            var e = o(t.target), n = this._controlButtons[e];
            n.getState() !== s.BUTTON_STATE.ON && n.setState(s.BUTTON_STATE.HOVER)
        }, e.prototype._onMouseout = function (t) {
            t = r.default.DOMEvent.fix(t);
            var e = o(t.target), n = this._controlButtons[e];
            n.getState() !== s.BUTTON_STATE.ON && n.setState(s.BUTTON_STATE.DEFAULT)
        }, e.prototype._onClick = function (t) {
            t = r.default.DOMEvent.fix(t);
            var e = o(t.target);
            e !== this.get("drawingMode") && this.set("drawingMode", e)
        }, e.prototype.drawingMode_changed = function (t) {
            this.selectButton(t)
        }, e.prototype.drawingControlOptions_changed = function (e) {
            if (e) {
                if (e.style && this._wrap) {
                    var n = this.get("drawingControl").length, o = void 0, i = void 0;
                    switch (e.style) {
                        case s.DRAWING_STYLE.HORIZONTAL:
                            o = s.ICON_SIZE * n, i = s.ICON_SIZE;
                            break;
                        case s.DRAWING_STYLE.VERTICAL:
                            o = s.ICON_SIZE, i = s.ICON_SIZE * n;
                            break;
                        case s.DRAWING_STYLE.HORIZONTAL_2:
                            o = s.ICON_SIZE * Math.floor(n / 2), i = 2 * s.ICON_SIZE;
                            break;
                        case s.DRAWING_STYLE.VERTICAL_2:
                            o = 2 * s.ICON_SIZE, i = s.ICON_SIZE * Math.floor(n / 2)
                    }
                    this._wrap.style.width = o += "px", this._wrap.style.height = i += "px"
                }
                if (e.position) t.prototype.setPosition.call(this, e.position); else {
                    var r = this.getOptions("position") || naver.maps.Position.TOP_CENTER;
                    t.prototype.setPosition.call(this, r)
                }
            }
        }, e.prototype.drawingControl_changed = function (t) {
            this.remove(), this.create(t), this.set("drawingMode", this.get("drawingMode")), this.set("drawingControlOptions", this.get("drawingControlOptions"))
        }, e.prototype.create = function (t) {
            if (t && t.length) {
                this.getElement().style.margin = "10px", this.getElement().innerHTML = "";
                var e = ["position:relative", "z-index:1", "padding:0", "margin:0", "height:${ICON_SIZE}px", "list-style:none", "display:block", "box-shadow: 0 1px 2px 0.5px rgba(0, 0, 0, 0.3)", "box-sizing:content-box !important", "overflow:hidden", "box-sizing:content-box !important;"],
                    n = r.default.DOM.createElement("ul", e.join(";"));
                this._wrap = n, this.getElement().appendChild(n), this._controlButtons = [];
                for (var o = 0, i = t; o < i.length; o++) {
                    var s = i[o], a = new l(s);
                    this._wrap.appendChild(a.getElement()), this._controlButtons[s] = a
                }
            }
        }, e.prototype.remove = function () {
            if (this._controlButtons) {
                this._wrap.innerHTML = "";
                for (var t = 0; t < this._controlButtons.length; t++)this._controlButtons[t] = null;
                this._controlButtons = null
            }
        }, e.prototype.selectButton = function (t) {
            if (this._controlButtons) {
                for (var e = 0; e < this._controlButtons.length; e++)this._controlButtons[e] && this._controlButtons[e].setState(s.BUTTON_STATE.DEFAULT);
                this._controlButtons[t] && this._controlButtons[t].setState(s.BUTTON_STATE.ON)
            }
        }, e
    }(naver.maps.CustomControl);
    e.DrawingControl = a;
    var l = function () {
        function t(t) {
            var e;
            for (var n in s.DRAWING_MODE)if (s.DRAWING_MODE[n] === t) {
                e = n;
                break
            }
            this._name = e.toLowerCase(), this._createElement(t)
        }

        return t.prototype._createElement = function (t) {
            var e = ["position:relative", "z-index:1", "cursor:pointer", "float:left", "display:block", "margin:0", "padding:0", "width:" + s.ICON_SIZE + "px", "height:" + s.ICON_SIZE + "px", "list-style:none", "box-sizing:content-box !important;"],
                n = ["width:" + s.ICON_SIZE + "px", "height:" + s.ICON_SIZE + "px", "display:block", "border:solid 0 transparent;", "box-sizing:content-box !important;"],
                o = r.default.DOM.createElement("li", e.join(";")),
                i = this._img = r.default.DOM.createElement("img", n.join(";"));
            o.setAttribute(s.MODE_TYPE_DATA_ATTR, t), o.appendChild(i), this._element = o, this.setState(s.BUTTON_STATE.DEFAULT)
        }, t.prototype.getElement = function () {
            return this._element
        }, t.prototype.getState = function () {
            return +this._state
        }, t.prototype.setState = function (t) {
            var e = this;
            if (this._element && this._state !== t) {
                t === s.BUTTON_STATE.HOVER ? this._element.style.background = s.COLOR.HOVER : this._element.style.background = s.COLOR.WHITE;
                var n = s.ASSET_PATH + this._name + (t === s.BUTTON_STATE.ON ? "-on" : "") + ".png";
                if (r.default.Agent.browser.msie) {
                    var o = new Image;
                    o.onload = function () {
                        e._img.src = o.src
                    }, o.src = n
                } else this._img.src = n;
                this._state = t
            }
        }, t
    }()
}, function (t, e, n) {
    "use strict";
    var o = this && this.__extends || function () {
            var t = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (t, e) {
                    t.__proto__ = e
                } || function (t, e) {
                    for (var n in e)e.hasOwnProperty(n) && (t[n] = e[n])
                };
            return function (e, n) {
                function o() {
                    this.constructor = e
                }

                t(e, n), e.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
            }
        }(), i = this && this.__assign || Object.assign || function (t) {
            for (var e, n = 1, o = arguments.length; n < o; n++) {
                e = arguments[n];
                for (var i in e)Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
            }
            return t
        };
    e.__esModule = !0;
    var r = n(0), s = n(1), a = function (t) {
        function e(e) {
            var n = t.call(this) || this;
            return n.bindTo(["map", "drawingMode", "rectangleOptions", "ellipseOptions", "polygonOptions", "polylineOptions", "arrowlineOptions", "markerOptions", "shift", "escape"], e), n
        }

        return o(e, t), e.prototype.destroy = function () {
            this._cleanUp(), this.unbindAll()
        }, e.prototype.map_changed = function (t) {
            t ? this._addMapListeners() : (this._cancelDrawing(), this._cleanUp(), this._removeMapListeners())
        }, e.prototype._addMapListeners = function () {
            var t = this;
            this.clickListener = this.get("map").addListener("click", function (e) {
                return t._onClick(e)
            })
        }, e.prototype._removeMapListeners = function () {
            this.removeListener(this.clickListener), this.clickListener = null
        }, e.prototype._onClick = function (t) {
            var e = this.get("drawingMode");
            switch (e) {
                case s.DRAWING_MODE.RECTANGLE:
                case s.DRAWING_MODE.ELLIPSE:
                    this._drawBoundsOverlay(e, t.coord);
                    break;
                case s.DRAWING_MODE.POLYLINE:
                case s.DRAWING_MODE.ARROWLINE:
                case s.DRAWING_MODE.POLYGON:
                    this._drawMultiPointsOverlay(e, t.coord);
                    break;
                case s.DRAWING_MODE.MARKER:
                    this._drawPointOverlay(e, t.coord)
            }
        }, e.prototype._drawBoundsOverlay = function (t, e) {
            var n = this;
            this.currentDrawingOverlay ? this._finishDrawing() : (this.currentDrawingOverlay = this._createOverlay(t, e), this._setOverlayOptions(this.get(this.currentDrawingOverlay.name + "Options")), this.drawListener = [this.get("map").addListener("mousemove", function (t) {
                n.get("shift") ? n.currentDrawingOverlay.setSquareCorners(e, t.coord) : n.currentDrawingOverlay.setCorners(e, t.coord)
            })], this.currentDrawingOverlay.set("_editState", s.EDIT_STATE.DRAW))
        }, e.prototype._drawMultiPointsOverlay = function (t, e) {
            var n = this;
            this.currentDrawingOverlay ? this.currentDrawingOverlay.addPath(e) : (this.currentDrawingOverlay = this._createOverlay(t, e), this._setOverlayOptions(this.get(this.currentDrawingOverlay.name + "Options")), this.drawListener = [this.get("map").addListener("mousemove", function (t) {
                n.get("shift") ? n.currentDrawingOverlay.updateLastOrthogonalPath(t.coord) : n.currentDrawingOverlay.updateLastPath(t.coord)
            }), this.get("map").addListener("rightclick", function () {
                n._finishDrawing()
            })], this.currentDrawingOverlay.set("_editState", s.EDIT_STATE.DRAW))
        }, e.prototype._drawPointOverlay = function (t, e) {
            this.currentDrawingOverlay || (this.currentDrawingOverlay = this._createOverlay(t, e), this._setOverlayOptions(this.get(this.currentDrawingOverlay.name + "Options")), this._finishDrawing())
        }, e.prototype._finishDrawing = function () {
            this.currentDrawingOverlay.set("_editState", s.EDIT_STATE.NONE), this.trigger(s.DRAWING_EVENT.ADD, this.currentDrawingOverlay), this._cleanUp()
        }, e.prototype._cancelDrawing = function () {
            this._removecurrentDrawingOverlay(), this.set("drawingMode", s.DRAWING_MODE.HAND)
        }, e.prototype._cleanUp = function () {
            this.removeListener(this.drawListener), this.drawListener = null, this.currentDrawingOverlay = null
        }, e.prototype._removecurrentDrawingOverlay = function () {
            this.currentDrawingOverlay && this.currentDrawingOverlay.get("_editState") === s.EDIT_STATE.DRAW && (this.currentDrawingOverlay.setMap(null), this._cleanUp())
        }, e.prototype._createOverlay = function (t, e) {
            var n, o = this.get("map");
            switch (t) {
                case s.DRAWING_MODE.RECTANGLE:
                    n = new r.default.Rectangle({map: o, bounds: new r.default.PointBounds(e, e), name: "rectangle"});
                    break;
                case s.DRAWING_MODE.ELLIPSE:
                    n = new r.default.Ellipse({map: o, bounds: new r.default.PointBounds(e, e), name: "ellipse"});
                    break;
                case s.DRAWING_MODE.POLYLINE:
                    n = new r.default.Polyline({map: o, path: [e, e], name: "polyline"});
                    break;
                case s.DRAWING_MODE.ARROWLINE:
                    n = new r.default.Polyline({map: o, path: [e, e], name: "arrowline"});
                    break;
                case s.DRAWING_MODE.POLYGON:
                    n = new r.default.Polygon({map: o, paths: [[e, e]], name: "polygon"});
                    break;
                case s.DRAWING_MODE.MARKER:
                    n = new r.default.Marker({map: o, position: e, draggable: !0, name: "marker"})
            }
            return n
        }, e.prototype._setOverlayOptions = function (t) {
            if (void 0 === t && (t = null), !this.currentDrawingOverlay)return void(this.currentDrawingOverlayOptions = t);
            var e = this.getRefinedOverlayOptions(this.currentDrawingOverlay, this.currentDrawingOverlayOptions, t),
                n = this.get("drawingMode");
            n === s.DRAWING_MODE.POLYLINE ? e.startIcon = e.endIcon = null : n === s.DRAWING_MODE.ARROWLINE && (e.endIcon || e.startIcon || (e.endIcon = naver.maps.PointingIcon.BLOCK_ARROW)), this.currentDrawingOverlay.setOptions(e), this.currentDrawingOverlayOptions = e
        }, e.prototype.getRefinedOverlayOptions = function (t, e, n) {
            for (var o = i({currentOptions: e}, n), r = ["clickable"].concat(t.PROPERTIES_NAME || []) || ["map", "clickable"], s = 0; s < r.length; s++)delete o[r[s]];
            return o
        }, e.prototype.escape_changed = function (t) {
            if (t) {
                switch (this.get("drawingMode")) {
                    case s.DRAWING_MODE.RECTANGLE:
                    case s.DRAWING_MODE.ELLIPSE:
                        this._cancelDrawing();
                        break;
                    case s.DRAWING_MODE.POLYLINE:
                    case s.DRAWING_MODE.ARROWLINE:
                    case s.DRAWING_MODE.POLYGON:
                        this.currentDrawingOverlay ? (this.currentDrawingOverlay.removeLastPath(), this.currentDrawingOverlay.isValid() ? this._finishDrawing() : this._cancelDrawing()) : this._cancelDrawing();
                        break;
                    case s.DRAWING_MODE.MARKER:
                        this._cancelDrawing()
                }
            }
        }, e.prototype.drawingMode_changed = function (t) {
            var e = this.get("map");
            e && (t === s.DRAWING_MODE.HAND ? e.setCursor("open") : e.setCursor("pointer")), this.currentDrawingOverlay && this._removecurrentDrawingOverlay()
        }, e
    }(r.default.KVO);
    e.DrawingTool = a
}, function (t, e, n) {
    "use strict";
    e.__esModule = !0;
    var o = n(0), i = n(7), r = n(6), s = n(5), a = n(4), l = n(3);
    i.mixin(o.default.AbstractShapeOverlay, [r.EditableShapeOverlay]), o.default.AbstractShapeOverlay.prototype.draw = r.EditableShapeOverlay.prototype.draw, i.mixin(o.default.Rectangle, [s.EditableRectangle]), i.mixin(o.default.Polyline, [a.EditablePolyline]), i.mixin(o.default.Polygon, [l.EditablePolygon, a.EditablePolyline]);
    var d = n(2), p = n(1);
    if (!naver.maps)throw new Error("NAVER Maps was not successfully loaded.");
    naver.maps.drawing = {
        DrawingManager: d.DrawingManager,
        DrawingMode: p.DRAWING_MODE,
        DrawingStyle: p.DRAWING_STYLE,
        DrawingEvents: p.DRAWING_EVENT
    }
}]);
//# sourceMappingURL=drawing-latest.min.js.map