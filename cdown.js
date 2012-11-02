
$.prototype.cdown = function (options)
{
  var cdown =
  {
    math: Math,
    options: options
  };

  cdown.options.use_plain_text = ('use_plain_text' in cdown.options) ? cdown.options.use_plain_text : true;
  cdown.options.labels = ('labels' in cdown.options) ? cdown.options.labels :
  {
    days:    'Days',
    hours:   'Hours',
    minutes: 'Minutes',
    seconds: 'Seconds'
  };
  
  cdown.runtime = cdown.math.round(+ new Date() / 1000);

  var d = {start: cdown.options.start, end: cdown.options.end};
  for (i in d)
  {
    if (d[i] instanceof Date)
    {
      cdown[i] = cdown.math.round(+ d[i] / 1000);
    }
    else if (+ d[i] > 0)
    {
      cdown[i] = + d[i];
    }
    else
    {
      return;
    }
  }

  cdown.element = this;

  cdown.onehour = 3600;
  cdown.oneday  = 24 * cdown.onehour;

  cdown.date_intervals = function (n)
  {
    n = + n;
    var val =
    {
      days    : '00',
      hours   : '00',
      minutes : '00',
      seconds : '00'
    };

    if (n < 0)
    {
      return val;
    }

    val.days = cdown.math.floor(n / cdown.oneday);
    n -= val.days * cdown.oneday;

    val.hours = cdown.math.floor(n / cdown.onehour);
    n -= val.hours * cdown.onehour;

    val.minutes = cdown.math.floor(n / 60);
    n -= 60 * val.minutes;

    val.seconds = n;

    for (i in val)
    {
      (val[i] >= 0 && val[i] < 10) && (val[i] = '0' + val[i]);
    }

    return val;
  };

  cdown.init_html = function ()
  {
    if (cdown.options.use_plain_text)
    {
      var html = '00:00:00:00';
      cdown.element.html(html);
    }
    else
    {
      var html =
          '<div class="cdown_p">' +
          '  <div class="cdown_number cdown_days">00</div>' +
          '  <div class="cdown_label">' + cdown.options.labels.days + '</div>' +
          '</div>' +
          '<span class="cdown_colon">:</span>' +
          '<div class="cdown_p">' +
          '  <div class="cdown_number cdown_hours">00</div>' +
          '  <div class="cdown_label">' + cdown.options.labels.hours + '</div>' +
          '</div>' +
          '<span class="cdown_colon">:</span>' +
          '<div class="cdown_p">' +
          '  <div class="cdown_number cdown_minutes">00</div>' +
          '  <div class="cdown_label">' + cdown.options.labels.minutes + '</div>' +
          '</div>' +
          '<span class="cdown_colon">:</span>' +
          '<div class="cdown_p">' +
          '  <div class="cdown_number cdown_seconds">00</div>' +
          '  <div class="cdown_label">' + cdown.options.labels.seconds + '</div>' +
          '</div>';

      cdown.element.html(html);
      cdown.children = cdown.element.find('.cdown_number');
    }
  }

  cdown.update = function ()
  {
    var now = cdown.math.round(+ new Date() / 1000);
    var diff = cdown.end - (cdown.start + (now - cdown.runtime));

    var intervals = cdown.date_intervals(diff);

    if (cdown.options.use_plain_text)
    {
      var html = intervals.days + ':' + intervals.hours + ':' + intervals.minutes + ':' + intervals.seconds; 
      cdown.element.html(html);
    }
    else
    {
      cdown.children.each(function ()
      {
        var t = $(this);
        var classes = t[0].className.split(' ');
        for (i in classes)
        {
          if (classes[i] == 'cdown_number')
          {
            continue;
          }
          else
          {
            var index = classes[i].slice(6);
          }
        }
        t.html(intervals[index]);
      });
    }

    setTimeout(cdown.update, 999);
  }

  cdown.init_html();
  cdown.update();

  return cdown.element;
}

























