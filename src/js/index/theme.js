/*
 * @Date: 2022-11-26 17:10:31
 * @LastEditors: Leo
 * @LastEditTime: 2022-12-28 09:42:00
 * @FilePath: \3.0-manger\src\js\index\theme.js
 */
import $ from 'jquery'
import '../../css/theme.less'

window.jQuery = window.$ = $
__webpack_public_path__ = window.__webpack_public_path__;

function debounce(fn, wait) {
    let t;
    return (...args) => {
        clearTimeout(t);
        t = setTimeout(() => fn.apply(this, args), wait);
    };
}


const trapFocusHandlers = {};
function getFocusableElements(container) {
    return Array.from(
        container.querySelectorAll(
            "summary, a[href], button:enabled, [tabindex]:not([tabindex^='-']), [draggable], area, input:not([type=hidden]):enabled, select:enabled, textarea:enabled, object, iframe"
        )
    );
}

function trapFocus(container, elementToFocus = container) {
    var elements = getFocusableElements(container);
    var first = elements[0];
    var last = elements[elements.length - 1];

    removeTrapFocus();

    trapFocusHandlers.focusin = (event) => {
        if (
            event.target !== container &&
            event.target !== last &&
            event.target !== first
        )
            return;

        document.addEventListener('keydown', trapFocusHandlers.keydown);
    };

    trapFocusHandlers.focusout = function () {
        document.removeEventListener('keydown', trapFocusHandlers.keydown);
    };

    trapFocusHandlers.keydown = function (event) {
        if (event.code.toUpperCase() !== 'TAB') return; // If not TAB key
        // On the last focusable element and tab forward, focus the first element.
        if (event.target === last && !event.shiftKey) {
            event.preventDefault();
            first.focus();
        }

        //  On the first focusable element and tab backward, focus the last element.
        if (
            (event.target === container || event.target === first) &&
            event.shiftKey
        ) {
            event.preventDefault();
            last.focus();
        }
    };

    document.addEventListener('focusout', trapFocusHandlers.focusout);
    document.addEventListener('focusin', trapFocusHandlers.focusin);

    elementToFocus.focus();
}

function removeTrapFocus(elementToFocus = null) {
    document.removeEventListener('focusin', trapFocusHandlers.focusin);
    document.removeEventListener('focusout', trapFocusHandlers.focusout);
    document.removeEventListener('keydown', trapFocusHandlers.keydown);

    if (elementToFocus) elementToFocus.focus();
}