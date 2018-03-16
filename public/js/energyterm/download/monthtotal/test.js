$("#historyEnergyChart .budgetDataLabel")[0]

  [
    "onmousedown",
    "onmouseenter",
    "onmouseleave",
    "onmousemove",
    "onmouseout",
    "onmouseover",
    "onmouseup",
    "onmousewheel"
  ].forEach(function(param) {

    $("#historyEnergyChart .budgetDataLabel")[0][param] = function(e) {
      console.log(param)
      window.onmouseover = true;
      e.stopPropagation();
    };
  })

  ["onmouseover"].forEach(function(param) {
    $("#historyEnergyChart .budgetDataLabel")[0][param] = function(e) {
      window.onmouseoverRecord = true;

      $.each(
        $(".highcharts-label.highcharts-tooltip.highcharts-color-undefined"),
        function(index, item) {
          _.isFunction($(item).css) && $(item).css({ display: 'none' });

        }
      );
    };
  });

  ["onmouseout"].forEach(function(param) {
    $("#historyEnergyChart .budgetDataLabel")[0][param] = function(e) {
      window.onmouseoverRecord = false;

      $.each(
        $(".highcharts-label.highcharts-tooltip.highcharts-color-undefined"),
        function(index, item) {
          _.isFunction($(item).css) && $(item).css({ display: 'block' });
        }
      );
    };
  });

  
