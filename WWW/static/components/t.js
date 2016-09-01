if (typeof tr == 'undefined') {
    var tr = {};
}

// Setup data structure
tr.translate = {
    dictionary: {},
    config: {
        language: ''
    }
};

tr.translate.addDictionary = function (language, dictionary, category) {
    category = category || 'main';

    if (typeof tr.translate.dictionary[language] == "undefined") {
        tr.translate.dictionary[language] = {};
    }

    if (typeof tr.translate.dictionary[language][category] == "undefined") {
        tr.translate.dictionary[language][category] = dictionary;
    }
};

/**
 * Process translations
 *
 * @param message the message to be translated
 * @param params array of parameters (number, placeholders)
 * @param dictionary instance of dictionary
 * @return translated string
 */
tr.translate.process = function (message, params, dictionary) {

    // try to translate string
    var translation = (dictionary && typeof dictionary[message] !== 'undefined') ? dictionary[message] : message;
    if (!translation) {
        return false;
    }

    if (typeof params == 'undefined') {
        params = 0;
    }

    // declare numeric param
    var num = 0;

    // extract number from params
    if (params % 1 === 0) {
        // param is numeric, convert to object key for convenience
        params = {'n': params};
    }

    if (params.n % 1 === 0) {
        num = params.n;
    }

    // split translation into pieces
    var chunks = translation.split('|');

    if (translation.indexOf('#') !== -1) { // translation contains expression
        for (var i = 0; i < chunks.length; i++) {
            var pieces = chunks[i].split('#'), // split each chunk in two parts (0: expression, 1: message)
                ex = pieces[0],
                msg = pieces[1];

            if (pieces.length == 2) {
                // handle number shortcut (0 instead of n==0)
                if (ex % 1 === 0) {
                    ex = 'n==' + ex;
                }

                // create expression to be evaluated (e.g. n>3)
                var eval_expr = ex.split('n').join(num);

                // if expression matches, set translation to current chunk
                if (eval(eval_expr)) {
                    translation = msg;
                    break;
                }
            }
        }
    } else if (chunks.length > 1) {
        // if translation doesn't contain # but does contain |, treat it as simple choice format
        translation = (num == 1) ? chunks[0] : chunks[1];
    }

    // replace placeholder/replacements
    if (typeof(params == 'Object')) {
        for (var key in params) {
            translation = translation.split('{' + key + '}').join(params[key]);
        }
    }

    return translation;
};

/**
 * Shortcut function to translate
 * This fetches the right dictionary (language/category) and passes it to the actual translate function
 *
 * @param category of the translation
 * @param message the message to be translated
 * @param params array of parameters (number, placeholders)
 * @param params language code to translate to (will use fallback if not supplied)
 * @return translated message
 */
var t = tr.t = function (message, params, category) {
    params = params || {};
    category = category || 'main';

    // use supplied language, if not defined, fall back on config
    var lang = tr.translate.config.language,
        dictionary = false;

    // find dictionary
    if (typeof tr.translate.dictionary[lang] !== 'undefined') {
        if (category && typeof tr.translate.dictionary[lang][category] !== 'undefined') {
            dictionary = tr.translate.dictionary[lang][category];
        }
    }

    // pass message and dictionary to translate function
    return tr.translate.process(message, params, dictionary);
};

var ta = function(obj, attr) {
    attr += '_' + tr.translate.config.language;
    return obj[attr];
};