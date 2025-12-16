import { s as selectProfile, a as selectSkills, b as selectProfileLoading, c as selectProfileRefreshing, d as selectProfileError, l as logger, f as fetchUserProfile, e as store, g as findProjectIdFromSeoUrl, h as fetchProjectDetails, i as fetchEmployerDetails, u as utils, j as checkSelfBid, k as apiService, S as SCRIPT_STATUS, m as generateCustomAIBidFromProject, n as incrementSessionBids, o as setLastBidTime, p as stopBot, q as selectCurrentProject, r as selectEmployerDetails, t as selectHasBid, v as selectBidInfo, w as selectProjectLoading, E as EMPLOYER_RATINGS, x as addThread, y as removeFromBlockList, z as addToBlockList, A as getEmployerRatingIndex, B as setHasBid, C as selectLogs, D as selectUnreadCount, F as clearUnreadCount, G as persistor, H as clearLogs, I as testTelegramConnection, J as updateTelegram, K as DEFAULT_SYSTEM_PROMPT, L as testCustomAIFunction, M as updateCustomAI, N as updateSettings, O as updateFilters, P as selectTemplates, Q as addTemplate, R as reorderTemplates, T as updateTemplate, U as deleteTemplate, V as supabaseService, W as signOut, X as clearProfileCache, Y as signUpWithEdge, Z as signInWithEdge, _ as selectAllThreads, $ as selectChatLoading, a0 as selectChatError, a1 as addProcessedProject, a2 as sendTelegramBidNotification, a3 as API_ENDPOINTS, a4 as setSession, a5 as setUser, a6 as startBot } from "./logger.js";
import { u as useDispatch, a as useSelector, r as reactExports, j as jsxRuntimeExports, R as React, b as reactDomExports, c as createRoot, P as Provider_default, d as PersistGate } from "./react.js";
function ProfileModal({ onClose }) {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);
  const skills = useSelector(selectSkills);
  const loading = useSelector(selectProfileLoading);
  const refreshing = useSelector(selectProfileRefreshing);
  const error = useSelector(selectProfileError);
  const [isSummaryExpanded, setIsSummaryExpanded] = reactExports.useState(false);
  const [isSkillsExpanded, setIsSkillsExpanded] = reactExports.useState(false);
  reactExports.useEffect(() => {
    logger.log("ProfileModal mounted", "content");
    if (!profile) {
      logger.log("No profile found, fetching...", "content");
      dispatch(fetchUserProfile(false)).catch((err) => {
        logger.error(`Error fetching profile: ${err.message}`, "content");
      });
    }
  }, [dispatch, profile]);
  const handleRefresh = async () => {
    logger.log("Refreshing profile from API...", "content");
    await dispatch(fetchUserProfile(true));
    if (!error) {
      logger.success("Profile refreshed successfully", "content");
    }
  };
  const username = (profile == null ? void 0 : profile.username) || "Unknown";
  const fullName = (profile == null ? void 0 : profile.public_name) || (profile == null ? void 0 : profile.display_name) || (profile == null ? void 0 : profile.name) || "";
  const userId = (profile == null ? void 0 : profile.id) || "-";
  const membership = ((_a = profile == null ? void 0 : profile.membership_details) == null ? void 0 : _a.name) || (profile == null ? void 0 : profile.membership) || "Free";
  const country = ((_c = (_b = profile == null ? void 0 : profile.location) == null ? void 0 : _b.country) == null ? void 0 : _c.name) || ((_d = profile == null ? void 0 : profile.country_details) == null ? void 0 : _d.name) || "N/A";
  const tagline = (profile == null ? void 0 : profile.tagline) || (profile == null ? void 0 : profile.title) || "";
  const summary = (profile == null ? void 0 : profile.profile_description) || (profile == null ? void 0 : profile.description) || "No profile summary available.";
  const reviews = ((_f = (_e = profile == null ? void 0 : profile.reputation) == null ? void 0 : _e.entire_history) == null ? void 0 : _f.reviews) || (profile == null ? void 0 : profile.reviews) || 0;
  const rating = ((_h = (_g = profile == null ? void 0 : profile.reputation) == null ? void 0 : _g.entire_history) == null ? void 0 : _h.overall) || (profile == null ? void 0 : profile.rating) || "-";
  const jobsCount = (skills == null ? void 0 : skills.length) || 0;
  const avatarUrl = (profile == null ? void 0 : profile.avatar_cdn) || (profile == null ? void 0 : profile.avatar) || (profile == null ? void 0 : profile.profile_picture) || null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50", style: { fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-dark-card border border-dark-border rounded-lg shadow-xl w-[600px] max-h-[80vh] flex flex-col overflow-hidden", style: { fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-2.5 border-b border-dark-border cursor-move bg-dark-bg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-semibold text-white flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-user text-blue-400" }),
        "Profile"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onClose,
          className: "text-white hover:text-gray-300 transition-colors",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-times text-xl" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 overflow-y-auto flex-1 bg-dark-card [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]", children: [
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-red-500 text-white p-2 rounded mb-4 text-sm text-center", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 bg-dark-bg border border-dark-border rounded-lg mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-12 h-12 bg-dark-card border border-dark-border rounded-full flex items-center justify-center overflow-hidden relative", children: [
          avatarUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: avatarUrl,
              alt: username,
              className: "w-full h-full object-cover",
              onError: (e) => {
                e.target.style.display = "none";
                const fallback = e.target.parentElement.querySelector(".avatar-fallback");
                if (fallback) fallback.style.display = "flex";
              }
            }
          ) : null,
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `avatar-fallback w-full h-full bg-dark-card border border-dark-border rounded-full flex items-center justify-center text-white ${avatarUrl ? "hidden" : "flex"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-user text-lg" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-white", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-white", children: [
            "@",
            username
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400", children: fullName || "Loading..." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleRefresh,
            disabled: loading || refreshing,
            className: "w-8 h-8 bg-dark-card border border-dark-border text-white rounded-full hover:bg-dark-border hover:text-white disabled:opacity-50 transition-colors flex items-center justify-center",
            title: "Refresh Profile",
            children: refreshing ? /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-spinner fa-spin text-sm" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-rotate text-sm" })
          }
        )
      ] }),
      loading && !profile ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8 text-white", children: "Loading profile..." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-dark-bg border border-dark-border p-2 rounded text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-400 mb-1", children: "User ID" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold text-white", children: userId })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-dark-bg border border-dark-border p-2 rounded text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-400 mb-1", children: "Membership" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold text-white", children: membership })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-dark-bg border border-dark-border p-2 rounded text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-400 mb-1", children: "Country" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold text-white", children: country })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-base font-bold text-white mb-3", children: "Overview" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "text-sm font-semibold text-white mb-2 pb-2 border-b-2 border-dark-border flex items-center justify-between cursor-pointer hover:text-gray-300 transition-colors",
              onClick: () => setIsSummaryExpanded(!isSummaryExpanded),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-file-alt" }),
                  "Profile Summary"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: `fas fa-chevron-${isSummaryExpanded ? "up" : "down"} text-xs` })
              ]
            }
          ),
          isSummaryExpanded && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            tagline && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold text-white whitespace-pre-wrap mb-3", children: tagline }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-white whitespace-pre-wrap", children: summary })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "text-sm font-semibold text-white mb-2 pb-2 border-b-2 border-dark-border flex items-center justify-between cursor-pointer hover:text-gray-300 transition-colors",
              onClick: () => setIsSkillsExpanded(!isSkillsExpanded),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-code" }),
                  "Your Skills (",
                  jobsCount,
                  ")"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: `fas fa-chevron-${isSkillsExpanded ? "up" : "down"} text-xs` })
              ]
            }
          ),
          isSkillsExpanded && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: skills && skills.length > 0 ? skills.map((skill, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "px-3 py-1 bg-blue-600 text-white text-xs rounded-full",
              children: typeof skill === "string" ? skill : skill.name || skill
            },
            index
          )) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gray-400 text-sm", children: "No skills listed" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-semibold text-white mb-2 pb-2 border-b-2 border-dark-border flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-chart-bar" }),
            "Statistics"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-dark-bg border border-dark-border p-3 rounded text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-bold text-blue-400 mb-1", children: reviews }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-400", children: "Reviews" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-dark-bg border border-dark-border p-3 rounded text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-bold text-blue-400 mb-1", children: rating }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-400", children: "Rating" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-dark-bg border border-dark-border p-3 rounded text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-bold text-blue-400 mb-1", children: jobsCount }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-400", children: "Skills" })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] }) });
}
class ProjectService {
  constructor() {
    this.lastUrl = typeof window !== "undefined" ? window.location.href : "";
    this.navigationInterval = null;
    this.isInitialized = false;
  }
  /**
   * Initialize project service - set up navigation watching and network interception
   */
  async init() {
    if (this.isInitialized) return;
    if (typeof window !== "undefined") {
      this.watchNavigation();
      this.isInitialized = true;
      this.initializeProjectPage();
    } else {
      this.isInitialized = true;
    }
  }
  /**
   * Watch for navigation changes (SPA navigation)
   */
  watchNavigation() {
    if (typeof window === "undefined") return;
    let currentUrl = window.location.href;
    this.navigationInterval = setInterval(() => {
      if (window.location.href !== currentUrl) {
        currentUrl = window.location.href;
        this.lastUrl = currentUrl;
        logger.log(`URL changed to: ${currentUrl}`, "content");
        const urlMatch = window.location.pathname.match(/\/projects\/(.+?)(?:\/details)?(?:\?|$)/);
        if (urlMatch) {
          logger.log("Detected project page navigation", "content");
          setTimeout(() => {
            this.initializeProjectPage();
          }, 1e3);
        }
      }
    }, 500);
    window.addEventListener("popstate", () => {
      logger.log("Browser navigation detected", "content");
      setTimeout(() => {
        const urlMatch = window.location.pathname.match(/\/projects\/(.+?)(?:\/details)?(?:\?|$)/);
        if (urlMatch) {
          this.initializeProjectPage();
        }
      }, 500);
    });
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;
    const self = this;
    history.pushState = function(...args) {
      originalPushState.apply(history, args);
      setTimeout(() => {
        const urlMatch = window.location.pathname.match(/\/projects\/(.+?)(?:\/details)?(?:\?|$)/);
        if (urlMatch && window.location.href !== self.lastUrl) {
          self.lastUrl = window.location.href;
          logger.log("Project page navigation via pushState", "content");
          self.initializeProjectPage();
        }
      }, 500);
    };
    history.replaceState = function(...args) {
      originalReplaceState.apply(history, args);
      setTimeout(() => {
        const urlMatch = window.location.pathname.match(/\/projects\/(.+?)(?:\/details)?(?:\?|$)/);
        if (urlMatch && window.location.href !== self.lastUrl) {
          self.lastUrl = window.location.href;
          logger.log("Project page navigation via replaceState", "content");
          self.initializeProjectPage();
        }
      }, 500);
    };
    logger.log("Navigation watcher installed", "content");
  }
  /**
   * Initialize project page detection and fetch project data
   */
  async initializeProjectPage() {
    var _a, _b;
    if (typeof window === "undefined") return;
    const urlMatch = window.location.pathname.match(/\/projects\/(.+?)(?:\/details)?(?:\?|$)/);
    if (!urlMatch) {
      return;
    }
    const seoUrl = urlMatch[1].replace(/\/$/, "");
    logger.log(`Detected project page with SEO URL: ${seoUrl}`, "content");
    await this.waitForPageLoad();
    try {
      const projectResult = await store.dispatch(findProjectIdFromSeoUrl(seoUrl));
      if (findProjectIdFromSeoUrl.rejected.match(projectResult)) {
        logger.error("Failed to lookup project", "content", true);
        return;
      }
      const project = projectResult.payload;
      const projectId = project.id;
      if (!project) {
        logger.error("No project data available", "content", true);
        return;
      }
      logger.log(`Project loaded: ${project.title} (ID: ${projectId})`, "content", true);
      const authToken = (_b = (_a = store.getState().auth) == null ? void 0 : _a.profile) == null ? void 0 : _b.freelancer_auth_token;
      const detailsResult = await store.dispatch(fetchProjectDetails({ projectId, authToken }));
      if (fetchProjectDetails.fulfilled.match(detailsResult)) {
      }
      const settings = store.getState().settings;
      const shouldOpenModal = settings.openProjectModal;
      if (project.owner_id) {
        const employerResult = await store.dispatch(fetchEmployerDetails(project.owner_id));
        if (fetchEmployerDetails.fulfilled.match(employerResult)) {
          const userId = utils.getUserId();
          if (userId) {
            await store.dispatch(checkSelfBid({ projectId, userId, authToken }));
          }
          if (shouldOpenModal && typeof window !== "undefined" && window.modalManager) {
            window.modalManager.showPanel("project");
            logger.log("Automatically opened Project modal", "content");
          }
        }
      } else {
        if (shouldOpenModal && typeof window !== "undefined" && window.modalManager) {
          window.modalManager.showPanel("project");
          logger.log("Automatically opened Project modal (no employer details)", "content");
        }
      }
    } catch (error) {
      logger.error(`Error initializing project page: ${error.message}`, "content", true);
    }
  }
  /**
   * Wait for page to load
   */
  async waitForPageLoad() {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      if (document.readyState === "complete") {
        resolve();
      } else {
        window.addEventListener("load", resolve, { once: true });
      }
    });
  }
  /**
   * Cleanup - stop watching navigation
   */
  cleanup() {
    if (this.navigationInterval) {
      clearInterval(this.navigationInterval);
      this.navigationInterval = null;
    }
  }
  /**
   * Validate project against filters and settings
   */
  async validateProject(project, options = {}) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A;
    const { skipAutoValidation = false } = options;
    const state = store.getState();
    const filters = state.filters;
    state.settings;
    logger.log(`Validating project: ${project.title}, ${JSON.stringify(project)}`, "content", false);
    const authToken = (_b = (_a = store.getState().auth) == null ? void 0 : _a.profile) == null ? void 0 : _b.freelancer_auth_token;
    if (!skipAutoValidation) {
      const projectPostTimeMinutes = filters.projectPostTimeMinutes || 0;
      if (projectPostTimeMinutes > 0) {
        const submitDate = project.submitdate || project.submit_date || project.time_submitted;
        if (submitDate) {
          const submitTime = new Date(submitDate * 1e3);
          const now = /* @__PURE__ */ new Date();
          const minutesSincePost = Math.floor((now - submitTime) / (1e3 * 60));
          if (minutesSincePost > projectPostTimeMinutes) {
            return {
              valid: false,
              reason: `Project was posted ${minutesSincePost} minute(s) ago, but minimum required is ${projectPostTimeMinutes} minute(s).`
            };
          }
        }
      }
    }
    const isHourly = project.hourly === true || project.type === "hourly";
    const isFixed2 = project.hourly === false || project.type === "fixed";
    const isRecruiter = project.recruiter === true || project.is_recruiter === true;
    const isNdaIp = project.ndaIp === true || project.nda_ip === true || project.nda === true || project.ip === true;
    if (!filters.hourlyProject && isHourly) {
      return {
        valid: false,
        reason: "Hourly projects are disabled in filters"
      };
    }
    if (!filters.fixedProject && isFixed2) {
      return {
        valid: false,
        reason: "Fixed-price projects are disabled in filters"
      };
    }
    if (!filters.recruiterProject && isRecruiter) {
      return {
        valid: false,
        reason: "Recruiter projects are disabled in filters"
      };
    }
    if (!filters.ndaIpProject && isNdaIp) {
      return {
        valid: false,
        reason: "NDA/IP projects are disabled in filters"
      };
    }
    if (!skipAutoValidation) {
      const bidCount = ((_c = project.bidStats) == null ? void 0 : _c.bidCount) || ((_d = project.bid_stats) == null ? void 0 : _d.bid_count) || project.bid_count || 0;
      const maxBidCount = filters.totalBids || 0;
      logger.log(`Project bid count: ${bidCount}, Max allowed: ${maxBidCount}`, "content", false);
      if (maxBidCount > 0 && bidCount > maxBidCount) {
        return {
          valid: false,
          reason: `Project has ${bidCount} bid(s), which exceeds the maximum allowed (${maxBidCount}).`
        };
      }
    }
    logger.log("Checking if user can bid on project via API...", "content");
    const canBidResult = await apiService.checkCanBidOnProject(project.id, authToken);
    if (!canBidResult.success || !canBidResult.canBid) {
      const reason = canBidResult.message || "Cannot bid on this project (API check failed)";
      logger.log(`Cannot bid on project: ${reason}`, "content");
      return {
        valid: false,
        reason
      };
    }
    logger.log("API confirmed user can bid on project", "content");
    let projectSkills = [];
    if (project.jobs && Array.isArray(project.jobs) && project.jobs.length > 0) {
      projectSkills = project.jobs;
      logger.log(`Project has ${projectSkills.length} job/skill(s) listed`, "content");
    }
    const qualifications = project.qualifications || project.data && project.data.qualifications;
    ((_e = project.upgrades) == null ? void 0 : _e.qualified) || project.data && ((_f = project.data.upgrades) == null ? void 0 : _f.qualified);
    if (qualifications && (Array.isArray(qualifications) ? qualifications.length > 0 : qualifications)) ;
    const keywords = filters.keywords || "";
    const keywordArray = utils.parseCommaSeparated(keywords);
    let searchText = "";
    if (filters.searchInTitle !== false) {
      searchText += (project.title || "") + " ";
    }
    if (filters.searchInDescription !== false) {
      searchText += (project.description || "") + " ";
    }
    if (filters.searchInSkills !== false) {
      if (projectSkills && Array.isArray(projectSkills) && projectSkills.length > 0) {
        const jobNames = projectSkills.map((job) => job.name || job).join(" ");
        searchText += jobNames + " ";
      } else if (project.jobs && Array.isArray(project.jobs) && project.jobs.length > 0) {
        const jobNames = project.jobs.map((job) => typeof job === "string" ? job : job.name || job).join(" ");
        searchText += jobNames + " ";
      }
    }
    searchText = searchText.trim();
    if (!searchText) {
      return {
        valid: false,
        reason: "No searchable content available (all search options are disabled)"
      };
    }
    const keywordMatch = utils.containsKeyword(searchText, keywordArray);
    if (!keywordMatch.found) {
      return {
        valid: false,
        reason: "No matching keywords found in project"
      };
    }
    const hideCurrencies = filters.hideCurrencies || "";
    if (hideCurrencies) {
      const hideCurrencyList = utils.parseCommaSeparated(hideCurrencies).map((c) => c.trim().toUpperCase());
      const projectCurrency2 = (((_g = project.currency) == null ? void 0 : _g.code) || "").toUpperCase();
      if (projectCurrency2 && hideCurrencyList.includes(projectCurrency2)) {
        return {
          valid: false,
          reason: "Currency in hide list"
        };
      }
    }
    const projectCurrency = (((_h = project.currency) == null ? void 0 : _h.code) || project.currency_code || "USD").toUpperCase();
    if (isHourly) {
      const minRate = filters.minRate || 5;
      const maxRate = filters.maxRate || 100;
      const projectRate = ((_i = project.budget) == null ? void 0 : _i.minimum) || ((_j = project.budget) == null ? void 0 : _j.maximum) || 0;
      const projectRateUSD = utils.convertToUSD(projectRate, projectCurrency);
      if (projectRate > 0 && (projectRateUSD < minRate || projectRateUSD > maxRate)) {
        return {
          valid: false,
          reason: `Hourly rate out of range (${projectRate} ${projectCurrency} ≈ $${projectRateUSD.toFixed(2)} USD vs allowed $${minRate}-$${maxRate} USD)`
        };
      }
    } else {
      const minBudget = filters.minBudget || 10;
      const maxBudget = filters.maxBudget || 1e4;
      const projectMinBudgetUSD = utils.convertToUSD(project.budget.minimum || 0, projectCurrency);
      const projectMaxBudgetUSD = utils.convertToUSD(project.budget.maximum || 0, projectCurrency);
      if (projectMaxBudgetUSD < minBudget || projectMinBudgetUSD > maxBudget) {
        return {
          valid: false,
          reason: `Budget out of range (${project.budget.minimum}-${project.budget.maximum} ${projectCurrency} ≈ $${projectMinBudgetUSD.toFixed(2)}-$${projectMaxBudgetUSD.toFixed(2)} USD vs allowed $${minBudget}-$${maxBudget} USD)`
        };
      }
    }
    const hideCountries = filters.hideCountries || "";
    if (hideCountries) {
      const hideCountryList = utils.parseCommaSeparated(hideCountries).map((c) => c.trim().toLowerCase());
      let countryFromOwnerLocation = ((_m = (_l = (_k = project.owner) == null ? void 0 : _k.location) == null ? void 0 : _l.country) == null ? void 0 : _m.name) || null;
      let countryFromOwner = ((_n = project.owner) == null ? void 0 : _n.country) || null;
      let countryFromLocation = ((_p = (_o = project.location) == null ? void 0 : _o.country) == null ? void 0 : _p.name) || null;
      let countryFromProject = project.country || null;
      if (!countryFromOwnerLocation && !countryFromOwner && !countryFromLocation && !countryFromProject && project.id) {
        try {
          const projectDetails = await apiService.fetchProjectDetails(project.id, authToken);
          if (projectDetails.success && projectDetails.data) {
            const details = projectDetails.data;
            countryFromOwnerLocation = ((_s = (_r = (_q = details.owner) == null ? void 0 : _q.location) == null ? void 0 : _r.country) == null ? void 0 : _s.name) || null;
            countryFromOwner = ((_t = details.owner) == null ? void 0 : _t.country) || null;
            countryFromLocation = ((_v = (_u = details.location) == null ? void 0 : _u.country) == null ? void 0 : _v.name) || null;
            countryFromProject = details.country || null;
            if (details.owner_id && !countryFromOwnerLocation && !countryFromOwner) {
              const employerDetails = await apiService.fetchEmployerDetails(details.owner_id);
              if (employerDetails.success && employerDetails.data) {
                countryFromOwner = employerDetails.data.country || null;
                countryFromOwnerLocation = ((_x = (_w = employerDetails.data.location) == null ? void 0 : _w.country) == null ? void 0 : _x.name) || null;
              }
            }
          }
        } catch (error) {
          logger.warn(`Failed to fetch project details for country check: ${error.message}`, "content");
        }
      }
      const projectCountry = (countryFromOwnerLocation || countryFromOwner || countryFromLocation || countryFromProject || "").toLowerCase().trim();
      if (projectCountry) {
        const isExcluded = hideCountryList.some((blockedCountry) => {
          const blockedLower = blockedCountry.toLowerCase().trim();
          if (projectCountry === blockedLower) return true;
          const regex = new RegExp(`\\b${blockedLower.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
          return regex.test(projectCountry);
        });
        if (isExcluded) {
          const countryDisplay = countryFromOwnerLocation || countryFromOwner || countryFromLocation || countryFromProject || "Unknown";
          return {
            valid: false,
            reason: `Project from excluded country: ${countryDisplay}`
          };
        }
      } else {
        return {
          valid: false,
          reason: "Cannot determine project country. Country filter is active, so project is rejected for safety."
        };
      }
    }
    const hideClients = filters.hideClients || "";
    if (hideClients) {
      const hideClientList = utils.parseCommaSeparated(hideClients).map((c) => c.trim().toLowerCase());
      const ownerId = project.owner_id || ((_y = project.owner) == null ? void 0 : _y.id) || null;
      const ownerUsername = ((_z = project.owner) == null ? void 0 : _z.username) || null;
      const ownerName = ((_A = project.owner) == null ? void 0 : _A.name) || null;
      const projectOwnerId = (ownerId || "").toString().toLowerCase().trim();
      const projectOwnerUsername = (ownerUsername || ownerName || "").toLowerCase().trim();
      if (projectOwnerId || projectOwnerUsername) {
        const isExcluded = hideClientList.some((blockedClient) => {
          const blockedLower = blockedClient.toLowerCase().trim();
          if (projectOwnerUsername && projectOwnerUsername === blockedLower) return true;
          if (projectOwnerId && projectOwnerId === blockedLower) return true;
          if (projectOwnerUsername && projectOwnerUsername.includes(blockedLower)) return true;
          return false;
        });
        if (isExcluded) {
          const clientDisplay = projectOwnerUsername || projectOwnerId || "Unknown";
          return {
            valid: false,
            reason: `Project from excluded client: ${clientDisplay}`
          };
        }
      }
    }
    const matchedProposal = await utils.findMatchingProposal(project.title, projectSkills);
    logger.log(`Matched proposal: ${JSON.stringify(matchedProposal)}`, "content", false);
    if (!matchedProposal) {
      return {
        valid: false,
        reason: "Please add at least one proposal"
      };
    }
    return {
      valid: true,
      reason: "Project meets all criteria",
      matchedProposal
    };
  }
  /**
   * Place bid on a project
   * @param {Object} options - { project, proposal, skipBotStatusCheck?: boolean }
   */
  async placeBid({ project, proposal, skipBotStatusCheck = false }) {
    var _a, _b, _c, _d;
    const state = store.getState();
    const biddingState = state.bidding;
    const settings = state.settings;
    const customaiState = state.customai;
    const profileState = state.profile;
    if (!skipBotStatusCheck && biddingState.status !== SCRIPT_STATUS.RUNNING) {
      throw new Error("Bot is not running");
    }
    logger.log(`Placing bid on: ${project.title}`, "content", true);
    try {
      const isHourly = project.hourly === true || project.type === "hourly";
      const projectCurrency = (((_a = project.currency) == null ? void 0 : _a.code) || project.currency_code || "USD").toUpperCase();
      const bidAmount = utils.calculateBidAmount(
        project.budget.minimum,
        project.budget.maximum,
        isHourly,
        projectCurrency
      );
      const duration = utils.calculateDuration(
        project.budget.minimum,
        project.budget.maximum,
        isHourly,
        projectCurrency
      );
      const authToken = (_c = (_b = store.getState().auth) == null ? void 0 : _b.profile) == null ? void 0 : _c.freelancer_auth_token;
      if (!authToken) {
        throw new Error("Not logged in - Please login to Freelancer.com first");
      }
      let bidDescription = proposal.description || "I am interested in working on your project.";
      if (customaiState.enabled) {
        logger.log("Generating bid letter before placing bid...", "content");
        try {
          let profile = profileState.profile;
          if (!profile) {
            const profileResult = await store.dispatch(fetchUserProfile(false));
            if (fetchUserProfile.fulfilled.match(profileResult)) {
              profile = (_d = profileResult.payload) == null ? void 0 : _d.profile;
            }
          }
          if (profile) {
            const result = await store.dispatch(generateCustomAIBidFromProject({ project, profile }));
            if (generateCustomAIBidFromProject.fulfilled.match(result)) {
              bidDescription = result.payload.bidText;
              logger.log("Bid letter generated successfully", "content");
            }
          }
        } catch (error) {
          logger.warn(`AI generation failed: ${error.message}`, "content");
        }
      }
      const userId = utils.getUserId();
      const bidData = {
        project_id: parseInt(project.id),
        bidder_id: parseInt(userId),
        amount: parseInt(bidAmount),
        period: parseInt(duration),
        milestone_percentage: 100,
        description: bidDescription
      };
      logger.log(`Submitting bid: $${bidAmount}, ${duration} days`, "content");
      const placeBidDelay = settings.placeBidDelay || 30;
      const submitDate = project.submitdate || project.submit_date || project.time_submitted;
      let delay = 0;
      if (submitDate) {
        const submitTime = new Date(submitDate * 1e3);
        const now = /* @__PURE__ */ new Date();
        const secondsSincePost = Math.floor((now - submitTime) / 1e3);
        const remainingDelay = placeBidDelay * 1e3 - secondsSincePost * 1e3;
        delay = Math.max(1e3, remainingDelay);
        logger.log(`Project posted ${secondsSincePost}s ago, waiting ${delay / 1e3}s (${placeBidDelay}s delay from post time)...`, "content");
      } else {
        delay = placeBidDelay * 1e3;
        logger.log(`No project post time found, waiting ${delay / 1e3} seconds before bidding...`, "content");
      }
      await utils.sleep(delay);
      const apiResult = await apiService.submitBid(bidData, authToken);
      if (!apiResult.success) {
        throw new Error(apiResult.message || "Failed to submit bid");
      }
      logger.success(`Bid placed with ID: ${apiResult.bidId}`, "content", true);
      store.dispatch(incrementSessionBids());
      const updatedState = store.getState();
      const newSessionBidsCount = updatedState.bidding.sessionBidsCount;
      store.dispatch(setLastBidTime((/* @__PURE__ */ new Date()).toISOString()));
      const autoBotCount = settings.autoBotCount || 0;
      if (autoBotCount > 0 && newSessionBidsCount >= autoBotCount) {
        logger.log(`Auto bot count limit reached (${newSessionBidsCount}/${autoBotCount})`, "content", true);
        await store.dispatch(stopBot());
      }
      if (settings.openInNewTab && project.url) {
        try {
          if (typeof chrome !== "undefined" && chrome.tabs && chrome.tabs.create) {
            chrome.tabs.create({ url: project.url, active: false });
          } else if (typeof window !== "undefined" && window.open) {
            const newTab = window.open(project.url, "_blank");
            if (!newTab) {
              logger.warn("Popup blocker prevented opening new tab", "content");
            }
          }
        } catch (error) {
          logger.warn(`Could not open project tab: ${error.message}`, "content");
        }
      }
      return {
        success: true,
        message: "Bid placed successfully",
        bidAmount,
        bidId: apiResult.bidId,
        sessionBidsCount: newSessionBidsCount
      };
    } catch (error) {
      throw {
        success: false,
        message: error.message || "Failed to place bid"
      };
    }
  }
}
const projectService = new ProjectService();
function ProjectModal({ onClose }) {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  const dispatch = useDispatch();
  const project = useSelector(selectCurrentProject);
  const employerDetails = useSelector(selectEmployerDetails);
  const hasBid = useSelector(selectHasBid);
  const bidInfo = useSelector(selectBidInfo);
  const loading = useSelector(selectProjectLoading);
  const { hideClients, hideCountries, hideCurrencies } = useSelector((state) => state.filters);
  const authProfile = useSelector((state) => {
    var _a2;
    return (_a2 = state.auth) == null ? void 0 : _a2.profile;
  });
  const profile = useSelector(selectProfile);
  const allThreads = useSelector((state) => {
    var _a2;
    return ((_a2 = state.chat) == null ? void 0 : _a2.threads) || [];
  });
  const [isClientBlocked, setIsClientBlocked] = reactExports.useState(false);
  const [isCountryBlocked, setIsCountryBlocked] = reactExports.useState(false);
  const [isCurrencyBlocked, setIsCurrencyBlocked] = reactExports.useState(false);
  const [validationResult, setValidationResult] = reactExports.useState(null);
  const [bidLetter, setBidLetter] = reactExports.useState("");
  const [isValidating, setIsValidating] = reactExports.useState(false);
  const [isPlacingBid, setIsPlacingBid] = reactExports.useState(false);
  const [showBidLetter, setShowBidLetter] = reactExports.useState(false);
  const [showValidationResult, setShowValidationResult] = reactExports.useState(false);
  const [bidError, setBidError] = reactExports.useState(null);
  const [threadId, setThreadId] = reactExports.useState(null);
  const [threadLoading, setThreadLoading] = reactExports.useState(false);
  const existingThread = threadId ? allThreads.find((t) => t.threadId === threadId) : null;
  const isProjectPage = () => {
    const urlMatch = window.location.pathname.match(/\/projects\/(.+?)(?:\/details)?(?:\?|$)/);
    return !!urlMatch;
  };
  reactExports.useEffect(() => {
    if (project || employerDetails) {
      checkBlockStatus();
    }
  }, [project, employerDetails, hideClients, hideCountries, hideCurrencies]);
  reactExports.useEffect(() => {
    const checkBidStatus = async () => {
      if (!project || !(authProfile == null ? void 0 : authProfile.freelancer_user_id) || !(authProfile == null ? void 0 : authProfile.freelancer_auth_token)) {
        return;
      }
      if (!hasBid && project.id) {
        try {
          await dispatch(checkSelfBid({
            projectId: project.id,
            userId: authProfile.freelancer_user_id,
            authToken: authProfile.freelancer_auth_token
          }));
        } catch (error) {
        }
      }
    };
    checkBidStatus();
  }, [project == null ? void 0 : project.id, authProfile == null ? void 0 : authProfile.freelancer_user_id, authProfile == null ? void 0 : authProfile.freelancer_auth_token, hasBid, dispatch]);
  reactExports.useEffect(() => {
    const fetchThread = async () => {
      var _a2;
      if (!hasBid || !project) {
        setThreadId(null);
        return;
      }
      const freelancerAuthToken = authProfile == null ? void 0 : authProfile.freelancer_auth_token;
      const freelancerUserId = authProfile == null ? void 0 : authProfile.freelancer_user_id;
      if (!freelancerUserId) {
        logger.error("Freelancer user ID not found", "content");
        return;
      }
      if (!freelancerAuthToken) {
        logger.error("Freelancer authentication token not found", "content");
        return;
      }
      if (!freelancerAuthToken.includes(";")) {
        logger.error(`Invalid auth token format: missing semicolon`, "content");
        return;
      }
      const ownerId = project.owner_id || ((_a2 = project.owner) == null ? void 0 : _a2.id);
      if (!ownerId) {
        logger.error("Project owner ID not available", "content");
        return;
      }
      setThreadLoading(true);
      try {
        const result = await apiService.createMessageThread(
          [parseInt(ownerId), parseInt(freelancerUserId.toString())],
          "project",
          project.id,
          freelancerAuthToken
        );
        if (result.success && result.threadId) {
          setThreadId(result.threadId);
          logger.log(`Thread ID retrieved: ${result.threadId}`, "content");
        } else {
          const errorMsg = result.message || result.error || "Failed to get thread ID";
          logger.error(`Failed to get thread ID: ${errorMsg}`, "content");
          setThreadId(null);
        }
      } catch (error) {
        const errorMsg = error.message || "Failed to fetch thread";
        logger.error(`Error fetching thread: ${errorMsg}`, "content");
        setThreadId(null);
      } finally {
        setThreadLoading(false);
      }
    };
    fetchThread();
  }, [hasBid, project, authProfile]);
  const checkBlockStatus = () => {
    var _a2, _b2;
    if ((employerDetails == null ? void 0 : employerDetails.name) || (project == null ? void 0 : project.owner_id)) {
      const clientValue = (employerDetails == null ? void 0 : employerDetails.name) || ((_a2 = project == null ? void 0 : project.owner_id) == null ? void 0 : _a2.toString()) || "";
      if (clientValue) {
        const blocked = isBlocked("client", clientValue);
        setIsClientBlocked(blocked);
      }
    }
    const country = getCountryName(project, employerDetails);
    if (country && country !== "Unknown") {
      const blocked = isBlocked("country", country);
      setIsCountryBlocked(blocked);
    }
    const currency = ((_b2 = project == null ? void 0 : project.currency) == null ? void 0 : _b2.code) || (project == null ? void 0 : project.currency_code);
    if (currency) {
      const blocked = isBlocked("currency", currency);
      setIsCurrencyBlocked(blocked);
    }
  };
  const isBlocked = (type, value) => {
    let currentList;
    if (type === "client") {
      currentList = hideClients;
    } else if (type === "country") {
      currentList = hideCountries;
    } else if (type === "currency") {
      currentList = hideCurrencies;
    } else {
      return false;
    }
    const currentItems = currentList ? utils.parseCommaSeparated(currentList).map((item) => item.trim()) : [];
    if (type === "currency") {
      const normalizedValue = value.trim().toUpperCase();
      return currentItems.some((item) => item.toUpperCase() === normalizedValue);
    } else {
      const normalizedValue = value.trim().toLowerCase();
      return currentItems.some((item) => item.toLowerCase() === normalizedValue);
    }
  };
  const handleBlockClient = () => {
    var _a2;
    const clientValue = (employerDetails == null ? void 0 : employerDetails.name) || ((_a2 = project == null ? void 0 : project.owner_id) == null ? void 0 : _a2.toString()) || "";
    if (!clientValue) {
      logger.error("Cannot block client: no name or ID available", "content", true);
      return;
    }
    if (isClientBlocked) {
      dispatch(removeFromBlockList({ type: "client", value: clientValue }));
      logger.success(`Client "${clientValue}" removed from block list`, "content", true);
    } else {
      dispatch(addToBlockList({ type: "client", value: clientValue }));
      logger.success(`Client "${clientValue}" added to block list`, "content", true);
    }
  };
  const handleBlockCountry = () => {
    const country = getCountryName(project, employerDetails);
    if (!country || country === "Unknown") {
      logger.error("Cannot block country: country name not available", "content", true);
      return;
    }
    if (isCountryBlocked) {
      dispatch(removeFromBlockList({ type: "country", value: country }));
      logger.success(`Country "${country}" removed from block list`, "content", true);
    } else {
      dispatch(addToBlockList({ type: "country", value: country }));
      logger.success(`Country "${country}" added to block list`, "content", true);
    }
  };
  const handleBlockCurrency = () => {
    var _a2;
    const currency = ((_a2 = project == null ? void 0 : project.currency) == null ? void 0 : _a2.code) || (project == null ? void 0 : project.currency_code);
    if (!currency) {
      logger.error("Cannot block currency: currency code not available", "content", true);
      return;
    }
    if (isCurrencyBlocked) {
      dispatch(removeFromBlockList({ type: "currency", value: currency }));
      logger.success(`Currency "${currency}" removed from block list`, "content", true);
    } else {
      dispatch(addToBlockList({ type: "currency", value: currency }));
      logger.success(`Currency "${currency}" added to block list`, "content", true);
    }
  };
  const getCountryName = (project2, employerDetails2) => {
    var _a2, _b2, _c2, _d2, _e2, _f2;
    if ((_c2 = (_b2 = (_a2 = project2 == null ? void 0 : project2.owner) == null ? void 0 : _a2.location) == null ? void 0 : _b2.country) == null ? void 0 : _c2.name) return project2.owner.location.country.name;
    if ((_d2 = project2 == null ? void 0 : project2.owner) == null ? void 0 : _d2.country) return project2.owner.country;
    if ((_f2 = (_e2 = employerDetails2 == null ? void 0 : employerDetails2.location) == null ? void 0 : _e2.country) == null ? void 0 : _f2.name) return employerDetails2.location.country.name;
    if (employerDetails2 == null ? void 0 : employerDetails2.country) return employerDetails2.country;
    return "Unknown";
  };
  const getCountryCode = (project2, employerDetails2) => {
    var _a2, _b2, _c2, _d2, _e2;
    if ((_c2 = (_b2 = (_a2 = project2 == null ? void 0 : project2.owner) == null ? void 0 : _a2.location) == null ? void 0 : _b2.country) == null ? void 0 : _c2.code) return project2.owner.location.country.code.toLowerCase();
    if ((_e2 = (_d2 = employerDetails2 == null ? void 0 : employerDetails2.location) == null ? void 0 : _d2.country) == null ? void 0 : _e2.code) return employerDetails2.location.country.code.toLowerCase();
    return null;
  };
  const getCountryFlagUrl = (countryCode2) => {
    if (!countryCode2) return null;
    return `https://www.f-cdn.com/assets/main/en/assets/flags/${countryCode2}.png`;
  };
  const handleCopy = async (text) => {
    if (text && text !== "N/A") {
      try {
        await navigator.clipboard.writeText(text);
        logger.success(`Copied to clipboard: ${text}`, "content");
      } catch (err) {
        logger.error(`Failed to copy: ${err.message}`, "content");
      }
    }
  };
  const handleValidateProject = async () => {
    if (!project) return;
    setIsValidating(true);
    setShowValidationResult(true);
    setValidationResult(null);
    try {
      const result = await projectService.validateProject(project, { skipAutoValidation: true });
      if (result.valid) {
        setValidationResult({
          valid: true,
          message: "Project is valid and ready to bid!",
          matchedProposal: result.matchedProposal
        });
        setShowBidLetter(true);
      } else {
        setValidationResult({
          valid: false,
          message: result.reason || "Project validation failed"
        });
      }
    } catch (error) {
      setValidationResult({
        valid: false,
        message: error.reason || error.message || "Validation failed"
      });
    } finally {
      setIsValidating(false);
    }
  };
  const handlePlaceBid = async () => {
    if (!project || !(validationResult == null ? void 0 : validationResult.matchedProposal)) return;
    setIsPlacingBid(true);
    setBidError(null);
    try {
      const result = await projectService.placeBid({
        project,
        proposal: validationResult.matchedProposal,
        skipBotStatusCheck: true
        // Skip bot status check for manual bidding
      });
      if (result.success) {
        dispatch(setHasBid(true));
        window.location.reload();
      } else {
        const errorMsg = result.message || "Failed to place bid";
        setBidError(errorMsg);
        logger.error(errorMsg, "content", true);
      }
    } catch (error) {
      const errorMsg = error.message || "Failed to place bid";
      setBidError(errorMsg);
      logger.error(errorMsg, "content", true);
    } finally {
      setIsPlacingBid(false);
    }
  };
  if (loading && !project) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50", style: { fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-dark-card border border-dark-border rounded-lg shadow-xl w-[600px] max-h-[80vh] flex flex-col overflow-hidden", style: { fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-2.5 border-b border-dark-border cursor-move bg-dark-bg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-semibold text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-folder text-purple-400" }),
          "Project Information"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "text-white hover:text-gray-300 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-times text-xl" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 overflow-y-auto bg-dark-card [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8 text-white", children: "Loading project..." }) })
    ] }) });
  }
  const onProjectPage = isProjectPage();
  if (!onProjectPage) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50", style: { fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-dark-card border border-dark-border rounded-lg shadow-xl w-[600px] max-h-[80vh] flex flex-col overflow-hidden", style: { fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-2.5 border-b border-dark-border cursor-move bg-dark-bg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-semibold text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-folder text-purple-400" }),
          "Project Information"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "text-white hover:text-gray-300 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-times text-xl" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 overflow-y-auto bg-dark-card [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gray-400 mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-exclamation-circle text-yellow-500 mb-3 text-2xl" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white font-semibold mb-2", children: "Not on a project page" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-400", children: "Please navigate to a project page on Freelancer.com to view project information." })
      ] }) })
    ] }) });
  }
  if (!project) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50", style: { fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-dark-card border border-dark-border rounded-lg shadow-xl w-[600px] max-h-[80vh] flex flex-col overflow-hidden", style: { fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-2.5 border-b border-dark-border cursor-move bg-dark-bg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-semibold text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-folder text-purple-400" }),
          "Project Information"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "text-white hover:text-gray-300 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-times text-xl" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 overflow-y-auto bg-dark-card [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8 text-white", children: "Loading project..." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gray-400 mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-info-circle text-blue-500 mb-3 text-2xl" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white font-semibold mb-2", children: "Project data not available" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-400", children: "The project information is being loaded. Please wait a moment or refresh the page." })
      ] }) })
    ] }) });
  }
  const seoUrl = project.seo_url || (() => {
    const urlMatch = window.location.pathname.match(/\/projects\/(.+?)(?:\/details)?(?:\?|$)/);
    return urlMatch ? urlMatch[1].replace(/\/$/, "") : "N/A";
  })();
  const currencyCode = (((_a = project.currency) == null ? void 0 : _a.code) || project.currency_code || "USD").toUpperCase();
  const currencySymbol = utils.getCurrencySymbol(currencyCode);
  const countryName = getCountryName(project, employerDetails);
  const countryCode = getCountryCode(project, employerDetails);
  const flagUrl = getCountryFlagUrl(countryCode);
  const pastProjects = (employerDetails == null ? void 0 : employerDetails.past_projects) || 0;
  const completedProjects = (employerDetails == null ? void 0 : employerDetails.completed_projects) || 0;
  const ratingIndex = getEmployerRatingIndex(pastProjects, completedProjects);
  const ratio = pastProjects / completedProjects;
  isNaN(ratio) ? "New" : ratio.toFixed(1);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50", style: { fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-dark-card border border-dark-border rounded-lg shadow-xl w-[600px] max-h-[80vh] flex flex-col overflow-hidden", style: { fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-2.5 border-b border-dark-border cursor-move bg-dark-bg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-semibold text-white flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-folder" }),
        "Project Information"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "text-2xl text-white hover:text-gray-300 transition-colors self-start mt-0.5", children: "×" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 overflow-y-auto bg-dark-card [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 p-3 bg-dark-bg rounded border border-dark-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-sm font-semibold text-white mb-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-info-circle text-blue-500" }),
          "Project Information"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[2fr_1fr] gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pr-2 border-r border-dark-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-400", children: "SEO URL:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-white", children: seoUrl }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleCopy(seoUrl), className: "text-xs px-1 hover:bg-dark-card rounded text-white", title: "Copy", children: /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-copy" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pl-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-400", children: "Project ID:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-white", children: project.id || "N/A" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
                var _a2;
                return handleCopy((_a2 = project.id) == null ? void 0 : _a2.toString());
              }, className: "text-xs px-1 hover:bg-dark-card rounded text-white", title: "Copy", children: /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-copy" }) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2 border-t border-dark-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[2fr_1fr] gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pr-2 border-r border-dark-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-400", children: "Type:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-white", children: project.type || "N/A" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pl-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-400", children: "Budget:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-white font-semibold", children: project.budget ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              currencySymbol,
              " ",
              project.budget.minimum || 0,
              " - ",
              currencySymbol,
              " ",
              project.budget.maximum || 0
            ] }) : "N/A" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2 border-t border-dark-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-400", children: "Currency:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-white font-semibold", children: currencySymbol || "N/A" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: handleBlockCurrency,
              disabled: !((_b = project == null ? void 0 : project.currency) == null ? void 0 : _b.code) && !(project == null ? void 0 : project.currency_code),
              className: `px-3 py-1 text-xs rounded ${isCurrencyBlocked ? "bg-green-600" : "bg-dark-border"} text-white hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed`,
              children: isCurrencyBlocked ? "Unblock Currency" : "Block Currency"
            }
          )
        ] }) })
      ] }),
      employerDetails ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 p-3 bg-dark-bg rounded border border-dark-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            employerDetails.logo && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: employerDetails.logo, className: "w-12 h-12 rounded-full", alt: "Employer Logo" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: `https://www.freelancer.com/u/${employerDetails.name}?w=f`,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "font-bold text-blue-400 hover:text-blue-300",
                children: employerDetails.name
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: handleBlockClient,
              className: `px-3 py-1 text-xs rounded ${isClientBlocked ? "bg-green-600" : "bg-dark-border"} text-white hover:opacity-80`,
              children: isClientBlocked ? "Unblock Client" : "Block Client"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2 border-t border-dark-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pr-2 border-r border-dark-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-briefcase text-xs text-gray-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-400", children: "Projects:" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-white font-semibold", children: [
                completedProjects,
                "/",
                pastProjects
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pl-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-comments text-xs text-gray-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-400", children: "Reviews:" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-white font-semibold", children: ((_d = (_c = employerDetails == null ? void 0 : employerDetails.employer_reputation) == null ? void 0 : _c.entire_history) == null ? void 0 : _d.reviews) || completedProjects || "N/A" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 pt-2 border-t border-dark-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pr-2 border-r border-dark-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-star text-xs text-gray-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-400", children: "Rating:" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-white font-semibold", children: (employerDetails == null ? void 0 : employerDetails.overall_rating) ? `${employerDetails.overall_rating.toFixed(1)}/5.0` : "N/A" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pl-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-dollar-sign text-xs text-gray-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-400", children: "Earnings Score:" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-white font-semibold", children: (employerDetails == null ? void 0 : employerDetails.earnings_score) ? typeof employerDetails.earnings_score === "number" ? employerDetails.earnings_score.toFixed(2) : employerDetails.earnings_score : "N/A" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-dark-card rounded text-xs text-gray-400 italic border border-dark-border mb-2", children: EMPLOYER_RATINGS[ratingIndex].title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-400", children: "Country:" }),
            flagUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: flagUrl, className: "w-5 h-4 object-cover rounded", alt: countryName, onError: (e) => e.target.style.display = "none" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-white", children: countryName })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: handleBlockCountry,
              className: `px-3 py-1 text-xs rounded ${isCountryBlocked ? "bg-green-600" : "bg-dark-border"} text-white hover:opacity-80`,
              children: isCountryBlocked ? "Unblock Country" : "Block Country"
            }
          )
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 p-3 bg-dark-bg rounded text-sm text-gray-400", children: "Employer details not available" }),
      hasBid && bidInfo && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 p-3 bg-green-900 bg-opacity-30 border border-green-500 rounded", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-green-400 font-bold mb-1 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-check-circle" }),
          "You have already placed a bid on this project"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-green-300", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-dollar-sign" }),
            "Bid Amount: ",
            currencySymbol,
            " ",
            ((_f = (_e = bidInfo.bids) == null ? void 0 : _e[0]) == null ? void 0 : _f.amount) || "N/A"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-calendar" }),
            "Submitted: ",
            ((_h = (_g = bidInfo.bids) == null ? void 0 : _g[0]) == null ? void 0 : _h.submitdate) ? new Date(bidInfo.bids[0].submitdate * 1e3).toLocaleString() : "N/A"
          ] })
        ] })
      ] }),
      hasBid && threadId && !threadLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 p-3 bg-dark-bg rounded border border-dark-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-sm font-semibold text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-comments text-blue-400" }),
          "Chat with Project"
        ] }),
        existingThread ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-3 py-1.5 text-xs font-semibold rounded bg-gray-600 text-white flex items-center gap-2", title: "Thread already in chat list", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-check" }),
          "In Chat List"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => {
              var _a2;
              if (threadId && project && profile) {
                dispatch(addThread({
                  threadId,
                  project,
                  profile,
                  userId: authProfile == null ? void 0 : authProfile.freelancer_user_id,
                  clientId: project.owner_id || ((_a2 = project.owner) == null ? void 0 : _a2.id),
                  chatHistory: []
                }));
                logger.log(`Thread ${threadId} added to chat slice`, "content");
              }
            },
            className: "px-3 py-1.5 text-xs font-semibold rounded bg-green-600 text-white hover:bg-green-700 transition-colors flex items-center gap-2",
            title: "Add this thread to chat list",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-plus" }),
              "Add to Chat List"
            ]
          }
        )
      ] }) }),
      !hasBid && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 p-3 bg-dark-bg rounded border border-dark-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-sm font-semibold text-white mb-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-cog" }),
          "Operations"
        ] }),
        showValidationResult && validationResult && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `p-3 rounded border mb-3 ${validationResult.valid ? "bg-green-900 bg-opacity-30 border-green-500" : "bg-red-900 bg-opacity-30 border-red-500"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `text-sm font-semibold flex items-center gap-2 ${validationResult.valid ? "text-green-400" : "text-red-400"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: `fas ${validationResult.valid ? "fa-check-circle" : "fa-times-circle"}` }),
            validationResult.valid ? "Valid" : "Invalid"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-white mt-1", children: validationResult.message })
        ] }),
        bidError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded border mb-3 bg-red-900 bg-opacity-30 border-red-500", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-semibold flex items-center gap-2 text-red-400", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-times-circle" }),
            "Bid Failed"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-white mt-1", children: bidError })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 mb-3", children: !(validationResult == null ? void 0 : validationResult.valid) ? (
          /* Show Validate Project button if not validated or validation failed */
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: handleValidateProject,
              disabled: isValidating || !project,
              className: "flex-1 px-3 py-2 text-xs font-semibold rounded bg-gray-600 text-white hover:bg-gray-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2",
              children: isValidating ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-spinner fa-spin" }),
                "Validating..."
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-check-circle" }),
                "Validate Project"
              ] })
            }
          )
        ) : (
          /* Show Place Bid button if validation succeeded */
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: handlePlaceBid,
              disabled: isPlacingBid || !project,
              className: "flex-1 px-3 py-2 text-xs font-semibold rounded bg-green-600 text-white hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2",
              children: isPlacingBid ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-spinner fa-spin" }),
                "Placing..."
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-bullseye" }),
                "Place Bid"
              ] })
            }
          )
        ) })
      ] })
    ] })
  ] }) });
}
function LogsModal({ onClose }) {
  const dispatch = useDispatch();
  const logs = useSelector(selectLogs);
  const unreadCount = useSelector(selectUnreadCount);
  const logsContainerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (unreadCount > 0) {
      dispatch(clearUnreadCount());
      persistor.flush();
    }
  }, [unreadCount, dispatch]);
  const handleClearLogs = () => {
    dispatch(clearLogs());
    persistor.flush();
  };
  reactExports.useEffect(() => {
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTop = 0;
    }
  }, [logs]);
  const getBorderColor = (type) => {
    switch (type) {
      case "success":
        return "border-green-500";
      case "error":
        return "border-red-500";
      case "warn":
        return "border-yellow-500";
      default:
        return "border-blue-500";
    }
  };
  const getIcon = (type) => {
    switch (type) {
      case "success":
        return "fa-check-circle";
      case "error":
        return "fa-times-circle";
      case "warn":
        return "fa-exclamation-triangle";
      default:
        return "fa-info-circle";
    }
  };
  const getIconColor = (type) => {
    switch (type) {
      case "success":
        return "text-green-500";
      case "error":
        return "text-red-500";
      case "warn":
        return "text-yellow-500";
      default:
        return "text-blue-500";
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50", style: { fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-dark-card border border-dark-border rounded-lg shadow-xl w-[600px] max-h-[80vh] flex flex-col overflow-hidden", style: { fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-2.5 border-b border-dark-border cursor-move bg-dark-bg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-semibold text-white flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-clipboard-list text-yellow-400" }),
        "Activity Logs"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleClearLogs,
            className: "text-sm text-white hover:text-red-400 transition-colors flex items-center justify-center mr-2",
            title: "Clear all logs",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-trash-alt" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "text-white hover:text-gray-300 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-times text-xl" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 overflow-y-auto bg-dark-card [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref: logsContainerRef,
        className: "bg-dark-bg border border-dark-border p-3 rounded text-sm min-h-[600px] max-h-[600px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]",
        children: logs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 p-2 bg-dark-card border border-dark-border rounded border-l-4 border-blue-500", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-400", children: (/* @__PURE__ */ new Date()).toLocaleTimeString() }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-white flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-info-circle text-blue-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Bot ready. Click Start to begin bidding." })
          ] })
        ] }) : logs.map((log) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `mb-2 p-2 bg-dark-card border border-dark-border rounded border-l-4 ${getBorderColor(log.type)}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-400 flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: log.time }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-white flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: `fas ${getIcon(log.type)} ${getIconColor(log.type)}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: log.message })
          ] })
        ] }, log.id))
      }
    ) })
  ] }) });
}
function TelegramModal({ onClose }) {
  const dispatch = useDispatch();
  const { enabled, botToken, chatId } = useSelector((state) => state.telegram);
  const [localEnabled, setLocalEnabled] = reactExports.useState(enabled);
  const [localToken, setLocalToken] = reactExports.useState(botToken || "");
  const [localChatId, setLocalChatId] = reactExports.useState(chatId || "");
  const [isTesting, setIsTesting] = reactExports.useState(false);
  const [isSaving, setIsSaving] = reactExports.useState(false);
  const [testResult, setTestResult] = reactExports.useState(null);
  reactExports.useEffect(() => {
    setLocalEnabled(enabled);
    setLocalToken(botToken || "");
    setLocalChatId(chatId || "");
  }, [enabled, botToken, chatId]);
  const handleSave = async () => {
    setIsSaving(true);
    try {
      dispatch(updateTelegram({
        enabled: localEnabled,
        botToken: localToken.trim(),
        chatId: localChatId.trim()
      }));
      logger.success("Telegram settings saved successfully!", "content", true);
      setTimeout(() => {
        onClose();
      }, 1e3);
    } catch (error) {
      logger.error(`Failed to save settings: ${error.message}`, "content", true);
    } finally {
      setIsSaving(false);
    }
  };
  const handleTest = async () => {
    if (!localToken.trim() || !localChatId.trim()) {
      const errorMsg = "Please enter both Bot Token and Chat ID";
      setTestResult({ success: false, message: errorMsg });
      return;
    }
    setIsTesting(true);
    setTestResult(null);
    try {
      const result = await dispatch(testTelegramConnection({
        botToken: localToken.trim(),
        chatId: localChatId.trim()
      }));
      if (testTelegramConnection.fulfilled.match(result)) {
        const successMsg = result.payload.message || "Test message sent successfully!";
        setTestResult({ success: true, message: successMsg });
        logger.success("Telegram connection test successful!", "content", true);
      } else {
        const errorMsg = result.payload || "Connection test failed";
        setTestResult({ success: false, message: errorMsg });
        logger.error(`Telegram test failed: ${errorMsg}`, "content", true);
      }
    } catch (error) {
      const errorMsg = error.message || "Connection test failed";
      setTestResult({ success: false, message: errorMsg });
      logger.error(`Telegram test error: ${errorMsg}`, "content", true);
    } finally {
      setIsTesting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50", style: { fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-dark-card border border-dark-border rounded-lg shadow-xl w-[600px] max-h-[80vh] flex flex-col overflow-hidden", style: { fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-2.5 border-b border-dark-border cursor-move bg-dark-bg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-semibold text-white flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-paper-plane text-blue-400" }),
        "Telegram Settings"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "text-white hover:text-gray-300 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-times text-xl" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 overflow-y-auto space-y-4 bg-dark-card [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: `flex items-center gap-2 p-2 bg-dark-bg border border-dark-border rounded cursor-pointer hover:bg-dark-border transition-all duration-200 ${isSaving || isTesting ? "opacity-60 cursor-not-allowed" : ""}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "checkbox",
            checked: localEnabled,
            onChange: (e) => setLocalEnabled(e.target.checked),
            disabled: isSaving || isTesting,
            className: "w-4 h-4 text-blue-600 bg-dark-card border-dark-border rounded focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-white", children: "Enable Telegram Notifications" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-semibold mb-1 text-white", children: "Telegram Bot Token" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: localToken,
            onChange: (e) => setLocalToken(e.target.value),
            placeholder: "1234567890:ABC...",
            disabled: isSaving || isTesting,
            className: "w-full px-3 py-2 border border-dark-border rounded-md text-sm bg-dark-bg text-white focus:outline-none focus:border-blue-500 focus:bg-dark-border disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mt-1", children: "Get your bot token from @BotFather on Telegram" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-semibold mb-1 text-white", children: "Telegram Chat ID" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: localChatId,
            onChange: (e) => setLocalChatId(e.target.value),
            placeholder: "123456789",
            disabled: isSaving || isTesting,
            className: "w-full px-3 py-2 border border-dark-border rounded-md text-sm bg-dark-bg text-white focus:outline-none focus:border-blue-500 focus:bg-dark-border disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mt-1", children: "Your Telegram user ID or group chat ID" })
      ] }),
      testResult && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `p-3 rounded text-sm border ${testResult.success ? "bg-green-900 bg-opacity-30 border-green-500 text-green-300" : "bg-red-900 bg-opacity-30 border-red-500 text-red-300"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        testResult.success ? /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-check-circle" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-times-circle" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: testResult.message })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: handleTest,
          disabled: isTesting || isSaving,
          className: "w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-600 transition-all duration-200 flex items-center justify-center gap-2 text-sm font-semibold transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none disabled:hover:scale-100",
          children: isTesting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-spinner fa-spin animate-spin" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-pulse", children: "Testing..." })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-paper-plane" }),
            "Test Connection"
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: handleSave,
          disabled: isSaving || isTesting,
          className: "w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-500 transition-all duration-200 flex items-center justify-center gap-2 text-sm font-semibold transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none disabled:hover:scale-100 shadow-md hover:shadow-lg disabled:shadow-none",
          children: isSaving ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-spinner fa-spin animate-spin" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-pulse", children: "Saving..." })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-save" }),
            "Save Settings"
          ] })
        }
      )
    ] })
  ] }) });
}
function CustomAIModal({ onClose }) {
  const dispatch = useDispatch();
  const { enabled, provider, model, maxTokenCount, useGithubUrl, githubUrl, usePortfolioUrl, portfolioUrl, useProjectLinks, systemPrompt, projectLinks } = useSelector((state) => state.customai);
  const profile = useSelector((state) => state.auth.profile);
  const membership = (profile == null ? void 0 : profile.membership) || "basic";
  const isUltra = membership === "ultra";
  const isPremium = membership === "premium";
  const [localEnabled, setLocalEnabled] = reactExports.useState(enabled);
  const [localProvider, setLocalProvider] = reactExports.useState(provider || "openai");
  const [localModel, setLocalModel] = reactExports.useState(model || "gpt-4o-mini");
  const [localMaxTokenCount, setLocalMaxTokenCount] = reactExports.useState(maxTokenCount || 1e3);
  const [localUseGithubUrl, setLocalUseGithubUrl] = reactExports.useState(useGithubUrl || false);
  const [localGithubUrl, setLocalGithubUrl] = reactExports.useState(githubUrl || "");
  const [localUsePortfolioUrl, setLocalUsePortfolioUrl] = reactExports.useState(usePortfolioUrl || false);
  const [localPortfolioUrl, setLocalPortfolioUrl] = reactExports.useState(portfolioUrl || "");
  const [localUseProjectLinks, setLocalUseProjectLinks] = reactExports.useState(useProjectLinks || false);
  const [localSystemPrompt, setLocalSystemPrompt] = reactExports.useState(systemPrompt || DEFAULT_SYSTEM_PROMPT);
  const [localProjectLinks, setLocalProjectLinks] = reactExports.useState(projectLinks || []);
  const [newProjectLink, setNewProjectLink] = reactExports.useState("");
  const [isTesting, setIsTesting] = reactExports.useState(false);
  const [isSaving, setIsSaving] = reactExports.useState(false);
  const [testResult, setTestResult] = reactExports.useState(null);
  reactExports.useEffect(() => {
    setLocalEnabled(enabled);
    setLocalProvider(provider || "openai");
    setLocalModel(model || "gpt-4o-mini");
    setLocalMaxTokenCount(maxTokenCount || 1e3);
    setLocalUseGithubUrl(useGithubUrl || false);
    setLocalGithubUrl(githubUrl || "");
    setLocalUsePortfolioUrl(usePortfolioUrl || false);
    setLocalPortfolioUrl(portfolioUrl || "");
    setLocalUseProjectLinks(useProjectLinks || false);
    setLocalSystemPrompt(systemPrompt || DEFAULT_SYSTEM_PROMPT);
    setLocalProjectLinks(projectLinks || []);
  }, [enabled, provider, model, maxTokenCount, useGithubUrl, githubUrl, usePortfolioUrl, portfolioUrl, useProjectLinks, systemPrompt, projectLinks]);
  reactExports.useEffect(() => {
    if (isPremium && !isUltra) {
      setLocalProvider("openai");
      setLocalModel("gpt-4o-mini");
      setLocalSystemPrompt(DEFAULT_SYSTEM_PROMPT);
    }
  }, [isPremium, isUltra]);
  const getAvailableModels = () => {
    if (localProvider === "openai") {
      if (isPremium && !isUltra) {
        return [{ value: "gpt-4o-mini", label: "GPT-4o Mini" }];
      }
      return [
        { value: "gpt-4o", label: "GPT-4o", active: false },
        { value: "gpt-4o-mini", label: "GPT-4o Mini", active: true },
        { value: "gpt-4-turbo", label: "GPT-4 Turbo", active: false },
        { value: "gpt-4", label: "GPT-4", active: false },
        { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo", active: false }
      ];
    } else if (localProvider === "anthropic") {
      return [
        { value: "claude-opus-4-5-20251101", label: "Claude Opus 4.5", active: false },
        { value: "claude-sonnet-4-5-20250929", label: "Claude Sonnet 4.5", active: false },
        { value: "claude-haiku-4-5-20251001", label: "Claude Haiku 4.5", active: false },
        { value: "claude-opus-4-1-20250805", label: "Claude Opus 4.1", active: false },
        { value: "claude-opus-4-20250514", label: "Claude Opus 4", active: false },
        { value: "claude-sonnet-4-20250514", label: "Claude Sonnet 4", active: false },
        { value: "claude-3-5-haiku-20241022", label: "Claude Haiku 3.5", active: false },
        { value: "claude-3-haiku-20240307", label: "Claude Haiku 3", active: false }
      ];
    }
    return [];
  };
  const handleSave = async () => {
    setIsSaving(true);
    try {
      dispatch(updateCustomAI({
        enabled: localEnabled,
        provider: localProvider,
        model: localModel,
        maxTokenCount: localMaxTokenCount,
        useGithubUrl: localUseGithubUrl,
        githubUrl: localGithubUrl.trim(),
        usePortfolioUrl: localUsePortfolioUrl,
        portfolioUrl: localPortfolioUrl.trim(),
        useProjectLinks: localUseProjectLinks,
        systemPrompt: isUltra ? localSystemPrompt : DEFAULT_SYSTEM_PROMPT,
        projectLinks: localProjectLinks
      }));
      logger.success("AI settings saved successfully!", "content", true);
      setTimeout(() => {
        onClose();
      }, 1e3);
    } catch (error) {
      logger.error(`Failed to save settings: ${error.message}`, "content", true);
    } finally {
      setIsSaving(false);
    }
  };
  const handleTest = async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      const result = await dispatch(testCustomAIFunction({
        model: localModel
      }));
      if (testCustomAIFunction.fulfilled.match(result)) {
        const successMsg = result.payload.message || "AI function test successful!";
        const responseText = result.payload.response || "";
        setTestResult({ success: true, message: successMsg, response: responseText });
        logger.success("AI function test successful!", "content", true);
      } else {
        const errorMsg = result.payload || "AI function test failed";
        setTestResult({ success: false, message: errorMsg });
        logger.error(`AI function test failed: ${errorMsg}`, "content", true);
      }
    } catch (error) {
      const errorMsg = error.message || "AI function test failed";
      setTestResult({ success: false, message: errorMsg });
      logger.error(`AI test error: ${errorMsg}`, "content", true);
    } finally {
      setIsTesting(false);
    }
  };
  const handleAddProjectLink = () => {
    const link = newProjectLink.trim();
    if (link) {
      if (!localProjectLinks.includes(link)) {
        setLocalProjectLinks([...localProjectLinks, link]);
        setNewProjectLink("");
      }
    }
  };
  const handleRemoveProjectLink = (index) => {
    setLocalProjectLinks(localProjectLinks.filter((_, i) => i !== index));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50", style: { fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-dark-card border border-dark-border rounded-lg shadow-xl w-[700px] max-h-[80vh] flex flex-col overflow-hidden", style: { fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-2.5 border-b border-dark-border cursor-move bg-dark-bg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-semibold text-white flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-robot text-green-400" }),
        "Custom AI Settings"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "text-white hover:text-gray-300 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-times text-xl" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 overflow-y-auto space-y-4 bg-dark-card [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: `flex items-center gap-2 p-2 bg-dark-bg border border-dark-border rounded cursor-pointer hover:bg-dark-border transition-all duration-200 ${isSaving || isTesting ? "opacity-60 cursor-not-allowed" : ""}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "checkbox",
            checked: localEnabled,
            onChange: (e) => setLocalEnabled(e.target.checked),
            disabled: isSaving || isTesting,
            className: "w-4 h-4 text-blue-600 bg-dark-card border-dark-border rounded focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-white", children: "Enable AI Bid Generation" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 border border-dark-border rounded-lg bg-dark-bg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-semibold mb-1 text-white", children: "AI Provider" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: localProvider,
            onChange: (e) => {
              const newProvider = e.target.value;
              setLocalProvider(newProvider);
              if (newProvider === "openai") {
                setLocalModel("gpt-4o-mini");
              } else if (newProvider === "anthropic") {
                setLocalModel("claude-3-haiku-20240307");
              }
            },
            disabled: isSaving || isTesting || !isUltra,
            className: "w-full px-3 py-2 border border-dark-border rounded-md text-sm bg-dark-card text-white focus:outline-none focus:border-blue-500 focus:bg-dark-border disabled:opacity-50 disabled:cursor-not-allowed transition-all",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "openai", children: "OpenAI" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "anthropic", disabled: true, children: "Anthropic" })
            ]
          }
        ),
        !isUltra && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mt-1", children: "Available for Ultra membership only" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 border border-dark-border rounded-lg bg-dark-bg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-semibold mb-1 text-white", children: "AI Model" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "select",
          {
            value: localModel,
            onChange: (e) => setLocalModel(e.target.value),
            disabled: isSaving || isTesting || !isUltra,
            className: "w-full px-3 py-2 border border-dark-border rounded-md text-sm bg-dark-card text-white focus:outline-none focus:border-blue-500 focus:bg-dark-border disabled:opacity-50 disabled:cursor-not-allowed transition-all",
            children: getAvailableModels().map((modelOption) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "option",
              {
                value: modelOption.value,
                disabled: modelOption.active === false,
                children: modelOption.label
              },
              modelOption.value
            ))
          }
        ),
        isPremium && !isUltra && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mt-1", children: "Premium membership: GPT-4o Mini only" }),
        !isPremium && !isUltra && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mt-1", children: "Available for Premium/Ultra membership only" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 border border-dark-border rounded-lg bg-dark-bg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-semibold mb-1 text-white", children: "Max Token Count" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "number",
            value: localMaxTokenCount,
            onChange: (e) => setLocalMaxTokenCount(Number(e.target.value)),
            min: "100",
            max: "4000",
            disabled: isSaving || isTesting,
            className: "w-full px-3 py-2 border border-dark-border rounded-md text-sm bg-dark-card text-white focus:outline-none focus:border-blue-500 focus:bg-dark-border disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mt-1", children: "Maximum number of tokens for generated bid letters (100-4000)" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 border border-dark-border rounded-lg bg-dark-bg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: `flex items-center gap-2 mb-2 cursor-pointer ${isSaving || isTesting ? "opacity-60 cursor-not-allowed" : ""}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: localUseGithubUrl,
              onChange: (e) => setLocalUseGithubUrl(e.target.checked),
              disabled: isSaving || isTesting,
              className: "w-4 h-4 text-blue-600 bg-dark-card border-dark-border rounded focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-white", children: "Add GitHub URL" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "url",
            value: localGithubUrl,
            onChange: (e) => setLocalGithubUrl(e.target.value),
            placeholder: "https://github.com/username",
            disabled: isSaving || isTesting || !localUseGithubUrl,
            className: "w-full px-3 py-2 border border-dark-border rounded-md text-sm bg-dark-card text-white focus:outline-none focus:border-blue-500 focus:bg-dark-border disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mt-1", children: "Your GitHub profile URL to include in bid letters" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 border border-dark-border rounded-lg bg-dark-bg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: `flex items-center gap-2 mb-2 cursor-pointer ${isSaving || isTesting ? "opacity-60 cursor-not-allowed" : ""}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: localUsePortfolioUrl,
              onChange: (e) => setLocalUsePortfolioUrl(e.target.checked),
              disabled: isSaving || isTesting,
              className: "w-4 h-4 text-blue-600 bg-dark-card border-dark-border rounded focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-white", children: "Add Portfolio URL" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "url",
            value: localPortfolioUrl,
            onChange: (e) => setLocalPortfolioUrl(e.target.value),
            placeholder: "https://yourportfolio.com",
            disabled: isSaving || isTesting || !localUsePortfolioUrl,
            className: "w-full px-3 py-2 border border-dark-border rounded-md text-sm bg-dark-card text-white focus:outline-none focus:border-blue-500 focus:bg-dark-border disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mt-1", children: "Your portfolio website URL to include in bid letters" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 border border-dark-border rounded-lg bg-dark-bg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-semibold mb-1 text-white", children: "System Prompt" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            value: localSystemPrompt,
            onChange: (e) => setLocalSystemPrompt(e.target.value),
            placeholder: "Enter system prompt",
            rows: "4",
            disabled: isSaving || isTesting || !isUltra,
            className: "w-full px-3 py-2 border border-dark-border rounded-md text-sm bg-dark-card text-white focus:outline-none focus:border-blue-500 focus:bg-dark-border disabled:opacity-50 disabled:cursor-not-allowed transition-all resize-y"
          }
        ),
        !isUltra && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mt-1", children: "Available for Ultra membership only. Premium uses default prompt." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 border border-dark-border rounded-lg bg-dark-bg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: `flex items-center gap-2 mb-2 cursor-pointer ${isSaving || isTesting || !isUltra ? "opacity-60 cursor-not-allowed" : ""}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: localUseProjectLinks,
              onChange: (e) => setLocalUseProjectLinks(e.target.checked),
              disabled: isSaving || isTesting || !isUltra,
              className: "w-4 h-4 text-blue-600 bg-dark-card border-dark-border rounded focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-white", children: "Enable Project Links" })
        ] }),
        !isUltra && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mb-2", children: "Available for Ultra membership only" }),
        isUltra && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mb-2", children: "Include project links in bid letters when enabled" }),
        isUltra && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex gap-2 mb-3 ${!localUseProjectLinks ? "opacity-50" : ""}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "url",
              value: newProjectLink,
              onChange: (e) => setNewProjectLink(e.target.value),
              onKeyPress: (e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddProjectLink();
                }
              },
              placeholder: "https://example.com/project",
              disabled: isSaving || isTesting || !localUseProjectLinks,
              className: "flex-1 px-3 py-2 border border-dark-border rounded-md text-sm bg-dark-card text-white focus:outline-none focus:border-blue-500 focus:bg-dark-border disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: handleAddProjectLink,
              disabled: isSaving || isTesting || !newProjectLink.trim() || !localUseProjectLinks,
              className: "px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-500 transition-all text-sm font-semibold",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-plus" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `space-y-2 ${!localUseProjectLinks ? "opacity-50" : ""}`, children: localProjectLinks.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 italic", children: "No project links added" }) : localProjectLinks.map((link, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 p-2 bg-dark-card border border-dark-border rounded", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 text-sm text-white truncate", children: link }),
          isUltra && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => handleRemoveProjectLink(index),
              disabled: isSaving || isTesting || !localUseProjectLinks,
              className: "p-1.5 text-red-400 hover:bg-dark-border rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
              title: "Remove link",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-times text-sm" })
            }
          )
        ] }, index)) })
      ] }),
      testResult && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `p-3 rounded text-sm border ${testResult.success ? "bg-green-900 bg-opacity-30 border-green-500 text-green-300" : "bg-red-900 bg-opacity-30 border-red-500 text-red-300"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          testResult.success ? /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-check-circle" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-times-circle" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: testResult.message })
        ] }),
        testResult.success && testResult.response && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 p-2 bg-dark-bg rounded border border-dark-border text-white text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold mb-1 text-green-400", children: "Generated Bid:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "whitespace-pre-wrap", children: testResult.response })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: handleTest,
          disabled: isTesting || isSaving,
          className: "w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-600 transition-all duration-200 flex items-center justify-center gap-2 text-sm font-semibold transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none disabled:hover:scale-100",
          children: isTesting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-spinner fa-spin animate-spin" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-pulse", children: "Testing..." })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-flask" }),
            "Test AI Function"
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: handleSave,
          disabled: isSaving || isTesting,
          className: "w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-500 transition-all duration-200 flex items-center justify-center gap-2 text-sm font-semibold transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none disabled:hover:scale-100 shadow-md hover:shadow-lg disabled:shadow-none",
          children: isSaving ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-spinner fa-spin animate-spin" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-pulse", children: "Saving..." })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-save" }),
            "Save Settings"
          ] })
        }
      )
    ] })
  ] }) });
}
function SettingsModal({ onClose }) {
  const dispatch = useDispatch();
  const settingsState = useSelector((state) => state.settings);
  const [localPlaceBidDelay, setLocalPlaceBidDelay] = reactExports.useState(settingsState.placeBidDelay || 20);
  const [localApiPullDelay, setLocalApiPullDelay] = reactExports.useState(settingsState.apiPullDelay || 20);
  const [localAutoBotCount, setLocalAutoBotCount] = reactExports.useState(settingsState.autoBotCount || 0);
  const [localOpenInNewTab, setLocalOpenInNewTab] = reactExports.useState(settingsState.openInNewTab || false);
  const [localOpenProjectModal, setLocalOpenProjectModal] = reactExports.useState(settingsState.openProjectModal || false);
  const [isSaving, setIsSaving] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setLocalPlaceBidDelay(settingsState.placeBidDelay || 20);
    setLocalApiPullDelay(settingsState.apiPullDelay || 20);
    setLocalAutoBotCount(settingsState.autoBotCount || 0);
    setLocalOpenInNewTab(settingsState.openInNewTab || false);
    setLocalOpenProjectModal(settingsState.openProjectModal || false);
  }, [settingsState]);
  const handleSave = async () => {
    const validatedPlaceBidDelay = Math.max(20, localPlaceBidDelay);
    const validatedApiPullDelay = Math.max(20, localApiPullDelay);
    setIsSaving(true);
    try {
      dispatch(updateSettings({
        placeBidDelay: validatedPlaceBidDelay,
        apiPullDelay: validatedApiPullDelay,
        autoBotCount: localAutoBotCount,
        openInNewTab: localOpenInNewTab,
        openProjectModal: localOpenProjectModal
      }));
      logger.success("Settings saved successfully!", "content", true);
      setTimeout(() => {
        onClose();
      }, 1e3);
    } catch (error) {
      logger.error(`Failed to save settings: ${error.message}`, "content", true);
    } finally {
      setIsSaving(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50", style: { fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-dark-card border border-dark-border rounded-lg shadow-xl w-[600px] max-h-[80vh] flex flex-col overflow-hidden", style: { fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-2.5 border-b border-dark-border cursor-move bg-dark-bg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-semibold text-white flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-gear text-gray-400" }),
        "Settings"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "text-white hover:text-gray-300 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-times text-xl" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 overflow-y-auto space-y-4 bg-dark-card [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 border border-dark-border rounded-lg bg-dark-bg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-semibold mb-3 text-white", children: "Timing Settings" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-sm font-semibold mb-1 text-white", children: [
              "Place Bid Delay (seconds) ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400", children: "(min: 20)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "number",
                value: localPlaceBidDelay,
                onChange: (e) => {
                  const value = Number(e.target.value);
                  setLocalPlaceBidDelay(value >= 20 ? value : 20);
                },
                min: "20",
                disabled: isSaving,
                className: "w-full px-3 py-2 border border-dark-border rounded-md text-sm bg-dark-card text-white focus:outline-none focus:border-blue-500 focus:bg-dark-border disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mt-1", children: "Time to wait before placing a bid on a project" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-sm font-semibold mb-1 text-white", children: [
              "API Pull Delay (seconds) ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400", children: "(min: 20)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "number",
                value: localApiPullDelay,
                onChange: (e) => {
                  const value = Number(e.target.value);
                  setLocalApiPullDelay(value >= 20 ? value : 20);
                },
                min: "20",
                disabled: isSaving,
                className: "w-full px-3 py-2 border border-dark-border rounded-md text-sm bg-dark-card text-white focus:outline-none focus:border-blue-500 focus:bg-dark-border disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mt-1", children: "Time between API calls to get new projects" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 border border-dark-border rounded-lg bg-dark-bg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-semibold mb-3 text-white", children: "Bot Control" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-semibold mb-1 text-white", children: "Auto Bid Count" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "number",
              value: localAutoBotCount,
              onChange: (e) => setLocalAutoBotCount(Number(e.target.value)),
              min: "0",
              disabled: isSaving,
              className: "w-full px-3 py-2 border border-dark-border rounded-md text-sm bg-dark-card text-white focus:outline-none focus:border-blue-500 focus:bg-dark-border disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mt-1", children: "Stop bot after this many bids (0 = no limit)" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 border border-dark-border rounded-lg bg-dark-bg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-semibold mb-3 text-white", children: "Feature Flags" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: `flex items-center gap-2 p-2 bg-dark-card border border-dark-border rounded cursor-pointer hover:bg-dark-border transition-all duration-200 ${isSaving ? "opacity-60 cursor-not-allowed" : ""}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "checkbox",
                checked: localOpenInNewTab,
                onChange: (e) => setLocalOpenInNewTab(e.target.checked),
                disabled: isSaving,
                className: "w-4 h-4 text-blue-600 bg-dark-bg border-dark-border rounded focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-white", children: "Open Project in New Tab" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: `flex items-center gap-2 p-2 bg-dark-card border border-dark-border rounded cursor-pointer hover:bg-dark-border transition-all duration-200 ${isSaving ? "opacity-60 cursor-not-allowed" : ""}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "checkbox",
                checked: localOpenProjectModal,
                onChange: (e) => setLocalOpenProjectModal(e.target.checked),
                disabled: isSaving,
                className: "w-4 h-4 text-blue-600 bg-dark-bg border-dark-border rounded focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-white", children: "Open Project Modal when opening Freelancer project page" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: handleSave,
          disabled: isSaving,
          className: "w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-500 transition-all duration-200 flex items-center justify-center gap-2 text-sm font-semibold transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none disabled:hover:scale-100 shadow-md hover:shadow-lg disabled:shadow-none",
          children: isSaving ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-spinner fa-spin animate-spin" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-pulse", children: "Saving..." })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-save" }),
            "Save Settings"
          ] })
        }
      )
    ] })
  ] }) });
}
function TagInput({
  value = "",
  onChange,
  placeholder = "Add item...",
  disabled = false,
  separator = ",",
  className = ""
}) {
  const [tags, setTags] = reactExports.useState([]);
  const [inputValue, setInputValue] = reactExports.useState("");
  const inputRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (value) {
      const parsedTags = value.split(separator).map((tag) => tag.trim()).filter((tag) => tag.length > 0);
      setTags(parsedTags);
    } else {
      setTags([]);
    }
  }, [value, separator]);
  const updateTags = (newTags) => {
    setTags(newTags);
    const tagsString = newTags.join(separator);
    onChange(tagsString);
  };
  const addTag = (tagValue) => {
    const trimmedValue = tagValue.trim();
    if (trimmedValue && !tags.includes(trimmedValue)) {
      updateTags([...tags, trimmedValue]);
      setInputValue("");
    }
  };
  const removeTag = (tagToRemove) => {
    updateTags(tags.filter((tag) => tag !== tagToRemove));
  };
  const handleKeyDown = (e) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === separator) {
      e.preventDefault();
      if (inputValue.trim()) {
        addTag(inputValue);
      }
    } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      removeTag(tags[tags.length - 1]);
    }
  };
  const handleBlur = () => {
    if (inputValue.trim()) {
      addTag(inputValue);
    }
  };
  const handlePaste = (e) => {
    if (disabled) return;
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    const pastedTags = pastedText.split(separator).map((tag) => tag.trim()).filter((tag) => tag.length > 0);
    if (pastedTags.length > 0) {
      const newTags = [...tags];
      pastedTags.forEach((tag) => {
        if (!newTags.includes(tag)) {
          newTags.push(tag);
        }
      });
      updateTags(newTags);
      setInputValue("");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex flex-wrap gap-2 p-3 border border-dark-border rounded-md bg-dark-bg focus-within:border-blue-500 focus-within:bg-dark-border transition-all ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`, children: [
    tags.map((tag, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "span",
      {
        className: "inline-flex items-center gap-1 px-2 py-0.5 bg-dark-card border border-dark-border text-white text-xs font-medium rounded",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: tag }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => !disabled && removeTag(tag),
              disabled,
              className: "hover:bg-dark-border rounded p-0.5 transition-colors focus:outline-none focus:ring-1 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent",
              "aria-label": `Remove ${tag}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-times text-[10px]" })
            }
          )
        ]
      },
      index
    )),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref: inputRef,
        type: "text",
        value: inputValue,
        onChange: (e) => setInputValue(e.target.value),
        onKeyDown: handleKeyDown,
        onBlur: handleBlur,
        onPaste: handlePaste,
        placeholder: tags.length === 0 ? placeholder : "",
        disabled,
        className: "flex-1 min-w-[120px] bg-transparent text-white text-sm outline-none placeholder:text-gray-500 disabled:cursor-not-allowed"
      }
    )
  ] });
}
function FiltersModal({ onClose }) {
  const dispatch = useDispatch();
  const filtersState = useSelector((state) => state.filters);
  const [localKeywords, setLocalKeywords] = reactExports.useState(filtersState.keywords || "");
  const [localMinBudget, setLocalMinBudget] = reactExports.useState(filtersState.minBudget || 10);
  const [localMaxBudget, setLocalMaxBudget] = reactExports.useState(filtersState.maxBudget || 1e4);
  const [localMinRate, setLocalMinRate] = reactExports.useState(filtersState.minRate || 5);
  const [localMaxRate, setLocalMaxRate] = reactExports.useState(filtersState.maxRate || 100);
  const [localTotalBids, setLocalTotalBids] = reactExports.useState(filtersState.totalBids || 0);
  const [localHideCurrencies, setLocalHideCurrencies] = reactExports.useState(filtersState.hideCurrencies || "");
  const [localHideCountries, setLocalHideCountries] = reactExports.useState(filtersState.hideCountries || "");
  const [localHideClients, setLocalHideClients] = reactExports.useState(filtersState.hideClients || "");
  const [localSearchInTitle, setLocalSearchInTitle] = reactExports.useState(filtersState.searchInTitle !== void 0 ? filtersState.searchInTitle : true);
  const [localSearchInDescription, setLocalSearchInDescription] = reactExports.useState(filtersState.searchInDescription !== void 0 ? filtersState.searchInDescription : true);
  const [localSearchInSkills, setLocalSearchInSkills] = reactExports.useState(filtersState.searchInSkills !== void 0 ? filtersState.searchInSkills : true);
  const [localHourlyProject, setLocalHourlyProject] = reactExports.useState(filtersState.hourlyProject !== void 0 ? filtersState.hourlyProject : true);
  const [localFixedProject, setLocalFixedProject] = reactExports.useState(filtersState.fixedProject !== void 0 ? filtersState.fixedProject : true);
  const [localRecruiterProject, setLocalRecruiterProject] = reactExports.useState(filtersState.recruiterProject !== void 0 ? filtersState.recruiterProject : true);
  const [localNdaIpProject, setLocalNdaIpProject] = reactExports.useState(filtersState.ndaIpProject !== void 0 ? filtersState.ndaIpProject : true);
  const [localProjectPostTimeMinutes, setLocalProjectPostTimeMinutes] = reactExports.useState(filtersState.projectPostTimeMinutes !== void 0 ? filtersState.projectPostTimeMinutes : 0);
  const [isSaving, setIsSaving] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setLocalKeywords(filtersState.keywords || "");
    setLocalMinBudget(filtersState.minBudget || 10);
    setLocalMaxBudget(filtersState.maxBudget || 1e4);
    setLocalMinRate(filtersState.minRate || 5);
    setLocalMaxRate(filtersState.maxRate || 100);
    setLocalTotalBids(filtersState.totalBids || 0);
    setLocalHideCurrencies(filtersState.hideCurrencies || "");
    setLocalHideCountries(filtersState.hideCountries || "");
    setLocalHideClients(filtersState.hideClients || "");
    setLocalSearchInTitle(filtersState.searchInTitle !== void 0 ? filtersState.searchInTitle : true);
    setLocalSearchInDescription(filtersState.searchInDescription !== void 0 ? filtersState.searchInDescription : true);
    setLocalSearchInSkills(filtersState.searchInSkills !== void 0 ? filtersState.searchInSkills : true);
    setLocalHourlyProject(filtersState.hourlyProject !== void 0 ? filtersState.hourlyProject : true);
    setLocalFixedProject(filtersState.fixedProject !== void 0 ? filtersState.fixedProject : true);
    setLocalRecruiterProject(filtersState.recruiterProject !== void 0 ? filtersState.recruiterProject : true);
    setLocalNdaIpProject(filtersState.ndaIpProject !== void 0 ? filtersState.ndaIpProject : true);
    setLocalProjectPostTimeMinutes(filtersState.projectPostTimeMinutes !== void 0 ? filtersState.projectPostTimeMinutes : 0);
  }, [filtersState]);
  const handleSave = async () => {
    setIsSaving(true);
    try {
      dispatch(updateFilters({
        keywords: localKeywords.trim(),
        minBudget: localMinBudget,
        maxBudget: localMaxBudget,
        minRate: localMinRate,
        maxRate: localMaxRate,
        hideCurrencies: localHideCurrencies.trim(),
        hideCountries: localHideCountries.trim(),
        hideClients: localHideClients.trim(),
        totalBids: localTotalBids,
        searchInTitle: localSearchInTitle,
        searchInDescription: localSearchInDescription,
        searchInSkills: localSearchInSkills,
        hourlyProject: localHourlyProject,
        fixedProject: localFixedProject,
        recruiterProject: localRecruiterProject,
        ndaIpProject: localNdaIpProject,
        projectPostTimeMinutes: localProjectPostTimeMinutes
      }));
      logger.success("Filter settings saved successfully!", "content", true);
      setTimeout(() => {
        onClose();
      }, 1e3);
    } catch (error) {
      logger.error(`Failed to save filters: ${error.message}`, "content", true);
    } finally {
      setIsSaving(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50", style: { fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-dark-card border border-dark-border rounded-lg shadow-xl w-[700px] max-h-[80vh] flex flex-col overflow-hidden", style: { fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-2.5 border-b border-dark-border cursor-move bg-dark-bg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-semibold text-white flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-filter text-orange-400" }),
        "Filters"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "text-white hover:text-gray-300 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-times text-xl" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 overflow-y-auto space-y-4 bg-dark-card [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 border border-dark-border rounded-lg bg-dark-bg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-semibold mb-2 text-white", children: "Keywords *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          TagInput,
          {
            value: localKeywords,
            onChange: (value) => setLocalKeywords(value),
            placeholder: "Add keyword (press Enter or comma)",
            disabled: isSaving,
            separator: ","
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mt-1 mb-2", children: "Projects must contain at least one of these keywords" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 p-2 bg-dark-card border border-dark-border rounded mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 cursor-pointer hover:text-gray-300 transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "checkbox",
                checked: localSearchInTitle,
                onChange: (e) => setLocalSearchInTitle(e.target.checked),
                disabled: isSaving,
                className: "w-4 h-4 text-blue-600 bg-dark-card border-dark-border rounded focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-white", children: "Project Title" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 cursor-pointer hover:text-gray-300 transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "checkbox",
                checked: localSearchInDescription,
                onChange: (e) => setLocalSearchInDescription(e.target.checked),
                disabled: isSaving,
                className: "w-4 h-4 text-blue-600 bg-dark-card border-dark-border rounded focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-white", children: "Project Description" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 cursor-pointer hover:text-gray-300 transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "checkbox",
                checked: localSearchInSkills,
                onChange: (e) => setLocalSearchInSkills(e.target.checked),
                disabled: isSaving,
                className: "w-4 h-4 text-blue-600 bg-dark-card border-dark-border rounded focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-white", children: "Project Skills" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400", children: "Select where to search for keywords. Keywords will be matched in the selected project fields." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 border border-dark-border rounded-lg bg-dark-bg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-semibold mb-3 text-white", children: "Project Type & Budget" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 p-2 bg-dark-card border border-dark-border rounded cursor-pointer hover:bg-dark-border transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "checkbox",
                checked: localFixedProject,
                onChange: (e) => setLocalFixedProject(e.target.checked),
                disabled: isSaving,
                className: "w-4 h-4 text-blue-600 bg-dark-card border-dark-border rounded focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-white", children: "Fixed Project" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 p-2 bg-dark-card border border-dark-border rounded cursor-pointer hover:bg-dark-border transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "checkbox",
                checked: localHourlyProject,
                onChange: (e) => setLocalHourlyProject(e.target.checked),
                disabled: isSaving,
                className: "w-4 h-4 text-blue-600 bg-dark-card border-dark-border rounded focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-white", children: "Hourly Project" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 p-2 bg-dark-card border border-dark-border rounded cursor-pointer hover:bg-dark-border transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "checkbox",
                checked: localRecruiterProject,
                onChange: (e) => setLocalRecruiterProject(e.target.checked),
                disabled: isSaving,
                className: "w-4 h-4 text-blue-600 bg-dark-card border-dark-border rounded focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-white", children: "Recruiter Project" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 p-2 bg-dark-card border border-dark-border rounded cursor-pointer hover:bg-dark-border transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "checkbox",
                checked: localNdaIpProject,
                onChange: (e) => setLocalNdaIpProject(e.target.checked),
                disabled: isSaving,
                className: "w-4 h-4 text-blue-600 bg-dark-card border-dark-border rounded focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-white", children: "NDA/IP Agreement" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold mb-2 text-white", children: "Budget Range (Fixed Projects)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs mb-1 text-gray-400", children: "Min Budget ($)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "number",
                  value: localMinBudget,
                  onChange: (e) => setLocalMinBudget(Number(e.target.value)),
                  min: "0",
                  disabled: isSaving || !localFixedProject,
                  className: "w-full px-3 py-2 border border-dark-border rounded-md text-sm bg-dark-bg text-white focus:outline-none focus:border-blue-500 focus:bg-dark-border disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs mb-1 text-gray-400", children: "Max Budget ($)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "number",
                  value: localMaxBudget,
                  onChange: (e) => setLocalMaxBudget(Number(e.target.value)),
                  min: "0",
                  disabled: isSaving || !localFixedProject,
                  className: "w-full px-3 py-2 border border-dark-border rounded-md text-sm bg-dark-bg text-white focus:outline-none focus:border-blue-500 focus:bg-dark-border disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold mb-2 text-white", children: "Rate Range (Hourly Projects)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs mb-1 text-gray-400", children: "Min Rate ($/hr)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "number",
                  value: localMinRate,
                  onChange: (e) => setLocalMinRate(Number(e.target.value)),
                  min: "0",
                  disabled: isSaving || !localHourlyProject,
                  className: "w-full px-3 py-2 border border-dark-border rounded-md text-sm bg-dark-bg text-white focus:outline-none focus:border-blue-500 focus:bg-dark-border disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs mb-1 text-gray-400", children: "Max Rate ($/hr)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "number",
                  value: localMaxRate,
                  onChange: (e) => setLocalMaxRate(Number(e.target.value)),
                  min: "0",
                  disabled: isSaving || !localHourlyProject,
                  className: "w-full px-3 py-2 border border-dark-border rounded-md text-sm bg-dark-bg text-white focus:outline-none focus:border-blue-500 focus:bg-dark-border disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                }
              )
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 border border-dark-border rounded-lg bg-dark-bg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-semibold mb-3 text-white", children: "Other Filters" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold mb-1 text-white", children: "Minimum Proposal Count" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "number",
              value: localTotalBids,
              onChange: (e) => setLocalTotalBids(Number(e.target.value)),
              min: "0",
              disabled: isSaving,
              className: "w-full px-3 py-2 border border-dark-border rounded-md text-sm bg-dark-bg text-white focus:outline-none focus:border-blue-500 focus:bg-dark-border disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mt-1", children: "Minimum number of proposals required before submitting a bid (0 = no minimum)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold mb-1 text-white", children: "Project Post Time (Minutes)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "number",
              value: localProjectPostTimeMinutes,
              onChange: (e) => setLocalProjectPostTimeMinutes(Number(e.target.value)),
              min: "0",
              disabled: isSaving,
              className: "w-full px-3 py-2 border border-dark-border rounded-md text-sm bg-dark-bg text-white focus:outline-none focus:border-blue-500 focus:bg-dark-border disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mt-1", children: "Minimum minutes since project was posted to allow bidding (0 = no delay)" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 border border-dark-border rounded-lg bg-dark-bg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-semibold mb-3 text-white", children: "Blocklist" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold mb-1 text-white", children: "Excluded Countries" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TagInput,
            {
              value: localHideCountries,
              onChange: (value) => setLocalHideCountries(value),
              placeholder: "Add country (press Enter or comma)",
              disabled: isSaving,
              separator: ","
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mt-1", children: "Projects from these countries will be rejected" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold mb-1 text-white", children: "Excluded Currencies" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TagInput,
            {
              value: localHideCurrencies,
              onChange: (value) => setLocalHideCurrencies(value),
              placeholder: "Add currency (press Enter or comma)",
              disabled: isSaving,
              separator: ","
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mt-1", children: "Projects using these currencies will be rejected" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold mb-1 text-white", children: "Excluded Clients" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TagInput,
            {
              value: localHideClients,
              onChange: (value) => setLocalHideClients(value),
              placeholder: "Add client username (press Enter or comma)",
              disabled: isSaving,
              separator: ","
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mt-1", children: "Projects from these clients will be rejected" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: handleSave,
          disabled: isSaving,
          className: "w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-500 transition-all duration-200 flex items-center justify-center gap-2 text-sm font-semibold transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none disabled:hover:scale-100 shadow-md hover:shadow-lg disabled:shadow-none",
          children: isSaving ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-spinner fa-spin animate-spin" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-pulse", children: "Saving..." })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-save" }),
            "Save Filters"
          ] })
        }
      )
    ] })
  ] }) });
}
function useCombinedRefs() {
  for (var _len = arguments.length, refs = new Array(_len), _key = 0; _key < _len; _key++) {
    refs[_key] = arguments[_key];
  }
  return reactExports.useMemo(
    () => (node) => {
      refs.forEach((ref) => ref(node));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    refs
  );
}
const canUseDOM = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
function isWindow(element) {
  const elementString = Object.prototype.toString.call(element);
  return elementString === "[object Window]" || // In Electron context the Window object serializes to [object global]
  elementString === "[object global]";
}
function isNode(node) {
  return "nodeType" in node;
}
function getWindow(target) {
  var _target$ownerDocument, _target$ownerDocument2;
  if (!target) {
    return window;
  }
  if (isWindow(target)) {
    return target;
  }
  if (!isNode(target)) {
    return window;
  }
  return (_target$ownerDocument = (_target$ownerDocument2 = target.ownerDocument) == null ? void 0 : _target$ownerDocument2.defaultView) != null ? _target$ownerDocument : window;
}
function isDocument(node) {
  const {
    Document
  } = getWindow(node);
  return node instanceof Document;
}
function isHTMLElement(node) {
  if (isWindow(node)) {
    return false;
  }
  return node instanceof getWindow(node).HTMLElement;
}
function isSVGElement(node) {
  return node instanceof getWindow(node).SVGElement;
}
function getOwnerDocument(target) {
  if (!target) {
    return document;
  }
  if (isWindow(target)) {
    return target.document;
  }
  if (!isNode(target)) {
    return document;
  }
  if (isDocument(target)) {
    return target;
  }
  if (isHTMLElement(target) || isSVGElement(target)) {
    return target.ownerDocument;
  }
  return document;
}
const useIsomorphicLayoutEffect = canUseDOM ? reactExports.useLayoutEffect : reactExports.useEffect;
function useEvent(handler) {
  const handlerRef = reactExports.useRef(handler);
  useIsomorphicLayoutEffect(() => {
    handlerRef.current = handler;
  });
  return reactExports.useCallback(function() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return handlerRef.current == null ? void 0 : handlerRef.current(...args);
  }, []);
}
function useInterval() {
  const intervalRef = reactExports.useRef(null);
  const set = reactExports.useCallback((listener, duration) => {
    intervalRef.current = setInterval(listener, duration);
  }, []);
  const clear = reactExports.useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);
  return [set, clear];
}
function useLatestValue(value, dependencies) {
  if (dependencies === void 0) {
    dependencies = [value];
  }
  const valueRef = reactExports.useRef(value);
  useIsomorphicLayoutEffect(() => {
    if (valueRef.current !== value) {
      valueRef.current = value;
    }
  }, dependencies);
  return valueRef;
}
function useLazyMemo(callback, dependencies) {
  const valueRef = reactExports.useRef();
  return reactExports.useMemo(
    () => {
      const newValue = callback(valueRef.current);
      valueRef.current = newValue;
      return newValue;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...dependencies]
  );
}
function useNodeRef(onChange) {
  const onChangeHandler = useEvent(onChange);
  const node = reactExports.useRef(null);
  const setNodeRef = reactExports.useCallback(
    (element) => {
      if (element !== node.current) {
        onChangeHandler == null ? void 0 : onChangeHandler(element, node.current);
      }
      node.current = element;
    },
    //eslint-disable-next-line
    []
  );
  return [node, setNodeRef];
}
function usePrevious(value) {
  const ref = reactExports.useRef();
  reactExports.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
let ids = {};
function useUniqueId(prefix, value) {
  return reactExports.useMemo(() => {
    if (value) {
      return value;
    }
    const id = ids[prefix] == null ? 0 : ids[prefix] + 1;
    ids[prefix] = id;
    return prefix + "-" + id;
  }, [prefix, value]);
}
function createAdjustmentFn(modifier) {
  return function(object) {
    for (var _len = arguments.length, adjustments = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      adjustments[_key - 1] = arguments[_key];
    }
    return adjustments.reduce((accumulator, adjustment) => {
      const entries = Object.entries(adjustment);
      for (const [key, valueAdjustment] of entries) {
        const value = accumulator[key];
        if (value != null) {
          accumulator[key] = value + modifier * valueAdjustment;
        }
      }
      return accumulator;
    }, {
      ...object
    });
  };
}
const add = /* @__PURE__ */ createAdjustmentFn(1);
const subtract = /* @__PURE__ */ createAdjustmentFn(-1);
function hasViewportRelativeCoordinates(event) {
  return "clientX" in event && "clientY" in event;
}
function isKeyboardEvent(event) {
  if (!event) {
    return false;
  }
  const {
    KeyboardEvent
  } = getWindow(event.target);
  return KeyboardEvent && event instanceof KeyboardEvent;
}
function isTouchEvent(event) {
  if (!event) {
    return false;
  }
  const {
    TouchEvent
  } = getWindow(event.target);
  return TouchEvent && event instanceof TouchEvent;
}
function getEventCoordinates(event) {
  if (isTouchEvent(event)) {
    if (event.touches && event.touches.length) {
      const {
        clientX: x,
        clientY: y
      } = event.touches[0];
      return {
        x,
        y
      };
    } else if (event.changedTouches && event.changedTouches.length) {
      const {
        clientX: x,
        clientY: y
      } = event.changedTouches[0];
      return {
        x,
        y
      };
    }
  }
  if (hasViewportRelativeCoordinates(event)) {
    return {
      x: event.clientX,
      y: event.clientY
    };
  }
  return null;
}
const CSS = /* @__PURE__ */ Object.freeze({
  Translate: {
    toString(transform) {
      if (!transform) {
        return;
      }
      const {
        x,
        y
      } = transform;
      return "translate3d(" + (x ? Math.round(x) : 0) + "px, " + (y ? Math.round(y) : 0) + "px, 0)";
    }
  },
  Scale: {
    toString(transform) {
      if (!transform) {
        return;
      }
      const {
        scaleX,
        scaleY
      } = transform;
      return "scaleX(" + scaleX + ") scaleY(" + scaleY + ")";
    }
  },
  Transform: {
    toString(transform) {
      if (!transform) {
        return;
      }
      return [CSS.Translate.toString(transform), CSS.Scale.toString(transform)].join(" ");
    }
  },
  Transition: {
    toString(_ref) {
      let {
        property,
        duration,
        easing
      } = _ref;
      return property + " " + duration + "ms " + easing;
    }
  }
});
const SELECTOR = "a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not(:disabled),*[tabindex]";
function findFirstFocusableNode(element) {
  if (element.matches(SELECTOR)) {
    return element;
  }
  return element.querySelector(SELECTOR);
}
const hiddenStyles = {
  display: "none"
};
function HiddenText(_ref) {
  let {
    id,
    value
  } = _ref;
  return React.createElement("div", {
    id,
    style: hiddenStyles
  }, value);
}
function LiveRegion(_ref) {
  let {
    id,
    announcement,
    ariaLiveType = "assertive"
  } = _ref;
  const visuallyHidden = {
    position: "fixed",
    top: 0,
    left: 0,
    width: 1,
    height: 1,
    margin: -1,
    border: 0,
    padding: 0,
    overflow: "hidden",
    clip: "rect(0 0 0 0)",
    clipPath: "inset(100%)",
    whiteSpace: "nowrap"
  };
  return React.createElement("div", {
    id,
    style: visuallyHidden,
    role: "status",
    "aria-live": ariaLiveType,
    "aria-atomic": true
  }, announcement);
}
function useAnnouncement() {
  const [announcement, setAnnouncement] = reactExports.useState("");
  const announce = reactExports.useCallback((value) => {
    if (value != null) {
      setAnnouncement(value);
    }
  }, []);
  return {
    announce,
    announcement
  };
}
const DndMonitorContext = /* @__PURE__ */ reactExports.createContext(null);
function useDndMonitor(listener) {
  const registerListener = reactExports.useContext(DndMonitorContext);
  reactExports.useEffect(() => {
    if (!registerListener) {
      throw new Error("useDndMonitor must be used within a children of <DndContext>");
    }
    const unsubscribe = registerListener(listener);
    return unsubscribe;
  }, [listener, registerListener]);
}
function useDndMonitorProvider() {
  const [listeners] = reactExports.useState(() => /* @__PURE__ */ new Set());
  const registerListener = reactExports.useCallback((listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }, [listeners]);
  const dispatch = reactExports.useCallback((_ref) => {
    let {
      type,
      event
    } = _ref;
    listeners.forEach((listener) => {
      var _listener$type;
      return (_listener$type = listener[type]) == null ? void 0 : _listener$type.call(listener, event);
    });
  }, [listeners]);
  return [dispatch, registerListener];
}
const defaultScreenReaderInstructions = {
  draggable: "\n    To pick up a draggable item, press the space bar.\n    While dragging, use the arrow keys to move the item.\n    Press space again to drop the item in its new position, or press escape to cancel.\n  "
};
const defaultAnnouncements = {
  onDragStart(_ref) {
    let {
      active
    } = _ref;
    return "Picked up draggable item " + active.id + ".";
  },
  onDragOver(_ref2) {
    let {
      active,
      over
    } = _ref2;
    if (over) {
      return "Draggable item " + active.id + " was moved over droppable area " + over.id + ".";
    }
    return "Draggable item " + active.id + " is no longer over a droppable area.";
  },
  onDragEnd(_ref3) {
    let {
      active,
      over
    } = _ref3;
    if (over) {
      return "Draggable item " + active.id + " was dropped over droppable area " + over.id;
    }
    return "Draggable item " + active.id + " was dropped.";
  },
  onDragCancel(_ref4) {
    let {
      active
    } = _ref4;
    return "Dragging was cancelled. Draggable item " + active.id + " was dropped.";
  }
};
function Accessibility(_ref) {
  let {
    announcements = defaultAnnouncements,
    container,
    hiddenTextDescribedById,
    screenReaderInstructions = defaultScreenReaderInstructions
  } = _ref;
  const {
    announce,
    announcement
  } = useAnnouncement();
  const liveRegionId = useUniqueId("DndLiveRegion");
  const [mounted, setMounted] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setMounted(true);
  }, []);
  useDndMonitor(reactExports.useMemo(() => ({
    onDragStart(_ref2) {
      let {
        active
      } = _ref2;
      announce(announcements.onDragStart({
        active
      }));
    },
    onDragMove(_ref3) {
      let {
        active,
        over
      } = _ref3;
      if (announcements.onDragMove) {
        announce(announcements.onDragMove({
          active,
          over
        }));
      }
    },
    onDragOver(_ref4) {
      let {
        active,
        over
      } = _ref4;
      announce(announcements.onDragOver({
        active,
        over
      }));
    },
    onDragEnd(_ref5) {
      let {
        active,
        over
      } = _ref5;
      announce(announcements.onDragEnd({
        active,
        over
      }));
    },
    onDragCancel(_ref6) {
      let {
        active,
        over
      } = _ref6;
      announce(announcements.onDragCancel({
        active,
        over
      }));
    }
  }), [announce, announcements]));
  if (!mounted) {
    return null;
  }
  const markup = React.createElement(React.Fragment, null, React.createElement(HiddenText, {
    id: hiddenTextDescribedById,
    value: screenReaderInstructions.draggable
  }), React.createElement(LiveRegion, {
    id: liveRegionId,
    announcement
  }));
  return container ? reactDomExports.createPortal(markup, container) : markup;
}
var Action;
(function(Action2) {
  Action2["DragStart"] = "dragStart";
  Action2["DragMove"] = "dragMove";
  Action2["DragEnd"] = "dragEnd";
  Action2["DragCancel"] = "dragCancel";
  Action2["DragOver"] = "dragOver";
  Action2["RegisterDroppable"] = "registerDroppable";
  Action2["SetDroppableDisabled"] = "setDroppableDisabled";
  Action2["UnregisterDroppable"] = "unregisterDroppable";
})(Action || (Action = {}));
function noop() {
}
function useSensor(sensor, options) {
  return reactExports.useMemo(
    () => ({
      sensor,
      options: options != null ? options : {}
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sensor, options]
  );
}
function useSensors() {
  for (var _len = arguments.length, sensors = new Array(_len), _key = 0; _key < _len; _key++) {
    sensors[_key] = arguments[_key];
  }
  return reactExports.useMemo(
    () => [...sensors].filter((sensor) => sensor != null),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...sensors]
  );
}
const defaultCoordinates = /* @__PURE__ */ Object.freeze({
  x: 0,
  y: 0
});
function distanceBetween(p1, p2) {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}
function sortCollisionsAsc(_ref, _ref2) {
  let {
    data: {
      value: a
    }
  } = _ref;
  let {
    data: {
      value: b
    }
  } = _ref2;
  return a - b;
}
function sortCollisionsDesc(_ref3, _ref4) {
  let {
    data: {
      value: a
    }
  } = _ref3;
  let {
    data: {
      value: b
    }
  } = _ref4;
  return b - a;
}
function cornersOfRectangle(_ref5) {
  let {
    left,
    top,
    height,
    width
  } = _ref5;
  return [{
    x: left,
    y: top
  }, {
    x: left + width,
    y: top
  }, {
    x: left,
    y: top + height
  }, {
    x: left + width,
    y: top + height
  }];
}
function getFirstCollision(collisions, property) {
  if (!collisions || collisions.length === 0) {
    return null;
  }
  const [firstCollision] = collisions;
  return firstCollision[property];
}
function centerOfRectangle(rect, left, top) {
  if (left === void 0) {
    left = rect.left;
  }
  if (top === void 0) {
    top = rect.top;
  }
  return {
    x: left + rect.width * 0.5,
    y: top + rect.height * 0.5
  };
}
const closestCenter = (_ref) => {
  let {
    collisionRect,
    droppableRects,
    droppableContainers
  } = _ref;
  const centerRect = centerOfRectangle(collisionRect, collisionRect.left, collisionRect.top);
  const collisions = [];
  for (const droppableContainer of droppableContainers) {
    const {
      id
    } = droppableContainer;
    const rect = droppableRects.get(id);
    if (rect) {
      const distBetween = distanceBetween(centerOfRectangle(rect), centerRect);
      collisions.push({
        id,
        data: {
          droppableContainer,
          value: distBetween
        }
      });
    }
  }
  return collisions.sort(sortCollisionsAsc);
};
const closestCorners = (_ref) => {
  let {
    collisionRect,
    droppableRects,
    droppableContainers
  } = _ref;
  const corners = cornersOfRectangle(collisionRect);
  const collisions = [];
  for (const droppableContainer of droppableContainers) {
    const {
      id
    } = droppableContainer;
    const rect = droppableRects.get(id);
    if (rect) {
      const rectCorners = cornersOfRectangle(rect);
      const distances = corners.reduce((accumulator, corner, index) => {
        return accumulator + distanceBetween(rectCorners[index], corner);
      }, 0);
      const effectiveDistance = Number((distances / 4).toFixed(4));
      collisions.push({
        id,
        data: {
          droppableContainer,
          value: effectiveDistance
        }
      });
    }
  }
  return collisions.sort(sortCollisionsAsc);
};
function getIntersectionRatio(entry, target) {
  const top = Math.max(target.top, entry.top);
  const left = Math.max(target.left, entry.left);
  const right = Math.min(target.left + target.width, entry.left + entry.width);
  const bottom = Math.min(target.top + target.height, entry.top + entry.height);
  const width = right - left;
  const height = bottom - top;
  if (left < right && top < bottom) {
    const targetArea = target.width * target.height;
    const entryArea = entry.width * entry.height;
    const intersectionArea = width * height;
    const intersectionRatio = intersectionArea / (targetArea + entryArea - intersectionArea);
    return Number(intersectionRatio.toFixed(4));
  }
  return 0;
}
const rectIntersection = (_ref) => {
  let {
    collisionRect,
    droppableRects,
    droppableContainers
  } = _ref;
  const collisions = [];
  for (const droppableContainer of droppableContainers) {
    const {
      id
    } = droppableContainer;
    const rect = droppableRects.get(id);
    if (rect) {
      const intersectionRatio = getIntersectionRatio(rect, collisionRect);
      if (intersectionRatio > 0) {
        collisions.push({
          id,
          data: {
            droppableContainer,
            value: intersectionRatio
          }
        });
      }
    }
  }
  return collisions.sort(sortCollisionsDesc);
};
function adjustScale(transform, rect1, rect2) {
  return {
    ...transform,
    scaleX: rect1 && rect2 ? rect1.width / rect2.width : 1,
    scaleY: rect1 && rect2 ? rect1.height / rect2.height : 1
  };
}
function getRectDelta(rect1, rect2) {
  return rect1 && rect2 ? {
    x: rect1.left - rect2.left,
    y: rect1.top - rect2.top
  } : defaultCoordinates;
}
function createRectAdjustmentFn(modifier) {
  return function adjustClientRect(rect) {
    for (var _len = arguments.length, adjustments = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      adjustments[_key - 1] = arguments[_key];
    }
    return adjustments.reduce((acc, adjustment) => ({
      ...acc,
      top: acc.top + modifier * adjustment.y,
      bottom: acc.bottom + modifier * adjustment.y,
      left: acc.left + modifier * adjustment.x,
      right: acc.right + modifier * adjustment.x
    }), {
      ...rect
    });
  };
}
const getAdjustedRect = /* @__PURE__ */ createRectAdjustmentFn(1);
function parseTransform(transform) {
  if (transform.startsWith("matrix3d(")) {
    const transformArray = transform.slice(9, -1).split(/, /);
    return {
      x: +transformArray[12],
      y: +transformArray[13],
      scaleX: +transformArray[0],
      scaleY: +transformArray[5]
    };
  } else if (transform.startsWith("matrix(")) {
    const transformArray = transform.slice(7, -1).split(/, /);
    return {
      x: +transformArray[4],
      y: +transformArray[5],
      scaleX: +transformArray[0],
      scaleY: +transformArray[3]
    };
  }
  return null;
}
function inverseTransform(rect, transform, transformOrigin) {
  const parsedTransform = parseTransform(transform);
  if (!parsedTransform) {
    return rect;
  }
  const {
    scaleX,
    scaleY,
    x: translateX,
    y: translateY
  } = parsedTransform;
  const x = rect.left - translateX - (1 - scaleX) * parseFloat(transformOrigin);
  const y = rect.top - translateY - (1 - scaleY) * parseFloat(transformOrigin.slice(transformOrigin.indexOf(" ") + 1));
  const w = scaleX ? rect.width / scaleX : rect.width;
  const h = scaleY ? rect.height / scaleY : rect.height;
  return {
    width: w,
    height: h,
    top: y,
    right: x + w,
    bottom: y + h,
    left: x
  };
}
const defaultOptions = {
  ignoreTransform: false
};
function getClientRect(element, options) {
  if (options === void 0) {
    options = defaultOptions;
  }
  let rect = element.getBoundingClientRect();
  if (options.ignoreTransform) {
    const {
      transform,
      transformOrigin
    } = getWindow(element).getComputedStyle(element);
    if (transform) {
      rect = inverseTransform(rect, transform, transformOrigin);
    }
  }
  const {
    top,
    left,
    width,
    height,
    bottom,
    right
  } = rect;
  return {
    top,
    left,
    width,
    height,
    bottom,
    right
  };
}
function getTransformAgnosticClientRect(element) {
  return getClientRect(element, {
    ignoreTransform: true
  });
}
function getWindowClientRect(element) {
  const width = element.innerWidth;
  const height = element.innerHeight;
  return {
    top: 0,
    left: 0,
    right: width,
    bottom: height,
    width,
    height
  };
}
function isFixed(node, computedStyle) {
  if (computedStyle === void 0) {
    computedStyle = getWindow(node).getComputedStyle(node);
  }
  return computedStyle.position === "fixed";
}
function isScrollable(element, computedStyle) {
  if (computedStyle === void 0) {
    computedStyle = getWindow(element).getComputedStyle(element);
  }
  const overflowRegex = /(auto|scroll|overlay)/;
  const properties2 = ["overflow", "overflowX", "overflowY"];
  return properties2.some((property) => {
    const value = computedStyle[property];
    return typeof value === "string" ? overflowRegex.test(value) : false;
  });
}
function getScrollableAncestors(element, limit) {
  const scrollParents = [];
  function findScrollableAncestors(node) {
    if (limit != null && scrollParents.length >= limit) {
      return scrollParents;
    }
    if (!node) {
      return scrollParents;
    }
    if (isDocument(node) && node.scrollingElement != null && !scrollParents.includes(node.scrollingElement)) {
      scrollParents.push(node.scrollingElement);
      return scrollParents;
    }
    if (!isHTMLElement(node) || isSVGElement(node)) {
      return scrollParents;
    }
    if (scrollParents.includes(node)) {
      return scrollParents;
    }
    const computedStyle = getWindow(element).getComputedStyle(node);
    if (node !== element) {
      if (isScrollable(node, computedStyle)) {
        scrollParents.push(node);
      }
    }
    if (isFixed(node, computedStyle)) {
      return scrollParents;
    }
    return findScrollableAncestors(node.parentNode);
  }
  if (!element) {
    return scrollParents;
  }
  return findScrollableAncestors(element);
}
function getFirstScrollableAncestor(node) {
  const [firstScrollableAncestor] = getScrollableAncestors(node, 1);
  return firstScrollableAncestor != null ? firstScrollableAncestor : null;
}
function getScrollableElement(element) {
  if (!canUseDOM || !element) {
    return null;
  }
  if (isWindow(element)) {
    return element;
  }
  if (!isNode(element)) {
    return null;
  }
  if (isDocument(element) || element === getOwnerDocument(element).scrollingElement) {
    return window;
  }
  if (isHTMLElement(element)) {
    return element;
  }
  return null;
}
function getScrollXCoordinate(element) {
  if (isWindow(element)) {
    return element.scrollX;
  }
  return element.scrollLeft;
}
function getScrollYCoordinate(element) {
  if (isWindow(element)) {
    return element.scrollY;
  }
  return element.scrollTop;
}
function getScrollCoordinates(element) {
  return {
    x: getScrollXCoordinate(element),
    y: getScrollYCoordinate(element)
  };
}
var Direction;
(function(Direction2) {
  Direction2[Direction2["Forward"] = 1] = "Forward";
  Direction2[Direction2["Backward"] = -1] = "Backward";
})(Direction || (Direction = {}));
function isDocumentScrollingElement(element) {
  if (!canUseDOM || !element) {
    return false;
  }
  return element === document.scrollingElement;
}
function getScrollPosition(scrollingContainer) {
  const minScroll = {
    x: 0,
    y: 0
  };
  const dimensions = isDocumentScrollingElement(scrollingContainer) ? {
    height: window.innerHeight,
    width: window.innerWidth
  } : {
    height: scrollingContainer.clientHeight,
    width: scrollingContainer.clientWidth
  };
  const maxScroll = {
    x: scrollingContainer.scrollWidth - dimensions.width,
    y: scrollingContainer.scrollHeight - dimensions.height
  };
  const isTop = scrollingContainer.scrollTop <= minScroll.y;
  const isLeft = scrollingContainer.scrollLeft <= minScroll.x;
  const isBottom = scrollingContainer.scrollTop >= maxScroll.y;
  const isRight = scrollingContainer.scrollLeft >= maxScroll.x;
  return {
    isTop,
    isLeft,
    isBottom,
    isRight,
    maxScroll,
    minScroll
  };
}
const defaultThreshold = {
  x: 0.2,
  y: 0.2
};
function getScrollDirectionAndSpeed(scrollContainer, scrollContainerRect, _ref, acceleration, thresholdPercentage) {
  let {
    top,
    left,
    right,
    bottom
  } = _ref;
  if (acceleration === void 0) {
    acceleration = 10;
  }
  if (thresholdPercentage === void 0) {
    thresholdPercentage = defaultThreshold;
  }
  const {
    isTop,
    isBottom,
    isLeft,
    isRight
  } = getScrollPosition(scrollContainer);
  const direction = {
    x: 0,
    y: 0
  };
  const speed = {
    x: 0,
    y: 0
  };
  const threshold = {
    height: scrollContainerRect.height * thresholdPercentage.y,
    width: scrollContainerRect.width * thresholdPercentage.x
  };
  if (!isTop && top <= scrollContainerRect.top + threshold.height) {
    direction.y = Direction.Backward;
    speed.y = acceleration * Math.abs((scrollContainerRect.top + threshold.height - top) / threshold.height);
  } else if (!isBottom && bottom >= scrollContainerRect.bottom - threshold.height) {
    direction.y = Direction.Forward;
    speed.y = acceleration * Math.abs((scrollContainerRect.bottom - threshold.height - bottom) / threshold.height);
  }
  if (!isRight && right >= scrollContainerRect.right - threshold.width) {
    direction.x = Direction.Forward;
    speed.x = acceleration * Math.abs((scrollContainerRect.right - threshold.width - right) / threshold.width);
  } else if (!isLeft && left <= scrollContainerRect.left + threshold.width) {
    direction.x = Direction.Backward;
    speed.x = acceleration * Math.abs((scrollContainerRect.left + threshold.width - left) / threshold.width);
  }
  return {
    direction,
    speed
  };
}
function getScrollElementRect(element) {
  if (element === document.scrollingElement) {
    const {
      innerWidth,
      innerHeight
    } = window;
    return {
      top: 0,
      left: 0,
      right: innerWidth,
      bottom: innerHeight,
      width: innerWidth,
      height: innerHeight
    };
  }
  const {
    top,
    left,
    right,
    bottom
  } = element.getBoundingClientRect();
  return {
    top,
    left,
    right,
    bottom,
    width: element.clientWidth,
    height: element.clientHeight
  };
}
function getScrollOffsets(scrollableAncestors) {
  return scrollableAncestors.reduce((acc, node) => {
    return add(acc, getScrollCoordinates(node));
  }, defaultCoordinates);
}
function getScrollXOffset(scrollableAncestors) {
  return scrollableAncestors.reduce((acc, node) => {
    return acc + getScrollXCoordinate(node);
  }, 0);
}
function getScrollYOffset(scrollableAncestors) {
  return scrollableAncestors.reduce((acc, node) => {
    return acc + getScrollYCoordinate(node);
  }, 0);
}
function scrollIntoViewIfNeeded(element, measure) {
  if (measure === void 0) {
    measure = getClientRect;
  }
  if (!element) {
    return;
  }
  const {
    top,
    left,
    bottom,
    right
  } = measure(element);
  const firstScrollableAncestor = getFirstScrollableAncestor(element);
  if (!firstScrollableAncestor) {
    return;
  }
  if (bottom <= 0 || right <= 0 || top >= window.innerHeight || left >= window.innerWidth) {
    element.scrollIntoView({
      block: "center",
      inline: "center"
    });
  }
}
const properties = [["x", ["left", "right"], getScrollXOffset], ["y", ["top", "bottom"], getScrollYOffset]];
class Rect {
  constructor(rect, element) {
    this.rect = void 0;
    this.width = void 0;
    this.height = void 0;
    this.top = void 0;
    this.bottom = void 0;
    this.right = void 0;
    this.left = void 0;
    const scrollableAncestors = getScrollableAncestors(element);
    const scrollOffsets = getScrollOffsets(scrollableAncestors);
    this.rect = {
      ...rect
    };
    this.width = rect.width;
    this.height = rect.height;
    for (const [axis, keys, getScrollOffset] of properties) {
      for (const key of keys) {
        Object.defineProperty(this, key, {
          get: () => {
            const currentOffsets = getScrollOffset(scrollableAncestors);
            const scrollOffsetsDeltla = scrollOffsets[axis] - currentOffsets;
            return this.rect[key] + scrollOffsetsDeltla;
          },
          enumerable: true
        });
      }
    }
    Object.defineProperty(this, "rect", {
      enumerable: false
    });
  }
}
class Listeners {
  constructor(target) {
    this.target = void 0;
    this.listeners = [];
    this.removeAll = () => {
      this.listeners.forEach((listener) => {
        var _this$target;
        return (_this$target = this.target) == null ? void 0 : _this$target.removeEventListener(...listener);
      });
    };
    this.target = target;
  }
  add(eventName, handler, options) {
    var _this$target2;
    (_this$target2 = this.target) == null ? void 0 : _this$target2.addEventListener(eventName, handler, options);
    this.listeners.push([eventName, handler, options]);
  }
}
function getEventListenerTarget(target) {
  const {
    EventTarget
  } = getWindow(target);
  return target instanceof EventTarget ? target : getOwnerDocument(target);
}
function hasExceededDistance(delta, measurement) {
  const dx = Math.abs(delta.x);
  const dy = Math.abs(delta.y);
  if (typeof measurement === "number") {
    return Math.sqrt(dx ** 2 + dy ** 2) > measurement;
  }
  if ("x" in measurement && "y" in measurement) {
    return dx > measurement.x && dy > measurement.y;
  }
  if ("x" in measurement) {
    return dx > measurement.x;
  }
  if ("y" in measurement) {
    return dy > measurement.y;
  }
  return false;
}
var EventName;
(function(EventName2) {
  EventName2["Click"] = "click";
  EventName2["DragStart"] = "dragstart";
  EventName2["Keydown"] = "keydown";
  EventName2["ContextMenu"] = "contextmenu";
  EventName2["Resize"] = "resize";
  EventName2["SelectionChange"] = "selectionchange";
  EventName2["VisibilityChange"] = "visibilitychange";
})(EventName || (EventName = {}));
function preventDefault(event) {
  event.preventDefault();
}
function stopPropagation(event) {
  event.stopPropagation();
}
var KeyboardCode;
(function(KeyboardCode2) {
  KeyboardCode2["Space"] = "Space";
  KeyboardCode2["Down"] = "ArrowDown";
  KeyboardCode2["Right"] = "ArrowRight";
  KeyboardCode2["Left"] = "ArrowLeft";
  KeyboardCode2["Up"] = "ArrowUp";
  KeyboardCode2["Esc"] = "Escape";
  KeyboardCode2["Enter"] = "Enter";
  KeyboardCode2["Tab"] = "Tab";
})(KeyboardCode || (KeyboardCode = {}));
const defaultKeyboardCodes = {
  start: [KeyboardCode.Space, KeyboardCode.Enter],
  cancel: [KeyboardCode.Esc],
  end: [KeyboardCode.Space, KeyboardCode.Enter, KeyboardCode.Tab]
};
const defaultKeyboardCoordinateGetter = (event, _ref) => {
  let {
    currentCoordinates
  } = _ref;
  switch (event.code) {
    case KeyboardCode.Right:
      return {
        ...currentCoordinates,
        x: currentCoordinates.x + 25
      };
    case KeyboardCode.Left:
      return {
        ...currentCoordinates,
        x: currentCoordinates.x - 25
      };
    case KeyboardCode.Down:
      return {
        ...currentCoordinates,
        y: currentCoordinates.y + 25
      };
    case KeyboardCode.Up:
      return {
        ...currentCoordinates,
        y: currentCoordinates.y - 25
      };
  }
  return void 0;
};
class KeyboardSensor {
  constructor(props) {
    this.props = void 0;
    this.autoScrollEnabled = false;
    this.referenceCoordinates = void 0;
    this.listeners = void 0;
    this.windowListeners = void 0;
    this.props = props;
    const {
      event: {
        target
      }
    } = props;
    this.props = props;
    this.listeners = new Listeners(getOwnerDocument(target));
    this.windowListeners = new Listeners(getWindow(target));
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.attach();
  }
  attach() {
    this.handleStart();
    this.windowListeners.add(EventName.Resize, this.handleCancel);
    this.windowListeners.add(EventName.VisibilityChange, this.handleCancel);
    setTimeout(() => this.listeners.add(EventName.Keydown, this.handleKeyDown));
  }
  handleStart() {
    const {
      activeNode,
      onStart
    } = this.props;
    const node = activeNode.node.current;
    if (node) {
      scrollIntoViewIfNeeded(node);
    }
    onStart(defaultCoordinates);
  }
  handleKeyDown(event) {
    if (isKeyboardEvent(event)) {
      const {
        active,
        context,
        options
      } = this.props;
      const {
        keyboardCodes = defaultKeyboardCodes,
        coordinateGetter = defaultKeyboardCoordinateGetter,
        scrollBehavior = "smooth"
      } = options;
      const {
        code
      } = event;
      if (keyboardCodes.end.includes(code)) {
        this.handleEnd(event);
        return;
      }
      if (keyboardCodes.cancel.includes(code)) {
        this.handleCancel(event);
        return;
      }
      const {
        collisionRect
      } = context.current;
      const currentCoordinates = collisionRect ? {
        x: collisionRect.left,
        y: collisionRect.top
      } : defaultCoordinates;
      if (!this.referenceCoordinates) {
        this.referenceCoordinates = currentCoordinates;
      }
      const newCoordinates = coordinateGetter(event, {
        active,
        context: context.current,
        currentCoordinates
      });
      if (newCoordinates) {
        const coordinatesDelta = subtract(newCoordinates, currentCoordinates);
        const scrollDelta = {
          x: 0,
          y: 0
        };
        const {
          scrollableAncestors
        } = context.current;
        for (const scrollContainer of scrollableAncestors) {
          const direction = event.code;
          const {
            isTop,
            isRight,
            isLeft,
            isBottom,
            maxScroll,
            minScroll
          } = getScrollPosition(scrollContainer);
          const scrollElementRect = getScrollElementRect(scrollContainer);
          const clampedCoordinates = {
            x: Math.min(direction === KeyboardCode.Right ? scrollElementRect.right - scrollElementRect.width / 2 : scrollElementRect.right, Math.max(direction === KeyboardCode.Right ? scrollElementRect.left : scrollElementRect.left + scrollElementRect.width / 2, newCoordinates.x)),
            y: Math.min(direction === KeyboardCode.Down ? scrollElementRect.bottom - scrollElementRect.height / 2 : scrollElementRect.bottom, Math.max(direction === KeyboardCode.Down ? scrollElementRect.top : scrollElementRect.top + scrollElementRect.height / 2, newCoordinates.y))
          };
          const canScrollX = direction === KeyboardCode.Right && !isRight || direction === KeyboardCode.Left && !isLeft;
          const canScrollY = direction === KeyboardCode.Down && !isBottom || direction === KeyboardCode.Up && !isTop;
          if (canScrollX && clampedCoordinates.x !== newCoordinates.x) {
            const newScrollCoordinates = scrollContainer.scrollLeft + coordinatesDelta.x;
            const canScrollToNewCoordinates = direction === KeyboardCode.Right && newScrollCoordinates <= maxScroll.x || direction === KeyboardCode.Left && newScrollCoordinates >= minScroll.x;
            if (canScrollToNewCoordinates && !coordinatesDelta.y) {
              scrollContainer.scrollTo({
                left: newScrollCoordinates,
                behavior: scrollBehavior
              });
              return;
            }
            if (canScrollToNewCoordinates) {
              scrollDelta.x = scrollContainer.scrollLeft - newScrollCoordinates;
            } else {
              scrollDelta.x = direction === KeyboardCode.Right ? scrollContainer.scrollLeft - maxScroll.x : scrollContainer.scrollLeft - minScroll.x;
            }
            if (scrollDelta.x) {
              scrollContainer.scrollBy({
                left: -scrollDelta.x,
                behavior: scrollBehavior
              });
            }
            break;
          } else if (canScrollY && clampedCoordinates.y !== newCoordinates.y) {
            const newScrollCoordinates = scrollContainer.scrollTop + coordinatesDelta.y;
            const canScrollToNewCoordinates = direction === KeyboardCode.Down && newScrollCoordinates <= maxScroll.y || direction === KeyboardCode.Up && newScrollCoordinates >= minScroll.y;
            if (canScrollToNewCoordinates && !coordinatesDelta.x) {
              scrollContainer.scrollTo({
                top: newScrollCoordinates,
                behavior: scrollBehavior
              });
              return;
            }
            if (canScrollToNewCoordinates) {
              scrollDelta.y = scrollContainer.scrollTop - newScrollCoordinates;
            } else {
              scrollDelta.y = direction === KeyboardCode.Down ? scrollContainer.scrollTop - maxScroll.y : scrollContainer.scrollTop - minScroll.y;
            }
            if (scrollDelta.y) {
              scrollContainer.scrollBy({
                top: -scrollDelta.y,
                behavior: scrollBehavior
              });
            }
            break;
          }
        }
        this.handleMove(event, add(subtract(newCoordinates, this.referenceCoordinates), scrollDelta));
      }
    }
  }
  handleMove(event, coordinates) {
    const {
      onMove
    } = this.props;
    event.preventDefault();
    onMove(coordinates);
  }
  handleEnd(event) {
    const {
      onEnd
    } = this.props;
    event.preventDefault();
    this.detach();
    onEnd();
  }
  handleCancel(event) {
    const {
      onCancel
    } = this.props;
    event.preventDefault();
    this.detach();
    onCancel();
  }
  detach() {
    this.listeners.removeAll();
    this.windowListeners.removeAll();
  }
}
KeyboardSensor.activators = [{
  eventName: "onKeyDown",
  handler: (event, _ref, _ref2) => {
    let {
      keyboardCodes = defaultKeyboardCodes,
      onActivation
    } = _ref;
    let {
      active
    } = _ref2;
    const {
      code
    } = event.nativeEvent;
    if (keyboardCodes.start.includes(code)) {
      const activator = active.activatorNode.current;
      if (activator && event.target !== activator) {
        return false;
      }
      event.preventDefault();
      onActivation == null ? void 0 : onActivation({
        event: event.nativeEvent
      });
      return true;
    }
    return false;
  }
}];
function isDistanceConstraint(constraint) {
  return Boolean(constraint && "distance" in constraint);
}
function isDelayConstraint(constraint) {
  return Boolean(constraint && "delay" in constraint);
}
class AbstractPointerSensor {
  constructor(props, events2, listenerTarget) {
    var _getEventCoordinates;
    if (listenerTarget === void 0) {
      listenerTarget = getEventListenerTarget(props.event.target);
    }
    this.props = void 0;
    this.events = void 0;
    this.autoScrollEnabled = true;
    this.document = void 0;
    this.activated = false;
    this.initialCoordinates = void 0;
    this.timeoutId = null;
    this.listeners = void 0;
    this.documentListeners = void 0;
    this.windowListeners = void 0;
    this.props = props;
    this.events = events2;
    const {
      event
    } = props;
    const {
      target
    } = event;
    this.props = props;
    this.events = events2;
    this.document = getOwnerDocument(target);
    this.documentListeners = new Listeners(this.document);
    this.listeners = new Listeners(listenerTarget);
    this.windowListeners = new Listeners(getWindow(target));
    this.initialCoordinates = (_getEventCoordinates = getEventCoordinates(event)) != null ? _getEventCoordinates : defaultCoordinates;
    this.handleStart = this.handleStart.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.removeTextSelection = this.removeTextSelection.bind(this);
    this.attach();
  }
  attach() {
    const {
      events: events2,
      props: {
        options: {
          activationConstraint,
          bypassActivationConstraint
        }
      }
    } = this;
    this.listeners.add(events2.move.name, this.handleMove, {
      passive: false
    });
    this.listeners.add(events2.end.name, this.handleEnd);
    if (events2.cancel) {
      this.listeners.add(events2.cancel.name, this.handleCancel);
    }
    this.windowListeners.add(EventName.Resize, this.handleCancel);
    this.windowListeners.add(EventName.DragStart, preventDefault);
    this.windowListeners.add(EventName.VisibilityChange, this.handleCancel);
    this.windowListeners.add(EventName.ContextMenu, preventDefault);
    this.documentListeners.add(EventName.Keydown, this.handleKeydown);
    if (activationConstraint) {
      if (bypassActivationConstraint != null && bypassActivationConstraint({
        event: this.props.event,
        activeNode: this.props.activeNode,
        options: this.props.options
      })) {
        return this.handleStart();
      }
      if (isDelayConstraint(activationConstraint)) {
        this.timeoutId = setTimeout(this.handleStart, activationConstraint.delay);
        this.handlePending(activationConstraint);
        return;
      }
      if (isDistanceConstraint(activationConstraint)) {
        this.handlePending(activationConstraint);
        return;
      }
    }
    this.handleStart();
  }
  detach() {
    this.listeners.removeAll();
    this.windowListeners.removeAll();
    setTimeout(this.documentListeners.removeAll, 50);
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
  handlePending(constraint, offset) {
    const {
      active,
      onPending
    } = this.props;
    onPending(active, constraint, this.initialCoordinates, offset);
  }
  handleStart() {
    const {
      initialCoordinates
    } = this;
    const {
      onStart
    } = this.props;
    if (initialCoordinates) {
      this.activated = true;
      this.documentListeners.add(EventName.Click, stopPropagation, {
        capture: true
      });
      this.removeTextSelection();
      this.documentListeners.add(EventName.SelectionChange, this.removeTextSelection);
      onStart(initialCoordinates);
    }
  }
  handleMove(event) {
    var _getEventCoordinates2;
    const {
      activated,
      initialCoordinates,
      props
    } = this;
    const {
      onMove,
      options: {
        activationConstraint
      }
    } = props;
    if (!initialCoordinates) {
      return;
    }
    const coordinates = (_getEventCoordinates2 = getEventCoordinates(event)) != null ? _getEventCoordinates2 : defaultCoordinates;
    const delta = subtract(initialCoordinates, coordinates);
    if (!activated && activationConstraint) {
      if (isDistanceConstraint(activationConstraint)) {
        if (activationConstraint.tolerance != null && hasExceededDistance(delta, activationConstraint.tolerance)) {
          return this.handleCancel();
        }
        if (hasExceededDistance(delta, activationConstraint.distance)) {
          return this.handleStart();
        }
      }
      if (isDelayConstraint(activationConstraint)) {
        if (hasExceededDistance(delta, activationConstraint.tolerance)) {
          return this.handleCancel();
        }
      }
      this.handlePending(activationConstraint, delta);
      return;
    }
    if (event.cancelable) {
      event.preventDefault();
    }
    onMove(coordinates);
  }
  handleEnd() {
    const {
      onAbort,
      onEnd
    } = this.props;
    this.detach();
    if (!this.activated) {
      onAbort(this.props.active);
    }
    onEnd();
  }
  handleCancel() {
    const {
      onAbort,
      onCancel
    } = this.props;
    this.detach();
    if (!this.activated) {
      onAbort(this.props.active);
    }
    onCancel();
  }
  handleKeydown(event) {
    if (event.code === KeyboardCode.Esc) {
      this.handleCancel();
    }
  }
  removeTextSelection() {
    var _this$document$getSel;
    (_this$document$getSel = this.document.getSelection()) == null ? void 0 : _this$document$getSel.removeAllRanges();
  }
}
const events = {
  cancel: {
    name: "pointercancel"
  },
  move: {
    name: "pointermove"
  },
  end: {
    name: "pointerup"
  }
};
class PointerSensor extends AbstractPointerSensor {
  constructor(props) {
    const {
      event
    } = props;
    const listenerTarget = getOwnerDocument(event.target);
    super(props, events, listenerTarget);
  }
}
PointerSensor.activators = [{
  eventName: "onPointerDown",
  handler: (_ref, _ref2) => {
    let {
      nativeEvent: event
    } = _ref;
    let {
      onActivation
    } = _ref2;
    if (!event.isPrimary || event.button !== 0) {
      return false;
    }
    onActivation == null ? void 0 : onActivation({
      event
    });
    return true;
  }
}];
const events$1 = {
  move: {
    name: "mousemove"
  },
  end: {
    name: "mouseup"
  }
};
var MouseButton;
(function(MouseButton2) {
  MouseButton2[MouseButton2["RightClick"] = 2] = "RightClick";
})(MouseButton || (MouseButton = {}));
class MouseSensor extends AbstractPointerSensor {
  constructor(props) {
    super(props, events$1, getOwnerDocument(props.event.target));
  }
}
MouseSensor.activators = [{
  eventName: "onMouseDown",
  handler: (_ref, _ref2) => {
    let {
      nativeEvent: event
    } = _ref;
    let {
      onActivation
    } = _ref2;
    if (event.button === MouseButton.RightClick) {
      return false;
    }
    onActivation == null ? void 0 : onActivation({
      event
    });
    return true;
  }
}];
const events$2 = {
  cancel: {
    name: "touchcancel"
  },
  move: {
    name: "touchmove"
  },
  end: {
    name: "touchend"
  }
};
class TouchSensor extends AbstractPointerSensor {
  constructor(props) {
    super(props, events$2);
  }
  static setup() {
    window.addEventListener(events$2.move.name, noop2, {
      capture: false,
      passive: false
    });
    return function teardown() {
      window.removeEventListener(events$2.move.name, noop2);
    };
    function noop2() {
    }
  }
}
TouchSensor.activators = [{
  eventName: "onTouchStart",
  handler: (_ref, _ref2) => {
    let {
      nativeEvent: event
    } = _ref;
    let {
      onActivation
    } = _ref2;
    const {
      touches
    } = event;
    if (touches.length > 1) {
      return false;
    }
    onActivation == null ? void 0 : onActivation({
      event
    });
    return true;
  }
}];
var AutoScrollActivator;
(function(AutoScrollActivator2) {
  AutoScrollActivator2[AutoScrollActivator2["Pointer"] = 0] = "Pointer";
  AutoScrollActivator2[AutoScrollActivator2["DraggableRect"] = 1] = "DraggableRect";
})(AutoScrollActivator || (AutoScrollActivator = {}));
var TraversalOrder;
(function(TraversalOrder2) {
  TraversalOrder2[TraversalOrder2["TreeOrder"] = 0] = "TreeOrder";
  TraversalOrder2[TraversalOrder2["ReversedTreeOrder"] = 1] = "ReversedTreeOrder";
})(TraversalOrder || (TraversalOrder = {}));
function useAutoScroller(_ref) {
  let {
    acceleration,
    activator = AutoScrollActivator.Pointer,
    canScroll,
    draggingRect,
    enabled,
    interval = 5,
    order = TraversalOrder.TreeOrder,
    pointerCoordinates,
    scrollableAncestors,
    scrollableAncestorRects,
    delta,
    threshold
  } = _ref;
  const scrollIntent = useScrollIntent({
    delta,
    disabled: !enabled
  });
  const [setAutoScrollInterval, clearAutoScrollInterval] = useInterval();
  const scrollSpeed = reactExports.useRef({
    x: 0,
    y: 0
  });
  const scrollDirection = reactExports.useRef({
    x: 0,
    y: 0
  });
  const rect = reactExports.useMemo(() => {
    switch (activator) {
      case AutoScrollActivator.Pointer:
        return pointerCoordinates ? {
          top: pointerCoordinates.y,
          bottom: pointerCoordinates.y,
          left: pointerCoordinates.x,
          right: pointerCoordinates.x
        } : null;
      case AutoScrollActivator.DraggableRect:
        return draggingRect;
    }
  }, [activator, draggingRect, pointerCoordinates]);
  const scrollContainerRef = reactExports.useRef(null);
  const autoScroll = reactExports.useCallback(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) {
      return;
    }
    const scrollLeft = scrollSpeed.current.x * scrollDirection.current.x;
    const scrollTop = scrollSpeed.current.y * scrollDirection.current.y;
    scrollContainer.scrollBy(scrollLeft, scrollTop);
  }, []);
  const sortedScrollableAncestors = reactExports.useMemo(() => order === TraversalOrder.TreeOrder ? [...scrollableAncestors].reverse() : scrollableAncestors, [order, scrollableAncestors]);
  reactExports.useEffect(
    () => {
      if (!enabled || !scrollableAncestors.length || !rect) {
        clearAutoScrollInterval();
        return;
      }
      for (const scrollContainer of sortedScrollableAncestors) {
        if ((canScroll == null ? void 0 : canScroll(scrollContainer)) === false) {
          continue;
        }
        const index = scrollableAncestors.indexOf(scrollContainer);
        const scrollContainerRect = scrollableAncestorRects[index];
        if (!scrollContainerRect) {
          continue;
        }
        const {
          direction,
          speed
        } = getScrollDirectionAndSpeed(scrollContainer, scrollContainerRect, rect, acceleration, threshold);
        for (const axis of ["x", "y"]) {
          if (!scrollIntent[axis][direction[axis]]) {
            speed[axis] = 0;
            direction[axis] = 0;
          }
        }
        if (speed.x > 0 || speed.y > 0) {
          clearAutoScrollInterval();
          scrollContainerRef.current = scrollContainer;
          setAutoScrollInterval(autoScroll, interval);
          scrollSpeed.current = speed;
          scrollDirection.current = direction;
          return;
        }
      }
      scrollSpeed.current = {
        x: 0,
        y: 0
      };
      scrollDirection.current = {
        x: 0,
        y: 0
      };
      clearAutoScrollInterval();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      acceleration,
      autoScroll,
      canScroll,
      clearAutoScrollInterval,
      enabled,
      interval,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      JSON.stringify(rect),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      JSON.stringify(scrollIntent),
      setAutoScrollInterval,
      scrollableAncestors,
      sortedScrollableAncestors,
      scrollableAncestorRects,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      JSON.stringify(threshold)
    ]
  );
}
const defaultScrollIntent = {
  x: {
    [Direction.Backward]: false,
    [Direction.Forward]: false
  },
  y: {
    [Direction.Backward]: false,
    [Direction.Forward]: false
  }
};
function useScrollIntent(_ref2) {
  let {
    delta,
    disabled
  } = _ref2;
  const previousDelta = usePrevious(delta);
  return useLazyMemo((previousIntent) => {
    if (disabled || !previousDelta || !previousIntent) {
      return defaultScrollIntent;
    }
    const direction = {
      x: Math.sign(delta.x - previousDelta.x),
      y: Math.sign(delta.y - previousDelta.y)
    };
    return {
      x: {
        [Direction.Backward]: previousIntent.x[Direction.Backward] || direction.x === -1,
        [Direction.Forward]: previousIntent.x[Direction.Forward] || direction.x === 1
      },
      y: {
        [Direction.Backward]: previousIntent.y[Direction.Backward] || direction.y === -1,
        [Direction.Forward]: previousIntent.y[Direction.Forward] || direction.y === 1
      }
    };
  }, [disabled, delta, previousDelta]);
}
function useCachedNode(draggableNodes, id) {
  const draggableNode = id != null ? draggableNodes.get(id) : void 0;
  const node = draggableNode ? draggableNode.node.current : null;
  return useLazyMemo((cachedNode) => {
    var _ref;
    if (id == null) {
      return null;
    }
    return (_ref = node != null ? node : cachedNode) != null ? _ref : null;
  }, [node, id]);
}
function useCombineActivators(sensors, getSyntheticHandler) {
  return reactExports.useMemo(() => sensors.reduce((accumulator, sensor) => {
    const {
      sensor: Sensor
    } = sensor;
    const sensorActivators = Sensor.activators.map((activator) => ({
      eventName: activator.eventName,
      handler: getSyntheticHandler(activator.handler, sensor)
    }));
    return [...accumulator, ...sensorActivators];
  }, []), [sensors, getSyntheticHandler]);
}
var MeasuringStrategy;
(function(MeasuringStrategy2) {
  MeasuringStrategy2[MeasuringStrategy2["Always"] = 0] = "Always";
  MeasuringStrategy2[MeasuringStrategy2["BeforeDragging"] = 1] = "BeforeDragging";
  MeasuringStrategy2[MeasuringStrategy2["WhileDragging"] = 2] = "WhileDragging";
})(MeasuringStrategy || (MeasuringStrategy = {}));
var MeasuringFrequency;
(function(MeasuringFrequency2) {
  MeasuringFrequency2["Optimized"] = "optimized";
})(MeasuringFrequency || (MeasuringFrequency = {}));
const defaultValue = /* @__PURE__ */ new Map();
function useDroppableMeasuring(containers, _ref) {
  let {
    dragging,
    dependencies,
    config
  } = _ref;
  const [queue, setQueue] = reactExports.useState(null);
  const {
    frequency,
    measure,
    strategy
  } = config;
  const containersRef = reactExports.useRef(containers);
  const disabled = isDisabled();
  const disabledRef = useLatestValue(disabled);
  const measureDroppableContainers = reactExports.useCallback(function(ids2) {
    if (ids2 === void 0) {
      ids2 = [];
    }
    if (disabledRef.current) {
      return;
    }
    setQueue((value) => {
      if (value === null) {
        return ids2;
      }
      return value.concat(ids2.filter((id) => !value.includes(id)));
    });
  }, [disabledRef]);
  const timeoutId = reactExports.useRef(null);
  const droppableRects = useLazyMemo((previousValue) => {
    if (disabled && !dragging) {
      return defaultValue;
    }
    if (!previousValue || previousValue === defaultValue || containersRef.current !== containers || queue != null) {
      const map = /* @__PURE__ */ new Map();
      for (let container of containers) {
        if (!container) {
          continue;
        }
        if (queue && queue.length > 0 && !queue.includes(container.id) && container.rect.current) {
          map.set(container.id, container.rect.current);
          continue;
        }
        const node = container.node.current;
        const rect = node ? new Rect(measure(node), node) : null;
        container.rect.current = rect;
        if (rect) {
          map.set(container.id, rect);
        }
      }
      return map;
    }
    return previousValue;
  }, [containers, queue, dragging, disabled, measure]);
  reactExports.useEffect(() => {
    containersRef.current = containers;
  }, [containers]);
  reactExports.useEffect(
    () => {
      if (disabled) {
        return;
      }
      measureDroppableContainers();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dragging, disabled]
  );
  reactExports.useEffect(
    () => {
      if (queue && queue.length > 0) {
        setQueue(null);
      }
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(queue)]
  );
  reactExports.useEffect(
    () => {
      if (disabled || typeof frequency !== "number" || timeoutId.current !== null) {
        return;
      }
      timeoutId.current = setTimeout(() => {
        measureDroppableContainers();
        timeoutId.current = null;
      }, frequency);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [frequency, disabled, measureDroppableContainers, ...dependencies]
  );
  return {
    droppableRects,
    measureDroppableContainers,
    measuringScheduled: queue != null
  };
  function isDisabled() {
    switch (strategy) {
      case MeasuringStrategy.Always:
        return false;
      case MeasuringStrategy.BeforeDragging:
        return dragging;
      default:
        return !dragging;
    }
  }
}
function useInitialValue(value, computeFn) {
  return useLazyMemo((previousValue) => {
    if (!value) {
      return null;
    }
    if (previousValue) {
      return previousValue;
    }
    return typeof computeFn === "function" ? computeFn(value) : value;
  }, [computeFn, value]);
}
function useInitialRect(node, measure) {
  return useInitialValue(node, measure);
}
function useMutationObserver(_ref) {
  let {
    callback,
    disabled
  } = _ref;
  const handleMutations = useEvent(callback);
  const mutationObserver = reactExports.useMemo(() => {
    if (disabled || typeof window === "undefined" || typeof window.MutationObserver === "undefined") {
      return void 0;
    }
    const {
      MutationObserver
    } = window;
    return new MutationObserver(handleMutations);
  }, [handleMutations, disabled]);
  reactExports.useEffect(() => {
    return () => mutationObserver == null ? void 0 : mutationObserver.disconnect();
  }, [mutationObserver]);
  return mutationObserver;
}
function useResizeObserver(_ref) {
  let {
    callback,
    disabled
  } = _ref;
  const handleResize = useEvent(callback);
  const resizeObserver = reactExports.useMemo(
    () => {
      if (disabled || typeof window === "undefined" || typeof window.ResizeObserver === "undefined") {
        return void 0;
      }
      const {
        ResizeObserver
      } = window;
      return new ResizeObserver(handleResize);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [disabled]
  );
  reactExports.useEffect(() => {
    return () => resizeObserver == null ? void 0 : resizeObserver.disconnect();
  }, [resizeObserver]);
  return resizeObserver;
}
function defaultMeasure(element) {
  return new Rect(getClientRect(element), element);
}
function useRect(element, measure, fallbackRect) {
  if (measure === void 0) {
    measure = defaultMeasure;
  }
  const [rect, setRect] = reactExports.useState(null);
  function measureRect() {
    setRect((currentRect) => {
      if (!element) {
        return null;
      }
      if (element.isConnected === false) {
        var _ref;
        return (_ref = currentRect != null ? currentRect : fallbackRect) != null ? _ref : null;
      }
      const newRect = measure(element);
      if (JSON.stringify(currentRect) === JSON.stringify(newRect)) {
        return currentRect;
      }
      return newRect;
    });
  }
  const mutationObserver = useMutationObserver({
    callback(records) {
      if (!element) {
        return;
      }
      for (const record of records) {
        const {
          type,
          target
        } = record;
        if (type === "childList" && target instanceof HTMLElement && target.contains(element)) {
          measureRect();
          break;
        }
      }
    }
  });
  const resizeObserver = useResizeObserver({
    callback: measureRect
  });
  useIsomorphicLayoutEffect(() => {
    measureRect();
    if (element) {
      resizeObserver == null ? void 0 : resizeObserver.observe(element);
      mutationObserver == null ? void 0 : mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
      });
    } else {
      resizeObserver == null ? void 0 : resizeObserver.disconnect();
      mutationObserver == null ? void 0 : mutationObserver.disconnect();
    }
  }, [element]);
  return rect;
}
function useRectDelta(rect) {
  const initialRect = useInitialValue(rect);
  return getRectDelta(rect, initialRect);
}
const defaultValue$1 = [];
function useScrollableAncestors(node) {
  const previousNode = reactExports.useRef(node);
  const ancestors = useLazyMemo((previousValue) => {
    if (!node) {
      return defaultValue$1;
    }
    if (previousValue && previousValue !== defaultValue$1 && node && previousNode.current && node.parentNode === previousNode.current.parentNode) {
      return previousValue;
    }
    return getScrollableAncestors(node);
  }, [node]);
  reactExports.useEffect(() => {
    previousNode.current = node;
  }, [node]);
  return ancestors;
}
function useScrollOffsets(elements) {
  const [scrollCoordinates, setScrollCoordinates] = reactExports.useState(null);
  const prevElements = reactExports.useRef(elements);
  const handleScroll = reactExports.useCallback((event) => {
    const scrollingElement = getScrollableElement(event.target);
    if (!scrollingElement) {
      return;
    }
    setScrollCoordinates((scrollCoordinates2) => {
      if (!scrollCoordinates2) {
        return null;
      }
      scrollCoordinates2.set(scrollingElement, getScrollCoordinates(scrollingElement));
      return new Map(scrollCoordinates2);
    });
  }, []);
  reactExports.useEffect(() => {
    const previousElements = prevElements.current;
    if (elements !== previousElements) {
      cleanup(previousElements);
      const entries = elements.map((element) => {
        const scrollableElement = getScrollableElement(element);
        if (scrollableElement) {
          scrollableElement.addEventListener("scroll", handleScroll, {
            passive: true
          });
          return [scrollableElement, getScrollCoordinates(scrollableElement)];
        }
        return null;
      }).filter((entry) => entry != null);
      setScrollCoordinates(entries.length ? new Map(entries) : null);
      prevElements.current = elements;
    }
    return () => {
      cleanup(elements);
      cleanup(previousElements);
    };
    function cleanup(elements2) {
      elements2.forEach((element) => {
        const scrollableElement = getScrollableElement(element);
        scrollableElement == null ? void 0 : scrollableElement.removeEventListener("scroll", handleScroll);
      });
    }
  }, [handleScroll, elements]);
  return reactExports.useMemo(() => {
    if (elements.length) {
      return scrollCoordinates ? Array.from(scrollCoordinates.values()).reduce((acc, coordinates) => add(acc, coordinates), defaultCoordinates) : getScrollOffsets(elements);
    }
    return defaultCoordinates;
  }, [elements, scrollCoordinates]);
}
function useScrollOffsetsDelta(scrollOffsets, dependencies) {
  if (dependencies === void 0) {
    dependencies = [];
  }
  const initialScrollOffsets = reactExports.useRef(null);
  reactExports.useEffect(
    () => {
      initialScrollOffsets.current = null;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dependencies
  );
  reactExports.useEffect(() => {
    const hasScrollOffsets = scrollOffsets !== defaultCoordinates;
    if (hasScrollOffsets && !initialScrollOffsets.current) {
      initialScrollOffsets.current = scrollOffsets;
    }
    if (!hasScrollOffsets && initialScrollOffsets.current) {
      initialScrollOffsets.current = null;
    }
  }, [scrollOffsets]);
  return initialScrollOffsets.current ? subtract(scrollOffsets, initialScrollOffsets.current) : defaultCoordinates;
}
function useSensorSetup(sensors) {
  reactExports.useEffect(
    () => {
      if (!canUseDOM) {
        return;
      }
      const teardownFns = sensors.map((_ref) => {
        let {
          sensor
        } = _ref;
        return sensor.setup == null ? void 0 : sensor.setup();
      });
      return () => {
        for (const teardown of teardownFns) {
          teardown == null ? void 0 : teardown();
        }
      };
    },
    // TO-DO: Sensors length could theoretically change which would not be a valid dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
    sensors.map((_ref2) => {
      let {
        sensor
      } = _ref2;
      return sensor;
    })
  );
}
function useSyntheticListeners(listeners, id) {
  return reactExports.useMemo(() => {
    return listeners.reduce((acc, _ref) => {
      let {
        eventName,
        handler
      } = _ref;
      acc[eventName] = (event) => {
        handler(event, id);
      };
      return acc;
    }, {});
  }, [listeners, id]);
}
function useWindowRect(element) {
  return reactExports.useMemo(() => element ? getWindowClientRect(element) : null, [element]);
}
const defaultValue$2 = [];
function useRects(elements, measure) {
  if (measure === void 0) {
    measure = getClientRect;
  }
  const [firstElement] = elements;
  const windowRect = useWindowRect(firstElement ? getWindow(firstElement) : null);
  const [rects, setRects] = reactExports.useState(defaultValue$2);
  function measureRects() {
    setRects(() => {
      if (!elements.length) {
        return defaultValue$2;
      }
      return elements.map((element) => isDocumentScrollingElement(element) ? windowRect : new Rect(measure(element), element));
    });
  }
  const resizeObserver = useResizeObserver({
    callback: measureRects
  });
  useIsomorphicLayoutEffect(() => {
    resizeObserver == null ? void 0 : resizeObserver.disconnect();
    measureRects();
    elements.forEach((element) => resizeObserver == null ? void 0 : resizeObserver.observe(element));
  }, [elements]);
  return rects;
}
function getMeasurableNode(node) {
  if (!node) {
    return null;
  }
  if (node.children.length > 1) {
    return node;
  }
  const firstChild = node.children[0];
  return isHTMLElement(firstChild) ? firstChild : node;
}
function useDragOverlayMeasuring(_ref) {
  let {
    measure
  } = _ref;
  const [rect, setRect] = reactExports.useState(null);
  const handleResize = reactExports.useCallback((entries) => {
    for (const {
      target
    } of entries) {
      if (isHTMLElement(target)) {
        setRect((rect2) => {
          const newRect = measure(target);
          return rect2 ? {
            ...rect2,
            width: newRect.width,
            height: newRect.height
          } : newRect;
        });
        break;
      }
    }
  }, [measure]);
  const resizeObserver = useResizeObserver({
    callback: handleResize
  });
  const handleNodeChange = reactExports.useCallback((element) => {
    const node = getMeasurableNode(element);
    resizeObserver == null ? void 0 : resizeObserver.disconnect();
    if (node) {
      resizeObserver == null ? void 0 : resizeObserver.observe(node);
    }
    setRect(node ? measure(node) : null);
  }, [measure, resizeObserver]);
  const [nodeRef, setRef] = useNodeRef(handleNodeChange);
  return reactExports.useMemo(() => ({
    nodeRef,
    rect,
    setRef
  }), [rect, nodeRef, setRef]);
}
const defaultSensors = [{
  sensor: PointerSensor,
  options: {}
}, {
  sensor: KeyboardSensor,
  options: {}
}];
const defaultData = {
  current: {}
};
const defaultMeasuringConfiguration = {
  draggable: {
    measure: getTransformAgnosticClientRect
  },
  droppable: {
    measure: getTransformAgnosticClientRect,
    strategy: MeasuringStrategy.WhileDragging,
    frequency: MeasuringFrequency.Optimized
  },
  dragOverlay: {
    measure: getClientRect
  }
};
class DroppableContainersMap extends Map {
  get(id) {
    var _super$get;
    return id != null ? (_super$get = super.get(id)) != null ? _super$get : void 0 : void 0;
  }
  toArray() {
    return Array.from(this.values());
  }
  getEnabled() {
    return this.toArray().filter((_ref) => {
      let {
        disabled
      } = _ref;
      return !disabled;
    });
  }
  getNodeFor(id) {
    var _this$get$node$curren, _this$get;
    return (_this$get$node$curren = (_this$get = this.get(id)) == null ? void 0 : _this$get.node.current) != null ? _this$get$node$curren : void 0;
  }
}
const defaultPublicContext = {
  activatorEvent: null,
  active: null,
  activeNode: null,
  activeNodeRect: null,
  collisions: null,
  containerNodeRect: null,
  draggableNodes: /* @__PURE__ */ new Map(),
  droppableRects: /* @__PURE__ */ new Map(),
  droppableContainers: /* @__PURE__ */ new DroppableContainersMap(),
  over: null,
  dragOverlay: {
    nodeRef: {
      current: null
    },
    rect: null,
    setRef: noop
  },
  scrollableAncestors: [],
  scrollableAncestorRects: [],
  measuringConfiguration: defaultMeasuringConfiguration,
  measureDroppableContainers: noop,
  windowRect: null,
  measuringScheduled: false
};
const defaultInternalContext = {
  activatorEvent: null,
  activators: [],
  active: null,
  activeNodeRect: null,
  ariaDescribedById: {
    draggable: ""
  },
  dispatch: noop,
  draggableNodes: /* @__PURE__ */ new Map(),
  over: null,
  measureDroppableContainers: noop
};
const InternalContext = /* @__PURE__ */ reactExports.createContext(defaultInternalContext);
const PublicContext = /* @__PURE__ */ reactExports.createContext(defaultPublicContext);
function getInitialState() {
  return {
    draggable: {
      active: null,
      initialCoordinates: {
        x: 0,
        y: 0
      },
      nodes: /* @__PURE__ */ new Map(),
      translate: {
        x: 0,
        y: 0
      }
    },
    droppable: {
      containers: new DroppableContainersMap()
    }
  };
}
function reducer(state, action) {
  switch (action.type) {
    case Action.DragStart:
      return {
        ...state,
        draggable: {
          ...state.draggable,
          initialCoordinates: action.initialCoordinates,
          active: action.active
        }
      };
    case Action.DragMove:
      if (state.draggable.active == null) {
        return state;
      }
      return {
        ...state,
        draggable: {
          ...state.draggable,
          translate: {
            x: action.coordinates.x - state.draggable.initialCoordinates.x,
            y: action.coordinates.y - state.draggable.initialCoordinates.y
          }
        }
      };
    case Action.DragEnd:
    case Action.DragCancel:
      return {
        ...state,
        draggable: {
          ...state.draggable,
          active: null,
          initialCoordinates: {
            x: 0,
            y: 0
          },
          translate: {
            x: 0,
            y: 0
          }
        }
      };
    case Action.RegisterDroppable: {
      const {
        element
      } = action;
      const {
        id
      } = element;
      const containers = new DroppableContainersMap(state.droppable.containers);
      containers.set(id, element);
      return {
        ...state,
        droppable: {
          ...state.droppable,
          containers
        }
      };
    }
    case Action.SetDroppableDisabled: {
      const {
        id,
        key,
        disabled
      } = action;
      const element = state.droppable.containers.get(id);
      if (!element || key !== element.key) {
        return state;
      }
      const containers = new DroppableContainersMap(state.droppable.containers);
      containers.set(id, {
        ...element,
        disabled
      });
      return {
        ...state,
        droppable: {
          ...state.droppable,
          containers
        }
      };
    }
    case Action.UnregisterDroppable: {
      const {
        id,
        key
      } = action;
      const element = state.droppable.containers.get(id);
      if (!element || key !== element.key) {
        return state;
      }
      const containers = new DroppableContainersMap(state.droppable.containers);
      containers.delete(id);
      return {
        ...state,
        droppable: {
          ...state.droppable,
          containers
        }
      };
    }
    default: {
      return state;
    }
  }
}
function RestoreFocus(_ref) {
  let {
    disabled
  } = _ref;
  const {
    active,
    activatorEvent,
    draggableNodes
  } = reactExports.useContext(InternalContext);
  const previousActivatorEvent = usePrevious(activatorEvent);
  const previousActiveId = usePrevious(active == null ? void 0 : active.id);
  reactExports.useEffect(() => {
    if (disabled) {
      return;
    }
    if (!activatorEvent && previousActivatorEvent && previousActiveId != null) {
      if (!isKeyboardEvent(previousActivatorEvent)) {
        return;
      }
      if (document.activeElement === previousActivatorEvent.target) {
        return;
      }
      const draggableNode = draggableNodes.get(previousActiveId);
      if (!draggableNode) {
        return;
      }
      const {
        activatorNode,
        node
      } = draggableNode;
      if (!activatorNode.current && !node.current) {
        return;
      }
      requestAnimationFrame(() => {
        for (const element of [activatorNode.current, node.current]) {
          if (!element) {
            continue;
          }
          const focusableNode = findFirstFocusableNode(element);
          if (focusableNode) {
            focusableNode.focus();
            break;
          }
        }
      });
    }
  }, [activatorEvent, disabled, draggableNodes, previousActiveId, previousActivatorEvent]);
  return null;
}
function applyModifiers(modifiers, _ref) {
  let {
    transform,
    ...args
  } = _ref;
  return modifiers != null && modifiers.length ? modifiers.reduce((accumulator, modifier) => {
    return modifier({
      transform: accumulator,
      ...args
    });
  }, transform) : transform;
}
function useMeasuringConfiguration(config) {
  return reactExports.useMemo(
    () => ({
      draggable: {
        ...defaultMeasuringConfiguration.draggable,
        ...config == null ? void 0 : config.draggable
      },
      droppable: {
        ...defaultMeasuringConfiguration.droppable,
        ...config == null ? void 0 : config.droppable
      },
      dragOverlay: {
        ...defaultMeasuringConfiguration.dragOverlay,
        ...config == null ? void 0 : config.dragOverlay
      }
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [config == null ? void 0 : config.draggable, config == null ? void 0 : config.droppable, config == null ? void 0 : config.dragOverlay]
  );
}
function useLayoutShiftScrollCompensation(_ref) {
  let {
    activeNode,
    measure,
    initialRect,
    config = true
  } = _ref;
  const initialized = reactExports.useRef(false);
  const {
    x,
    y
  } = typeof config === "boolean" ? {
    x: config,
    y: config
  } : config;
  useIsomorphicLayoutEffect(() => {
    const disabled = !x && !y;
    if (disabled || !activeNode) {
      initialized.current = false;
      return;
    }
    if (initialized.current || !initialRect) {
      return;
    }
    const node = activeNode == null ? void 0 : activeNode.node.current;
    if (!node || node.isConnected === false) {
      return;
    }
    const rect = measure(node);
    const rectDelta = getRectDelta(rect, initialRect);
    if (!x) {
      rectDelta.x = 0;
    }
    if (!y) {
      rectDelta.y = 0;
    }
    initialized.current = true;
    if (Math.abs(rectDelta.x) > 0 || Math.abs(rectDelta.y) > 0) {
      const firstScrollableAncestor = getFirstScrollableAncestor(node);
      if (firstScrollableAncestor) {
        firstScrollableAncestor.scrollBy({
          top: rectDelta.y,
          left: rectDelta.x
        });
      }
    }
  }, [activeNode, x, y, initialRect, measure]);
}
const ActiveDraggableContext = /* @__PURE__ */ reactExports.createContext({
  ...defaultCoordinates,
  scaleX: 1,
  scaleY: 1
});
var Status;
(function(Status2) {
  Status2[Status2["Uninitialized"] = 0] = "Uninitialized";
  Status2[Status2["Initializing"] = 1] = "Initializing";
  Status2[Status2["Initialized"] = 2] = "Initialized";
})(Status || (Status = {}));
const DndContext = /* @__PURE__ */ reactExports.memo(function DndContext2(_ref) {
  var _sensorContext$curren, _dragOverlay$nodeRef$, _dragOverlay$rect, _over$rect;
  let {
    id,
    accessibility,
    autoScroll = true,
    children,
    sensors = defaultSensors,
    collisionDetection = rectIntersection,
    measuring,
    modifiers,
    ...props
  } = _ref;
  const store2 = reactExports.useReducer(reducer, void 0, getInitialState);
  const [state, dispatch] = store2;
  const [dispatchMonitorEvent, registerMonitorListener] = useDndMonitorProvider();
  const [status, setStatus] = reactExports.useState(Status.Uninitialized);
  const isInitialized = status === Status.Initialized;
  const {
    draggable: {
      active: activeId,
      nodes: draggableNodes,
      translate
    },
    droppable: {
      containers: droppableContainers
    }
  } = state;
  const node = activeId != null ? draggableNodes.get(activeId) : null;
  const activeRects = reactExports.useRef({
    initial: null,
    translated: null
  });
  const active = reactExports.useMemo(() => {
    var _node$data;
    return activeId != null ? {
      id: activeId,
      // It's possible for the active node to unmount while dragging
      data: (_node$data = node == null ? void 0 : node.data) != null ? _node$data : defaultData,
      rect: activeRects
    } : null;
  }, [activeId, node]);
  const activeRef = reactExports.useRef(null);
  const [activeSensor, setActiveSensor] = reactExports.useState(null);
  const [activatorEvent, setActivatorEvent] = reactExports.useState(null);
  const latestProps = useLatestValue(props, Object.values(props));
  const draggableDescribedById = useUniqueId("DndDescribedBy", id);
  const enabledDroppableContainers = reactExports.useMemo(() => droppableContainers.getEnabled(), [droppableContainers]);
  const measuringConfiguration = useMeasuringConfiguration(measuring);
  const {
    droppableRects,
    measureDroppableContainers,
    measuringScheduled
  } = useDroppableMeasuring(enabledDroppableContainers, {
    dragging: isInitialized,
    dependencies: [translate.x, translate.y],
    config: measuringConfiguration.droppable
  });
  const activeNode = useCachedNode(draggableNodes, activeId);
  const activationCoordinates = reactExports.useMemo(() => activatorEvent ? getEventCoordinates(activatorEvent) : null, [activatorEvent]);
  const autoScrollOptions = getAutoScrollerOptions();
  const initialActiveNodeRect = useInitialRect(activeNode, measuringConfiguration.draggable.measure);
  useLayoutShiftScrollCompensation({
    activeNode: activeId != null ? draggableNodes.get(activeId) : null,
    config: autoScrollOptions.layoutShiftCompensation,
    initialRect: initialActiveNodeRect,
    measure: measuringConfiguration.draggable.measure
  });
  const activeNodeRect = useRect(activeNode, measuringConfiguration.draggable.measure, initialActiveNodeRect);
  const containerNodeRect = useRect(activeNode ? activeNode.parentElement : null);
  const sensorContext = reactExports.useRef({
    activatorEvent: null,
    active: null,
    activeNode,
    collisionRect: null,
    collisions: null,
    droppableRects,
    draggableNodes,
    draggingNode: null,
    draggingNodeRect: null,
    droppableContainers,
    over: null,
    scrollableAncestors: [],
    scrollAdjustedTranslate: null
  });
  const overNode = droppableContainers.getNodeFor((_sensorContext$curren = sensorContext.current.over) == null ? void 0 : _sensorContext$curren.id);
  const dragOverlay = useDragOverlayMeasuring({
    measure: measuringConfiguration.dragOverlay.measure
  });
  const draggingNode = (_dragOverlay$nodeRef$ = dragOverlay.nodeRef.current) != null ? _dragOverlay$nodeRef$ : activeNode;
  const draggingNodeRect = isInitialized ? (_dragOverlay$rect = dragOverlay.rect) != null ? _dragOverlay$rect : activeNodeRect : null;
  const usesDragOverlay = Boolean(dragOverlay.nodeRef.current && dragOverlay.rect);
  const nodeRectDelta = useRectDelta(usesDragOverlay ? null : activeNodeRect);
  const windowRect = useWindowRect(draggingNode ? getWindow(draggingNode) : null);
  const scrollableAncestors = useScrollableAncestors(isInitialized ? overNode != null ? overNode : activeNode : null);
  const scrollableAncestorRects = useRects(scrollableAncestors);
  const modifiedTranslate = applyModifiers(modifiers, {
    transform: {
      x: translate.x - nodeRectDelta.x,
      y: translate.y - nodeRectDelta.y,
      scaleX: 1,
      scaleY: 1
    },
    activatorEvent,
    active,
    activeNodeRect,
    containerNodeRect,
    draggingNodeRect,
    over: sensorContext.current.over,
    overlayNodeRect: dragOverlay.rect,
    scrollableAncestors,
    scrollableAncestorRects,
    windowRect
  });
  const pointerCoordinates = activationCoordinates ? add(activationCoordinates, translate) : null;
  const scrollOffsets = useScrollOffsets(scrollableAncestors);
  const scrollAdjustment = useScrollOffsetsDelta(scrollOffsets);
  const activeNodeScrollDelta = useScrollOffsetsDelta(scrollOffsets, [activeNodeRect]);
  const scrollAdjustedTranslate = add(modifiedTranslate, scrollAdjustment);
  const collisionRect = draggingNodeRect ? getAdjustedRect(draggingNodeRect, modifiedTranslate) : null;
  const collisions = active && collisionRect ? collisionDetection({
    active,
    collisionRect,
    droppableRects,
    droppableContainers: enabledDroppableContainers,
    pointerCoordinates
  }) : null;
  const overId = getFirstCollision(collisions, "id");
  const [over, setOver] = reactExports.useState(null);
  const appliedTranslate = usesDragOverlay ? modifiedTranslate : add(modifiedTranslate, activeNodeScrollDelta);
  const transform = adjustScale(appliedTranslate, (_over$rect = over == null ? void 0 : over.rect) != null ? _over$rect : null, activeNodeRect);
  const activeSensorRef = reactExports.useRef(null);
  const instantiateSensor = reactExports.useCallback(
    (event, _ref2) => {
      let {
        sensor: Sensor,
        options
      } = _ref2;
      if (activeRef.current == null) {
        return;
      }
      const activeNode2 = draggableNodes.get(activeRef.current);
      if (!activeNode2) {
        return;
      }
      const activatorEvent2 = event.nativeEvent;
      const sensorInstance = new Sensor({
        active: activeRef.current,
        activeNode: activeNode2,
        event: activatorEvent2,
        options,
        // Sensors need to be instantiated with refs for arguments that change over time
        // otherwise they are frozen in time with the stale arguments
        context: sensorContext,
        onAbort(id2) {
          const draggableNode = draggableNodes.get(id2);
          if (!draggableNode) {
            return;
          }
          const {
            onDragAbort
          } = latestProps.current;
          const event2 = {
            id: id2
          };
          onDragAbort == null ? void 0 : onDragAbort(event2);
          dispatchMonitorEvent({
            type: "onDragAbort",
            event: event2
          });
        },
        onPending(id2, constraint, initialCoordinates, offset) {
          const draggableNode = draggableNodes.get(id2);
          if (!draggableNode) {
            return;
          }
          const {
            onDragPending
          } = latestProps.current;
          const event2 = {
            id: id2,
            constraint,
            initialCoordinates,
            offset
          };
          onDragPending == null ? void 0 : onDragPending(event2);
          dispatchMonitorEvent({
            type: "onDragPending",
            event: event2
          });
        },
        onStart(initialCoordinates) {
          const id2 = activeRef.current;
          if (id2 == null) {
            return;
          }
          const draggableNode = draggableNodes.get(id2);
          if (!draggableNode) {
            return;
          }
          const {
            onDragStart
          } = latestProps.current;
          const event2 = {
            activatorEvent: activatorEvent2,
            active: {
              id: id2,
              data: draggableNode.data,
              rect: activeRects
            }
          };
          reactDomExports.unstable_batchedUpdates(() => {
            onDragStart == null ? void 0 : onDragStart(event2);
            setStatus(Status.Initializing);
            dispatch({
              type: Action.DragStart,
              initialCoordinates,
              active: id2
            });
            dispatchMonitorEvent({
              type: "onDragStart",
              event: event2
            });
            setActiveSensor(activeSensorRef.current);
            setActivatorEvent(activatorEvent2);
          });
        },
        onMove(coordinates) {
          dispatch({
            type: Action.DragMove,
            coordinates
          });
        },
        onEnd: createHandler(Action.DragEnd),
        onCancel: createHandler(Action.DragCancel)
      });
      activeSensorRef.current = sensorInstance;
      function createHandler(type) {
        return async function handler() {
          const {
            active: active2,
            collisions: collisions2,
            over: over2,
            scrollAdjustedTranslate: scrollAdjustedTranslate2
          } = sensorContext.current;
          let event2 = null;
          if (active2 && scrollAdjustedTranslate2) {
            const {
              cancelDrop
            } = latestProps.current;
            event2 = {
              activatorEvent: activatorEvent2,
              active: active2,
              collisions: collisions2,
              delta: scrollAdjustedTranslate2,
              over: over2
            };
            if (type === Action.DragEnd && typeof cancelDrop === "function") {
              const shouldCancel = await Promise.resolve(cancelDrop(event2));
              if (shouldCancel) {
                type = Action.DragCancel;
              }
            }
          }
          activeRef.current = null;
          reactDomExports.unstable_batchedUpdates(() => {
            dispatch({
              type
            });
            setStatus(Status.Uninitialized);
            setOver(null);
            setActiveSensor(null);
            setActivatorEvent(null);
            activeSensorRef.current = null;
            const eventName = type === Action.DragEnd ? "onDragEnd" : "onDragCancel";
            if (event2) {
              const handler2 = latestProps.current[eventName];
              handler2 == null ? void 0 : handler2(event2);
              dispatchMonitorEvent({
                type: eventName,
                event: event2
              });
            }
          });
        };
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [draggableNodes]
  );
  const bindActivatorToSensorInstantiator = reactExports.useCallback((handler, sensor) => {
    return (event, active2) => {
      const nativeEvent = event.nativeEvent;
      const activeDraggableNode = draggableNodes.get(active2);
      if (
        // Another sensor is already instantiating
        activeRef.current !== null || // No active draggable
        !activeDraggableNode || // Event has already been captured
        nativeEvent.dndKit || nativeEvent.defaultPrevented
      ) {
        return;
      }
      const activationContext = {
        active: activeDraggableNode
      };
      const shouldActivate = handler(event, sensor.options, activationContext);
      if (shouldActivate === true) {
        nativeEvent.dndKit = {
          capturedBy: sensor.sensor
        };
        activeRef.current = active2;
        instantiateSensor(event, sensor);
      }
    };
  }, [draggableNodes, instantiateSensor]);
  const activators = useCombineActivators(sensors, bindActivatorToSensorInstantiator);
  useSensorSetup(sensors);
  useIsomorphicLayoutEffect(() => {
    if (activeNodeRect && status === Status.Initializing) {
      setStatus(Status.Initialized);
    }
  }, [activeNodeRect, status]);
  reactExports.useEffect(
    () => {
      const {
        onDragMove
      } = latestProps.current;
      const {
        active: active2,
        activatorEvent: activatorEvent2,
        collisions: collisions2,
        over: over2
      } = sensorContext.current;
      if (!active2 || !activatorEvent2) {
        return;
      }
      const event = {
        active: active2,
        activatorEvent: activatorEvent2,
        collisions: collisions2,
        delta: {
          x: scrollAdjustedTranslate.x,
          y: scrollAdjustedTranslate.y
        },
        over: over2
      };
      reactDomExports.unstable_batchedUpdates(() => {
        onDragMove == null ? void 0 : onDragMove(event);
        dispatchMonitorEvent({
          type: "onDragMove",
          event
        });
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [scrollAdjustedTranslate.x, scrollAdjustedTranslate.y]
  );
  reactExports.useEffect(
    () => {
      const {
        active: active2,
        activatorEvent: activatorEvent2,
        collisions: collisions2,
        droppableContainers: droppableContainers2,
        scrollAdjustedTranslate: scrollAdjustedTranslate2
      } = sensorContext.current;
      if (!active2 || activeRef.current == null || !activatorEvent2 || !scrollAdjustedTranslate2) {
        return;
      }
      const {
        onDragOver
      } = latestProps.current;
      const overContainer = droppableContainers2.get(overId);
      const over2 = overContainer && overContainer.rect.current ? {
        id: overContainer.id,
        rect: overContainer.rect.current,
        data: overContainer.data,
        disabled: overContainer.disabled
      } : null;
      const event = {
        active: active2,
        activatorEvent: activatorEvent2,
        collisions: collisions2,
        delta: {
          x: scrollAdjustedTranslate2.x,
          y: scrollAdjustedTranslate2.y
        },
        over: over2
      };
      reactDomExports.unstable_batchedUpdates(() => {
        setOver(over2);
        onDragOver == null ? void 0 : onDragOver(event);
        dispatchMonitorEvent({
          type: "onDragOver",
          event
        });
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [overId]
  );
  useIsomorphicLayoutEffect(() => {
    sensorContext.current = {
      activatorEvent,
      active,
      activeNode,
      collisionRect,
      collisions,
      droppableRects,
      draggableNodes,
      draggingNode,
      draggingNodeRect,
      droppableContainers,
      over,
      scrollableAncestors,
      scrollAdjustedTranslate
    };
    activeRects.current = {
      initial: draggingNodeRect,
      translated: collisionRect
    };
  }, [active, activeNode, collisions, collisionRect, draggableNodes, draggingNode, draggingNodeRect, droppableRects, droppableContainers, over, scrollableAncestors, scrollAdjustedTranslate]);
  useAutoScroller({
    ...autoScrollOptions,
    delta: translate,
    draggingRect: collisionRect,
    pointerCoordinates,
    scrollableAncestors,
    scrollableAncestorRects
  });
  const publicContext = reactExports.useMemo(() => {
    const context = {
      active,
      activeNode,
      activeNodeRect,
      activatorEvent,
      collisions,
      containerNodeRect,
      dragOverlay,
      draggableNodes,
      droppableContainers,
      droppableRects,
      over,
      measureDroppableContainers,
      scrollableAncestors,
      scrollableAncestorRects,
      measuringConfiguration,
      measuringScheduled,
      windowRect
    };
    return context;
  }, [active, activeNode, activeNodeRect, activatorEvent, collisions, containerNodeRect, dragOverlay, draggableNodes, droppableContainers, droppableRects, over, measureDroppableContainers, scrollableAncestors, scrollableAncestorRects, measuringConfiguration, measuringScheduled, windowRect]);
  const internalContext = reactExports.useMemo(() => {
    const context = {
      activatorEvent,
      activators,
      active,
      activeNodeRect,
      ariaDescribedById: {
        draggable: draggableDescribedById
      },
      dispatch,
      draggableNodes,
      over,
      measureDroppableContainers
    };
    return context;
  }, [activatorEvent, activators, active, activeNodeRect, dispatch, draggableDescribedById, draggableNodes, over, measureDroppableContainers]);
  return React.createElement(DndMonitorContext.Provider, {
    value: registerMonitorListener
  }, React.createElement(InternalContext.Provider, {
    value: internalContext
  }, React.createElement(PublicContext.Provider, {
    value: publicContext
  }, React.createElement(ActiveDraggableContext.Provider, {
    value: transform
  }, children)), React.createElement(RestoreFocus, {
    disabled: (accessibility == null ? void 0 : accessibility.restoreFocus) === false
  })), React.createElement(Accessibility, {
    ...accessibility,
    hiddenTextDescribedById: draggableDescribedById
  }));
  function getAutoScrollerOptions() {
    const activeSensorDisablesAutoscroll = (activeSensor == null ? void 0 : activeSensor.autoScrollEnabled) === false;
    const autoScrollGloballyDisabled = typeof autoScroll === "object" ? autoScroll.enabled === false : autoScroll === false;
    const enabled = isInitialized && !activeSensorDisablesAutoscroll && !autoScrollGloballyDisabled;
    if (typeof autoScroll === "object") {
      return {
        ...autoScroll,
        enabled
      };
    }
    return {
      enabled
    };
  }
});
const NullContext = /* @__PURE__ */ reactExports.createContext(null);
const defaultRole = "button";
const ID_PREFIX$1 = "Draggable";
function useDraggable(_ref) {
  let {
    id,
    data,
    disabled = false,
    attributes
  } = _ref;
  const key = useUniqueId(ID_PREFIX$1);
  const {
    activators,
    activatorEvent,
    active,
    activeNodeRect,
    ariaDescribedById,
    draggableNodes,
    over
  } = reactExports.useContext(InternalContext);
  const {
    role = defaultRole,
    roleDescription = "draggable",
    tabIndex = 0
  } = attributes != null ? attributes : {};
  const isDragging = (active == null ? void 0 : active.id) === id;
  const transform = reactExports.useContext(isDragging ? ActiveDraggableContext : NullContext);
  const [node, setNodeRef] = useNodeRef();
  const [activatorNode, setActivatorNodeRef] = useNodeRef();
  const listeners = useSyntheticListeners(activators, id);
  const dataRef = useLatestValue(data);
  useIsomorphicLayoutEffect(
    () => {
      draggableNodes.set(id, {
        id,
        key,
        node,
        activatorNode,
        data: dataRef
      });
      return () => {
        const node2 = draggableNodes.get(id);
        if (node2 && node2.key === key) {
          draggableNodes.delete(id);
        }
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [draggableNodes, id]
  );
  const memoizedAttributes = reactExports.useMemo(() => ({
    role,
    tabIndex,
    "aria-disabled": disabled,
    "aria-pressed": isDragging && role === defaultRole ? true : void 0,
    "aria-roledescription": roleDescription,
    "aria-describedby": ariaDescribedById.draggable
  }), [disabled, role, tabIndex, isDragging, roleDescription, ariaDescribedById.draggable]);
  return {
    active,
    activatorEvent,
    activeNodeRect,
    attributes: memoizedAttributes,
    isDragging,
    listeners: disabled ? void 0 : listeners,
    node,
    over,
    setNodeRef,
    setActivatorNodeRef,
    transform
  };
}
function useDndContext() {
  return reactExports.useContext(PublicContext);
}
const ID_PREFIX$1$1 = "Droppable";
const defaultResizeObserverConfig = {
  timeout: 25
};
function useDroppable(_ref) {
  let {
    data,
    disabled = false,
    id,
    resizeObserverConfig
  } = _ref;
  const key = useUniqueId(ID_PREFIX$1$1);
  const {
    active,
    dispatch,
    over,
    measureDroppableContainers
  } = reactExports.useContext(InternalContext);
  const previous = reactExports.useRef({
    disabled
  });
  const resizeObserverConnected = reactExports.useRef(false);
  const rect = reactExports.useRef(null);
  const callbackId = reactExports.useRef(null);
  const {
    disabled: resizeObserverDisabled,
    updateMeasurementsFor,
    timeout: resizeObserverTimeout
  } = {
    ...defaultResizeObserverConfig,
    ...resizeObserverConfig
  };
  const ids2 = useLatestValue(updateMeasurementsFor != null ? updateMeasurementsFor : id);
  const handleResize = reactExports.useCallback(
    () => {
      if (!resizeObserverConnected.current) {
        resizeObserverConnected.current = true;
        return;
      }
      if (callbackId.current != null) {
        clearTimeout(callbackId.current);
      }
      callbackId.current = setTimeout(() => {
        measureDroppableContainers(Array.isArray(ids2.current) ? ids2.current : [ids2.current]);
        callbackId.current = null;
      }, resizeObserverTimeout);
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [resizeObserverTimeout]
  );
  const resizeObserver = useResizeObserver({
    callback: handleResize,
    disabled: resizeObserverDisabled || !active
  });
  const handleNodeChange = reactExports.useCallback((newElement, previousElement) => {
    if (!resizeObserver) {
      return;
    }
    if (previousElement) {
      resizeObserver.unobserve(previousElement);
      resizeObserverConnected.current = false;
    }
    if (newElement) {
      resizeObserver.observe(newElement);
    }
  }, [resizeObserver]);
  const [nodeRef, setNodeRef] = useNodeRef(handleNodeChange);
  const dataRef = useLatestValue(data);
  reactExports.useEffect(() => {
    if (!resizeObserver || !nodeRef.current) {
      return;
    }
    resizeObserver.disconnect();
    resizeObserverConnected.current = false;
    resizeObserver.observe(nodeRef.current);
  }, [nodeRef, resizeObserver]);
  reactExports.useEffect(
    () => {
      dispatch({
        type: Action.RegisterDroppable,
        element: {
          id,
          key,
          disabled,
          node: nodeRef,
          rect,
          data: dataRef
        }
      });
      return () => dispatch({
        type: Action.UnregisterDroppable,
        key,
        id
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [id]
  );
  reactExports.useEffect(() => {
    if (disabled !== previous.current.disabled) {
      dispatch({
        type: Action.SetDroppableDisabled,
        id,
        key,
        disabled
      });
      previous.current.disabled = disabled;
    }
  }, [id, key, disabled, dispatch]);
  return {
    active,
    rect,
    isOver: (over == null ? void 0 : over.id) === id,
    node: nodeRef,
    over,
    setNodeRef
  };
}
function arrayMove(array, from, to) {
  const newArray = array.slice();
  newArray.splice(to < 0 ? newArray.length + to : to, 0, newArray.splice(from, 1)[0]);
  return newArray;
}
function getSortedRects(items, rects) {
  return items.reduce((accumulator, id, index) => {
    const rect = rects.get(id);
    if (rect) {
      accumulator[index] = rect;
    }
    return accumulator;
  }, Array(items.length));
}
function isValidIndex(index) {
  return index !== null && index >= 0;
}
function itemsEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}
function normalizeDisabled(disabled) {
  if (typeof disabled === "boolean") {
    return {
      draggable: disabled,
      droppable: disabled
    };
  }
  return disabled;
}
const rectSortingStrategy = (_ref) => {
  let {
    rects,
    activeIndex,
    overIndex,
    index
  } = _ref;
  const newRects = arrayMove(rects, overIndex, activeIndex);
  const oldRect = rects[index];
  const newRect = newRects[index];
  if (!newRect || !oldRect) {
    return null;
  }
  return {
    x: newRect.left - oldRect.left,
    y: newRect.top - oldRect.top,
    scaleX: newRect.width / oldRect.width,
    scaleY: newRect.height / oldRect.height
  };
};
const defaultScale$1 = {
  scaleX: 1,
  scaleY: 1
};
const verticalListSortingStrategy = (_ref) => {
  var _rects$activeIndex;
  let {
    activeIndex,
    activeNodeRect: fallbackActiveRect,
    index,
    rects,
    overIndex
  } = _ref;
  const activeNodeRect = (_rects$activeIndex = rects[activeIndex]) != null ? _rects$activeIndex : fallbackActiveRect;
  if (!activeNodeRect) {
    return null;
  }
  if (index === activeIndex) {
    const overIndexRect = rects[overIndex];
    if (!overIndexRect) {
      return null;
    }
    return {
      x: 0,
      y: activeIndex < overIndex ? overIndexRect.top + overIndexRect.height - (activeNodeRect.top + activeNodeRect.height) : overIndexRect.top - activeNodeRect.top,
      ...defaultScale$1
    };
  }
  const itemGap = getItemGap$1(rects, index, activeIndex);
  if (index > activeIndex && index <= overIndex) {
    return {
      x: 0,
      y: -activeNodeRect.height - itemGap,
      ...defaultScale$1
    };
  }
  if (index < activeIndex && index >= overIndex) {
    return {
      x: 0,
      y: activeNodeRect.height + itemGap,
      ...defaultScale$1
    };
  }
  return {
    x: 0,
    y: 0,
    ...defaultScale$1
  };
};
function getItemGap$1(clientRects, index, activeIndex) {
  const currentRect = clientRects[index];
  const previousRect = clientRects[index - 1];
  const nextRect = clientRects[index + 1];
  if (!currentRect) {
    return 0;
  }
  if (activeIndex < index) {
    return previousRect ? currentRect.top - (previousRect.top + previousRect.height) : nextRect ? nextRect.top - (currentRect.top + currentRect.height) : 0;
  }
  return nextRect ? nextRect.top - (currentRect.top + currentRect.height) : previousRect ? currentRect.top - (previousRect.top + previousRect.height) : 0;
}
const ID_PREFIX = "Sortable";
const Context = /* @__PURE__ */ React.createContext({
  activeIndex: -1,
  containerId: ID_PREFIX,
  disableTransforms: false,
  items: [],
  overIndex: -1,
  useDragOverlay: false,
  sortedRects: [],
  strategy: rectSortingStrategy,
  disabled: {
    draggable: false,
    droppable: false
  }
});
function SortableContext(_ref) {
  let {
    children,
    id,
    items: userDefinedItems,
    strategy = rectSortingStrategy,
    disabled: disabledProp = false
  } = _ref;
  const {
    active,
    dragOverlay,
    droppableRects,
    over,
    measureDroppableContainers
  } = useDndContext();
  const containerId = useUniqueId(ID_PREFIX, id);
  const useDragOverlay = Boolean(dragOverlay.rect !== null);
  const items = reactExports.useMemo(() => userDefinedItems.map((item) => typeof item === "object" && "id" in item ? item.id : item), [userDefinedItems]);
  const isDragging = active != null;
  const activeIndex = active ? items.indexOf(active.id) : -1;
  const overIndex = over ? items.indexOf(over.id) : -1;
  const previousItemsRef = reactExports.useRef(items);
  const itemsHaveChanged = !itemsEqual(items, previousItemsRef.current);
  const disableTransforms = overIndex !== -1 && activeIndex === -1 || itemsHaveChanged;
  const disabled = normalizeDisabled(disabledProp);
  useIsomorphicLayoutEffect(() => {
    if (itemsHaveChanged && isDragging) {
      measureDroppableContainers(items);
    }
  }, [itemsHaveChanged, items, isDragging, measureDroppableContainers]);
  reactExports.useEffect(() => {
    previousItemsRef.current = items;
  }, [items]);
  const contextValue = reactExports.useMemo(
    () => ({
      activeIndex,
      containerId,
      disabled,
      disableTransforms,
      items,
      overIndex,
      useDragOverlay,
      sortedRects: getSortedRects(items, droppableRects),
      strategy
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeIndex, containerId, disabled.draggable, disabled.droppable, disableTransforms, items, overIndex, droppableRects, useDragOverlay, strategy]
  );
  return React.createElement(Context.Provider, {
    value: contextValue
  }, children);
}
const defaultNewIndexGetter = (_ref) => {
  let {
    id,
    items,
    activeIndex,
    overIndex
  } = _ref;
  return arrayMove(items, activeIndex, overIndex).indexOf(id);
};
const defaultAnimateLayoutChanges = (_ref2) => {
  let {
    containerId,
    isSorting,
    wasDragging,
    index,
    items,
    newIndex,
    previousItems,
    previousContainerId,
    transition
  } = _ref2;
  if (!transition || !wasDragging) {
    return false;
  }
  if (previousItems !== items && index === newIndex) {
    return false;
  }
  if (isSorting) {
    return true;
  }
  return newIndex !== index && containerId === previousContainerId;
};
const defaultTransition = {
  duration: 200,
  easing: "ease"
};
const transitionProperty = "transform";
const disabledTransition = /* @__PURE__ */ CSS.Transition.toString({
  property: transitionProperty,
  duration: 0,
  easing: "linear"
});
const defaultAttributes = {
  roleDescription: "sortable"
};
function useDerivedTransform(_ref) {
  let {
    disabled,
    index,
    node,
    rect
  } = _ref;
  const [derivedTransform, setDerivedtransform] = reactExports.useState(null);
  const previousIndex = reactExports.useRef(index);
  useIsomorphicLayoutEffect(() => {
    if (!disabled && index !== previousIndex.current && node.current) {
      const initial = rect.current;
      if (initial) {
        const current = getClientRect(node.current, {
          ignoreTransform: true
        });
        const delta = {
          x: initial.left - current.left,
          y: initial.top - current.top,
          scaleX: initial.width / current.width,
          scaleY: initial.height / current.height
        };
        if (delta.x || delta.y) {
          setDerivedtransform(delta);
        }
      }
    }
    if (index !== previousIndex.current) {
      previousIndex.current = index;
    }
  }, [disabled, index, node, rect]);
  reactExports.useEffect(() => {
    if (derivedTransform) {
      setDerivedtransform(null);
    }
  }, [derivedTransform]);
  return derivedTransform;
}
function useSortable(_ref) {
  let {
    animateLayoutChanges = defaultAnimateLayoutChanges,
    attributes: userDefinedAttributes,
    disabled: localDisabled,
    data: customData,
    getNewIndex = defaultNewIndexGetter,
    id,
    strategy: localStrategy,
    resizeObserverConfig,
    transition = defaultTransition
  } = _ref;
  const {
    items,
    containerId,
    activeIndex,
    disabled: globalDisabled,
    disableTransforms,
    sortedRects,
    overIndex,
    useDragOverlay,
    strategy: globalStrategy
  } = reactExports.useContext(Context);
  const disabled = normalizeLocalDisabled(localDisabled, globalDisabled);
  const index = items.indexOf(id);
  const data = reactExports.useMemo(() => ({
    sortable: {
      containerId,
      index,
      items
    },
    ...customData
  }), [containerId, customData, index, items]);
  const itemsAfterCurrentSortable = reactExports.useMemo(() => items.slice(items.indexOf(id)), [items, id]);
  const {
    rect,
    node,
    isOver,
    setNodeRef: setDroppableNodeRef
  } = useDroppable({
    id,
    data,
    disabled: disabled.droppable,
    resizeObserverConfig: {
      updateMeasurementsFor: itemsAfterCurrentSortable,
      ...resizeObserverConfig
    }
  });
  const {
    active,
    activatorEvent,
    activeNodeRect,
    attributes,
    setNodeRef: setDraggableNodeRef,
    listeners,
    isDragging,
    over,
    setActivatorNodeRef,
    transform
  } = useDraggable({
    id,
    data,
    attributes: {
      ...defaultAttributes,
      ...userDefinedAttributes
    },
    disabled: disabled.draggable
  });
  const setNodeRef = useCombinedRefs(setDroppableNodeRef, setDraggableNodeRef);
  const isSorting = Boolean(active);
  const displaceItem = isSorting && !disableTransforms && isValidIndex(activeIndex) && isValidIndex(overIndex);
  const shouldDisplaceDragSource = !useDragOverlay && isDragging;
  const dragSourceDisplacement = shouldDisplaceDragSource && displaceItem ? transform : null;
  const strategy = localStrategy != null ? localStrategy : globalStrategy;
  const finalTransform = displaceItem ? dragSourceDisplacement != null ? dragSourceDisplacement : strategy({
    rects: sortedRects,
    activeNodeRect,
    activeIndex,
    overIndex,
    index
  }) : null;
  const newIndex = isValidIndex(activeIndex) && isValidIndex(overIndex) ? getNewIndex({
    id,
    items,
    activeIndex,
    overIndex
  }) : index;
  const activeId = active == null ? void 0 : active.id;
  const previous = reactExports.useRef({
    activeId,
    items,
    newIndex,
    containerId
  });
  const itemsHaveChanged = items !== previous.current.items;
  const shouldAnimateLayoutChanges = animateLayoutChanges({
    active,
    containerId,
    isDragging,
    isSorting,
    id,
    index,
    items,
    newIndex: previous.current.newIndex,
    previousItems: previous.current.items,
    previousContainerId: previous.current.containerId,
    transition,
    wasDragging: previous.current.activeId != null
  });
  const derivedTransform = useDerivedTransform({
    disabled: !shouldAnimateLayoutChanges,
    index,
    node,
    rect
  });
  reactExports.useEffect(() => {
    if (isSorting && previous.current.newIndex !== newIndex) {
      previous.current.newIndex = newIndex;
    }
    if (containerId !== previous.current.containerId) {
      previous.current.containerId = containerId;
    }
    if (items !== previous.current.items) {
      previous.current.items = items;
    }
  }, [isSorting, newIndex, containerId, items]);
  reactExports.useEffect(() => {
    if (activeId === previous.current.activeId) {
      return;
    }
    if (activeId && !previous.current.activeId) {
      previous.current.activeId = activeId;
      return;
    }
    const timeoutId = setTimeout(() => {
      previous.current.activeId = activeId;
    }, 50);
    return () => clearTimeout(timeoutId);
  }, [activeId]);
  return {
    active,
    activeIndex,
    attributes,
    data,
    rect,
    index,
    newIndex,
    items,
    isOver,
    isSorting,
    isDragging,
    listeners,
    node,
    overIndex,
    over,
    setNodeRef,
    setActivatorNodeRef,
    setDroppableNodeRef,
    setDraggableNodeRef,
    transform: derivedTransform != null ? derivedTransform : finalTransform,
    transition: getTransition()
  };
  function getTransition() {
    if (
      // Temporarily disable transitions for a single frame to set up derived transforms
      derivedTransform || // Or to prevent items jumping to back to their "new" position when items change
      itemsHaveChanged && previous.current.newIndex === index
    ) {
      return disabledTransition;
    }
    if (shouldDisplaceDragSource && !isKeyboardEvent(activatorEvent) || !transition) {
      return void 0;
    }
    if (isSorting || shouldAnimateLayoutChanges) {
      return CSS.Transition.toString({
        ...transition,
        property: transitionProperty
      });
    }
    return void 0;
  }
}
function normalizeLocalDisabled(localDisabled, globalDisabled) {
  var _localDisabled$dragga, _localDisabled$droppa;
  if (typeof localDisabled === "boolean") {
    return {
      draggable: localDisabled,
      // Backwards compatibility
      droppable: false
    };
  }
  return {
    draggable: (_localDisabled$dragga = localDisabled == null ? void 0 : localDisabled.draggable) != null ? _localDisabled$dragga : globalDisabled.draggable,
    droppable: (_localDisabled$droppa = localDisabled == null ? void 0 : localDisabled.droppable) != null ? _localDisabled$droppa : globalDisabled.droppable
  };
}
function hasSortableData(entry) {
  if (!entry) {
    return false;
  }
  const data = entry.data.current;
  if (data && "sortable" in data && typeof data.sortable === "object" && "containerId" in data.sortable && "items" in data.sortable && "index" in data.sortable) {
    return true;
  }
  return false;
}
const directions = [KeyboardCode.Down, KeyboardCode.Right, KeyboardCode.Up, KeyboardCode.Left];
const sortableKeyboardCoordinates = (event, _ref) => {
  let {
    context: {
      active,
      collisionRect,
      droppableRects,
      droppableContainers,
      over,
      scrollableAncestors
    }
  } = _ref;
  if (directions.includes(event.code)) {
    event.preventDefault();
    if (!active || !collisionRect) {
      return;
    }
    const filteredContainers = [];
    droppableContainers.getEnabled().forEach((entry) => {
      if (!entry || entry != null && entry.disabled) {
        return;
      }
      const rect = droppableRects.get(entry.id);
      if (!rect) {
        return;
      }
      switch (event.code) {
        case KeyboardCode.Down:
          if (collisionRect.top < rect.top) {
            filteredContainers.push(entry);
          }
          break;
        case KeyboardCode.Up:
          if (collisionRect.top > rect.top) {
            filteredContainers.push(entry);
          }
          break;
        case KeyboardCode.Left:
          if (collisionRect.left > rect.left) {
            filteredContainers.push(entry);
          }
          break;
        case KeyboardCode.Right:
          if (collisionRect.left < rect.left) {
            filteredContainers.push(entry);
          }
          break;
      }
    });
    const collisions = closestCorners({
      collisionRect,
      droppableRects,
      droppableContainers: filteredContainers
    });
    let closestId = getFirstCollision(collisions, "id");
    if (closestId === (over == null ? void 0 : over.id) && collisions.length > 1) {
      closestId = collisions[1].id;
    }
    if (closestId != null) {
      const activeDroppable = droppableContainers.get(active.id);
      const newDroppable = droppableContainers.get(closestId);
      const newRect = newDroppable ? droppableRects.get(newDroppable.id) : null;
      const newNode = newDroppable == null ? void 0 : newDroppable.node.current;
      if (newNode && newRect && activeDroppable && newDroppable) {
        const newScrollAncestors = getScrollableAncestors(newNode);
        const hasDifferentScrollAncestors = newScrollAncestors.some((element, index) => scrollableAncestors[index] !== element);
        const hasSameContainer = isSameContainer(activeDroppable, newDroppable);
        const isAfterActive = isAfter(activeDroppable, newDroppable);
        const offset = hasDifferentScrollAncestors || !hasSameContainer ? {
          x: 0,
          y: 0
        } : {
          x: isAfterActive ? collisionRect.width - newRect.width : 0,
          y: isAfterActive ? collisionRect.height - newRect.height : 0
        };
        const rectCoordinates = {
          x: newRect.left,
          y: newRect.top
        };
        const newCoordinates = offset.x && offset.y ? rectCoordinates : subtract(rectCoordinates, offset);
        return newCoordinates;
      }
    }
  }
  return void 0;
};
function isSameContainer(a, b) {
  if (!hasSortableData(a) || !hasSortableData(b)) {
    return false;
  }
  return a.data.current.sortable.containerId === b.data.current.sortable.containerId;
}
function isAfter(a, b) {
  if (!hasSortableData(a) || !hasSortableData(b)) {
    return false;
  }
  if (!isSameContainer(a, b)) {
    return false;
  }
  return a.data.current.sortable.index < b.data.current.sortable.index;
}
function TemplateModal({ onClose }) {
  const dispatch = useDispatch();
  const templates = useSelector(selectTemplates);
  const [editingId, setEditingId] = reactExports.useState(null);
  const [editTitle, setEditTitle] = reactExports.useState("");
  const [editKeywords, setEditKeywords] = reactExports.useState("");
  const [editText, setEditText] = reactExports.useState("");
  const [isAdding, setIsAdding] = reactExports.useState(false);
  const [newTitle, setNewTitle] = reactExports.useState("");
  const [newKeywords, setNewKeywords] = reactExports.useState("");
  const [newText, setNewText] = reactExports.useState("");
  const handleEdit = (template) => {
    setEditingId(template.id);
    setEditTitle(template.title || "");
    setEditKeywords(template.keywords || "");
    setEditText(template.text || "");
  };
  const handleSaveEdit = () => {
    if (editingId) {
      dispatch(updateTemplate({
        id: editingId,
        title: editTitle.trim(),
        keywords: editKeywords.trim(),
        text: editText.trim()
      }));
      logger.success("Template updated successfully", "content", true);
      setEditingId(null);
      setEditTitle("");
      setEditKeywords("");
      setEditText("");
    }
  };
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditKeywords("");
    setEditText("");
  };
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this template?")) {
      dispatch(deleteTemplate(id));
      logger.success("Template deleted successfully", "content", true);
    }
  };
  const handleAdd = () => {
    if (newTitle.trim() && newText.trim()) {
      dispatch(addTemplate({
        title: newTitle.trim(),
        keywords: newKeywords.trim(),
        text: newText.trim()
      }));
      logger.success("Template added successfully", "content", true);
      setNewTitle("");
      setNewKeywords("");
      setNewText("");
      setIsAdding(false);
    }
  };
  const handleCancelAdd = () => {
    setIsAdding(false);
    setNewTitle("");
    setNewKeywords("");
    setNewText("");
  };
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = templates.findIndex((t) => t.id === active.id);
      const newIndex = templates.findIndex((t) => t.id === over.id);
      dispatch(reorderTemplates({
        sourceIndex: oldIndex,
        destinationIndex: newIndex
      }));
      logger.success("Templates reordered successfully", "content", true);
    }
  };
  const SortableItem = ({ template, index }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging
    } = useSortable({
      id: template.id,
      disabled: editingId === template.id
    });
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref: setNodeRef,
        style,
        className: `p-3 border rounded-lg bg-dark-bg transition-all ${isDragging ? "border-blue-500" : "border-dark-border hover:border-gray-500"}`,
        children: editingId === template.id ? (
          // Edit Mode
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold mb-1 text-white", children: "Title" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  value: editTitle,
                  onChange: (e) => setEditTitle(e.target.value),
                  className: "w-full px-3 py-2 border border-dark-border rounded-md text-sm bg-dark-card text-white focus:outline-none focus:border-blue-500 focus:bg-dark-border transition-all",
                  autoFocus: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold mb-1 text-white", children: "Keywords" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                TagInput,
                {
                  value: editKeywords,
                  onChange: (value) => setEditKeywords(value),
                  placeholder: "Add keywords (comma-separated or press Enter)",
                  className: "w-full"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold mb-1 text-white", children: "Template Text" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "textarea",
                {
                  value: editText,
                  onChange: (e) => setEditText(e.target.value),
                  rows: "4",
                  className: "w-full px-3 py-2 border border-dark-border rounded-md text-sm bg-dark-card text-white focus:outline-none focus:border-blue-500 focus:bg-dark-border transition-all resize-y"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: handleSaveEdit,
                  disabled: !editTitle.trim() || !editText.trim(),
                  className: "flex-1 px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-semibold",
                  children: "Save"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: handleCancelEdit,
                  className: "flex-1 px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm font-semibold",
                  children: "Cancel"
                }
              )
            ] })
          ] })
        ) : (
          // View Mode
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                ...attributes,
                ...listeners,
                className: "flex-shrink-0 pt-1 cursor-grab active:cursor-grabbing text-gray-500 hover:text-blue-400 transition-colors select-none",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-grip-vertical text-lg" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-white mb-2", children: template.title || "Untitled Template" }),
                template.keywords && (() => {
                  const keywordsList = template.keywords.split(",").filter((k) => k.trim());
                  const displayKeywords = keywordsList.slice(0, 5);
                  const hasMore = keywordsList.length > 5;
                  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-2 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1", children: [
                    displayKeywords.map((keyword, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 bg-dark-card border border-dark-border text-white text-xs font-medium rounded", children: keyword.trim() }, idx)),
                    hasMore && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 text-gray-400 text-xs font-medium", children: "..." })
                  ] }) });
                })()
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white whitespace-pre-wrap break-words line-clamp-3", children: template.text })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-shrink-0 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => handleEdit(template),
                  className: "p-2 text-blue-400 hover:bg-dark-border rounded transition-colors",
                  title: "Edit",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-edit" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => handleDelete(template.id),
                  className: "p-2 text-red-400 hover:bg-dark-border rounded transition-colors",
                  title: "Delete",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-trash-alt" })
                }
              )
            ] })
          ] })
        )
      }
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50", style: { fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-dark-card border border-dark-border rounded-lg shadow-xl w-[700px] min-h-[600px] max-h-[80vh] flex flex-col overflow-hidden", style: { fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-2.5 border-b border-dark-border cursor-move bg-dark-bg flex-shrink-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-semibold text-white flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-file-alt text-gray-400" }),
        "Templates"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "text-white hover:text-gray-300 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-times text-xl" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "p-4 overflow-y-auto bg-dark-card flex-1 min-h-0 template-modal-scroll",
        style: {
          scrollbarWidth: "none",
          maxHeight: "calc(80vh - 60px)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
            .template-modal-scroll::-webkit-scrollbar {
              display: none;
            }
            .template-modal-scroll {
              -ms-overflow-style: none;
            }
          ` }),
          !isAdding && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => setIsAdding(true),
              className: "w-full mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 text-sm font-semibold",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-plus" }),
                "Add New Template"
              ]
            }
          ),
          isAdding && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 p-3 border border-blue-500 rounded-lg bg-dark-bg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold mb-1 text-white", children: "Title" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  value: newTitle,
                  onChange: (e) => setNewTitle(e.target.value),
                  placeholder: "Enter template title",
                  className: "w-full px-3 py-2 border border-dark-border rounded-md text-sm bg-dark-card text-white focus:outline-none focus:border-blue-500 focus:bg-dark-border transition-all",
                  autoFocus: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold mb-1 text-white", children: "Keywords" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                TagInput,
                {
                  value: newKeywords,
                  onChange: (value) => setNewKeywords(value),
                  placeholder: "Add keywords (comma-separated or press Enter)",
                  className: "w-full"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold mb-1 text-white", children: "Template Text" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "textarea",
                {
                  value: newText,
                  onChange: (e) => setNewText(e.target.value),
                  placeholder: "Enter template text",
                  rows: "4",
                  className: "w-full px-3 py-2 border border-dark-border rounded-md text-sm bg-dark-card text-white focus:outline-none focus:border-blue-500 focus:bg-dark-border transition-all resize-y"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: handleAdd,
                  disabled: !newTitle.trim() || !newText.trim(),
                  className: "flex-1 px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-semibold",
                  children: "Save"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: handleCancelAdd,
                  className: "flex-1 px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm font-semibold",
                  children: "Cancel"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            DndContext,
            {
              sensors,
              collisionDetection: closestCenter,
              onDragEnd: handleDragEnd,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                SortableContext,
                {
                  items: templates.map((t) => t.id),
                  strategy: verticalListSortingStrategy,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: templates.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8 text-gray-400", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-file-alt text-4xl mb-3" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No templates yet. Add your first template above." })
                  ] }) : templates.map((template, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(SortableItem, { template, index }, template.id)) })
                }
              )
            }
          )
        ]
      }
    )
  ] }) });
}
function AccountModal({ onClose }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const profile = useSelector((state) => state.auth.profile);
  useSelector((state) => state.auth.isAuthenticated);
  const botStatus = useSelector((state) => {
    var _a;
    return ((_a = state.bidding) == null ? void 0 : _a.status) || SCRIPT_STATUS.STOPPED;
  });
  const [billingCycle, setBillingCycle] = reactExports.useState("monthly");
  const handleLogout = async () => {
    if (!confirm("Are you sure you want to logout?")) {
      return;
    }
    try {
      if (botStatus === SCRIPT_STATUS.RUNNING || botStatus === "Running") {
        try {
          await dispatch(stopBot()).unwrap();
          logger.log("Bot stopped before logout", "content", true);
        } catch (stopError) {
          logger.log("Bot stop skipped (already stopped or error)", "content", true);
        }
      }
      await dispatch(signOut()).unwrap();
      dispatch(clearProfileCache());
      await persistor.flush();
      logger.success("Logged out successfully", "content", true);
      onClose();
      window.location.reload();
    } catch (error) {
      const errorMessage = (error == null ? void 0 : error.message) || (error == null ? void 0 : error.toString()) || "Unknown error";
      logger.error(`Logout error: ${errorMessage}`, "content", true);
      alert(`Logout failed: ${errorMessage}`);
    }
  };
  const handleSubscribe = (plan) => {
    logger.log(`Subscribe to ${plan} plan (${billingCycle})`, "content", true);
    alert(`Subscription to ${plan} (${billingCycle}) will be implemented soon!`);
  };
  const userEmail = (user == null ? void 0 : user.email) || "N/A";
  const userId = (user == null ? void 0 : user.id) || "N/A";
  const createdAt = (user == null ? void 0 : user.created_at) ? new Date(user.created_at).toLocaleDateString() : "N/A";
  const membership = (profile == null ? void 0 : profile.membership) || "basic";
  const getMembershipBadge = (membershipType) => {
    switch (membershipType) {
      case "premium":
        return "bg-gradient-to-r from-purple-500 to-pink-500 text-white";
      case "ultra":
        return "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white";
      default:
        return "bg-gray-600 text-white";
    }
  };
  const pricing = {
    premium: {
      monthly: 4.99,
      annual: 41.87
      // 4.99 * 12 * 0.7 (30% discount)
    },
    ultra: {
      monthly: 9.99,
      annual: 83.92
      // 9.99 * 12 * 0.7 (30% discount)
    }
  };
  const features = {
    premium: [
      { icon: "fa-robot", text: "Custom AI Bid Generation" },
      { icon: "fa-paper-plane", text: "Telegram Support" },
      { icon: "fa-comments", text: "Chatbot: 1 bot" },
      { icon: "fa-chart-line", text: "Daily Limit: 20" }
    ],
    ultra: [
      { icon: "fa-robot", text: "Custom AI Bid Generation (Customizable)" },
      { icon: "fa-paper-plane", text: "Telegram Support" },
      { icon: "fa-comments", text: "Chatbot: No limit" },
      { icon: "fa-infinity", text: "Daily Limit: Unlimited" }
    ]
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50", style: { fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-dark-card border border-dark-border rounded-lg shadow-xl w-[700px] max-h-[90vh] flex flex-col overflow-hidden", style: { fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-dark-border cursor-move bg-dark-bg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-semibold text-white flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-user-circle text-blue-400" }),
        "Account"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "text-white hover:text-gray-300 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-times text-xl" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 overflow-y-auto bg-dark-card scrollbar-hide", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-sm font-semibold text-white mb-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-info-circle text-blue-400" }),
          "Account Information"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-dark-bg border border-dark-border rounded-lg p-3 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-400", children: "Email:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-white font-medium", children: userEmail })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-400", children: "User ID:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-white font-mono", children: userId })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-400", children: "Account Created:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-white", children: createdAt })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-2 border-t border-dark-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-400", children: "Membership:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs font-semibold px-2 py-1 rounded ${getMembershipBadge(membership)}`, children: membership.toUpperCase() })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-sm font-semibold text-white flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-credit-card text-green-400" }),
            "Subscribe for Membership"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-dark-bg border border-dark-border rounded-lg p-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setBillingCycle("monthly"),
                className: `px-3 py-1 text-xs font-semibold rounded transition-colors ${billingCycle === "monthly" ? "bg-blue-500 text-white" : "text-gray-400 hover:text-white"}`,
                children: "Monthly"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => setBillingCycle("annual"),
                className: `px-3 py-1 text-xs font-semibold rounded transition-colors ${billingCycle === "annual" ? "bg-blue-500 text-white" : "text-gray-400 hover:text-white"}`,
                children: [
                  "Annual",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-[10px] bg-green-500 text-white px-1 rounded", children: "-30%" })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-dark-bg border-2 border-purple-500 rounded-lg p-4 relative overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-20 h-20 bg-purple-500 opacity-10 rounded-full -mr-10 -mt-10" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-star text-purple-400 text-xl" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "text-base font-bold text-white", children: "Premium" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-1 justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-2xl font-bold text-white", children: [
                    "$",
                    pricing.premium[billingCycle]
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-gray-400", children: [
                    "/",
                    billingCycle === "monthly" ? "mo" : "yr"
                  ] })
                ] }),
                billingCycle === "annual" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-green-400", children: [
                  "Save $",
                  (pricing.premium.monthly * 12 - pricing.premium.annual).toFixed(2),
                  "/year"
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 mb-4", children: features.premium.map((feature, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2 text-xs text-gray-300", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: `fas ${feature.icon} text-purple-400` }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: feature.text })
              ] }, index)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => handleSubscribe("premium"),
                  disabled: membership === "premium" || membership === "ultra",
                  className: `w-full py-2 px-4 rounded-md text-sm font-semibold transition-colors ${membership === "premium" || membership === "ultra" ? "bg-gray-600 text-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"}`,
                  children: membership === "premium" || membership === "ultra" ? "Current Plan" : "Subscribe"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-dark-bg border-2 border-yellow-500 rounded-lg p-4 relative overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-20 h-20 bg-yellow-500 opacity-10 rounded-full -mr-10 -mt-10" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 right-2 bg-yellow-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-full", children: "BEST" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-crown text-yellow-400 text-xl" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "text-base font-bold text-white", children: "Ultra" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-1 justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-2xl font-bold text-white", children: [
                    "$",
                    pricing.ultra[billingCycle]
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-gray-400", children: [
                    "/",
                    billingCycle === "monthly" ? "mo" : "yr"
                  ] })
                ] }),
                billingCycle === "annual" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-green-400", children: [
                  "Save $",
                  (pricing.ultra.monthly * 12 - pricing.ultra.annual).toFixed(2),
                  "/year"
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 mb-4", children: features.ultra.map((feature, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2 text-xs text-gray-300", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: `fas ${feature.icon} text-yellow-400` }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: feature.text })
              ] }, index)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => handleSubscribe("ultra"),
                  disabled: membership === "ultra",
                  className: `w-full py-2 px-4 rounded-md text-sm font-semibold transition-colors ${membership === "ultra" ? "bg-gray-600 text-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white hover:from-yellow-500 hover:via-orange-600 hover:to-red-600"}`,
                  children: membership === "ultra" ? "Current Plan" : "Subscribe"
                }
              )
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-dark-border pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: async () => {
              if (!confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
                return;
              }
              if (!confirm("This will permanently delete your account and all associated data. Are you absolutely sure?")) {
                return;
              }
              try {
                if (botStatus === SCRIPT_STATUS.RUNNING || botStatus === "Running") {
                  try {
                    await dispatch(stopBot()).unwrap();
                    logger.log("Bot stopped before account deletion", "content", true);
                  } catch (stopError) {
                    logger.log("Bot stop skipped (already stopped or error)", "content", true);
                  }
                }
                logger.log(`User object: ${JSON.stringify(user)}`, "content", true);
                if (!user) {
                  throw new Error("User not found in Redux store. Please try logging out and logging back in.");
                }
                if (!user.id) {
                  throw new Error("User ID not found. Please try logging out and logging back in.");
                }
                logger.log(`Deleting account for user ID: ${user.id}`, "content", true);
                await supabaseService.deleteAccount(user.id);
                dispatch(clearLogs());
                logger.success("Account deleted successfully", "content", true);
                await dispatch(signOut()).unwrap();
                onClose();
                window.location.reload();
              } catch (error) {
                const errorMessage = (error == null ? void 0 : error.message) || (error == null ? void 0 : error.toString()) || "Unknown error";
                logger.error(`Delete account error: ${errorMessage}`, "content", true);
                alert(`Failed to delete account: ${errorMessage}`);
              }
            },
            className: "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-md border border-red-600 bg-red-600 text-white hover:bg-red-700 hover:border-red-700 transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-trash-alt" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Delete Account" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: handleLogout,
            className: "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-md border border-red-500 bg-red-500 text-white hover:bg-red-600 hover:border-red-600 transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-right-from-bracket" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Logout" })
            ]
          }
        )
      ] }) })
    ] })
  ] }) });
}
function AuthModal({ onClose, onLoginSuccess }) {
  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = reactExports.useState(false);
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [confirmPassword, setConfirmPassword] = reactExports.useState("");
  const [error, setError] = reactExports.useState("");
  const [success, setSuccess] = reactExports.useState("");
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = reactExports.useState(false);
  const getFreelancerAuth = () => {
    try {
      if (typeof document === "undefined" || !document.cookie) {
        return { userId: null, authToken: null };
      }
      const userIdMatch = document.cookie.match(/GETAFREE_USER_ID=(\d+)/);
      const userId = userIdMatch ? userIdMatch[1] : null;
      const authHashMatch = document.cookie.match(/GETAFREE_AUTH_HASH_V2=(\S+?)(?:;|$)/);
      const authHash = authHashMatch ? authHashMatch[1].replace(/;/g, "") : null;
      if (!userId || !authHash) {
        return { userId: null, authToken: null };
      }
      return {
        userId,
        authToken: `${userId};${authHash}`
      };
    } catch (error2) {
      logger.error(`Error getting Freelancer auth: ${error2.message}`, "content");
      return { userId: null, authToken: null };
    }
  };
  const handleSubmit = async (e) => {
    var _a;
    e == null ? void 0 : e.preventDefault();
    setError("");
    setSuccess("");
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }
    if (isSignup) {
      if (password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
    }
    setIsLoading(true);
    try {
      const { userId, authToken } = getFreelancerAuth();
      let result;
      if (isSignup) {
        result = await dispatch(signUpWithEdge({
          email,
          password,
          freelancerUserId: userId,
          freelancerAuthToken: authToken
        })).unwrap();
      } else {
        result = await dispatch(signInWithEdge({
          email,
          password,
          freelancerUserId: userId,
          freelancerAuthToken: authToken
        })).unwrap();
      }
      if (result.user && result.session) {
        setSuccess(isSignup ? "Account created and logged in successfully!" : "Login successful!");
        logger.success(isSignup ? "Account created and logged in" : "Logged in successfully", "content", true);
        setTimeout(() => {
          if (onLoginSuccess) {
            onLoginSuccess();
          }
          onClose();
        }, 1e3);
      } else if (isSignup && result.user && !result.session) {
        setSuccess("Account created! Please check your email to confirm your account.");
        setTimeout(() => {
          setIsSignup(false);
        }, 2e3);
      }
    } catch (error2) {
      const errorMessage = (error2 == null ? void 0 : error2.message) || ((_a = error2 == null ? void 0 : error2.payload) == null ? void 0 : _a.message) || (typeof error2 === "string" ? error2 : isSignup ? "Signup failed. Please try again." : "Login failed. Please check your credentials.");
      setError(errorMessage);
      logger.error(`${isSignup ? "Signup" : "Login"} error: ${errorMessage}`, "content", true);
    } finally {
      setIsLoading(false);
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };
  const handleGoogleSignIn = async (e) => {
    e == null ? void 0 : e.preventDefault();
    e == null ? void 0 : e.stopPropagation();
    setError("");
    setSuccess("");
    setIsGoogleLoading(true);
    try {
      const { userId, authToken } = getFreelancerAuth();
      chrome.runtime.sendMessage(
        {
          action: "googleSignIn",
          freelancerUserId: userId,
          freelancerAuthToken: authToken
        },
        async (response) => {
          var _a;
          if (chrome.runtime.lastError) {
            setError(chrome.runtime.lastError.message || "Google sign-in failed");
            setIsGoogleLoading(false);
            return;
          }
          if (response.error) {
            setError(response.error);
            logger.error(`Google sign-in error: ${response.error}`, "content", true);
            setIsGoogleLoading(false);
            return;
          }
          if (response.sessionToken) {
            try {
              let result;
              if (isSignup) {
                result = await dispatch(signUpWithEdge({
                  email: response.email || "",
                  password: null,
                  // Not needed for OAuth
                  freelancerUserId: userId,
                  freelancerAuthToken: authToken,
                  googleSessionToken: response.sessionToken,
                  googleRefreshToken: response.refreshToken,
                  googleExpiresAt: response.expiresAt
                })).unwrap();
              } else {
                result = await dispatch(signInWithEdge({
                  email: response.email || "",
                  password: null,
                  // Not needed for OAuth
                  freelancerUserId: userId,
                  freelancerAuthToken: authToken,
                  googleSessionToken: response.sessionToken,
                  googleRefreshToken: response.refreshToken,
                  googleExpiresAt: response.expiresAt
                })).unwrap();
              }
              if (result.user && result.session) {
                setSuccess(isSignup ? "Account created and logged in successfully!" : "Login successful!");
                logger.success(isSignup ? "Account created and logged in with Google successfully" : "Logged in with Google successfully", "content", true);
                setTimeout(() => {
                  if (onLoginSuccess) {
                    onLoginSuccess();
                  }
                  onClose();
                }, 1e3);
              } else if (isSignup && result.user && !result.session) {
                setSuccess("Account created! Please check your email to confirm your account.");
                setTimeout(() => {
                  setIsSignup(false);
                }, 2e3);
                setIsGoogleLoading(false);
              }
            } catch (error2) {
              const errorMessage = (error2 == null ? void 0 : error2.message) || ((_a = error2 == null ? void 0 : error2.payload) == null ? void 0 : _a.message) || (typeof error2 === "string" ? error2 : isSignup ? "Google sign-up failed" : "Google sign-in failed");
              setError(errorMessage);
              logger.error(`Google ${isSignup ? "sign-up" : "sign-in"} error: ${errorMessage}`, "content", true);
            } finally {
              setIsGoogleLoading(false);
            }
          } else {
            setError("No session token received");
            setIsGoogleLoading(false);
          }
        }
      );
    } catch (error2) {
      const errorMessage = error2.message || "Google sign-in failed";
      setError(errorMessage);
      logger.error(`Google sign-in error: ${errorMessage}`, "content", true);
      setIsGoogleLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50", style: { fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-dark-card border border-dark-border rounded-lg shadow-xl w-[450px] max-h-[80vh] flex flex-col overflow-hidden", style: { fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-dark-border cursor-move bg-dark-bg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-semibold text-white flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-user text-blue-400" }),
        isSignup ? "Sign Up" : "Login"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "text-white hover:text-gray-300 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-times text-xl" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5 overflow-y-auto bg-dark-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "space-y-4", onSubmit: handleSubmit, children: [
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-red-500 text-white p-3 rounded-md text-sm text-center break-words overflow-wrap-anywhere", children: error }),
      success && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-green-500 text-white p-3 rounded-md text-sm text-center break-words overflow-wrap-anywhere", children: success }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "email", className: "block text-sm font-semibold mb-1 text-white", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "email",
            id: "email",
            value: email,
            onChange: (e) => setEmail(e.target.value),
            onKeyPress: handleKeyPress,
            placeholder: "your@email.com",
            className: "w-full px-3 py-2 border border-dark-border rounded-md text-sm bg-dark-bg text-white focus:outline-none focus:border-blue-500 focus:bg-dark-card",
            disabled: isLoading,
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "password", className: "block text-sm font-semibold mb-1 text-white", children: "Password" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "password",
            id: "password",
            value: password,
            onChange: (e) => setPassword(e.target.value),
            onKeyPress: handleKeyPress,
            placeholder: isSignup ? "Your password (min 6 characters)" : "Your password",
            className: "w-full px-3 py-2 border border-dark-border rounded-md text-sm bg-dark-bg text-white focus:outline-none focus:border-blue-500 focus:bg-dark-card",
            disabled: isLoading,
            required: true
          }
        )
      ] }),
      isSignup && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "confirmPassword", className: "block text-sm font-semibold mb-1 text-white", children: "Confirm Password" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "password",
            id: "confirmPassword",
            value: confirmPassword,
            onChange: (e) => setConfirmPassword(e.target.value),
            onKeyPress: handleKeyPress,
            placeholder: "Confirm your password",
            className: "w-full px-3 py-2 border border-dark-border rounded-md text-sm bg-dark-bg text-white focus:outline-none focus:border-blue-500 focus:bg-dark-card",
            disabled: isLoading,
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "submit",
          disabled: isLoading || isGoogleLoading,
          className: "w-full py-2.5 bg-blue-500 text-white rounded-md text-sm font-bold hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed transition-colors",
          children: isLoading ? isSignup ? "Signing up..." : "Logging in..." : isSignup ? "Create Account" : "Login"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full border-t border-dark-border" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex justify-center text-xs uppercase", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-dark-card px-2 text-gray-400", children: "Or" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: handleGoogleSignIn,
          disabled: isLoading || isGoogleLoading,
          className: "w-full py-2.5 bg-white text-gray-700 rounded-md text-sm font-bold hover:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 border border-gray-300",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#4285F4", d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#34A853", d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#FBBC05", d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#EA4335", d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" })
            ] }),
            isGoogleLoading ? isSignup ? "Signing up..." : "Signing in..." : isSignup ? "Sign up with Google" : "Sign in with Google"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => {
            setIsSignup(!isSignup);
            setError("");
            setSuccess("");
            setPassword("");
            setConfirmPassword("");
          },
          disabled: isLoading || isGoogleLoading,
          className: "w-full py-2.5 bg-gray-600 text-white rounded-md text-sm font-bold hover:bg-gray-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors",
          children: isSignup ? "Back to Login" : "Sign Up"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-gray-400 mt-4", children: isSignup ? "Already have an account? Click Back to Login" : "Don't have an account? Click Sign Up" })
    ] }) })
  ] }) });
}
function ChatModal({ onClose }) {
  useDispatch();
  const threads = useSelector(selectAllThreads);
  const loading = useSelector(selectChatLoading);
  const error = useSelector(selectChatError);
  const [selectedThreadId, setSelectedThreadId] = reactExports.useState(null);
  const [expandedThreadId, setExpandedThreadId] = reactExports.useState(null);
  reactExports.useEffect(() => {
    logger.log("ChatModal mounted", "content");
    logger.log(`Found ${threads.length} chat threads`, "content");
  }, [threads.length]);
  const handleThreadClick = (threadId) => {
    if (expandedThreadId === threadId) {
      setExpandedThreadId(null);
    } else {
      setExpandedThreadId(threadId);
    }
  };
  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    try {
      const date = timestamp > 1e10 ? new Date(timestamp) : new Date(timestamp * 1e3);
      return date.toLocaleString();
    } catch (e) {
      return "Invalid date";
    }
  };
  const getLastMessage = (thread) => {
    if (!thread.chatHistory || thread.chatHistory.length === 0) {
      return "No messages yet";
    }
    const lastMessage = thread.chatHistory[thread.chatHistory.length - 1];
    return lastMessage.message || "No message text";
  };
  const getLastMessageTime = (thread) => {
    if (!thread.chatHistory || thread.chatHistory.length === 0) {
      return null;
    }
    const lastMessage = thread.chatHistory[thread.chatHistory.length - 1];
    return lastMessage.time_created || null;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50", style: { fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-dark-card border border-dark-border rounded-lg shadow-xl w-[600px] max-h-[80vh] flex flex-col overflow-hidden", style: { fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-2.5 border-b border-dark-border cursor-move bg-dark-bg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-semibold text-white flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-comments text-blue-400" }),
        "Chat Threads (",
        threads.length,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onClose,
          className: "text-white hover:text-gray-300 transition-colors",
          title: "Close",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-times text-xl" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 overflow-y-auto flex-1 bg-dark-card [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]", children: [
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-red-500 text-white p-2 rounded mb-4 text-sm text-center", children: error }),
      loading && threads.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8 text-white", children: "Loading threads..." }) : threads.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8 text-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-comments text-4xl mb-4 block text-gray-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white", children: "No chat threads yet." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-2 text-gray-400", children: "Start chatting on projects to see threads here." })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: threads.map((thread) => {
        var _a;
        const isExpanded = expandedThreadId === thread.threadId;
        const lastMessage = getLastMessage(thread);
        const lastMessageTime = getLastMessageTime(thread);
        const messageCount = ((_a = thread.chatHistory) == null ? void 0 : _a.length) || 0;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-dark-bg border border-dark-border rounded-lg mb-3 hover:border-blue-500 transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  onClick: () => handleThreadClick(thread.threadId),
                  className: "p-3 cursor-pointer",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-semibold truncate", children: thread.projectTitle || `Thread #${thread.threadId}` }),
                        messageCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-2 py-0.5 bg-blue-500 bg-opacity-20 text-blue-400 text-xs rounded", children: [
                          messageCount,
                          " ",
                          messageCount === 1 ? "message" : "messages"
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-sm truncate mb-1", children: lastMessage }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-xs text-gray-500", children: [
                        thread.projectId && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-project-diagram mr-1" }),
                          "Project: ",
                          thread.projectId
                        ] }),
                        thread.clientId && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-user mr-1" }),
                          "Client: ",
                          thread.clientId
                        ] }),
                        lastMessageTime && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-clock mr-1" }),
                          formatDate(lastMessageTime)
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-4 flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "i",
                      {
                        className: `fas fa-chevron-${isExpanded ? "up" : "down"} text-gray-400 transition-transform`
                      }
                    ) })
                  ] })
                }
              ),
              isExpanded && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-dark-border p-3 bg-dark-card", children: [
                thread.projectDescription && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-sm font-semibold text-white mb-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-info-circle text-blue-400 mr-2" }),
                    "Project Description"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-300 bg-dark-card p-3 rounded border border-dark-border max-h-32 overflow-y-auto", children: thread.projectDescription })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-sm font-semibold text-white mb-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-comments text-blue-400 mr-2" }),
                    "Chat History (",
                    messageCount,
                    ")"
                  ] }),
                  messageCount === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400 italic", children: "No messages in this thread yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 max-h-64 overflow-y-auto bg-dark-bg p-3 rounded border border-dark-border [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]", children: thread.chatHistory.map((message, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "text-sm p-2 rounded bg-dark-card border border-dark-border",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-blue-400 font-medium", children: [
                            "User ",
                            message.from_user
                          ] }),
                          message.time_created && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-400", children: formatDate(message.time_created) })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white", children: message.message || "No message text" })
                      ]
                    },
                    message.id || idx
                  )) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 pt-4 border-t border-dark-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 text-xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Thread ID:" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white ml-2", children: thread.threadId })
                  ] }),
                  thread.supabaseTableId && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "DB ID:" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-white ml-2 font-mono text-xs", children: [
                      thread.supabaseTableId.substring(0, 8),
                      "..."
                    ] })
                  ] })
                ] }) })
              ] })
            ]
          },
          thread.threadId
        );
      }) })
    ] })
  ] }) });
}
function BotPanelApp({ activePanel, onClose }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    activePanel === "profile" && /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileModal, { onClose }),
    activePanel === "project" && /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectModal, { onClose }),
    activePanel === "logs" && /* @__PURE__ */ jsxRuntimeExports.jsx(LogsModal, { onClose }),
    activePanel === "telegram" && /* @__PURE__ */ jsxRuntimeExports.jsx(TelegramModal, { onClose }),
    activePanel === "customai" && /* @__PURE__ */ jsxRuntimeExports.jsx(CustomAIModal, { onClose }),
    activePanel === "settings" && /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsModal, { onClose }),
    activePanel === "filters" && /* @__PURE__ */ jsxRuntimeExports.jsx(FiltersModal, { onClose }),
    activePanel === "template" && /* @__PURE__ */ jsxRuntimeExports.jsx(TemplateModal, { onClose }),
    activePanel === "account" && /* @__PURE__ */ jsxRuntimeExports.jsx(AccountModal, { onClose }),
    activePanel === "login" && /* @__PURE__ */ jsxRuntimeExports.jsx(AuthModal, { onClose }),
    activePanel === "auth" && /* @__PURE__ */ jsxRuntimeExports.jsx(AuthModal, { onClose }),
    activePanel === "chat" && /* @__PURE__ */ jsxRuntimeExports.jsx(ChatModal, { onClose })
  ] });
}
function mountBotPanel(containerId, activePanel, onClose) {
  const container = document.getElementById(containerId);
  if (container) {
    const root = createRoot(container);
    root.render(
      /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Provider_default, { store, children: /* @__PURE__ */ jsxRuntimeExports.jsx(PersistGate, { loading: null, persistor, children: /* @__PURE__ */ jsxRuntimeExports.jsx(BotPanelApp, { activePanel, onClose }) }) }) })
    );
    return root;
  }
  return null;
}
let currentModalRoot = null;
let currentPanel = null;
const MODAL_CONTAINER_ID = "bot-react-modal-container";
class ModalManager {
  constructor() {
    this.isInitialized = false;
  }
  /**
   * Initialize modal manager
   */
  async init() {
    if (this.isInitialized) {
      logger.log("Modal manager already initialized", "content");
      return;
    }
    logger.log("Initializing modal manager...", "content");
    if (!document.getElementById(MODAL_CONTAINER_ID)) {
      const container = document.createElement("div");
      container.id = MODAL_CONTAINER_ID;
      document.body.appendChild(container);
      logger.log("Modal container created", "content");
    } else {
      logger.log("Modal container already exists", "content");
    }
    this.isInitialized = true;
    logger.log("Modal manager initialized", "content");
  }
  /**
   * Show a panel/modal
   */
  async showPanel(panelName) {
    logger.log(`showPanel called with panelName: ${panelName}`, "content");
    if (!this.isInitialized) {
      await this.init();
    }
    this.hidePanel();
    const container = document.getElementById(MODAL_CONTAINER_ID);
    if (!container) {
      logger.error("Modal container not found", "content");
      return;
    }
    logger.log(`Mounting panel: ${panelName}`, "content");
    currentPanel = panelName;
    currentModalRoot = mountBotPanel(MODAL_CONTAINER_ID, panelName, () => {
      this.hidePanel();
    });
    if (!currentModalRoot) {
      logger.error("Failed to mount panel - mountBotPanel returned null", "content");
    } else {
      logger.log(`Panel ${panelName} mounted successfully`, "content");
    }
  }
  /**
   * Hide current panel
   */
  hidePanel() {
    if (currentModalRoot) {
      currentModalRoot.unmount();
      currentModalRoot = null;
    }
    currentPanel = null;
    const container = document.getElementById(MODAL_CONTAINER_ID);
    if (container) {
      container.innerHTML = "";
    }
  }
  /**
   * Check if a panel is currently shown
   */
  isPanelShown() {
    return currentPanel !== null;
  }
}
const modalManager = new ModalManager();
window.modalManager = modalManager;
let pollingInterval = null;
let isProcessingProjects = false;
function getProcessedProjects() {
  return new Set(store.getState().bidding.processedProjectIds || []);
}
function addProcessedProjectId(projectId) {
  store.dispatch(addProcessedProject(projectId));
}
function normalizeProjectData(project) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
  const normalized = { ...project };
  normalized.id = project.id || project.seo_url || Date.now();
  normalized.title = project.title || project.name || "Untitled Project";
  normalized.description = project.description || project.preview_description || project.description || "";
  if (!normalized.budget) {
    normalized.budget = {};
  }
  normalized.budget.minimum = ((_a = project.budget) == null ? void 0 : _a.minimum) || project.minimum_budget || normalized.budget.minimum || 0;
  normalized.budget.maximum = ((_b = project.budget) == null ? void 0 : _b.maximum) || project.maximum_budget || normalized.budget.maximum || 0;
  if (!normalized.currency) {
    normalized.currency = {};
  }
  normalized.currency.code = ((_c = project.currency) == null ? void 0 : _c.code) || project.currency_code || normalized.currency.code || "USD";
  normalized.hourly = project.type === "hourly" || project.hourly === true || normalized.hourly === true;
  if (!normalized.url) {
    normalized.url = `${API_ENDPOINTS.BASE_URL}/projects/${project.seo_url || project.id}`;
  }
  if (!normalized.bidStats) {
    normalized.bidStats = {};
  }
  normalized.bidStats.bidCount = ((_d = project.bid_stats) == null ? void 0 : _d.bid_count) || project.bid_count || normalized.bidStats.bidCount || 0;
  if (!normalized.owner) {
    normalized.owner = {};
  }
  normalized.owner.id = ((_e = project.owner) == null ? void 0 : _e.id) || project.owner_id || normalized.owner.id;
  normalized.owner.username = ((_f = project.owner) == null ? void 0 : _f.username) || normalized.owner.username;
  normalized.owner.country = ((_i = (_h = (_g = project.owner) == null ? void 0 : _g.location) == null ? void 0 : _h.country) == null ? void 0 : _i.name) || project.country || normalized.owner.country || "";
  normalized.owner_id = project.owner_id || ((_j = project.owner) == null ? void 0 : _j.id) || normalized.owner_id;
  normalized.jobs = project.jobs || normalized.jobs || [];
  return normalized;
}
async function processProject(project) {
  var _a;
  const biddingState = store.getState().bidding;
  if (biddingState.status !== SCRIPT_STATUS.RUNNING) {
    logger.log("Polling stopped, aborting project processing", "content");
    return;
  }
  const projectData = normalizeProjectData(project);
  logger.log(`Processing: ${projectData.title}`, "content", true);
  const currencyCode = ((_a = projectData.currency) == null ? void 0 : _a.code) || projectData.currency_code || "USD";
  const currencySymbol = utils.getCurrencySymbol(currencyCode);
  logger.log(`Budget: ${currencySymbol}${projectData.budget.minimum}-${currencySymbol}${projectData.budget.maximum} ${currencyCode}`, "content", true);
  const biddingState2 = store.getState().bidding;
  if (biddingState2.status !== SCRIPT_STATUS.RUNNING) {
    logger.log("Polling stopped during processing, aborting", "content");
    return;
  }
  const validation = await projectService.validateProject(projectData);
  if (!validation.valid) {
    logger.error(`${projectData.title} - ${validation.reason}`, "content", true);
    return;
  }
  logger.success(`Validated & ready to bid`, "content", true);
  const biddingState3 = store.getState().bidding;
  if (biddingState3.status !== SCRIPT_STATUS.RUNNING) {
    logger.log("Polling stopped before placing bid, aborting", "content");
    return;
  }
  let result;
  try {
    result = await projectService.placeBid({ project: projectData, proposal: validation.matchedProposal });
  } catch (error) {
    result = { success: false, message: error.message || "Failed to place bid" };
  }
  if (result.success) {
    const bidAmount = result.bidAmount || 0;
    store.dispatch(sendTelegramBidNotification({
      project: projectData,
      bidAmount,
      success: true
    }));
  } else {
    logger.error(`Bid failed: ${result.message}`, "content", true);
  }
}
async function fetchProjectsFromAPI() {
  const biddingState = store.getState().bidding;
  if (biddingState.status !== SCRIPT_STATUS.RUNNING) {
    logger.log("Polling is stopped, skipping API fetch", "content");
    return;
  }
  if (isProcessingProjects) {
    logger.log("Already processing projects, skipping this fetch", "content");
    return;
  }
  isProcessingProjects = true;
  try {
    const result = await apiService.fetchActiveProjects();
    if (!result.success) {
      logger.error(`API Error: ${result.error}`, "content");
      return;
    }
    const biddingState2 = store.getState().bidding;
    if (biddingState2.status !== SCRIPT_STATUS.RUNNING) {
      logger.log("Polling was stopped during API fetch, aborting", "content");
      return;
    }
    const projects = result.projects;
    logger.log(`Received ${projects.length} active projects from API`, "content");
    const processedProjects = getProcessedProjects();
    const newProjects = projects.filter((project) => !processedProjects.has(project.id));
    logger.log(`Found ${newProjects.length} new projects (${projects.length - newProjects.length} already processed)`, "content");
    if (newProjects.length === 0) {
      logger.log("No new projects - all have been processed", "content");
      return;
    }
    for (const project of newProjects) {
      const biddingState3 = store.getState().bidding;
      if (biddingState3.status !== SCRIPT_STATUS.RUNNING) {
        logger.log("Polling stopped, aborting project processing", "content");
        break;
      }
      addProcessedProjectId(project.id);
      await processProject(project);
    }
  } finally {
    isProcessingProjects = false;
  }
}
function startAPIPolling() {
  stopAPIPolling();
  const settings = store.getState().settings;
  const apiPullDelay = (settings.apiPullDelay || 20) * 1e3;
  fetchProjectsFromAPI();
  pollingInterval = setInterval(async () => {
    const biddingState = store.getState().bidding;
    if (biddingState.status === SCRIPT_STATUS.RUNNING) {
      fetchProjectsFromAPI();
    } else {
      logger.log("Polling stopped, stopping API polling", "content");
      stopAPIPolling();
    }
  }, apiPullDelay);
  logger.log(`API polling started (every ${apiPullDelay / 1e3} seconds)`, "content");
}
function stopAPIPolling() {
  if (pollingInterval) {
    clearInterval(pollingInterval);
    pollingInterval = null;
    logger.log("API polling stopped", "content");
  }
}
if (!document.querySelector('link[href*="font-awesome"]')) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css";
  link.integrity = "sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==";
  link.crossOrigin = "anonymous";
  link.referrerPolicy = "no-referrer";
  document.head.appendChild(link);
}
(async function() {
  var _a;
  let handleMessage = null;
  function getAuthToken() {
    try {
      if (typeof document === "undefined" || !document.cookie) {
        return null;
      }
      const userIdMatch = document.cookie.match(/GETAFREE_USER_ID=(\d+)/);
      const userId = userIdMatch ? userIdMatch[1] : null;
      const authHashMatch = document.cookie.match(/GETAFREE_AUTH_HASH_V2=(\S+?)(?:;|$)/);
      const authHash = authHashMatch ? authHashMatch[1].replace(/;/g, "") : null;
      if (!userId || !authHash) {
        return null;
      }
      return `${userId};${authHash}`;
    } catch (error) {
      logger.error(`Error getting auth token: ${error.message}`, "content");
      return null;
    }
  }
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "log") {
      const emoji = {
        "success": "✅",
        "error": "❌",
        "warn": "⚠️",
        "info": "ℹ️"
      }[request.type] || "ℹ️";
      const senderName = request.sender || "unknown";
      const prefix = `[FreelancerBot-${senderName}] ${emoji}`;
      const logMessage = `${prefix} ${request.message}`;
      const colors = {
        "success": "color: #10b981; font-weight: bold;",
        // green
        "error": "color: #ef4444; font-weight: bold;",
        // red
        "warn": "color: #f59e0b; font-weight: bold;",
        // orange/yellow
        "info": "color: #3b82f6; font-weight: normal;"
        // blue
      };
      const colorStyle = colors[request.type] || colors.info;
      console.log(`%c${logMessage}`, colorStyle);
      sendResponse({ success: true });
      return true;
    }
    if (request.action === "getAuthToken") {
      try {
        const authToken = getAuthToken();
        if (authToken) {
          logger.log("Auth token retrieved successfully", "content");
          sendResponse({ success: true, authToken });
        } else {
          logger.warn("Auth token not found", "content");
          sendResponse({ success: false, message: "Auth token not found. Please login to Freelancer.com first." });
        }
      } catch (error) {
        logger.error(`Error getting auth token: ${error.message}`, "content");
        sendResponse({ success: false, message: error.message });
      }
      return true;
    }
    if (!handleMessage) {
      logger.warn(`Message handler not ready yet`, "content");
      sendResponse({ success: false, message: "Content script is still initializing. Please wait a moment and try again." });
      return true;
    }
    handleMessage(request, sender, sendResponse);
    return true;
  });
  logger.log("Message listener set up", "content");
  logger.log("Starting initialization...", "content");
  await projectService.init();
  logger.log("Project service initialized", "content");
  await modalManager.init();
  logger.log("Modal manager initialized", "content");
  try {
    await utils.fetchCurrencies();
    logger.log("Currencies fetched and cached successfully", "content");
  } catch (error) {
    logger.warn(`Failed to fetch currencies on initialization: ${error.message}`, "content");
  }
  let previousBiddingState = store.getState().bidding;
  store.subscribe(() => {
    const currentBiddingState = store.getState().bidding;
    const updates = {};
    if (currentBiddingState.status !== previousBiddingState.status) {
      updates.scriptStatus = currentBiddingState.status;
    }
    if (currentBiddingState.sessionBidsCount !== previousBiddingState.sessionBidsCount) {
      updates.sessionBidsCount = currentBiddingState.sessionBidsCount;
    }
    if (Object.keys(updates).length > 0) {
      chrome.storage.local.set(updates, () => {
        if (chrome.runtime.lastError) {
          logger.error(`Error updating storage: ${chrome.runtime.lastError.message}`, "content");
        } else {
          logger.log(`Synced bidding state to storage: ${JSON.stringify(updates)}`, "content");
        }
      });
    }
    previousBiddingState = currentBiddingState;
  });
  logger.log("Bidding state storage sync initialized", "content");
  let tokenRefreshInterval = null;
  async function refreshAuthToken() {
    try {
      const state = store.getState();
      const authState = state.auth;
      const session = authState == null ? void 0 : authState.session;
      logger.log(`Session value: ${JSON.stringify(session)}`, "content");
      if (!session || !session.refresh_token) {
        logger.log("No session or refresh token available, skipping token refresh", "content");
        return;
      }
      logger.log("Refreshing authentication token...", "content");
      const result = await supabaseService.refreshToken(session.refresh_token);
      if (result.success && result.session && result.user) {
        await supabaseService.setSession(result.session);
        store.dispatch(setSession({
          access_token: result.session.access_token,
          refresh_token: result.session.refresh_token,
          expires_at: result.session.expires_at,
          expires_in: result.session.expires_in,
          user: result.user
        }));
        store.dispatch(setUser(result.user));
        logger.log("Token refreshed successfully", "content");
        logger.success("Authentication token refreshed successfully", "content");
      } else {
        const errorMsg = result.error || "Failed to refresh token";
        logger.error(`Token refresh failed: ${errorMsg}`, "content");
      }
    } catch (error) {
      logger.error(`Error refreshing token: ${error.message}`, "content");
    }
  }
  function startTokenRefresh() {
    if (tokenRefreshInterval) {
      clearInterval(tokenRefreshInterval);
    }
    refreshAuthToken();
    tokenRefreshInterval = setInterval(() => {
      refreshAuthToken();
    }, 30 * 60 * 1e3);
    logger.log("Token refresh interval started (every 30 minutes)", "content");
  }
  let unsubscribePersistor = null;
  unsubscribePersistor = persistor.subscribe(() => {
    var _a2;
    const persistorState = persistor.getState();
    if (persistorState.bootstrapped) {
      logger.log("Store rehydration complete", "content");
      const state = store.getState();
      const session = (_a2 = state.auth) == null ? void 0 : _a2.session;
      if (session && session.access_token) {
        supabaseService.setSession(session).catch((err) => {
          logger.error(`Failed to sync session to Supabase client: ${err.message}`, "content");
        });
      }
      if (unsubscribePersistor) {
        unsubscribePersistor();
        unsubscribePersistor = null;
      }
      startTokenRefresh();
    }
  });
  if (persistor.getState().bootstrapped) {
    const state = store.getState();
    const session = (_a = state.auth) == null ? void 0 : _a.session;
    if (session && session.access_token) {
      supabaseService.setSession(session).catch((err) => {
        logger.error(`Failed to sync session to Supabase client: ${err.message}`, "content");
      });
    }
    if (unsubscribePersistor) {
      unsubscribePersistor();
    }
    startTokenRefresh();
  }
  handleMessage = async function(request, sender, sendResponse) {
    try {
      logger.log(`Message received: ${JSON.stringify(request)}`, "content");
      if (request.action === "showPanel") {
        const tabName = request.tabName || "profile";
        try {
          if (!window.location.href.includes("freelancer.com")) {
            sendResponse({ success: false, message: "Please navigate to Freelancer.com first." });
            return;
          }
          if (!modalManager.isInitialized) {
            await modalManager.init();
          }
          await modalManager.showPanel(tabName);
          sendResponse({ success: true, message: `Panel ${tabName} shown successfully` });
        } catch (error) {
          logger.error(`Error showing panel: ${error.message}`, "content");
          sendResponse({ success: false, message: `Error showing panel: ${error.message}` });
        }
      } else if (request.action === "hidePanel") {
        try {
          modalManager.hidePanel();
          sendResponse({ success: true });
        } catch (error) {
          sendResponse({ success: false, message: error.message });
        }
      } else if (request.action === "startBot") {
        try {
          const result = await store.dispatch(startBot());
          if (startBot.fulfilled.match(result)) {
            startAPIPolling();
            logger.success("Bot started successfully", "content", true);
            sendResponse({ success: true, message: "Bot started successfully" });
          } else {
            const errorMsg = result.payload || "Failed to start bot";
            logger.error(`${errorMsg}`, "content", true);
            sendResponse({ success: false, message: errorMsg });
          }
        } catch (error) {
          logger.error(`Error starting bot: ${error.message}`, "content", true);
          sendResponse({ success: false, message: error.message || "Failed to start bot" });
        }
      } else if (request.action === "stopBot") {
        try {
          const result = await store.dispatch(stopBot());
          if (stopBot.fulfilled.match(result)) {
            stopAPIPolling();
            logger.success("Bot stopped successfully", "content", true);
            sendResponse({ success: true, message: "Bot stopped successfully" });
          } else {
            const errorMsg = result.payload || "Failed to stop bot";
            logger.error(`${errorMsg}`, "content", true);
            sendResponse({ success: false, message: errorMsg });
          }
        } catch (error) {
          logger.error(`Error stopping bot: ${error.message}`, "content", true);
          sendResponse({ success: false, message: error.message || "Failed to stop bot" });
        }
      } else {
        sendResponse({ success: false, message: `Unknown action: ${request.action}` });
      }
    } catch (error) {
      logger.error(`Error handling message: ${error.message}`, "content");
      sendResponse({ success: false, message: error.message });
    }
  };
})();
