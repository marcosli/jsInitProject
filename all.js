new function setNamepaces() {

    window.cm = {};

    cm.helper = {};
    cm.plugin = {};
    cm.init = {};

}

// Helpers - Métodos auxiliares
cm.helper.commons = new function CmHelperCommons() {

    var self = this;

    // --------------- Extensões - Início ---------------
    // Extende o objeto String com o fmt. Ex: "Olá {0}".fmt("Marcos") Resultado:  Olá Marcos
    String.prototype.fmt = function () {
        var args = arguments;
        return this.replace(/\{(\d+)\}/g, function ($0, $1) {
            return args[$1] !== void 0 && args[$1] !== null ? args[$1] : '';
        });
    };
    // --------------- Extensões - Fim ---------------

    // Esta função é um parametro para o método sort dos Arrays, usado para ordernar pela propriedade "order" do objeto do array.
    this.sortByPropOrderAsc = function CmHelperCommonsSortByPropOrderAsc(a, b) {
        if (a.order < b.order)
            return -1;
        if (a.order > b.order)
            return 1;
        return 0;
    }

    // Esta função é um parametro para o método sort dos Arrays, usado para ordernar pela propriedade "order" do objeto do array.
    this.sortByPropOrderDesc = function CmHelperCommonsSortByPropOrderDesc(a, b) {
        if (a.order > b.order)
            return -1;
        if (a.order < b.order)
            return 1;
        return 0;
    }

    this.xmlToJSON = function CmHelperCommonsXmlToJSON(xml) {

        xml = self.typeOf(xml) === "string" ? $.parseXML(xml) : xml;

        // Create the return object
        var obj = {};

        if (xml.nodeType == 1) { // element
            // do attributes
            if (xml.attributes.length > 0) {
                obj["attributes"] = {};
                for (var j = 0; j < xml.attributes.length; j++) {
                    var attribute = xml.attributes.item(j);
                    obj["attributes"][attribute.nodeName] = {};
                    obj["attributes"][attribute.nodeName]["value"] = attribute.nodeValue;
                }
            }
        } else if (xml.nodeType == 3) { // text
            obj = xml.nodeValue;
        }

        // do children
        if (xml.hasChildNodes()) {
            for (var i = 0; i < xml.childNodes.length; i++) {
                var item = xml.childNodes.item(i);
                var nodeName = item.nodeName === "#text" ? "value" : item.nodeName;
                if (typeof (obj[nodeName]) == "undefined") {
                    obj[nodeName] = self.xmlToJSON(item);
                } else {
                    if (typeof (obj[nodeName].push) == "undefined") {
                        var old = obj[nodeName];
                        obj[nodeName] = [];
                    }
                    obj[nodeName].push(self.xmlToJSON(item));
                }
            }
        }

        return obj;

    }

    this.typeOf = function CmHelperCommonsTypeOf(v) {

        var types = {
            "[object Boolean]": "boolean",
            "[object Number]": "number",
            "[object String]": "string",
            "[object Array]": "array",
            "[object Object]": "object",
            "[object Function]": "function",
            "[object RegExp]": "regexp",
            "[object Date]": "date",
            "[object Error]": "error",
            "[object Undefined]": "undefined",
            "[object Null]": "null"
        };

        return types[Object.prototype.toString.call(v)];
    };

    return this;
    
}
cm.helper.loadingPorc = new function CmHelperloadingPorc() {

    var self = this;
    var div0, div1, div2, div3, span;

    this.initSet = function loadingPorcInitSet(record, records) {

        function destroy() {

            window.lpisCreate = false;

            $(div0).fadeOut();

            setTimeout(function () {

                if ($(".loading-geral").length > 0) {

                    window.lpTimeout = clearTimeout(window.lpTimeout);
                    $(div0).remove();
                    circle.destroy();

                }

                window.lpisFim = true;
                return false;

            }, 300)

        }

        function create() {

            window.lpisCreate = true;

            cm.helper.loadingLoop.destroyNow();

            div0 = document.createElement('div');
            div1 = document.createElement('div');
            div2 = document.createElement('div');
            div3 = document.createElement('div');
            span = document.createElement('span');

            div0.className = "loading-geral";
            div1.id = "finito";
            div1.style.display = "block";
            div2.className = "loading1";
            div3.className = "carregando";

            $('body').append(div0);
            $(div0).append(div1);
            $(div1).append(div2);
            $(div2).append(span);
            $(div0).append(div3);

            $(div2).addClass('rotating');
            $(span).addClass('rotating unrotating');

            $(div3).text("Aguarde");

            window.circle = window.circle && window.circle.svg ? window.circle : new ProgressBar.Circle(div2, {
                color: '#009cc3',
                trailColor: '#ccc',
                strokeWidth: 10
            });
            circle.set(0);

        }

        function exec() {

            window.lpTimeout = setTimeout(function () {

                if ($('.loading-geral').length > 0) {

                    var porcentagem = parseInt((record * 100) / records);
                    $(span).text(porcentagem + '%');
                    circle.set(porcentagem / 100)

                    window.lpTimeout = clearTimeout(window.lpTimeout);
                }

            }, 10);

        }

        if (window.lpisFim) {
            window.lpisFim = false;
            return false;
        }

        if (!window.lpisCreate) create();

        if (!window.lpTimeout) exec();

        if (record === records) destroy();

    }

    return self;

}
cm.helper.loadingLoop = new function CmHelperloadingLoop() {

    this.init = function loadingLoopInit() {

        window.llTimeout = setTimeout(function () {

            if ($(".loading-geral").length === 0) {

                var div0 = document.createElement('div');
                var div1 = document.createElement('div');
                var div2 = document.createElement('div');
                var div3 = document.createElement('div');

                window.circle = window.circle && window.circle.svg ? window.circle : new ProgressBar.Circle(div2, {
                    color: '#009cc3',
                    trailColor: '#ccc',
                    strokeWidth: 10
                });
                circle.set(0);

                div0.className = "loading-geral";
                div0.style.display = "none";
                div1.id = "infinito";
                div1.style.display = "block";
                div3.className = "carregando";

                $('body').append(div0);
                $(div0).append(div1);
                $(div1).append(div2);
                $(div0).append(div3);

                $(div2).addClass('rotating');

                $(div3).text("Aguarde");

                window.nAtual = 0;
                window.llInterval = setInterval(function () {

                    if (window.nAtual && window.nAtual > 100) nAtual = 0;

                    window.nAtual = window.nAtual ? window.nAtual : 0;
                    window.nTotal = 100;

                    circle.set(nAtual / 100)

                    window.nAtual++;

                }, 50);

                $(div0).fadeIn();

            }


        }, 1250);
    }

    this.destroy = function loadingLoopDestroy() {

        var seletorGeral = '.loading-geral';

        clearTimeout(window.llTimeout);

        $(seletorGeral).fadeOut();

        setTimeout(function () {

            if ($(seletorGeral).length > 0) {

                circle.destroy();
                $(seletorGeral).remove();
                window.llInterval = clearInterval(window.llInterval);

            }

        }, 400); // Tempo do FadeOut


    }

    // Sem timeout
    this.destroyNow = function loadingLoopDestroyNow() {

        clearTimeout(window.llTimeout);

        if ($(".loading-geral").length > 0) {

            circle.destroy();
            $('.loading-geral').remove();
            clearInterval(window.llInterval);
        }

    }

    this.isActive = function loadingLoopisActive() {

        return $(".loading-geral #infinito").length > 0;

    }

    return this;
}
cm.helper.fnManage = new function CmHelperFnManage() {

    var validateFn = function (fnName, fn) {
        if (typeof (fn) !== 'function' && typeof (fn) !== 'string')
            throw fnName + ": O primeiro argumento deve ser uma função ou string.";
    }

    var validateNumber = function (fnName, n) {
        if (typeof (n) !== 'number')
            throw fnName + ": O segundo argumento deve ser numérico.";
    }

    var getLastFnByOrder = function () {

        var order = 0;
        var refFn;

        for (var i in this.fns) {

            if (this.fns[i].order > order) {
                order = this.fns[i].order;
                refFn = this.fns[i];
            }

        }

        return order > 0 ? refFn : { order: order, fn: false } ;

    }

    var syncOrderFns = function CmHelperFnManageSyncOrderFn() {

        this.fns.sort(cm.helper.commons.sortByPropOrderAsc);

    }

    var getFn = function CmHelperFnManageGetFn(fn) {

        validateFn('CmHelperFnManageGetFn', fn);

        for (var i in this.fns) {

            var v;

            if (typeof (fn) === 'string')
                v = this.fns[i].fn.name === fn;

            if (typeof (fn) === 'function')
                v = this.fns[i].fn.toString() === fn.toString();

            if (v) return this.fns[i];

        }

    }

    var addFn = function CmHelperFnManageAddFn(fn, order) {

        order = order ? order : this.getLastFnByOrder().order + 1;

        validateFn('CmHelperFnManageAddFn', fn);
        validateNumber('CmHelperFnManageAddFn', order);

        this.fns[this.fns.length] = { order: order, fn: fn };

        this.syncOrderFns();

    }

    var removeFn = function CmHelperFnManageRemoveFn(fn) {

        validateFn('CmHelperFnManageRemoveFn', fn);

        for (var i in this.fns) {

            var v;

            if (typeof (fn) === 'string')
                v = this.fns[i].fn.name === fn;

            if (typeof (fn) === 'function')
                v = this.fns[i].fn.toString() === fn.toString();

            if (v) return this.fns.splice(i, 1);

        }
        

    }

    var changeOrderFn = function CmHelperFnManageChangeOrderFn(fn, order) {

        validateFn('CmHelperFnManageChangeOrder', fn);
        validateNumber('CmHelperFnManageChangeOrder', order);

        this.getFn(fn).order = order;
        this.syncOrderFns()

    }

    var execFns = function CmHelperFnManageExecFn(escopo) {

        for (var i in this.fns) {
            this.fns[i].fn();
        }

    }

    this.createInstance = function CmHelperFnManageInit(escopo) {

        cm.init[escopo] = {};
        cm.init[escopo]['fns'] = [];
        cm.init[escopo]['getLastFnByOrder'] = getLastFnByOrder;
        cm.init[escopo]['syncOrderFns'] = syncOrderFns;
        cm.init[escopo]['getFn'] = getFn;
        cm.init[escopo]['addFn'] = addFn;
        cm.init[escopo]['removeFn'] = removeFn;
        cm.init[escopo]['changeOrderFn'] = changeOrderFn;
        cm.init[escopo]['execFns'] = execFns;

    }

    return this;

}

// Plugins - Métodos auxiliares e que serão utilizados no primeiro load da página 
cm.plugin.notification = new function CmPluginNotification() {

    var timeNotifySuccess;

    this.init = function CmHelperNotificationInit(PageRequestManager, PageLoadingEventArgs) {

        var seletorPai = "#toast-container";
        var e = PageLoadingEventArgs._panelsUpdated;

        function exec(elemento, tipo) {

            if (elemento.innerText) {
                if ($(seletorPai + ' > .toast').length === 0) { // Somente 1 notificação por vez

                    var largura = window.innerWidth >= 960 ? "560px" : "";

                    elemento.style.position = "absolute";
                    elemento.style.left = "-999999px";

                    if (tipo === "success") {
                        toastr.options = {
                            "closeButton": true,
                            "progressBar": true,
                            "newestOnTop": true,
                            "hideDuration": "300",
                            "positionClass": "toast-top-center",
                            "timeOut": timeNotifySuccess ? timeNotifySuccess : 1500,
                            "extendedTimeOut": timeNotifySuccess ? timeNotifySuccess : 1500
                        }

                    } else {
                        toastr.options = {
                            "closeButton": true,
                            "progressBar": false,
                            "newestOnTop": true,
                            "hideDuration": "300",
                            "positionClass": "toast-top-center",
                            "timeOut": "999999999",
                            "extendedTimeOut": "999999999"
                        }
                    }

                    toastr[tipo]($(elemento.innerHTML).find('span')[0].innerHTML, "");

                    $(seletorPai).css({
                        "height": "100%",
                        "background-color": "transparent",
                        "background-color": "rgba(255,255,255,0.7)"
                    });
                    $(seletorPai + ' > *').css({
                        "width": largura,
                        "position": "relative",
                        "top": "40%",
                        "-webkit-transform": "translateY(-40%)",
                        "transform": "translateY(-40%)"
                    });

                }
            }
        }

        for (var i in e) {

            if (e[i].id === "ctl00_ctl00_ctl00_ctl00_pnlMensagemErroPanel") exec(e[i], "error");
            if (e[i].id === "ctl00_ctl00_ctl00_ctl00_pnlMensagemAcertoPanel") exec(e[i], "success");

        }

        $(seletorPai).unbind("click");
        $(seletorPai).bind("click", function () { toastr.clear(); });

    }

    this.setTimeNotifySuccess = function (num) {
        timeNotifySuccess = parseInt(num);
    }

    return this;

}     

// Funções executadas no final da tag Body.
// Estas funções são utilizadas geralmente para templates e componentes.
new function execFnsBody() {

    cm.helper.fnManage.createInstance("body");

    //cm.init.body.addFn(cm.plugin.goIndexModule);

    cm.init.body.execFns();

}

// Funções executadas ao rendimensionar a tela do browser.
// Estas funções são utilizadas geralmente para reposicionar/formatar html e css.
new function execFnsResize() {

    var tempExec = 25; // Tempo em milissegundos
    var ctResize;

    cm.helper.fnManage.createInstance("resize");

    //cm.init.resize.addFn(function(){});

    $(window).resize(function () {

        clearTimeout(ctResize);
        ctResize = setTimeout(cm.init.resize.execFns, tempExec);

    });

}

// Funções executadas no document ready.
// São utilizadas após a página carregar
new function execFnsDomReady() {

    $(document).ready(function () {

        cm.helper.fnManage.createInstance("domReady");

        //cm.init.domReady.addFn(cm.accordion.fn.initExec);

        cm.init.domReady.execFns();


    });

}

// Funções executadas a partir das callbacks do Ajax do jQuery
new function execAjax() {

    $(document).ajaxStart(cm.helper.loadingLoop.init);
    $(document).ajaxStop(cm.helper.loadingLoop.destroy);

}