var L = {
        config: {
            count: 0,
            tax_rate: 8.875,
            tip_rate: 15
        },
        init : function() {
            $("#step_count #next").click(function (e) {
                L._fn.swichStep();
                L._fn.step_count.clickNext();
            });

            $("#step_names #next").click(function (e) {
                L._fn.swichStep();
                L._fn.step_names.clickNext();
            });
            $("#step_names #back").click(function (e) {
                L._fn.swichStep();
                L._fn.step_names.clickBack();
            });

            $("#step_expenses #next").click(function (e) {
                L._fn.swichStep();
                L._fn.step_expenses.clickNext();
            });
            $("#step_expenses #back").click(function (e) {
                L._fn.swichStep();
                L._fn.step_expenses.clickBack();
            });

            $("#step_tax #next").click(function (e) {
                L._fn.swichStep();
                L._fn.step_tax.clickNext();
            });
            $("#step_tax #back").click(function (e) {
                L._fn.swichStep();
                L._fn.step_tax.clickBack();
            });
                $("#step_tax #tax_rate").blur(function (e) {
                    L._fn.step_tax.changeTaxRate();
                });
                $("#step_tax #tax").blur(function (e) {
                    L._fn.step_tax.changeTax();
                });
            $("#step_tip #next").click(function (e) {
                L._fn.swichStep();
                L._fn.step_tip.clickNext();
            });
            $("#step_tip #back").click(function (e) {
                L._fn.swichStep();
                L._fn.step_tip.clickBack();
            });
                $("#step_tip #tip_rate").change(function (e) {
                    L._fn.step_tip.changeTipRate();
                });
                $("#step_tip #tip").blur(function (e) {
                    L._fn.step_tip.changeTip();
                });
                $("#step_tip #tip_total").blur(function (e) {
                    L._fn.step_tip.changeTipTotal();
                });
            $("#step_result #start_over").click(function (e) {
                L._fn.swichStep();
                L._fn.step_result.clickNext();
            });
            $("#step_result #back").click(function (e) {
                L._fn.swichStep();
                L._fn.step_result.clickBack();
            });

        },
        _fn : {
            swichStep: function() {
                window.scrollTo(0,0);
            },
            util: {
                getRoundedNumber: function(num, point) {
                    var times = point * 10;
                    return Math.round(num * times) / times;
                }
            },
            step_count: {
                clickNext : function() {
                    L.config.count = $("#step_count #count").val();
                    L._fn.step_names.init();
                    L._fn.step_count.showNext();
                },
                showNext : function() {
                    $('#step_count #input').prop('readonly', true);
                    $("#step_count").hide();
                    $("#step_names").show();
                }
            },
            step_names: {
                init: function () {
                    L._fn.step_names.addNameInputs();
                },
                addNameInputs : function() {
                    $("#step_names #names ul").remove();
                    $("#step_names #names").append("<ul></ul>");
                    for (var i = 1; i <= L.config.count; i++) {
                        switch (i) {
                            case 1: name = 'Marcin'; break;
                            case 2: name = 'Luka'; break;
                            case 3: name = 'Pawel'; break;
                            case 4: name = 'Sung'; break;
                            default: name = ''; break;
                        }
                        $('#step_names #names ul').append('<li><input type="text" id="name'+i+'" value="'+name+'" /></li>');
                    }
                },
                clickNext : function() {
                    L._fn.step_expenses.init();
                    L._fn.step_names.showNext();
                },
                showNext : function() {
                    $("#step_names").hide();
                    $("#step_expenses").show();
                },
                clickBack : function() {
                    $("#step_names").hide();
                    $("#step_count").show();
                }
            },
            step_expenses: {
                init: function () {
                    L._fn.step_expenses.addExpenseInputs();
                },
                addExpenseInputs : function() {
                    $("#step_expenses #expenses ul").remove();
                    $("#step_expenses #expenses").append("<ul></ul>");
                    var li;
                    for (var i = 1; i <= L.config.count; i++) {
                        li = '<li><label>'+$('#step_names #name'+i).val()+'</label></li>';
                        li += '<li><input type="number" id="expense'+i+'_1" value="" placeholder="Price 1"/></li>';
                        li += '<li><input type="number" id="expense'+i+'_2" value="" placeholder="Price 2" /></li>';
                        li += '<li><input type="number" id="expense'+i+'_3" value="" placeholder="Price 3" /></li>';
                        $('#step_expenses ul').append(li);
                    }
                },
                clickNext : function() {
                    L._fn.step_tax.init();
                    L._fn.step_expenses.showNext();
                },
                showNext : function() {
                    $("#step_expenses").hide();
                    $("#step_tax").show();
                },
                clickBack : function() {
                    $("#step_expenses").hide();
                    $("#step_names").show();
                }
            },
            step_tax: {
                init: function () {
                    L._fn.step_tax.setTaxRate();
                    L._fn.step_tax.setExpenseTotal();
                    L._fn.step_tax.setTax();
                    L._fn.step_tax.setTaxTotal();
                    return true;
                },
                setTaxRate : function() {
                    $("#step_tax #tax_rate").val(L.config.tax_rate);
                    return true;
                },
                getTaxRate : function() {
                    L.config.tax_rate = $("#step_tax #tax_rate").val();
                    return true;
                },
                setExpenseTotal : function() {
                    var total = 0;
                    var expense1, expense2, expense3;
                    for (var i=1; i<=L.config.count; i++) {
                        expense1 = $("#step_expenses #expense"+i+"_1").val();
                        if (expense1 !== undefined && expense1 !== '') {
                            total += parseFloat(expense1);
                        }
                        expense2= $("#step_expenses #expense"+i+"_2").val();
                        if (expense2 !== undefined && expense2 !== '') {
                            total += parseFloat(expense2);
                        }
                        expense3 = $("#step_expenses #expense"+i+"_3").val();
                        if (expense3 !== undefined && expense3 !== '') {
                            total += parseFloat(expense3);
                        }
                    }
                    $("#step_tax #expense_total").val(L._fn.util.getRoundedNumber(total, 2));
                    return true;
                    },
                getTax : function(money) {
                    var tax = money * L.config.tax_rate / 100;
                    return tax;
                },
                setTax : function () {
                    var expense_total = parseFloat($("#step_tax #expense_total").val());
                    var tax = expense_total * L.config.tax_rate / 100;
                    $("#step_tax #tax").val(tax);
                    return true;
                },
                setTaxTotal : function () {
                    var expense_total = parseFloat($("#step_tax #expense_total").val());
                    var tax = parseFloat($("#step_tax #tax").val());
                    var tax_total = expense_total + tax;
                    $("#step_tax #tax_total").val(tax_total);
                    return true;
                },
                changeTaxRate: function() {
                    L._fn.step_tax.getTaxRate();
                    L._fn.step_tax.setTax();
                    L._fn.step_tax.setTaxTotal();
                    L._fn.step_expenses.showNext();
                    return true;
                },
                changeTax: function() {
                    L._fn.step_tax.setTaxRateByTax();
                    L._fn.step_tax.setTax();
                    L._fn.step_tax.setTaxTotal();
                    L._fn.step_expenses.showNext();
                    return true;
                },
                setTaxRateByTax: function() {
                    var expense_total = parseFloat($("#step_tax #expense_total").val());
                    var tax = parseFloat($("#step_tax #tax").val());
                    var tax_rate = tax / expense_total;
                    tax_rate  = tax_rate * 100;
                    L.config.tax_rate = tax_rate;
                    L._fn.step_tax.setTaxRate();
                    return true;
                },
                clickNext : function() {
                    L._fn.step_tip.init();
                    L._fn.step_tax.showNext();
                },
                showNext : function() {
                    $("#step_tax").hide();
                    $("#step_tip").show();
                },
                clickBack : function() {
                    $("#step_tax").hide();
                    $("#step_expenses").show();
                }
            },
            step_tip: {
                init: function () {
                    L._fn.step_tip.setTipRate();
                    L._fn.step_tip.setTipRateText();
                    L._fn.step_tip.setTip();
                    L._fn.step_tip.setTipTotal();
                    return true;
                },
                setTipRate : function() {
                    $("#step_tip #tip_rate").val(L._fn.util.getRoundedNumber(L.config.tip_rate, 2));
                    return true;
                },
                setTipRateText : function() {
                    $("#step_tip #tip_rate_text").text(L._fn.util.getRoundedNumber(L.config.tip_rate, 1));
                    return true;
                },
                getTipRate : function() {
                    L.config.tip_rate = L._fn.util.getRoundedNumber($("#step_tip #tip_rate").val(), 2);
                    return true;
                },
                setTip : function () {
                    var tax_total = $("#step_tax #tax_total").val();
                    var tip = tax_total * L.config.tip_rate / 100;
                    $("#step_tip #tip").val(L._fn.util.getRoundedNumber(tip, 2));
                    return true;
                },
                setTipTotal : function () {
                    var tax_total = parseFloat($("#step_tax #tax_total").val());
                    var tip = parseFloat($("#step_tip #tip").val());
                    var tip_total = tax_total + tip;
                    $("#step_tip #tip_total").val(L._fn.util.getRoundedNumber(tip_total, 2));
                    return true;
                },
                changeTipRate: function() {
                    L._fn.step_tip.getTipRate();
                    L._fn.step_tip.setTipRateText();
                    L._fn.step_tip.setTip();
                    L._fn.step_tip.setTipTotal();
                    L._fn.step_tax.showNext();
                    return true;
                },
                changeTip: function() {
                    L._fn.step_tip.setTipRateByTip();
                    L._fn.step_tip.setTipRateText();
                    L._fn.step_tip.setTip();
                    L._fn.step_tip.setTipTotal();
                    L._fn.step_tax.showNext();
                    return true;
                },
                changeTipTotal: function() {
                    var tax_total = parseFloat($("#step_tax #tax_total").val());
                    var tip_total = parseFloat($("#step_tip #tip_total").val());
                    $("#step_tip #tip").val(L._fn.util.getRoundedNumber(tip_total - tax_total, 2));
                    L._fn.step_tip.changeTip();
                    return true;
                },
                setTipRateByTip: function() {
                    var tax_total = parseFloat($("#step_tax #tax_total").val());
                    var tip = parseFloat($("#step_tip #tip").val());
                    L.config.tip_rate = tip / tax_total * 100;
                    L._fn.step_tip.setTipRate();
                    return true;
                },
                clickNext : function() {
                    L._fn.step_result.init();
                    L._fn.step_tip.showNext();
                },
                showNext : function() {
                    $("#step_tip").hide();
                    $("#step_result").show();
                },
                clickBack : function() {
                    $("#step_tip").hide();
                    $("#step_tax").show();
                }
            },
            step_result : {
                init : function() {
                    L._fn.step_result.addResultInputs();
                    L._fn.step_result.divide();
                },
                addResultInputs: function() {
                    $("#step_result #result ul").remove();
                    $("#step_result #result").append("<ul></ul>");
                    var name = '';
                    for (var i = 1; i <= L.config.count; i++) {
                        name = $("#step_names #name"+i).val();
                        $('#step_result #result ul').append('<li><label>'+name+'</label> <input type="number" id="result'+i+'" value="" /></li>');
                    }
                },
                divide : function() {
                    // extra tax
                    var expense_total = parseFloat($("#step_tax #expense_total").val());
                    var org_tax = L._fn.step_tax.getTax(expense_total);
                    var cur_tax = parseFloat($("#step_tax #tax").val());
                    var dif_tax = cur_tax - org_tax;
                    var added_tax_each = dif_tax / L.config.count;

                    // tip
                    var cur_tip = $("#step_tip #tip").val();
                    var tip_total = $("#step_tip #tip_total").val();
                    var tip_each = cur_tip / L.config.count;

                    // each with tax
                    var total_each = 0;
                    var expense1, expense2, expense3;
                    var tax_each;
                    var total_final = 0;
                    for (var i=1; i<=L.config.count; i++) {
                        total_each = 0;
                        expense1 = $("#step_expenses #expense"+i+"_1").val();
                        if (expense1 !== undefined && expense1 !== '') {
                            total_each += parseFloat(expense1);
                        }
                        expense2= $("#step_expenses #expense"+i+"_2").val();
                        if (expense2 !== undefined && expense2 !== '') {
                            total_each += parseFloat(expense2);
                        }
                        expense3 = $("#step_expenses #expense"+i+"_3").val();
                        if (expense3 !== undefined && expense3 !== '') {
                            total_each += parseFloat(expense3);
                        }
                        tax_each = L._fn.step_tax.getTax(total_each);
                        total_each = total_each + tax_each + added_tax_each + tip_each;
                        total_each = L._fn.util.getRoundedNumber(total_each, 2);
                        $("#step_result #result"+i).val(total_each);
                        total_final += total_each;
                    }
                    var diff = tip_total - total_final;
                    if (diff >= 1) {
                        if (diff < L.config.count) {
                            var ran = 0;
                            for (var i=0; i<=L.config.count; i++) {
                                ran = Math.floor((Math.random() * L.config.count) + 1);
                                $("#step_result #result"+ran).val(parseFloat($("#step_result #result"+ran).val()) + 1);
                            }
                        }else {
                            alert('error');
                        }
                    }
                },
                clickNext : function() {
                    location.reload();
                },
                clickBack : function() {
                    $("#step_result").hide();
                    $("#step_tip").show();
                }
            }
        }
    };