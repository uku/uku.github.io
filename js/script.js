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

    // PayPal monthly
    $('#input-monthly').change(function() {
        if ($('#input-monthly').is(':checked')) {
            $('#hidden-form-command').val('_xclick-subscriptions');
        } else {
            $('#hidden-form-command').val('_xclick');
        }
    });

    // Donation button
    $('#paypal-donation-button').click(function(event) {
        event.preventDefault();
        $(this).button('loading');

        var donation_amount = get_selected_amount();
        $('#hidden-form-amount').val(donation_amount);
        $('#hidden-form-monthly-amount').val(donation_amount);

        $('#paypal-hidden-form').submit();

        ga('send', 'event', 'Donation', 'PayPal Submit');
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