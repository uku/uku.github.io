function change_amount_choices(multiplier) {
    $('#amount-2').val(2 * multiplier);
    $('#amount-5').val(5 * multiplier);
    $('#amount-10').val(10 * multiplier);

    $('#amount-2-text').text('$' + 2 * multiplier);
    $('#amount-5-text').text('$' + 5 * multiplier);
    $('#amount-10-text').text('$' + 10 * multiplier);
    $('#custom-amount-input').val(20 * multiplier);
}

function get_selected_amount() {
    var amount = $('input[name=amount-options]:checked').val();
    if (amount == 'custom') {
        amount = $('#custom-amount-input').val();
    }
    return amount;
}

$(document).ready(function() {
    // Payment div switch
    $('#select-paypal').change(function() {
        $('#alipay').hide();
        $('#paypal').show();
    });

    $('#select-alipay').change(function() {
        $('#paypal').hide();
        $('#alipay').show();
    });

    // Select currency
    $('#select-usd').change(function() {
        $('#hidden-form-currency').val('USD');
        change_amount_choices(1);
    });

    $('#select-cad').change(function() {
        $('#hidden-form-currency').val('CAD');
        change_amount_choices(1);
    });

    $('#select-twd').change(function() {
        $('#hidden-form-currency').val('TWD');
        change_amount_choices(33);
    });

    $('#select-hkd').change(function() {
        $('#hidden-form-currency').val('HKD');
        change_amount_choices(7);
    });

    // Custom amount
    $('#amount-custom').change(function() {
        $('#custom-amount-input').focus();
    });

    $('#custom-amount-input').focus(function() {
        $("#amount-custom").prop("checked", true)
    });

    // Donation button
    $('#paypal-donation-button').click(function(event) {
        event.preventDefault();
        $(this).button('loading');

        $('#hidden-form-amount').val(get_selected_amount());

        $('#paypal-hidden-form').submit();
    });

    // Learnt from http://mo2g.com/view/102/
    //jQuery(function($) {
    //    $('script[data-url]').each(function() {
    //        var _this = $(this),
    //            url = _this.attr('data-url');
    //        _this.attr('src', url);
    //    });
    //});
});