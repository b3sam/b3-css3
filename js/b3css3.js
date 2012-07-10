//UnitWatch
//SelectGroup
//BoxShadow
//Picko

;(function(B3, window, undefined) {

    B3.BorderRadius = {};
    B3.BoxShadow = {};
    B3.TextShadow = {};
    B3.Transition = {};
    B3.Transform = {};

    B3.Utilities = (function() {
        var Color = function(){
            this.rgba = {
                r : 0,
                g : 255,
                b : 0,
                a : 0
            };
        };

        Color.prototype = (function() {
            var strings = {
                rgb  : 'rgb({{r}}, {{g}}, {{b}})',
                rgba : 'rgba({{r}}, {{g}}, {{b}}, {{a}})',
                hsl  : 'hsl({{h}}, {{s}}, {{l}})',
                hsla : 'hsl({{h}}, {{s}}, {{l}}, {{a}})',
                hex  : '#{{hex}}'
            };

            // Get a color string we can use in our CSS
            var toString = function (mode) {
                var string = strings[mode],
                    color = getColorObject.call(this, mode);

                for (var i in color)
                {
                    string = string.replace('{{' + i + '}}', color[i]);
                }

                return string;
            };

            var getColorObject = function (mode) {
                if (mode === 'rgb' || mode == 'rgba')
                {
                    return this.rgba;
                }
                else if (mode === 'hsl' || mode === 'hsla')
                {
                    return RGBAtoHSLA(this.rgba);
                }
                else if (mode === 'hex')
                {
                    return RGBAtoHEX(this.rgba);
                }

                return;
            };

            //http://en.wikipedia.org/wiki/HSL_color_space
            var RGBAtoHSLA = function (rgba) {
                var r = rgba.r, g = rgba.g, b = rgba.b, a = rgba.a;

                r /= 255, g /= 255, b /= 255; // Scale RGB to the range [0,1]

                var M = Math.max(r, g, b),
                    m = Math.min(r, g, b),

                    C = M - m, // "Chroma"
                    H, S, // Hue, Saturation
                    L = (M + m) / 2; // Use the "bi-hexcone" model for Lightness

                H = (C === 0 ? 0 : M == r ? ((g - b) / C % 6) :
                                   M == g ? ((b - r) / C + 2) :
                                            ((r - g) / C + 4));
                H = (H / 6) * 360; // Convert hue to degrees

                S = (C === 0 ? 0 : L <= 0.5 ? (C / (2 * L)) :
                                              (C / (2 - (2 * L))));

                // Round these badboys and convert saturation and lightness to % for CSS usage
                return {
                    h: Math.round(H),
                    s: Math.round(S * 100),
                    l: Math.round(L * 100),
                    a: a
                };
            };

            //http://en.wikipedia.org/wiki/HSL_and_HSV#Converting_to_RGB
            var HSLAtoRGBA = function (hsla) {
                var h = hsla.h, s = hsla.s, l = hsla.l, a = hsla.a;

                var H = h / 60,
                    S = s / 100, L = l / 100, // Scale S and L to the range [0,1]

                    C = (1 - Math.abs(2 * L - 1)) * S, // "Chroma"
                    X = C * (1 - Math.abs(H % 2 - 1)), // Second largest component
                    m = L - (C / 2), // Match lightness
                    R = G = B = m;

                i = ~~H; // H'index
                R += [C, X, 0, 0, X, C][i];
                G += [X, C, C, X, 0, 0][i];
                B += [0, 0, X, C, C, X][i];

                // Round these badboys and put them on an 8 bit scale yo
                return {
                    r: Math.round(R * 255),
                    b: Math.round(G * 255),
                    g: Math.round(B * 255),
                    a: a
                };
            };

            var RGBAtoHex = function (rgba) {
                var r = rgba.r, g = rgba.g, b = rgba.b;

                var hex = (16777216 + (r << 16)  + (g << 8) + b).toString(16).slice(1); // Convert to nice big 24bit colour value, turn into hex and chop off pre-pended 1

                return {
                    hex : ['#', hex].join('')
                };
            };

            return {
                toString : toString,
                HSLAtoRGBA : HSLAtoRGBA,
                RGBAtoHex : RGBAtoHex
            };
        })();

        var SelectGroup = {},
            UnitWatch = {};

        return {
            Color       : new Color(),
            SelectGroup : SelectGroup,
            UnitWatch   : UnitWatch
        };
    })();

})( window.B3 = window.B3 || {}, window );