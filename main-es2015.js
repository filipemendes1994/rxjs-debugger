(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var rxjs_debugger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs-debugger */ "./node_modules/rxjs-debugger/index.js");
/* harmony import */ var rxjs_debugger__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(rxjs_debugger__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _pipes_fake_pipe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pipes/fake.pipe */ "./src/app/pipes/fake.pipe.ts");
/* harmony import */ var _directives_fake_directive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./directives/fake.directive */ "./src/app/directives/fake.directive.ts");
/* harmony import */ var _app_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./app.constants */ "./src/app/app.constants.ts");
/* harmony import */ var _services_fake_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./services/fake.service */ "./src/app/services/fake.service.ts");










const _c0 = ["console"];
class AppComponent {
    constructor(fakeService) {
        this.fakeService = fakeService;
        this.AvailableSource = _app_constants__WEBPACK_IMPORTED_MODULE_7__["AvailableSource"];
        this.fakePipe = new _pipes_fake_pipe__WEBPACK_IMPORTED_MODULE_5__["FakePipe"]();
        this.fakeDirective = new _directives_fake_directive__WEBPACK_IMPORTED_MODULE_6__["FakeDirective"]();
        this.randomNumber = this.getRandomNumber();
        this.subscriptionFinisher$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.consoleEntryPrefix = '>>> ';
    }
    /**
     * Adds initial message to console
     *
     * @memberof AppComponent
     */
    ngAfterViewInit() {
        this.consoleLogger('<span style="color: green;">\n' +
            '/*\n' +
            `Don't forget!\n` +
            'You can use <b>window.subscriptionsMap</b>\n' +
            `on browser's console to get subscriptions map\n` +
            `*/</span>`);
        rxjs_debugger__WEBPACK_IMPORTED_MODULE_4__["RxJSDebugger"].valueChanges
            .subscribe(() => this.consoleLogger('Subscription map value changed!'));
        rxjs_debugger__WEBPACK_IMPORTED_MODULE_4__["RxJSDebugger"].obSubscribed$
            .subscribe(className => this.consoleLogger(`Observable subscribed on ${className}!`));
        rxjs_debugger__WEBPACK_IMPORTED_MODULE_4__["RxJSDebugger"].obUnsubscribed$
            .subscribe(className => this.consoleLogger(`Observable unsubscribed on ${className}!`));
    }
    ngOnDestroy() {
        this.subscriptionFinisher$.next();
        this.subscriptionFinisher$.complete();
    }
    createFakeSubscription() {
        Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["timer"])(1000, 2000)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeUntil"])(this.subscriptionFinisher$))
            .subscribe();
    }
    addSubscription(source) {
        switch (source) {
            case _app_constants__WEBPACK_IMPORTED_MODULE_7__["AvailableSource"].COMPONENT:
                this.createFakeSubscription();
                break;
            case _app_constants__WEBPACK_IMPORTED_MODULE_7__["AvailableSource"].PIPE:
                this.fakePipe.createFakeSubscription();
                break;
            case _app_constants__WEBPACK_IMPORTED_MODULE_7__["AvailableSource"].DIRECTIVE:
                this.fakeDirective.createFakeSubscription();
                break;
            case _app_constants__WEBPACK_IMPORTED_MODULE_7__["AvailableSource"].SERVICE:
                this.fakeService.createFakeSubscription();
                break;
        }
    }
    addSubscriptionLogic(randomNumber) {
        rxjs_debugger__WEBPACK_IMPORTED_MODULE_4__["RxJSDebugger"].addOnSubscribeLogic(() => console.log(randomNumber));
        this.randomNumber = this.getRandomNumber();
    }
    addUnsubscriptionLogic(randomNumber) {
        rxjs_debugger__WEBPACK_IMPORTED_MODULE_4__["RxJSDebugger"].addOnUnsubscribeLogic(() => console.log(randomNumber));
        this.randomNumber = this.getRandomNumber();
    }
    clearSubscriptionLogic() {
        rxjs_debugger__WEBPACK_IMPORTED_MODULE_4__["RxJSDebugger"].clearOnSubscribeLogic();
    }
    clearUnsubscriptionLogic() {
        rxjs_debugger__WEBPACK_IMPORTED_MODULE_4__["RxJSDebugger"].clearOnUnsubscribeLogic();
    }
    printSubscriptionsMap() {
        this.consoleLogger('\n' + new _angular_common__WEBPACK_IMPORTED_MODULE_1__["JsonPipe"]().transform(rxjs_debugger__WEBPACK_IMPORTED_MODULE_4__["RxJSDebugger"].subscriptionsMap()));
    }
    printSubscriptionsCount() {
        this.consoleLogger(`Subscription Count: ${rxjs_debugger__WEBPACK_IMPORTED_MODULE_4__["RxJSDebugger"].openedSubscriptionsCount()}`);
    }
    cancelSubscriptions() {
        this.subscriptionFinisher$.next();
        this.fakePipe.cancelSubscriptions();
        this.fakeDirective.cancelSubscriptions();
        this.fakeService.cancelSubscriptions();
    }
    consoleClear() {
        this.console.nativeElement.innerHTML = '';
        this.consoleLogger('Console cleared but subscriptions keep alive!');
    }
    getRandomNumber() {
        return Math.floor(Math.random() * 100);
    }
    consoleLogger(entry) {
        this.console.nativeElement.innerHTML +=
            `<div><span style="color: green">${this.consoleEntryPrefix}</span>${entry}</div>`;
        this.console.nativeElement.scroll({
            top: this.console.nativeElement.scrollHeight
        });
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_fake_service__WEBPACK_IMPORTED_MODULE_8__["FakeService"])); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], viewQuery: function AppComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, true);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.console = _t.first);
    } }, decls: 28, vars: 2, consts: [[1, "main-container"], [1, "btns-actions"], [1, "btns-actions__item", "btns-actions__item--primary", 3, "click"], [1, "btns-actions__item", "btns-actions__item--other", 3, "click"], [1, "btns-actions__item", "btns-actions__item--secundary", 3, "click"], [1, "console"], ["console", ""]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_button_click_2_listener() { return ctx.addSubscription(ctx.AvailableSource.COMPONENT); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, " Create fake subscription on Component ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_button_click_4_listener() { return ctx.addSubscription(ctx.AvailableSource.PIPE); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, " Create fake subscription on Pipe ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_button_click_6_listener() { return ctx.addSubscription(ctx.AvailableSource.SERVICE); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, " Create fake subscription on Service ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_button_click_8_listener() { return ctx.addSubscription(ctx.AvailableSource.DIRECTIVE); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, " Create fake subscription on Directive ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_button_click_10_listener() { return ctx.addSubscriptionLogic(ctx.randomNumber); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_button_click_12_listener() { return ctx.addUnsubscriptionLogic(ctx.randomNumber); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_button_click_14_listener() { return ctx.clearSubscriptionLogic(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, " Clear extra subscription logic ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_button_click_16_listener() { return ctx.clearUnsubscriptionLogic(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, " Clear extra unsubscription logic ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_button_click_18_listener() { return ctx.printSubscriptionsMap(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, " Show subscription map ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_button_click_20_listener() { return ctx.printSubscriptionsCount(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, " Get subscriptions count ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_button_click_22_listener() { return ctx.cancelSubscriptions(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, " Cancel newly created subscriptions ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_button_click_24_listener() { return ctx.consoleClear(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, " Clear Console ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](26, "pre", 5, 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" console.log(", ctx.randomNumber, ") on new subscription ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" console.log(", ctx.randomNumber, ") on unsubscribe ");
    } }, styles: ["[_nghost-%COMP%] {\n  display: flex;\n  height: 100%;\n}\n\n.main-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  flex: 1;\n  padding: 100px;\n  background-color: lightslategray;\n}\n\n.btns-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n}\n\n.btns-actions__item[_ngcontent-%COMP%] {\n  flex: 1;\n  margin: 4px;\n  color: whitesmoke;\n  border-style: none;\n  outline: none;\n  font-family: monospace;\n}\n\n.btns-actions__item[_ngcontent-%COMP%]:hover {\n  cursor: pointer;\n  opacity: 0.5;\n}\n\n.btns-actions__item--primary[_ngcontent-%COMP%] {\n  border-color: cornflowerblue;\n  background-color: cornflowerblue;\n}\n\n.btns-actions__item--secundary[_ngcontent-%COMP%] {\n  border-color: darkblue;\n  background-color: darkblue;\n}\n\n.btns-actions__item--other[_ngcontent-%COMP%] {\n  border-color: darkslateblue;\n  background-color: darkslateblue;\n}\n\n.console[_ngcontent-%COMP%] {\n  flex: 2;\n  padding: 8px;\n  margin: 4px;\n  background-color: #171717;\n  color: white;\n  max-height: 100%;\n  overflow: auto;\n  scroll-behavior: smooth;\n  scrollbar-color: transparent #888;\n  scrollbar-width: thin;\n  \n  \n  \n  \n}\n\n.console[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 10px;\n}\n\n.console[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: transparent;\n}\n\n.console[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: grey;\n}\n\n.console[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background: #555;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9maWxpcGVtZW5kZXMvY29kZS9yeGpzLW1vbml0b3IvZGVtby9zcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBQTtFQUNBLFlBQUE7QUNDRjs7QURFQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLE9BQUE7RUFDQSxjQUFBO0VBRUEsZ0NBQUE7QUNBRjs7QURHQTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLE9BQUE7QUNBRjs7QURFRTtFQUNFLE9BQUE7RUFDQSxXQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtBQ0FKOztBREVJO0VBQ0UsZUFBQTtFQUNBLFlBQUE7QUNBTjs7QURHSTtFQUNFLDRCQUFBO0VBQ0EsZ0NBQUE7QUNETjs7QURJSTtFQUNFLHNCQUFBO0VBQ0EsMEJBQUE7QUNGTjs7QURLSTtFQUNFLDJCQUFBO0VBQ0EsK0JBQUE7QUNITjs7QURRQTtFQUNFLE9BQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLHlCQUFBO0VBQ0EsWUFBQTtFQUVBLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLHVCQUFBO0VBQ0EsaUNBQUE7RUFDQSxxQkFBQTtFQUVBLFVBQUE7RUFLQSxVQUFBO0VBS0EsV0FBQTtFQUtBLG9CQUFBO0FDbkJGOztBREtFO0VBQ0UsV0FBQTtBQ0hKOztBRE9FO0VBQ0UsdUJBQUE7QUNMSjs7QURTRTtFQUNFLGdCQUFBO0FDUEo7O0FEV0U7RUFDRSxnQkFBQTtBQ1RKIiwiZmlsZSI6InNyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xuICBkaXNwbGF5OiBmbGV4O1xuICBoZWlnaHQ6IDEwMCU7XG59XG5cbi5tYWluLWNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGZsZXg6IDE7XG4gIHBhZGRpbmc6IDEwMHB4O1xuXG4gIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0c2xhdGVncmF5O1xufVxuXG4uYnRucy1hY3Rpb25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZmxleDogMTtcblxuICAmX19pdGVtIHtcbiAgICBmbGV4OiAxO1xuICAgIG1hcmdpbjogNHB4O1xuICAgIGNvbG9yOiB3aGl0ZXNtb2tlO1xuICAgIGJvcmRlci1zdHlsZTogbm9uZTtcbiAgICBvdXRsaW5lOiBub25lO1xuICAgIGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XG5cbiAgICAmOmhvdmVyIHtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIG9wYWNpdHk6IC41O1xuICAgIH1cblxuICAgICYtLXByaW1hcnkge1xuICAgICAgYm9yZGVyLWNvbG9yOiBjb3JuZmxvd2VyYmx1ZTtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IGNvcm5mbG93ZXJibHVlO1xuICAgIH1cblxuICAgICYtLXNlY3VuZGFyeSB7XG4gICAgICBib3JkZXItY29sb3I6IGRhcmtibHVlO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogZGFya2JsdWU7XG4gICAgfVxuXG4gICAgJi0tb3RoZXIge1xuICAgICAgYm9yZGVyLWNvbG9yOiBkYXJrc2xhdGVibHVlO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogZGFya3NsYXRlYmx1ZTtcbiAgICB9XG4gIH1cbn1cblxuLmNvbnNvbGUge1xuICBmbGV4OiAyO1xuICBwYWRkaW5nOiA4cHg7XG4gIG1hcmdpbjogNHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIzLCAyMywgMjMsIDEpO1xuICBjb2xvcjogd2hpdGU7XG5cbiAgbWF4LWhlaWdodDogMTAwJTtcbiAgb3ZlcmZsb3c6IGF1dG87XG4gIHNjcm9sbC1iZWhhdmlvcjogc21vb3RoO1xuICBzY3JvbGxiYXItY29sb3I6IHRyYW5zcGFyZW50ICM4ODg7XG4gIHNjcm9sbGJhci13aWR0aDogdGhpbjtcblxuICAvKiB3aWR0aCAqL1xuICAmOjotd2Via2l0LXNjcm9sbGJhciB7XG4gICAgd2lkdGg6IDEwcHg7XG4gIH1cblxuICAvKiBUcmFjayAqL1xuICAmOjotd2Via2l0LXNjcm9sbGJhci10cmFjayB7XG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIH1cblxuICAvKiBIYW5kbGUgKi9cbiAgJjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xuICAgIGJhY2tncm91bmQ6IGdyZXk7XG4gIH1cblxuICAvKiBIYW5kbGUgb24gaG92ZXIgKi9cbiAgJjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWI6aG92ZXIge1xuICAgIGJhY2tncm91bmQ6ICM1NTU7XG4gIH1cbn1cbiIsIjpob3N0IHtcbiAgZGlzcGxheTogZmxleDtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuXG4ubWFpbi1jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICBmbGV4OiAxO1xuICBwYWRkaW5nOiAxMDBweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRzbGF0ZWdyYXk7XG59XG5cbi5idG5zLWFjdGlvbnMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBmbGV4OiAxO1xufVxuLmJ0bnMtYWN0aW9uc19faXRlbSB7XG4gIGZsZXg6IDE7XG4gIG1hcmdpbjogNHB4O1xuICBjb2xvcjogd2hpdGVzbW9rZTtcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xuICBvdXRsaW5lOiBub25lO1xuICBmb250LWZhbWlseTogbW9ub3NwYWNlO1xufVxuLmJ0bnMtYWN0aW9uc19faXRlbTpob3ZlciB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgb3BhY2l0eTogMC41O1xufVxuLmJ0bnMtYWN0aW9uc19faXRlbS0tcHJpbWFyeSB7XG4gIGJvcmRlci1jb2xvcjogY29ybmZsb3dlcmJsdWU7XG4gIGJhY2tncm91bmQtY29sb3I6IGNvcm5mbG93ZXJibHVlO1xufVxuLmJ0bnMtYWN0aW9uc19faXRlbS0tc2VjdW5kYXJ5IHtcbiAgYm9yZGVyLWNvbG9yOiBkYXJrYmx1ZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogZGFya2JsdWU7XG59XG4uYnRucy1hY3Rpb25zX19pdGVtLS1vdGhlciB7XG4gIGJvcmRlci1jb2xvcjogZGFya3NsYXRlYmx1ZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogZGFya3NsYXRlYmx1ZTtcbn1cblxuLmNvbnNvbGUge1xuICBmbGV4OiAyO1xuICBwYWRkaW5nOiA4cHg7XG4gIG1hcmdpbjogNHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTcxNzE3O1xuICBjb2xvcjogd2hpdGU7XG4gIG1heC1oZWlnaHQ6IDEwMCU7XG4gIG92ZXJmbG93OiBhdXRvO1xuICBzY3JvbGwtYmVoYXZpb3I6IHNtb290aDtcbiAgc2Nyb2xsYmFyLWNvbG9yOiB0cmFuc3BhcmVudCAjODg4O1xuICBzY3JvbGxiYXItd2lkdGg6IHRoaW47XG4gIC8qIHdpZHRoICovXG4gIC8qIFRyYWNrICovXG4gIC8qIEhhbmRsZSAqL1xuICAvKiBIYW5kbGUgb24gaG92ZXIgKi9cbn1cbi5jb25zb2xlOjotd2Via2l0LXNjcm9sbGJhciB7XG4gIHdpZHRoOiAxMHB4O1xufVxuLmNvbnNvbGU6Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrIHtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG59XG4uY29uc29sZTo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xuICBiYWNrZ3JvdW5kOiBncmV5O1xufVxuLmNvbnNvbGU6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iOmhvdmVyIHtcbiAgYmFja2dyb3VuZDogIzU1NTtcbn0iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.scss']
            }]
    }], function () { return [{ type: _services_fake_service__WEBPACK_IMPORTED_MODULE_8__["FakeService"] }]; }, { console: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['console']
        }] }); })();


/***/ }),

/***/ "./src/app/app.constants.ts":
/*!**********************************!*\
  !*** ./src/app/app.constants.ts ***!
  \**********************************/
/*! exports provided: AvailableSource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AvailableSource", function() { return AvailableSource; });
var AvailableSource;
(function (AvailableSource) {
    AvailableSource["COMPONENT"] = "Component";
    AvailableSource["SERVICE"] = "Service";
    AvailableSource["PIPE"] = "Pipe";
    AvailableSource["DIRECTIVE"] = "Directive";
})(AvailableSource || (AvailableSource = {}));


/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _pipes_fake_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pipes/fake.pipe */ "./src/app/pipes/fake.pipe.ts");
/* harmony import */ var _directives_fake_directive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./directives/fake.directive */ "./src/app/directives/fake.directive.ts");






class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"],
        _pipes_fake_pipe__WEBPACK_IMPORTED_MODULE_3__["FakePipe"],
        _directives_fake_directive__WEBPACK_IMPORTED_MODULE_4__["FakeDirective"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"],
                    _pipes_fake_pipe__WEBPACK_IMPORTED_MODULE_3__["FakePipe"],
                    _directives_fake_directive__WEBPACK_IMPORTED_MODULE_4__["FakeDirective"]
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"]
                ],
                providers: [],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/directives/fake.directive.ts":
/*!**********************************************!*\
  !*** ./src/app/directives/fake.directive.ts ***!
  \**********************************************/
/*! exports provided: FakeDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FakeDirective", function() { return FakeDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");




class FakeDirective {
    constructor() {
        this.subscriptionFinisher$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
    }
    createFakeSubscription() {
        Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["timer"])(1000, 2000)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["takeUntil"])(this.subscriptionFinisher$))
            .subscribe();
    }
    cancelSubscriptions() {
        this.subscriptionFinisher$.next();
    }
}
FakeDirective.ɵfac = function FakeDirective_Factory(t) { return new (t || FakeDirective)(); };
FakeDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({ type: FakeDirective, selectors: [["", "appFakeDirective", ""]] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](FakeDirective, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
        args: [{
                selector: '[appFakeDirective]'
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/pipes/fake.pipe.ts":
/*!************************************!*\
  !*** ./src/app/pipes/fake.pipe.ts ***!
  \************************************/
/*! exports provided: FakePipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FakePipe", function() { return FakePipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");




class FakePipe {
    constructor() {
        this.subscriptionFinisher$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
    }
    transform(value, ...args) {
        return null;
    }
    createFakeSubscription() {
        Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["timer"])(1000, 2000)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["takeUntil"])(this.subscriptionFinisher$))
            .subscribe();
    }
    cancelSubscriptions() {
        this.subscriptionFinisher$.next();
    }
}
FakePipe.ɵfac = function FakePipe_Factory(t) { return new (t || FakePipe)(); };
FakePipe.ɵpipe = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({ name: "fakePipe", type: FakePipe, pure: true });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](FakePipe, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"],
        args: [{
                name: 'fakePipe'
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/services/fake.service.ts":
/*!******************************************!*\
  !*** ./src/app/services/fake.service.ts ***!
  \******************************************/
/*! exports provided: FakeService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FakeService", function() { return FakeService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");




class FakeService {
    constructor() {
        this.subscriptionFinisher$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
    }
    createFakeSubscription() {
        Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["timer"])(1000, 2000)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["takeUntil"])(this.subscriptionFinisher$))
            .subscribe();
    }
    cancelSubscriptions() {
        this.subscriptionFinisher$.next();
    }
}
FakeService.ɵfac = function FakeService_Factory(t) { return new (t || FakeService)(); };
FakeService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: FakeService, factory: FakeService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](FakeService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var rxjs_debugger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs-debugger */ "./node_modules/rxjs-debugger/index.js");
/* harmony import */ var rxjs_debugger__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(rxjs_debugger__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");






if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
else {
    rxjs_debugger__WEBPACK_IMPORTED_MODULE_2__["RxJSDebugger"].init(rxjs__WEBPACK_IMPORTED_MODULE_3__["Observable"]);
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_4__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/filipemendes/code/rxjs-monitor/demo/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map