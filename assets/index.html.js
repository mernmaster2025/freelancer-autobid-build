import { r as reactExports, j as jsxRuntimeExports, c as createRoot, R as React, P as Provider_default, d as PersistGate } from "./react.js";
import { S as SCRIPT_STATUS, l as logger, e as store, G as persistor } from "./logger.js";
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
function MainContent() {
  const [status, setStatus] = reactExports.useState(SCRIPT_STATUS.STOPPED);
  const [sessionBidsCount, setSessionBidsCount] = reactExports.useState(0);
  const [autoBotCount, setAutoBotCount] = reactExports.useState(0);
  const [unreadLogsCount, setUnreadLogsCount] = reactExports.useState(0);
  const [isPremium, setIsPremium] = reactExports.useState(false);
  const [membership, setMembership] = reactExports.useState(null);
  const [trialEndsAt, setTrialEndsAt] = reactExports.useState(null);
  const [isStarting, setIsStarting] = reactExports.useState(false);
  const [isStopping, setIsStopping] = reactExports.useState(false);
  const parsePersistedValue = (value) => {
    if (value === null || value === void 0) return null;
    if (typeof value === "string") {
      try {
        const parsed = JSON.parse(value);
        if (typeof parsed === "string") {
          try {
            return JSON.parse(parsed);
          } catch {
            return parsed;
          }
        }
        return parsed;
      } catch (e) {
        return value;
      }
    }
    return value;
  };
  const updateStateFromStorage = () => {
    chrome.storage.local.get(["persist:bidding", "persist:settings", "persist:logs", "persist:auth"], (result) => {
      if (chrome.runtime.lastError) {
        logger.error(`Error reading storage: ${chrome.runtime.lastError.message}`, "popup");
        return;
      }
      if (result["persist:bidding"]) {
        const biddingState = parsePersistedValue(result["persist:bidding"]);
        if (biddingState && typeof biddingState === "object") {
          const parsedStatus = parsePersistedValue(biddingState.status);
          const parsedSessionBidsCount = parsePersistedValue(biddingState.sessionBidsCount);
          setStatus(parsedStatus || SCRIPT_STATUS.STOPPED);
          setSessionBidsCount(typeof parsedSessionBidsCount === "number" ? parsedSessionBidsCount : 0);
        }
      }
      if (result["persist:auth"]) {
        const authState = parsePersistedValue(result["persist:auth"]);
        if (authState && typeof authState === "object") {
          let profile = null;
          if (authState.profile) {
            profile = typeof authState.profile === "string" ? parsePersistedValue(authState.profile) : authState.profile;
          }
          if (profile && profile.membership) {
            const membershipValue = profile.membership;
            setMembership(membershipValue);
            setIsPremium(membershipValue === "premium" || membershipValue === "ultra");
            if (profile.trial_ends_at) {
              const trialEnds = typeof profile.trial_ends_at === "string" ? parsePersistedValue(profile.trial_ends_at) : profile.trial_ends_at;
              setTrialEndsAt(trialEnds);
            } else {
              setTrialEndsAt(null);
            }
          } else {
            setMembership(null);
            setIsPremium(false);
            setTrialEndsAt(null);
          }
        }
      }
      if (result["persist:settings"]) {
        const settingsState = parsePersistedValue(result["persist:settings"]);
        if (settingsState && typeof settingsState === "object") {
          const parsedAutoBotCount = parsePersistedValue(settingsState.autoBotCount);
          setAutoBotCount(typeof parsedAutoBotCount === "number" ? parsedAutoBotCount : 0);
        }
      }
      if (result["persist:logs"]) {
        const logsState = parsePersistedValue(result["persist:logs"]);
        if (logsState && typeof logsState === "object") {
          const parsedUnreadCount = parsePersistedValue(logsState.unreadCount);
          setUnreadLogsCount(typeof parsedUnreadCount === "number" ? parsedUnreadCount : 0);
        }
      }
    });
  };
  reactExports.useEffect(() => {
    updateStateFromStorage();
  }, []);
  reactExports.useEffect(() => {
    const handleStorageChange = (changes, areaName) => {
      if (areaName === "local") {
        if (changes["persist:bidding"] || changes["persist:settings"] || changes["persist:logs"] || changes["persist:auth"]) {
          logger.log("Bidding/settings/logs/auth state changed in storage, updating", "popup");
          updateStateFromStorage();
        }
      }
    };
    chrome.storage.onChanged.addListener(handleStorageChange);
    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, []);
  reactExports.useEffect(() => {
    logger.log(`Status: ${status}, SessionBids: ${sessionBidsCount}, AutoBotCount: ${autoBotCount}, UnreadLogsCount: ${unreadLogsCount}`, "popup");
  }, [status, sessionBidsCount, autoBotCount, unreadLogsCount]);
  const sendMessageToContent = (action, data = {}) => {
    return new Promise((resolve, reject) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0] && tabs[0].url && tabs[0].url.includes("freelancer.com")) {
          chrome.tabs.sendMessage(tabs[0].id, { action, ...data }, (response) => {
            if (chrome.runtime.lastError) {
              reject(new Error("Content script not available. Please refresh the Freelancer.com page."));
            } else {
              resolve(response || {});
            }
          });
        } else {
          reject(new Error("Please navigate to Freelancer.com first."));
        }
      });
    });
  };
  const handleStart = async () => {
    setIsStarting(true);
    logger.log("Starting bot...", "popup");
    try {
      const response = await sendMessageToContent("startBot");
      if (response && response.success) {
        logger.success("Bot started successfully!", "popup");
        window.close();
      } else {
        const errorMsg = (response == null ? void 0 : response.message) || "Failed to start bot";
        logger.error(errorMsg, "popup");
        alert(errorMsg);
      }
    } catch (error) {
      logger.error(`Error starting bot: ${error.message}`, "popup");
      alert(error.message);
    } finally {
      setIsStarting(false);
    }
  };
  const handleStop = async () => {
    setIsStopping(true);
    try {
      const response = await sendMessageToContent("stopBot");
      if (response && response.success) {
        logger.log("Bot stopped", "popup");
        window.close();
      } else {
        const errorMsg = (response == null ? void 0 : response.message) || "Failed to stop bot";
        logger.error(errorMsg, "popup");
        alert(errorMsg);
      }
    } catch (error) {
      logger.error(`Error stopping bot: ${error.message}`, "popup");
      alert(error.message);
    } finally {
      setIsStopping(false);
    }
  };
  const showPanelOnPage = async (panelName) => {
    try {
      const response = await sendMessageToContent("showPanel", { tabName: panelName });
      if (response && response.success) {
        logger.log(`Panel shown successfully: ${panelName}`, "popup");
        window.close();
      } else {
        const errorMsg = (response == null ? void 0 : response.message) || "Failed to show panel. Make sure you are on Freelancer.com page.";
        logger.error(`Failed to show panel: ${errorMsg}`, "popup");
        alert(errorMsg);
      }
    } catch (error) {
      logger.error(`Error showing panel: ${error.message || error}`, "popup");
      alert(error.message || "Failed to show panel. Please refresh the Freelancer.com page.");
    }
  };
  const badgeText = autoBotCount > 0 ? `${sessionBidsCount || 0} / ${autoBotCount}` : sessionBidsCount || "0";
  const shouldShowBadge = autoBotCount > 0 || sessionBidsCount > 0;
  const isRunning = status === SCRIPT_STATUS.RUNNING;
  const basicLinks = [
    { icon: "fa-user", label: "Profile", panel: "profile", iconColor: "text-blue-400" },
    { icon: "fa-folder", label: "Project", panel: "project", iconColor: "text-purple-400" },
    { icon: "fa-filter", label: "Filters", panel: "filters", iconColor: "text-orange-400" },
    { icon: "fa-file-alt", label: "Template", panel: "template", iconColor: "text-gray-500" },
    { icon: "fa-gear", label: "Settings", panel: "settings", iconColor: "text-gray-400" },
    { icon: "fa-list", label: "Logs", panel: "logs", iconColor: "text-yellow-400" }
  ];
  const isTrialExpired = () => {
    if (!trialEndsAt) return false;
    const trialEndDate = new Date(trialEndsAt);
    const now = /* @__PURE__ */ new Date();
    return trialEndDate < now;
  };
  const trialExpired = isTrialExpired();
  const canAccessPremium = isPremium || membership === "basic" && !trialExpired;
  const formatTrialPeriod = () => {
    if (!trialEndsAt || membership !== "basic") return null;
    const trialEndDate = new Date(trialEndsAt);
    const now = /* @__PURE__ */ new Date();
    const diffTime = trialEndDate - now;
    const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
    if (diffDays < 0) {
      return "Trial Expired";
    } else if (diffDays === 0) {
      const diffHours = Math.ceil(diffTime / (1e3 * 60 * 60));
      return diffHours > 0 ? `${diffHours}h left` : "Expires today";
    } else if (diffDays === 1) {
      return "1 day left";
    } else {
      return `${diffDays} days left`;
    }
  };
  const premiumLinks = [
    { icon: "fa-robot", label: "Custom AI", panel: "customai", iconColor: "text-green-400", disabled: !canAccessPremium },
    { icon: "fa-paper-plane", label: "Telegram", panel: "telegram", iconColor: "text-blue-400", disabled: !canAccessPremium },
    { icon: "fa-comments", label: "Chat", panel: "chat", disabled: !canAccessPremium, iconColor: "text-blue-400" }
  ];
  const renderNavButton = (link) => {
    const showUnreadBadge = link.panel === "logs" && unreadLogsCount > 0;
    const iconColor = link.iconColor || "text-dark-text";
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: () => !link.disabled && showPanelOnPage(link.panel),
        disabled: link.disabled,
        className: "flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-md border border-dark-border bg-dark-card text-dark-text hover:bg-dark-border hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: `fas ${link.icon} ${iconColor}` }),
            link.label
          ] }),
          showUnreadBadge && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-red-500 text-white text-[9px] font-bold rounded-full w-5 h-5 flex items-center justify-center", children: unreadLogsCount > 99 ? "99+" : unreadLogsCount })
        ]
      },
      link.panel
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 p-3 bg-dark-bg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-1.5 p-2 border border-dark-border rounded-lg bg-dark-card", children: basicLinks.map(renderNavButton) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5 p-2 border border-dark-border rounded-lg bg-dark-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-2 pb-1.5 border-b border-dark-border mb-1 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-bold text-yellow-400 uppercase tracking-wide", children: "Premium" }),
        membership === "basic" && trialEndsAt && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold text-red-400", children: "Trial - " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] font-semibold ${trialExpired ? "text-red-400" : "text-green-400"}`, children: formatTrialPeriod() })
        ] })
      ] }),
      premiumLinks.map(renderNavButton)
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-dark-border", children: !isRunning ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: handleStart,
        disabled: isStarting,
        className: "flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-md bg-green-500 text-white hover:bg-green-600 disabled:opacity-60 disabled:cursor-not-allowed transition-colors w-full",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-play" }),
            "Start Bot"
          ] }),
          shouldShowBadge && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-yellow-400 text-gray-900 text-[9px] font-bold px-1.5 py-0.5 rounded-full min-w-[16px] text-center shadow-sm", children: badgeText })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: handleStop,
        disabled: isStopping,
        className: "flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-md bg-red-500 text-white hover:bg-red-600 disabled:opacity-60 disabled:cursor-not-allowed transition-colors w-full",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center gap-2", children: isStopping ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-spinner fa-spin" }),
            "Stopping..."
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-stop" }),
            "Stop Bot"
          ] }) }),
          shouldShowBadge && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-yellow-400 text-gray-900 text-[9px] font-bold px-1.5 py-0.5 rounded-full min-w-[16px] text-center shadow-sm", children: badgeText })
        ]
      }
    ) })
  ] }) });
}
function App() {
  const [user, setUser] = reactExports.useState(null);
  const [session, setSession] = reactExports.useState(null);
  const [isAuthenticated, setIsAuthenticated] = reactExports.useState(false);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const updateAuthFromStorage = (setLoading = true) => {
    chrome.storage.local.get(["persist:auth"], (result) => {
      if (chrome.runtime.lastError) {
        logger.error(`Error reading auth from storage: ${chrome.runtime.lastError.message}`, "popup");
        if (setLoading) setIsLoading(false);
        return;
      }
      let authStateString = result["persist:auth"];
      if (!authStateString) {
        logger.log("No auth state found in storage", "popup");
        setUser(null);
        setSession(null);
        setIsAuthenticated(false);
        if (setLoading) setIsLoading(false);
        return;
      }
      let authState;
      try {
        authState = JSON.parse(authStateString);
      } catch (e) {
        logger.error(`Error parsing auth state: ${e.message}`, "popup");
        setUser(null);
        setSession(null);
        setIsAuthenticated(false);
        if (setLoading) setIsLoading(false);
        return;
      }
      logger.log(`Auth state from storage (parsed): ${JSON.stringify(authState)}`, "popup");
      let parsedUser = null;
      let parsedSession = null;
      if (authState && typeof authState === "object") {
        if (authState.user) {
          if (typeof authState.user === "string") {
            try {
              parsedUser = JSON.parse(authState.user);
            } catch (e) {
              logger.error(`Error parsing user: ${e.message}`, "popup");
            }
          } else if (typeof authState.user === "object") {
            parsedUser = authState.user;
          }
        }
        if (authState.session) {
          if (typeof authState.session === "string") {
            try {
              parsedSession = JSON.parse(authState.session);
            } catch (e) {
              logger.error(`Error parsing session: ${e.message}`, "popup");
            }
          } else if (typeof authState.session === "object") {
            parsedSession = authState.session;
          }
        }
        let authenticated = false;
        if (authState.isAuthenticated !== void 0) {
          if (typeof authState.isAuthenticated === "string") {
            authenticated = authState.isAuthenticated === "true";
          } else {
            authenticated = Boolean(authState.isAuthenticated);
          }
        } else {
          authenticated = !!(parsedUser && parsedSession);
        }
        logger.log(`Auth check - user: ${!!parsedUser}, session: ${!!parsedSession}, isAuthenticated: ${authenticated}`, "popup");
        setUser(parsedUser);
        setSession(parsedSession);
        setIsAuthenticated(authenticated);
      } else {
        logger.log("Invalid auth state structure", "popup");
        setUser(null);
        setSession(null);
        setIsAuthenticated(false);
      }
      if (setLoading) setIsLoading(false);
    });
  };
  reactExports.useEffect(() => {
    updateAuthFromStorage(true);
  }, []);
  reactExports.useEffect(() => {
    const handleStorageChange = (changes, areaName) => {
      if (areaName === "local" && changes["persist:auth"]) {
        logger.log("Auth state changed in storage, refetching auth state", "popup");
        updateAuthFromStorage(false);
      }
    };
    chrome.storage.onChanged.addListener(handleStorageChange);
    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, []);
  const iconUrl = chrome.runtime.getURL("icons/icon16.png");
  const sendMessageToContent = (action, data = {}) => {
    return new Promise((resolve, reject) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0] && tabs[0].url && tabs[0].url.includes("freelancer.com")) {
          chrome.tabs.sendMessage(tabs[0].id, { action, ...data }, (response) => {
            if (chrome.runtime.lastError) {
              reject(new Error("Content script not available. Please refresh the Freelancer.com page."));
            } else {
              resolve(response || {});
            }
          });
        } else {
          reject(new Error("Please navigate to Freelancer.com first."));
        }
      });
    });
  };
  const handleAccountClick = async () => {
    try {
      const response = await sendMessageToContent("showPanel", { tabName: "account" });
      if (response && response.success) {
        logger.log(`Panel shown successfully: account`, "popup");
        window.close();
      } else {
        const errorMsg = (response == null ? void 0 : response.message) || "Failed to show panel. Make sure you are on Freelancer.com page.";
        logger.error(`Failed to show panel: ${errorMsg}`, "popup");
        alert(errorMsg);
      }
    } catch (error) {
      logger.error(`Error showing panel: ${error.message || error}`, "popup");
      alert(error.message || "Failed to show panel. Please refresh the Freelancer.com page.");
    }
  };
  const handleShowLogin = async () => {
    try {
      const response = await sendMessageToContent("showPanel", { tabName: "login" });
      if (response && response.success) {
        logger.log(`Login modal shown successfully`, "popup");
        window.close();
      } else {
        const errorMsg = (response == null ? void 0 : response.message) || "Failed to show login modal. Make sure you are on Freelancer.com page.";
        logger.error(`Failed to show login modal: ${errorMsg}`, "popup");
        alert(errorMsg);
      }
    } catch (error) {
      logger.error(`Error showing login modal: ${error.message || error}`, "popup");
      alert(error.message || "Failed to show login modal. Please navigate to Freelancer.com and refresh the page.");
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[360px] max-h-[600px] bg-dark-bg text-dark-text flex items-center justify-center py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-dark-text-muted", children: "Loading..." })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-[360px] max-h-[600px] bg-dark-bg text-dark-text flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-dark-bg border-b border-dark-border px-4 py-2 sticky top-0 z-10 flex-shrink-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: iconUrl, alt: "Icon", className: "w-4 h-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-base font-semibold", children: "Freelancer Autobid" })
        ] }),
        isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleAccountClick,
            className: "flex items-center justify-center w-7 h-7 rounded-full bg-dark-card border border-dark-border hover:bg-dark-border hover:border-blue-500 transition-colors",
            title: "Account",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-user-circle text-base text-dark-text" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-dark-text-muted text-center mt-0.5", children: "v2.0.0 by Mern Master" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto min-h-0 scrollbar-hide", children: isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsx(MainContent, {}) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col items-center justify-center p-6 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-lock text-4xl text-gray-400 mb-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-white mb-2", children: "Authentication Required" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400 mb-4", children: "Please login to use the Freelancer Autobid extension." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: handleShowLogin,
          className: "px-6 py-3 bg-blue-500 text-white rounded-md text-sm font-semibold hover:bg-blue-600 transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-sign-in-alt mr-2" }),
            "Open Login"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mt-4", children: "Make sure you are on a Freelancer.com page" })
    ] }) })
  ] });
}
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Provider_default, { store, children: /* @__PURE__ */ jsxRuntimeExports.jsx(PersistGate, { loading: null, persistor, children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) }) }) })
);
