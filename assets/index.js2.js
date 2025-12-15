import { l as logger, a7 as createClient, a8 as SUPABASE_CONFIG, V as supabaseService } from "./logger.js";
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  logger.log(`Message received: ${request.action}`, "background").catch(() => {
  });
  if (request.action === "googleSignIn") {
    handleGoogleSignIn(request.freelancerUserId, request.freelancerAuthToken).then((result) => {
      sendResponse(result);
    }).catch((error) => {
      sendResponse({ error: error.message || "Google sign-in failed" });
    });
    return true;
  }
  return true;
});
async function handleGoogleSignIn(freelancerUserId, freelancerAuthToken) {
  try {
    const redirectUrl = chrome.identity.getRedirectURL("auth.html");
    logger.log(`OAuth redirect URL: ${redirectUrl}`, "background");
    logger.log(`IMPORTANT: Add this URL to Supabase Dashboard → Authentication → URL Configuration → Redirect URLs`, "background");
    const supabase = createClient(SUPABASE_CONFIG.URL, SUPABASE_CONFIG.ANON_KEY, {
      auth: {
        flowType: "pkce",
        // Use PKCE flow to get refresh tokens
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    });
    logger.log("Requesting OAuth URL from Supabase (PKCE flow)...", "background");
    const { data, error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: redirectUrl,
        queryParams: {
          access_type: "offline",
          prompt: "consent"
        }
        // PKCE flow will automatically be used
      }
    });
    if (oauthError) {
      logger.error(`Supabase OAuth error: ${oauthError.message}`, "background");
      logger.error(`OAuth error details: ${JSON.stringify(oauthError)}`, "background");
      throw new Error(oauthError.message || "Google sign-in failed");
    }
    if (!data || !data.url) {
      logger.error("No OAuth URL received from Supabase", "background");
      logger.error(`OAuth data: ${JSON.stringify(data)}`, "background");
      throw new Error("No OAuth URL received from Supabase");
    }
    logger.log(`OAuth URL received from Supabase (length: ${data.url.length})`, "background");
    logger.log(`OAuth URL preview: ${data.url.substring(0, 150)}...`, "background");
    return new Promise((resolve, reject) => {
      logger.log("Launching Chrome identity OAuth flow...", "background");
      chrome.identity.launchWebAuthFlow(
        {
          url: data.url,
          interactive: true
        },
        async (callbackRedirectUrl) => {
          var _a;
          if (chrome.runtime.lastError) {
            const errorMsg = chrome.runtime.lastError.message || "Google sign-in cancelled";
            logger.error(`Chrome identity OAuth flow error: ${errorMsg}`, "background");
            logger.error(`Chrome runtime error: ${JSON.stringify(chrome.runtime.lastError)}`, "background");
            if (errorMsg.includes("Authorization page could not be loaded")) {
              reject(new Error(`Authorization page could not be loaded. Please ensure the redirect URL (${redirectUrl}) is added to Supabase Dashboard → Authentication → URL Configuration → Redirect URLs`));
            } else {
              reject(new Error(errorMsg));
            }
            return;
          }
          if (!callbackRedirectUrl) {
            logger.error("No redirect URL received from OAuth flow", "background");
            reject(new Error("No redirect URL received"));
            return;
          }
          try {
            logger.log(`OAuth callback received (length: ${callbackRedirectUrl.length})`, "background");
            logger.log(`Full OAuth callback URL: ${callbackRedirectUrl}`, "background");
            const url = new URL(callbackRedirectUrl);
            let accessToken = null;
            let refreshToken = null;
            let expiresAt = null;
            let userEmail = null;
            logger.log("PKCE flow: Looking for authorization code...", "background");
            let code = url.searchParams.get("code");
            if (!code && url.hash) {
              logger.log(`Checking hash fragment for code: ${url.hash.substring(0, 100)}...`, "background");
              const hash = url.hash.substring(1);
              const hashParams = new URLSearchParams(hash);
              code = hashParams.get("code");
            }
            if (code) {
              logger.log("Found authorization code, exchanging for session (PKCE flow)...", "background");
              const { data: sessionData, error: sessionError } = await supabase.auth.exchangeCodeForSession(code);
              if (sessionError || !sessionData.session) {
                logger.error(`Session exchange error: ${sessionError == null ? void 0 : sessionError.message}`, "background");
                logger.error(`Session error details: ${JSON.stringify(sessionError)}`, "background");
                throw new Error((sessionError == null ? void 0 : sessionError.message) || "Failed to get session");
              }
              accessToken = sessionData.session.access_token;
              refreshToken = sessionData.session.refresh_token;
              expiresAt = sessionData.session.expires_at;
              userEmail = (_a = sessionData.user) == null ? void 0 : _a.email;
              logger.log("Session obtained via PKCE code exchange", "background");
              logger.log(`Refresh token: ${refreshToken ? "found" : "not found"}`, "background");
            } else {
              logger.error(`No authorization code found in redirect URL (PKCE flow)`, "background");
              logger.error(`Full redirect URL: ${callbackRedirectUrl}`, "background");
              logger.error(`URL search: ${url.search}`, "background");
              logger.error(`URL hash: ${url.hash ? url.hash.substring(0, 200) + "..." : "none"}`, "background");
              throw new Error("No authorization code found in redirect URL (PKCE flow).");
            }
            if (!accessToken) {
              throw new Error("Failed to obtain access token from OAuth callback");
            }
            logger.log("OAuth flow completed successfully (PKCE)", "background");
            logger.log(`User email: ${userEmail || "not found"}`, "background");
            if (accessToken && refreshToken) {
              try {
                const session = {
                  access_token: accessToken,
                  refresh_token: refreshToken,
                  expires_at: expiresAt ? parseInt(expiresAt) : null
                };
                await supabaseService.setSession(session);
                logger.log("Session set on Supabase client", "background");
              } catch (error) {
                logger.warn(`Failed to set session on Supabase client: ${error.message}`, "background");
              }
            } else {
              logger.error("No refresh token available after PKCE flow - this should not happen", "background");
              throw new Error("PKCE flow failed to provide refresh token");
            }
            resolve({
              sessionToken: accessToken,
              refreshToken,
              expiresAt,
              email: userEmail
            });
          } catch (error) {
            logger.error(`Error processing OAuth callback: ${error.message}`, "background");
            logger.error(`Error stack: ${error.stack}`, "background");
            reject(error);
          }
        }
      );
    });
  } catch (error) {
    logger.error(`Google sign-in error: ${error.message}`, "background");
    logger.error(`Error stack: ${error.stack}`, "background");
    throw error;
  }
}
logger.log("Service worker loaded", "background");
if (typeof chrome !== "undefined" && chrome.runtime) {
  chrome.runtime.onInstalled.addListener((details) => {
    logger.log(`Extension installed/updated: ${details.reason}`, "background");
  });
  chrome.runtime.onStartup.addListener(() => {
    logger.log("Browser startup detected", "background");
  });
} else {
  logger.error("Chrome runtime not available!", "background");
}
