import Navigo from "navigo";
const router = new Navigo("/", { linksSelector: "a", hash: false });

let effects = [];
let currentEffectOrder = 0;

let rootComponent = null;
let rootContainer = null;

let states = [];
let currentStateOrder = 0;

const debounce = (fn, timeout = 100) => {
    let timeId = null;

    return (...rest) => {
        if (timeId) clearTimeout(timeId);

        timeId = setTimeout(() => fn(...rest), timeout);
    };
};

const render = (component, container) => {
    container.innerHTML = component();

    rootComponent = component;
    rootContainer = container;

    effects.forEach((effect) => {
        effect.cb();
    });
};

const rerender = debounce(() => {
    currentStateOrder = 0;
    currentEffectOrder = 0;
    rootContainer.innerHTML = rootComponent();

    effects.forEach((effect) => {
        // shouldRunEffect = true khi không truyền deps hoặc deps khác nhau
        const shouldRunEffect =
            !effect.nextDeps ||
            effect.nextDeps?.some((dep, i) => {
                return dep !== effect?.prevDeps?.[i];
            });

        if (shouldRunEffect) {
            effect.cb();
        }
    });
});

const useState = (initialState) => {
    let state;
    let stateOrder = currentStateOrder;

    if (states[stateOrder] !== undefined) {
        state = states[stateOrder];
    } else {
        state = states[stateOrder] = initialState;
    }

    const updater = (newState) => {
        if (newState === undefined) {
            throw new Error("New state must not be undefined");
        }

        states[stateOrder] =
            typeof newState === "function" ? newState(states[stateOrder]) : newState;

        rerender();
    };

    currentStateOrder++;

    return [state, updater];
};

const useEffect = (cb, deps) => {
    let effectOrder = currentEffectOrder;

    if (!effects[effectOrder]) {
        effects.push({
            cb: cb,
            prevDeps: null,
            nextDeps: deps,
        });
    } else {
        effects[effectOrder] = {
            cb: cb,
            prevDeps: effects[effectOrder].nextDeps,
            nextDeps: deps,
        };
    }

    currentEffectOrder++;
};

router.on("/*", () => {}, {
    before(done, match) {
        states = [];
        currentStateOrder = 0;
        effects = [];
        currentEffectOrder = 0;

        done();
    },
});

function showMesssage(status, messageContent) {
    var messEl = document.getElementById("toast");
    if(status) {
        messEl.className = "show style-success";
        setTimeout(function(){ messEl.className = messEl.className.replace("show style-success", ""); }, 4700);
    }
    else {
        messEl.className = "show style-error";
        setTimeout(function(){ messEl.className = messEl.className.replace("show style-error", ""); }, 4700);
    }
    messEl.querySelector('#desc').innerText = messageContent;
}

function showSpinner(action) {
    console.log("🚀 ~ file: lib.js:126 ~ showSpinner ~ document.getElementById('spinner'):", document.getElementById('spinner'))
    if(action) {
        document.getElementById('spinner').style.display = 'flex'
    }
    else {
        document.getElementById('spinner').style.display = 'none'
    }
}

export { render, useState, useEffect, router, showMesssage, showSpinner };
