"use strict";

function dice_initialize(container, w, h) 
{
    $t.remove($t.id('loading_text'));

    var canvas = $t.id('canvas');
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';

    $t.id('sethelp').style.top = h * 0.50 - 160 + 'px';

    var label = $t.id('label');
    label.parentNode.style.width = w + 'px';
    label.style.top = h * 0.45 + 'px';
    $t.id('labelhelp').style.top = h - 120 + 'px';

    var set = $t.id('set');
    set.parentNode.style.width = w + 'px';
    set.style.top = h * 0.52 + 'px';
    on_set_change();

    function on_set_change(ev) { set.style.width = set.value.length + 3 + 'ex'; }
    $t.bind(set, 'keyup', on_set_change);
    $t.bind(set, 'mousedown', function(ev) { ev.stopPropagation(); });
    $t.bind(set, 'mouseup', function(ev) { ev.stopPropagation(); });
    $t.bind(set, 'focus', function(ev) { $t.set(container, { class: '' }); });
    $t.bind(set, 'blur', function(ev) { $t.set(container, { class: 'svg' }); });

    var clear = $t.id('clear');
    clear.style.top = h * 0.52 + 10 + 'px';

    $t.bind(clear, ['mouseup', 'touchend', 'touchcancel'], function(ev) {
        ev.stopPropagation();
        set.value = '0';
        on_set_change();
    });

    var box = new $t.dice.dice_box(canvas);

    function show_selector() {
        label.parentNode.style.display = 'none';
        set.parentNode.style.display = 'inline-block';
        box.draw_selector();
    }

    function before_roll() {
        label.parentNode.style.display = 'none';
        set.parentNode.style.display = 'none';
    }

    function notation_getter() {
        return $t.dice.parse_notation(set.value);
    }

    function after_roll(notation, result) {
        var res = result.join(' ');
        if (notation.constant) res += ' +' + notation.constant;
        if (result.length > 1) res += ' = ' + 
                (result.reduce(function(s, a) { return s + a; }) + notation.constant);
        label.innerHTML = res;
        label.parentNode.style.display = 'inline-block';
    }

    box.bind_mouse(container, notation_getter, before_roll, after_roll);

    $t.bind(container, ['mouseup', 'touchend', 'touchcancel'], function(ev) {
        if (set.parentNode.style.display == 'none') {
            if (!box.rolling) show_selector();
            box.rolling = false;
            return;
        }
        var step = box.w / 4.5;
        var x = Math.floor((ev.clientX - (box.w - step / 2 - step * 3)) / step);
        var y = ev.clientY - (box.h - step / 2);
        if (x >= 0 && x <= $t.dice.known_types.length && y >= 0 && y <= step) {
            var match = $t.dice.known_types[x];
            var notation = $t.dice.parse_notation(set.value);
            notation.set.push(match);
            set.value = $t.dice.stringify_notation(notation);
            on_set_change();
        }
    });

    show_selector();
}
