import store from 'store';

class Tr {
    dictionary = {};
    language = '';

    constructor(language, dictionary) {
        this.language = language;
        this.dictionary = dictionary;
    }

    setLanguage(language) {
        this.language = language;
    }

    addDictionary(language, dictionary, category = 'main') {
        if (typeof this.dictionary[language] == "undefined") {
            this.dictionary[language] = {};
        }

        if (typeof this.dictionary[language][category] == "undefined") {
            this.dictionary[language][category] = dictionary;
        }
    }

    process(message, params, dictionary) {
        // try to translate string
        let translation = (dictionary && typeof dictionary[message] !== 'undefined') ? dictionary[message] : message;
        if (!translation) {
            return false;
        }

        if (typeof params == 'undefined') {
            params = 0;
        }

        // declare numeric param
        let num = 0;

        // extract number from params
        if (params % 1 === 0) {
            // param is numeric, convert to object key for convenience
            params = {'n': params};
        }

        if (params.n % 1 === 0) {
            num = params.n;
        }

        // split translation into pieces
        let chunks = translation.split('|');

        if (translation.indexOf('#') !== -1) { // translation contains expression
            for (let i = 0; i < chunks.length; i++) {
                let pieces = chunks[i].split('#'), // split each chunk in two parts (0: expression, 1: message)
                    ex = pieces[0],
                    msg = pieces[1];

                if (pieces.length == 2) {
                    // handle number shortcut (0 instead of n==0)
                    if (ex % 1 === 0) {
                        ex = 'n==' + ex;
                    }

                    // create expression to be evaluated (e.g. n>3)
                    let eval_expr = ex.split('n').join(num);

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
            for (let key in params) {
                translation = translation.split('{' + key + '}').join(params[key]);
            }
        }

        return translation;
    }

    t(message, params = {}, category = 'main') {
        let dictionary = false;
        if (typeof this.dictionary[this.language] !== 'undefined') {
            if (category && typeof this.dictionary[this.language][category] !== 'undefined') {
                dictionary = this.dictionary[this.language][category];
            }
        }
        return this.process(message, params, dictionary);
    }

    ta(obj, attr) {
        attr += '_' + this.language;
        return obj ? obj[attr] : null;
    }
}

let { translate } = store.getState();
const tr = new Tr(translate.language, translate.translate);

export default tr;