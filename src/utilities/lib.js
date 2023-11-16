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
  if (status) {
    messEl.className = "show style-success";
    setTimeout(function () {
      messEl.className = messEl.className.replace("show style-success", "");
    }, 4700);
  } else {
    messEl.className = "show style-error";
    setTimeout(function () {
      messEl.className = messEl.className.replace("show style-error", "");
    }, 4700);
  }
  messEl.querySelector("#desc").innerText = messageContent;
}

function showSpinner(action) {
    if(action) {
        document.getElementById('spinner').style.display = 'flex'
    }
    else {
        document.getElementById('spinner').style.display = 'none'
    }
}

function convertVND(number) {
    return Number(number).toLocaleString('vi', {style : 'currency', currency : 'VND'})
}

function timeAgo(date) {
    const currentDate = new Date();
    const pastDate = new Date(date);
    const timeDifference = currentDate - pastDate;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(weeks / 4);
    const years = Math.floor(months / 12);
    
    if (years > 0) {
    return `${years} năm trước`;
    } else if (months > 0) {
    return `${months} tháng trước`;
    } else if (weeks > 0) {
    return `${weeks} tuần trước`;
    } else if (days > 0) {
    return `${days} ngày trước`;
    } else if (hours > 0) {
    return `${hours} giờ trước`;
    } else if (minutes > 0) {
    return `${minutes} phút trước`;
    } else {
    return `${seconds} giây trước`;
    }
}

export { render, useState, useEffect, router, showMesssage, showSpinner, convertVND, timeAgo };
