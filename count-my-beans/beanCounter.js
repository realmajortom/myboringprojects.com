/* eslint-disable no-alert, no-console */

function beanCounter(brewUnit, desiredQuantity, brewStrength) {

  const ratios = {
      strong: 70,
      medium: 60,
      mild: 50
  };

  let quant = eval(desiredQuantity.split('').filter(item => /[0-9.]/.test(item)).join(''));

  if (brewUnit === 'ounce') {
    quant /= 33.814;
  } else {
    quant *= 0.001;
  }

  const grams = Math.round((ratios[brewStrength] * quant * 10) / 10);

  const message = `Use ${grams} grams of coffee for the perfect brew!`;

  $('#results').html(message);

}

$(document).ready(function () {
  $("input[type='button']").click(function () {
    let strength = $("input[type=radio][name=strength]:checked").val();
    let unit = $("input[type=radio][name=unit]:checked").val();
    let quantity = $("#quantPut").val();

    beanCounter(unit, quantity, strength);
  });
});
