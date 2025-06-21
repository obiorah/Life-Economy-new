var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
};

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { jsxDEV } from "react/jsx-dev-runtime";
var ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsxDEV(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "app/entry.server.tsx",
          lineNumber: 51,
          columnNumber: 7
        },
        this
      ),
      {
        onAllReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsxDEV(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "app/entry.server.tsx",
          lineNumber: 101,
          columnNumber: 7
        },
        this
      ),
      {
        onShellReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  ErrorBoundary: () => ErrorBoundary,
  Layout: () => Layout,
  default: () => App,
  links: () => links,
  loader: () => loader
});
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
  isRouteErrorResponse
} from "@remix-run/react";
import { json, redirect as redirect2 } from "@remix-run/node";
import { useEffect as useEffect2 } from "react";

// app/components/Header.tsx
import { Link, Form, useLocation } from "@remix-run/react";

// app/store/store.ts
import { create } from "zustand";
var useStore = create((set) => ({
  currentUser: null,
  users: [],
  // Initialize with an empty array
  transactions: [],
  // Initialize with an empty array
  marketplaceItems: [],
  // Initialize marketplaceItems as an empty array
  purchaseRecords: [],
  // Initialize purchaseRecords as an empty array
  setCurrentUser: (user) => set({ currentUser: user }),
  setUsers: (users) => set({ users }),
  // Add setUsers setter
  addUser: (user) => set((state) => ({
    users: [...state.users, user]
  })),
  updateUserBalance: (userId, newBalance) => set((state) => ({
    users: state.users.map(
      (user) => user.id === userId ? { ...user, balance: newBalance } : user
    ),
    currentUser: state.currentUser?.id === userId ? { ...state.currentUser, balance: newBalance } : state.currentUser
  })),
  setTransactions: (transactions) => set({ transactions }),
  // Add setTransactions setter
  addTransaction: (transaction) => set((state) => ({
    transactions: [...state.transactions, transaction]
  })),
  setMarketplaceItems: (items) => set({ marketplaceItems: items }),
  // Add action to set marketplace items
  updateMarketplaceItem: (updatedItem) => set((state) => ({
    // Add action to update a single marketplace item
    marketplaceItems: state.marketplaceItems.map(
      (item) => item.id === updatedItem.id ? updatedItem : item
    )
  })),
  deleteMarketplaceItem: (itemId) => set((state) => ({
    // Add action to delete a marketplace item
    marketplaceItems: state.marketplaceItems.filter((item) => item.id !== itemId)
  })),
  setPurchaseRecords: (records) => set({ purchaseRecords: records }),
  // Add action to set purchase records
  addPurchaseRecord: (record) => set((state) => ({
    // Add action to add a purchase record
    purchaseRecords: [record, ...state.purchaseRecords]
    // Add new record to the beginning
  }))
}));

// app/components/Header.tsx
import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment, jsxDEV as jsxDEV2 } from "react/jsx-dev-runtime";
function Header({ user }) {
  let currentUser = useStore((state) => state.currentUser), zustandSetCurrentUser = useStore((state) => state.setCurrentUser), location = useLocation(), [mobileMenuOpen, setMobileMenuOpen] = useState(!1);
  useEffect(() => {
    user ? (!currentUser || currentUser.id !== user.id) && zustandSetCurrentUser({
      id: user.id,
      email: user.email || "",
      fullName: user.full_name || "User",
      balance: user.balance ?? 0,
      role: user.role || "User",
      createdAt: user.created_at ? new Date(user.created_at).toISOString().split("T")[0] : (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      status: "active",
      // Assuming active status from profile
      groupId: user.group_id || "group_placeholder_id",
      groupName: "Group Placeholder",
      // Not fetched in root loader, placeholder
      avatarUrl: void 0
      // Not fetched in root loader, placeholder
    }) : currentUser && zustandSetCurrentUser(null);
  }, [user, currentUser, zustandSetCurrentUser]);
  let navigation = [
    {
      name: "Dashboard",
      href: user?.role === "Admin" || user?.role === "Super Admin" ? "/admin" : "/dashboard",
      roles: ["User", "Admin", "Super Admin"]
    },
    { name: "Transfer", href: "/transfer", roles: ["User", "Admin", "Super Admin"] },
    { name: "Transactions", href: "/transactions", roles: ["User", "Admin", "Super Admin"] },
    { name: "Market", href: "/market", roles: ["User", "Admin", "Super Admin"] },
    { name: "Management", href: "/management", roles: ["Admin", "Super Admin"] },
    { name: "Admin", href: "/admin", roles: ["Super Admin"] },
    // Ensure this points to /admin
    { name: "Reports", href: "/reports", roles: ["Admin", "Super Admin"] },
    { name: "Settings", href: "/settings", roles: ["User", "Admin", "Super Admin"] }
  ], filteredNavigation = user ? navigation.filter((item) => item.roles.includes(user.role || "User")) : [];
  return /* @__PURE__ */ jsxDEV2("header", { className: "bg-white shadow-sm dark:bg-gray-900", children: [
    /* @__PURE__ */ jsxDEV2("nav", { className: "mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8", "aria-label": "Global", children: [
      /* @__PURE__ */ jsxDEV2("div", { className: "flex lg:flex-1", children: /* @__PURE__ */ jsxDEV2(Link, { to: "/", className: "-m-1.5 p-1.5", children: [
        /* @__PURE__ */ jsxDEV2("span", { className: "sr-only", children: "Life Economy" }, void 0, !1, {
          fileName: "app/components/Header.tsx",
          lineNumber: 71,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV2(
          "img",
          {
            className: "h-8 w-auto",
            src: "https://www.svgrepo.com/show/493600/economy-growth.svg",
            alt: "Life Economy Logo"
          },
          void 0,
          !1,
          {
            fileName: "app/components/Header.tsx",
            lineNumber: 72,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/components/Header.tsx",
        lineNumber: 70,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/components/Header.tsx",
        lineNumber: 69,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2("div", { className: "flex lg:hidden", children: [
        " ",
        /* @__PURE__ */ jsxDEV2(
          "button",
          {
            type: "button",
            className: "-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-300",
            onClick: () => setMobileMenuOpen(!0),
            children: [
              /* @__PURE__ */ jsxDEV2("span", { className: "sr-only", children: "Open main menu" }, void 0, !1, {
                fileName: "app/components/Header.tsx",
                lineNumber: 85,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV2(Bars3Icon, { className: "h-6 w-6", "aria-hidden": "true" }, void 0, !1, {
                fileName: "app/components/Header.tsx",
                lineNumber: 86,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/components/Header.tsx",
            lineNumber: 80,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/components/Header.tsx",
        lineNumber: 79,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2("div", { className: "hidden lg:flex lg:gap-x-12", children: [
        " ",
        user && filteredNavigation.map((item) => /* @__PURE__ */ jsxDEV2(
          Link,
          {
            to: item.href,
            className: `text-sm font-semibold leading-6 ${location.pathname.startsWith(item.href) ? "text-indigo-600 dark:text-indigo-400" : "text-gray-900 dark:text-white"} hover:text-indigo-600 dark:hover:text-indigo-400`,
            children: item.name
          },
          item.name,
          !1,
          {
            fileName: "app/components/Header.tsx",
            lineNumber: 91,
            columnNumber: 13
          },
          this
        ))
      ] }, void 0, !0, {
        fileName: "app/components/Header.tsx",
        lineNumber: 89,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2("div", { className: "hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-4", children: [
        " ",
        user ? /* @__PURE__ */ jsxDEV2(Fragment, { children: [
          /* @__PURE__ */ jsxDEV2("span", { className: "text-gray-900 dark:text-white text-sm font-medium", children: [
            "Welcome, ",
            user.full_name || user.email || "User",
            "!"
          ] }, void 0, !0, {
            fileName: "app/components/Header.tsx",
            lineNumber: 105,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV2(Form, { action: "/logout", method: "post", children: /* @__PURE__ */ jsxDEV2(
            "button",
            {
              type: "submit",
              className: "inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-offset-gray-900",
              children: "Sign Out"
            },
            void 0,
            !1,
            {
              fileName: "app/components/Header.tsx",
              lineNumber: 109,
              columnNumber: 17
            },
            this
          ) }, void 0, !1, {
            fileName: "app/components/Header.tsx",
            lineNumber: 108,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/Header.tsx",
          lineNumber: 104,
          columnNumber: 13
        }, this) : /* @__PURE__ */ jsxDEV2(
          Link,
          {
            to: "/login",
            className: "inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-offset-gray-900",
            children: "Sign In"
          },
          void 0,
          !1,
          {
            fileName: "app/components/Header.tsx",
            lineNumber: 118,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/components/Header.tsx",
        lineNumber: 102,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/Header.tsx",
      lineNumber: 68,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV2(Dialog, { as: "div", className: "lg:hidden", open: mobileMenuOpen, onClose: setMobileMenuOpen, children: [
      /* @__PURE__ */ jsxDEV2("div", { className: "fixed inset-0 z-10" }, void 0, !1, {
        fileName: "app/components/Header.tsx",
        lineNumber: 130,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Dialog.Panel, { className: "fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white dark:bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:sm:ring-gray-100/10", children: [
        /* @__PURE__ */ jsxDEV2("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxDEV2(Link, { to: "/", className: "-m-1.5 p-1.5", onClick: () => setMobileMenuOpen(!1), children: [
            /* @__PURE__ */ jsxDEV2("span", { className: "sr-only", children: "Life Economy" }, void 0, !1, {
              fileName: "app/components/Header.tsx",
              lineNumber: 134,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV2(
              "img",
              {
                className: "h-8 w-auto",
                src: "https://www.svgrepo.com/show/493600/economy-growth.svg",
                alt: "Life Economy Logo"
              },
              void 0,
              !1,
              {
                fileName: "app/components/Header.tsx",
                lineNumber: 135,
                columnNumber: 15
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "app/components/Header.tsx",
            lineNumber: 133,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV2(
            "button",
            {
              type: "button",
              className: "-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-300",
              onClick: () => setMobileMenuOpen(!1),
              children: [
                /* @__PURE__ */ jsxDEV2("span", { className: "sr-only", children: "Close menu" }, void 0, !1, {
                  fileName: "app/components/Header.tsx",
                  lineNumber: 146,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV2(XMarkIcon, { className: "h-6 w-6", "aria-hidden": "true" }, void 0, !1, {
                  fileName: "app/components/Header.tsx",
                  lineNumber: 147,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/components/Header.tsx",
              lineNumber: 141,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/components/Header.tsx",
          lineNumber: 132,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV2("div", { className: "mt-6 flow-root", children: /* @__PURE__ */ jsxDEV2("div", { className: "-my-6 divide-y divide-gray-500/10 dark:divide-gray-400/10", children: [
          /* @__PURE__ */ jsxDEV2("div", { className: "space-y-2 py-6", children: user && filteredNavigation.map((item) => /* @__PURE__ */ jsxDEV2(
            Link,
            {
              to: item.href,
              className: `-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${location.pathname.startsWith(item.href) ? "text-indigo-600 dark:text-indigo-400" : "text-gray-900 dark:text-white"} hover:bg-gray-50 dark:hover:bg-gray-800`,
              onClick: () => setMobileMenuOpen(!1),
              children: item.name
            },
            item.name,
            !1,
            {
              fileName: "app/components/Header.tsx",
              lineNumber: 154,
              columnNumber: 19
            },
            this
          )) }, void 0, !1, {
            fileName: "app/components/Header.tsx",
            lineNumber: 152,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV2("div", { className: "py-6", children: user ? /* @__PURE__ */ jsxDEV2(Fragment, { children: [
            /* @__PURE__ */ jsxDEV2("span", { className: "block -mx-3 rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 dark:text-white", children: [
              "Welcome, ",
              user.full_name || user.email || "User",
              "!"
            ] }, void 0, !0, {
              fileName: "app/components/Header.tsx",
              lineNumber: 169,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV2(Form, { action: "/logout", method: "post", children: /* @__PURE__ */ jsxDEV2(
              "button",
              {
                type: "submit",
                className: "mt-4 w-full inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-3 py-1.5 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-offset-gray-900",
                onClick: () => setMobileMenuOpen(!1),
                children: "Sign Out"
              },
              void 0,
              !1,
              {
                fileName: "app/components/Header.tsx",
                lineNumber: 173,
                columnNumber: 23
              },
              this
            ) }, void 0, !1, {
              fileName: "app/components/Header.tsx",
              lineNumber: 172,
              columnNumber: 21
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/Header.tsx",
            lineNumber: 168,
            columnNumber: 19
          }, this) : /* @__PURE__ */ jsxDEV2(
            Link,
            {
              to: "/login",
              className: "-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800",
              onClick: () => setMobileMenuOpen(!1),
              children: "Sign In"
            },
            void 0,
            !1,
            {
              fileName: "app/components/Header.tsx",
              lineNumber: 183,
              columnNumber: 19
            },
            this
          ) }, void 0, !1, {
            fileName: "app/components/Header.tsx",
            lineNumber: 166,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/Header.tsx",
          lineNumber: 151,
          columnNumber: 13
        }, this) }, void 0, !1, {
          fileName: "app/components/Header.tsx",
          lineNumber: 150,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/Header.tsx",
        lineNumber: 131,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/Header.tsx",
      lineNumber: 129,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/Header.tsx",
    lineNumber: 67,
    columnNumber: 5
  }, this);
}

// app/lib/auth.server.ts
import { createClient } from "@supabase/supabase-js";
import { redirect } from "@remix-run/node";

// app/lib/session.server.ts
import { createCookieSessionStorage } from "@remix-run/node";
var sessionSecret = process.env.SESSION_SECRET || "super-secret-dev-key", sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: !0,
    path: "/",
    sameSite: "lax",
    secrets: [sessionSecret],
    secure: !1,
    maxAge: 60 * 60 * 24 * 7
    // 1 week
  }
}), { getSession, commitSession, destroySession } = sessionStorage;

// app/lib/auth.server.ts
function getSupabaseWithSessionAndHeaders(request) {
  let supabaseUrl3 = process.env.SUPABASE_URL, supabaseAnonKey2 = process.env.SUPABASE_ANON_KEY;
  if (!supabaseUrl3 || !supabaseAnonKey2)
    throw new Error("Supabase URL and Anon Key must be provided in environment variables.");
  let supabase2 = createClient(supabaseUrl3, supabaseAnonKey2, {
    auth: {
      persistSession: !1,
      // Remix handles session persistence
      autoRefreshToken: !1,
      detectSessionInUrl: !1
    }
  });
  return supabase2.auth.onAuthStateChange(async (event, session) => {
    let existingSession = await getSession(request.headers.get("Cookie"));
    session ? existingSession.set("supabase:session", session) : existingSession.unset("supabase:session");
  }), { supabase: supabase2, headers: new Headers() };
}
async function signIn(request, { email, password }) {
  let { supabase: supabase2, headers } = getSupabaseWithSessionAndHeaders(request), { data, error } = await supabase2.auth.signInWithPassword({ email, password });
  if (error)
    return console.error("Supabase signIn error:", error), { error: error.message, headers };
  if (data.session) {
    let session = await getSession(request.headers.get("Cookie"));
    session.set("supabase:session", data.session), headers.append("Set-Cookie", await commitSession(session));
  }
  return { data, headers };
}
async function signOut(request) {
  let { supabase: supabase2, headers } = getSupabaseWithSessionAndHeaders(request), session = await getSession(request.headers.get("Cookie")), { error } = await supabase2.auth.signOut();
  return error && console.error("Supabase signOut error:", error), headers.append("Set-Cookie", await destroySession(session)), redirect("/login", { headers });
}
async function getAuthSession(request) {
  let supabaseSession = (await getSession(request.headers.get("Cookie"))).get("supabase:session");
  return supabaseSession || null;
}
async function getUserProfile(request) {
  let { supabase: supabase2, headers } = getSupabaseWithSessionAndHeaders(request), session = await getAuthSession(request);
  if (!session || !session.user)
    return { userProfile: null, headers };
  let { data: profileData, error: profileError } = await supabase2.from("profiles").select("id, email, full_name, balance, role, created_at, group_id").eq("id", session.user.id).single();
  if (profileError)
    throw console.error("Error fetching user profile:", profileError), headers.append("Set-Cookie", await destroySession(await getSession(request.headers.get("Cookie")))), redirect("/login", { headers });
  return { userProfile: profileData, headers };
}

// app/lib/supabase.ts
import { createClient as createClient2 } from "@supabase/supabase-js";
var serverSupabaseUrl = process.env.SUPABASE_URL, serverSupabaseAnonKey = process.env.SUPABASE_ANON_KEY, clientSupabaseUrl = typeof window < "u" && window.ENV ? window.ENV.SUPABASE_URL : void 0, clientSupabaseAnonKey = typeof window < "u" && window.ENV ? window.ENV.SUPABASE_ANON_KEY : void 0, supabaseUrl = typeof document > "u" ? serverSupabaseUrl : clientSupabaseUrl, supabaseAnonKey = typeof document > "u" ? serverSupabaseAnonKey : clientSupabaseAnonKey;
if (typeof document > "u") {
  if (!supabaseUrl || !supabaseAnonKey)
    throw new Error("[supabase.ts Server Init] Supabase URL and Anon Key must be provided in server environment variables.");
} else
  (!supabaseUrl || !supabaseAnonKey) && console.warn("[supabase.ts Client Init] Supabase URL/Key not immediately available. Ensure ENV is loaded via root loader script.");
(!supabaseUrl || !supabaseAnonKey) && console.error("[supabase.ts] CRITICAL: Attempting to initialize Supabase client with missing URL or Key. This should not happen on the server.");
var supabase = createClient2(supabaseUrl || "", supabaseAnonKey || "", {
  auth: {
    persistSession: !0,
    // Ensure session is persisted
    autoRefreshToken: !0,
    // Automatically refresh tokens
    detectSessionInUrl: !0
    // Detect session from URL (e.g., after magic link)
  }
});
function getBrowserEnvironment() {
  return typeof window < "u" ? (console.error("getBrowserEnvironment should only be called on the server!"), {}) : {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY
    // Add other client-safe environment variables here if needed
  };
}
typeof window < "u" && typeof window.ENV > "u" && (window.ENV = {});

// app/root.tsx
import { jsxDEV as jsxDEV3 } from "react/jsx-dev-runtime";
var links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous"
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
  }
];
async function loader({ request }) {
  console.log("--- [Server Loader - root] ROOT LOADER CALLED ---");
  let userProfile = null, sessionData = null, error = null, headers = new Headers(), pathname = new URL(request.url).pathname, isPublicPath = ["/login", "/signup", "/reset-password"].includes(pathname);
  try {
    let session2 = await getAuthSession(request);
    if (session2) {
      let { userProfile: fetchedProfile, headers: profileHeaders } = await getUserProfile(request);
      if (userProfile = fetchedProfile, profileHeaders.forEach((value, key) => headers.append(key, value)), sessionData = {
        access_token: session2.access_token,
        refresh_token: session2.refresh_token,
        expires_in: session2.expires_in,
        user: session2.user
        // Include the user object from the session if needed
      }, console.log("[Server Loader - root] Supabase session data extracted for client:", sessionData), !userProfile && !isPublicPath)
        throw console.log("[Server Loader - root] User profile not found for session and not a public path. Redirecting to /login."), redirect2("/login", { headers });
      userProfile && console.log("[Server Loader - root] UserProfile fetched:", userProfile.id);
    } else {
      if (!isPublicPath)
        throw console.log("[Server Loader - root] No Supabase session found and not a public path. Redirecting to /login."), redirect2("/login", { headers });
      console.log("[Server Loader - root] No Supabase session found. Current path is public or user is not logged in.");
    }
  } catch (err) {
    if (err instanceof Response && err.status === 302)
      throw err;
    console.error("[Server Loader - root] UNEXPECTED error caught during loader execution:", err), error = `Root loader failed: ${err.message || "An unknown error occurred"}`, userProfile = null;
  }
  let session = await getSession(request.headers.get("Cookie"));
  headers.append("Set-Cookie", await commitSession(session));
  let ENV = getBrowserEnvironment();
  return json({
    userProfile,
    session: sessionData,
    // Pass the session data to the client
    error,
    ENV
    // Pass environment variables to the client
  }, { headers });
}
function Layout({ children }) {
  let loaderData = useLoaderData(), { userProfile = null, error = null, ENV } = loaderData || {}, zustandSetCurrentUser = useStore((state) => state.setCurrentUser);
  return useEffect2(() => {
    ENV && (window.ENV = ENV);
    let currentStoreUser = useStore.getState().currentUser;
    if (userProfile) {
      let profileEmail = userProfile.email || "", profileFullName = userProfile.full_name || "User", profileBalance = userProfile.balance ?? 0, profileRole = userProfile.role || "User", profileCreatedAt = userProfile.created_at, profileGroupId = userProfile.group_id, profileGroupName = userProfile.group_name, profileAvatarUrl = userProfile.avatar_url;
      if (!currentStoreUser || currentStoreUser.id !== userProfile.id || currentStoreUser.email !== profileEmail || currentStoreUser.fullName !== profileFullName || currentStoreUser.balance !== profileBalance || currentStoreUser.role !== profileRole || profileCreatedAt && currentStoreUser.createdAt !== (profileCreatedAt ? new Date(profileCreatedAt).toISOString().split("T")[0] : void 0) || currentStoreUser.groupId !== profileGroupId || currentStoreUser.groupName !== (profileGroupName || currentStoreUser?.groupName || "Group Placeholder") || // Ensure comparison handles undefined profileGroupName
      currentStoreUser.avatarUrl !== (profileAvatarUrl || currentStoreUser?.avatarUrl || void 0)) {
        let userForStore = {
          id: userProfile.id,
          email: profileEmail,
          fullName: profileFullName,
          balance: profileBalance,
          role: profileRole,
          createdAt: profileCreatedAt ? new Date(profileCreatedAt).toISOString().split("T")[0] : currentStoreUser?.createdAt || (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
          status: currentStoreUser?.status || "active",
          groupId: profileGroupId || currentStoreUser?.groupId || "group_placeholder_id",
          // profileGroupName will be undefined, so fallback logic will apply
          groupName: profileGroupName || currentStoreUser?.groupName || "Group Placeholder",
          // profileAvatarUrl will be undefined, so fallback logic will apply
          avatarUrl: profileAvatarUrl || currentStoreUser?.avatarUrl || void 0
        };
        zustandSetCurrentUser(userForStore), console.log("[Layout Effect] Updated currentUser in Zustand:", userForStore);
      } else
        console.log("[Layout Effect] Skipping Zustand update, data appears consistent with userProfile:", userProfile.id);
    } else
      error ? console.warn("[Layout Effect] No user profile loaded due to error from loader:", error) : currentStoreUser && (zustandSetCurrentUser(null), console.log("[Layout Effect] Cleared currentUser in Zustand as no userProfile was loaded."));
  }, [userProfile, error, ENV, zustandSetCurrentUser]), loaderData || console.warn("[Layout Component] Warning: useLoaderData() returned undefined. Using default values."), error && !userProfile && console.error("[Layout Component] Error message received from loader:", error), /* @__PURE__ */ jsxDEV3("html", { lang: "en", className: "h-full", children: [
    /* @__PURE__ */ jsxDEV3("head", { children: [
      /* @__PURE__ */ jsxDEV3("meta", { charSet: "utf-8" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 200,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV3("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 201,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV3(Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 202,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV3(Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 203,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 199,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV3("body", { className: "h-full bg-gray-50 dark:bg-gray-950", children: [
      /* @__PURE__ */ jsxDEV3(Header, { user: userProfile }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 206,
        columnNumber: 9
      }, this),
      " ",
      children,
      /* @__PURE__ */ jsxDEV3(ScrollRestoration, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 208,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV3(Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 209,
        columnNumber: 9
      }, this),
      ENV ? /* @__PURE__ */ jsxDEV3(
        "script",
        {
          dangerouslySetInnerHTML: {
            __html: `window.ENV = ${JSON.stringify(ENV)};`
          }
        },
        void 0,
        !1,
        {
          fileName: "app/root.tsx",
          lineNumber: 212,
          columnNumber: 9
        },
        this
      ) : null
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 205,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 198,
    columnNumber: 5
  }, this);
}
function App() {
  return /* @__PURE__ */ jsxDEV3("div", { className: "flex min-h-screen flex-col", children: /* @__PURE__ */ jsxDEV3("main", { className: "flex-1 p-4 md:p-6", children: /* @__PURE__ */ jsxDEV3(Outlet, {}, void 0, !1, {
    fileName: "app/root.tsx",
    lineNumber: 227,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/root.tsx",
    lineNumber: 226,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/root.tsx",
    lineNumber: 225,
    columnNumber: 5
  }, this);
}
function ErrorBoundary() {
  let error = useRouteError();
  console.error("Root Error Boundary caught error:", error);
  let errorMessage = "An unexpected error occurred.", errorStatus = 500;
  return isRouteErrorResponse(error) ? (typeof error.data == "object" && error.data !== null && "message" in error.data ? errorMessage = String(error.data.message) || error.statusText : typeof error.data == "string" ? errorMessage = error.data || error.statusText : errorMessage = error.statusText, errorStatus = error.status) : error instanceof Error ? errorMessage = error.message : typeof error == "string" && (errorMessage = error), /* @__PURE__ */ jsxDEV3("html", { lang: "en", className: "h-full", children: [
    /* @__PURE__ */ jsxDEV3("head", { children: [
      /* @__PURE__ */ jsxDEV3("title", { children: "Error" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 258,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV3("meta", { charSet: "utf-8" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 259,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV3("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 260,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV3(Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 261,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV3(Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 262,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 257,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV3("body", { className: "h-full flex items-center justify-center bg-red-100", children: [
      /* @__PURE__ */ jsxDEV3("div", { className: "text-center p-8 bg-white shadow-md rounded", children: [
        /* @__PURE__ */ jsxDEV3("h1", { className: "text-2xl font-bold text-red-600", children: "Application Error" }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 266,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV3("p", { className: "mt-2", children: [
          "Status: ",
          errorStatus
        ] }, void 0, !0, {
          fileName: "app/root.tsx",
          lineNumber: 267,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV3("p", { className: "mt-2", children: errorMessage }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 268,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV3("a", { href: "/", className: "mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600", children: "Go Home" }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 269,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/root.tsx",
        lineNumber: 265,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV3(Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 271,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 264,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 256,
    columnNumber: 5
  }, this);
}

// app/routes/reports.security-log.tsx
var reports_security_log_exports = {};
__export(reports_security_log_exports, {
  default: () => SecurityLogPage
});
import { useState as useState3, useMemo } from "react";

// app/components/ClientOnly.tsx
import { useState as useState2, useEffect as useEffect3 } from "react";
import { Fragment as Fragment2, jsxDEV as jsxDEV4 } from "react/jsx-dev-runtime";
function ClientOnly({ children, fallback = null }) {
  let [hasMounted, setHasMounted] = useState2(!1);
  return useEffect3(() => {
    setHasMounted(!0);
  }, []), hasMounted ? /* @__PURE__ */ jsxDEV4(Fragment2, { children: children() }, void 0, !1, {
    fileName: "app/components/ClientOnly.tsx",
    lineNumber: 23,
    columnNumber: 10
  }, this) : fallback;
}

// app/components/DateFilter.tsx
import { CalendarIcon } from "lucide-react";
import { jsxDEV as jsxDEV5 } from "react/jsx-dev-runtime";
function DateFilter() {
  return /* @__PURE__ */ jsxDEV5("div", { className: "flex items-center space-x-2 rounded-md border bg-white p-2 text-sm shadow-sm dark:border-gray-700 dark:bg-gray-900", children: [
    /* @__PURE__ */ jsxDEV5(CalendarIcon, { className: "h-4 w-4 text-gray-500 dark:text-gray-400" }, void 0, !1, {
      fileName: "app/components/DateFilter.tsx",
      lineNumber: 8,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV5("span", { children: "Reporting Period:" }, void 0, !1, {
      fileName: "app/components/DateFilter.tsx",
      lineNumber: 9,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV5("select", { className: "rounded border bg-gray-50 px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-800", children: [
      /* @__PURE__ */ jsxDEV5("option", { children: "Current Term" }, void 0, !1, {
        fileName: "app/components/DateFilter.tsx",
        lineNumber: 11,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV5("option", { children: "Last Term" }, void 0, !1, {
        fileName: "app/components/DateFilter.tsx",
        lineNumber: 12,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV5("option", { children: "This Year" }, void 0, !1, {
        fileName: "app/components/DateFilter.tsx",
        lineNumber: 13,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV5("option", { children: "Custom Range..." }, void 0, !1, {
        fileName: "app/components/DateFilter.tsx",
        lineNumber: 14,
        columnNumber: 9
      }, this),
      " "
    ] }, void 0, !0, {
      fileName: "app/components/DateFilter.tsx",
      lineNumber: 10,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/DateFilter.tsx",
    lineNumber: 7,
    columnNumber: 5
  }, this);
}

// app/lib/mockData.ts
var mockUsers = [
  { id: "u101", fullName: "Alice Wonderland", email: "alice@example.com", role: "User", groupId: "g1", groupName: "Explorers", balance: 1500, createdAt: "2024-01-15", status: "active" },
  { id: "u102", fullName: "Bob The Builder", email: "bob@example.com", role: "User", groupId: "g2", groupName: "Creators", balance: 800, createdAt: "2024-01-20", status: "active" },
  { id: "u103", fullName: "Charlie Chaplin", email: "charlie@example.com", role: "Admin", groupId: "g1", groupName: "Explorers", balance: 2500, createdAt: "2024-02-01", status: "active" },
  { id: "u104", fullName: "Diana Prince", email: "diana@example.com", role: "Super Admin", groupId: "g0", groupName: "System", balance: 1e4, createdAt: "2024-01-01", status: "active" },
  { id: "u105", fullName: "Evan Almighty", email: "evan@example.com", role: "User", groupId: "g2", groupName: "Creators", balance: 300, createdAt: "2024-03-10", status: "suspended" }
];
var mockSecurityLogs = [
  {
    id: "sl001",
    timestamp: "2024-07-25 10:00:00",
    userId: "u101",
    action: "User Login",
    ipAddress: "192.168.1.10",
    details: "Successful login from Alice Wonderland",
    category: "authentication",
    severity: "info"
  },
  {
    id: "sl002",
    timestamp: "2024-07-25 10:05:30",
    userId: "u102",
    action: "Transfer ESSENCE",
    ipAddress: "192.168.1.11",
    details: "Bob The Builder transferred 50 ESSENCE to Alice Wonderland",
    category: "transfer",
    severity: "info"
  },
  {
    id: "sl003",
    timestamp: "2024-07-25 10:10:15",
    userId: "u105",
    action: "Failed Login Attempt",
    ipAddress: "203.0.113.45",
    details: "Failed login attempt for user 'evan@example.com' (incorrect password)",
    category: "authentication",
    severity: "warning"
  },
  {
    id: "sl004",
    timestamp: "2024-07-25 10:15:00",
    userId: "u103",
    action: "Admin Action: User Role Change",
    ipAddress: "192.168.1.12",
    details: "Charlie Chaplin changed user 'u102' role to 'Admin'",
    category: "admin",
    severity: "info"
  },
  {
    id: "sl005",
    timestamp: "2024-07-25 10:20:40",
    userId: "u101",
    action: "Purchase Item",
    ipAddress: "192.168.1.10",
    details: "Alice Wonderland purchased 'Digital Badge - Explorer'",
    category: "marketplace",
    severity: "info"
  },
  {
    id: "sl006",
    timestamp: "2024-07-25 10:25:00",
    userId: "u104",
    action: "System Maintenance",
    ipAddress: "127.0.0.1",
    details: "Automated system backup initiated",
    category: "system",
    severity: "info"
  },
  {
    id: "sl007",
    timestamp: "2024-07-25 10:30:00",
    userId: "u105",
    action: "Account Suspension",
    ipAddress: "192.168.1.13",
    details: "Evan Almighty's account suspended due to policy violation",
    category: "admin",
    severity: "error"
  },
  {
    id: "sl008",
    timestamp: "2024-07-25 10:35:00",
    userId: "u101",
    action: "Transfer ESSENCE",
    ipAddress: "192.168.1.10",
    details: "Alice Wonderland transferred 100 ESSENCE to Bob The Builder",
    category: "transfer",
    severity: "info"
  },
  {
    id: "sl009",
    timestamp: "2024-07-25 10:40:00",
    userId: "u102",
    action: "User Logout",
    ipAddress: "192.168.1.11",
    details: "Bob The Builder logged out",
    category: "authentication",
    severity: "info"
  },
  {
    id: "sl010",
    timestamp: "2024-07-25 10:45:00",
    userId: "u103",
    action: "Failed Transfer Attempt",
    ipAddress: "192.168.1.12",
    details: "Charlie Chaplin attempted to transfer 5000 ESSENCE with insufficient funds",
    category: "transfer",
    severity: "warning"
  }
];

// app/routes/reports.security-log.tsx
import { SearchIcon } from "lucide-react";
import { Fragment as Fragment3, jsxDEV as jsxDEV6 } from "react/jsx-dev-runtime";
var getUserName = (userId) => {
  let user = mockUsers.find((u) => u.id === userId);
  return user ? user.fullName : userId;
};
function SecurityLogPage() {
  let [searchTerm, setSearchTerm] = useState3(""), filteredLogs = useMemo(() => mockSecurityLogs.filter((log) => {
    let lowerSearchTerm = searchTerm.toLowerCase(), userName = getUserName(log.userId).toLowerCase();
    return log.timestamp.toLowerCase().includes(lowerSearchTerm) || userName.includes(lowerSearchTerm) || log.action.toLowerCase().includes(lowerSearchTerm) || log.ipAddress.toLowerCase().includes(lowerSearchTerm) || log.details.toLowerCase().includes(lowerSearchTerm);
  }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()), [
    searchTerm
    /*, dateRange */
  ]), handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  return /* @__PURE__ */ jsxDEV6("div", { className: "p-4 md:p-6", children: [
    /* @__PURE__ */ jsxDEV6("h1", { className: "mb-4 text-2xl font-semibold", children: "Security Log" }, void 0, !1, {
      fileName: "app/routes/reports.security-log.tsx",
      lineNumber: 44,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV6(ClientOnly, { fallback: /* @__PURE__ */ jsxDEV6("div", { className: "p-4", children: [
      /* @__PURE__ */ jsxDEV6("div", { className: "h-12 animate-pulse rounded bg-muted" }, void 0, !1, {
        fileName: "app/routes/reports.security-log.tsx",
        lineNumber: 40,
        columnNumber: 41
      }, this),
      /* @__PURE__ */ jsxDEV6("div", { className: "mt-4 h-64 animate-pulse rounded bg-muted" }, void 0, !1, {
        fileName: "app/routes/reports.security-log.tsx",
        lineNumber: 40,
        columnNumber: 100
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/reports.security-log.tsx",
      lineNumber: 40,
      columnNumber: 20
    }, this), children: () => /* @__PURE__ */ jsxDEV6(Fragment3, { children: [
      /* @__PURE__ */ jsxDEV6("div", { className: "mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between", children: [
        /* @__PURE__ */ jsxDEV6("div", { className: "relative flex-grow", children: [
          /* @__PURE__ */ jsxDEV6(SearchIcon, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" }, void 0, !1, {
            fileName: "app/routes/reports.security-log.tsx",
            lineNumber: 51,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV6(
            "input",
            {
              type: "search",
              placeholder: "Search logs (user, action, IP, details...)",
              value: searchTerm,
              onChange: handleSearchChange,
              className: "w-full rounded-md border bg-white py-2 pl-9 pr-3 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/reports.security-log.tsx",
              lineNumber: 52,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/reports.security-log.tsx",
          lineNumber: 50,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV6(DateFilter, {}, void 0, !1, {
          fileName: "app/routes/reports.security-log.tsx",
          lineNumber: 60,
          columnNumber: 15
        }, this),
        " "
      ] }, void 0, !0, {
        fileName: "app/routes/reports.security-log.tsx",
        lineNumber: 48,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV6("div", { className: "overflow-x-auto rounded-lg border bg-card text-card-foreground shadow-sm", children: /* @__PURE__ */ jsxDEV6("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxDEV6("thead", { children: /* @__PURE__ */ jsxDEV6("tr", { className: "border-b", children: [
          /* @__PURE__ */ jsxDEV6("th", { className: "px-4 py-3 text-left font-medium text-muted-foreground", children: "Timestamp" }, void 0, !1, {
            fileName: "app/routes/reports.security-log.tsx",
            lineNumber: 67,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV6("th", { className: "px-4 py-3 text-left font-medium text-muted-foreground", children: "User" }, void 0, !1, {
            fileName: "app/routes/reports.security-log.tsx",
            lineNumber: 68,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV6("th", { className: "px-4 py-3 text-left font-medium text-muted-foreground", children: "Action" }, void 0, !1, {
            fileName: "app/routes/reports.security-log.tsx",
            lineNumber: 69,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV6("th", { className: "px-4 py-3 text-left font-medium text-muted-foreground", children: "IP Address" }, void 0, !1, {
            fileName: "app/routes/reports.security-log.tsx",
            lineNumber: 70,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV6("th", { className: "px-4 py-3 text-left font-medium text-muted-foreground", children: "Details" }, void 0, !1, {
            fileName: "app/routes/reports.security-log.tsx",
            lineNumber: 71,
            columnNumber: 21
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/reports.security-log.tsx",
          lineNumber: 66,
          columnNumber: 19
        }, this) }, void 0, !1, {
          fileName: "app/routes/reports.security-log.tsx",
          lineNumber: 65,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV6("tbody", { children: filteredLogs.length > 0 ? filteredLogs.map((log) => /* @__PURE__ */ jsxDEV6("tr", { className: "border-b last:border-b-0 hover:bg-muted/50", children: [
          /* @__PURE__ */ jsxDEV6("td", { className: "whitespace-nowrap px-4 py-3", children: log.timestamp }, void 0, !1, {
            fileName: "app/routes/reports.security-log.tsx",
            lineNumber: 78,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ jsxDEV6("td", { className: "px-4 py-3", children: getUserName(log.userId) }, void 0, !1, {
            fileName: "app/routes/reports.security-log.tsx",
            lineNumber: 79,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ jsxDEV6("td", { className: "px-4 py-3", children: log.action }, void 0, !1, {
            fileName: "app/routes/reports.security-log.tsx",
            lineNumber: 80,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ jsxDEV6("td", { className: "px-4 py-3", children: log.ipAddress }, void 0, !1, {
            fileName: "app/routes/reports.security-log.tsx",
            lineNumber: 81,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ jsxDEV6("td", { className: "px-4 py-3", children: log.details }, void 0, !1, {
            fileName: "app/routes/reports.security-log.tsx",
            lineNumber: 82,
            columnNumber: 25
          }, this)
        ] }, log.id, !0, {
          fileName: "app/routes/reports.security-log.tsx",
          lineNumber: 77,
          columnNumber: 23
        }, this)) : /* @__PURE__ */ jsxDEV6("tr", { children: /* @__PURE__ */ jsxDEV6("td", { colSpan: 5, className: "py-6 text-center text-muted-foreground", children: "No matching logs found." }, void 0, !1, {
          fileName: "app/routes/reports.security-log.tsx",
          lineNumber: 87,
          columnNumber: 23
        }, this) }, void 0, !1, {
          fileName: "app/routes/reports.security-log.tsx",
          lineNumber: 86,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "app/routes/reports.security-log.tsx",
          lineNumber: 74,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/reports.security-log.tsx",
        lineNumber: 64,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "app/routes/reports.security-log.tsx",
        lineNumber: 63,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/reports.security-log.tsx",
      lineNumber: 47,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/reports.security-log.tsx",
      lineNumber: 45,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/reports.security-log.tsx",
    lineNumber: 43,
    columnNumber: 5
  }, this);
}

// app/routes/transactions.tsx
var transactions_exports = {};
__export(transactions_exports, {
  default: () => Transactions,
  meta: () => meta
});
import { useState as useState4, useMemo as useMemo2, useCallback, useEffect as useEffect4 } from "react";
import Papa from "papaparse";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { jsxDEV as jsxDEV7 } from "react/jsx-dev-runtime";
var meta = () => [
  { title: "Life Economy - Transactions" },
  { name: "description", content: "View your transaction history" }
], DownloadIcon = (props) => /* @__PURE__ */ jsxDEV7(
  "svg",
  {
    ...props,
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [
      /* @__PURE__ */ jsxDEV7("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }, void 0, !1, {
        fileName: "app/routes/transactions.tsx",
        lineNumber: 39,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDEV7("polyline", { points: "7 10 12 15 17 10" }, void 0, !1, {
        fileName: "app/routes/transactions.tsx",
        lineNumber: 40,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDEV7("line", { x1: "12", x2: "12", y1: "15", y2: "3" }, void 0, !1, {
        fileName: "app/routes/transactions.tsx",
        lineNumber: 41,
        columnNumber: 5
      }, this)
    ]
  },
  void 0,
  !0,
  {
    fileName: "app/routes/transactions.tsx",
    lineNumber: 27,
    columnNumber: 3
  },
  this
), FileTextIcon = (props) => /* @__PURE__ */ jsxDEV7(
  "svg",
  {
    ...props,
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [
      /* @__PURE__ */ jsxDEV7("path", { d: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" }, void 0, !1, {
        fileName: "app/routes/transactions.tsx",
        lineNumber: 58,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDEV7("polyline", { points: "14 2 14 8 20 8" }, void 0, !1, {
        fileName: "app/routes/transactions.tsx",
        lineNumber: 59,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDEV7("line", { x1: "16", x2: "8", y1: "13", y2: "13" }, void 0, !1, {
        fileName: "app/routes/transactions.tsx",
        lineNumber: 60,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDEV7("line", { x1: "16", x2: "8", y1: "17", y2: "17" }, void 0, !1, {
        fileName: "app/routes/transactions.tsx",
        lineNumber: 61,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDEV7("line", { x1: "10", x2: "8", y1: "9", y2: "9" }, void 0, !1, {
        fileName: "app/routes/transactions.tsx",
        lineNumber: 62,
        columnNumber: 5
      }, this)
    ]
  },
  void 0,
  !0,
  {
    fileName: "app/routes/transactions.tsx",
    lineNumber: 46,
    columnNumber: 3
  },
  this
);
var SearchIcon2 = (props) => /* @__PURE__ */ jsxDEV7(
  "svg",
  {
    ...props,
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [
      /* @__PURE__ */ jsxDEV7("circle", { cx: "11", cy: "11", r: "8" }, void 0, !1, {
        fileName: "app/routes/transactions.tsx",
        lineNumber: 99,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDEV7("path", { d: "m21 21-4.3-4.3" }, void 0, !1, {
        fileName: "app/routes/transactions.tsx",
        lineNumber: 100,
        columnNumber: 5
      }, this)
    ]
  },
  void 0,
  !0,
  {
    fileName: "app/routes/transactions.tsx",
    lineNumber: 87,
    columnNumber: 3
  },
  this
), CalendarIcon2 = (props) => /* @__PURE__ */ jsxDEV7(
  "svg",
  {
    ...props,
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [
      /* @__PURE__ */ jsxDEV7("path", { d: "M8 2v4" }, void 0, !1, {
        fileName: "app/routes/transactions.tsx",
        lineNumber: 117,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDEV7("path", { d: "M16 2v4" }, void 0, !1, {
        fileName: "app/routes/transactions.tsx",
        lineNumber: 118,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDEV7("rect", { width: "18", height: "18", x: "3", y: "4", rx: "2" }, void 0, !1, {
        fileName: "app/routes/transactions.tsx",
        lineNumber: 119,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDEV7("path", { d: "M3 10h18" }, void 0, !1, {
        fileName: "app/routes/transactions.tsx",
        lineNumber: 120,
        columnNumber: 5
      }, this)
    ]
  },
  void 0,
  !0,
  {
    fileName: "app/routes/transactions.tsx",
    lineNumber: 105,
    columnNumber: 3
  },
  this
), ITEMS_PER_PAGE = 10;
function Transactions() {
  let { transactions: allTransactions, currentUser, users } = useStore((state) => ({
    transactions: state.transactions,
    currentUser: state.currentUser,
    users: state.users
    // Needed to potentially display user names if needed later
  })), userTransactions = useMemo2(() => currentUser ? allTransactions.filter((tx) => tx.userId === currentUser.id || !tx.userId) : [], [allTransactions, currentUser]), [searchTerm, setSearchTerm] = useState4(""), [startDate, setStartDate] = useState4(""), [endDate, setEndDate] = useState4(""), [currentPage, setCurrentPage] = useState4(1), [csvDownloadUrl, setCsvDownloadUrl] = useState4(null), [pdfDownloadUrl, setPdfDownloadUrl] = useState4(null);
  useEffect4(() => {
    let currentCsvUrl = csvDownloadUrl, currentPdfUrl = pdfDownloadUrl;
    return () => {
      currentCsvUrl && (console.log("[Cleanup] Revoking CSV URL:", currentCsvUrl), URL.revokeObjectURL(currentCsvUrl)), currentPdfUrl && (console.log("[Cleanup] Revoking PDF URL:", currentPdfUrl), URL.revokeObjectURL(currentPdfUrl));
    };
  }, [csvDownloadUrl, pdfDownloadUrl]);
  let formatCurrency = (amount) => {
    if (amount == null)
      return "";
    let numAmount = Number(amount);
    return isNaN(numAmount) ? "" : numAmount.toFixed(2);
  }, formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      return dateString;
    }
  }, filteredTransactions = useMemo2(() => {
    let filtered = userTransactions;
    if (startDate)
      try {
        let start = new Date(startDate);
        start.setHours(0, 0, 0, 0), isNaN(start.getTime()) || (filtered = filtered.filter((tx) => {
          let txDate = new Date(tx.date);
          return !isNaN(txDate.getTime()) && txDate >= start;
        }));
      } catch (e) {
        console.error("Invalid start date:", e);
      }
    if (endDate)
      try {
        let end = new Date(endDate);
        end.setHours(23, 59, 59, 999), isNaN(end.getTime()) || (filtered = filtered.filter((tx) => {
          let txDate = new Date(tx.date);
          return !isNaN(txDate.getTime()) && txDate <= end;
        }));
      } catch (e) {
        console.error("Invalid end date:", e);
      }
    if (searchTerm) {
      let lowerCaseSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (tx) => tx.narration?.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }
    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [userTransactions, startDate, endDate, searchTerm]);
  useEffect4(() => {
    csvDownloadUrl && (console.log("[Filter Change] Revoking old CSV URL:", csvDownloadUrl), URL.revokeObjectURL(csvDownloadUrl), setCsvDownloadUrl(null)), pdfDownloadUrl && (console.log("[Filter Change] Revoking old PDF URL:", pdfDownloadUrl), URL.revokeObjectURL(pdfDownloadUrl), setPdfDownloadUrl(null)), setCurrentPage(1);
  }, [startDate, endDate, searchTerm, userTransactions]);
  let totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE), paginatedTransactions = useMemo2(() => {
    let startIndex2 = (currentPage - 1) * ITEMS_PER_PAGE, endIndex2 = startIndex2 + ITEMS_PER_PAGE;
    return filteredTransactions.slice(startIndex2, endIndex2);
  }, [filteredTransactions, currentPage]), handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }, handleExportCSV = useCallback(() => {
    if (console.log("[Export CSV] Started."), filteredTransactions.length === 0) {
      alert("No transactions to export."), console.log("[Export CSV] Aborted: No transactions.");
      return;
    }
    try {
      csvDownloadUrl && (console.log("[Export CSV] Revoking previous CSV URL:", csvDownloadUrl), URL.revokeObjectURL(csvDownloadUrl)), pdfDownloadUrl && (console.log("[Export CSV] Revoking existing PDF URL:", pdfDownloadUrl), URL.revokeObjectURL(pdfDownloadUrl), setPdfDownloadUrl(null)), console.log(`[Export CSV] Processing ${filteredTransactions.length} transactions.`);
      let csvData = Papa.unparse(filteredTransactions.map((tx) => ({
        Date: formatDate(tx.date),
        // Use formatted date
        Type: tx.type || "N/A",
        // Add Type column
        Narration: tx.narration,
        Debit: formatCurrency(tx.debit),
        Credit: formatCurrency(tx.credit),
        Balance: formatCurrency(tx.balance)
      })), { header: !0 });
      console.log("[Export CSV] CSV data generated.");
      let blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
      console.log("[Export CSV] Blob created.");
      let url = URL.createObjectURL(blob);
      console.log("[Export CSV] New Blob URL created:", url), setCsvDownloadUrl(url), console.log("[Export CSV] CSV download URL set in state.");
    } catch (error) {
      console.error("[Export CSV] Failed:", error), alert("An error occurred while exporting CSV data."), setCsvDownloadUrl(null);
    } finally {
      console.log("[Export CSV] Finished.");
    }
  }, [filteredTransactions, csvDownloadUrl, pdfDownloadUrl]), handleExportPDF = useCallback(() => {
    if (console.log("[Export PDF] Started."), filteredTransactions.length === 0) {
      alert("No transactions to export."), console.log("[Export PDF] Aborted: No transactions.");
      return;
    }
    try {
      pdfDownloadUrl && (console.log("[Export PDF] Revoking previous PDF URL:", pdfDownloadUrl), URL.revokeObjectURL(pdfDownloadUrl)), csvDownloadUrl && (console.log("[Export PDF] Revoking existing CSV URL:", csvDownloadUrl), URL.revokeObjectURL(csvDownloadUrl), setCsvDownloadUrl(null)), console.log(`[Export PDF] Processing ${filteredTransactions.length} transactions.`), console.log("[Export PDF] Creating jsPDF instance...");
      let doc = new jsPDF();
      doc.text("Transaction History", 14, 15), console.log("[Export PDF] Generating PDF table using autoTable..."), doc.autoTable({
        head: [["Date", "Type", "Narration", "Debit", "Credit", "Balance"]],
        // Added Type
        body: filteredTransactions.map((tx) => [
          formatDate(tx.date),
          // Use formatted date
          tx.type || "N/A",
          // Add Type
          tx.narration,
          formatCurrency(tx.debit),
          formatCurrency(tx.credit),
          formatCurrency(tx.balance)
        ]),
        startY: 20,
        headStyles: { fillColor: [22, 160, 133] },
        styles: { fontSize: 8 },
        columnStyles: {
          0: { cellWidth: 30 },
          // Date
          1: { cellWidth: 20 },
          // Type
          2: { cellWidth: "auto" },
          // Narration
          3: { halign: "right", cellWidth: 20 },
          // Debit
          4: { halign: "right", cellWidth: 20 },
          // Credit
          5: { halign: "right", cellWidth: 25 }
          // Balance
        }
      }), console.log("[Export PDF] autoTable finished."), console.log("[Export PDF] Generating PDF Blob...");
      let pdfBlob = doc.output("blob");
      console.log("[Export PDF] Blob created.");
      let url = URL.createObjectURL(pdfBlob);
      console.log("[Export PDF] New Blob URL created:", url), setPdfDownloadUrl(url), console.log("[Export PDF] PDF download URL set in state.");
    } catch (error) {
      console.error("[Export PDF] Failed:", error), alert("An error occurred while exporting PDF data."), setPdfDownloadUrl(null);
    } finally {
      console.log("[Export PDF] Finished.");
    }
  }, [filteredTransactions, pdfDownloadUrl, csvDownloadUrl]), startIndex = (currentPage - 1) * ITEMS_PER_PAGE, endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredTransactions.length);
  return /* @__PURE__ */ jsxDEV7("div", { className: "container mx-auto p-4 md:p-6", children: [
    /* @__PURE__ */ jsxDEV7("h1", { className: "text-2xl font-semibold mb-4", children: "Transaction History" }, void 0, !1, {
      fileName: "app/routes/transactions.tsx",
      lineNumber: 384,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV7("div", { className: "mb-4 flex flex-wrap items-center gap-4", children: [
      /* @__PURE__ */ jsxDEV7("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxDEV7(CalendarIcon2, { className: "h-5 w-5 text-gray-500 dark:text-gray-400" }, void 0, !1, {
          fileName: "app/routes/transactions.tsx",
          lineNumber: 390,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV7(
          "input",
          {
            type: "date",
            placeholder: "Start Date",
            value: startDate,
            onChange: (e) => {
              setStartDate(e.target.value), endDate && e.target.value > endDate && setEndDate("");
            },
            className: "border rounded px-2 py-1 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200",
            "aria-label": "Start Date"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/transactions.tsx",
            lineNumber: 391,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV7("span", { children: "-" }, void 0, !1, {
          fileName: "app/routes/transactions.tsx",
          lineNumber: 404,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV7(
          "input",
          {
            type: "date",
            placeholder: "End Date",
            value: endDate,
            onChange: (e) => setEndDate(e.target.value),
            min: startDate || void 0,
            className: "border rounded px-2 py-1 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200",
            "aria-label": "End Date"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/transactions.tsx",
            lineNumber: 405,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/transactions.tsx",
        lineNumber: 389,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV7("div", { className: "relative flex-grow max-w-xs", children: [
        /* @__PURE__ */ jsxDEV7(SearchIcon2, { className: "absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" }, void 0, !1, {
          fileName: "app/routes/transactions.tsx",
          lineNumber: 418,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV7(
          "input",
          {
            type: "search",
            placeholder: "Search narration...",
            value: searchTerm,
            onChange: (e) => setSearchTerm(e.target.value),
            className: "w-full rounded border bg-white py-1.5 pl-8 pr-2 text-sm shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200",
            "aria-label": "Search transactions"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/transactions.tsx",
            lineNumber: 419,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/transactions.tsx",
        lineNumber: 417,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV7("div", { className: "flex flex-col items-end gap-1 ml-auto", children: [
        /* @__PURE__ */ jsxDEV7("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxDEV7(
            "button",
            {
              onClick: handleExportCSV,
              disabled: filteredTransactions.length === 0,
              className: "inline-flex items-center gap-1 rounded-md bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:disabled:bg-gray-800 dark:disabled:text-gray-500",
              "aria-label": "Generate CSV Export Link",
              children: [
                /* @__PURE__ */ jsxDEV7(FileTextIcon, { className: "h-4 w-4" }, void 0, !1, {
                  fileName: "app/routes/transactions.tsx",
                  lineNumber: 438,
                  columnNumber: 17
                }, this),
                "Export CSV"
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/routes/transactions.tsx",
              lineNumber: 432,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ jsxDEV7(
            "button",
            {
              onClick: handleExportPDF,
              disabled: filteredTransactions.length === 0,
              className: "inline-flex items-center gap-1 rounded-md bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:disabled:bg-gray-800 dark:disabled:text-gray-500",
              "aria-label": "Generate PDF Export Link",
              children: [
                /* @__PURE__ */ jsxDEV7(DownloadIcon, { className: "h-4 w-4" }, void 0, !1, {
                  fileName: "app/routes/transactions.tsx",
                  lineNumber: 447,
                  columnNumber: 17
                }, this),
                "Export PDF"
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/routes/transactions.tsx",
              lineNumber: 441,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/transactions.tsx",
          lineNumber: 431,
          columnNumber: 12
        }, this),
        /* @__PURE__ */ jsxDEV7("div", { className: "flex gap-4 text-sm h-5", children: [
          " ",
          csvDownloadUrl && /* @__PURE__ */ jsxDEV7(
            "a",
            {
              href: csvDownloadUrl,
              download: "transactions.csv",
              className: "text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline",
              children: "Click to Download CSV"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/transactions.tsx",
              lineNumber: 454,
              columnNumber: 16
            },
            this
          ),
          pdfDownloadUrl && /* @__PURE__ */ jsxDEV7(
            "a",
            {
              href: pdfDownloadUrl,
              download: "transactions.pdf",
              className: "text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline",
              children: "Click to Download PDF"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/transactions.tsx",
              lineNumber: 463,
              columnNumber: 16
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/transactions.tsx",
          lineNumber: 452,
          columnNumber: 12
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/transactions.tsx",
        lineNumber: 430,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/transactions.tsx",
      lineNumber: 387,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV7("div", { className: "overflow-x-auto rounded-lg border dark:border-gray-700", children: /* @__PURE__ */ jsxDEV7("table", { className: "min-w-full divide-y divide-gray-200 dark:divide-gray-700", children: [
      /* @__PURE__ */ jsxDEV7("thead", { className: "bg-gray-50 dark:bg-gray-800", children: /* @__PURE__ */ jsxDEV7("tr", { children: [
        /* @__PURE__ */ jsxDEV7("th", { scope: "col", className: "px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400", children: "Date" }, void 0, !1, {
          fileName: "app/routes/transactions.tsx",
          lineNumber: 480,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV7("th", { scope: "col", className: "px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400", children: "Type" }, void 0, !1, {
          fileName: "app/routes/transactions.tsx",
          lineNumber: 481,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV7("th", { scope: "col", className: "px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400", children: "Narration" }, void 0, !1, {
          fileName: "app/routes/transactions.tsx",
          lineNumber: 482,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV7("th", { scope: "col", className: "px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400", children: "Debit" }, void 0, !1, {
          fileName: "app/routes/transactions.tsx",
          lineNumber: 483,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV7("th", { scope: "col", className: "px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400", children: "Credit" }, void 0, !1, {
          fileName: "app/routes/transactions.tsx",
          lineNumber: 484,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV7("th", { scope: "col", className: "px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400", children: "Balance" }, void 0, !1, {
          fileName: "app/routes/transactions.tsx",
          lineNumber: 485,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/transactions.tsx",
        lineNumber: 479,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/transactions.tsx",
        lineNumber: 478,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV7("tbody", { className: "divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900", children: paginatedTransactions.length > 0 ? paginatedTransactions.map((tx) => /* @__PURE__ */ jsxDEV7("tr", { className: "hover:bg-gray-50 dark:hover:bg-gray-800/50", children: [
        /* @__PURE__ */ jsxDEV7("td", { className: "whitespace-nowrap px-4 py-3 text-sm text-gray-900 dark:text-gray-200", children: formatDate(tx.date) }, void 0, !1, {
          fileName: "app/routes/transactions.tsx",
          lineNumber: 492,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV7("td", { className: "whitespace-nowrap px-4 py-3 text-sm text-gray-900 dark:text-gray-200", children: tx.type || "N/A" }, void 0, !1, {
          fileName: "app/routes/transactions.tsx",
          lineNumber: 493,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV7("td", { className: "whitespace-nowrap px-4 py-3 text-sm text-gray-900 dark:text-gray-200", children: tx.narration }, void 0, !1, {
          fileName: "app/routes/transactions.tsx",
          lineNumber: 494,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV7("td", { className: `whitespace-nowrap px-4 py-3 text-right text-sm ${tx.debit ? "text-red-600 dark:text-red-400" : "text-gray-500 dark:text-gray-400"}`, children: formatCurrency(tx.debit) }, void 0, !1, {
          fileName: "app/routes/transactions.tsx",
          lineNumber: 495,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV7("td", { className: `whitespace-nowrap px-4 py-3 text-right text-sm ${tx.credit ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400"}`, children: formatCurrency(tx.credit) }, void 0, !1, {
          fileName: "app/routes/transactions.tsx",
          lineNumber: 496,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV7("td", { className: "whitespace-nowrap px-4 py-3 text-right text-sm font-medium text-gray-900 dark:text-gray-200", children: formatCurrency(tx.balance) }, void 0, !1, {
          fileName: "app/routes/transactions.tsx",
          lineNumber: 497,
          columnNumber: 19
        }, this)
      ] }, tx.id, !0, {
        fileName: "app/routes/transactions.tsx",
        lineNumber: 491,
        columnNumber: 17
      }, this)) : /* @__PURE__ */ jsxDEV7("tr", { children: /* @__PURE__ */ jsxDEV7("td", { colSpan: 6, className: "px-4 py-4 text-center text-sm text-gray-500 dark:text-gray-400", children: userTransactions.length === 0 ? "No transactions available for this user." : "No transactions found matching your criteria." }, void 0, !1, {
        fileName: "app/routes/transactions.tsx",
        lineNumber: 502,
        columnNumber: 17
      }, this) }, void 0, !1, {
        fileName: "app/routes/transactions.tsx",
        lineNumber: 501,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "app/routes/transactions.tsx",
        lineNumber: 488,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/transactions.tsx",
      lineNumber: 477,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/transactions.tsx",
      lineNumber: 476,
      columnNumber: 7
    }, this),
    totalPages > 1 && /* @__PURE__ */ jsxDEV7("div", { className: "mt-4 flex flex-wrap items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsxDEV7("span", { className: "text-sm text-gray-700 dark:text-gray-400", children: filteredTransactions.length > 0 ? `Showing ${startIndex + 1} to ${endIndex} of ${filteredTransactions.length} results` : "Showing 0 results" }, void 0, !1, {
        fileName: "app/routes/transactions.tsx",
        lineNumber: 514,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV7("div", { className: "flex gap-1", children: [
        /* @__PURE__ */ jsxDEV7(
          "button",
          {
            onClick: handlePreviousPage,
            disabled: currentPage === 1,
            className: "rounded border bg-white px-2 py-1 text-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700 dark:disabled:bg-gray-900 dark:disabled:text-gray-500",
            "aria-label": "Go to previous page",
            children: "Previous"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/transactions.tsx",
            lineNumber: 521,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV7(
          "button",
          {
            onClick: handleNextPage,
            disabled: currentPage === totalPages || totalPages === 0,
            className: "rounded border bg-white px-2 py-1 text-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700 dark:disabled:bg-gray-900 dark:disabled:text-gray-500",
            "aria-label": "Go to next page",
            children: "Next"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/transactions.tsx",
            lineNumber: 529,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/transactions.tsx",
        lineNumber: 520,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/transactions.tsx",
      lineNumber: 513,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/transactions.tsx",
    lineNumber: 383,
    columnNumber: 5
  }, this);
}

// app/routes/management.tsx
var management_exports = {};
__export(management_exports, {
  default: () => ManagementPage,
  loader: () => loader2,
  meta: () => meta2
});
import { json as json2, redirect as redirect3 } from "@remix-run/node";
import { useLoaderData as useLoaderData2 } from "@remix-run/react";

// app/components/management/ManagementTabs.tsx
import { useState as useState13 } from "react";
import { Tab as Tab2 } from "@headlessui/react";

// app/components/management/CurrencyTab.tsx
import { useState as useState6, useEffect as useEffect7 } from "react";
import { DollarSignIcon, HistoryIcon, WalletIcon } from "lucide-react";

// app/components/ui/use-toast.ts
import * as React2 from "react";
var TOAST_LIMIT = 1, TOAST_REMOVE_DELAY = 1e6, actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST"
}, count = 0;
function genId() {
  return count = (count + 1) % Number.MAX_SAFE_INTEGER, count.toString();
}
var reducer = (state, action7) => {
  switch (action7.type) {
    case actionTypes.ADD_TOAST:
      return {
        ...state,
        toasts: [action7.toast, ...state.toasts].slice(0, TOAST_LIMIT)
      };
    case actionTypes.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === action7.toast.id ? { ...t, ...action7.toast } : t
        )
      };
    case actionTypes.DISMISS_TOAST:
      let { toastId } = action7;
      return toastId ? {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === toastId ? { ...t, open: !1 } : t
        )
      } : {
        ...state,
        toasts: state.toasts.map((t) => ({ ...t, open: !1 }))
      };
    case actionTypes.REMOVE_TOAST:
      return action7.toastId === void 0 ? {
        ...state,
        toasts: []
      } : {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action7.toastId)
      };
  }
};
function useToast() {
  let [state, dispatch] = React2.useReducer(reducer, { toasts: [] }), addToast = React2.useCallback((toast) => {
    dispatch({
      type: actionTypes.ADD_TOAST,
      toast: {
        ...toast,
        id: genId(),
        open: !0,
        onOpenChange: (open) => {
          open || dispatch({ type: actionTypes.DISMISS_TOAST, toastId: toast.id });
        }
      }
    });
  }, [dispatch]), updateToast = React2.useCallback((toast) => {
    dispatch({ type: actionTypes.UPDATE_TOAST, toast });
  }, [dispatch]), dismissToast = React2.useCallback((toastId) => {
    dispatch({ type: actionTypes.DISMISS_TOAST, toastId });
  }, [dispatch]), removeToast = React2.useCallback((toastId) => {
    dispatch({ type: actionTypes.REMOVE_TOAST, toastId });
  }, [dispatch]);
  return React2.useEffect(() => {
    let timer = setTimeout(() => {
      state.toasts.length > 0 && dispatch({ type: actionTypes.REMOVE_TOAST, toastId: state.toasts[0].id });
    }, TOAST_REMOVE_DELAY);
    return () => {
      clearTimeout(timer);
    };
  }, [state.toasts]), {
    toasts: state.toasts,
    addToast,
    updateToast,
    dismissToast,
    removeToast
  };
}

// app/lib/auth.ts
import { useEffect as useEffect6, useState as useState5 } from "react";
import { useMatches } from "@remix-run/react";
function useUser() {
  let matches = useMatches(), [user, setUser] = useState5(null), setCurrentUser = useStore((state) => state.setCurrentUser);
  return useEffect6(() => {
    console.log("DEBUG: useUser useEffect triggered.");
    let rootMatch = matches.find((match) => match.id === "root");
    if (rootMatch && rootMatch.data && typeof rootMatch.data == "object" && "userProfile" in rootMatch.data) {
      let userProfile = rootMatch.data.userProfile, session = rootMatch.data.session;
      if (console.log("DEBUG: rootMatch.data:", rootMatch.data), console.log("DEBUG: userProfile from rootMatch:", userProfile), console.log("DEBUG: session from rootMatch:", session), userProfile && session?.access_token && session?.refresh_token && session?.expires_in) {
        let authenticatedUser = {
          ...userProfile,
          accessToken: session.access_token,
          refreshToken: session.refresh_token,
          expiresIn: session.expires_in
        };
        setUser(authenticatedUser), setCurrentUser(authenticatedUser), console.log("DEBUG: Authenticated user set:", authenticatedUser);
      } else
        setUser(null), setCurrentUser(null), console.log("DEBUG: User profile or session data incomplete/missing. User set to null.");
    } else
      console.log("DEBUG: rootMatch not found or data missing."), setUser(null), setCurrentUser(null);
  }, [matches, setCurrentUser]), user;
}

// app/hooks/useUserRole.ts
function useUserRole() {
  return "Super Admin";
}

// app/components/management/CurrencyTab.tsx
import { jsxDEV as jsxDEV8 } from "react/jsx-dev-runtime";
function CurrencyTab() {
  let { addToast } = useToast(), user = useUser(), userRole = useUserRole(), addTransaction = useStore((state) => state.addTransaction), updateUserBalance = useStore((state) => state.updateUserBalance), [totalEssence, setTotalEssence] = useState6(1e6), [mintAmount, setMintAmount] = useState6(""), [mintReason, setMintReason] = useState6(""), [issuanceHistory, setIssuanceHistory] = useState6([]), [userBalance, setUserBalance] = useState6(null);
  useEffect7(() => {
    user?.id && user.accessToken ? supabase.auth.setSession({
      access_token: user.accessToken,
      refresh_token: user.refreshToken,
      expires_in: user.expiresIn,
      token_type: "Bearer",
      user
      // Pass the full user object if needed by Supabase client
    }).catch((error) => {
      console.error("Error setting Supabase session:", error);
    }) : supabase.auth.signOut().catch((error) => {
      console.error("Error clearing Supabase session:", error);
    });
  }, [user]), useEffect7(() => {
    (async () => {
      if (user?.id) {
        let { data, error } = await supabase.from("profiles").select("balance").eq("id", user.id).single();
        error ? (console.error("Error fetching user balance:", error), addToast({
          title: "Error",
          description: "Failed to fetch your current balance.",
          variant: "destructive"
        })) : data && setUserBalance(parseFloat(data.balance));
      }
    })();
  }, [user, addToast]), useEffect7(() => {
  }, []);
  let handleMintCurrency = async () => {
    console.log("DEBUG: Mint Currency button clicked!"), console.log("DEBUG: mintAmount state:", mintAmount);
    let amount = parseFloat(mintAmount);
    if (console.log("DEBUG: Parsed amount:", amount), console.log("DEBUG: User object:", user), console.log("DEBUG: User ID:", user?.id), isNaN(amount) || amount <= 0) {
      addToast({
        title: "Minting Failed",
        description: "Please enter a valid positive amount to mint.",
        variant: "destructive"
      });
      return;
    }
    if (!user?.id) {
      addToast({
        title: "Minting Failed",
        description: "User not authenticated.",
        variant: "destructive"
      });
      return;
    }
    try {
      let newBalance = (userBalance || 0) + amount, { error: updateError } = await supabase.from("profiles").update({ balance: newBalance }).eq("id", user.id);
      if (updateError)
        throw updateError;
      let transaction = {
        id: crypto.randomUUID(),
        // Generate a unique ID
        user_id: user.id,
        // Changed from userId to user_id
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        // Changed from 'date' to 'created_at'
        type: "Minting",
        narration: mintReason || "ESSENCE minting",
        debit: null,
        credit: amount,
        balance_after: newBalance
      };
      console.log("DEBUG: Attempting to insert transaction."), console.log("DEBUG: Authenticated user ID from useUser():", user?.id), console.log("DEBUG: Transaction object being inserted:", transaction);
      let { error: transactionError } = await supabase.from("transactions").insert([transaction]);
      if (transactionError)
        throw transactionError;
      setTotalEssence((prevTotal) => prevTotal + amount), setUserBalance(newBalance), setIssuanceHistory((prevHistory) => [transaction, ...prevHistory]), addTransaction(transaction), updateUserBalance(user.id, newBalance), addToast({
        title: "Minting Successful",
        description: `Successfully minted ${amount.toLocaleString()} ESSENCE. Your new balance is ${newBalance.toLocaleString()}.`,
        variant: "default"
      }), setMintAmount(""), setMintReason("");
    } catch (error) {
      console.error("Error minting currency:", error), addToast({
        title: "Minting Failed",
        description: `An error occurred: ${error.message || error.toString()}`,
        variant: "destructive"
      });
    }
  };
  return userRole !== "Super Admin" ? /* @__PURE__ */ jsxDEV8("div", { className: "p-4 text-center text-red-500 dark:text-red-400", children: [
    /* @__PURE__ */ jsxDEV8("h2", { className: "text-xl font-semibold mb-4", children: "Access Denied" }, void 0, !1, {
      fileName: "app/components/management/CurrencyTab.tsx",
      lineNumber: 173,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV8("p", { children: "You do not have the necessary permissions to view this page." }, void 0, !1, {
      fileName: "app/components/management/CurrencyTab.tsx",
      lineNumber: 174,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/management/CurrencyTab.tsx",
    lineNumber: 172,
    columnNumber: 7
  }, this) : /* @__PURE__ */ jsxDEV8("div", { className: "p-4", children: [
    /* @__PURE__ */ jsxDEV8("h2", { className: "text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100", children: "Currency Management" }, void 0, !1, {
      fileName: "app/components/management/CurrencyTab.tsx",
      lineNumber: 181,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV8("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-6", children: [
      /* @__PURE__ */ jsxDEV8("div", { className: "bg-blue-100 dark:bg-blue-900 p-4 rounded-lg shadow-md flex items-center justify-between", children: /* @__PURE__ */ jsxDEV8("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsxDEV8(DollarSignIcon, { className: "h-8 w-8 text-blue-600 dark:text-blue-300 mr-3" }, void 0, !1, {
          fileName: "app/components/management/CurrencyTab.tsx",
          lineNumber: 188,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV8("div", { children: [
          /* @__PURE__ */ jsxDEV8("p", { className: "text-sm font-medium text-blue-700 dark:text-blue-200", children: "Total ESSENCE in Circulation" }, void 0, !1, {
            fileName: "app/components/management/CurrencyTab.tsx",
            lineNumber: 190,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV8("p", { className: "text-2xl font-bold text-blue-800 dark:text-blue-100", children: [
            totalEssence.toLocaleString(),
            " ESSENCE"
          ] }, void 0, !0, {
            fileName: "app/components/management/CurrencyTab.tsx",
            lineNumber: 191,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/management/CurrencyTab.tsx",
          lineNumber: 189,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/management/CurrencyTab.tsx",
        lineNumber: 187,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/components/management/CurrencyTab.tsx",
        lineNumber: 186,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV8("div", { className: "bg-blue-100 dark:bg-blue-900 p-4 rounded-lg shadow-md flex items-center justify-between", children: /* @__PURE__ */ jsxDEV8("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsxDEV8(WalletIcon, { className: "h-8 w-8 text-blue-600 dark:text-blue-300 mr-3" }, void 0, !1, {
          fileName: "app/components/management/CurrencyTab.tsx",
          lineNumber: 199,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV8("div", { children: [
          /* @__PURE__ */ jsxDEV8("p", { className: "text-sm font-medium text-blue-700 dark:text-blue-200", children: "Your Current Balance" }, void 0, !1, {
            fileName: "app/components/management/CurrencyTab.tsx",
            lineNumber: 201,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV8("p", { className: "text-2xl font-bold text-blue-800 dark:text-blue-100", children: userBalance !== null ? `${userBalance.toLocaleString()} ESSENCE` : "Loading..." }, void 0, !1, {
            fileName: "app/components/management/CurrencyTab.tsx",
            lineNumber: 202,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/management/CurrencyTab.tsx",
          lineNumber: 200,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/management/CurrencyTab.tsx",
        lineNumber: 198,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/components/management/CurrencyTab.tsx",
        lineNumber: 197,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/management/CurrencyTab.tsx",
      lineNumber: 184,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV8("div", { className: "bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6", children: [
      /* @__PURE__ */ jsxDEV8("h3", { className: "text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100", children: "Mint New ESSENCE" }, void 0, !1, {
        fileName: "app/components/management/CurrencyTab.tsx",
        lineNumber: 212,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV8("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxDEV8("div", { children: [
          /* @__PURE__ */ jsxDEV8("label", { htmlFor: "mintAmount", className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Amount to Mint" }, void 0, !1, {
            fileName: "app/components/management/CurrencyTab.tsx",
            lineNumber: 215,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV8(
            "input",
            {
              type: "number",
              id: "mintAmount",
              className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white",
              placeholder: "e.g., 10000",
              value: mintAmount,
              onChange: (e) => setMintAmount(e.target.value)
            },
            void 0,
            !1,
            {
              fileName: "app/components/management/CurrencyTab.tsx",
              lineNumber: 218,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/components/management/CurrencyTab.tsx",
          lineNumber: 214,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV8("div", { children: [
          /* @__PURE__ */ jsxDEV8("label", { htmlFor: "mintReason", className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Reason (Optional)" }, void 0, !1, {
            fileName: "app/components/management/CurrencyTab.tsx",
            lineNumber: 228,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV8(
            "input",
            {
              type: "text",
              id: "mintReason",
              className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white",
              placeholder: "e.g., Community event rewards",
              value: mintReason,
              onChange: (e) => setMintReason(e.target.value)
            },
            void 0,
            !1,
            {
              fileName: "app/components/management/CurrencyTab.tsx",
              lineNumber: 231,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/components/management/CurrencyTab.tsx",
          lineNumber: 227,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/management/CurrencyTab.tsx",
        lineNumber: 213,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV8(
        "button",
        {
          onClick: handleMintCurrency,
          className: "mt-6 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800",
          children: "Mint Currency"
        },
        void 0,
        !1,
        {
          fileName: "app/components/management/CurrencyTab.tsx",
          lineNumber: 241,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/components/management/CurrencyTab.tsx",
      lineNumber: 211,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV8("div", { className: "bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md", children: [
      /* @__PURE__ */ jsxDEV8("h3", { className: "text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100 flex items-center", children: [
        /* @__PURE__ */ jsxDEV8(HistoryIcon, { className: "h-5 w-5 mr-2" }, void 0, !1, {
          fileName: "app/components/management/CurrencyTab.tsx",
          lineNumber: 252,
          columnNumber: 11
        }, this),
        "Issuance History"
      ] }, void 0, !0, {
        fileName: "app/components/management/CurrencyTab.tsx",
        lineNumber: 251,
        columnNumber: 9
      }, this),
      issuanceHistory.length === 0 ? /* @__PURE__ */ jsxDEV8("p", { className: "text-gray-500 dark:text-gray-400", children: "No issuance history found." }, void 0, !1, {
        fileName: "app/components/management/CurrencyTab.tsx",
        lineNumber: 256,
        columnNumber: 11
      }, this) : /* @__PURE__ */ jsxDEV8("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxDEV8("table", { className: "min-w-full divide-y divide-gray-200 dark:divide-gray-700", children: [
        /* @__PURE__ */ jsxDEV8("thead", { className: "bg-gray-50 dark:bg-gray-700", children: /* @__PURE__ */ jsxDEV8("tr", { children: [
          /* @__PURE__ */ jsxDEV8("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300", children: "Date/Time" }, void 0, !1, {
            fileName: "app/components/management/CurrencyTab.tsx",
            lineNumber: 262,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV8("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300", children: "Amount" }, void 0, !1, {
            fileName: "app/components/management/CurrencyTab.tsx",
            lineNumber: 265,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV8("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300", children: "Description" }, void 0, !1, {
            fileName: "app/components/management/CurrencyTab.tsx",
            lineNumber: 268,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV8("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300", children: "Issued By" }, void 0, !1, {
            fileName: "app/components/management/CurrencyTab.tsx",
            lineNumber: 271,
            columnNumber: 19
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/management/CurrencyTab.tsx",
          lineNumber: 261,
          columnNumber: 17
        }, this) }, void 0, !1, {
          fileName: "app/components/management/CurrencyTab.tsx",
          lineNumber: 260,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV8("tbody", { className: "bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700", children: issuanceHistory.map((record) => /* @__PURE__ */ jsxDEV8("tr", { children: [
          /* @__PURE__ */ jsxDEV8("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100", children: new Date(record.created_at).toLocaleString() }, void 0, !1, {
            fileName: "app/components/management/CurrencyTab.tsx",
            lineNumber: 279,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV8("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300", children: [
            record.credit?.toLocaleString(),
            " ESSENCE"
          ] }, void 0, !0, {
            fileName: "app/components/management/CurrencyTab.tsx",
            lineNumber: 282,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV8("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300", children: record.narration }, void 0, !1, {
            fileName: "app/components/management/CurrencyTab.tsx",
            lineNumber: 285,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV8("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300", children: [
            user?.email || "System",
            " "
          ] }, void 0, !0, {
            fileName: "app/components/management/CurrencyTab.tsx",
            lineNumber: 288,
            columnNumber: 21
          }, this)
        ] }, record.id, !0, {
          fileName: "app/components/management/CurrencyTab.tsx",
          lineNumber: 278,
          columnNumber: 19
        }, this)) }, void 0, !1, {
          fileName: "app/components/management/CurrencyTab.tsx",
          lineNumber: 276,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/management/CurrencyTab.tsx",
        lineNumber: 259,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/components/management/CurrencyTab.tsx",
        lineNumber: 258,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/management/CurrencyTab.tsx",
      lineNumber: 250,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/management/CurrencyTab.tsx",
    lineNumber: 180,
    columnNumber: 5
  }, this);
}

// app/components/management/BehaviourTab.tsx
import { useState as useState7, useMemo as useMemo3 } from "react";

// app/components/ui/toggle-group.tsx
import * as React4 from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { cva } from "class-variance-authority";

// app/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// app/components/ui/toggle-group.tsx
import { jsxDEV as jsxDEV9 } from "react/jsx-dev-runtime";
var toggleGroupVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground"
      },
      size: {
        default: "h-9 px-3",
        sm: "h-8 px-2",
        lg: "h-10 px-3"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), ToggleGroupContext = React4.createContext(
  {
    variant: "default",
    size: "default"
  }
), ToggleGroup = React4.forwardRef(({ className, variant, size, children, ...props }, ref) => /* @__PURE__ */ jsxDEV9(ToggleGroupContext.Provider, { value: { variant, size }, children: /* @__PURE__ */ jsxDEV9(
  ToggleGroupPrimitive.Root,
  {
    className: cn("flex items-center justify-center gap-1", className),
    ...props,
    ref,
    children
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/toggle-group.tsx",
    lineNumber: 43,
    columnNumber: 5
  },
  this
) }, void 0, !1, {
  fileName: "app/components/ui/toggle-group.tsx",
  lineNumber: 42,
  columnNumber: 3
}, this));
ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;
var ToggleGroupItem = React4.forwardRef(({ className, children, ...props }, ref) => {
  let context = React4.useContext(ToggleGroupContext);
  return /* @__PURE__ */ jsxDEV9(
    ToggleGroupPrimitive.Item,
    {
      ref,
      className: cn(
        toggleGroupVariants({
          variant: context.variant,
          size: context.size
        }),
        className
      ),
      ...props,
      children
    },
    void 0,
    !1,
    {
      fileName: "app/components/ui/toggle-group.tsx",
      lineNumber: 62,
      columnNumber: 5
    },
    this
  );
});
ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

// app/components/ui/input.tsx
import * as React5 from "react";
import { jsxDEV as jsxDEV10 } from "react/jsx-dev-runtime";
var Input = React5.forwardRef(
  ({ className, type, ...props }, ref) => /* @__PURE__ */ jsxDEV10(
    "input",
    {
      type,
      className: cn(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ref,
      ...props
    },
    void 0,
    !1,
    {
      fileName: "app/components/ui/input.tsx",
      lineNumber: 11,
      columnNumber: 7
    },
    this
  )
);
Input.displayName = "Input";

// app/components/ui/button.tsx
import * as React6 from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva as cva2 } from "class-variance-authority";
import { jsxDEV as jsxDEV11 } from "react/jsx-dev-runtime";
var buttonVariants = cva2(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), Button = React6.forwardRef(
  ({ className, variant, size, asChild = !1, ...props }, ref) => /* @__PURE__ */ jsxDEV11(
    asChild ? Slot : "button",
    {
      className: cn(buttonVariants({ variant, size, className })),
      ref,
      ...props
    },
    void 0,
    !1,
    {
      fileName: "app/components/ui/button.tsx",
      lineNumber: 46,
      columnNumber: 7
    },
    this
  )
);
Button.displayName = "Button";

// app/components/ui/label.tsx
import * as React7 from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva as cva3 } from "class-variance-authority";
import { jsxDEV as jsxDEV12 } from "react/jsx-dev-runtime";
var labelVariants = cva3(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
), Label = React7.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV12(
  LabelPrimitive.Root,
  {
    ref,
    className: cn(labelVariants(), className),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/label.tsx",
    lineNumber: 16,
    columnNumber: 3
  },
  this
));
Label.displayName = LabelPrimitive.Root.displayName;

// app/components/ui/select.tsx
import * as React8 from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { jsxDEV as jsxDEV13 } from "react/jsx-dev-runtime";
var Select = SelectPrimitive.Root, SelectGroup = SelectPrimitive.Group, SelectValue = SelectPrimitive.Value, SelectTrigger = React8.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxDEV13(
  SelectPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxDEV13(SelectPrimitive.Icon, { asChild: !0, children: /* @__PURE__ */ jsxDEV13(ChevronDown, { className: "h-4 w-4 opacity-50" }, void 0, !1, {
        fileName: "app/components/ui/select.tsx",
        lineNumber: 27,
        columnNumber: 7
      }, this) }, void 0, !1, {
        fileName: "app/components/ui/select.tsx",
        lineNumber: 26,
        columnNumber: 5
      }, this)
    ]
  },
  void 0,
  !0,
  {
    fileName: "app/components/ui/select.tsx",
    lineNumber: 17,
    columnNumber: 3
  },
  this
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
var SelectContent = React8.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsxDEV13(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxDEV13(
  SelectPrimitive.Content,
  {
    ref,
    className: cn(
      "relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-gray-100 dark:bg-gray-700 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: /* @__PURE__ */ jsxDEV13(
      SelectPrimitive.Viewport,
      {
        className: cn(
          "p-1",
          position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        ),
        children
      },
      void 0,
      !1,
      {
        fileName: "app/components/ui/select.tsx",
        lineNumber: 49,
        columnNumber: 7
      },
      this
    )
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/select.tsx",
    lineNumber: 38,
    columnNumber: 5
  },
  this
) }, void 0, !1, {
  fileName: "app/components/ui/select.tsx",
  lineNumber: 37,
  columnNumber: 3
}, this));
SelectContent.displayName = SelectPrimitive.Content.displayName;
var SelectLabel = React8.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV13(
  SelectPrimitive.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", className),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/select.tsx",
    lineNumber: 67,
    columnNumber: 3
  },
  this
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
var SelectItem = React8.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxDEV13(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsxDEV13("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxDEV13(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsxDEV13(Check, { className: "h-4 w-4" }, void 0, !1, {
        fileName: "app/components/ui/select.tsx",
        lineNumber: 89,
        columnNumber: 9
      }, this) }, void 0, !1, {
        fileName: "app/components/ui/select.tsx",
        lineNumber: 88,
        columnNumber: 7
      }, this) }, void 0, !1, {
        fileName: "app/components/ui/select.tsx",
        lineNumber: 87,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDEV13(SelectPrimitive.ItemText, { children }, void 0, !1, {
        fileName: "app/components/ui/select.tsx",
        lineNumber: 92,
        columnNumber: 5
      }, this)
    ]
  },
  void 0,
  !0,
  {
    fileName: "app/components/ui/select.tsx",
    lineNumber: 79,
    columnNumber: 3
  },
  this
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
var SelectSeparator = React8.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV13(
  SelectPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/select.tsx",
    lineNumber: 101,
    columnNumber: 3
  },
  this
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

// app/components/management/BehaviourTab.tsx
import { HistoryIcon as HistoryIcon2 } from "lucide-react";
import { jsxDEV as jsxDEV14 } from "react/jsx-dev-runtime";
function BehaviourTab() {
  let { addToast } = useToast(), [mode2, setMode] = useState7("reward"), [targetType, setTargetType] = useState7("user"), [targetId, setTargetId] = useState7(""), [amount, setAmount] = useState7(""), [reason, setReason] = useState7(""), [userSearchTerm, setUserSearchTerm] = useState7(""), [groupSearchTerm, setGroupSearchTerm] = useState7(""), users = useMemo3(() => [
    { id: "user1", name: "Alice Smith" },
    { id: "user2", name: "Bob Johnson" },
    { id: "user3", name: "Charlie Brown" },
    { id: "user4", name: "David Lee" },
    { id: "user5", name: "Eve Davis" },
    { id: "user6", name: "Frank White" },
    { id: "user7", name: "Grace Taylor" },
    { id: "user8", name: "Henry Clark" },
    { id: "user9", name: "Ivy Hall" },
    { id: "user10", name: "Jack King" }
  ], []), groups = useMemo3(() => [
    { id: "group1", name: "Developers" },
    { id: "group2", name: "Designers" },
    { id: "group3", name: "Marketing" },
    { id: "group4", name: "Sales" },
    { id: "group5", name: "Support" }
  ], []), [history, setHistory] = useState7([
    { id: 1, date: "2023-10-26 10:00", type: "reward", target: "Alice Smith", amount: 100, reason: "Excellent work", issuedBy: "AdminUser" },
    { id: 2, date: "2023-10-27 14:30", type: "fine", target: "Bob Johnson", amount: 50, reason: "Late submission", issuedBy: "AdminUser" }
  ]), filteredUsers = useMemo3(() => users.filter(
    (user) => user.name.toLowerCase().includes(userSearchTerm.toLowerCase())
  ), [users, userSearchTerm]), filteredGroups = useMemo3(() => groups.filter(
    (group) => group.name.toLowerCase().includes(groupSearchTerm.toLowerCase())
  ), [groups, groupSearchTerm]), handleSubmit = () => {
    let parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      addToast({
        title: "Action Failed",
        description: "Please enter a valid positive amount.",
        variant: "destructive"
      });
      return;
    }
    if (!targetId) {
      addToast({
        title: "Action Failed",
        description: `Please select a ${targetType}.`,
        variant: "destructive"
      });
      return;
    }
    let targetName = targetType === "user" ? users.find((u) => u.id === targetId)?.name : groups.find((g) => g.id === targetId)?.name;
    setHistory((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        date: (/* @__PURE__ */ new Date()).toLocaleString(),
        type: mode2,
        target: targetName || "Unknown",
        amount: parsedAmount,
        reason: reason || "No reason provided",
        issuedBy: "Current User (Simulated)"
      }
    ]), addToast({
      title: `${mode2 === "reward" ? "Reward" : "Fine"} Successful`,
      description: `${parsedAmount} ESSENCE ${mode2 === "reward" ? "rewarded to" : "fined from"} ${targetName}.`,
      variant: "default"
    }), setAmount(""), setReason(""), setTargetId("");
  };
  return /* @__PURE__ */ jsxDEV14("div", { className: "p-4", children: [
    /* @__PURE__ */ jsxDEV14("h2", { className: "text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100", children: "Behaviour Management" }, void 0, !1, {
      fileName: "app/components/management/BehaviourTab.tsx",
      lineNumber: 110,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV14("div", { className: "bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6", children: [
      /* @__PURE__ */ jsxDEV14("h3", { className: "text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100", children: [
        mode2 === "reward" ? "Reward" : "Fine",
        " Users/Groups"
      ] }, void 0, !0, {
        fileName: "app/components/management/BehaviourTab.tsx",
        lineNumber: 113,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV14("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsxDEV14(Label, { htmlFor: "mode-toggle", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Select Mode" }, void 0, !1, {
          fileName: "app/components/management/BehaviourTab.tsx",
          lineNumber: 118,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV14(
          ToggleGroup,
          {
            type: "single",
            value: mode2,
            onValueChange: (value) => value && setMode(value),
            className: "flex",
            children: [
              /* @__PURE__ */ jsxDEV14(
                ToggleGroupItem,
                {
                  value: "reward",
                  "aria-label": "Toggle reward",
                  className: cn(
                    "flex-1",
                    mode2 === "reward" && "data-[state=on]:bg-green-500 data-[state=on]:text-white"
                  ),
                  children: "Reward"
                },
                void 0,
                !1,
                {
                  fileName: "app/components/management/BehaviourTab.tsx",
                  lineNumber: 127,
                  columnNumber: 13
                },
                this
              ),
              /* @__PURE__ */ jsxDEV14(
                ToggleGroupItem,
                {
                  value: "fine",
                  "aria-label": "Toggle fine",
                  className: cn(
                    "flex-1",
                    mode2 === "fine" && "data-[state=on]:bg-red-500 data-[state=on]:text-white"
                  ),
                  children: "Fine"
                },
                void 0,
                !1,
                {
                  fileName: "app/components/management/BehaviourTab.tsx",
                  lineNumber: 137,
                  columnNumber: 13
                },
                this
              )
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/components/management/BehaviourTab.tsx",
            lineNumber: 121,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/components/management/BehaviourTab.tsx",
        lineNumber: 117,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV14("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-4", children: [
        /* @__PURE__ */ jsxDEV14("div", { children: [
          /* @__PURE__ */ jsxDEV14(Label, { htmlFor: "target-type", className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Target Type" }, void 0, !1, {
            fileName: "app/components/management/BehaviourTab.tsx",
            lineNumber: 152,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV14(Select, { value: targetType, onValueChange: (value) => {
            setTargetType(value), setTargetId("");
          }, children: [
            /* @__PURE__ */ jsxDEV14(SelectTrigger, { className: "w-full mt-1", children: /* @__PURE__ */ jsxDEV14(SelectValue, { placeholder: "Select target type" }, void 0, !1, {
              fileName: "app/components/management/BehaviourTab.tsx",
              lineNumber: 160,
              columnNumber: 17
            }, this) }, void 0, !1, {
              fileName: "app/components/management/BehaviourTab.tsx",
              lineNumber: 159,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV14(SelectContent, { className: "z-50", children: [
              /* @__PURE__ */ jsxDEV14(SelectItem, { value: "user", children: "User" }, void 0, !1, {
                fileName: "app/components/management/BehaviourTab.tsx",
                lineNumber: 163,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV14(SelectItem, { value: "group", children: "Group" }, void 0, !1, {
                fileName: "app/components/management/BehaviourTab.tsx",
                lineNumber: 164,
                columnNumber: 17
              }, this)
            ] }, void 0, !0, {
              fileName: "app/components/management/BehaviourTab.tsx",
              lineNumber: 162,
              columnNumber: 15
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/management/BehaviourTab.tsx",
            lineNumber: 155,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/management/BehaviourTab.tsx",
          lineNumber: 151,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV14("div", { children: [
          /* @__PURE__ */ jsxDEV14(Label, { htmlFor: "target-select", className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: [
            "Select ",
            targetType === "user" ? "User" : "Group"
          ] }, void 0, !0, {
            fileName: "app/components/management/BehaviourTab.tsx",
            lineNumber: 169,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV14(Select, { value: targetId, onValueChange: setTargetId, children: [
            /* @__PURE__ */ jsxDEV14(SelectTrigger, { className: "w-full mt-1", children: /* @__PURE__ */ jsxDEV14(SelectValue, { placeholder: `Select ${targetType}` }, void 0, !1, {
              fileName: "app/components/management/BehaviourTab.tsx",
              lineNumber: 174,
              columnNumber: 17
            }, this) }, void 0, !1, {
              fileName: "app/components/management/BehaviourTab.tsx",
              lineNumber: 173,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV14(SelectContent, { className: "z-50", children: targetType === "user" ? /* @__PURE__ */ jsxDEV14(SelectGroup, { children: [
              /* @__PURE__ */ jsxDEV14(SelectLabel, { children: /* @__PURE__ */ jsxDEV14(
                Input,
                {
                  placeholder: "Search users...",
                  value: userSearchTerm,
                  onChange: (e) => setUserSearchTerm(e.target.value),
                  className: "mb-2",
                  onClick: (e) => e.stopPropagation()
                },
                void 0,
                !1,
                {
                  fileName: "app/components/management/BehaviourTab.tsx",
                  lineNumber: 180,
                  columnNumber: 23
                },
                this
              ) }, void 0, !1, {
                fileName: "app/components/management/BehaviourTab.tsx",
                lineNumber: 179,
                columnNumber: 21
              }, this),
              filteredUsers.length > 0 ? filteredUsers.map((u) => /* @__PURE__ */ jsxDEV14(SelectItem, { value: u.id, children: u.name }, u.id, !1, {
                fileName: "app/components/management/BehaviourTab.tsx",
                lineNumber: 189,
                columnNumber: 46
              }, this)) : /* @__PURE__ */ jsxDEV14(SelectItem, { value: "no-user", disabled: !0, children: "No users found" }, void 0, !1, {
                fileName: "app/components/management/BehaviourTab.tsx",
                lineNumber: 191,
                columnNumber: 23
              }, this)
            ] }, void 0, !0, {
              fileName: "app/components/management/BehaviourTab.tsx",
              lineNumber: 178,
              columnNumber: 19
            }, this) : /* @__PURE__ */ jsxDEV14(SelectGroup, { children: [
              /* @__PURE__ */ jsxDEV14(SelectLabel, { children: /* @__PURE__ */ jsxDEV14(
                Input,
                {
                  placeholder: "Search groups...",
                  value: groupSearchTerm,
                  onChange: (e) => setGroupSearchTerm(e.target.value),
                  className: "mb-2",
                  onClick: (e) => e.stopPropagation()
                },
                void 0,
                !1,
                {
                  fileName: "app/components/management/BehaviourTab.tsx",
                  lineNumber: 197,
                  columnNumber: 23
                },
                this
              ) }, void 0, !1, {
                fileName: "app/components/management/BehaviourTab.tsx",
                lineNumber: 196,
                columnNumber: 21
              }, this),
              filteredGroups.length > 0 ? filteredGroups.map((g) => /* @__PURE__ */ jsxDEV14(SelectItem, { value: g.id, children: g.name }, g.id, !1, {
                fileName: "app/components/management/BehaviourTab.tsx",
                lineNumber: 206,
                columnNumber: 47
              }, this)) : /* @__PURE__ */ jsxDEV14(SelectItem, { value: "no-group", disabled: !0, children: "No groups found" }, void 0, !1, {
                fileName: "app/components/management/BehaviourTab.tsx",
                lineNumber: 208,
                columnNumber: 23
              }, this)
            ] }, void 0, !0, {
              fileName: "app/components/management/BehaviourTab.tsx",
              lineNumber: 195,
              columnNumber: 19
            }, this) }, void 0, !1, {
              fileName: "app/components/management/BehaviourTab.tsx",
              lineNumber: 176,
              columnNumber: 15
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/management/BehaviourTab.tsx",
            lineNumber: 172,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/management/BehaviourTab.tsx",
          lineNumber: 168,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/management/BehaviourTab.tsx",
        lineNumber: 150,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV14("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-4", children: [
        /* @__PURE__ */ jsxDEV14("div", { children: [
          /* @__PURE__ */ jsxDEV14(Label, { htmlFor: "amount", className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Amount (ESSENCE)" }, void 0, !1, {
            fileName: "app/components/management/BehaviourTab.tsx",
            lineNumber: 219,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV14(
            Input,
            {
              type: "number",
              id: "amount",
              placeholder: "e.g., 100",
              value: amount,
              onChange: (e) => setAmount(e.target.value),
              className: "mt-1"
            },
            void 0,
            !1,
            {
              fileName: "app/components/management/BehaviourTab.tsx",
              lineNumber: 222,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/components/management/BehaviourTab.tsx",
          lineNumber: 218,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV14("div", { children: [
          /* @__PURE__ */ jsxDEV14(Label, { htmlFor: "reason", className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Reason (Optional)" }, void 0, !1, {
            fileName: "app/components/management/BehaviourTab.tsx",
            lineNumber: 232,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV14(
            Input,
            {
              type: "text",
              id: "reason",
              placeholder: "e.g., Project completion bonus",
              value: reason,
              onChange: (e) => setReason(e.target.value),
              className: "mt-1"
            },
            void 0,
            !1,
            {
              fileName: "app/components/management/BehaviourTab.tsx",
              lineNumber: 235,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/components/management/BehaviourTab.tsx",
          lineNumber: 231,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/management/BehaviourTab.tsx",
        lineNumber: 217,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV14(
        Button,
        {
          onClick: handleSubmit,
          className: cn(
            "w-full mt-4",
            mode2 === "reward" ? "bg-green-600 hover:bg-green-700 text-white" : "bg-red-600 hover:bg-red-700 text-white"
          ),
          children: [
            mode2 === "reward" ? "Reward" : "Fine",
            " ",
            targetType === "user" ? "User" : "Group"
          ]
        },
        void 0,
        !0,
        {
          fileName: "app/components/management/BehaviourTab.tsx",
          lineNumber: 246,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/components/management/BehaviourTab.tsx",
      lineNumber: 112,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV14("div", { className: "bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md", children: [
      /* @__PURE__ */ jsxDEV14("h3", { className: "text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100 flex items-center", children: [
        /* @__PURE__ */ jsxDEV14(HistoryIcon2, { className: "h-5 w-5 mr-2" }, void 0, !1, {
          fileName: "app/components/management/BehaviourTab.tsx",
          lineNumber: 260,
          columnNumber: 11
        }, this),
        "Behaviour History"
      ] }, void 0, !0, {
        fileName: "app/components/management/BehaviourTab.tsx",
        lineNumber: 259,
        columnNumber: 9
      }, this),
      history.length === 0 ? /* @__PURE__ */ jsxDEV14("p", { className: "text-gray-500 dark:text-gray-400", children: "No behaviour history found." }, void 0, !1, {
        fileName: "app/components/management/BehaviourTab.tsx",
        lineNumber: 264,
        columnNumber: 11
      }, this) : /* @__PURE__ */ jsxDEV14("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxDEV14("table", { className: "min-w-full divide-y divide-gray-200 dark:divide-gray-700", children: [
        /* @__PURE__ */ jsxDEV14("thead", { className: "bg-gray-50 dark:bg-gray-700", children: /* @__PURE__ */ jsxDEV14("tr", { children: [
          /* @__PURE__ */ jsxDEV14("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300", children: "Date/Time" }, void 0, !1, {
            fileName: "app/components/management/BehaviourTab.tsx",
            lineNumber: 270,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV14("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300", children: "Type" }, void 0, !1, {
            fileName: "app/components/management/BehaviourTab.tsx",
            lineNumber: 273,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV14("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300", children: "Target" }, void 0, !1, {
            fileName: "app/components/management/BehaviourTab.tsx",
            lineNumber: 276,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV14("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300", children: "Amount" }, void 0, !1, {
            fileName: "app/components/management/BehaviourTab.tsx",
            lineNumber: 279,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV14("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300", children: "Reason" }, void 0, !1, {
            fileName: "app/components/management/BehaviourTab.tsx",
            lineNumber: 282,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV14("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300", children: "Issued By" }, void 0, !1, {
            fileName: "app/components/management/BehaviourTab.tsx",
            lineNumber: 285,
            columnNumber: 19
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/management/BehaviourTab.tsx",
          lineNumber: 269,
          columnNumber: 17
        }, this) }, void 0, !1, {
          fileName: "app/components/management/BehaviourTab.tsx",
          lineNumber: 268,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV14("tbody", { className: "bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700", children: history.map((record) => /* @__PURE__ */ jsxDEV14("tr", { children: [
          /* @__PURE__ */ jsxDEV14("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100", children: record.date }, void 0, !1, {
            fileName: "app/components/management/BehaviourTab.tsx",
            lineNumber: 293,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV14("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 capitalize", children: record.type }, void 0, !1, {
            fileName: "app/components/management/BehaviourTab.tsx",
            lineNumber: 296,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV14("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300", children: record.target }, void 0, !1, {
            fileName: "app/components/management/BehaviourTab.tsx",
            lineNumber: 299,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV14("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300", children: [
            record.amount.toLocaleString(),
            " ESSENCE"
          ] }, void 0, !0, {
            fileName: "app/components/management/BehaviourTab.tsx",
            lineNumber: 302,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV14("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300", children: record.reason }, void 0, !1, {
            fileName: "app/components/management/BehaviourTab.tsx",
            lineNumber: 305,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV14("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300", children: record.issuedBy }, void 0, !1, {
            fileName: "app/components/management/BehaviourTab.tsx",
            lineNumber: 308,
            columnNumber: 21
          }, this)
        ] }, record.id, !0, {
          fileName: "app/components/management/BehaviourTab.tsx",
          lineNumber: 292,
          columnNumber: 19
        }, this)) }, void 0, !1, {
          fileName: "app/components/management/BehaviourTab.tsx",
          lineNumber: 290,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/management/BehaviourTab.tsx",
        lineNumber: 267,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/components/management/BehaviourTab.tsx",
        lineNumber: 266,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/management/BehaviourTab.tsx",
      lineNumber: 258,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/management/BehaviourTab.tsx",
    lineNumber: 109,
    columnNumber: 5
  }, this);
}

// app/components/management/EconomyTab.tsx
import { useState as useState12 } from "react";
import { Tab } from "@headlessui/react";
import { PlusCircleIcon, MinusCircleIcon, UserPlusIcon, UserMinusIcon } from "lucide-react";

// app/components/management/economy/AddActivityTab.tsx
import { useState as useState8 } from "react";
import { Form as Form2 } from "@remix-run/react";
import { jsxDEV as jsxDEV15 } from "react/jsx-dev-runtime";
function AddActivityTab() {
  let { addToast } = useToast(), [activities, setActivities] = useState8([]), [activityName, setActivityName] = useState8(""), [description, setDescription] = useState8(""), [pay, setPay] = useState8(""), [paymentFrequency, setPaymentFrequency] = useState8(""), [slotsAvailable, setSlotsAvailable] = useState8("");
  return /* @__PURE__ */ jsxDEV15("div", { className: "p-4", children: [
    /* @__PURE__ */ jsxDEV15("h3", { className: "text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100", children: "Add New Activity" }, void 0, !1, {
      fileName: "app/components/management/economy/AddActivityTab.tsx",
      lineNumber: 55,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV15("p", { className: "text-gray-700 dark:text-gray-300 mb-6", children: "Define new activities that users can participate in to earn ESSENCE." }, void 0, !1, {
      fileName: "app/components/management/economy/AddActivityTab.tsx",
      lineNumber: 56,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV15(Form2, { onSubmit: (event) => {
      event.preventDefault();
      let newActivity = {
        id: Date.now().toString(),
        name: activityName,
        description,
        pay: parseFloat(pay),
        frequency: paymentFrequency,
        slotsAvailable: parseInt(slotsAvailable),
        createdDate: (/* @__PURE__ */ new Date()).toLocaleDateString()
      };
      setActivities([...activities, newActivity]), addToast({
        title: "Activity Created",
        description: `Activity '${activityName}' created successfully.`,
        variant: "success"
      }), setActivityName(""), setDescription(""), setPay(""), setPaymentFrequency(""), setSlotsAvailable("");
    }, className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-8", children: [
      /* @__PURE__ */ jsxDEV15("div", { children: [
        /* @__PURE__ */ jsxDEV15(Label, { htmlFor: "activityName", className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Activity Name" }, void 0, !1, {
          fileName: "app/components/management/economy/AddActivityTab.tsx",
          lineNumber: 62,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV15(
          Input,
          {
            id: "activityName",
            name: "activityName",
            type: "text",
            value: activityName,
            onChange: (e) => setActivityName(e.target.value),
            required: !0,
            className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          },
          void 0,
          !1,
          {
            fileName: "app/components/management/economy/AddActivityTab.tsx",
            lineNumber: 63,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/components/management/economy/AddActivityTab.tsx",
        lineNumber: 61,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV15("div", { children: [
        /* @__PURE__ */ jsxDEV15(Label, { htmlFor: "description", className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Description" }, void 0, !1, {
          fileName: "app/components/management/economy/AddActivityTab.tsx",
          lineNumber: 74,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV15(
          Input,
          {
            id: "description",
            name: "description",
            type: "text",
            value: description,
            onChange: (e) => setDescription(e.target.value),
            className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          },
          void 0,
          !1,
          {
            fileName: "app/components/management/economy/AddActivityTab.tsx",
            lineNumber: 75,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/components/management/economy/AddActivityTab.tsx",
        lineNumber: 73,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV15("div", { children: [
        /* @__PURE__ */ jsxDEV15(Label, { htmlFor: "pay", className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Pay (ESSENCE)" }, void 0, !1, {
          fileName: "app/components/management/economy/AddActivityTab.tsx",
          lineNumber: 85,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV15(
          Input,
          {
            id: "pay",
            name: "pay",
            type: "number",
            value: pay,
            onChange: (e) => setPay(e.target.value),
            required: !0,
            min: "0",
            step: "0.01",
            className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          },
          void 0,
          !1,
          {
            fileName: "app/components/management/economy/AddActivityTab.tsx",
            lineNumber: 86,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/components/management/economy/AddActivityTab.tsx",
        lineNumber: 84,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV15("div", { children: [
        /* @__PURE__ */ jsxDEV15(Label, { htmlFor: "paymentFrequency", className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Payment Frequency" }, void 0, !1, {
          fileName: "app/components/management/economy/AddActivityTab.tsx",
          lineNumber: 99,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV15(Select, { onValueChange: setPaymentFrequency, value: paymentFrequency, required: !0, children: [
          /* @__PURE__ */ jsxDEV15(SelectTrigger, { className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100", children: /* @__PURE__ */ jsxDEV15(SelectValue, { placeholder: "Select frequency" }, void 0, !1, {
            fileName: "app/components/management/economy/AddActivityTab.tsx",
            lineNumber: 102,
            columnNumber: 15
          }, this) }, void 0, !1, {
            fileName: "app/components/management/economy/AddActivityTab.tsx",
            lineNumber: 101,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV15(SelectContent, { className: "dark:bg-gray-800 dark:border-gray-600", children: [
            /* @__PURE__ */ jsxDEV15(SelectItem, { value: "Daily", children: "Daily" }, void 0, !1, {
              fileName: "app/components/management/economy/AddActivityTab.tsx",
              lineNumber: 105,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV15(SelectItem, { value: "Weekly", children: "Weekly" }, void 0, !1, {
              fileName: "app/components/management/economy/AddActivityTab.tsx",
              lineNumber: 106,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV15(SelectItem, { value: "Monthly", children: "Monthly" }, void 0, !1, {
              fileName: "app/components/management/economy/AddActivityTab.tsx",
              lineNumber: 107,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV15(SelectItem, { value: "One-time", children: "One-time" }, void 0, !1, {
              fileName: "app/components/management/economy/AddActivityTab.tsx",
              lineNumber: 108,
              columnNumber: 15
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/management/economy/AddActivityTab.tsx",
            lineNumber: 104,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/management/economy/AddActivityTab.tsx",
          lineNumber: 100,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/management/economy/AddActivityTab.tsx",
        lineNumber: 98,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV15("div", { children: [
        /* @__PURE__ */ jsxDEV15(Label, { htmlFor: "slotsAvailable", className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Slots Available" }, void 0, !1, {
          fileName: "app/components/management/economy/AddActivityTab.tsx",
          lineNumber: 113,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV15(
          Input,
          {
            id: "slotsAvailable",
            name: "slotsAvailable",
            type: "number",
            value: slotsAvailable,
            onChange: (e) => setSlotsAvailable(e.target.value),
            required: !0,
            min: "0",
            className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          },
          void 0,
          !1,
          {
            fileName: "app/components/management/economy/AddActivityTab.tsx",
            lineNumber: 114,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/components/management/economy/AddActivityTab.tsx",
        lineNumber: 112,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV15("div", { className: "md:col-span-2 flex justify-end", children: /* @__PURE__ */ jsxDEV15(Button, { type: "submit", className: "bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md", children: "Add Activity" }, void 0, !1, {
        fileName: "app/components/management/economy/AddActivityTab.tsx",
        lineNumber: 126,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/components/management/economy/AddActivityTab.tsx",
        lineNumber: 125,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/management/economy/AddActivityTab.tsx",
      lineNumber: 60,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV15("h4", { className: "text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100", children: "Existing Activities" }, void 0, !1, {
      fileName: "app/components/management/economy/AddActivityTab.tsx",
      lineNumber: 132,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV15("div", { className: "mb-4 flex space-x-2", children: /* @__PURE__ */ jsxDEV15(Input, { placeholder: "Search activities...", className: "flex-grow dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" }, void 0, !1, {
      fileName: "app/components/management/economy/AddActivityTab.tsx",
      lineNumber: 134,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/components/management/economy/AddActivityTab.tsx",
      lineNumber: 133,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV15("div", { className: "overflow-x-auto rounded-md shadow-sm", children: /* @__PURE__ */ jsxDEV15("table", { className: "min-w-full divide-y divide-gray-200 dark:divide-gray-700", children: [
      /* @__PURE__ */ jsxDEV15("thead", { className: "bg-gray-50 dark:bg-gray-800", children: /* @__PURE__ */ jsxDEV15("tr", { children: [
        /* @__PURE__ */ jsxDEV15("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300", children: "Activity Name" }, void 0, !1, {
          fileName: "app/components/management/economy/AddActivityTab.tsx",
          lineNumber: 141,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV15("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300", children: "Description" }, void 0, !1, {
          fileName: "app/components/management/economy/AddActivityTab.tsx",
          lineNumber: 142,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV15("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300", children: "Pay" }, void 0, !1, {
          fileName: "app/components/management/economy/AddActivityTab.tsx",
          lineNumber: 143,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV15("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300", children: "Frequency" }, void 0, !1, {
          fileName: "app/components/management/economy/AddActivityTab.tsx",
          lineNumber: 144,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV15("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300", children: "Slots Available" }, void 0, !1, {
          fileName: "app/components/management/economy/AddActivityTab.tsx",
          lineNumber: 145,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV15("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300", children: "Created Date" }, void 0, !1, {
          fileName: "app/components/management/economy/AddActivityTab.tsx",
          lineNumber: 146,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/management/economy/AddActivityTab.tsx",
        lineNumber: 140,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/components/management/economy/AddActivityTab.tsx",
        lineNumber: 139,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV15("tbody", { className: "bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700", children: activities.length === 0 ? /* @__PURE__ */ jsxDEV15("tr", { children: /* @__PURE__ */ jsxDEV15("td", { colSpan: 6, className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center dark:text-gray-400", children: "No activities created yet." }, void 0, !1, {
        fileName: "app/components/management/economy/AddActivityTab.tsx",
        lineNumber: 152,
        columnNumber: 17
      }, this) }, void 0, !1, {
        fileName: "app/components/management/economy/AddActivityTab.tsx",
        lineNumber: 151,
        columnNumber: 15
      }, this) : activities.map((activity) => /* @__PURE__ */ jsxDEV15("tr", { children: [
        /* @__PURE__ */ jsxDEV15("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100", children: activity.name }, void 0, !1, {
          fileName: "app/components/management/economy/AddActivityTab.tsx",
          lineNumber: 159,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV15("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300", children: activity.description }, void 0, !1, {
          fileName: "app/components/management/economy/AddActivityTab.tsx",
          lineNumber: 160,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV15("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300", children: activity.pay }, void 0, !1, {
          fileName: "app/components/management/economy/AddActivityTab.tsx",
          lineNumber: 161,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV15("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300", children: activity.frequency }, void 0, !1, {
          fileName: "app/components/management/economy/AddActivityTab.tsx",
          lineNumber: 162,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV15("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300", children: activity.slotsAvailable }, void 0, !1, {
          fileName: "app/components/management/economy/AddActivityTab.tsx",
          lineNumber: 163,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV15("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300", children: activity.createdDate }, void 0, !1, {
          fileName: "app/components/management/economy/AddActivityTab.tsx",
          lineNumber: 164,
          columnNumber: 19
        }, this)
      ] }, activity.id, !0, {
        fileName: "app/components/management/economy/AddActivityTab.tsx",
        lineNumber: 158,
        columnNumber: 17
      }, this)) }, void 0, !1, {
        fileName: "app/components/management/economy/AddActivityTab.tsx",
        lineNumber: 149,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/management/economy/AddActivityTab.tsx",
      lineNumber: 138,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/components/management/economy/AddActivityTab.tsx",
      lineNumber: 137,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/management/economy/AddActivityTab.tsx",
    lineNumber: 54,
    columnNumber: 5
  }, this);
}

// app/components/management/economy/AddExpenseTab.tsx
import { useState as useState9 } from "react";
import { Form as Form3 } from "@remix-run/react";
import { jsxDEV as jsxDEV16 } from "react/jsx-dev-runtime";
function AddExpenseTab() {
  let { addToast } = useToast(), [expenses, setExpenses] = useState9([]), [expenseName, setExpenseName] = useState9(""), [description, setDescription] = useState9(""), [cost, setCost] = useState9(""), [expenseFrequency, setExpenseFrequency] = useState9("");
  return /* @__PURE__ */ jsxDEV16("div", { className: "p-4", children: [
    /* @__PURE__ */ jsxDEV16("h3", { className: "text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100", children: "Add New Expense" }, void 0, !1, {
      fileName: "app/components/management/economy/AddExpenseTab.tsx",
      lineNumber: 51,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV16("p", { className: "text-gray-700 dark:text-gray-300 mb-6", children: "Define new expenses that can be deducted from users\u2019 balances." }, void 0, !1, {
      fileName: "app/components/management/economy/AddExpenseTab.tsx",
      lineNumber: 52,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV16(Form3, { onSubmit: (event) => {
      event.preventDefault();
      let newExpense = {
        id: Date.now().toString(),
        name: expenseName,
        description,
        cost: parseFloat(cost),
        frequency: expenseFrequency,
        createdDate: (/* @__PURE__ */ new Date()).toLocaleDateString()
      };
      setExpenses([...expenses, newExpense]), addToast({
        title: "Expense Added",
        description: `Expense '${expenseName}' added successfully.`,
        variant: "success"
      }), setExpenseName(""), setDescription(""), setCost(""), setExpenseFrequency("");
    }, className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-8", children: [
      /* @__PURE__ */ jsxDEV16("div", { children: [
        /* @__PURE__ */ jsxDEV16(Label, { htmlFor: "expenseName", className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Expense Name" }, void 0, !1, {
          fileName: "app/components/management/economy/AddExpenseTab.tsx",
          lineNumber: 58,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV16(
          Input,
          {
            id: "expenseName",
            name: "expenseName",
            type: "text",
            value: expenseName,
            onChange: (e) => setExpenseName(e.target.value),
            required: !0,
            className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          },
          void 0,
          !1,
          {
            fileName: "app/components/management/economy/AddExpenseTab.tsx",
            lineNumber: 59,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/components/management/economy/AddExpenseTab.tsx",
        lineNumber: 57,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV16("div", { children: [
        /* @__PURE__ */ jsxDEV16(Label, { htmlFor: "description", className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Description" }, void 0, !1, {
          fileName: "app/components/management/economy/AddExpenseTab.tsx",
          lineNumber: 70,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV16(
          Input,
          {
            id: "description",
            name: "description",
            type: "text",
            value: description,
            onChange: (e) => setDescription(e.target.value),
            className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          },
          void 0,
          !1,
          {
            fileName: "app/components/management/economy/AddExpenseTab.tsx",
            lineNumber: 71,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/components/management/economy/AddExpenseTab.tsx",
        lineNumber: 69,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV16("div", { children: [
        /* @__PURE__ */ jsxDEV16(Label, { htmlFor: "cost", className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Cost (ESSENCE)" }, void 0, !1, {
          fileName: "app/components/management/economy/AddExpenseTab.tsx",
          lineNumber: 81,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV16(
          Input,
          {
            id: "cost",
            name: "cost",
            type: "number",
            value: cost,
            onChange: (e) => setCost(e.target.value),
            required: !0,
            min: "0",
            step: "0.01",
            className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          },
          void 0,
          !1,
          {
            fileName: "app/components/management/economy/AddExpenseTab.tsx",
            lineNumber: 82,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/components/management/economy/AddExpenseTab.tsx",
        lineNumber: 80,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV16("div", { children: [
        /* @__PURE__ */ jsxDEV16(Label, { htmlFor: "expenseFrequency", className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Expense Frequency" }, void 0, !1, {
          fileName: "app/components/management/economy/AddExpenseTab.tsx",
          lineNumber: 95,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV16(Select, { onValueChange: setExpenseFrequency, value: expenseFrequency, required: !0, children: [
          /* @__PURE__ */ jsxDEV16(SelectTrigger, { className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100", children: /* @__PURE__ */ jsxDEV16(SelectValue, { placeholder: "Select frequency" }, void 0, !1, {
            fileName: "app/components/management/economy/AddExpenseTab.tsx",
            lineNumber: 98,
            columnNumber: 15
          }, this) }, void 0, !1, {
            fileName: "app/components/management/economy/AddExpenseTab.tsx",
            lineNumber: 97,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV16(SelectContent, { className: "dark:bg-gray-800 dark:border-gray-600", children: [
            /* @__PURE__ */ jsxDEV16(SelectItem, { value: "One-time", children: "One-time" }, void 0, !1, {
              fileName: "app/components/management/economy/AddExpenseTab.tsx",
              lineNumber: 101,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV16(SelectItem, { value: "Daily", children: "Daily" }, void 0, !1, {
              fileName: "app/components/management/economy/AddExpenseTab.tsx",
              lineNumber: 102,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV16(SelectItem, { value: "Weekly", children: "Weekly" }, void 0, !1, {
              fileName: "app/components/management/economy/AddExpenseTab.tsx",
              lineNumber: 103,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV16(SelectItem, { value: "Monthly", children: "Monthly" }, void 0, !1, {
              fileName: "app/components/management/economy/AddExpenseTab.tsx",
              lineNumber: 104,
              columnNumber: 15
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/management/economy/AddExpenseTab.tsx",
            lineNumber: 100,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/management/economy/AddExpenseTab.tsx",
          lineNumber: 96,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/management/economy/AddExpenseTab.tsx",
        lineNumber: 94,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV16("div", { className: "md:col-span-2 flex justify-end", children: /* @__PURE__ */ jsxDEV16(Button, { type: "submit", className: "bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md", children: "Add Expense" }, void 0, !1, {
        fileName: "app/components/management/economy/AddExpenseTab.tsx",
        lineNumber: 109,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/components/management/economy/AddExpenseTab.tsx",
        lineNumber: 108,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/management/economy/AddExpenseTab.tsx",
      lineNumber: 56,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV16("h4", { className: "text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100", children: "Existing Expenses" }, void 0, !1, {
      fileName: "app/components/management/economy/AddExpenseTab.tsx",
      lineNumber: 115,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV16("div", { className: "mb-4 flex space-x-2", children: /* @__PURE__ */ jsxDEV16(Input, { placeholder: "Search expenses...", className: "flex-grow dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" }, void 0, !1, {
      fileName: "app/components/management/economy/AddExpenseTab.tsx",
      lineNumber: 117,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/components/management/economy/AddExpenseTab.tsx",
      lineNumber: 116,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV16("div", { className: "overflow-x-auto rounded-md shadow-sm", children: /* @__PURE__ */ jsxDEV16("table", { className: "min-w-full divide-y divide-gray-200 dark:divide-gray-700", children: [
      /* @__PURE__ */ jsxDEV16("thead", { className: "bg-gray-50 dark:bg-gray-800", children: /* @__PURE__ */ jsxDEV16("tr", { children: [
        /* @__PURE__ */ jsxDEV16("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300", children: "Expense Name" }, void 0, !1, {
          fileName: "app/components/management/economy/AddExpenseTab.tsx",
          lineNumber: 124,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV16("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300", children: "Description" }, void 0, !1, {
          fileName: "app/components/management/economy/AddExpenseTab.tsx",
          lineNumber: 125,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV16("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300", children: "Cost" }, void 0, !1, {
          fileName: "app/components/management/economy/AddExpenseTab.tsx",
          lineNumber: 126,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV16("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300", children: "Frequency" }, void 0, !1, {
          fileName: "app/components/management/economy/AddExpenseTab.tsx",
          lineNumber: 127,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV16("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300", children: "Created Date" }, void 0, !1, {
          fileName: "app/components/management/economy/AddExpenseTab.tsx",
          lineNumber: 128,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/management/economy/AddExpenseTab.tsx",
        lineNumber: 123,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/components/management/economy/AddExpenseTab.tsx",
        lineNumber: 122,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV16("tbody", { className: "bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700", children: expenses.length === 0 ? /* @__PURE__ */ jsxDEV16("tr", { children: /* @__PURE__ */ jsxDEV16("td", { colSpan: 5, className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center dark:text-gray-400", children: "No expenses added yet." }, void 0, !1, {
        fileName: "app/components/management/economy/AddExpenseTab.tsx",
        lineNumber: 134,
        columnNumber: 17
      }, this) }, void 0, !1, {
        fileName: "app/components/management/economy/AddExpenseTab.tsx",
        lineNumber: 133,
        columnNumber: 15
      }, this) : expenses.map((expense) => /* @__PURE__ */ jsxDEV16("tr", { children: [
        /* @__PURE__ */ jsxDEV16("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100", children: expense.name }, void 0, !1, {
          fileName: "app/components/management/economy/AddExpenseTab.tsx",
          lineNumber: 141,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV16("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300", children: expense.description }, void 0, !1, {
          fileName: "app/components/management/economy/AddExpenseTab.tsx",
          lineNumber: 142,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV16("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300", children: expense.cost }, void 0, !1, {
          fileName: "app/components/management/economy/AddExpenseTab.tsx",
          lineNumber: 143,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV16("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300", children: expense.frequency }, void 0, !1, {
          fileName: "app/components/management/economy/AddExpenseTab.tsx",
          lineNumber: 144,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV16("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300", children: expense.createdDate }, void 0, !1, {
          fileName: "app/components/management/economy/AddExpenseTab.tsx",
          lineNumber: 145,
          columnNumber: 19
        }, this)
      ] }, expense.id, !0, {
        fileName: "app/components/management/economy/AddExpenseTab.tsx",
        lineNumber: 140,
        columnNumber: 17
      }, this)) }, void 0, !1, {
        fileName: "app/components/management/economy/AddExpenseTab.tsx",
        lineNumber: 131,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/management/economy/AddExpenseTab.tsx",
      lineNumber: 121,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/components/management/economy/AddExpenseTab.tsx",
      lineNumber: 120,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/management/economy/AddExpenseTab.tsx",
    lineNumber: 50,
    columnNumber: 5
  }, this);
}

// app/components/management/economy/AssignActivityTab.tsx
import { useState as useState10 } from "react";
import { Form as Form4 } from "@remix-run/react";
import { jsxDEV as jsxDEV17 } from "react/jsx-dev-runtime";
function AssignActivityTab() {
  let { addToast } = useToast(), [assignTo, setAssignTo] = useState10("User"), [selectedAssignee, setSelectedAssignee] = useState10(""), [selectedActivity, setSelectedActivity] = useState10(""), [assignedActivities, setAssignedActivities] = useState10([]), [assigneeSearchTerm, setAssigneeSearchTerm] = useState10(""), [activitySearchTerm, setActivitySearchTerm] = useState10(""), users = [
    { id: "user1", name: "Alice Smith" },
    { id: "user2", name: "Bob Johnson" },
    { id: "user3", name: "Charlie Brown" },
    { id: "user4", name: "David Lee" },
    { id: "user5", name: "Eve Davis" }
  ], groups = [
    { id: "group1", name: "Developers" },
    { id: "group2", name: "Designers" },
    { id: "group3", name: "Marketing" },
    { id: "group4", name: "Sales" },
    { id: "group5", name: "HR" }
  ], activities = [
    { id: "act1", name: "Daily Code Review" },
    { id: "act2", name: "Weekly Standup" },
    { id: "act3", name: "Client Meeting" },
    { id: "act4", name: "Project Planning" },
    { id: "act5", name: "Bug Fixing Session" }
  ], filteredAssignees = (assignTo === "User" ? users : groups).filter(
    (item) => item.name.toLowerCase().includes(assigneeSearchTerm.toLowerCase())
  ), filteredActivities = activities.filter(
    (activity) => activity.name.toLowerCase().includes(activitySearchTerm.toLowerCase())
  ), handleAssign = (event) => {
    event.preventDefault();
    let assignee = assignTo === "User" ? users.find((u) => u.id === selectedAssignee) : groups.find((g) => g.id === selectedAssignee), activity = activities.find((a) => a.id === selectedActivity);
    if (!assignee || !activity) {
      addToast({
        title: "Assignment Failed",
        description: "Please select a valid assignee and activity.",
        variant: "destructive"
      });
      return;
    }
    let newAssignment = {
      id: Date.now().toString(),
      assigneeName: assignee.name,
      assigneeType: assignTo,
      activityName: activity.name,
      assignedDate: (/* @__PURE__ */ new Date()).toLocaleDateString(),
      assignedBy: "Admin User"
      // This should come from authenticated user context
    };
    setAssignedActivities([...assignedActivities, newAssignment]), addToast({
      title: "Activity Assigned",
      description: `Activity '${activity.name}' assigned to ${assignee.name}.`,
      variant: "success"
    }), setSelectedAssignee(""), setSelectedActivity(""), setAssigneeSearchTerm(""), setActivitySearchTerm("");
  }, handleUnassign = (id) => {
    setAssignedActivities(assignedActivities.filter((assignment) => assignment.id !== id)), addToast({
      title: "Assignment Removed",
      description: "Activity assignment removed successfully.",
      variant: "success"
    });
  };
  return /* @__PURE__ */ jsxDEV17("div", { className: "p-4", children: [
    /* @__PURE__ */ jsxDEV17("h3", { className: "text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100", children: "Assign Activity" }, void 0, !1, {
      fileName: "app/components/management/economy/AssignActivityTab.tsx",
      lineNumber: 105,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV17("p", { className: "text-gray-700 dark:text-gray-300 mb-6", children: "Assign specific activities to users or groups." }, void 0, !1, {
      fileName: "app/components/management/economy/AssignActivityTab.tsx",
      lineNumber: 106,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV17(Form4, { onSubmit: handleAssign, className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-8", children: [
      /* @__PURE__ */ jsxDEV17("div", { className: "md:col-span-2", children: [
        /* @__PURE__ */ jsxDEV17(Label, { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Assign To" }, void 0, !1, {
          fileName: "app/components/management/economy/AssignActivityTab.tsx",
          lineNumber: 112,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV17(ToggleGroup, { type: "single", value: assignTo, onValueChange: (value) => {
          setAssignTo(value), setSelectedAssignee(""), setAssigneeSearchTerm("");
        }, className: "w-full", children: [
          /* @__PURE__ */ jsxDEV17(ToggleGroupItem, { value: "User", className: "flex-1 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 data-[state=on]:bg-blue-500 data-[state=on]:text-white dark:data-[state=on]:bg-blue-600", children: "User" }, void 0, !1, {
            fileName: "app/components/management/economy/AssignActivityTab.tsx",
            lineNumber: 118,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV17(ToggleGroupItem, { value: "Group", className: "flex-1 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 data-[state=on]:bg-blue-500 data-[state=on]:text-white dark:data-[state=on]:bg-blue-600", children: "Group" }, void 0, !1, {
            fileName: "app/components/management/economy/AssignActivityTab.tsx",
            lineNumber: 119,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/management/economy/AssignActivityTab.tsx",
          lineNumber: 113,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/management/economy/AssignActivityTab.tsx",
        lineNumber: 111,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV17("div", { children: [
        /* @__PURE__ */ jsxDEV17(Label, { htmlFor: "assigneeSelector", className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: [
          assignTo,
          " Selector"
        ] }, void 0, !0, {
          fileName: "app/components/management/economy/AssignActivityTab.tsx",
          lineNumber: 124,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV17(Select, { onValueChange: setSelectedAssignee, value: selectedAssignee, required: !0, children: [
          /* @__PURE__ */ jsxDEV17(SelectTrigger, { id: "assigneeSelector", className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100", children: /* @__PURE__ */ jsxDEV17(SelectValue, { placeholder: `Select ${assignTo.toLowerCase()}` }, void 0, !1, {
            fileName: "app/components/management/economy/AssignActivityTab.tsx",
            lineNumber: 127,
            columnNumber: 15
          }, this) }, void 0, !1, {
            fileName: "app/components/management/economy/AssignActivityTab.tsx",
            lineNumber: 126,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV17(SelectContent, { className: "dark:bg-gray-800 dark:border-gray-600", children: [
            /* @__PURE__ */ jsxDEV17(
              Input,
              {
                placeholder: `Search ${assignTo.toLowerCase()}s...`,
                className: "mb-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100",
                value: assigneeSearchTerm,
                onChange: (e) => setAssigneeSearchTerm(e.target.value),
                onClick: (e) => e.stopPropagation()
              },
              void 0,
              !1,
              {
                fileName: "app/components/management/economy/AssignActivityTab.tsx",
                lineNumber: 130,
                columnNumber: 15
              },
              this
            ),
            filteredAssignees.length === 0 ? /* @__PURE__ */ jsxDEV17(SelectItem, { value: "no-results", disabled: !0, children: "No results found" }, void 0, !1, {
              fileName: "app/components/management/economy/AssignActivityTab.tsx",
              lineNumber: 138,
              columnNumber: 17
            }, this) : filteredAssignees.map((item) => /* @__PURE__ */ jsxDEV17(SelectItem, { value: item.id, children: item.name }, item.id, !1, {
              fileName: "app/components/management/economy/AssignActivityTab.tsx",
              lineNumber: 141,
              columnNumber: 19
            }, this))
          ] }, void 0, !0, {
            fileName: "app/components/management/economy/AssignActivityTab.tsx",
            lineNumber: 129,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/management/economy/AssignActivityTab.tsx",
          lineNumber: 125,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/management/economy/AssignActivityTab.tsx",
        lineNumber: 123,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV17("div", { children: [
        /* @__PURE__ */ jsxDEV17(Label, { htmlFor: "activitySelector", className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Activity Selector" }, void 0, !1, {
          fileName: "app/components/management/economy/AssignActivityTab.tsx",
          lineNumber: 149,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV17(Select, { onValueChange: setSelectedActivity, value: selectedActivity, required: !0, children: [
          /* @__PURE__ */ jsxDEV17(SelectTrigger, { id: "activitySelector", className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100", children: /* @__PURE__ */ jsxDEV17(SelectValue, { placeholder: "Select activity" }, void 0, !1, {
            fileName: "app/components/management/economy/AssignActivityTab.tsx",
            lineNumber: 152,
            columnNumber: 15
          }, this) }, void 0, !1, {
            fileName: "app/components/management/economy/AssignActivityTab.tsx",
            lineNumber: 151,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV17(SelectContent, { className: "dark:bg-gray-800 dark:border-gray-600", children: [
            /* @__PURE__ */ jsxDEV17(
              Input,
              {
                placeholder: "Search activities...",
                className: "mb-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100",
                value: activitySearchTerm,
                onChange: (e) => setActivitySearchTerm(e.target.value),
                onClick: (e) => e.stopPropagation()
              },
              void 0,
              !1,
              {
                fileName: "app/components/management/economy/AssignActivityTab.tsx",
                lineNumber: 155,
                columnNumber: 15
              },
              this
            ),
            filteredActivities.length === 0 ? /* @__PURE__ */ jsxDEV17(SelectItem, { value: "no-results", disabled: !0, children: "No results found" }, void 0, !1, {
              fileName: "app/components/management/economy/AssignActivityTab.tsx",
              lineNumber: 163,
              columnNumber: 17
            }, this) : filteredActivities.map((activity) => /* @__PURE__ */ jsxDEV17(SelectItem, { value: activity.id, children: activity.name }, activity.id, !1, {
              fileName: "app/components/management/economy/AssignActivityTab.tsx",
              lineNumber: 166,
              columnNumber: 19
            }, this))
          ] }, void 0, !0, {
            fileName: "app/components/management/economy/AssignActivityTab.tsx",
            lineNumber: 154,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/management/economy/AssignActivityTab.tsx",
          lineNumber: 150,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/management/economy/AssignActivityTab.tsx",
        lineNumber: 148,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV17("div", { className: "md:col-span-2 flex justify-end", children: /* @__PURE__ */ jsxDEV17(Button, { type: "submit", className: "bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md", children: "Assign Activity" }, void 0, !1, {
        fileName: "app/components/management/economy/AssignActivityTab.tsx",
        lineNumber: 174,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/components/management/economy/AssignActivityTab.tsx",
        lineNumber: 173,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/management/economy/AssignActivityTab.tsx",
      lineNumber: 110,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV17("h4", { className: "text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100", children: "Current Activity Assignments" }, void 0, !1, {
      fileName: "app/components/management/economy/AssignActivityTab.tsx",
      lineNumber: 180,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV17("div", { className: "mb-4 flex space-x-2", children: /* @__PURE__ */ jsxDEV17(Input, { placeholder: "Search assignments...", className: "flex-grow dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" }, void 0, !1, {
      fileName: "app/components/management/economy/AssignActivityTab.tsx",
      lineNumber: 182,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/components/management/economy/AssignActivityTab.tsx",
      lineNumber: 181,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV17("div", { className: "overflow-x-auto rounded-md shadow-sm", children: /* @__PURE__ */ jsxDEV17("table", { className: "min-w-full divide-y divide-gray-200 dark:divide-gray-700", children: [
      /* @__PURE__ */ jsxDEV17("thead", { className: "bg-gray-50 dark:bg-gray-800", children: /* @__PURE__ */ jsxDEV17("tr", { children: [
        /* @__PURE__ */ jsxDEV17("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300", children: "User/Group Name" }, void 0, !1, {
          fileName: "app/components/management/economy/AssignActivityTab.tsx",
          lineNumber: 189,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV17("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300", children: "Activity Name" }, void 0, !1, {
          fileName: "app/components/management/economy/AssignActivityTab.tsx",
          lineNumber: 190,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV17("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300", children: "Assigned Date" }, void 0, !1, {
          fileName: "app/components/management/economy/AssignActivityTab.tsx",
          lineNumber: 191,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV17("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300", children: "Assigned By" }, void 0, !1, {
          fileName: "app/components/management/economy/AssignActivityTab.tsx",
          lineNumber: 192,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV17("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300", children: "Actions" }, void 0, !1, {
          fileName: "app/components/management/economy/AssignActivityTab.tsx",
          lineNumber: 193,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/management/economy/AssignActivityTab.tsx",
        lineNumber: 188,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/components/management/economy/AssignActivityTab.tsx",
        lineNumber: 187,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV17("tbody", { className: "bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700", children: assignedActivities.length === 0 ? /* @__PURE__ */ jsxDEV17("tr", { children: /* @__PURE__ */ jsxDEV17("td", { colSpan: 5, className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center dark:text-gray-400", children: "No activities assigned yet." }, void 0, !1, {
        fileName: "app/components/management/economy/AssignActivityTab.tsx",
        lineNumber: 199,
        columnNumber: 17
      }, this) }, void 0, !1, {
        fileName: "app/components/management/economy/AssignActivityTab.tsx",
        lineNumber: 198,
        columnNumber: 15
      }, this) : assignedActivities.map((assignment) => /* @__PURE__ */ jsxDEV17("tr", { children: [
        /* @__PURE__ */ jsxDEV17("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100", children: [
          assignment.assigneeName,
          " (",
          assignment.assigneeType,
          ")"
        ] }, void 0, !0, {
          fileName: "app/components/management/economy/AssignActivityTab.tsx",
          lineNumber: 206,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV17("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300", children: assignment.activityName }, void 0, !1, {
          fileName: "app/components/management/economy/AssignActivityTab.tsx",
          lineNumber: 207,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV17("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300", children: assignment.assignedDate }, void 0, !1, {
          fileName: "app/components/management/economy/AssignActivityTab.tsx",
          lineNumber: 208,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV17("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300", children: assignment.assignedBy }, void 0, !1, {
          fileName: "app/components/management/economy/AssignActivityTab.tsx",
          lineNumber: 209,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV17("td", { className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium", children: /* @__PURE__ */ jsxDEV17(
          Button,
          {
            variant: "destructive",
            size: "sm",
            onClick: () => handleUnassign(assignment.id),
            className: "bg-red-600 hover:bg-red-700 text-white",
            children: "Unassign"
          },
          void 0,
          !1,
          {
            fileName: "app/components/management/economy/AssignActivityTab.tsx",
            lineNumber: 211,
            columnNumber: 21
          },
          this
        ) }, void 0, !1, {
          fileName: "app/components/management/economy/AssignActivityTab.tsx",
          lineNumber: 210,
          columnNumber: 19
        }, this)
      ] }, assignment.id, !0, {
        fileName: "app/components/management/economy/AssignActivityTab.tsx",
        lineNumber: 205,
        columnNumber: 17
      }, this)) }, void 0, !1, {
        fileName: "app/components/management/economy/AssignActivityTab.tsx",
        lineNumber: 196,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/management/economy/AssignActivityTab.tsx",
      lineNumber: 186,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/components/management/economy/AssignActivityTab.tsx",
      lineNumber: 185,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/management/economy/AssignActivityTab.tsx",
    lineNumber: 104,
    columnNumber: 5
  }, this);
}

// app/components/management/economy/AssignExpenseTab.tsx
import { useState as useState11 } from "react";
import { Form as Form5 } from "@remix-run/react";
import { jsxDEV as jsxDEV18 } from "react/jsx-dev-runtime";
function AssignExpenseTab() {
  let { addToast } = useToast(), [assignTo, setAssignTo] = useState11("User"), [selectedAssignee, setSelectedAssignee] = useState11(""), [selectedExpense, setSelectedExpense] = useState11(""), [assignedExpenses, setAssignedExpenses] = useState11([]), [assigneeSearchTerm, setAssigneeSearchTerm] = useState11(""), [expenseSearchTerm, setExpenseSearchTerm] = useState11(""), users = [
    { id: "user1", name: "Alice Smith" },
    { id: "user2", name: "Bob Johnson" },
    { id: "user3", name: "Charlie Brown" },
    { id: "user4", name: "David Lee" },
    { id: "user5", name: "Eve Davis" }
  ], groups = [
    { id: "group1", name: "Developers" },
    { id: "group2", name: "Designers" },
    { id: "group3", name: "Marketing" },
    { id: "group4", name: "Sales" },
    { id: "group5", name: "HR" }
  ], expenses = [
    { id: "exp1", name: "Monthly Rent" },
    { id: "exp2", name: "Software Subscription" },
    { id: "exp3", name: "Team Lunch" },
    { id: "exp4", name: "Office Supplies" },
    { id: "exp5", name: "Travel Expenses" }
  ], filteredAssignees = (assignTo === "User" ? users : groups).filter(
    (item) => item.name.toLowerCase().includes(assigneeSearchTerm.toLowerCase())
  ), filteredExpenses = expenses.filter(
    (expense) => expense.name.toLowerCase().includes(expenseSearchTerm.toLowerCase())
  ), handleAssign = (event) => {
    event.preventDefault();
    let assignee = assignTo === "User" ? users.find((u) => u.id === selectedAssignee) : groups.find((g) => g.id === selectedAssignee), expense = expenses.find((e) => e.id === selectedExpense);
    if (!assignee || !expense) {
      addToast({
        title: "Assignment Failed",
        description: "Please select a valid assignee and expense.",
        variant: "destructive"
      });
      return;
    }
    let newAssignment = {
      id: Date.now().toString(),
      assigneeName: assignee.name,
      assigneeType: assignTo,
      expenseName: expense.name,
      assignedDate: (/* @__PURE__ */ new Date()).toLocaleDateString(),
      assignedBy: "Admin User"
      // This should come from authenticated user context
    };
    setAssignedExpenses([...assignedExpenses, newAssignment]), addToast({
      title: "Expense Assigned",
      description: `Expense '${expense.name}' assigned to ${assignee.name}.`,
      variant: "success"
    }), setSelectedAssignee(""), setSelectedExpense(""), setAssigneeSearchTerm(""), setExpenseSearchTerm("");
  }, handleUnassign = (id) => {
    setAssignedExpenses(assignedExpenses.filter((assignment) => assignment.id !== id)), addToast({
      title: "Assignment Removed",
      description: "Expense assignment removed successfully.",
      variant: "success"
    });
  };
  return /* @__PURE__ */ jsxDEV18("div", { className: "p-4", children: [
    /* @__PURE__ */ jsxDEV18("h3", { className: "text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100", children: "Assign Expense" }, void 0, !1, {
      fileName: "app/components/management/economy/AssignExpenseTab.tsx",
      lineNumber: 105,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV18("p", { className: "text-gray-700 dark:text-gray-300 mb-6", children: "Assign specific expenses to users or groups." }, void 0, !1, {
      fileName: "app/components/management/economy/AssignExpenseTab.tsx",
      lineNumber: 106,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV18(Form5, { onSubmit: handleAssign, className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-8", children: [
      /* @__PURE__ */ jsxDEV18("div", { className: "md:col-span-2", children: [
        /* @__PURE__ */ jsxDEV18(Label, { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Assign To" }, void 0, !1, {
          fileName: "app/components/management/economy/AssignExpenseTab.tsx",
          lineNumber: 112,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV18(ToggleGroup, { type: "single", value: assignTo, onValueChange: (value) => {
          setAssignTo(value), setSelectedAssignee(""), setAssigneeSearchTerm("");
        }, className: "w-full", children: [
          /* @__PURE__ */ jsxDEV18(ToggleGroupItem, { value: "User", className: "flex-1 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 data-[state=on]:bg-blue-500 data-[state=on]:text-white dark:data-[state=on]:bg-blue-600", children: "User" }, void 0, !1, {
            fileName: "app/components/management/economy/AssignExpenseTab.tsx",
            lineNumber: 118,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV18(ToggleGroupItem, { value: "Group", className: "flex-1 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 data-[state=on]:bg-blue-500 data-[state=on]:text-white dark:data-[state=on]:bg-blue-600", children: "Group" }, void 0, !1, {
            fileName: "app/components/management/economy/AssignExpenseTab.tsx",
            lineNumber: 119,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/management/economy/AssignExpenseTab.tsx",
          lineNumber: 113,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/management/economy/AssignExpenseTab.tsx",
        lineNumber: 111,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV18("div", { children: [
        /* @__PURE__ */ jsxDEV18(Label, { htmlFor: "assigneeSelector", className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: [
          assignTo,
          " Selector"
        ] }, void 0, !0, {
          fileName: "app/components/management/economy/AssignExpenseTab.tsx",
          lineNumber: 124,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV18(Select, { onValueChange: setSelectedAssignee, value: selectedAssignee, required: !0, children: [
          /* @__PURE__ */ jsxDEV18(SelectTrigger, { id: "assigneeSelector", className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100", children: /* @__PURE__ */ jsxDEV18(SelectValue, { placeholder: `Select ${assignTo.toLowerCase()}` }, void 0, !1, {
            fileName: "app/components/management/economy/AssignExpenseTab.tsx",
            lineNumber: 127,
            columnNumber: 15
          }, this) }, void 0, !1, {
            fileName: "app/components/management/economy/AssignExpenseTab.tsx",
            lineNumber: 126,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV18(SelectContent, { className: "dark:bg-gray-800 dark:border-gray-600", children: [
            /* @__PURE__ */ jsxDEV18(
              Input,
              {
                placeholder: `Search ${assignTo.toLowerCase()}s...`,
                className: "mb-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100",
                value: assigneeSearchTerm,
                onChange: (e) => setAssigneeSearchTerm(e.target.value),
                onClick: (e) => e.stopPropagation()
              },
              void 0,
              !1,
              {
                fileName: "app/components/management/economy/AssignExpenseTab.tsx",
                lineNumber: 130,
                columnNumber: 15
              },
              this
            ),
            filteredAssignees.length === 0 ? /* @__PURE__ */ jsxDEV18(SelectItem, { value: "no-results", disabled: !0, children: "No results found" }, void 0, !1, {
              fileName: "app/components/management/economy/AssignExpenseTab.tsx",
              lineNumber: 138,
              columnNumber: 17
            }, this) : filteredAssignees.map((item) => /* @__PURE__ */ jsxDEV18(SelectItem, { value: item.id, children: item.name }, item.id, !1, {
              fileName: "app/components/management/economy/AssignExpenseTab.tsx",
              lineNumber: 141,
              columnNumber: 19
            }, this))
          ] }, void 0, !0, {
            fileName: "app/components/management/economy/AssignExpenseTab.tsx",
            lineNumber: 129,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/management/economy/AssignExpenseTab.tsx",
          lineNumber: 125,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/management/economy/AssignExpenseTab.tsx",
        lineNumber: 123,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV18("div", { children: [
        /* @__PURE__ */ jsxDEV18(Label, { htmlFor: "expenseSelector", className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Expense Selector" }, void 0, !1, {
          fileName: "app/components/management/economy/AssignExpenseTab.tsx",
          lineNumber: 149,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV18(Select, { onValueChange: setSelectedExpense, value: selectedExpense, required: !0, children: [
          /* @__PURE__ */ jsxDEV18(SelectTrigger, { id: "expenseSelector", className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100", children: /* @__PURE__ */ jsxDEV18(SelectValue, { placeholder: "Select expense" }, void 0, !1, {
            fileName: "app/components/management/economy/AssignExpenseTab.tsx",
            lineNumber: 152,
            columnNumber: 15
          }, this) }, void 0, !1, {
            fileName: "app/components/management/economy/AssignExpenseTab.tsx",
            lineNumber: 151,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV18(SelectContent, { className: "dark:bg-gray-800 dark:border-gray-600", children: [
            /* @__PURE__ */ jsxDEV18(
              Input,
              {
                placeholder: "Search expenses...",
                className: "mb-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100",
                value: expenseSearchTerm,
                onChange: (e) => setExpenseSearchTerm(e.target.value),
                onClick: (e) => e.stopPropagation()
              },
              void 0,
              !1,
              {
                fileName: "app/components/management/economy/AssignExpenseTab.tsx",
                lineNumber: 155,
                columnNumber: 15
              },
              this
            ),
            filteredExpenses.length === 0 ? /* @__PURE__ */ jsxDEV18(SelectItem, { value: "no-results", disabled: !0, children: "No results found" }, void 0, !1, {
              fileName: "app/components/management/economy/AssignExpenseTab.tsx",
              lineNumber: 163,
              columnNumber: 17
            }, this) : filteredExpenses.map((expense) => /* @__PURE__ */ jsxDEV18(SelectItem, { value: expense.id, children: expense.name }, expense.id, !1, {
              fileName: "app/components/management/economy/AssignExpenseTab.tsx",
              lineNumber: 166,
              columnNumber: 19
            }, this))
          ] }, void 0, !0, {
            fileName: "app/components/management/economy/AssignExpenseTab.tsx",
            lineNumber: 154,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/management/economy/AssignExpenseTab.tsx",
          lineNumber: 150,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/management/economy/AssignExpenseTab.tsx",
        lineNumber: 148,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV18("div", { className: "md:col-span-2 flex justify-end", children: /* @__PURE__ */ jsxDEV18(Button, { type: "submit", className: "bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md", children: "Assign Expense" }, void 0, !1, {
        fileName: "app/components/management/economy/AssignExpenseTab.tsx",
        lineNumber: 174,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/components/management/economy/AssignExpenseTab.tsx",
        lineNumber: 173,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/management/economy/AssignExpenseTab.tsx",
      lineNumber: 110,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV18("h4", { className: "text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100", children: "Current Expense Assignments" }, void 0, !1, {
      fileName: "app/components/management/economy/AssignExpenseTab.tsx",
      lineNumber: 180,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV18("div", { className: "mb-4 flex space-x-2", children: /* @__PURE__ */ jsxDEV18(Input, { placeholder: "Search assignments...", className: "flex-grow dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" }, void 0, !1, {
      fileName: "app/components/management/economy/AssignExpenseTab.tsx",
      lineNumber: 182,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/components/management/economy/AssignExpenseTab.tsx",
      lineNumber: 181,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV18("div", { className: "overflow-x-auto rounded-md shadow-sm", children: /* @__PURE__ */ jsxDEV18("table", { className: "min-w-full divide-y divide-gray-200 dark:divide-gray-700", children: [
      /* @__PURE__ */ jsxDEV18("thead", { className: "bg-gray-50 dark:bg-gray-800", children: /* @__PURE__ */ jsxDEV18("tr", { children: [
        /* @__PURE__ */ jsxDEV18("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300", children: "User/Group Name" }, void 0, !1, {
          fileName: "app/components/management/economy/AssignExpenseTab.tsx",
          lineNumber: 189,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV18("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300", children: "Expense Name" }, void 0, !1, {
          fileName: "app/components/management/economy/AssignExpenseTab.tsx",
          lineNumber: 190,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV18("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300", children: "Assigned Date" }, void 0, !1, {
          fileName: "app/components/management/economy/AssignExpenseTab.tsx",
          lineNumber: 191,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV18("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300", children: "Assigned By" }, void 0, !1, {
          fileName: "app/components/management/economy/AssignExpenseTab.tsx",
          lineNumber: 192,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV18("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300", children: "Actions" }, void 0, !1, {
          fileName: "app/components/management/economy/AssignExpenseTab.tsx",
          lineNumber: 193,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/management/economy/AssignExpenseTab.tsx",
        lineNumber: 188,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/components/management/economy/AssignExpenseTab.tsx",
        lineNumber: 187,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV18("tbody", { className: "bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700", children: assignedExpenses.length === 0 ? /* @__PURE__ */ jsxDEV18("tr", { children: /* @__PURE__ */ jsxDEV18("td", { colSpan: 5, className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center dark:text-gray-400", children: "No expenses assigned yet." }, void 0, !1, {
        fileName: "app/components/management/economy/AssignExpenseTab.tsx",
        lineNumber: 199,
        columnNumber: 17
      }, this) }, void 0, !1, {
        fileName: "app/components/management/economy/AssignExpenseTab.tsx",
        lineNumber: 198,
        columnNumber: 15
      }, this) : assignedExpenses.map((assignment) => /* @__PURE__ */ jsxDEV18("tr", { children: [
        /* @__PURE__ */ jsxDEV18("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100", children: [
          assignment.assigneeName,
          " (",
          assignment.assigneeType,
          ")"
        ] }, void 0, !0, {
          fileName: "app/components/management/economy/AssignExpenseTab.tsx",
          lineNumber: 206,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV18("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300", children: assignment.expenseName }, void 0, !1, {
          fileName: "app/components/management/economy/AssignExpenseTab.tsx",
          lineNumber: 207,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV18("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300", children: assignment.assignedDate }, void 0, !1, {
          fileName: "app/components/management/economy/AssignExpenseTab.tsx",
          lineNumber: 208,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV18("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300", children: assignment.assignedBy }, void 0, !1, {
          fileName: "app/components/management/economy/AssignExpenseTab.tsx",
          lineNumber: 209,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV18("td", { className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium", children: /* @__PURE__ */ jsxDEV18(
          Button,
          {
            variant: "destructive",
            size: "sm",
            onClick: () => handleUnassign(assignment.id),
            className: "bg-red-600 hover:bg-red-700 text-white",
            children: "Unassign"
          },
          void 0,
          !1,
          {
            fileName: "app/components/management/economy/AssignExpenseTab.tsx",
            lineNumber: 211,
            columnNumber: 21
          },
          this
        ) }, void 0, !1, {
          fileName: "app/components/management/economy/AssignExpenseTab.tsx",
          lineNumber: 210,
          columnNumber: 19
        }, this)
      ] }, assignment.id, !0, {
        fileName: "app/components/management/economy/AssignExpenseTab.tsx",
        lineNumber: 205,
        columnNumber: 17
      }, this)) }, void 0, !1, {
        fileName: "app/components/management/economy/AssignExpenseTab.tsx",
        lineNumber: 196,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/management/economy/AssignExpenseTab.tsx",
      lineNumber: 186,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/components/management/economy/AssignExpenseTab.tsx",
      lineNumber: 185,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/management/economy/AssignExpenseTab.tsx",
    lineNumber: 104,
    columnNumber: 5
  }, this);
}

// app/components/management/EconomyTab.tsx
import { jsxDEV as jsxDEV19 } from "react/jsx-dev-runtime";
function EconomyTab() {
  let [selectedIndex, setSelectedIndex] = useState12(0), subTabs = [
    {
      name: "Add Activity",
      icon: /* @__PURE__ */ jsxDEV19(PlusCircleIcon, { className: "h-5 w-5 mr-2" }, void 0, !1, {
        fileName: "app/components/management/EconomyTab.tsx",
        lineNumber: 15,
        columnNumber: 13
      }, this),
      component: /* @__PURE__ */ jsxDEV19(AddActivityTab, {}, void 0, !1, {
        fileName: "app/components/management/EconomyTab.tsx",
        lineNumber: 16,
        columnNumber: 18
      }, this)
    },
    {
      name: "Add Expense",
      icon: /* @__PURE__ */ jsxDEV19(MinusCircleIcon, { className: "h-5 w-5 mr-2" }, void 0, !1, {
        fileName: "app/components/management/EconomyTab.tsx",
        lineNumber: 20,
        columnNumber: 13
      }, this),
      component: /* @__PURE__ */ jsxDEV19(AddExpenseTab, {}, void 0, !1, {
        fileName: "app/components/management/EconomyTab.tsx",
        lineNumber: 21,
        columnNumber: 18
      }, this)
    },
    {
      name: "Assign Activity",
      icon: /* @__PURE__ */ jsxDEV19(UserPlusIcon, { className: "h-5 w-5 mr-2" }, void 0, !1, {
        fileName: "app/components/management/EconomyTab.tsx",
        lineNumber: 25,
        columnNumber: 13
      }, this),
      component: /* @__PURE__ */ jsxDEV19(AssignActivityTab, {}, void 0, !1, {
        fileName: "app/components/management/EconomyTab.tsx",
        lineNumber: 26,
        columnNumber: 18
      }, this)
    },
    {
      name: "Assign Expense",
      icon: /* @__PURE__ */ jsxDEV19(UserMinusIcon, { className: "h-5 w-5 mr-2" }, void 0, !1, {
        fileName: "app/components/management/EconomyTab.tsx",
        lineNumber: 30,
        columnNumber: 13
      }, this),
      component: /* @__PURE__ */ jsxDEV19(AssignExpenseTab, {}, void 0, !1, {
        fileName: "app/components/management/EconomyTab.tsx",
        lineNumber: 31,
        columnNumber: 18
      }, this)
    }
  ];
  return /* @__PURE__ */ jsxDEV19("div", { className: "p-4", children: [
    /* @__PURE__ */ jsxDEV19("h2", { className: "text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100", children: "Economy Settings" }, void 0, !1, {
      fileName: "app/components/management/EconomyTab.tsx",
      lineNumber: 37,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV19("p", { className: "text-gray-700 dark:text-gray-300 mb-6", children: "Manage activities, expenses, and their assignments within the system's economy." }, void 0, !1, {
      fileName: "app/components/management/EconomyTab.tsx",
      lineNumber: 38,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV19(Tab.Group, { selectedIndex, onChange: setSelectedIndex, children: [
      /* @__PURE__ */ jsxDEV19(Tab.List, { className: "flex space-x-1 rounded-xl bg-gray-100 p-1 dark:bg-gray-800 mb-4", children: subTabs.map((tab) => /* @__PURE__ */ jsxDEV19(
        Tab,
        {
          className: ({ selected }) => `w-full flex items-center justify-center rounded-lg py-2.5 text-sm font-medium leading-5
                ring-blue-500 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2
                ${selected ? "bg-white text-blue-700 shadow dark:bg-gray-700 dark:text-white" : "text-gray-600 hover:bg-white/[0.12] hover:text-blue-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"}`,
          children: [
            tab.icon,
            tab.name
          ]
        },
        tab.name,
        !0,
        {
          fileName: "app/components/management/EconomyTab.tsx",
          lineNumber: 45,
          columnNumber: 13
        },
        this
      )) }, void 0, !1, {
        fileName: "app/components/management/EconomyTab.tsx",
        lineNumber: 43,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV19(Tab.Panels, { className: "mt-2", children: subTabs.map((tab, idx) => /* @__PURE__ */ jsxDEV19(
        Tab.Panel,
        {
          className: "rounded-xl bg-white p-3 ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 dark:bg-gray-900",
          children: tab.component
        },
        idx,
        !1,
        {
          fileName: "app/components/management/EconomyTab.tsx",
          lineNumber: 63,
          columnNumber: 13
        },
        this
      )) }, void 0, !1, {
        fileName: "app/components/management/EconomyTab.tsx",
        lineNumber: 61,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/management/EconomyTab.tsx",
      lineNumber: 42,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/management/EconomyTab.tsx",
    lineNumber: 36,
    columnNumber: 5
  }, this);
}

// app/components/management/ManagementTabs.tsx
import { DollarSignIcon as DollarSignIcon2, ScaleIcon, TrendingUpIcon } from "lucide-react";
import { jsxDEV as jsxDEV20 } from "react/jsx-dev-runtime";
function ManagementTabs({ userRole }) {
  let [selectedIndex, setSelectedIndex] = useState13(0), accessibleTabs = [
    {
      name: "Currency",
      icon: /* @__PURE__ */ jsxDEV20(DollarSignIcon2, { className: "h-5 w-5 mr-2" }, void 0, !1, {
        fileName: "app/components/management/ManagementTabs.tsx",
        lineNumber: 20,
        columnNumber: 13
      }, this),
      component: /* @__PURE__ */ jsxDEV20(CurrencyTab, {}, void 0, !1, {
        fileName: "app/components/management/ManagementTabs.tsx",
        lineNumber: 21,
        columnNumber: 18
      }, this),
      roles: ["Super Admin"]
      // Only Super Admin can access Currency tab
    },
    {
      name: "Behaviour",
      icon: /* @__PURE__ */ jsxDEV20(ScaleIcon, { className: "h-5 w-5 mr-2" }, void 0, !1, {
        fileName: "app/components/management/ManagementTabs.tsx",
        lineNumber: 26,
        columnNumber: 13
      }, this),
      component: /* @__PURE__ */ jsxDEV20(BehaviourTab, {}, void 0, !1, {
        fileName: "app/components/management/ManagementTabs.tsx",
        lineNumber: 27,
        columnNumber: 18
      }, this),
      roles: ["Admin", "Super Admin"]
    },
    {
      name: "Economy",
      icon: /* @__PURE__ */ jsxDEV20(TrendingUpIcon, { className: "h-5 w-5 mr-2" }, void 0, !1, {
        fileName: "app/components/management/ManagementTabs.tsx",
        lineNumber: 32,
        columnNumber: 13
      }, this),
      component: /* @__PURE__ */ jsxDEV20(EconomyTab, {}, void 0, !1, {
        fileName: "app/components/management/ManagementTabs.tsx",
        lineNumber: 33,
        columnNumber: 18
      }, this),
      roles: ["Admin", "Super Admin"]
    }
  ].filter((tab) => tab.roles.includes(userRole));
  return /* @__PURE__ */ jsxDEV20("div", { className: "w-full px-2 py-4 sm:px-0", children: /* @__PURE__ */ jsxDEV20(Tab2.Group, { selectedIndex, onChange: setSelectedIndex, children: [
    /* @__PURE__ */ jsxDEV20(Tab2.List, { className: "flex space-x-1 rounded-xl bg-gray-100 p-1 dark:bg-gray-800", children: accessibleTabs.map((tab) => /* @__PURE__ */ jsxDEV20(
      Tab2,
      {
        className: ({ selected }) => `w-full flex items-center justify-center rounded-lg py-2.5 text-sm font-medium leading-5
                ring-blue-500 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2
                ${selected ? "bg-white text-blue-700 shadow dark:bg-gray-700 dark:text-white" : "text-gray-600 hover:bg-white/[0.12] hover:text-blue-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"}`,
        children: [
          tab.icon,
          tab.name
        ]
      },
      tab.name,
      !0,
      {
        fileName: "app/components/management/ManagementTabs.tsx",
        lineNumber: 46,
        columnNumber: 13
      },
      this
    )) }, void 0, !1, {
      fileName: "app/components/management/ManagementTabs.tsx",
      lineNumber: 44,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV20(Tab2.Panels, { className: "mt-2", children: accessibleTabs.map((tab, idx) => /* @__PURE__ */ jsxDEV20(
      Tab2.Panel,
      {
        className: "rounded-xl bg-white p-3 ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 dark:bg-gray-900",
        children: tab.component
      },
      idx,
      !1,
      {
        fileName: "app/components/management/ManagementTabs.tsx",
        lineNumber: 64,
        columnNumber: 13
      },
      this
    )) }, void 0, !1, {
      fileName: "app/components/management/ManagementTabs.tsx",
      lineNumber: 62,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/management/ManagementTabs.tsx",
    lineNumber: 43,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/components/management/ManagementTabs.tsx",
    lineNumber: 42,
    columnNumber: 5
  }, this);
}

// app/routes/management.tsx
import { jsxDEV as jsxDEV21 } from "react/jsx-dev-runtime";
var meta2 = () => [
  { title: "Life Economy - Management" },
  { name: "description", content: "Manage users, groups, and system settings." }
];
async function loader2({ request }) {
  let { userProfile } = await getUserProfile(request);
  if (!userProfile)
    throw redirect3("/login");
  if (!["Admin", "Super Admin"].includes(userProfile.role))
    throw redirect3("/dashboard");
  return json2({ userRole: userProfile.role });
}
function ManagementPage() {
  let { userRole } = useLoaderData2();
  return /* @__PURE__ */ jsxDEV21("div", { className: "container mx-auto p-4 md:p-6", children: [
    /* @__PURE__ */ jsxDEV21("h1", { className: "text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100", children: "Management" }, void 0, !1, {
      fileName: "app/routes/management.tsx",
      lineNumber: 36,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV21(ManagementTabs, { userRole }, void 0, !1, {
      fileName: "app/routes/management.tsx",
      lineNumber: 37,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/management.tsx",
    lineNumber: 35,
    columnNumber: 5
  }, this);
}

// app/routes/dashboard.tsx
var dashboard_exports = {};
__export(dashboard_exports, {
  default: () => Dashboard,
  loader: () => loader3
});
import { useLoaderData as useLoaderData3 } from "@remix-run/react";
import { json as json3, redirect as redirect4 } from "@remix-run/node";
import { useEffect as useEffect8 } from "react";

// app/components/dashboard/UserDashboard.tsx
import { jsxDEV as jsxDEV22 } from "react/jsx-dev-runtime";
function UserDashboard({ currentUser }) {
  return /* @__PURE__ */ jsxDEV22("div", { className: "rounded-lg bg-white p-6 shadow-md dark:bg-gray-900", children: [
    /* @__PURE__ */ jsxDEV22("h2", { className: "mb-4 text-2xl font-semibold text-gray-900 dark:text-white", children: "Your Dashboard" }, void 0, !1, {
      fileName: "app/components/dashboard/UserDashboard.tsx",
      lineNumber: 11,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV22("p", { className: "text-gray-700 dark:text-gray-300", children: [
      "Welcome, ",
      /* @__PURE__ */ jsxDEV22("span", { className: "font-medium", children: currentUser.fullName || currentUser.email }, void 0, !1, {
        fileName: "app/components/dashboard/UserDashboard.tsx",
        lineNumber: 13,
        columnNumber: 18
      }, this),
      "!"
    ] }, void 0, !0, {
      fileName: "app/components/dashboard/UserDashboard.tsx",
      lineNumber: 12,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV22("p", { className: "text-gray-700 dark:text-gray-300", children: [
      "Your current balance is: ",
      /* @__PURE__ */ jsxDEV22("span", { className: "font-medium", children: [
        "$",
        currentUser.balance.toFixed(2)
      ] }, void 0, !0, {
        fileName: "app/components/dashboard/UserDashboard.tsx",
        lineNumber: 16,
        columnNumber: 34
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/dashboard/UserDashboard.tsx",
      lineNumber: 15,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV22("p", { className: "mt-4 text-gray-700 dark:text-gray-300", children: "This is your personal dashboard. More features will be added here soon." }, void 0, !1, {
      fileName: "app/components/dashboard/UserDashboard.tsx",
      lineNumber: 18,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/dashboard/UserDashboard.tsx",
    lineNumber: 10,
    columnNumber: 5
  }, this);
}

// app/components/dashboard/AdminDashboard.tsx
import { jsxDEV as jsxDEV23 } from "react/jsx-dev-runtime";
function AdminDashboard() {
  return /* @__PURE__ */ jsxDEV23("div", { className: "rounded-lg bg-white p-6 shadow-md dark:bg-gray-900", children: [
    /* @__PURE__ */ jsxDEV23("h2", { className: "mb-4 text-2xl font-semibold text-gray-900 dark:text-white", children: "Admin Overview" }, void 0, !1, {
      fileName: "app/components/dashboard/AdminDashboard.tsx",
      lineNumber: 6,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV23("p", { className: "text-gray-700 dark:text-gray-300", children: "Welcome to the Admin Dashboard. Here you can manage users, activities, and system settings." }, void 0, !1, {
      fileName: "app/components/dashboard/AdminDashboard.tsx",
      lineNumber: 7,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV23("p", { className: "mt-4 text-gray-700 dark:text-gray-300", children: "This section is under development." }, void 0, !1, {
      fileName: "app/components/dashboard/AdminDashboard.tsx",
      lineNumber: 10,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/dashboard/AdminDashboard.tsx",
    lineNumber: 5,
    columnNumber: 5
  }, this);
}

// app/routes/dashboard.tsx
import { jsxDEV as jsxDEV24 } from "react/jsx-dev-runtime";
async function loader3({ request }) {
  console.log("[Loader - dashboard] Dashboard route loader executed.");
  let headers = new Headers(), userProfile = null;
  try {
    if (!await getAuthSession(request))
      throw console.log("[Loader - dashboard] No Supabase session found. Redirecting to /login."), redirect4("/login", { headers });
    let { userProfile: fetchedProfile, headers: profileHeaders } = await getUserProfile(request);
    if (userProfile = fetchedProfile, profileHeaders.forEach((value, key) => headers.append(key, value)), !userProfile)
      throw console.log("[Loader - dashboard] User profile not found for session. Redirecting to /login."), redirect4("/login", { headers });
    console.log("[Loader - dashboard] UserProfile fetched:", userProfile.id, "Role:", userProfile.role);
  } catch (err) {
    throw err instanceof Response && err.status === 302 ? err : (console.error("[Loader - dashboard] Error fetching user profile:", err), redirect4("/login", { headers }));
  }
  return json3({ userProfile }, { headers });
}
function Dashboard() {
  let { userProfile } = useLoaderData3(), zustandSetCurrentUser = useStore((state) => state.setCurrentUser), currentUser = useStore((state) => state.currentUser);
  return useEffect8(() => {
    userProfile && (currentUser && currentUser.id === userProfile.id && currentUser.email === (userProfile.email || "") && currentUser.fullName === (userProfile.full_name || "User") && currentUser.balance === (userProfile.balance ?? 0) && currentUser.role === (userProfile.role || "User") && (userProfile.created_at ? currentUser.createdAt === new Date(userProfile.created_at).toISOString().split("T")[0] : !currentUser.createdAt) && currentUser.groupId === (userProfile.group_id || currentUser.groupId || "group_placeholder_id") && currentUser.groupName === (userProfile.group_name || currentUser.groupName || "Group Placeholder") && currentUser.avatarUrl === (userProfile.avatar_url || currentUser.avatarUrl || void 0) ? console.log("[Dashboard Component] Zustand currentUser is consistent with loader data.") : (zustandSetCurrentUser({
      id: userProfile.id,
      email: userProfile.email || "",
      fullName: userProfile.full_name || "User",
      balance: userProfile.balance ?? 0,
      role: userProfile.role || "User",
      createdAt: userProfile.created_at ? new Date(userProfile.created_at).toISOString().split("T")[0] : currentUser?.createdAt || (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      status: currentUser?.status || "active",
      // Preserve existing status if not provided by profile
      groupId: userProfile.group_id || currentUser?.groupId || "group_placeholder_id",
      groupName: userProfile.group_name || currentUser?.groupName || "Group Placeholder",
      avatarUrl: userProfile.avatar_url || currentUser?.avatarUrl || void 0
    }), console.log("[Dashboard Component] Updated currentUser in Zustand from loader data.")));
  }, [userProfile, zustandSetCurrentUser]), currentUser ? /* @__PURE__ */ jsxDEV24("div", { className: "min-h-screen bg-gray-50 p-4 dark:bg-gray-950 md:p-6", children: [
    /* @__PURE__ */ jsxDEV24("h1", { className: "mb-6 text-3xl font-bold text-gray-900 dark:text-white", children: currentUser.role === "Super Admin" || currentUser.role === "Admin" ? "Admin Dashboard" : "User Dashboard" }, void 0, !1, {
      fileName: "app/routes/dashboard.tsx",
      lineNumber: 100,
      columnNumber: 7
    }, this),
    currentUser.role === "Super Admin" || currentUser.role === "Admin" ? /* @__PURE__ */ jsxDEV24(AdminDashboard, {}, void 0, !1, {
      fileName: "app/routes/dashboard.tsx",
      lineNumber: 104,
      columnNumber: 9
    }, this) : /* @__PURE__ */ jsxDEV24(UserDashboard, { currentUser }, void 0, !1, {
      fileName: "app/routes/dashboard.tsx",
      lineNumber: 106,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/dashboard.tsx",
    lineNumber: 99,
    columnNumber: 5
  }, this) : /* @__PURE__ */ jsxDEV24("div", { className: "flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4 dark:bg-gray-950", children: /* @__PURE__ */ jsxDEV24("div", { className: "w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-gray-900 text-center", children: [
    /* @__PURE__ */ jsxDEV24("h1", { className: "mb-4 text-2xl font-bold text-gray-900 dark:text-white", children: "Access Denied" }, void 0, !1, {
      fileName: "app/routes/dashboard.tsx",
      lineNumber: 90,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV24("p", { className: "text-gray-700 dark:text-gray-300", children: "You must be logged in to view the dashboard." }, void 0, !1, {
      fileName: "app/routes/dashboard.tsx",
      lineNumber: 91,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV24("a", { href: "/login", className: "mt-4 inline-block px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700", children: "Go to Login" }, void 0, !1, {
      fileName: "app/routes/dashboard.tsx",
      lineNumber: 92,
      columnNumber: 11
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/dashboard.tsx",
    lineNumber: 89,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/dashboard.tsx",
    lineNumber: 88,
    columnNumber: 7
  }, this);
}

// app/routes/settings.tsx
var settings_exports = {};
__export(settings_exports, {
  ErrorBoundary: () => ErrorBoundary2,
  action: () => action,
  default: () => AccountSettings,
  loader: () => loader4,
  meta: () => meta3
});
import { useState as useState15, useEffect as useEffect10 } from "react";
import { json as json4 } from "@remix-run/node";
import { useLoaderData as useLoaderData4, useRouteError as useRouteError2, isRouteErrorResponse as isRouteErrorResponse2, useActionData as useActionData2 } from "@remix-run/react";

// app/components/settings/ChangePasswordModal.tsx
import { useState as useState14, Fragment as Fragment4, useEffect as useEffect9 } from "react";
import { useActionData, Form as Form6 } from "@remix-run/react";
import { Dialog as Dialog2, Transition } from "@headlessui/react";
import { jsxDEV as jsxDEV25 } from "react/jsx-dev-runtime";
function ChangePasswordModal({ isOpen, setIsOpen }) {
  let actionData = useActionData(), [showSuccess, setShowSuccess] = useState14(!1), closeModal = () => {
    setIsOpen(!1), setShowSuccess(!1);
  };
  return useEffect9(() => {
    if (actionData && "intent" in actionData && actionData.intent === "changePassword")
      if (actionData.success) {
        setShowSuccess(!0);
        let timer = setTimeout(() => {
          closeModal();
        }, 2500);
        return () => clearTimeout(timer);
      } else
        actionData.error && setShowSuccess(!1);
  }, [actionData]), /* @__PURE__ */ jsxDEV25(Transition, { appear: !0, show: isOpen, as: Fragment4, children: /* @__PURE__ */ jsxDEV25(Dialog2, { as: "div", className: "relative z-10", onClose: closeModal, children: [
    /* @__PURE__ */ jsxDEV25(
      Transition.Child,
      {
        as: Fragment4,
        enter: "ease-out duration-300",
        enterFrom: "opacity-0",
        enterTo: "opacity-100",
        leave: "ease-in duration-200",
        leaveFrom: "opacity-100",
        leaveTo: "opacity-0",
        children: /* @__PURE__ */ jsxDEV25("div", { className: "fixed inset-0 bg-black/25 dark:bg-black/50" }, void 0, !1, {
          fileName: "app/components/settings/ChangePasswordModal.tsx",
          lineNumber: 52,
          columnNumber: 11
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/components/settings/ChangePasswordModal.tsx",
        lineNumber: 43,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ jsxDEV25("div", { className: "fixed inset-0 overflow-y-auto", children: /* @__PURE__ */ jsxDEV25("div", { className: "flex min-h-full items-center justify-center p-4 text-center", children: /* @__PURE__ */ jsxDEV25(
      Transition.Child,
      {
        as: Fragment4,
        enter: "ease-out duration-300",
        enterFrom: "opacity-0 scale-95",
        enterTo: "opacity-100 scale-100",
        leave: "ease-in duration-200",
        leaveFrom: "opacity-100 scale-100",
        leaveTo: "opacity-0 scale-95",
        children: /* @__PURE__ */ jsxDEV25(Dialog2.Panel, { className: "w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-gray-800", children: [
          /* @__PURE__ */ jsxDEV25(
            Dialog2.Title,
            {
              as: "h3",
              className: "text-lg font-medium leading-6 text-gray-900 dark:text-gray-100",
              children: "Change Password"
            },
            void 0,
            !1,
            {
              fileName: "app/components/settings/ChangePasswordModal.tsx",
              lineNumber: 67,
              columnNumber: 17
            },
            this
          ),
          showSuccess && actionData?.success && /* @__PURE__ */ jsxDEV25("div", { className: "mt-4 rounded border border-green-400 bg-green-100 p-3 text-sm text-green-700 dark:border-green-600 dark:bg-green-900/30 dark:text-green-300", children: actionData.message }, void 0, !1, {
            fileName: "app/components/settings/ChangePasswordModal.tsx",
            lineNumber: 76,
            columnNumber: 19
          }, this),
          !showSuccess && actionData?.error && /* @__PURE__ */ jsxDEV25("div", { className: "mt-4 rounded border border-red-400 bg-red-100 p-3 text-sm text-red-700 dark:border-red-600 dark:bg-red-900/30 dark:text-red-300", children: actionData.error }, void 0, !1, {
            fileName: "app/components/settings/ChangePasswordModal.tsx",
            lineNumber: 83,
            columnNumber: 19
          }, this),
          !showSuccess && // IMPORTANT: The Form needs to point to the settings route action
          /* @__PURE__ */ jsxDEV25(Form6, { method: "post", action: "/settings", className: "mt-4 space-y-4", children: [
            /* @__PURE__ */ jsxDEV25("input", { type: "hidden", name: "intent", value: "changePassword" }, void 0, !1, {
              fileName: "app/components/settings/ChangePasswordModal.tsx",
              lineNumber: 93,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV25("div", { children: [
              /* @__PURE__ */ jsxDEV25(
                "label",
                {
                  htmlFor: "password",
                  className: "block text-sm font-medium text-gray-700 dark:text-gray-300",
                  children: "New Password"
                },
                void 0,
                !1,
                {
                  fileName: "app/components/settings/ChangePasswordModal.tsx",
                  lineNumber: 96,
                  columnNumber: 23
                },
                this
              ),
              /* @__PURE__ */ jsxDEV25(
                "input",
                {
                  type: "password",
                  id: "password",
                  name: "password",
                  required: !0,
                  minLength: 6,
                  className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
                },
                void 0,
                !1,
                {
                  fileName: "app/components/settings/ChangePasswordModal.tsx",
                  lineNumber: 102,
                  columnNumber: 23
                },
                this
              ),
              /* @__PURE__ */ jsxDEV25("p", { className: "mt-1 text-xs text-gray-500 dark:text-gray-400", children: "Minimum 6 characters" }, void 0, !1, {
                fileName: "app/components/settings/ChangePasswordModal.tsx",
                lineNumber: 110,
                columnNumber: 24
              }, this)
            ] }, void 0, !0, {
              fileName: "app/components/settings/ChangePasswordModal.tsx",
              lineNumber: 95,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV25("div", { children: [
              /* @__PURE__ */ jsxDEV25(
                "label",
                {
                  htmlFor: "confirmPassword",
                  className: "block text-sm font-medium text-gray-700 dark:text-gray-300",
                  children: "Confirm New Password"
                },
                void 0,
                !1,
                {
                  fileName: "app/components/settings/ChangePasswordModal.tsx",
                  lineNumber: 113,
                  columnNumber: 23
                },
                this
              ),
              /* @__PURE__ */ jsxDEV25(
                "input",
                {
                  type: "password",
                  id: "confirmPassword",
                  name: "confirmPassword",
                  required: !0,
                  minLength: 6,
                  className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
                },
                void 0,
                !1,
                {
                  fileName: "app/components/settings/ChangePasswordModal.tsx",
                  lineNumber: 119,
                  columnNumber: 23
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "app/components/settings/ChangePasswordModal.tsx",
              lineNumber: 112,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV25("div", { className: "mt-6 flex justify-end space-x-3", children: [
              /* @__PURE__ */ jsxDEV25(
                "button",
                {
                  type: "button",
                  className: "inline-flex justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500",
                  onClick: closeModal,
                  children: "Cancel"
                },
                void 0,
                !1,
                {
                  fileName: "app/components/settings/ChangePasswordModal.tsx",
                  lineNumber: 130,
                  columnNumber: 23
                },
                this
              ),
              /* @__PURE__ */ jsxDEV25(
                "button",
                {
                  type: "submit",
                  className: "inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                  children: "Update Password"
                },
                void 0,
                !1,
                {
                  fileName: "app/components/settings/ChangePasswordModal.tsx",
                  lineNumber: 137,
                  columnNumber: 23
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "app/components/settings/ChangePasswordModal.tsx",
              lineNumber: 129,
              columnNumber: 21
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/settings/ChangePasswordModal.tsx",
            lineNumber: 91,
            columnNumber: 19
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/settings/ChangePasswordModal.tsx",
          lineNumber: 66,
          columnNumber: 15
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/components/settings/ChangePasswordModal.tsx",
        lineNumber: 57,
        columnNumber: 13
      },
      this
    ) }, void 0, !1, {
      fileName: "app/components/settings/ChangePasswordModal.tsx",
      lineNumber: 56,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/components/settings/ChangePasswordModal.tsx",
      lineNumber: 55,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/settings/ChangePasswordModal.tsx",
    lineNumber: 42,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/components/settings/ChangePasswordModal.tsx",
    lineNumber: 41,
    columnNumber: 5
  }, this);
}

// app/routes/settings.tsx
import { jsxDEV as jsxDEV26 } from "react/jsx-dev-runtime";
var meta3 = () => [
  { title: "Life Economy - Account Settings" },
  { name: "description", content: "Manage your account settings and preferences." }
];
async function loader4({ request }) {
  console.log("[Server Loader - settings] Attempting to fetch user profile for settings page.");
  try {
    let { userProfile, headers } = await getUserProfile(request);
    if (!userProfile)
      throw console.warn("[Server Loader - settings] No user profile found for authenticated session."), new Response("User profile not found.", { status: 404 });
    return console.log("[Server Loader - settings] User profile fetched successfully:", userProfile.id), json4({ userProfile }, { headers });
  } catch (err) {
    throw console.error("[Server Loader - settings] Error caught during profile fetch:", err), err instanceof Response ? err : new Response(err.message || "An unknown error occurred fetching profile", { status: 500 });
  }
}
async function action({ request }) {
  let formData = await request.formData(), password = formData.get("password"), confirmPassword = formData.get("confirmPassword"), intent = formData.get("intent");
  if (console.log("[Server Action - settings] Received password change request."), intent === "changePassword") {
    if (!password || !confirmPassword)
      return json4({ success: !1, error: "Password fields cannot be empty." }, { status: 400 });
    if (password !== confirmPassword)
      return json4({ success: !1, error: "Passwords do not match." }, { status: 400 });
    if (password.length < 6)
      return json4({ success: !1, error: "Password must be at least 6 characters long." }, { status: 400 });
    try {
      let { supabase: supabase2, headers } = await getSupabaseWithSessionAndHeaders({ request });
      console.log("[Server Action - settings] Attempting to update password for current user.");
      let { data, error } = await supabase2.auth.updateUser({ password });
      return error ? (console.error("[Server Action - settings] Supabase auth error updating password:", error), json4({ success: !1, error: error.message || "Failed to update password." }, { status: 500 })) : (console.log("[Server Action - settings] Password updated successfully for user:", data?.user?.id), json4({ success: !0, message: "Password updated successfully!" }, { headers }));
    } catch (err) {
      return console.error("[Server Action - settings] Unexpected error during password update:", err), json4({ success: !1, error: err.message || "An unexpected error occurred." }, { status: 500 });
    }
  }
  return json4({ success: !1, error: "Invalid action intent." }, { status: 400 });
}
function AccountSettings() {
  let { userProfile } = useLoaderData4(), actionData = useActionData2(), [isPasswordModalOpen, setIsPasswordModalOpen] = useState15(!1), [theme, setTheme] = useState15(() => typeof window < "u" && localStorage.getItem("theme") || "light");
  useEffect10(() => {
    if (typeof window < "u") {
      let root = window.document.documentElement;
      root.classList.remove("light", "dark"), root.classList.add(theme), localStorage.setItem("theme", theme);
    }
  }, [theme]), useEffect10(() => {
    actionData?.success;
  }, [actionData]);
  let toggleTheme = () => {
    setTheme((prevTheme) => prevTheme === "light" ? "dark" : "light");
  };
  if (!userProfile)
    return /* @__PURE__ */ jsxDEV26("div", { className: "mx-auto max-w-4xl space-y-8 text-center", children: [
      /* @__PURE__ */ jsxDEV26("h1", { className: "text-3xl font-bold text-gray-900 dark:text-gray-100", children: "Account Settings" }, void 0, !1, {
        fileName: "app/routes/settings.tsx",
        lineNumber: 119,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV26("p", { className: "text-gray-700 dark:text-gray-300", children: "Could not load user profile information." }, void 0, !1, {
        fileName: "app/routes/settings.tsx",
        lineNumber: 120,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/settings.tsx",
      lineNumber: 118,
      columnNumber: 7
    }, this);
  let memberSince = userProfile.created_at ? new Date(userProfile.created_at).toLocaleDateString() : "N/A";
  return /* @__PURE__ */ jsxDEV26("div", { className: "mx-auto max-w-4xl space-y-8 p-4 md:p-6", children: [
    /* @__PURE__ */ jsxDEV26("h1", { className: "text-3xl font-bold text-gray-900 dark:text-gray-100", children: "Account Settings" }, void 0, !1, {
      fileName: "app/routes/settings.tsx",
      lineNumber: 131,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV26("div", { className: "rounded-lg border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950", children: [
      /* @__PURE__ */ jsxDEV26("h2", { className: "mb-1 text-xl font-semibold text-gray-900 dark:text-gray-100", children: "Profile Information" }, void 0, !1, {
        fileName: "app/routes/settings.tsx",
        lineNumber: 135,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV26("p", { className: "mb-6 text-sm text-gray-500 dark:text-gray-400", children: "Your account details and preferences" }, void 0, !1, {
        fileName: "app/routes/settings.tsx",
        lineNumber: 136,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV26("div", { className: "grid grid-cols-1 gap-6 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxDEV26("div", { children: [
          /* @__PURE__ */ jsxDEV26("label", { className: "mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400", children: "User ID" }, void 0, !1, {
            fileName: "app/routes/settings.tsx",
            lineNumber: 141,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV26("p", { className: "text-sm text-gray-900 dark:text-gray-100", children: userProfile.id || "N/A" }, void 0, !1, {
            fileName: "app/routes/settings.tsx",
            lineNumber: 144,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/settings.tsx",
          lineNumber: 140,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV26("div", { children: [
          /* @__PURE__ */ jsxDEV26("label", { className: "mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400", children: "Name" }, void 0, !1, {
            fileName: "app/routes/settings.tsx",
            lineNumber: 147,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV26("p", { className: "text-sm text-gray-900 dark:text-gray-100", children: userProfile.full_name || "N/A" }, void 0, !1, {
            fileName: "app/routes/settings.tsx",
            lineNumber: 150,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/settings.tsx",
          lineNumber: 146,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV26("div", { children: [
          /* @__PURE__ */ jsxDEV26("label", { className: "mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400", children: "Email" }, void 0, !1, {
            fileName: "app/routes/settings.tsx",
            lineNumber: 153,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV26("p", { className: "text-sm text-gray-900 dark:text-gray-100", children: userProfile.email || "N/A" }, void 0, !1, {
            fileName: "app/routes/settings.tsx",
            lineNumber: 156,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/settings.tsx",
          lineNumber: 152,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV26("div", { children: [
          /* @__PURE__ */ jsxDEV26("label", { className: "mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400", children: "Member Since" }, void 0, !1, {
            fileName: "app/routes/settings.tsx",
            lineNumber: 159,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV26("p", { className: "text-sm text-gray-900 dark:text-gray-100", children: memberSince }, void 0, !1, {
            fileName: "app/routes/settings.tsx",
            lineNumber: 162,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/settings.tsx",
          lineNumber: 158,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/settings.tsx",
        lineNumber: 139,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/settings.tsx",
      lineNumber: 134,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV26("div", { className: "rounded-lg border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950", children: [
      /* @__PURE__ */ jsxDEV26("h2", { className: "mb-1 text-xl font-semibold text-gray-900 dark:text-gray-100", children: "Security" }, void 0, !1, {
        fileName: "app/routes/settings.tsx",
        lineNumber: 169,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV26("p", { className: "mb-6 text-sm text-gray-500 dark:text-gray-400", children: "Manage your password and security settings" }, void 0, !1, {
        fileName: "app/routes/settings.tsx",
        lineNumber: 170,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV26("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxDEV26("div", { children: [
          /* @__PURE__ */ jsxDEV26("h3", { className: "font-medium text-gray-900 dark:text-gray-100", children: "Password" }, void 0, !1, {
            fileName: "app/routes/settings.tsx",
            lineNumber: 175,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV26("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Update your account password." }, void 0, !1, {
            fileName: "app/routes/settings.tsx",
            lineNumber: 176,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV26(
            "button",
            {
              type: "button",
              onClick: () => setIsPasswordModalOpen(!0),
              className: "mt-2 text-sm font-medium text-blue-600 hover:underline dark:text-blue-400",
              children: "Change password"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/settings.tsx",
              lineNumber: 179,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/settings.tsx",
          lineNumber: 174,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV26("hr", { className: "dark:border-gray-700" }, void 0, !1, {
          fileName: "app/routes/settings.tsx",
          lineNumber: 187,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV26("div", { children: [
          /* @__PURE__ */ jsxDEV26("h3", { className: "font-medium text-gray-900 dark:text-gray-100", children: "Two-Factor Authentication" }, void 0, !1, {
            fileName: "app/routes/settings.tsx",
            lineNumber: 189,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV26("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Add an extra layer of security to your account" }, void 0, !1, {
            fileName: "app/routes/settings.tsx",
            lineNumber: 190,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV26("button", { className: "mt-2 text-sm font-medium text-blue-600 hover:underline dark:text-blue-400", children: "Enable two-factor authentication " }, void 0, !1, {
            fileName: "app/routes/settings.tsx",
            lineNumber: 193,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/settings.tsx",
          lineNumber: 188,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/settings.tsx",
        lineNumber: 173,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/settings.tsx",
      lineNumber: 168,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV26("div", { className: "rounded-lg border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950", children: [
      /* @__PURE__ */ jsxDEV26("h2", { className: "mb-1 text-xl font-semibold text-gray-900 dark:text-gray-100", children: "Appearance" }, void 0, !1, {
        fileName: "app/routes/settings.tsx",
        lineNumber: 202,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV26("p", { className: "mb-6 text-sm text-gray-500 dark:text-gray-400", children: "Customize the look and feel of the application." }, void 0, !1, {
        fileName: "app/routes/settings.tsx",
        lineNumber: 203,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV26("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxDEV26("h3", { className: "font-medium text-gray-900 dark:text-gray-100", children: "Dark Mode" }, void 0, !1, {
          fileName: "app/routes/settings.tsx",
          lineNumber: 207,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV26("label", { htmlFor: "theme-toggle", className: "relative inline-flex cursor-pointer items-center", children: [
          /* @__PURE__ */ jsxDEV26(
            "input",
            {
              type: "checkbox",
              id: "theme-toggle",
              className: "peer sr-only",
              checked: theme === "dark",
              onChange: toggleTheme
            },
            void 0,
            !1,
            {
              fileName: "app/routes/settings.tsx",
              lineNumber: 209,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV26("div", { className: "peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800" }, void 0, !1, {
            fileName: "app/routes/settings.tsx",
            lineNumber: 216,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV26("span", { className: "ml-3 text-sm font-medium text-gray-900 dark:text-gray-300", children: theme === "dark" ? "On" : "Off" }, void 0, !1, {
            fileName: "app/routes/settings.tsx",
            lineNumber: 217,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/settings.tsx",
          lineNumber: 208,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/settings.tsx",
        lineNumber: 206,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/settings.tsx",
      lineNumber: 201,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV26(
      ChangePasswordModal,
      {
        isOpen: isPasswordModalOpen,
        setIsOpen: setIsPasswordModalOpen
      },
      void 0,
      !1,
      {
        fileName: "app/routes/settings.tsx",
        lineNumber: 225,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/routes/settings.tsx",
    lineNumber: 130,
    columnNumber: 5
  }, this);
}
function ErrorBoundary2() {
  let error = useRouteError2();
  console.error("Settings Route Error Boundary caught error:", error);
  let errorMessage = "An unexpected error occurred loading settings.", errorStatus = 500, errorDetails = "";
  return isRouteErrorResponse2(error) ? (errorMessage = error.data?.message || error.data || error.statusText || "Error", errorStatus = error.status) : error instanceof Error ? (errorMessage = error.message, errorDetails = error.stack || "") : typeof error == "string" && (errorMessage = error), /* @__PURE__ */ jsxDEV26("div", { className: "mx-auto max-w-4xl space-y-4 rounded-lg border border-red-300 bg-red-50 p-6 text-center shadow-sm dark:border-red-700 dark:bg-red-950", children: [
    /* @__PURE__ */ jsxDEV26("h1", { className: "text-2xl font-bold text-red-700 dark:text-red-300", children: "Account Settings Error" }, void 0, !1, {
      fileName: "app/routes/settings.tsx",
      lineNumber: 255,
      columnNumber: 8
    }, this),
    /* @__PURE__ */ jsxDEV26("p", { className: "text-red-600 dark:text-red-400", children: [
      "Status: ",
      errorStatus
    ] }, void 0, !0, {
      fileName: "app/routes/settings.tsx",
      lineNumber: 256,
      columnNumber: 8
    }, this),
    /* @__PURE__ */ jsxDEV26("p", { className: "text-red-600 dark:text-red-400", children: errorMessage }, void 0, !1, {
      fileName: "app/routes/settings.tsx",
      lineNumber: 257,
      columnNumber: 8
    }, this),
    errorDetails && /* @__PURE__ */ jsxDEV26("pre", { className: "mt-2 overflow-auto whitespace-pre-wrap rounded bg-red-100 p-2 text-left text-xs text-red-800 dark:bg-red-900/50 dark:text-red-200", children: /* @__PURE__ */ jsxDEV26("code", { children: errorDetails }, void 0, !1, {
      fileName: "app/routes/settings.tsx",
      lineNumber: 260,
      columnNumber: 12
    }, this) }, void 0, !1, {
      fileName: "app/routes/settings.tsx",
      lineNumber: 259,
      columnNumber: 10
    }, this),
    /* @__PURE__ */ jsxDEV26("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: "Please try refreshing the page or contact support if the problem persists." }, void 0, !1, {
      fileName: "app/routes/settings.tsx",
      lineNumber: 263,
      columnNumber: 8
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/settings.tsx",
    lineNumber: 254,
    columnNumber: 6
  }, this);
}

// app/routes/transfer.tsx
var transfer_exports = {};
__export(transfer_exports, {
  action: () => action2,
  default: () => TransferRoute,
  loader: () => loader5,
  meta: () => meta4
});
import { json as json5 } from "@remix-run/node";
import { Form as Form8, useActionData as useActionData3, useNavigation, useLoaderData as useLoaderData5 } from "@remix-run/react";
import { useState as useState17 } from "react";

// app/components/DashboardCard.tsx
import { jsxDEV as jsxDEV27 } from "react/jsx-dev-runtime";
function DashboardCard({ title, value, icon, description, className }) {
  return /* @__PURE__ */ jsxDEV27("div", { className: cn("rounded-lg border bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900", className), children: [
    /* @__PURE__ */ jsxDEV27("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxDEV27("p", { className: "text-sm font-medium text-gray-500 dark:text-gray-400", children: title }, void 0, !1, {
        fileName: "app/components/DashboardCard.tsx",
        lineNumber: 16,
        columnNumber: 9
      }, this),
      icon
    ] }, void 0, !0, {
      fileName: "app/components/DashboardCard.tsx",
      lineNumber: 15,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV27("div", { className: "mt-2", children: [
      /* @__PURE__ */ jsxDEV27("p", { className: "text-2xl font-semibold", children: value }, void 0, !1, {
        fileName: "app/components/DashboardCard.tsx",
        lineNumber: 20,
        columnNumber: 9
      }, this),
      description && /* @__PURE__ */ jsxDEV27("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: description }, void 0, !1, {
        fileName: "app/components/DashboardCard.tsx",
        lineNumber: 22,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/DashboardCard.tsx",
      lineNumber: 19,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/DashboardCard.tsx",
    lineNumber: 14,
    columnNumber: 5
  }, this);
}

// app/components/UserCombobox.tsx
import * as React18 from "react";
import { Check as Check2, ChevronsUpDown } from "lucide-react";

// app/components/ui/command.tsx
import * as React16 from "react";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";
import { jsxDEV as jsxDEV28 } from "react/jsx-dev-runtime";
var Command = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV28(
  CommandPrimitive,
  {
    ref,
    className: cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className
    ),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/command.tsx",
    lineNumber: 13,
    columnNumber: 3
  },
  this
));
Command.displayName = CommandPrimitive.displayName;
var CommandInput = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV28("div", { className: "flex items-center border-b px-3", "cmdk-input-wrapper": "", children: [
  /* @__PURE__ */ jsxDEV28(Search, { className: "mr-2 h-4 w-4 shrink-0 opacity-50" }, void 0, !1, {
    fileName: "app/components/ui/command.tsx",
    lineNumber: 43,
    columnNumber: 5
  }, this),
  /* @__PURE__ */ jsxDEV28(
    CommandPrimitive.Input,
    {
      ref,
      className: cn(
        "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props
    },
    void 0,
    !1,
    {
      fileName: "app/components/ui/command.tsx",
      lineNumber: 44,
      columnNumber: 5
    },
    this
  )
] }, void 0, !0, {
  fileName: "app/components/ui/command.tsx",
  lineNumber: 42,
  columnNumber: 3
}, this));
CommandInput.displayName = CommandPrimitive.Input.displayName;
var CommandList = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV28(
  CommandPrimitive.List,
  {
    ref,
    className: cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/command.tsx",
    lineNumber: 61,
    columnNumber: 3
  },
  this
));
CommandList.displayName = CommandPrimitive.List.displayName;
var CommandEmpty = React16.forwardRef((props, ref) => /* @__PURE__ */ jsxDEV28(
  CommandPrimitive.Empty,
  {
    ref,
    className: "py-6 text-center text-sm",
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/command.tsx",
    lineNumber: 74,
    columnNumber: 3
  },
  this
));
CommandEmpty.displayName = CommandPrimitive.Empty.displayName;
var CommandGroup = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV28(
  CommandPrimitive.Group,
  {
    ref,
    className: cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    ),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/command.tsx",
    lineNumber: 87,
    columnNumber: 3
  },
  this
));
CommandGroup.displayName = CommandPrimitive.Group.displayName;
var CommandSeparator = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV28(
  CommandPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 h-px bg-border", className),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/command.tsx",
    lineNumber: 103,
    columnNumber: 3
  },
  this
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;
var CommandItem = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV28(
  CommandPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/command.tsx",
    lineNumber: 115,
    columnNumber: 3
  },
  this
));
CommandItem.displayName = CommandPrimitive.Item.displayName;
var CommandShortcut = ({
  className,
  ...props
}) => /* @__PURE__ */ jsxDEV28(
  "span",
  {
    className: cn(
      "ml-auto text-xs tracking-widest text-muted-foreground",
      className
    ),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/command.tsx",
    lineNumber: 132,
    columnNumber: 5
  },
  this
);
CommandShortcut.displayName = "CommandShortcut";

// app/components/ui/popover.tsx
import * as React17 from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { jsxDEV as jsxDEV29 } from "react/jsx-dev-runtime";
var Popover = PopoverPrimitive.Root, PopoverTrigger = PopoverPrimitive.Trigger, PopoverContent = React17.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsxDEV29(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsxDEV29(
  PopoverPrimitive.Content,
  {
    ref,
    align,
    sideOffset,
    className: cn(
      "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/popover.tsx",
    lineNumber: 15,
    columnNumber: 5
  },
  this
) }, void 0, !1, {
  fileName: "app/components/ui/popover.tsx",
  lineNumber: 14,
  columnNumber: 3
}, this));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

// app/components/UserCombobox.tsx
import { jsxDEV as jsxDEV30 } from "react/jsx-dev-runtime";
function UserCombobox({
  users,
  selectedUserId,
  onSelectUser,
  disabled
}) {
  let [open, setOpen] = React18.useState(!1), [value, setValue] = React18.useState(selectedUserId), [searchTerm, setSearchTerm] = React18.useState(""), selectedUser = React18.useMemo(() => users.find((user) => user.id === selectedUserId), [users, selectedUserId]);
  React18.useEffect(() => {
    setValue(selectedUserId);
  }, [selectedUserId]);
  let filteredUsers = React18.useMemo(() => {
    if (!searchTerm)
      return users;
    let lowerCaseSearchTerm = searchTerm.toLowerCase();
    return users.filter(
      (user) => user.fullName.toLowerCase().includes(lowerCaseSearchTerm) || user.id.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }, [users, searchTerm]);
  return /* @__PURE__ */ jsxDEV30(Popover, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxDEV30(PopoverTrigger, { asChild: !0, children: /* @__PURE__ */ jsxDEV30(
      Button,
      {
        variant: "outline",
        role: "combobox",
        "aria-expanded": open,
        className: cn(
          "w-full justify-between",
          !value && "text-muted-foreground"
        ),
        disabled,
        children: [
          selectedUser ? selectedUser.fullName : "Select recipient...",
          /* @__PURE__ */ jsxDEV30(ChevronsUpDown, { className: "ml-2 h-4 w-4 shrink-0 opacity-50" }, void 0, !1, {
            fileName: "app/components/UserCombobox.tsx",
            lineNumber: 76,
            columnNumber: 11
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/components/UserCombobox.tsx",
        lineNumber: 63,
        columnNumber: 9
      },
      this
    ) }, void 0, !1, {
      fileName: "app/components/UserCombobox.tsx",
      lineNumber: 62,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV30(PopoverContent, { className: "w-[--radix-popper-anchor-width] p-0", children: /* @__PURE__ */ jsxDEV30(Command, { children: [
      /* @__PURE__ */ jsxDEV30(
        CommandInput,
        {
          placeholder: "Search user...",
          value: searchTerm,
          onValueChange: setSearchTerm
        },
        void 0,
        !1,
        {
          fileName: "app/components/UserCombobox.tsx",
          lineNumber: 81,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV30(CommandEmpty, { children: searchTerm ? "No user found." : "No users available." }, void 0, !1, {
        fileName: "app/components/UserCombobox.tsx",
        lineNumber: 87,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV30(CommandGroup, { children: filteredUsers.map((user) => /* @__PURE__ */ jsxDEV30(
        CommandItem,
        {
          value: user.fullName,
          onSelect: () => {
            onSelectUser(user.id), setValue(user.id), setOpen(!1), setSearchTerm("");
          },
          children: [
            /* @__PURE__ */ jsxDEV30(
              Check2,
              {
                className: cn(
                  "mr-2 h-4 w-4",
                  value === user.id ? "opacity-100" : "opacity-0"
                )
              },
              void 0,
              !1,
              {
                fileName: "app/components/UserCombobox.tsx",
                lineNumber: 100,
                columnNumber: 17
              },
              this
            ),
            user.fullName,
            " (",
            user.id,
            ")"
          ]
        },
        user.id,
        !0,
        {
          fileName: "app/components/UserCombobox.tsx",
          lineNumber: 90,
          columnNumber: 15
        },
        this
      )) }, void 0, !1, {
        fileName: "app/components/UserCombobox.tsx",
        lineNumber: 88,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/UserCombobox.tsx",
      lineNumber: 80,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/components/UserCombobox.tsx",
      lineNumber: 79,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/UserCombobox.tsx",
    lineNumber: 61,
    columnNumber: 5
  }, this);
}

// app/routes/transfer.tsx
import { jsxDEV as jsxDEV31 } from "react/jsx-dev-runtime";
var meta4 = () => [{ title: "Transfer ESSENCE" }, { name: "description", content: "Send ESSENCE to others" }];
async function loader5({ request }) {
  let currentUserId = new URL(request.url).searchParams.get("userId");
  if (!currentUserId)
    return json5([]);
  let { data, error } = await supabase.from("transactions").select("*").eq("user_id", currentUserId).eq("type", "Transfer Out").order("date", { ascending: !1 }).limit(5);
  return json5(data || []);
}
async function action2({ request }) {
  let formData = await request.formData(), amount = Number(formData.get("amount")), note = formData.get("note")?.toString(), recipientId = formData.get("recipient")?.toString(), senderId = formData.get("senderId")?.toString();
  if (!amount || amount <= 0)
    return json5({ error: "Enter a valid amount" }, { status: 400 });
  if (!recipientId)
    return json5({ error: "Please select a recipient" }, { status: 400 });
  if (!senderId)
    return json5({ error: "Sender ID is missing" }, { status: 400 });
  let { data: sender, error: senderError } = await supabase.from("profiles").select("id, balance, full_name").eq("id", senderId).single(), { data: recipient, error: recipientError } = await supabase.from("profiles").select("id, balance, full_name").eq("id", recipientId).single();
  if (senderError || !sender)
    return json5({ error: "Sender not found" }, { status: 404 });
  if (recipientError || !recipient)
    return json5({ error: "Recipient not found" }, { status: 404 });
  if (sender.balance < amount)
    return json5({ error: "Insufficient balance" }, { status: 400 });
  let senderNewBalance = sender.balance - amount, recipientNewBalance = recipient.balance + amount, { error: updateSender } = await supabase.from("profiles").update({ balance: senderNewBalance }).eq("id", senderId);
  if (updateSender)
    return json5({ error: "Failed to update sender balance" }, { status: 500 });
  let { error: updateRecipient } = await supabase.from("profiles").update({ balance: recipientNewBalance }).eq("id", recipientId);
  if (updateRecipient)
    return json5({ error: "Failed to update recipient balance" }, { status: 500 });
  let { data: txn, error: txnErr } = await supabase.from("transactions").insert({
    user_id: senderId,
    type: "Transfer Out",
    narration: `Transfer to ${recipient.full_name}${note ? ` - ${note}` : ""}`,
    debit: amount,
    credit: null,
    balance: senderNewBalance
  }).select().single();
  return await supabase.from("transactions").insert({
    user_id: recipientId,
    type: "Transfer In",
    narration: `Transfer from ${sender.full_name}${note ? ` - ${note}` : ""}`,
    debit: null,
    credit: amount,
    balance: recipientNewBalance
  }), txnErr || !txn ? json5({ error: "Transfer saved but transaction not logged." }, { status: 500 }) : json5({
    success: !0,
    message: `Sent ${amount} ESSENCE to ${recipient.full_name}`
  });
}
function TransferRoute() {
  let navigation = useNavigation(), actionData = useActionData3(), isSubmitting = navigation.state === "submitting", transfers = useLoaderData5(), {
    currentUser,
    users
  } = useStore((state) => ({
    currentUser: state.currentUser,
    users: state.users
  })), [recipient, setRecipient] = useState17(""), [amount, setAmount] = useState17(""), [note, setNote] = useState17("");
  return /* @__PURE__ */ jsxDEV31("div", { className: "max-w-2xl mx-auto p-4 space-y-8", children: [
    /* @__PURE__ */ jsxDEV31("h1", { className: "text-2xl font-bold", children: "Transfer ESSENCE" }, void 0, !1, {
      fileName: "app/routes/transfer.tsx",
      lineNumber: 133,
      columnNumber: 7
    }, this),
    currentUser && /* @__PURE__ */ jsxDEV31(
      DashboardCard,
      {
        title: "Your Balance",
        value: `${currentUser.balance.toLocaleString()} ESSENCE`
      },
      void 0,
      !1,
      {
        fileName: "app/routes/transfer.tsx",
        lineNumber: 136,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ jsxDEV31(Form8, { method: "post", className: "space-y-4", children: [
      /* @__PURE__ */ jsxDEV31("input", { type: "hidden", name: "senderId", value: currentUser?.id }, void 0, !1, {
        fileName: "app/routes/transfer.tsx",
        lineNumber: 143,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV31("div", { children: [
        /* @__PURE__ */ jsxDEV31("label", { className: "block font-medium", children: "Recipient" }, void 0, !1, {
          fileName: "app/routes/transfer.tsx",
          lineNumber: 145,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV31(
          UserCombobox,
          {
            users: users.filter((u) => u.id !== currentUser?.id),
            selectedUserId: recipient,
            onChange: setRecipient
          },
          void 0,
          !1,
          {
            fileName: "app/routes/transfer.tsx",
            lineNumber: 146,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV31("input", { type: "hidden", name: "recipient", value: recipient }, void 0, !1, {
          fileName: "app/routes/transfer.tsx",
          lineNumber: 151,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/transfer.tsx",
        lineNumber: 144,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV31("div", { children: [
        /* @__PURE__ */ jsxDEV31("label", { className: "block font-medium", children: "Amount" }, void 0, !1, {
          fileName: "app/routes/transfer.tsx",
          lineNumber: 155,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV31(
          "input",
          {
            type: "number",
            name: "amount",
            value: amount,
            onChange: (e) => setAmount(e.target.value),
            required: !0,
            className: "w-full p-2 border rounded"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/transfer.tsx",
            lineNumber: 156,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/transfer.tsx",
        lineNumber: 154,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV31("div", { children: [
        /* @__PURE__ */ jsxDEV31("label", { className: "block font-medium", children: "Note (optional)" }, void 0, !1, {
          fileName: "app/routes/transfer.tsx",
          lineNumber: 167,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV31(
          "textarea",
          {
            name: "note",
            value: note,
            onChange: (e) => setNote(e.target.value),
            rows: 3,
            className: "w-full p-2 border rounded"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/transfer.tsx",
            lineNumber: 168,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/transfer.tsx",
        lineNumber: 166,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV31(
        "button",
        {
          type: "submit",
          disabled: isSubmitting || !recipient,
          className: "bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50",
          children: isSubmitting ? "Transferring..." : "Send"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/transfer.tsx",
          lineNumber: 177,
          columnNumber: 9
        },
        this
      ),
      actionData?.error && /* @__PURE__ */ jsxDEV31("p", { className: "text-red-600 mt-2", children: actionData.error }, void 0, !1, {
        fileName: "app/routes/transfer.tsx",
        lineNumber: 186,
        columnNumber: 11
      }, this),
      actionData?.success && /* @__PURE__ */ jsxDEV31("p", { className: "text-green-600 mt-2", children: actionData.message }, void 0, !1, {
        fileName: "app/routes/transfer.tsx",
        lineNumber: 189,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/transfer.tsx",
      lineNumber: 142,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV31("div", { children: [
      /* @__PURE__ */ jsxDEV31("h2", { className: "text-lg font-semibold mt-8", children: "Recent Transfers" }, void 0, !1, {
        fileName: "app/routes/transfer.tsx",
        lineNumber: 194,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV31("ul", { className: "mt-4 space-y-2", children: transfers.map((t) => /* @__PURE__ */ jsxDEV31("li", { className: "p-3 border rounded shadow-sm", children: [
        /* @__PURE__ */ jsxDEV31("div", { className: "text-sm text-gray-600", children: t.narration }, void 0, !1, {
          fileName: "app/routes/transfer.tsx",
          lineNumber: 198,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV31("div", { className: "text-right font-semibold text-red-600", children: [
          "-",
          t.debit,
          " ESSENCE"
        ] }, void 0, !0, {
          fileName: "app/routes/transfer.tsx",
          lineNumber: 199,
          columnNumber: 15
        }, this)
      ] }, t.id, !0, {
        fileName: "app/routes/transfer.tsx",
        lineNumber: 197,
        columnNumber: 13
      }, this)) }, void 0, !1, {
        fileName: "app/routes/transfer.tsx",
        lineNumber: 195,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/transfer.tsx",
      lineNumber: 193,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/transfer.tsx",
    lineNumber: 132,
    columnNumber: 5
  }, this);
}

// app/routes/reports.tsx
var reports_exports = {};
__export(reports_exports, {
  default: () => ReportsPage,
  meta: () => meta5
});
import { jsxDEV as jsxDEV32 } from "react/jsx-dev-runtime";
var meta5 = () => [
  { title: "Life Economy - Reports" },
  { name: "description", content: "View various system reports and analytics." }
];
function ReportsPage() {
  return /* @__PURE__ */ jsxDEV32("div", { className: "container mx-auto p-4 md:p-6", children: [
    /* @__PURE__ */ jsxDEV32("h1", { className: "text-2xl font-semibold mb-4", children: "Reports" }, void 0, !1, {
      fileName: "app/routes/reports.tsx",
      lineNumber: 13,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV32("p", { className: "text-gray-700 dark:text-gray-300", children: "This page will display various system reports and analytics." }, void 0, !1, {
      fileName: "app/routes/reports.tsx",
      lineNumber: 14,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV32("p", { className: "mt-4 text-gray-500 dark:text-gray-400", children: "(Content for Reports will be implemented here.)" }, void 0, !1, {
      fileName: "app/routes/reports.tsx",
      lineNumber: 17,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/reports.tsx",
    lineNumber: 12,
    columnNumber: 5
  }, this);
}

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => Index,
  loader: () => loader6
});
import { json as json6, redirect as redirect5 } from "@remix-run/node";
import { useEffect as useEffect13 } from "react";
import { jsxDEV as jsxDEV33 } from "react/jsx-dev-runtime";
async function loader6({ request }) {
  console.log("[Loader - _index] Index route loader executed.");
  let headers = new Headers();
  if (await getAuthSession(request))
    throw console.log("[Loader - _index] Session found, redirecting to /dashboard."), redirect5("/dashboard", { headers });
  return json6({});
}
function Index() {
  let currentUser = useStore((state) => state.currentUser);
  return useEffect13(() => {
    console.log("[Index Component] Current user from Zustand:", currentUser);
  }, [currentUser]), /* @__PURE__ */ jsxDEV33("div", { className: "flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4 dark:bg-gray-950", children: /* @__PURE__ */ jsxDEV33("div", { className: "w-full max-w-2xl rounded-lg bg-white p-8 shadow-lg dark:bg-gray-900", children: [
    /* @__PURE__ */ jsxDEV33("h1", { className: "mb-6 text-center text-4xl font-bold text-gray-900 dark:text-white", children: "Welcome to Life Economy!" }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 33,
      columnNumber: 9
    }, this),
    currentUser ? /* @__PURE__ */ jsxDEV33("div", { className: "text-center text-lg text-gray-700 dark:text-gray-300", children: [
      /* @__PURE__ */ jsxDEV33("p", { children: [
        "You are logged in as ",
        /* @__PURE__ */ jsxDEV33("span", { className: "font-semibold", children: currentUser.fullName || currentUser.email }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 38,
          columnNumber: 37
        }, this),
        "."
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 38,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV33("p", { children: [
        "Your current balance is: ",
        /* @__PURE__ */ jsxDEV33("span", { className: "font-semibold", children: [
          "$",
          currentUser.balance.toFixed(2)
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 39,
          columnNumber: 41
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 39,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV33("p", { className: "mt-4", children: "Explore the features and manage your life's economy." }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 40,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 37,
      columnNumber: 11
    }, this) : /* @__PURE__ */ jsxDEV33("div", { className: "text-center text-lg text-gray-700 dark:text-gray-300", children: [
      /* @__PURE__ */ jsxDEV33("p", { children: "Please sign in to access your dashboard and manage your economy." }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 44,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV33("p", { className: "mt-4", children: /* @__PURE__ */ jsxDEV33(
        "a",
        {
          href: "/login",
          className: "inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-offset-gray-900",
          children: "Sign In"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/_index.tsx",
          lineNumber: 46,
          columnNumber: 15
        },
        this
      ) }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 45,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 43,
      columnNumber: 11
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 32,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 31,
    columnNumber: 5
  }, this);
}

// app/routes/logout.tsx
var logout_exports = {};
__export(logout_exports, {
  action: () => action3,
  default: () => LogoutRoute
});
async function action3({ request }) {
  return signOut(request);
}
function LogoutRoute() {
  return null;
}

// app/routes/market.tsx
var market_exports = {};
__export(market_exports, {
  action: () => action4,
  default: () => Marketplace,
  loader: () => loader7
});
import { useState as useState24, useMemo as useMemo7, useEffect as useEffect18, useCallback as useCallback3, useRef } from "react";
import { useNavigation as useNavigation6, useActionData as useActionData8, useLoaderData as useLoaderData6 } from "@remix-run/react";
import { json as json7, unstable_parseMultipartFormData, unstable_createMemoryUploadHandler } from "@remix-run/node";

// app/components/market/MarketplaceItemCard.tsx
import { jsxDEV as jsxDEV34 } from "react/jsx-dev-runtime";
function MarketplaceItemCard({ item, onViewDetails }) {
  let { name, description, price, imageUrl, stock } = item, isAvailable = stock === -1 || stock > 0;
  return /* @__PURE__ */ jsxDEV34(
    "div",
    {
      className: "group cursor-pointer overflow-hidden rounded-lg border bg-white shadow-sm transition-shadow duration-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800",
      onClick: () => onViewDetails(item),
      children: [
        /* @__PURE__ */ jsxDEV34(
          "img",
          {
            src: imageUrl,
            alt: name,
            className: "h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          },
          void 0,
          !1,
          {
            fileName: "app/components/market/MarketplaceItemCard.tsx",
            lineNumber: 19,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ jsxDEV34("div", { className: "p-4", children: [
          /* @__PURE__ */ jsxDEV34("h3", { className: "text-lg font-semibold text-gray-900 dark:text-gray-100", children: name }, void 0, !1, {
            fileName: "app/components/market/MarketplaceItemCard.tsx",
            lineNumber: 25,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV34("p", { className: "mt-1 line-clamp-2 text-sm text-gray-600 dark:text-gray-400", children: description }, void 0, !1, {
            fileName: "app/components/market/MarketplaceItemCard.tsx",
            lineNumber: 26,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV34("div", { className: "mt-3 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxDEV34("span", { className: "text-base font-bold text-indigo-600 dark:text-indigo-400", children: [
              price,
              " ",
              /* @__PURE__ */ jsxDEV34("span", { className: "text-xs font-normal", children: "ESSENCE" }, void 0, !1, {
                fileName: "app/components/market/MarketplaceItemCard.tsx",
                lineNumber: 29,
                columnNumber: 21
              }, this)
            ] }, void 0, !0, {
              fileName: "app/components/market/MarketplaceItemCard.tsx",
              lineNumber: 28,
              columnNumber: 11
            }, this),
            stock !== -1 && // Display stock only if it's tracked
            /* @__PURE__ */ jsxDEV34("span", { className: `text-xs font-medium ${isAvailable ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`, children: isAvailable ? `${stock} in stock` : "Out of stock" }, void 0, !1, {
              fileName: "app/components/market/MarketplaceItemCard.tsx",
              lineNumber: 32,
              columnNumber: 14
            }, this),
            stock === -1 && // Indicate unlimited items
            /* @__PURE__ */ jsxDEV34("span", { className: "text-xs font-medium text-blue-600 dark:text-blue-400", children: "Unlimited" }, void 0, !1, {
              fileName: "app/components/market/MarketplaceItemCard.tsx",
              lineNumber: 37,
              columnNumber: 14
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/market/MarketplaceItemCard.tsx",
            lineNumber: 27,
            columnNumber: 9
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/market/MarketplaceItemCard.tsx",
          lineNumber: 24,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/components/market/MarketplaceItemCard.tsx",
      lineNumber: 15,
      columnNumber: 5
    },
    this
  );
}

// app/components/market/ProductGrid.tsx
import { jsxDEV as jsxDEV35 } from "react/jsx-dev-runtime";
function ProductGrid({ items, onSelectItem }) {
  return !items || items.length === 0 ? /* @__PURE__ */ jsxDEV35("p", { className: "text-center text-gray-500 dark:text-gray-400", children: "No items found." }, void 0, !1, {
    fileName: "app/components/market/ProductGrid.tsx",
    lineNumber: 11,
    columnNumber: 12
  }, this) : /* @__PURE__ */ jsxDEV35("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4", children: items.map((item) => /* @__PURE__ */ jsxDEV35(MarketplaceItemCard, { item, onViewDetails: onSelectItem }, item.id, !1, {
    fileName: "app/components/market/ProductGrid.tsx",
    lineNumber: 17,
    columnNumber: 9
  }, this)) }, void 0, !1, {
    fileName: "app/components/market/ProductGrid.tsx",
    lineNumber: 15,
    columnNumber: 5
  }, this);
}

// app/components/market/SearchBar.tsx
import { Search as Search2 } from "lucide-react";
import { jsxDEV as jsxDEV36 } from "react/jsx-dev-runtime";
function SearchBar({ searchTerm, onSearchChange }) {
  return /* @__PURE__ */ jsxDEV36("div", { className: "relative flex-1", children: [
    /* @__PURE__ */ jsxDEV36(Search2, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" }, void 0, !1, {
      fileName: "app/components/market/SearchBar.tsx",
      lineNumber: 11,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV36(
      "input",
      {
        type: "text",
        placeholder: "Search items...",
        value: searchTerm,
        onChange: (e) => onSearchChange(e.target.value),
        className: "w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400"
      },
      void 0,
      !1,
      {
        fileName: "app/components/market/SearchBar.tsx",
        lineNumber: 12,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/components/market/SearchBar.tsx",
    lineNumber: 10,
    columnNumber: 5
  }, this);
}

// app/components/market/FilterSortPanel.tsx
import { jsxDEV as jsxDEV37 } from "react/jsx-dev-runtime";
function FilterSortPanel({
  categories,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange
}) {
  let sortOptions = [
    { value: "default", label: "Default" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "name-asc", label: "Name: A to Z" },
    { value: "name-desc", label: "Name: Z to A" }
  ];
  return /* @__PURE__ */ jsxDEV37("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end flex-1", children: [
    /* @__PURE__ */ jsxDEV37("div", { className: "flex-1 sm:flex-none", children: [
      /* @__PURE__ */ jsxDEV37("label", { htmlFor: "category-filter", className: "sr-only", children: "Filter by category" }, void 0, !1, {
        fileName: "app/components/market/FilterSortPanel.tsx",
        lineNumber: 30,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV37(
        "select",
        {
          id: "category-filter",
          value: selectedCategory,
          onChange: (e) => onCategoryChange(e.target.value),
          className: "w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400",
          children: [
            /* @__PURE__ */ jsxDEV37("option", { value: "all", children: "All Categories" }, void 0, !1, {
              fileName: "app/components/market/FilterSortPanel.tsx",
              lineNumber: 37,
              columnNumber: 11
            }, this),
            categories.map((category) => /* @__PURE__ */ jsxDEV37("option", { value: category, children: category }, category, !1, {
              fileName: "app/components/market/FilterSortPanel.tsx",
              lineNumber: 39,
              columnNumber: 13
            }, this))
          ]
        },
        void 0,
        !0,
        {
          fileName: "app/components/market/FilterSortPanel.tsx",
          lineNumber: 31,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/components/market/FilterSortPanel.tsx",
      lineNumber: 29,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV37("div", { className: "flex-1 sm:flex-none", children: [
      /* @__PURE__ */ jsxDEV37("label", { htmlFor: "sort-by", className: "sr-only", children: "Sort by" }, void 0, !1, {
        fileName: "app/components/market/FilterSortPanel.tsx",
        lineNumber: 48,
        columnNumber: 10
      }, this),
      /* @__PURE__ */ jsxDEV37(
        "select",
        {
          id: "sort-by",
          value: sortBy,
          onChange: (e) => onSortChange(e.target.value),
          className: "w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400",
          children: sortOptions.map((option) => /* @__PURE__ */ jsxDEV37("option", { value: option.value, children: option.label }, option.value, !1, {
            fileName: "app/components/market/FilterSortPanel.tsx",
            lineNumber: 56,
            columnNumber: 13
          }, this))
        },
        void 0,
        !1,
        {
          fileName: "app/components/market/FilterSortPanel.tsx",
          lineNumber: 49,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/components/market/FilterSortPanel.tsx",
      lineNumber: 47,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/market/FilterSortPanel.tsx",
    lineNumber: 27,
    columnNumber: 5
  }, this);
}

// app/components/market/ProductDetailModal.tsx
import { useState as useState18, useEffect as useEffect14 } from "react";
import { Form as Form9, useNavigation as useNavigation2, useActionData as useActionData4 } from "@remix-run/react";
import { X, Minus, Plus } from "lucide-react";
import { jsxDEV as jsxDEV38 } from "react/jsx-dev-runtime";
function ProductDetailModal({ item, onClose }) {
  let navigation = useNavigation2(), actionData = useActionData4(), { currentUser } = useStore((state) => ({
    currentUser: state.currentUser
  })), [quantity, setQuantity] = useState18(1), [feedbackMessage, setFeedbackMessage] = useState18(null);
  if (useEffect14(() => {
    item && (setQuantity(1), setFeedbackMessage(null));
  }, [item]), useEffect14(() => {
    if (actionData && actionData.intent === "purchaseItem")
      if (actionData.success) {
        setFeedbackMessage({ type: "success", message: actionData.message || "Purchase successful!" });
        let timer = setTimeout(() => {
          onClose();
        }, 1500);
        return () => clearTimeout(timer);
      } else
        setFeedbackMessage({ type: "error", message: actionData.error || "Purchase failed. Please try again." });
  }, [actionData, onClose]), !item)
    return null;
  let { id: itemId, name, description, price, imageUrl, category, stock } = item, isUnlimitedStock = stock === -1, currentItemStock = actionData?.intent === "purchaseItem" && actionData.success && actionData.updatedItem?.id === itemId ? actionData.updatedItem.stock : stock, maxQuantity = isUnlimitedStock ? 1 / 0 : currentItemStock, totalPrice = price * quantity, isStockAvailableForQuantity = isUnlimitedStock || currentItemStock >= quantity, currentUserBalance = actionData?.intent === "purchaseItem" && actionData.success && actionData.finalBalance !== void 0 && currentUser?.id === actionData.userId ? actionData.finalBalance : currentUser?.balance, canAfford = currentUserBalance !== void 0 && currentUserBalance >= totalPrice, canPurchase = isStockAvailableForQuantity && canAfford && (isUnlimitedStock || currentItemStock > 0), isSubmitting = navigation.state === "submitting" && navigation.formData?.get("intent") === "purchaseItem", handleQuantityChange = (newQuantity) => {
    let validQuantity = Math.max(1, Math.min(newQuantity, maxQuantity === 1 / 0 ? 999 : maxQuantity));
    setQuantity(validQuantity), setFeedbackMessage(null);
  };
  return /* @__PURE__ */ jsxDEV38("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm", children: /* @__PURE__ */ jsxDEV38("div", { className: "relative w-full max-w-lg rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800", children: [
    /* @__PURE__ */ jsxDEV38(
      "button",
      {
        onClick: onClose,
        className: "absolute top-3 right-3 rounded-full p-1 text-gray-500 hover:bg-gray-200 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-100",
        "aria-label": "Close modal",
        children: /* @__PURE__ */ jsxDEV38(X, { size: 20 }, void 0, !1, {
          fileName: "app/components/market/ProductDetailModal.tsx",
          lineNumber: 86,
          columnNumber: 11
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/components/market/ProductDetailModal.tsx",
        lineNumber: 81,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ jsxDEV38(Form9, { method: "post", action: "/market", className: "flex flex-col gap-6 md:flex-row", children: [
      /* @__PURE__ */ jsxDEV38("input", { type: "hidden", name: "intent", value: "purchaseItem" }, void 0, !1, {
        fileName: "app/components/market/ProductDetailModal.tsx",
        lineNumber: 90,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV38("input", { type: "hidden", name: "itemId", value: itemId }, void 0, !1, {
        fileName: "app/components/market/ProductDetailModal.tsx",
        lineNumber: 91,
        columnNumber: 11
      }, this),
      currentUser && /* @__PURE__ */ jsxDEV38("input", { type: "hidden", name: "userId", value: currentUser.id }, void 0, !1, {
        fileName: "app/components/market/ProductDetailModal.tsx",
        lineNumber: 92,
        columnNumber: 27
      }, this),
      /* @__PURE__ */ jsxDEV38("div", { className: "flex-shrink-0 md:w-1/3", children: /* @__PURE__ */ jsxDEV38(
        "img",
        {
          src: imageUrl,
          alt: name,
          className: "h-auto w-full rounded-md object-cover"
        },
        void 0,
        !1,
        {
          fileName: "app/components/market/ProductDetailModal.tsx",
          lineNumber: 95,
          columnNumber: 13
        },
        this
      ) }, void 0, !1, {
        fileName: "app/components/market/ProductDetailModal.tsx",
        lineNumber: 94,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV38("div", { className: "flex flex-col justify-between md:w-2/3", children: [
        /* @__PURE__ */ jsxDEV38("div", { children: [
          /* @__PURE__ */ jsxDEV38("h2", { className: "mb-2 text-2xl font-semibold text-gray-900 dark:text-gray-100", children: name }, void 0, !1, {
            fileName: "app/components/market/ProductDetailModal.tsx",
            lineNumber: 104,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV38("p", { className: "mb-4 text-sm text-gray-600 dark:text-gray-400", children: description }, void 0, !1, {
            fileName: "app/components/market/ProductDetailModal.tsx",
            lineNumber: 105,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV38("div", { className: "mb-4 space-y-1 text-sm", children: [
            /* @__PURE__ */ jsxDEV38("p", { children: [
              /* @__PURE__ */ jsxDEV38("span", { className: "font-medium text-gray-700 dark:text-gray-300", children: "Category:" }, void 0, !1, {
                fileName: "app/components/market/ProductDetailModal.tsx",
                lineNumber: 107,
                columnNumber: 20
              }, this),
              " ",
              category
            ] }, void 0, !0, {
              fileName: "app/components/market/ProductDetailModal.tsx",
              lineNumber: 107,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV38("p", { children: [
              /* @__PURE__ */ jsxDEV38("span", { className: "font-medium text-gray-700 dark:text-gray-300", children: "Availability:" }, void 0, !1, {
                fileName: "app/components/market/ProductDetailModal.tsx",
                lineNumber: 109,
                columnNumber: 19
              }, this),
              isUnlimitedStock ? /* @__PURE__ */ jsxDEV38("span", { className: "ml-1 text-blue-600 dark:text-blue-400", children: "Unlimited" }, void 0, !1, {
                fileName: "app/components/market/ProductDetailModal.tsx",
                lineNumber: 111,
                columnNumber: 21
              }, this) : /* @__PURE__ */ jsxDEV38("span", { className: `ml-1 ${currentItemStock > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`, children: currentItemStock > 0 ? `${currentItemStock} in stock` : "Out of stock" }, void 0, !1, {
                fileName: "app/components/market/ProductDetailModal.tsx",
                lineNumber: 113,
                columnNumber: 21
              }, this)
            ] }, void 0, !0, {
              fileName: "app/components/market/ProductDetailModal.tsx",
              lineNumber: 108,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV38("p", { children: [
              /* @__PURE__ */ jsxDEV38("span", { className: "font-medium text-gray-700 dark:text-gray-300", children: "Your Balance:" }, void 0, !1, {
                fileName: "app/components/market/ProductDetailModal.tsx",
                lineNumber: 119,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV38("span", { className: "ml-1", children: [
                currentUserBalance ?? "N/A",
                " ESSENCE"
              ] }, void 0, !0, {
                fileName: "app/components/market/ProductDetailModal.tsx",
                lineNumber: 120,
                columnNumber: 19
              }, this)
            ] }, void 0, !0, {
              fileName: "app/components/market/ProductDetailModal.tsx",
              lineNumber: 118,
              columnNumber: 18
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/market/ProductDetailModal.tsx",
            lineNumber: 106,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV38("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsxDEV38("label", { htmlFor: "quantity-input", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Quantity" }, void 0, !1, {
              fileName: "app/components/market/ProductDetailModal.tsx",
              lineNumber: 125,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV38("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsxDEV38(
                "button",
                {
                  type: "button",
                  onClick: () => handleQuantityChange(quantity - 1),
                  disabled: quantity <= 1 || isSubmitting,
                  className: "rounded-l-md border border-r-0 border-gray-300 p-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700",
                  "aria-label": "Decrease quantity",
                  children: /* @__PURE__ */ jsxDEV38(Minus, { size: 16 }, void 0, !1, {
                    fileName: "app/components/market/ProductDetailModal.tsx",
                    lineNumber: 134,
                    columnNumber: 21
                  }, this)
                },
                void 0,
                !1,
                {
                  fileName: "app/components/market/ProductDetailModal.tsx",
                  lineNumber: 127,
                  columnNumber: 19
                },
                this
              ),
              /* @__PURE__ */ jsxDEV38(
                "input",
                {
                  type: "number",
                  id: "quantity-input",
                  name: "quantity",
                  value: quantity,
                  onChange: (e) => handleQuantityChange(parseInt(e.target.value, 10) || 1),
                  min: "1",
                  max: isUnlimitedStock ? void 0 : currentItemStock,
                  readOnly: isSubmitting,
                  className: "w-16 border-y border-gray-300 p-2 text-center text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white",
                  "aria-label": "Quantity"
                },
                void 0,
                !1,
                {
                  fileName: "app/components/market/ProductDetailModal.tsx",
                  lineNumber: 136,
                  columnNumber: 19
                },
                this
              ),
              /* @__PURE__ */ jsxDEV38(
                "button",
                {
                  type: "button",
                  onClick: () => handleQuantityChange(quantity + 1),
                  disabled: !isStockAvailableForQuantity || quantity >= maxQuantity || isSubmitting || !isUnlimitedStock && currentItemStock === 0,
                  className: "rounded-r-md border border-l-0 border-gray-300 p-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700",
                  "aria-label": "Increase quantity",
                  children: /* @__PURE__ */ jsxDEV38(Plus, { size: 16 }, void 0, !1, {
                    fileName: "app/components/market/ProductDetailModal.tsx",
                    lineNumber: 155,
                    columnNumber: 21
                  }, this)
                },
                void 0,
                !1,
                {
                  fileName: "app/components/market/ProductDetailModal.tsx",
                  lineNumber: 148,
                  columnNumber: 19
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "app/components/market/ProductDetailModal.tsx",
              lineNumber: 126,
              columnNumber: 17
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/market/ProductDetailModal.tsx",
            lineNumber: 124,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/market/ProductDetailModal.tsx",
          lineNumber: 103,
          columnNumber: 13
        }, this),
        feedbackMessage && /* @__PURE__ */ jsxDEV38("div", { className: `mt-4 text-sm ${feedbackMessage.type === "success" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`, children: feedbackMessage.message }, void 0, !1, {
          fileName: "app/components/market/ProductDetailModal.tsx",
          lineNumber: 162,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV38("div", { className: "mt-4 flex items-center justify-between border-t pt-4 dark:border-gray-700", children: [
          /* @__PURE__ */ jsxDEV38("span", { className: "text-xl font-bold text-indigo-600 dark:text-indigo-400", children: [
            totalPrice,
            " ",
            /* @__PURE__ */ jsxDEV38("span", { className: "text-sm font-normal", children: "ESSENCE" }, void 0, !1, {
              fileName: "app/components/market/ProductDetailModal.tsx",
              lineNumber: 169,
              columnNumber: 30
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/market/ProductDetailModal.tsx",
            lineNumber: 168,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV38(
            "button",
            {
              type: "submit",
              disabled: !canPurchase || isSubmitting,
              className: `rounded-md px-4 py-2 text-sm font-medium transition-colors ${canPurchase ? "bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800" : "cursor-not-allowed bg-gray-300 text-gray-500 dark:bg-gray-600 dark:text-gray-400"}`,
              children: isSubmitting ? "Processing..." : !isUnlimitedStock && currentItemStock === 0 ? "Out of Stock" : isStockAvailableForQuantity ? canAfford ? `Buy ${quantity}` : "Insufficient Funds" : "Insufficient Stock"
            },
            void 0,
            !1,
            {
              fileName: "app/components/market/ProductDetailModal.tsx",
              lineNumber: 171,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/components/market/ProductDetailModal.tsx",
          lineNumber: 167,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/market/ProductDetailModal.tsx",
        lineNumber: 102,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/market/ProductDetailModal.tsx",
      lineNumber: 89,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/market/ProductDetailModal.tsx",
    lineNumber: 80,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/components/market/ProductDetailModal.tsx",
    lineNumber: 79,
    columnNumber: 5
  }, this);
}

// app/components/market/setup/InventoryTable.tsx
import { useState as useState19, useMemo as useMemo5 } from "react";
import { jsxDEV as jsxDEV39 } from "react/jsx-dev-runtime";
var EditIcon = () => /* @__PURE__ */ jsxDEV39("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsxDEV39("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" }, void 0, !1, {
  fileName: "app/components/market/setup/InventoryTable.tsx",
  lineNumber: 6,
  columnNumber: 138
}, this) }, void 0, !1, {
  fileName: "app/components/market/setup/InventoryTable.tsx",
  lineNumber: 6,
  columnNumber: 24
}, this), DeleteIcon = () => /* @__PURE__ */ jsxDEV39("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsxDEV39("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" }, void 0, !1, {
  fileName: "app/components/market/setup/InventoryTable.tsx",
  lineNumber: 7,
  columnNumber: 140
}, this) }, void 0, !1, {
  fileName: "app/components/market/setup/InventoryTable.tsx",
  lineNumber: 7,
  columnNumber: 26
}, this), SortAscIcon = () => /* @__PURE__ */ jsxDEV39("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-3 w-3 ml-1", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsxDEV39("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 15l7-7 7 7" }, void 0, !1, {
  fileName: "app/components/market/setup/InventoryTable.tsx",
  lineNumber: 8,
  columnNumber: 146
}, this) }, void 0, !1, {
  fileName: "app/components/market/setup/InventoryTable.tsx",
  lineNumber: 8,
  columnNumber: 27
}, this), SortDescIcon = () => /* @__PURE__ */ jsxDEV39("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-3 w-3 ml-1", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsxDEV39("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }, void 0, !1, {
  fileName: "app/components/market/setup/InventoryTable.tsx",
  lineNumber: 9,
  columnNumber: 147
}, this) }, void 0, !1, {
  fileName: "app/components/market/setup/InventoryTable.tsx",
  lineNumber: 9,
  columnNumber: 28
}, this);
function InventoryTable({ items, onEdit, onDelete }) {
  let [searchTerm, setSearchTerm] = useState19(""), [filterCategory, setFilterCategory] = useState19("all"), [filterStatus, setFilterStatus] = useState19("all"), [sortKey, setSortKey] = useState19("name"), [sortDirection, setSortDirection] = useState19("asc"), categories = useMemo5(() => {
    let uniqueCategories = new Set(items.map((item) => item.category));
    return ["all", ...Array.from(uniqueCategories)];
  }, [items]), filteredAndSortedItems = useMemo5(() => {
    let processedItems = [...items];
    if (searchTerm) {
      let lowerCaseSearchTerm = searchTerm.toLowerCase();
      processedItems = processedItems.filter(
        (item) => item.name.toLowerCase().includes(lowerCaseSearchTerm) || item.description.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }
    return filterCategory !== "all" && (processedItems = processedItems.filter((item) => item.category === filterCategory)), filterStatus !== "all" && (processedItems = processedItems.filter((item) => item.status === filterStatus)), processedItems.sort((a, b) => {
      let valA = a[sortKey], valB = b[sortKey];
      sortKey === "stock" && (valA = valA === -1 ? 1 / 0 : valA, valB = valB === -1 ? 1 / 0 : valB);
      let comparison = 0;
      return typeof valA == "string" && typeof valB == "string" ? comparison = valA.localeCompare(valB) : typeof valA == "number" && typeof valB == "number" ? comparison = valA - valB : comparison = String(valA).localeCompare(String(valB)), sortDirection === "asc" ? comparison : comparison * -1;
    }), processedItems;
  }, [items, searchTerm, filterCategory, filterStatus, sortKey, sortDirection]), handleSort = (key) => {
    sortKey === key ? setSortDirection(sortDirection === "asc" ? "desc" : "asc") : (setSortKey(key), setSortDirection("asc"));
  }, getSortIcon = (key) => sortKey !== key ? null : sortDirection === "asc" ? /* @__PURE__ */ jsxDEV39(SortAscIcon, {}, void 0, !1, {
    fileName: "app/components/market/setup/InventoryTable.tsx",
    lineNumber: 93,
    columnNumber: 38
  }, this) : /* @__PURE__ */ jsxDEV39(SortDescIcon, {}, void 0, !1, {
    fileName: "app/components/market/setup/InventoryTable.tsx",
    lineNumber: 93,
    columnNumber: 56
  }, this), lowStockThreshold = 5;
  return /* @__PURE__ */ jsxDEV39("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxDEV39("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxDEV39(
        "input",
        {
          type: "text",
          placeholder: "Search products...",
          value: searchTerm,
          onChange: (e) => setSearchTerm(e.target.value),
          className: "p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
        },
        void 0,
        !1,
        {
          fileName: "app/components/market/setup/InventoryTable.tsx",
          lineNumber: 102,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV39(
        "select",
        {
          value: filterCategory,
          onChange: (e) => setFilterCategory(e.target.value),
          className: "p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600",
          children: categories.map((cat) => /* @__PURE__ */ jsxDEV39("option", { value: cat, children: cat === "all" ? "All Categories" : cat }, cat, !1, {
            fileName: "app/components/market/setup/InventoryTable.tsx",
            lineNumber: 115,
            columnNumber: 13
          }, this))
        },
        void 0,
        !1,
        {
          fileName: "app/components/market/setup/InventoryTable.tsx",
          lineNumber: 109,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV39(
        "select",
        {
          value: filterStatus,
          onChange: (e) => setFilterStatus(e.target.value),
          className: "p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600",
          children: [
            /* @__PURE__ */ jsxDEV39("option", { value: "all", children: "All Statuses" }, void 0, !1, {
              fileName: "app/components/market/setup/InventoryTable.tsx",
              lineNumber: 123,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV39("option", { value: "active", children: "Active" }, void 0, !1, {
              fileName: "app/components/market/setup/InventoryTable.tsx",
              lineNumber: 124,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV39("option", { value: "inactive", children: "Inactive" }, void 0, !1, {
              fileName: "app/components/market/setup/InventoryTable.tsx",
              lineNumber: 125,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "app/components/market/setup/InventoryTable.tsx",
          lineNumber: 118,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/components/market/setup/InventoryTable.tsx",
      lineNumber: 101,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV39("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxDEV39("table", { className: "min-w-full divide-y divide-gray-200 dark:divide-gray-700", children: [
      /* @__PURE__ */ jsxDEV39("thead", { className: "bg-gray-50 dark:bg-gray-800", children: /* @__PURE__ */ jsxDEV39("tr", { children: [
        /* @__PURE__ */ jsxDEV39("th", { scope: "col", className: "px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer", onClick: () => handleSort("name"), children: /* @__PURE__ */ jsxDEV39("div", { className: "flex items-center", children: [
          "Name ",
          getSortIcon("name")
        ] }, void 0, !0, {
          fileName: "app/components/market/setup/InventoryTable.tsx",
          lineNumber: 135,
          columnNumber: 17
        }, this) }, void 0, !1, {
          fileName: "app/components/market/setup/InventoryTable.tsx",
          lineNumber: 134,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV39("th", { scope: "col", className: "px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer", onClick: () => handleSort("category"), children: /* @__PURE__ */ jsxDEV39("div", { className: "flex items-center", children: [
          "Category ",
          getSortIcon("category")
        ] }, void 0, !0, {
          fileName: "app/components/market/setup/InventoryTable.tsx",
          lineNumber: 138,
          columnNumber: 18
        }, this) }, void 0, !1, {
          fileName: "app/components/market/setup/InventoryTable.tsx",
          lineNumber: 137,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV39("th", { scope: "col", className: "px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer", onClick: () => handleSort("price"), children: /* @__PURE__ */ jsxDEV39("div", { className: "flex items-center", children: [
          "Price ",
          getSortIcon("price")
        ] }, void 0, !0, {
          fileName: "app/components/market/setup/InventoryTable.tsx",
          lineNumber: 141,
          columnNumber: 18
        }, this) }, void 0, !1, {
          fileName: "app/components/market/setup/InventoryTable.tsx",
          lineNumber: 140,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV39("th", { scope: "col", className: "px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer", onClick: () => handleSort("stock"), children: /* @__PURE__ */ jsxDEV39("div", { className: "flex items-center", children: [
          "Stock ",
          getSortIcon("stock")
        ] }, void 0, !0, {
          fileName: "app/components/market/setup/InventoryTable.tsx",
          lineNumber: 144,
          columnNumber: 18
        }, this) }, void 0, !1, {
          fileName: "app/components/market/setup/InventoryTable.tsx",
          lineNumber: 143,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV39("th", { scope: "col", className: "px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer", onClick: () => handleSort("status"), children: /* @__PURE__ */ jsxDEV39("div", { className: "flex items-center", children: [
          "Status ",
          getSortIcon("status")
        ] }, void 0, !0, {
          fileName: "app/components/market/setup/InventoryTable.tsx",
          lineNumber: 147,
          columnNumber: 18
        }, this) }, void 0, !1, {
          fileName: "app/components/market/setup/InventoryTable.tsx",
          lineNumber: 146,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV39("th", { scope: "col", className: "px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: "Actions" }, void 0, !1, {
          fileName: "app/components/market/setup/InventoryTable.tsx",
          lineNumber: 149,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/market/setup/InventoryTable.tsx",
        lineNumber: 133,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/components/market/setup/InventoryTable.tsx",
        lineNumber: 132,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV39("tbody", { className: "bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700", children: filteredAndSortedItems.length > 0 ? filteredAndSortedItems.map((item) => /* @__PURE__ */ jsxDEV39("tr", { className: "hover:bg-gray-50 dark:hover:bg-gray-800", children: [
        /* @__PURE__ */ jsxDEV39("td", { className: "px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white", children: item.name }, void 0, !1, {
          fileName: "app/components/market/setup/InventoryTable.tsx",
          lineNumber: 158,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV39("td", { className: "px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400", children: item.category }, void 0, !1, {
          fileName: "app/components/market/setup/InventoryTable.tsx",
          lineNumber: 159,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV39("td", { className: "px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400", children: [
          item.price,
          " ",
          /* @__PURE__ */ jsxDEV39("span", { className: "text-xs", children: "ESSENCE" }, void 0, !1, {
            fileName: "app/components/market/setup/InventoryTable.tsx",
            lineNumber: 160,
            columnNumber: 117
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/market/setup/InventoryTable.tsx",
          lineNumber: 160,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV39("td", { className: cn(
          "px-4 py-3 whitespace-nowrap text-sm",
          item.stock !== -1 && item.stock < lowStockThreshold && item.stock > 0 ? "text-orange-600 dark:text-orange-400 font-semibold" : "text-gray-500 dark:text-gray-400",
          item.stock === 0 ? "text-red-600 dark:text-red-400 font-semibold" : ""
        ), children: [
          item.stock === -1 ? "Unlimited" : item.stock,
          item.stock !== -1 && item.stock < lowStockThreshold && item.stock > 0 && /* @__PURE__ */ jsxDEV39("span", { className: "ml-1 text-xs", children: "(Low)" }, void 0, !1, {
            fileName: "app/components/market/setup/InventoryTable.tsx",
            lineNumber: 167,
            columnNumber: 97
          }, this),
          item.stock === 0 && /* @__PURE__ */ jsxDEV39("span", { className: "ml-1 text-xs", children: "(Out)" }, void 0, !1, {
            fileName: "app/components/market/setup/InventoryTable.tsx",
            lineNumber: 168,
            columnNumber: 44
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/market/setup/InventoryTable.tsx",
          lineNumber: 161,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV39("td", { className: "px-4 py-3 whitespace-nowrap text-sm", children: /* @__PURE__ */ jsxDEV39("span", { className: cn(
          "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
          item.status === "active" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
        ), children: item.status }, void 0, !1, {
          fileName: "app/components/market/setup/InventoryTable.tsx",
          lineNumber: 171,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "app/components/market/setup/InventoryTable.tsx",
          lineNumber: 170,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV39("td", { className: "px-4 py-3 whitespace-nowrap text-sm font-medium space-x-2", children: [
          /* @__PURE__ */ jsxDEV39("button", { onClick: () => onEdit(item), className: "text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300", title: "Edit", children: /* @__PURE__ */ jsxDEV39(EditIcon, {}, void 0, !1, {
            fileName: "app/components/market/setup/InventoryTable.tsx",
            lineNumber: 180,
            columnNumber: 23
          }, this) }, void 0, !1, {
            fileName: "app/components/market/setup/InventoryTable.tsx",
            lineNumber: 179,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV39("button", { onClick: () => onDelete(item), className: "text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300", title: "Delete", children: /* @__PURE__ */ jsxDEV39(DeleteIcon, {}, void 0, !1, {
            fileName: "app/components/market/setup/InventoryTable.tsx",
            lineNumber: 183,
            columnNumber: 23
          }, this) }, void 0, !1, {
            fileName: "app/components/market/setup/InventoryTable.tsx",
            lineNumber: 182,
            columnNumber: 21
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/market/setup/InventoryTable.tsx",
          lineNumber: 178,
          columnNumber: 19
        }, this)
      ] }, item.id, !0, {
        fileName: "app/components/market/setup/InventoryTable.tsx",
        lineNumber: 157,
        columnNumber: 17
      }, this)) : /* @__PURE__ */ jsxDEV39("tr", { children: /* @__PURE__ */ jsxDEV39("td", { colSpan: 6, className: "px-4 py-4 text-center text-sm text-gray-500 dark:text-gray-400", children: "No products found matching your criteria." }, void 0, !1, {
        fileName: "app/components/market/setup/InventoryTable.tsx",
        lineNumber: 190,
        columnNumber: 17
      }, this) }, void 0, !1, {
        fileName: "app/components/market/setup/InventoryTable.tsx",
        lineNumber: 189,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "app/components/market/setup/InventoryTable.tsx",
        lineNumber: 154,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/market/setup/InventoryTable.tsx",
      lineNumber: 131,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/components/market/setup/InventoryTable.tsx",
      lineNumber: 130,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/market/setup/InventoryTable.tsx",
    lineNumber: 99,
    columnNumber: 5
  }, this);
}

// app/components/market/setup/AddProductForm.tsx
import { useState as useState20, useEffect as useEffect15 } from "react";
import { Form as Form10 } from "@remix-run/react";
import { jsxDEV as jsxDEV40 } from "react/jsx-dev-runtime";
function AddProductForm({ onCancel, categories, navigation, actionData }) {
  let [name, setName] = useState20(""), [description, setDescription] = useState20(""), [price, setPrice] = useState20(""), [stock, setStock] = useState20(""), [imageFile, setImageFile] = useState20(null), [imagePreview, setImagePreview] = useState20(null), [category, setCategory] = useState20(categories[0] || ""), [newCategory, setNewCategory] = useState20(""), [status, setStatus] = useState20("active"), [isUnlimitedStock, setIsUnlimitedStock] = useState20(!1), [formError, setFormError] = useState20(null), isSubmitting = navigation.state === "submitting" && navigation.formData?.get("intent") === "addMarketplaceItem";
  useEffect15(() => {
    actionData && actionData.intent === "addMarketplaceItem" && (actionData.success ? setFormError(null) : setFormError(actionData.error || "An unknown error occurred while adding the product."));
  }, [actionData]);
  let handleStockChange = (e) => {
    let value = e.target.value;
    setStock(value === "" ? "" : parseInt(value, 10));
  }, handlePriceChange = (e) => {
    let value = e.target.value;
    setPrice(value === "" ? "" : parseFloat(value));
  }, handleImageChange = (e) => {
    let file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      let reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      }, reader.readAsDataURL(file);
    } else
      setImageFile(null), setImagePreview(null);
  }, finalCategory = newCategory.trim() || category;
  return /* @__PURE__ */ jsxDEV40(Form10, { method: "post", action: "/market", encType: "multipart/form-data", className: "space-y-4 p-4 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md", children: [
    /* @__PURE__ */ jsxDEV40("input", { type: "hidden", name: "intent", value: "addMarketplaceItem" }, void 0, !1, {
      fileName: "app/components/market/setup/AddProductForm.tsx",
      lineNumber: 72,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV40("h3", { className: "text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100", children: "Add New Product" }, void 0, !1, {
      fileName: "app/components/market/setup/AddProductForm.tsx",
      lineNumber: 73,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV40("div", { children: [
      /* @__PURE__ */ jsxDEV40("label", { htmlFor: "product-name", className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: [
        "Product Name ",
        /* @__PURE__ */ jsxDEV40("span", { className: "text-red-500", children: "*" }, void 0, !1, {
          fileName: "app/components/market/setup/AddProductForm.tsx",
          lineNumber: 76,
          columnNumber: 123
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/market/setup/AddProductForm.tsx",
        lineNumber: 76,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV40(
        "input",
        {
          type: "text",
          id: "product-name",
          name: "name",
          value: name,
          onChange: (e) => setName(e.target.value),
          required: !0,
          className: "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        },
        void 0,
        !1,
        {
          fileName: "app/components/market/setup/AddProductForm.tsx",
          lineNumber: 77,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/components/market/setup/AddProductForm.tsx",
      lineNumber: 75,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV40("div", { children: [
      /* @__PURE__ */ jsxDEV40("label", { htmlFor: "product-description", className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Description" }, void 0, !1, {
        fileName: "app/components/market/setup/AddProductForm.tsx",
        lineNumber: 89,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV40(
        "textarea",
        {
          id: "product-description",
          name: "description",
          value: description,
          onChange: (e) => setDescription(e.target.value),
          rows: 3,
          className: "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        },
        void 0,
        !1,
        {
          fileName: "app/components/market/setup/AddProductForm.tsx",
          lineNumber: 90,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/components/market/setup/AddProductForm.tsx",
      lineNumber: 88,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV40("div", { children: [
      /* @__PURE__ */ jsxDEV40("label", { htmlFor: "product-price", className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: [
        "Price (ESSENCE) ",
        /* @__PURE__ */ jsxDEV40("span", { className: "text-red-500", children: "*" }, void 0, !1, {
          fileName: "app/components/market/setup/AddProductForm.tsx",
          lineNumber: 101,
          columnNumber: 127
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/market/setup/AddProductForm.tsx",
        lineNumber: 101,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV40(
        "input",
        {
          type: "number",
          id: "product-price",
          name: "price",
          value: price,
          onChange: handlePriceChange,
          required: !0,
          min: "0",
          step: "0.01",
          className: "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        },
        void 0,
        !1,
        {
          fileName: "app/components/market/setup/AddProductForm.tsx",
          lineNumber: 102,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/components/market/setup/AddProductForm.tsx",
      lineNumber: 100,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV40("div", { className: "flex items-center space-x-4", children: [
      /* @__PURE__ */ jsxDEV40("div", { className: "flex-grow", children: [
        /* @__PURE__ */ jsxDEV40("label", { htmlFor: "product-stock", className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: [
          "Stock Quantity ",
          /* @__PURE__ */ jsxDEV40("span", { className: "text-red-500", children: "*" }, void 0, !1, {
            fileName: "app/components/market/setup/AddProductForm.tsx",
            lineNumber: 117,
            columnNumber: 130
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/market/setup/AddProductForm.tsx",
          lineNumber: 117,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV40(
          "input",
          {
            type: "number",
            id: "product-stock",
            name: "stock",
            value: stock,
            onChange: handleStockChange,
            required: !isUnlimitedStock,
            min: "0",
            step: "1",
            disabled: isUnlimitedStock,
            className: `mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white ${isUnlimitedStock ? "bg-gray-100 dark:bg-gray-600 cursor-not-allowed" : ""}`
          },
          void 0,
          !1,
          {
            fileName: "app/components/market/setup/AddProductForm.tsx",
            lineNumber: 118,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/components/market/setup/AddProductForm.tsx",
        lineNumber: 116,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV40("div", { className: "pt-6", children: /* @__PURE__ */ jsxDEV40("label", { className: "flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300", children: [
        /* @__PURE__ */ jsxDEV40(
          "input",
          {
            type: "checkbox",
            name: "isUnlimitedStock",
            checked: isUnlimitedStock,
            onChange: (e) => {
              setIsUnlimitedStock(e.target.checked), e.target.checked && setStock("");
            },
            className: "rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-offset-gray-800"
          },
          void 0,
          !1,
          {
            fileName: "app/components/market/setup/AddProductForm.tsx",
            lineNumber: 133,
            columnNumber: 17
          },
          this
        ),
        /* @__PURE__ */ jsxDEV40("span", { children: "Unlimited" }, void 0, !1, {
          fileName: "app/components/market/setup/AddProductForm.tsx",
          lineNumber: 143,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/market/setup/AddProductForm.tsx",
        lineNumber: 132,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "app/components/market/setup/AddProductForm.tsx",
        lineNumber: 131,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/market/setup/AddProductForm.tsx",
      lineNumber: 115,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV40("div", { children: [
      /* @__PURE__ */ jsxDEV40("label", { htmlFor: "product-category-select", className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: [
        "Category ",
        /* @__PURE__ */ jsxDEV40("span", { className: "text-red-500", children: "*" }, void 0, !1, {
          fileName: "app/components/market/setup/AddProductForm.tsx",
          lineNumber: 149,
          columnNumber: 130
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/market/setup/AddProductForm.tsx",
        lineNumber: 149,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV40("input", { type: "hidden", name: "category", value: finalCategory }, void 0, !1, {
        fileName: "app/components/market/setup/AddProductForm.tsx",
        lineNumber: 150,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV40(
        "select",
        {
          id: "product-category-select",
          value: category,
          onChange: (e) => {
            setCategory(e.target.value), setNewCategory("");
          },
          className: "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white",
          children: [
            /* @__PURE__ */ jsxDEV40("option", { value: "", disabled: !0, children: "Select existing or add new" }, void 0, !1, {
              fileName: "app/components/market/setup/AddProductForm.tsx",
              lineNumber: 157,
              columnNumber: 11
            }, this),
            categories.filter((c) => c !== "all").map((cat) => /* @__PURE__ */ jsxDEV40("option", { value: cat, children: cat }, cat, !1, {
              fileName: "app/components/market/setup/AddProductForm.tsx",
              lineNumber: 159,
              columnNumber: 13
            }, this))
          ]
        },
        void 0,
        !0,
        {
          fileName: "app/components/market/setup/AddProductForm.tsx",
          lineNumber: 151,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV40(
        "input",
        {
          type: "text",
          id: "product-category-new",
          placeholder: "Or add new category...",
          value: newCategory,
          onChange: (e) => {
            setNewCategory(e.target.value), setCategory("");
          },
          className: "mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        },
        void 0,
        !1,
        {
          fileName: "app/components/market/setup/AddProductForm.tsx",
          lineNumber: 162,
          columnNumber: 9
        },
        this
      ),
      !finalCategory && /* @__PURE__ */ jsxDEV40("p", { className: "mt-1 text-xs text-red-600 dark:text-red-400", children: "Please select or enter a category." }, void 0, !1, {
        fileName: "app/components/market/setup/AddProductForm.tsx",
        lineNumber: 171,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/market/setup/AddProductForm.tsx",
      lineNumber: 148,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV40("div", { children: [
      /* @__PURE__ */ jsxDEV40("label", { htmlFor: "product-image-upload", className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Product Image" }, void 0, !1, {
        fileName: "app/components/market/setup/AddProductForm.tsx",
        lineNumber: 176,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV40(
        "input",
        {
          type: "file",
          id: "product-image-upload",
          name: "productImage",
          accept: "image/*",
          onChange: handleImageChange,
          className: `mt-1 block w-full text-sm text-gray-500 dark:text-gray-400
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-indigo-50 file:text-indigo-700
                      hover:file:bg-indigo-100
                      dark:file:bg-gray-700 dark:file:text-indigo-300 dark:hover:file:bg-gray-600`
        },
        void 0,
        !1,
        {
          fileName: "app/components/market/setup/AddProductForm.tsx",
          lineNumber: 177,
          columnNumber: 9
        },
        this
      ),
      imagePreview && /* @__PURE__ */ jsxDEV40("div", { className: "mt-2", children: /* @__PURE__ */ jsxDEV40("img", { src: imagePreview, alt: "Selected preview", className: "h-20 w-20 object-cover rounded-md border dark:border-gray-600" }, void 0, !1, {
        fileName: "app/components/market/setup/AddProductForm.tsx",
        lineNumber: 193,
        columnNumber: 17
      }, this) }, void 0, !1, {
        fileName: "app/components/market/setup/AddProductForm.tsx",
        lineNumber: 192,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV40("p", { className: "mt-1 text-xs text-gray-500 dark:text-gray-400", children: "Upload an image for the product (optional)." }, void 0, !1, {
        fileName: "app/components/market/setup/AddProductForm.tsx",
        lineNumber: 196,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/market/setup/AddProductForm.tsx",
      lineNumber: 175,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV40("div", { children: [
      /* @__PURE__ */ jsxDEV40("label", { htmlFor: "product-status", className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Status" }, void 0, !1, {
        fileName: "app/components/market/setup/AddProductForm.tsx",
        lineNumber: 200,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV40(
        "select",
        {
          id: "product-status",
          name: "status",
          value: status,
          onChange: (e) => setStatus(e.target.value),
          className: "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white",
          children: [
            /* @__PURE__ */ jsxDEV40("option", { value: "active", children: "Active" }, void 0, !1, {
              fileName: "app/components/market/setup/AddProductForm.tsx",
              lineNumber: 208,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV40("option", { value: "inactive", children: "Inactive" }, void 0, !1, {
              fileName: "app/components/market/setup/AddProductForm.tsx",
              lineNumber: 209,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "app/components/market/setup/AddProductForm.tsx",
          lineNumber: 201,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/components/market/setup/AddProductForm.tsx",
      lineNumber: 199,
      columnNumber: 7
    }, this),
    formError && /* @__PURE__ */ jsxDEV40("p", { className: "text-sm text-red-600 dark:text-red-400", children: formError }, void 0, !1, {
      fileName: "app/components/market/setup/AddProductForm.tsx",
      lineNumber: 214,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV40("div", { className: "flex justify-end space-x-3 pt-4", children: [
      /* @__PURE__ */ jsxDEV40(
        "button",
        {
          type: "button",
          onClick: onCancel,
          disabled: isSubmitting,
          className: "px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500 dark:hover:bg-gray-500 disabled:opacity-50",
          children: "Cancel"
        },
        void 0,
        !1,
        {
          fileName: "app/components/market/setup/AddProductForm.tsx",
          lineNumber: 218,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV40(
        "button",
        {
          type: "submit",
          disabled: isSubmitting || !finalCategory || !name || price === "" || stock === "" && !isUnlimitedStock,
          className: "px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 disabled:opacity-50",
          children: isSubmitting ? "Adding..." : "Add Product"
        },
        void 0,
        !1,
        {
          fileName: "app/components/market/setup/AddProductForm.tsx",
          lineNumber: 226,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/components/market/setup/AddProductForm.tsx",
      lineNumber: 217,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/market/setup/AddProductForm.tsx",
    lineNumber: 71,
    columnNumber: 5
  }, this);
}

// app/components/market/setup/EditProductModal.tsx
import { useState as useState21, useEffect as useEffect16 } from "react";
import { Form as Form11 } from "@remix-run/react";
import { jsxDEV as jsxDEV41 } from "react/jsx-dev-runtime";
function EditProductModal({
  isOpen,
  onClose,
  product,
  categories,
  navigation,
  actionData
}) {
  let [name, setName] = useState21(""), [description, setDescription] = useState21(""), [price, setPrice] = useState21(""), [stock, setStock] = useState21(""), [imageFile, setImageFile] = useState21(null), [imagePreview, setImagePreview] = useState21(null), [category, setCategory] = useState21(""), [newCategory, setNewCategory] = useState21(""), [status, setStatus] = useState21("active"), [isUnlimitedStock, setIsUnlimitedStock] = useState21(!1), [formError, setFormError] = useState21(null), isSubmitting = navigation.state === "submitting" && navigation.formData?.get("intent") === "editMarketplaceItem";
  if (useEffect16(() => {
    product && isOpen ? (setName(product.name), setDescription(product.description), setPrice(product.price), setStock(product.stock === -1 ? "" : product.stock), setIsUnlimitedStock(product.stock === -1), setImagePreview(product.imageUrl || null), setImageFile(null), setCategory(product.category), setStatus(product.status), setNewCategory(""), setFormError(null)) : isOpen || (setImagePreview(null), setImageFile(null), setFormError(null));
  }, [product, isOpen]), useEffect16(() => {
    actionData && actionData.intent === "editMarketplaceItem" && (actionData.success ? setFormError(null) : setFormError(actionData.error || "An unknown error occurred while editing the product."));
  }, [actionData]), !isOpen || !product)
    return null;
  let handleStockChange = (e) => {
    let value = e.target.value;
    setStock(value === "" ? "" : parseInt(value, 10));
  }, handlePriceChange = (e) => {
    let value = e.target.value;
    setPrice(value === "" ? "" : parseFloat(value));
  }, handleImageChange = (e) => {
    let file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      let reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      }, reader.readAsDataURL(file);
    } else
      setImageFile(null), setImagePreview(product?.imageUrl || null);
  }, finalCategory = newCategory.trim() || category;
  return /* @__PURE__ */ jsxDEV41("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm", children: /* @__PURE__ */ jsxDEV41("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsxDEV41("h2", { className: "text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100", children: [
      "Edit Product: ",
      product.name
    ] }, void 0, !0, {
      fileName: "app/components/market/setup/EditProductModal.tsx",
      lineNumber: 103,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV41(Form11, { method: "post", action: "/market", encType: "multipart/form-data", className: "space-y-4", children: [
      /* @__PURE__ */ jsxDEV41("input", { type: "hidden", name: "intent", value: "editMarketplaceItem" }, void 0, !1, {
        fileName: "app/components/market/setup/EditProductModal.tsx",
        lineNumber: 105,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV41("input", { type: "hidden", name: "productId", value: product.id }, void 0, !1, {
        fileName: "app/components/market/setup/EditProductModal.tsx",
        lineNumber: 106,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV41("input", { type: "hidden", name: "currentImageUrl", value: product.imageUrl || "" }, void 0, !1, {
        fileName: "app/components/market/setup/EditProductModal.tsx",
        lineNumber: 107,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV41("div", { children: [
        /* @__PURE__ */ jsxDEV41("label", { htmlFor: "edit-product-name", className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: [
          "Product Name ",
          /* @__PURE__ */ jsxDEV41("span", { className: "text-red-500", children: "*" }, void 0, !1, {
            fileName: "app/components/market/setup/EditProductModal.tsx",
            lineNumber: 110,
            columnNumber: 132
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/market/setup/EditProductModal.tsx",
          lineNumber: 110,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV41(
          "input",
          {
            type: "text",
            id: "edit-product-name",
            name: "name",
            value: name,
            onChange: (e) => setName(e.target.value),
            required: !0,
            className: "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          },
          void 0,
          !1,
          {
            fileName: "app/components/market/setup/EditProductModal.tsx",
            lineNumber: 111,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/components/market/setup/EditProductModal.tsx",
        lineNumber: 109,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV41("div", { children: [
        /* @__PURE__ */ jsxDEV41("label", { htmlFor: "edit-product-description", className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Description" }, void 0, !1, {
          fileName: "app/components/market/setup/EditProductModal.tsx",
          lineNumber: 123,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV41(
          "textarea",
          {
            id: "edit-product-description",
            name: "description",
            value: description,
            onChange: (e) => setDescription(e.target.value),
            rows: 3,
            className: "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          },
          void 0,
          !1,
          {
            fileName: "app/components/market/setup/EditProductModal.tsx",
            lineNumber: 124,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/components/market/setup/EditProductModal.tsx",
        lineNumber: 122,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV41("div", { children: [
        /* @__PURE__ */ jsxDEV41("label", { htmlFor: "edit-product-price", className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: [
          "Price (ESSENCE) ",
          /* @__PURE__ */ jsxDEV41("span", { className: "text-red-500", children: "*" }, void 0, !1, {
            fileName: "app/components/market/setup/EditProductModal.tsx",
            lineNumber: 135,
            columnNumber: 136
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/market/setup/EditProductModal.tsx",
          lineNumber: 135,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV41(
          "input",
          {
            type: "number",
            id: "edit-product-price",
            name: "price",
            value: price,
            onChange: handlePriceChange,
            required: !0,
            min: "0",
            step: "0.01",
            className: "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          },
          void 0,
          !1,
          {
            fileName: "app/components/market/setup/EditProductModal.tsx",
            lineNumber: 136,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/components/market/setup/EditProductModal.tsx",
        lineNumber: 134,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV41("div", { className: "flex items-center space-x-4", children: [
        /* @__PURE__ */ jsxDEV41("div", { className: "flex-grow", children: [
          /* @__PURE__ */ jsxDEV41("label", { htmlFor: "edit-product-stock", className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: [
            "Stock Quantity ",
            /* @__PURE__ */ jsxDEV41("span", { className: "text-red-500", children: "*" }, void 0, !1, {
              fileName: "app/components/market/setup/EditProductModal.tsx",
              lineNumber: 151,
              columnNumber: 139
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/market/setup/EditProductModal.tsx",
            lineNumber: 151,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV41(
            "input",
            {
              type: "number",
              id: "edit-product-stock",
              name: "stock",
              value: stock,
              onChange: handleStockChange,
              required: !isUnlimitedStock,
              min: "0",
              step: "1",
              disabled: isUnlimitedStock,
              className: `mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white ${isUnlimitedStock ? "bg-gray-100 dark:bg-gray-600 cursor-not-allowed" : ""}`
            },
            void 0,
            !1,
            {
              fileName: "app/components/market/setup/EditProductModal.tsx",
              lineNumber: 152,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/components/market/setup/EditProductModal.tsx",
          lineNumber: 150,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV41("div", { className: "pt-6", children: /* @__PURE__ */ jsxDEV41("label", { className: "flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300", children: [
          /* @__PURE__ */ jsxDEV41(
            "input",
            {
              type: "checkbox",
              name: "isUnlimitedStock",
              checked: isUnlimitedStock,
              onChange: (e) => {
                setIsUnlimitedStock(e.target.checked), e.target.checked && setStock("");
              },
              className: "rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-offset-gray-800"
            },
            void 0,
            !1,
            {
              fileName: "app/components/market/setup/EditProductModal.tsx",
              lineNumber: 167,
              columnNumber: 21
            },
            this
          ),
          /* @__PURE__ */ jsxDEV41("span", { children: "Unlimited" }, void 0, !1, {
            fileName: "app/components/market/setup/EditProductModal.tsx",
            lineNumber: 177,
            columnNumber: 21
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/market/setup/EditProductModal.tsx",
          lineNumber: 166,
          columnNumber: 17
        }, this) }, void 0, !1, {
          fileName: "app/components/market/setup/EditProductModal.tsx",
          lineNumber: 165,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/market/setup/EditProductModal.tsx",
        lineNumber: 149,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV41("div", { children: [
        /* @__PURE__ */ jsxDEV41("label", { htmlFor: "edit-product-category-select", className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: [
          "Category ",
          /* @__PURE__ */ jsxDEV41("span", { className: "text-red-500", children: "*" }, void 0, !1, {
            fileName: "app/components/market/setup/EditProductModal.tsx",
            lineNumber: 183,
            columnNumber: 139
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/market/setup/EditProductModal.tsx",
          lineNumber: 183,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV41("input", { type: "hidden", name: "category", value: finalCategory }, void 0, !1, {
          fileName: "app/components/market/setup/EditProductModal.tsx",
          lineNumber: 184,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV41(
          "select",
          {
            id: "edit-product-category-select",
            value: category,
            onChange: (e) => {
              setCategory(e.target.value), setNewCategory("");
            },
            className: "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white",
            children: [
              /* @__PURE__ */ jsxDEV41("option", { value: "", disabled: !0, children: "Select existing or add new" }, void 0, !1, {
                fileName: "app/components/market/setup/EditProductModal.tsx",
                lineNumber: 191,
                columnNumber: 15
              }, this),
              categories.filter((c) => c !== "all").map((cat) => /* @__PURE__ */ jsxDEV41("option", { value: cat, children: cat }, cat, !1, {
                fileName: "app/components/market/setup/EditProductModal.tsx",
                lineNumber: 193,
                columnNumber: 17
              }, this))
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/components/market/setup/EditProductModal.tsx",
            lineNumber: 185,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV41(
          "input",
          {
            type: "text",
            id: "edit-product-category-new",
            placeholder: "Or add new category...",
            value: newCategory,
            onChange: (e) => {
              setNewCategory(e.target.value), setCategory("");
            },
            className: "mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          },
          void 0,
          !1,
          {
            fileName: "app/components/market/setup/EditProductModal.tsx",
            lineNumber: 196,
            columnNumber: 13
          },
          this
        ),
        !finalCategory && /* @__PURE__ */ jsxDEV41("p", { className: "mt-1 text-xs text-red-600 dark:text-red-400", children: "Please select or enter a category." }, void 0, !1, {
          fileName: "app/components/market/setup/EditProductModal.tsx",
          lineNumber: 205,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/market/setup/EditProductModal.tsx",
        lineNumber: 182,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV41("div", { children: [
        /* @__PURE__ */ jsxDEV41("label", { htmlFor: "edit-product-image-upload", className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Product Image" }, void 0, !1, {
          fileName: "app/components/market/setup/EditProductModal.tsx",
          lineNumber: 210,
          columnNumber: 13
        }, this),
        imagePreview && /* @__PURE__ */ jsxDEV41("div", { className: "mt-2 mb-2", children: /* @__PURE__ */ jsxDEV41("img", { src: imagePreview, alt: "Current product preview", className: "h-20 w-20 object-cover rounded-md border dark:border-gray-600" }, void 0, !1, {
          fileName: "app/components/market/setup/EditProductModal.tsx",
          lineNumber: 213,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "app/components/market/setup/EditProductModal.tsx",
          lineNumber: 212,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV41(
          "input",
          {
            type: "file",
            id: "edit-product-image-upload",
            name: "productImage",
            accept: "image/*",
            onChange: handleImageChange,
            className: `mt-1 block w-full text-sm text-gray-500 dark:text-gray-400
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-md file:border-0
                         file:text-sm file:font-semibold
                         file:bg-indigo-50 file:text-indigo-700
                         hover:file:bg-indigo-100
                         dark:file:bg-gray-700 dark:file:text-indigo-300 dark:hover:file:bg-gray-600`
          },
          void 0,
          !1,
          {
            fileName: "app/components/market/setup/EditProductModal.tsx",
            lineNumber: 216,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV41("p", { className: "mt-1 text-xs text-gray-500 dark:text-gray-400", children: "Upload a new image to replace the current one." }, void 0, !1, {
          fileName: "app/components/market/setup/EditProductModal.tsx",
          lineNumber: 230,
          columnNumber: 14
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/market/setup/EditProductModal.tsx",
        lineNumber: 209,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV41("div", { children: [
        /* @__PURE__ */ jsxDEV41("label", { htmlFor: "edit-product-status", className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Status" }, void 0, !1, {
          fileName: "app/components/market/setup/EditProductModal.tsx",
          lineNumber: 234,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV41(
          "select",
          {
            id: "edit-product-status",
            name: "status",
            value: status,
            onChange: (e) => setStatus(e.target.value),
            className: "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white",
            children: [
              /* @__PURE__ */ jsxDEV41("option", { value: "active", children: "Active" }, void 0, !1, {
                fileName: "app/components/market/setup/EditProductModal.tsx",
                lineNumber: 242,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV41("option", { value: "inactive", children: "Inactive" }, void 0, !1, {
                fileName: "app/components/market/setup/EditProductModal.tsx",
                lineNumber: 243,
                columnNumber: 15
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/components/market/setup/EditProductModal.tsx",
            lineNumber: 235,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/components/market/setup/EditProductModal.tsx",
        lineNumber: 233,
        columnNumber: 11
      }, this),
      formError && /* @__PURE__ */ jsxDEV41("p", { className: "text-sm text-red-600 dark:text-red-400", children: formError }, void 0, !1, {
        fileName: "app/components/market/setup/EditProductModal.tsx",
        lineNumber: 248,
        columnNumber: 14
      }, this),
      /* @__PURE__ */ jsxDEV41("div", { className: "flex justify-end space-x-3 pt-4", children: [
        /* @__PURE__ */ jsxDEV41(
          "button",
          {
            type: "button",
            onClick: onClose,
            disabled: isSubmitting,
            className: "px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500 dark:hover:bg-gray-500 disabled:opacity-50",
            children: "Cancel"
          },
          void 0,
          !1,
          {
            fileName: "app/components/market/setup/EditProductModal.tsx",
            lineNumber: 252,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV41(
          "button",
          {
            type: "submit",
            disabled: isSubmitting || !finalCategory || !name || price === "" || stock === "" && !isUnlimitedStock,
            className: "px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 disabled:opacity-50",
            children: isSubmitting ? "Updating..." : "Update Product"
          },
          void 0,
          !1,
          {
            fileName: "app/components/market/setup/EditProductModal.tsx",
            lineNumber: 260,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/components/market/setup/EditProductModal.tsx",
        lineNumber: 251,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/market/setup/EditProductModal.tsx",
      lineNumber: 104,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/market/setup/EditProductModal.tsx",
    lineNumber: 102,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/components/market/setup/EditProductModal.tsx",
    lineNumber: 101,
    columnNumber: 5
  }, this);
}

// app/components/market/setup/DeleteConfirmationModal.tsx
import { Form as Form12 } from "@remix-run/react";
import { jsxDEV as jsxDEV42 } from "react/jsx-dev-runtime";
function DeleteConfirmationModal({
  isOpen,
  onClose,
  product,
  navigation,
  defaultPlaceholderImageUrl
  // Use prop
}) {
  if (!isOpen || !product)
    return null;
  let isSubmitting = navigation.state === "submitting" && navigation.formData?.get("intent") === "deleteMarketplaceItem" && navigation.formData?.get("productId") === product.id, isCustomImage = product.imageUrl && product.imageUrl !== defaultPlaceholderImageUrl;
  return /* @__PURE__ */ jsxDEV42("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm", children: /* @__PURE__ */ jsxDEV42("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md", children: [
    /* @__PURE__ */ jsxDEV42("h2", { className: "text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100", children: "Confirm Deletion" }, void 0, !1, {
      fileName: "app/components/market/setup/DeleteConfirmationModal.tsx",
      lineNumber: 33,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV42("p", { className: "mb-6 text-gray-600 dark:text-gray-300", children: [
      'Are you sure you want to delete the product "',
      /* @__PURE__ */ jsxDEV42("strong", { children: product.name }, void 0, !1, {
        fileName: "app/components/market/setup/DeleteConfirmationModal.tsx",
        lineNumber: 35,
        columnNumber: 56
      }, this),
      '"? This action cannot be undone.',
      isCustomImage && // Show message only for custom images
      /* @__PURE__ */ jsxDEV42("span", { className: "block text-xs text-gray-500 dark:text-gray-400 mt-1", children: "The associated custom image will also be deleted from storage." }, void 0, !1, {
        fileName: "app/components/market/setup/DeleteConfirmationModal.tsx",
        lineNumber: 37,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/market/setup/DeleteConfirmationModal.tsx",
      lineNumber: 34,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV42(Form12, { method: "post", action: "/market", children: [
      " ",
      /* @__PURE__ */ jsxDEV42("input", { type: "hidden", name: "intent", value: "deleteMarketplaceItem" }, void 0, !1, {
        fileName: "app/components/market/setup/DeleteConfirmationModal.tsx",
        lineNumber: 43,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV42("input", { type: "hidden", name: "productId", value: product.id }, void 0, !1, {
        fileName: "app/components/market/setup/DeleteConfirmationModal.tsx",
        lineNumber: 44,
        columnNumber: 11
      }, this),
      product.imageUrl && /* @__PURE__ */ jsxDEV42("input", { type: "hidden", name: "imageUrl", value: product.imageUrl }, void 0, !1, {
        fileName: "app/components/market/setup/DeleteConfirmationModal.tsx",
        lineNumber: 46,
        columnNumber: 32
      }, this),
      /* @__PURE__ */ jsxDEV42("div", { className: "flex justify-end space-x-3", children: [
        /* @__PURE__ */ jsxDEV42(
          "button",
          {
            type: "button",
            onClick: onClose,
            disabled: isSubmitting,
            className: "px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500 dark:hover:bg-gray-500 disabled:opacity-50",
            children: "Cancel"
          },
          void 0,
          !1,
          {
            fileName: "app/components/market/setup/DeleteConfirmationModal.tsx",
            lineNumber: 49,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV42(
          "button",
          {
            type: "submit",
            disabled: isSubmitting,
            className: "px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800 disabled:opacity-50",
            children: isSubmitting ? "Deleting..." : "Delete Product"
          },
          void 0,
          !1,
          {
            fileName: "app/components/market/setup/DeleteConfirmationModal.tsx",
            lineNumber: 57,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/components/market/setup/DeleteConfirmationModal.tsx",
        lineNumber: 48,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/market/setup/DeleteConfirmationModal.tsx",
      lineNumber: 42,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/market/setup/DeleteConfirmationModal.tsx",
    lineNumber: 32,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/components/market/setup/DeleteConfirmationModal.tsx",
    lineNumber: 31,
    columnNumber: 5
  }, this);
}

// app/components/market/SalesLogTable.tsx
import { useState as useState23, useMemo as useMemo6 } from "react";

// app/components/admin/ConfirmationModal.tsx
import { useEffect as useEffect17, useState as useState22 } from "react";
import { Dialog as Dialog3, Transition as Transition2 } from "@headlessui/react";
import { Form as Form13 } from "@remix-run/react";
import { jsxDEV as jsxDEV43 } from "react/jsx-dev-runtime";
function ConfirmationModal({
  isOpen,
  onClose,
  // onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmButtonClass = "bg-red-600 hover:bg-red-700",
  // Default to red for destructive actions
  actionData,
  navigation,
  // Received prop
  intent,
  formData
}) {
  let [formError, setFormError] = useState22(null), isSubmitting = navigation?.state === "submitting" && navigation?.formData?.get("intent") === intent && navigation?.formData?.get("userId") === formData?.userId;
  return useEffect17(() => {
    let isRelevantAction = actionData?.intent === intent && formData && // Ensure formData is not null/undefined
    actionData?.formData?.userId === formData?.userId;
    isRelevantAction && !actionData?.success && actionData?.error ? setFormError(actionData.error) : isRelevantAction && actionData?.success && setFormError(null);
  }, [actionData, intent, formData]), useEffect17(() => {
    isOpen || setFormError(null);
  }, [isOpen]), // Use `as="div"` instead of `as={React.Fragment}` for the main Transition
  /* @__PURE__ */ jsxDEV43(Transition2, { appear: !0, show: isOpen, as: "div", children: /* @__PURE__ */ jsxDEV43(Dialog3, { as: "div", className: "relative z-20", onClose, children: [
    " ",
    /* @__PURE__ */ jsxDEV43(
      Transition2.Child,
      {
        as: "div",
        className: "fixed inset-0 bg-black/30",
        enter: "ease-out duration-300",
        enterFrom: "opacity-0",
        enterTo: "opacity-100",
        leave: "ease-in duration-200",
        leaveFrom: "opacity-100",
        leaveTo: "opacity-0"
      },
      void 0,
      !1,
      {
        fileName: "app/components/admin/ConfirmationModal.tsx",
        lineNumber: 80,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ jsxDEV43("div", { className: "fixed inset-0 overflow-y-auto", children: /* @__PURE__ */ jsxDEV43("div", { className: "flex min-h-full items-center justify-center p-4 text-center", children: /* @__PURE__ */ jsxDEV43(
      Transition2.Child,
      {
        as: "div",
        className: "w-full max-w-md",
        enter: "ease-out duration-300",
        enterFrom: "opacity-0 scale-95",
        enterTo: "opacity-100 scale-100",
        leave: "ease-in duration-200",
        leaveFrom: "opacity-100 scale-100",
        leaveTo: "opacity-0 scale-95",
        children: /* @__PURE__ */ jsxDEV43(Dialog3.Panel, { className: "w-full transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all", children: [
          /* @__PURE__ */ jsxDEV43(Dialog3.Title, { as: "h3", className: "text-lg font-medium leading-6 text-gray-900 dark:text-white", children: title }, void 0, !1, {
            fileName: "app/components/admin/ConfirmationModal.tsx",
            lineNumber: 109,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV43("div", { className: "mt-2", children: /* @__PURE__ */ jsxDEV43("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: message }, void 0, !1, {
            fileName: "app/components/admin/ConfirmationModal.tsx",
            lineNumber: 113,
            columnNumber: 19
          }, this) }, void 0, !1, {
            fileName: "app/components/admin/ConfirmationModal.tsx",
            lineNumber: 112,
            columnNumber: 17
          }, this),
          formError && /* @__PURE__ */ jsxDEV43("div", { className: "mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded dark:bg-red-900 dark:border-red-700 dark:text-red-200 text-sm", children: formError }, void 0, !1, {
            fileName: "app/components/admin/ConfirmationModal.tsx",
            lineNumber: 119,
            columnNumber: 20
          }, this),
          /* @__PURE__ */ jsxDEV43(Form13, { method: "post", action: "/market", className: "mt-4", children: [
            " ",
            /* @__PURE__ */ jsxDEV43("input", { type: "hidden", name: "intent", value: intent }, void 0, !1, {
              fileName: "app/components/admin/ConfirmationModal.tsx",
              lineNumber: 127,
              columnNumber: 19
            }, this),
            Object.entries(formData || {}).map(([key, value]) => /* @__PURE__ */ jsxDEV43("input", { type: "hidden", name: key, value: value ?? "" }, key, !1, {
              fileName: "app/components/admin/ConfirmationModal.tsx",
              lineNumber: 130,
              columnNumber: 21
            }, this)),
            /* @__PURE__ */ jsxDEV43("div", { className: "mt-4 flex justify-end space-x-3", children: [
              /* @__PURE__ */ jsxDEV43(
                "button",
                {
                  type: "button",
                  className: "inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                  onClick: onClose,
                  disabled: isSubmitting,
                  children: cancelText
                },
                void 0,
                !1,
                {
                  fileName: "app/components/admin/ConfirmationModal.tsx",
                  lineNumber: 134,
                  columnNumber: 21
                },
                this
              ),
              /* @__PURE__ */ jsxDEV43(
                "button",
                {
                  type: "submit",
                  className: cn(
                    "inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50",
                    confirmButtonClass
                    // Apply dynamic class
                  ),
                  disabled: isSubmitting,
                  children: isSubmitting ? "Processing..." : confirmText
                },
                void 0,
                !1,
                {
                  fileName: "app/components/admin/ConfirmationModal.tsx",
                  lineNumber: 142,
                  columnNumber: 21
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "app/components/admin/ConfirmationModal.tsx",
              lineNumber: 133,
              columnNumber: 19
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/admin/ConfirmationModal.tsx",
            lineNumber: 125,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/admin/ConfirmationModal.tsx",
          lineNumber: 108,
          columnNumber: 15
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/components/admin/ConfirmationModal.tsx",
        lineNumber: 97,
        columnNumber: 13
      },
      this
    ) }, void 0, !1, {
      fileName: "app/components/admin/ConfirmationModal.tsx",
      lineNumber: 95,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/components/admin/ConfirmationModal.tsx",
      lineNumber: 94,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/admin/ConfirmationModal.tsx",
    lineNumber: 77,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/components/admin/ConfirmationModal.tsx",
    lineNumber: 76,
    columnNumber: 5
  }, this);
}

// app/components/market/SalesLogTable.tsx
import { jsxDEV as jsxDEV44 } from "react/jsx-dev-runtime";
var CheckCircleIcon = () => /* @__PURE__ */ jsxDEV44("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 text-green-500", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ jsxDEV44("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", clipRule: "evenodd" }, void 0, !1, {
  fileName: "app/components/market/SalesLogTable.tsx",
  lineNumber: 9,
  columnNumber: 146
}, this) }, void 0, !1, {
  fileName: "app/components/market/SalesLogTable.tsx",
  lineNumber: 9,
  columnNumber: 31
}, this), ClockIcon = () => /* @__PURE__ */ jsxDEV44("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 text-yellow-500", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ jsxDEV44("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 9.586V6z", clipRule: "evenodd" }, void 0, !1, {
  fileName: "app/components/market/SalesLogTable.tsx",
  lineNumber: 10,
  columnNumber: 141
}, this) }, void 0, !1, {
  fileName: "app/components/market/SalesLogTable.tsx",
  lineNumber: 10,
  columnNumber: 25
}, this), TruckIcon = () => /* @__PURE__ */ jsxDEV44("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: [
  /* @__PURE__ */ jsxDEV44("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" }, void 0, !1, {
    fileName: "app/components/market/SalesLogTable.tsx",
    lineNumber: 11,
    columnNumber: 155
  }, this),
  /* @__PURE__ */ jsxDEV44("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z" }, void 0, !1, {
    fileName: "app/components/market/SalesLogTable.tsx",
    lineNumber: 11,
    columnNumber: 295
  }, this),
  /* @__PURE__ */ jsxDEV44("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M17.657 16.657l-4.243 4.243M6.343 16.657l4.243 4.243" }, void 0, !1, {
    fileName: "app/components/market/SalesLogTable.tsx",
    lineNumber: 11,
    columnNumber: 385
  }, this),
  /* @__PURE__ */ jsxDEV44("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 17l.172-.171a3 3 0 014.242 0L15 17" }, void 0, !1, {
    fileName: "app/components/market/SalesLogTable.tsx",
    lineNumber: 11,
    columnNumber: 495
  }, this),
  /* @__PURE__ */ jsxDEV44("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 21V10m0 0a8 8 0 110-8 8 8 0 010 8zm0 0a8 8 0 100 8 8 8 0 000-8z" }, void 0, !1, {
    fileName: "app/components/market/SalesLogTable.tsx",
    lineNumber: 11,
    columnNumber: 590
  }, this),
  /* @__PURE__ */ jsxDEV44("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" }, void 0, !1, {
    fileName: "app/components/market/SalesLogTable.tsx",
    lineNumber: 11,
    columnNumber: 715
  }, this)
] }, void 0, !0, {
  fileName: "app/components/market/SalesLogTable.tsx",
  lineNumber: 11,
  columnNumber: 25
}, this);
function SalesLogTable({ records }) {
  let { markPurchaseAsDelivered } = useStore((state) => ({
    markPurchaseAsDelivered: state.markPurchaseAsDelivered
  })), [searchTerm, setSearchTerm] = useState23(""), [filterProduct, setFilterProduct] = useState23("all"), [filterBuyer, setFilterBuyer] = useState23("all"), [filterStatus, setFilterStatus] = useState23("all"), [filterStartDate, setFilterStartDate] = useState23(""), [filterEndDate, setFilterEndDate] = useState23(""), [sortKey, setSortKey] = useState23("purchaseDate"), [sortDirection, setSortDirection] = useState23("desc"), [confirmingDelivery, setConfirmingDelivery] = useState23(null), uniqueProducts = useMemo6(() => {
    let names = new Set(records.map((p) => p.itemName));
    return ["all", ...Array.from(names)];
  }, [records]), uniqueBuyers = useMemo6(() => {
    let buyerNames = new Set(records.map((p) => p.profiles?.fullName || `Unknown User (${p.userId})`));
    return ["all", ...Array.from(buyerNames)];
  }, [records]), filteredAndSortedHistory = useMemo6(() => {
    let processedHistory = records.map((p) => ({
      ...p,
      buyerName: p.profiles?.fullName || `Unknown User (${p.userId})`
    }));
    if (searchTerm) {
      let lowerCaseSearchTerm = searchTerm.toLowerCase();
      processedHistory = processedHistory.filter(
        (p) => p.itemName.toLowerCase().includes(lowerCaseSearchTerm) || p.buyerName.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }
    filterProduct !== "all" && (processedHistory = processedHistory.filter((p) => p.itemName === filterProduct)), filterBuyer !== "all" && (processedHistory = processedHistory.filter((p) => p.buyerName === filterBuyer)), filterStatus !== "all" && (processedHistory = processedHistory.filter((p) => p.status === filterStatus));
    let startDate = filterStartDate ? new Date(filterStartDate).getTime() : null, endDate = filterEndDate ? new Date(filterEndDate).setHours(23, 59, 59, 999) : null;
    return (startDate || endDate) && (processedHistory = processedHistory.filter((p) => {
      let purchaseTime = new Date(p.purchaseDate).getTime(), startMatch = startDate ? purchaseTime >= startDate : !0, endMatch = endDate ? purchaseTime <= endDate : !0;
      return startMatch && endMatch;
    })), processedHistory.sort((a, b) => {
      let valA = a[sortKey], valB = b[sortKey];
      (sortKey === "purchaseDate" || sortKey === "deliveryDate") && (valA = valA ? new Date(valA).getTime() : sortDirection === "asc" ? 1 / 0 : -1 / 0, valB = valB ? new Date(valB).getTime() : sortDirection === "asc" ? 1 / 0 : -1 / 0);
      let comparison = 0;
      return typeof valA == "string" && typeof valB == "string" ? comparison = valA.localeCompare(valB) : typeof valA == "number" && typeof valB == "number" ? comparison = valA - valB : comparison = String(valA).localeCompare(String(valB)), sortDirection === "asc" ? comparison : comparison * -1;
    }), processedHistory;
  }, [records, searchTerm, filterProduct, filterBuyer, filterStatus, filterStartDate, filterEndDate, sortKey, sortDirection]), handleSort = (key) => {
    sortKey === key ? setSortDirection(sortDirection === "asc" ? "desc" : "asc") : (setSortKey(key), setSortDirection("asc"));
  }, getSortIcon = (key) => sortKey !== key ? null : sortDirection === "asc" ? " \u25B2" : " \u25BC", formatDateTime = (isoString) => {
    if (!isoString)
      return "N/A";
    try {
      return new Date(isoString).toLocaleString();
    } catch {
      return "Invalid Date";
    }
  }, handleConfirmDelivery = () => {
    confirmingDelivery && (markPurchaseAsDelivered(confirmingDelivery.id), console.log(`Marked purchase ${confirmingDelivery.id} as delivered.`)), setConfirmingDelivery(null);
  };
  return /* @__PURE__ */ jsxDEV44("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxDEV44("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-md border dark:border-gray-700", children: [
      /* @__PURE__ */ jsxDEV44(
        "input",
        {
          type: "text",
          placeholder: "Search Product or Buyer...",
          value: searchTerm,
          onChange: (e) => setSearchTerm(e.target.value),
          className: "p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
        },
        void 0,
        !1,
        {
          fileName: "app/components/market/SalesLogTable.tsx",
          lineNumber: 153,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV44(
        "select",
        {
          value: filterProduct,
          onChange: (e) => setFilterProduct(e.target.value),
          className: "p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600",
          children: uniqueProducts.map((prod) => /* @__PURE__ */ jsxDEV44("option", { value: prod, children: prod === "all" ? "All Products" : prod }, prod, !1, {
            fileName: "app/components/market/SalesLogTable.tsx",
            lineNumber: 166,
            columnNumber: 13
          }, this))
        },
        void 0,
        !1,
        {
          fileName: "app/components/market/SalesLogTable.tsx",
          lineNumber: 160,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV44(
        "select",
        {
          value: filterBuyer,
          onChange: (e) => setFilterBuyer(e.target.value),
          className: "p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600",
          children: uniqueBuyers.map((buyer) => /* @__PURE__ */ jsxDEV44("option", { value: buyer, children: buyer === "all" ? "All Buyers" : buyer }, buyer, !1, {
            fileName: "app/components/market/SalesLogTable.tsx",
            lineNumber: 175,
            columnNumber: 13
          }, this))
        },
        void 0,
        !1,
        {
          fileName: "app/components/market/SalesLogTable.tsx",
          lineNumber: 169,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV44(
        "select",
        {
          value: filterStatus,
          onChange: (e) => setFilterStatus(e.target.value),
          className: "p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600",
          children: [
            /* @__PURE__ */ jsxDEV44("option", { value: "all", children: "All Statuses" }, void 0, !1, {
              fileName: "app/components/market/SalesLogTable.tsx",
              lineNumber: 183,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV44("option", { value: "pending", children: "Pending" }, void 0, !1, {
              fileName: "app/components/market/SalesLogTable.tsx",
              lineNumber: 184,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV44("option", { value: "delivered", children: "Delivered" }, void 0, !1, {
              fileName: "app/components/market/SalesLogTable.tsx",
              lineNumber: 185,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "app/components/market/SalesLogTable.tsx",
          lineNumber: 178,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV44("div", { className: "col-span-1 md:col-span-2 lg:col-span-2 grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxDEV44("div", { children: [
          /* @__PURE__ */ jsxDEV44("label", { htmlFor: "filter-start-date", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Purchase Date From" }, void 0, !1, {
            fileName: "app/components/market/SalesLogTable.tsx",
            lineNumber: 189,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV44(
            "input",
            {
              type: "date",
              id: "filter-start-date",
              value: filterStartDate,
              onChange: (e) => setFilterStartDate(e.target.value),
              className: "p-2 border rounded-md w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            },
            void 0,
            !1,
            {
              fileName: "app/components/market/SalesLogTable.tsx",
              lineNumber: 190,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/components/market/SalesLogTable.tsx",
          lineNumber: 188,
          columnNumber: 14
        }, this),
        /* @__PURE__ */ jsxDEV44("div", { children: [
          /* @__PURE__ */ jsxDEV44("label", { htmlFor: "filter-end-date", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Purchase Date To" }, void 0, !1, {
            fileName: "app/components/market/SalesLogTable.tsx",
            lineNumber: 199,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV44(
            "input",
            {
              type: "date",
              id: "filter-end-date",
              value: filterEndDate,
              onChange: (e) => setFilterEndDate(e.target.value),
              className: "p-2 border rounded-md w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            },
            void 0,
            !1,
            {
              fileName: "app/components/market/SalesLogTable.tsx",
              lineNumber: 200,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/components/market/SalesLogTable.tsx",
          lineNumber: 198,
          columnNumber: 14
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/market/SalesLogTable.tsx",
        lineNumber: 187,
        columnNumber: 10
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/market/SalesLogTable.tsx",
      lineNumber: 152,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV44("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxDEV44("table", { className: "min-w-full divide-y divide-gray-200 dark:divide-gray-700", children: [
      /* @__PURE__ */ jsxDEV44("thead", { className: "bg-gray-50 dark:bg-gray-800", children: /* @__PURE__ */ jsxDEV44("tr", { children: [
        /* @__PURE__ */ jsxDEV44("th", { scope: "col", className: "px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer", onClick: () => handleSort("itemName"), children: [
          "Product Name ",
          getSortIcon("itemName")
        ] }, void 0, !0, {
          fileName: "app/components/market/SalesLogTable.tsx",
          lineNumber: 216,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV44("th", { scope: "col", className: "px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer", onClick: () => handleSort("buyerName"), children: [
          "Buyer ",
          getSortIcon("buyerName")
        ] }, void 0, !0, {
          fileName: "app/components/market/SalesLogTable.tsx",
          lineNumber: 219,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV44("th", { scope: "col", className: "px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer", onClick: () => handleSort("quantity"), children: [
          "Qty ",
          getSortIcon("quantity")
        ] }, void 0, !0, {
          fileName: "app/components/market/SalesLogTable.tsx",
          lineNumber: 222,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV44("th", { scope: "col", className: "px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer", onClick: () => handleSort("price"), children: [
          "Total Price ",
          getSortIcon("price")
        ] }, void 0, !0, {
          fileName: "app/components/market/SalesLogTable.tsx",
          lineNumber: 225,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV44("th", { scope: "col", className: "px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer", onClick: () => handleSort("purchaseDate"), children: [
          "Purchase Date ",
          getSortIcon("purchaseDate")
        ] }, void 0, !0, {
          fileName: "app/components/market/SalesLogTable.tsx",
          lineNumber: 228,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV44("th", { scope: "col", className: "px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer", onClick: () => handleSort("status"), children: [
          "Status ",
          getSortIcon("status")
        ] }, void 0, !0, {
          fileName: "app/components/market/SalesLogTable.tsx",
          lineNumber: 231,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV44("th", { scope: "col", className: "px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer", onClick: () => handleSort("deliveryDate"), children: [
          "Delivery Date ",
          getSortIcon("deliveryDate")
        ] }, void 0, !0, {
          fileName: "app/components/market/SalesLogTable.tsx",
          lineNumber: 234,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV44("th", { scope: "col", className: "px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: "Action" }, void 0, !1, {
          fileName: "app/components/market/SalesLogTable.tsx",
          lineNumber: 237,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/market/SalesLogTable.tsx",
        lineNumber: 215,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/components/market/SalesLogTable.tsx",
        lineNumber: 214,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV44("tbody", { className: "bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700", children: filteredAndSortedHistory.length > 0 ? filteredAndSortedHistory.map((record) => /* @__PURE__ */ jsxDEV44("tr", { className: cn(
        "hover:bg-gray-50 dark:hover:bg-gray-800",
        record.status === "pending" ? "bg-yellow-50 dark:bg-yellow-900/20" : ""
      ), children: [
        /* @__PURE__ */ jsxDEV44("td", { className: "px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white", children: record.itemName }, void 0, !1, {
          fileName: "app/components/market/SalesLogTable.tsx",
          lineNumber: 249,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV44("td", { className: "px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400", children: record.profiles?.fullName || `Unknown User (${record.userId})` }, void 0, !1, {
          fileName: "app/components/market/SalesLogTable.tsx",
          lineNumber: 250,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV44("td", { className: "px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-center", children: record.quantity }, void 0, !1, {
          fileName: "app/components/market/SalesLogTable.tsx",
          lineNumber: 253,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV44("td", { className: "px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400", children: [
          record.price,
          " ",
          /* @__PURE__ */ jsxDEV44("span", { className: "text-xs", children: "ESSENCE" }, void 0, !1, {
            fileName: "app/components/market/SalesLogTable.tsx",
            lineNumber: 254,
            columnNumber: 119
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/market/SalesLogTable.tsx",
          lineNumber: 254,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV44("td", { className: "px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400", children: formatDateTime(record.purchaseDate) }, void 0, !1, {
          fileName: "app/components/market/SalesLogTable.tsx",
          lineNumber: 255,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV44("td", { className: "px-4 py-3 whitespace-nowrap text-sm", children: /* @__PURE__ */ jsxDEV44("span", { className: cn(
          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize",
          record.status === "delivered" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
        ), children: [
          record.status === "delivered" ? /* @__PURE__ */ jsxDEV44(CheckCircleIcon, {}, void 0, !1, {
            fileName: "app/components/market/SalesLogTable.tsx",
            lineNumber: 261,
            columnNumber: 56
          }, this) : /* @__PURE__ */ jsxDEV44(ClockIcon, {}, void 0, !1, {
            fileName: "app/components/market/SalesLogTable.tsx",
            lineNumber: 261,
            columnNumber: 78
          }, this),
          /* @__PURE__ */ jsxDEV44("span", { className: "ml-1", children: record.status }, void 0, !1, {
            fileName: "app/components/market/SalesLogTable.tsx",
            lineNumber: 262,
            columnNumber: 23
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/market/SalesLogTable.tsx",
          lineNumber: 257,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "app/components/market/SalesLogTable.tsx",
          lineNumber: 256,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV44("td", { className: "px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400", children: formatDateTime(record.deliveryDate) }, void 0, !1, {
          fileName: "app/components/market/SalesLogTable.tsx",
          lineNumber: 265,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV44("td", { className: "px-4 py-3 whitespace-nowrap text-sm font-medium", children: record.status === "pending" ? /* @__PURE__ */ jsxDEV44(
          "button",
          {
            onClick: () => setConfirmingDelivery(record),
            className: "inline-flex items-center px-2 py-1 border border-transparent text-xs leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800",
            title: "Mark as Delivered",
            children: [
              /* @__PURE__ */ jsxDEV44(TruckIcon, {}, void 0, !1, {
                fileName: "app/components/market/SalesLogTable.tsx",
                lineNumber: 273,
                columnNumber: 25
              }, this),
              " ",
              /* @__PURE__ */ jsxDEV44("span", { className: "ml-1", children: "Deliver" }, void 0, !1, {
                fileName: "app/components/market/SalesLogTable.tsx",
                lineNumber: 273,
                columnNumber: 39
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/components/market/SalesLogTable.tsx",
            lineNumber: 268,
            columnNumber: 23
          },
          this
        ) : /* @__PURE__ */ jsxDEV44("span", { className: "text-green-600 dark:text-green-400 flex items-center text-xs", children: [
          /* @__PURE__ */ jsxDEV44(CheckCircleIcon, {}, void 0, !1, {
            fileName: "app/components/market/SalesLogTable.tsx",
            lineNumber: 277,
            columnNumber: 25
          }, this),
          " ",
          /* @__PURE__ */ jsxDEV44("span", { className: "ml-1", children: "Completed" }, void 0, !1, {
            fileName: "app/components/market/SalesLogTable.tsx",
            lineNumber: 277,
            columnNumber: 45
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/market/SalesLogTable.tsx",
          lineNumber: 276,
          columnNumber: 23
        }, this) }, void 0, !1, {
          fileName: "app/components/market/SalesLogTable.tsx",
          lineNumber: 266,
          columnNumber: 19
        }, this)
      ] }, record.id, !0, {
        fileName: "app/components/market/SalesLogTable.tsx",
        lineNumber: 245,
        columnNumber: 17
      }, this)) : /* @__PURE__ */ jsxDEV44("tr", { children: /* @__PURE__ */ jsxDEV44("td", { colSpan: 8, className: "px-4 py-4 text-center text-sm text-gray-500 dark:text-gray-400", children: "No purchase records found matching your criteria." }, void 0, !1, {
        fileName: "app/components/market/SalesLogTable.tsx",
        lineNumber: 285,
        columnNumber: 17
      }, this) }, void 0, !1, {
        fileName: "app/components/market/SalesLogTable.tsx",
        lineNumber: 284,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "app/components/market/SalesLogTable.tsx",
        lineNumber: 242,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/market/SalesLogTable.tsx",
      lineNumber: 213,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/components/market/SalesLogTable.tsx",
      lineNumber: 212,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV44(
      ConfirmationModal,
      {
        isOpen: !!confirmingDelivery,
        onClose: () => setConfirmingDelivery(null),
        onConfirm: handleConfirmDelivery,
        title: "Confirm Delivery",
        message: /* @__PURE__ */ jsxDEV44("span", { children: [
          'Are you sure you want to mark the purchase of "',
          /* @__PURE__ */ jsxDEV44("strong", { children: confirmingDelivery?.itemName }, void 0, !1, {
            fileName: "app/components/market/SalesLogTable.tsx",
            lineNumber: 301,
            columnNumber: 60
          }, this),
          '" by ',
          /* @__PURE__ */ jsxDEV44("strong", { children: confirmingDelivery?.profiles?.fullName || `User ID ${confirmingDelivery?.userId}` }, void 0, !1, {
            fileName: "app/components/market/SalesLogTable.tsx",
            lineNumber: 301,
            columnNumber: 112
          }, this),
          " as delivered?"
        ] }, void 0, !0, {
          fileName: "app/components/market/SalesLogTable.tsx",
          lineNumber: 300,
          columnNumber: 11
        }, this),
        confirmText: "Mark Delivered",
        confirmButtonClass: "bg-indigo-600 hover:bg-indigo-700"
      },
      void 0,
      !1,
      {
        fileName: "app/components/market/SalesLogTable.tsx",
        lineNumber: 294,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/components/market/SalesLogTable.tsx",
    lineNumber: 150,
    columnNumber: 5
  }, this);
}

// app/lib/supabase-admin.ts
import { createClient as createClient3 } from "@supabase/supabase-js";
console.log("[supabase-admin] Initializing Supabase admin client module...");
var supabaseUrl2 = process.env.SUPABASE_URL, serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
console.log(`[supabase-admin] Environment SUPABASE_URL check: ${supabaseUrl2 ? `SET (starts with: ${supabaseUrl2.substring(0, Math.min(30, supabaseUrl2.length))}...)` : "NOT SET"}`);
console.log(`[supabase-admin] Environment SUPABASE_SERVICE_ROLE_KEY check: ${serviceRoleKey ? "SET (sensitive, not logged)" : "NOT SET"}`);
if (!supabaseUrl2 || !serviceRoleKey) {
  let errorMessage = "[supabase-admin] CRITICAL ERROR: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables are missing or empty. These are required for admin-level Supabase operations. Please check your .env file and server environment configuration.";
  throw console.error(errorMessage), new Error(errorMessage);
}
var supabaseAdminClientInstance;
try {
  if (console.log("[supabase-admin] Attempting to create Supabase admin client instance..."), supabaseAdminClientInstance = createClient3(supabaseUrl2, serviceRoleKey, {
    auth: {
      // For server-side clients using a service role key, it's good practice:
      autoRefreshToken: !1,
      // No need to refresh a service key
      persistSession: !1,
      // No session to persist
      detectSessionInUrl: !1
      // Not applicable for server-side
    }
  }), console.log("[supabase-admin] Supabase admin client instance created."), !supabaseAdminClientInstance || typeof supabaseAdminClientInstance.from != "function") {
    let clientVerificationError = '[supabase-admin] CRITICAL ERROR: Supabase admin client instance was created, but it does not appear to be a valid Supabase client (e.g., ".from" method is missing).';
    throw console.error(clientVerificationError), new Error(clientVerificationError);
  }
  console.log("[supabase-admin] Supabase admin client instance verified successfully (basic check).");
} catch (error) {
  throw console.error("[supabase-admin] CRITICAL ERROR: Failed to create or verify the Supabase admin client instance.", error.message), error;
}
if (!supabaseAdminClientInstance) {
  let finalCheckError = "[supabase-admin] CRITICAL ERROR: supabaseAdminClientInstance is unexpectedly null or undefined before export. This should not happen if previous checks passed.";
  throw console.error(finalCheckError), new Error(finalCheckError);
}
var supabaseAdmin = supabaseAdminClientInstance, supabase_admin_default = supabaseAdmin;

// app/routes/market.tsx
import { Fragment as Fragment5, jsxDEV as jsxDEV45 } from "react/jsx-dev-runtime";
var MARKET_IMAGES_BUCKET = "product-images", DEFAULT_PLACEHOLDER_IMAGE_URL = "https://zkpgphfdmdzmmsneuzal.supabase.co/storage/v1/object/public/product-images/placeholder.png";
function mapDbItemToMarketplaceItem(dbItem) {
  if (!dbItem)
    return dbItem;
  let { image_url, ...rest } = dbItem;
  return {
    ...rest,
    imageUrl: image_url
  };
}
function mapDbPurchaseRecordToApp(dbRecord) {
  if (!dbRecord)
    return null;
  let mappedProfiles = null;
  dbRecord.profiles && typeof dbRecord.profiles == "object" && "full_name" in dbRecord.profiles && !Array.isArray(dbRecord.profiles) ? mappedProfiles = { fullName: dbRecord.profiles.full_name } : Array.isArray(dbRecord.profiles) && dbRecord.profiles.length > 0 && dbRecord.profiles[0] && typeof dbRecord.profiles[0] == "object" && "full_name" in dbRecord.profiles[0] && (mappedProfiles = { fullName: dbRecord.profiles[0].full_name });
  let {
    item_id,
    item_name_snapshot,
    purchase_date,
    user_id,
    delivery_date,
    total_price,
    price_per_item_snapshot,
    quantity,
    profiles,
    ...rest
  } = dbRecord;
  return {
    ...rest,
    itemId: item_id,
    itemName: item_name_snapshot,
    price: total_price,
    pricePerItemSnapshot: price_per_item_snapshot,
    quantity,
    purchaseDate: purchase_date,
    userId: user_id,
    deliveryDate: delivery_date,
    profiles: mappedProfiles
  };
}
async function loader7({ request }) {
  console.log("[Loader - market] Fetching market data...");
  let { data: marketplaceDbItems, error: itemsError } = await supabase.from("marketplace_items").select("*").order("name", { ascending: !0 });
  itemsError && console.error("[Loader - market] Error fetching marketplace items:", itemsError);
  let marketplaceAppItems = marketplaceDbItems ? marketplaceDbItems.map(mapDbItemToMarketplaceItem) : [];
  console.log("[Loader - market] Attempting to fetch purchase records using supabaseAdmin (bypassing RLS)...");
  let { data: purchaseRecordsDb, error: purchasesError } = await supabase_admin_default.from("purchase_records").select("*").order("purchase_date", { ascending: !1 });
  purchasesError ? console.error("[Loader - market] Error fetching purchase records with supabaseAdmin:", purchasesError) : console.log("[Loader - market] Successfully fetched purchase records with supabaseAdmin (raw):", purchaseRecordsDb?.length);
  let finalPurchaseRecords = (purchaseRecordsDb || []).map(mapDbPurchaseRecordToApp).filter(Boolean);
  return console.log("[Loader - market] Fetched items:", marketplaceAppItems?.length), console.log("[Loader - market] Processed purchase records for app (from admin client):", finalPurchaseRecords?.length), json7({
    marketplaceItems: marketplaceAppItems,
    purchaseRecords: finalPurchaseRecords
  });
}
async function action4({ request }) {
  console.log("[Action - market] Received request");
  let formData;
  if (request.headers.get("Content-Type")?.includes("multipart/form-data")) {
    console.log("[Action - market] Parsing as multipart/form-data");
    let uploadHandler = unstable_createMemoryUploadHandler({
      maxPartSize: 5 * 1024 * 1024
    });
    formData = await unstable_parseMultipartFormData(request, uploadHandler);
  } else
    console.log("[Action - market] Parsing as application/x-www-form-urlencoded"), formData = await request.formData();
  let intent = formData.get("intent");
  switch (console.log("[Action - market] Intent:", intent), intent) {
    case "addMarketplaceItem":
      try {
        let name = formData.get("name"), description = formData.get("description") || "", priceStr = formData.get("price"), stockStr = formData.get("stock"), isUnlimitedStock = formData.get("isUnlimitedStock") === "on", category = formData.get("category"), status = formData.get("status"), imageFile = formData.get("productImage");
        if (!name || !priceStr || !stockStr && !isUnlimitedStock || !category || !status)
          return json7({ success: !1, error: "Missing required fields.", intent }, { status: 400 });
        let price = parseFloat(priceStr), stock = isUnlimitedStock ? -1 : parseInt(stockStr, 10);
        if (isNaN(price) || !isUnlimitedStock && isNaN(stock))
          return json7({ success: !1, error: "Invalid number format for price or stock.", intent }, { status: 400 });
        let uploadedImageUrl = DEFAULT_PLACEHOLDER_IMAGE_URL;
        if (imageFile && imageFile.size > 0) {
          let fileName = `${Date.now()}-${imageFile.name}`;
          if (!supabase_admin_default || !supabase_admin_default.storage)
            return console.error("[Action - market] supabaseAdmin or supabaseAdmin.storage is undefined before image upload."), json7({ success: !1, error: "Server configuration error for image upload.", intent }, { status: 500 });
          let { data: uploadData, error: uploadError } = await supabase_admin_default.storage.from(MARKET_IMAGES_BUCKET).upload(fileName, imageFile, {
            contentType: imageFile.type,
            upsert: !0
          });
          if (uploadError)
            return console.error("[Action - market] Image upload error:", uploadError), json7({ success: !1, error: `Image upload failed: ${uploadError.message}`, intent }, { status: 500 });
          if (uploadData?.path) {
            let { data: publicUrlData } = supabase_admin_default.storage.from(MARKET_IMAGES_BUCKET).getPublicUrl(uploadData.path);
            uploadedImageUrl = publicUrlData?.publicUrl || DEFAULT_PLACEHOLDER_IMAGE_URL;
          }
        }
        let newItemDataForDb = {
          name,
          description,
          price,
          stock,
          category,
          status,
          image_url: uploadedImageUrl
        };
        if (!supabase_admin_default || !supabase_admin_default.from)
          return console.error("[Action - market] supabaseAdmin or supabaseAdmin.from is undefined before DB insert."), json7({ success: !1, error: "Server configuration error for database operation.", intent }, { status: 500 });
        let { data: insertedDbItem, error: insertError } = await supabase_admin_default.from("marketplace_items").insert(newItemDataForDb).select().single();
        if (insertError) {
          if (console.error("[Action - market] Error inserting item:", insertError), uploadedImageUrl !== DEFAULT_PLACEHOLDER_IMAGE_URL && imageFile) {
            let pathToDelete = uploadedImageUrl.substring(uploadedImageUrl.lastIndexOf("/") + 1);
            await supabase_admin_default.storage.from(MARKET_IMAGES_BUCKET).remove([pathToDelete]);
          }
          return json7({ success: !1, error: `Database insert failed: ${insertError.message}`, intent }, { status: 500 });
        }
        let insertedAppItem = mapDbItemToMarketplaceItem(insertedDbItem);
        return console.log("[Action - market] Product added successfully:", insertedAppItem), json7({ success: !0, message: "Product added successfully.", intent, item: insertedAppItem });
      } catch (error) {
        return console.error("[Action - market] Add item general error:", error), (error.message.includes("supabaseAdmin") || error.message.includes("undefined") && error.message.includes("storage") || error.message.includes("undefined") && error.message.includes("from")) && console.error("[Action - market] Error likely related to supabaseAdmin client being undefined or not fully initialized at the time of use."), json7({ success: !1, error: error.message || "An unexpected error occurred.", intent }, { status: 500 });
      }
    case "editMarketplaceItem":
      try {
        let productId = formData.get("productId");
        if (!productId)
          return json7({ success: !1, error: "Missing product ID for edit.", intent }, { status: 400 });
        let name = formData.get("name"), description = formData.get("description") || "", priceStr = formData.get("price"), stockStr = formData.get("stock"), isUnlimitedStock = formData.get("isUnlimitedStock") === "on", category = formData.get("category"), status = formData.get("status"), currentImageUrl = formData.get("currentImageUrl") || DEFAULT_PLACEHOLDER_IMAGE_URL, imageFile = formData.get("productImage");
        if (!name || !priceStr || !stockStr && !isUnlimitedStock || !category || !status)
          return json7({ success: !1, error: "Missing required fields for edit.", intent }, { status: 400 });
        let price = parseFloat(priceStr), stock = isUnlimitedStock ? -1 : parseInt(stockStr, 10);
        if (isNaN(price) || !isUnlimitedStock && isNaN(stock))
          return json7({ success: !1, error: "Invalid number format for price or stock.", intent }, { status: 400 });
        let newUploadedImageUrl = currentImageUrl, oldImageKeyToDelete = null;
        if (imageFile && imageFile.size > 0) {
          if (!supabase_admin_default || !supabase_admin_default.storage)
            return console.error("[Action - market] supabaseAdmin or supabaseAdmin.storage is undefined before image upload (edit)."), json7({ success: !1, error: "Server configuration error for image upload.", intent }, { status: 500 });
          let fileName = `${Date.now()}-${imageFile.name}`, { data: uploadData, error: uploadError } = await supabase_admin_default.storage.from(MARKET_IMAGES_BUCKET).upload(fileName, imageFile, {
            contentType: imageFile.type,
            upsert: !0
          });
          if (uploadError)
            return console.error("[Action - market] Edit - Image upload error:", uploadError), json7({ success: !1, error: `Image upload failed: ${uploadError.message}`, intent }, { status: 500 });
          if (uploadData?.path) {
            let { data: publicUrlData } = supabase_admin_default.storage.from(MARKET_IMAGES_BUCKET).getPublicUrl(uploadData.path);
            newUploadedImageUrl = publicUrlData?.publicUrl || currentImageUrl, currentImageUrl && currentImageUrl !== DEFAULT_PLACEHOLDER_IMAGE_URL && currentImageUrl !== newUploadedImageUrl && (oldImageKeyToDelete = currentImageUrl.substring(currentImageUrl.lastIndexOf("/") + 1));
          }
        }
        let updatedProductDataForDb = {
          name,
          description,
          price,
          stock,
          category,
          status,
          image_url: newUploadedImageUrl
        };
        if (!supabase_admin_default || !supabase_admin_default.from)
          return console.error("[Action - market] supabaseAdmin or supabaseAdmin.from is undefined before DB update (edit)."), json7({ success: !1, error: "Server configuration error for database operation.", intent }, { status: 500 });
        let { data: updatedDbItem, error: updateError } = await supabase_admin_default.from("marketplace_items").update(updatedProductDataForDb).eq("id", productId).select().single();
        if (updateError) {
          if (console.error("[Action - market] Error updating item:", updateError), newUploadedImageUrl !== currentImageUrl && imageFile) {
            let pathToDelete = newUploadedImageUrl.substring(newUploadedImageUrl.lastIndexOf("/") + 1);
            newUploadedImageUrl !== DEFAULT_PLACEHOLDER_IMAGE_URL && await supabase_admin_default.storage.from(MARKET_IMAGES_BUCKET).remove([pathToDelete]);
          }
          return json7({ success: !1, error: `Database update failed: ${updateError.message}`, intent }, { status: 500 });
        }
        if (oldImageKeyToDelete) {
          let { error: deleteOldImageError } = await supabase_admin_default.storage.from(MARKET_IMAGES_BUCKET).remove([oldImageKeyToDelete]);
          deleteOldImageError && console.warn(`[Action - market] Failed to delete old image ${oldImageKeyToDelete}:`, deleteOldImageError.message);
        }
        let updatedAppItem = mapDbItemToMarketplaceItem(updatedDbItem);
        return console.log("[Action - market] Product updated successfully:", updatedAppItem), json7({ success: !0, message: `Product ${name} updated successfully.`, intent, item: updatedAppItem });
      } catch (error) {
        return console.error("[Action - market] Edit item general error:", error), (error.message.includes("supabaseAdmin") || error.message.includes("undefined") && error.message.includes("storage") || error.message.includes("undefined") && error.message.includes("from")) && console.error("[Action - market] Error likely related to supabaseAdmin client being undefined or not fully initialized at the time of use (edit)."), json7({ success: !1, error: error.message || "An unexpected error occurred.", intent }, { status: 500 });
      }
    case "deleteMarketplaceItem":
      try {
        let productId = formData.get("productId"), imageUrlToDelete = formData.get("imageUrl");
        if (!productId)
          return json7({ success: !1, error: "Missing product ID for deletion.", intent }, { status: 400 });
        if (!supabase_admin_default || !supabase_admin_default.from || !supabase_admin_default.storage)
          return console.error("[Action - market] supabaseAdmin client is not fully available for delete operation."), json7({ success: !1, error: "Server configuration error for delete operation.", intent }, { status: 500 });
        let { error: deleteDbError } = await supabase_admin_default.from("marketplace_items").delete().match({ id: productId });
        if (deleteDbError)
          return console.error("[Action - market] Error deleting item from DB:", deleteDbError), json7({ success: !1, error: `Database deletion failed: ${deleteDbError.message}`, intent }, { status: 500 });
        if (imageUrlToDelete && imageUrlToDelete !== DEFAULT_PLACEHOLDER_IMAGE_URL) {
          let imageKey = imageUrlToDelete.substring(imageUrlToDelete.lastIndexOf("/") + 1), { error: deleteStorageError } = await supabase_admin_default.storage.from(MARKET_IMAGES_BUCKET).remove([imageKey]);
          deleteStorageError ? console.warn(`[Action - market] Product DB record deleted, but failed to delete image ${imageKey} from storage:`, deleteStorageError.message) : console.log(`[Action - market] Image ${imageKey} deleted from storage.`);
        }
        return console.log(`[Action - market] Product ID: ${productId} deleted successfully.`), json7({ success: !0, message: "Product deleted successfully.", intent, productId });
      } catch (error) {
        return console.error("[Action - market] Delete item general error:", error), (error.message.includes("supabaseAdmin") || error.message.includes("undefined") && error.message.includes("storage") || error.message.includes("undefined") && error.message.includes("from")) && console.error("[Action - market] Error likely related to supabaseAdmin client being undefined or not fully initialized at the time of use (delete)."), json7({ success: !1, error: error.message || "An unexpected error occurred.", intent }, { status: 500 });
      }
    case "purchaseItem":
      try {
        let itemId = formData.get("itemId"), quantityStr = formData.get("quantity"), userId = formData.get("userId");
        if (console.log(`[Action - purchaseItem] Attempting purchase for userId: ${userId}, itemId: ${itemId}, quantity: ${quantityStr}`), !itemId || !quantityStr || !userId)
          return json7({ success: !1, error: "Missing item ID, quantity, or user ID.", intent }, { status: 400 });
        let quantity = parseInt(quantityStr, 10);
        if (isNaN(quantity) || quantity <= 0)
          return json7({ success: !1, error: "Invalid quantity.", intent }, { status: 400 });
        if (!supabase_admin_default || !supabase_admin_default.from)
          return console.error("[Action - market] supabaseAdmin or supabaseAdmin.from is undefined before purchase operation. Check .env for SUPABASE_SERVICE_KEY."), json7({ success: !1, error: "Server configuration error for purchase operation. Admin client may not be initialized.", intent }, { status: 500 });
        let { data: itemDb, error: itemError } = await supabase_admin_default.from("marketplace_items").select("*").eq("id", itemId).single();
        if (itemError || !itemDb)
          return console.error("[Action - purchaseItem] Error fetching item:", itemError), json7({ success: !1, error: "Item not found or error fetching item.", intent }, { status: 404 });
        let itemApp = mapDbItemToMarketplaceItem(itemDb);
        if (itemApp.status !== "active")
          return json7({ success: !1, error: "This item is currently not available for purchase.", intent }, { status: 400 });
        if (itemApp.stock !== -1 && itemApp.stock < quantity)
          return json7({ success: !1, error: `Insufficient stock. Only ${itemApp.stock} available.`, intent }, { status: 400 });
        let { data: userProfile, error: profileError } = await supabase_admin_default.from("profiles").select("id, balance").eq("id", userId).single();
        if (profileError)
          return console.error(`[Action - purchaseItem] Supabase error fetching user profile for ID '${userId}'. Error:`, profileError), json7({ success: !1, error: `Error fetching user profile: ${profileError.message}. This could be due to incorrect admin credentials, network issues, or an invalid User ID format.`, intent }, { status: 500 });
        if (!userProfile)
          return console.error(`[Action - purchaseItem] User profile not found for ID: ${userId}. Ensure this user exists in the 'profiles' table and the ID is a valid UUID.`), json7({ success: !1, error: `User profile not found for ID: ${userId}. Please ensure the user exists in the database and the ID is a valid UUID.`, intent }, { status: 404 });
        let currentPricePerItem = itemApp.price, calculatedTotalPrice = currentPricePerItem * quantity;
        if (userProfile.balance < calculatedTotalPrice)
          return json7({ success: !1, error: "Insufficient ESSENCE balance.", intent }, { status: 400 });
        let newBalance = userProfile.balance - calculatedTotalPrice, { error: balanceUpdateError } = await supabase_admin_default.from("profiles").update({ balance: newBalance }).eq("id", userId);
        if (balanceUpdateError)
          return console.error("[Action - purchaseItem] Error updating user balance:", balanceUpdateError), json7({ success: !1, error: "Failed to update user balance. Purchase not completed.", intent }, { status: 500 });
        let updatedItemStock = itemApp.stock;
        if (itemApp.stock !== -1) {
          let newStock = itemApp.stock - quantity;
          updatedItemStock = newStock;
          let { error: stockUpdateError } = await supabase_admin_default.from("marketplace_items").update({ stock: newStock }).eq("id", itemId);
          if (stockUpdateError)
            return console.error("[Action - purchaseItem] Error updating item stock:", stockUpdateError), await supabase_admin_default.from("profiles").update({ balance: userProfile.balance }).eq("id", userId), json7({ success: !1, error: "Failed to update item stock. Purchase cancelled and balance restored.", intent }, { status: 500 });
        }
        let purchaseTimestamp = (/* @__PURE__ */ new Date()).toISOString(), initialStatus = itemApp.category === "Digital Goods" ? "delivered" : "pending", initialDeliveryDate = initialStatus === "delivered" ? purchaseTimestamp : null, newPurchaseRecordDataForDb = {
          item_id: itemApp.id,
          item_name_snapshot: itemApp.name,
          price_per_item_snapshot: currentPricePerItem,
          total_price: calculatedTotalPrice,
          quantity,
          purchase_date: purchaseTimestamp,
          user_id: userId,
          status: initialStatus,
          delivery_date: initialDeliveryDate
        }, { data: createdPurchaseRecordDb, error: purchaseRecordError } = await supabase_admin_default.from("purchase_records").insert(newPurchaseRecordDataForDb).select("*, profiles (full_name)").single();
        if (purchaseRecordError || !createdPurchaseRecordDb)
          return console.error("[Action - purchaseItem] Error creating purchase record:", purchaseRecordError), await supabase_admin_default.from("profiles").update({ balance: userProfile.balance }).eq("id", userId), itemApp.stock !== -1 && await supabase_admin_default.from("marketplace_items").update({ stock: itemApp.stock }).eq("id", itemId), purchaseRecordError?.message.includes('relation "public.users" does not exist') ? (console.error("[Action - purchaseItem] CRITICAL: 'public.users' error even with supabaseAdmin during purchase record creation join. This points to a fundamental issue with the 'profiles' join, possibly a view definition."), json7({ success: !1, error: "Failed to record purchase due to a database relation issue (public.users). Transaction cancelled.", intent }, { status: 500 })) : json7({ success: !1, error: `Failed to record purchase: ${purchaseRecordError?.message || "Unknown error"}. Transaction cancelled and changes reverted.`, intent }, { status: 500 });
        let createdPurchaseRecordApp = mapDbPurchaseRecordToApp(createdPurchaseRecordDb);
        return console.log(`[Action - purchaseItem] User ${userId} purchased ${quantity}x ${itemApp.name} (ID: ${itemId}) for ${calculatedTotalPrice} ESSENCE.`), json7({
          success: !0,
          message: `Successfully purchased ${quantity}x ${itemApp.name}!`,
          intent,
          finalBalance: newBalance,
          userId,
          updatedItem: { ...itemApp, stock: updatedItemStock },
          purchaseRecord: createdPurchaseRecordApp
        });
      } catch (error) {
        return console.error("[Action - purchaseItem] General error:", error), (error.message.includes("supabaseAdmin") || error.message.includes("undefined") && error.message.includes("from")) && console.error("[Action - market] Error likely related to supabaseAdmin client being undefined or not fully initialized at the time of use (purchase)."), json7({ success: !1, error: error.message || "An unexpected error occurred during purchase.", intent }, { status: 500 });
      }
    default:
      return console.warn(`[Action - market] Unhandled intent: ${intent}`), json7({ success: !1, error: `Unhandled intent: ${intent}`, intent }, { status: 400 });
  }
}
function ShopContent() {
  let allItems = useStore((state) => state.marketplaceItems), activeItems = useMemo7(() => allItems.filter((item) => item.status === "active"), [allItems]), [selectedItem, setSelectedItem] = useState24(null), [searchTerm, setSearchTerm] = useState24(""), [filterCategory, setFilterCategory] = useState24("all"), [sortBy, setSortBy] = useState24("default"), handleSelectItem = useCallback3((item) => {
    setSelectedItem(item);
  }, []), handleCloseModal = useCallback3(() => {
    setSelectedItem(null);
  }, []), categories = useMemo7(() => {
    let uniqueCategories = new Set(activeItems.map((item) => item.category));
    return Array.from(uniqueCategories);
  }, [activeItems]), displayedItems = useMemo7(() => {
    let items = [...activeItems];
    if (searchTerm) {
      let lowerCaseSearchTerm = searchTerm.toLowerCase();
      items = items.filter(
        (item) => item.name.toLowerCase().includes(lowerCaseSearchTerm) || item.description && item.description.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }
    switch (filterCategory !== "all" && (items = items.filter((item) => item.category === filterCategory)), sortBy) {
      case "price-asc":
        items.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        items.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        items.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        items.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
    return items;
  }, [activeItems, searchTerm, filterCategory, sortBy]);
  return /* @__PURE__ */ jsxDEV45("div", { className: "space-y-4 p-4", children: [
    /* @__PURE__ */ jsxDEV45("div", { className: "flex flex-col gap-4 md:flex-row", children: [
      /* @__PURE__ */ jsxDEV45(SearchBar, { searchTerm, onSearchChange: setSearchTerm }, void 0, !1, {
        fileName: "app/routes/market.tsx",
        lineNumber: 600,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV45(
        FilterSortPanel,
        {
          categories,
          selectedCategory: filterCategory,
          onCategoryChange: setFilterCategory,
          sortBy,
          onSortChange: setSortBy
        },
        void 0,
        !1,
        {
          fileName: "app/routes/market.tsx",
          lineNumber: 601,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/market.tsx",
      lineNumber: 599,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV45("div", { className: "flex-1", children: /* @__PURE__ */ jsxDEV45(ProductGrid, { items: displayedItems, onSelectItem: handleSelectItem }, void 0, !1, {
      fileName: "app/routes/market.tsx",
      lineNumber: 610,
      columnNumber: 10
    }, this) }, void 0, !1, {
      fileName: "app/routes/market.tsx",
      lineNumber: 609,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV45(ProductDetailModal, { item: selectedItem, onClose: handleCloseModal }, void 0, !1, {
      fileName: "app/routes/market.tsx",
      lineNumber: 612,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/market.tsx",
    lineNumber: 598,
    columnNumber: 5
  }, this);
}
function SetupContent() {
  let navigation = useNavigation6(), actionData = useActionData8(), { marketplaceItems } = useStore((state) => ({
    marketplaceItems: state.marketplaceItems
  })), [showAddForm, setShowAddForm] = useState24(!1), [editingProduct, setEditingProduct] = useState24(null), [deletingProduct, setDeletingProduct] = useState24(null), processedActionRef = useRef(null);
  useEffect18(() => {
    let actionKey = actionData ? `${actionData.intent}-${actionData.message || actionData.error}-${actionData.productId || actionData.item?.id}` : null;
    actionData?.success && actionKey && processedActionRef.current !== actionKey ? (actionData.intent === "addMarketplaceItem" ? (console.log("[SetupContent Effect] Action 'addMarketplaceItem' successful. Closing form."), setShowAddForm(!1)) : actionData.intent === "deleteMarketplaceItem" ? (console.log("[SetupContent Effect] Action 'deleteMarketplaceItem' successful. Closing modal."), setDeletingProduct(null)) : actionData.intent === "editMarketplaceItem" && (console.log("[SetupContent Effect] Action 'editMarketplaceItem' successful. Closing modal."), setEditingProduct(null)), processedActionRef.current = actionKey) : !actionData?.success && actionData?.error && actionKey && processedActionRef.current !== actionKey && (processedActionRef.current = actionKey);
  }, [actionData]);
  let categories = useMemo7(() => {
    let uniqueCategories = new Set(marketplaceItems.map((item) => item.category));
    return Array.from(uniqueCategories);
  }, [marketplaceItems]), handleCancelAddForm = useCallback3(() => setShowAddForm(!1), []);
  return /* @__PURE__ */ jsxDEV45("div", { className: "p-4 space-y-6", children: [
    /* @__PURE__ */ jsxDEV45("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsxDEV45("h2", { className: "text-xl font-semibold", children: "Inventory Management" }, void 0, !1, {
        fileName: "app/routes/market.tsx",
        lineNumber: 664,
        columnNumber: 9
      }, this),
      !showAddForm && /* @__PURE__ */ jsxDEV45(
        "button",
        {
          onClick: () => setShowAddForm(!0),
          className: "px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium",
          children: "+ Add New Product"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/market.tsx",
          lineNumber: 666,
          columnNumber: 12
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/market.tsx",
      lineNumber: 663,
      columnNumber: 7
    }, this),
    showAddForm && /* @__PURE__ */ jsxDEV45(
      AddProductForm,
      {
        onCancel: handleCancelAddForm,
        categories,
        navigation,
        actionData
      },
      void 0,
      !1,
      {
        fileName: "app/routes/market.tsx",
        lineNumber: 676,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ jsxDEV45(
      InventoryTable,
      {
        items: marketplaceItems,
        onEdit: (item) => setEditingProduct(item),
        onDelete: (item) => setDeletingProduct(item)
      },
      void 0,
      !1,
      {
        fileName: "app/routes/market.tsx",
        lineNumber: 684,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV45(
      EditProductModal,
      {
        isOpen: !!editingProduct,
        onClose: () => setEditingProduct(null),
        product: editingProduct,
        categories,
        navigation,
        actionData
      },
      void 0,
      !1,
      {
        fileName: "app/routes/market.tsx",
        lineNumber: 690,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV45(
      DeleteConfirmationModal,
      {
        isOpen: !!deletingProduct,
        onClose: () => setDeletingProduct(null),
        product: deletingProduct,
        navigation,
        defaultPlaceholderImageUrl: DEFAULT_PLACEHOLDER_IMAGE_URL
      },
      void 0,
      !1,
      {
        fileName: "app/routes/market.tsx",
        lineNumber: 699,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/routes/market.tsx",
    lineNumber: 662,
    columnNumber: 5
  }, this);
}
function SalesContent({ purchaseRecords }) {
  return /* @__PURE__ */ jsxDEV45("div", { className: "p-4 space-y-6", children: [
    /* @__PURE__ */ jsxDEV45("h2", { className: "text-xl font-semibold", children: "Sales Log" }, void 0, !1, {
      fileName: "app/routes/market.tsx",
      lineNumber: 720,
      columnNumber: 8
    }, this),
    /* @__PURE__ */ jsxDEV45(SalesLogTable, { records: purchaseRecords }, void 0, !1, {
      fileName: "app/routes/market.tsx",
      lineNumber: 721,
      columnNumber: 8
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/market.tsx",
    lineNumber: 719,
    columnNumber: 5
  }, this);
}
function Marketplace() {
  let { marketplaceItems: loaderMarketplaceItems, purchaseRecords: loaderPurchaseRecords } = useLoaderData6(), actionData = useActionData8(), {
    setMarketplaceItems,
    updateMarketplaceItem,
    setPurchaseRecords,
    addPurchaseRecord,
    setCurrentUser,
    currentUser
  } = useStore((state) => ({
    setMarketplaceItems: state.setMarketplaceItems,
    updateMarketplaceItem: state.updateMarketplaceItem,
    setPurchaseRecords: state.setPurchaseRecords,
    addPurchaseRecord: state.addPurchaseRecord,
    setCurrentUser: state.setCurrentUser,
    currentUser: state.currentUser
  })), processedActionDataKeyRef = useRef(null);
  useEffect18(() => {
    console.log("[Marketplace Route] Loader data received. Syncing ALL items/records to Zustand."), console.log("[Marketplace Route] Loader marketplaceItems count:", loaderMarketplaceItems?.length), console.log("[Marketplace Route] Loader purchaseRecords count:", loaderPurchaseRecords?.length), setMarketplaceItems(loaderMarketplaceItems), setPurchaseRecords(loaderPurchaseRecords);
  }, [loaderMarketplaceItems, loaderPurchaseRecords, setMarketplaceItems, setPurchaseRecords]), useEffect18(() => {
    if (!actionData)
      return;
    let currentActionKey = `${actionData.intent}-${actionData.success}-${actionData.message || actionData.error}-${actionData.userId || ""}-${actionData.finalBalance || ""}-${actionData.updatedItem?.id || ""}-${actionData.purchaseRecord?.id || ""}`;
    if (processedActionDataKeyRef.current === currentActionKey) {
      console.log("[Marketplace Route Effect] Action data already processed, skipping:", currentActionKey);
      return;
    }
    console.log("[Marketplace Route Effect] Processing actionData:", actionData), processedActionDataKeyRef.current = currentActionKey, actionData.intent === "purchaseItem" && actionData.success ? (console.log("[Marketplace Route Effect] Purchase successful. Processing action data for purchase:", actionData), actionData.finalBalance !== void 0 && actionData.userId && currentUser && currentUser.id === actionData.userId && currentUser.balance !== actionData.finalBalance && (console.log(`[Marketplace Route Effect] Updating balance for user ${actionData.userId} from ${currentUser.balance} to ${actionData.finalBalance}`), setCurrentUser({ ...currentUser, balance: actionData.finalBalance })), actionData.updatedItem && (console.log(`[Marketplace Route Effect] Updating marketplace item ID: ${actionData.updatedItem.id}`), updateMarketplaceItem(actionData.updatedItem)), actionData.purchaseRecord && (console.log(`[Marketplace Route Effect] Adding new purchase record ID: ${actionData.purchaseRecord.id} to store.`), addPurchaseRecord(actionData.purchaseRecord))) : actionData.success ? console.log(`[Marketplace Route Effect] Successful action '${actionData.intent}', but not 'purchaseItem'. Item:`, actionData.item) : !actionData.success && actionData.error && console.warn("[Marketplace Route Effect] Action failed:", actionData.error, "Intent:", actionData.intent);
  }, [actionData, setCurrentUser, updateMarketplaceItem, addPurchaseRecord, currentUser]);
  let isSuperAdmin = useUserRole() === "Super Admin", [activeTab, setActiveTab] = useState24("shop"), storePurchaseRecords = useStore((state) => state.purchaseRecords), tabClasses = (tabName) => cn(
    "px-4 py-2 font-medium text-sm rounded-md cursor-pointer",
    activeTab === tabName ? "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100" : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
  );
  return /* @__PURE__ */ jsxDEV45("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxDEV45("h1", { className: "text-2xl font-bold", children: "Marketplace" }, void 0, !1, {
      fileName: "app/routes/market.tsx",
      lineNumber: 816,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV45("div", { className: "border-b border-gray-200 dark:border-gray-700", children: /* @__PURE__ */ jsxDEV45("nav", { className: "-mb-px flex space-x-4", "aria-label": "Tabs", children: [
      /* @__PURE__ */ jsxDEV45(
        "button",
        {
          className: tabClasses("shop"),
          onClick: () => setActiveTab("shop"),
          "aria-current": activeTab === "shop" ? "page" : void 0,
          children: "Shop"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/market.tsx",
          lineNumber: 820,
          columnNumber: 11
        },
        this
      ),
      isSuperAdmin && /* @__PURE__ */ jsxDEV45(Fragment5, { children: [
        /* @__PURE__ */ jsxDEV45(
          "button",
          {
            className: tabClasses("setup"),
            onClick: () => setActiveTab("setup"),
            "aria-current": activeTab === "setup" ? "page" : void 0,
            children: "Set-up"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/market.tsx",
            lineNumber: 829,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ jsxDEV45(
          "button",
          {
            className: tabClasses("sales"),
            onClick: () => setActiveTab("sales"),
            "aria-current": activeTab === "sales" ? "page" : void 0,
            children: "Sales Log"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/market.tsx",
            lineNumber: 836,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/market.tsx",
        lineNumber: 828,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/market.tsx",
      lineNumber: 819,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/market.tsx",
      lineNumber: 818,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV45("div", { children: [
      activeTab === "shop" && /* @__PURE__ */ jsxDEV45(ShopContent, {}, void 0, !1, {
        fileName: "app/routes/market.tsx",
        lineNumber: 849,
        columnNumber: 34
      }, this),
      isSuperAdmin && activeTab === "setup" && /* @__PURE__ */ jsxDEV45(SetupContent, {}, void 0, !1, {
        fileName: "app/routes/market.tsx",
        lineNumber: 850,
        columnNumber: 51
      }, this),
      isSuperAdmin && activeTab === "sales" && /* @__PURE__ */ jsxDEV45(SalesContent, { purchaseRecords: storePurchaseRecords }, void 0, !1, {
        fileName: "app/routes/market.tsx",
        lineNumber: 851,
        columnNumber: 51
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/market.tsx",
      lineNumber: 848,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/market.tsx",
    lineNumber: 815,
    columnNumber: 5
  }, this);
}

// app/routes/admin.tsx
var admin_exports = {};
__export(admin_exports, {
  action: () => action5,
  default: () => AdminPage,
  loader: () => loader8,
  meta: () => meta6
});
import { json as json8 } from "@remix-run/node";
import { useLoaderData as useLoaderData7, useActionData as useActionData13, useNavigation as useNavigation11 } from "@remix-run/react";

// app/components/admin/AdminTabs.tsx
import { useState as useState33 } from "react";
import { Tab as Tab3 } from "@headlessui/react";

// app/components/admin/UsersTabContent.tsx
import { useState as useState29, useMemo as useMemo9, useCallback as useCallback5, useEffect as useEffect22 } from "react";

// app/components/admin/UsersTable.tsx
import { jsxDEV as jsxDEV46 } from "react/jsx-dev-runtime";
function ViewIcon(props) {
  return /* @__PURE__ */ jsxDEV46("svg", { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ jsxDEV46("path", { d: "M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" }, void 0, !1, {
      fileName: "app/components/admin/UsersTable.tsx",
      lineNumber: 6,
      columnNumber: 265
    }, this),
    /* @__PURE__ */ jsxDEV46("circle", { cx: "12", cy: "12", r: "3" }, void 0, !1, {
      fileName: "app/components/admin/UsersTable.tsx",
      lineNumber: 6,
      columnNumber: 321
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/admin/UsersTable.tsx",
    lineNumber: 6,
    columnNumber: 76
  }, this);
}
function EditIcon2(props) {
  return /* @__PURE__ */ jsxDEV46("svg", { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ jsxDEV46("path", { d: "M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" }, void 0, !1, {
      fileName: "app/components/admin/UsersTable.tsx",
      lineNumber: 7,
      columnNumber: 265
    }, this),
    /* @__PURE__ */ jsxDEV46("path", { d: "m15 5 4 4" }, void 0, !1, {
      fileName: "app/components/admin/UsersTable.tsx",
      lineNumber: 7,
      columnNumber: 325
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/admin/UsersTable.tsx",
    lineNumber: 7,
    columnNumber: 76
  }, this);
}
function DeleteIcon2(props) {
  return /* @__PURE__ */ jsxDEV46("svg", { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ jsxDEV46("path", { d: "M3 6h18" }, void 0, !1, {
      fileName: "app/components/admin/UsersTable.tsx",
      lineNumber: 8,
      columnNumber: 267
    }, this),
    /* @__PURE__ */ jsxDEV46("path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" }, void 0, !1, {
      fileName: "app/components/admin/UsersTable.tsx",
      lineNumber: 8,
      columnNumber: 286
    }, this),
    /* @__PURE__ */ jsxDEV46("path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" }, void 0, !1, {
      fileName: "app/components/admin/UsersTable.tsx",
      lineNumber: 8,
      columnNumber: 335
    }, this),
    /* @__PURE__ */ jsxDEV46("line", { x1: "10", x2: "10", y1: "11", y2: "17" }, void 0, !1, {
      fileName: "app/components/admin/UsersTable.tsx",
      lineNumber: 8,
      columnNumber: 381
    }, this),
    /* @__PURE__ */ jsxDEV46("line", { x1: "14", x2: "14", y1: "11", y2: "17" }, void 0, !1, {
      fileName: "app/components/admin/UsersTable.tsx",
      lineNumber: 8,
      columnNumber: 420
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/admin/UsersTable.tsx",
    lineNumber: 8,
    columnNumber: 78
  }, this);
}
function SuspendIcon(props) {
  return /* @__PURE__ */ jsxDEV46("svg", { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ jsxDEV46("circle", { cx: "12", cy: "12", r: "10" }, void 0, !1, {
      fileName: "app/components/admin/UsersTable.tsx",
      lineNumber: 9,
      columnNumber: 268
    }, this),
    /* @__PURE__ */ jsxDEV46("line", { x1: "10", x2: "10", y1: "15", y2: "9" }, void 0, !1, {
      fileName: "app/components/admin/UsersTable.tsx",
      lineNumber: 9,
      columnNumber: 300
    }, this),
    /* @__PURE__ */ jsxDEV46("line", { x1: "14", x2: "14", y1: "15", y2: "9" }, void 0, !1, {
      fileName: "app/components/admin/UsersTable.tsx",
      lineNumber: 9,
      columnNumber: 338
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/admin/UsersTable.tsx",
    lineNumber: 9,
    columnNumber: 79
  }, this);
}
function RestoreIcon(props) {
  return /* @__PURE__ */ jsxDEV46("svg", { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ jsxDEV46("circle", { cx: "12", cy: "12", r: "10" }, void 0, !1, {
      fileName: "app/components/admin/UsersTable.tsx",
      lineNumber: 10,
      columnNumber: 268
    }, this),
    /* @__PURE__ */ jsxDEV46("polygon", { points: "10 8 16 12 10 16 10 8" }, void 0, !1, {
      fileName: "app/components/admin/UsersTable.tsx",
      lineNumber: 10,
      columnNumber: 300
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/admin/UsersTable.tsx",
    lineNumber: 10,
    columnNumber: 79
  }, this);
}
function PasswordIcon(props) {
  return /* @__PURE__ */ jsxDEV46("svg", { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ jsxDEV46("path", { d: "M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z" }, void 0, !1, {
      fileName: "app/components/admin/UsersTable.tsx",
      lineNumber: 11,
      columnNumber: 269
    }, this),
    /* @__PURE__ */ jsxDEV46("circle", { cx: "16.5", cy: "7.5", r: ".5" }, void 0, !1, {
      fileName: "app/components/admin/UsersTable.tsx",
      lineNumber: 11,
      columnNumber: 340
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/admin/UsersTable.tsx",
    lineNumber: 11,
    columnNumber: 80
  }, this);
}
function UsersTable({
  users,
  onViewProfile,
  onEdit,
  onDelete,
  onSuspend,
  onRestore,
  onChangePassword
}) {
  let getStatusClass = (isSuspended) => isSuspended ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200", getRoleClass = (role) => {
    switch (role) {
      case "Super Admin":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "Admin":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "User":
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };
  return /* @__PURE__ */ jsxDEV46("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxDEV46("table", { className: "min-w-full divide-y divide-gray-200 dark:divide-gray-700", children: [
    /* @__PURE__ */ jsxDEV46("thead", { className: "bg-gray-50 dark:bg-gray-800", children: /* @__PURE__ */ jsxDEV46("tr", { children: [
      /* @__PURE__ */ jsxDEV46("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400", children: "Full Name" }, void 0, !1, {
        fileName: "app/components/admin/UsersTable.tsx",
        lineNumber: 55,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV46("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400", children: "Email" }, void 0, !1, {
        fileName: "app/components/admin/UsersTable.tsx",
        lineNumber: 56,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV46("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400", children: "Group" }, void 0, !1, {
        fileName: "app/components/admin/UsersTable.tsx",
        lineNumber: 57,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV46("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400", children: "Role" }, void 0, !1, {
        fileName: "app/components/admin/UsersTable.tsx",
        lineNumber: 58,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV46("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400", children: "Status" }, void 0, !1, {
        fileName: "app/components/admin/UsersTable.tsx",
        lineNumber: 59,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV46("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400", children: "Actions" }, void 0, !1, {
        fileName: "app/components/admin/UsersTable.tsx",
        lineNumber: 60,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/admin/UsersTable.tsx",
      lineNumber: 54,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/components/admin/UsersTable.tsx",
      lineNumber: 53,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV46("tbody", { className: "bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700", children: users.length === 0 ? /* @__PURE__ */ jsxDEV46("tr", { children: /* @__PURE__ */ jsxDEV46("td", { colSpan: 6, className: "px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400", children: "No users found matching your criteria." }, void 0, !1, {
      fileName: "app/components/admin/UsersTable.tsx",
      lineNumber: 66,
      columnNumber: 15
    }, this) }, void 0, !1, {
      fileName: "app/components/admin/UsersTable.tsx",
      lineNumber: 65,
      columnNumber: 13
    }, this) : users.map((user) => /* @__PURE__ */ jsxDEV46("tr", { children: [
      /* @__PURE__ */ jsxDEV46("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white", children: user.fullName }, void 0, !1, {
        fileName: "app/components/admin/UsersTable.tsx",
        lineNumber: 73,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV46("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400", children: user.email }, void 0, !1, {
        fileName: "app/components/admin/UsersTable.tsx",
        lineNumber: 74,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV46("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400", children: user.groupName ?? "N/A" }, void 0, !1, {
        fileName: "app/components/admin/UsersTable.tsx",
        lineNumber: 75,
        columnNumber: 17
      }, this),
      " ",
      /* @__PURE__ */ jsxDEV46("td", { className: "px-6 py-4 whitespace-nowrap text-sm", children: /* @__PURE__ */ jsxDEV46("span", { className: cn("px-2 inline-flex text-xs leading-5 font-semibold rounded-full", getRoleClass(user.role)), children: user.role }, void 0, !1, {
        fileName: "app/components/admin/UsersTable.tsx",
        lineNumber: 77,
        columnNumber: 20
      }, this) }, void 0, !1, {
        fileName: "app/components/admin/UsersTable.tsx",
        lineNumber: 76,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV46("td", { className: "px-6 py-4 whitespace-nowrap text-sm", children: /* @__PURE__ */ jsxDEV46("span", { className: cn("px-2 inline-flex text-xs leading-5 font-semibold rounded-full", getStatusClass(user.isSuspended)), children: [
        user.isSuspended ? "Suspended" : "Active",
        " "
      ] }, void 0, !0, {
        fileName: "app/components/admin/UsersTable.tsx",
        lineNumber: 82,
        columnNumber: 19
      }, this) }, void 0, !1, {
        fileName: "app/components/admin/UsersTable.tsx",
        lineNumber: 81,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV46("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium space-x-1", children: [
        /* @__PURE__ */ jsxDEV46("button", { onClick: () => onViewProfile(user), className: "text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-200 p-1", title: "View Profile", children: /* @__PURE__ */ jsxDEV46(ViewIcon, { className: "h-5 w-5" }, void 0, !1, {
          fileName: "app/components/admin/UsersTable.tsx",
          lineNumber: 89,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "app/components/admin/UsersTable.tsx",
          lineNumber: 88,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV46("button", { onClick: () => onEdit(user), className: "text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-200 p-1", title: "Edit User", children: /* @__PURE__ */ jsxDEV46(EditIcon2, { className: "h-5 w-5" }, void 0, !1, {
          fileName: "app/components/admin/UsersTable.tsx",
          lineNumber: 92,
          columnNumber: 22
        }, this) }, void 0, !1, {
          fileName: "app/components/admin/UsersTable.tsx",
          lineNumber: 91,
          columnNumber: 19
        }, this),
        user.isSuspended ? /* @__PURE__ */ jsxDEV46("button", { onClick: () => onRestore(user), className: "text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-200 p-1", title: "Restore User", children: /* @__PURE__ */ jsxDEV46(RestoreIcon, { className: "h-5 w-5" }, void 0, !1, {
          fileName: "app/components/admin/UsersTable.tsx",
          lineNumber: 101,
          columnNumber: 23
        }, this) }, void 0, !1, {
          fileName: "app/components/admin/UsersTable.tsx",
          lineNumber: 100,
          columnNumber: 21
        }, this) : /* @__PURE__ */ jsxDEV46("button", { onClick: () => onSuspend(user), className: "text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-200 p-1", title: "Suspend User", children: /* @__PURE__ */ jsxDEV46(SuspendIcon, { className: "h-5 w-5" }, void 0, !1, {
          fileName: "app/components/admin/UsersTable.tsx",
          lineNumber: 97,
          columnNumber: 23
        }, this) }, void 0, !1, {
          fileName: "app/components/admin/UsersTable.tsx",
          lineNumber: 96,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ jsxDEV46("button", { onClick: () => onChangePassword(user), className: "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 p-1", title: "Change Password", children: /* @__PURE__ */ jsxDEV46(PasswordIcon, { className: "h-5 w-5" }, void 0, !1, {
          fileName: "app/components/admin/UsersTable.tsx",
          lineNumber: 105,
          columnNumber: 22
        }, this) }, void 0, !1, {
          fileName: "app/components/admin/UsersTable.tsx",
          lineNumber: 104,
          columnNumber: 20
        }, this),
        /* @__PURE__ */ jsxDEV46("button", { onClick: () => onDelete(user), className: "text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-200 p-1", title: "Delete User", children: /* @__PURE__ */ jsxDEV46(DeleteIcon2, { className: "h-5 w-5" }, void 0, !1, {
          fileName: "app/components/admin/UsersTable.tsx",
          lineNumber: 108,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "app/components/admin/UsersTable.tsx",
          lineNumber: 107,
          columnNumber: 19
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/admin/UsersTable.tsx",
        lineNumber: 86,
        columnNumber: 17
      }, this)
    ] }, user.id, !0, {
      fileName: "app/components/admin/UsersTable.tsx",
      lineNumber: 72,
      columnNumber: 15
    }, this)) }, void 0, !1, {
      fileName: "app/components/admin/UsersTable.tsx",
      lineNumber: 63,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/admin/UsersTable.tsx",
    lineNumber: 52,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/components/admin/UsersTable.tsx",
    lineNumber: 51,
    columnNumber: 5
  }, this);
}

// app/components/admin/AddUserModal.tsx
import React24, { useState as useState25, useEffect as useEffect19 } from "react";
import { Dialog as Dialog4, Transition as Transition3 } from "@headlessui/react";
import { Form as Form15 } from "@remix-run/react";
import { jsxDEV as jsxDEV47 } from "react/jsx-dev-runtime";
function AddUserModal({ isOpen, onClose, groups, actionData, navigation }) {
  let [email, setEmail] = useState25(""), [fullName, setFullName] = useState25(""), [password, setPassword] = useState25(""), [role, setRole] = useState25("User"), [groupId, setGroupId] = useState25(""), [formError, setFormError] = useState25(null), isSubmitting = navigation.state === "submitting" && navigation.formData?.get("intent") === "create-user";
  return useEffect19(() => {
    isOpen || (setEmail(""), setFullName(""), setPassword(""), setRole("User"), setGroupId(""), setFormError(null));
  }, [isOpen]), useEffect19(() => {
    actionData?.intent === "create-user" && !actionData?.success && actionData?.error ? setFormError(actionData.error) : actionData?.intent === "create-user" && actionData?.success && setFormError(null);
  }, [actionData]), /* @__PURE__ */ jsxDEV47(Transition3, { appear: !0, show: isOpen, as: React24.Fragment, children: /* @__PURE__ */ jsxDEV47(Dialog4, { as: "div", className: "relative z-10", onClose, children: [
    /* @__PURE__ */ jsxDEV47(
      Transition3.Child,
      {
        as: React24.Fragment,
        enter: "ease-out duration-300",
        enterFrom: "opacity-0",
        enterTo: "opacity-100",
        leave: "ease-in duration-200",
        leaveFrom: "opacity-100",
        leaveTo: "opacity-0",
        children: /* @__PURE__ */ jsxDEV47("div", { className: "fixed inset-0 bg-black bg-opacity-25" }, void 0, !1, {
          fileName: "app/components/admin/AddUserModal.tsx",
          lineNumber: 60,
          columnNumber: 11
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/components/admin/AddUserModal.tsx",
        lineNumber: 51,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ jsxDEV47("div", { className: "fixed inset-0 overflow-y-auto", children: /* @__PURE__ */ jsxDEV47("div", { className: "flex min-h-full items-center justify-center p-4 text-center", children: /* @__PURE__ */ jsxDEV47(
      Transition3.Child,
      {
        as: React24.Fragment,
        enter: "ease-out duration-300",
        enterFrom: "opacity-0 scale-95",
        enterTo: "opacity-100 scale-100",
        leave: "ease-in duration-200",
        leaveFrom: "opacity-100 scale-100",
        leaveTo: "opacity-0 scale-95",
        children: /* @__PURE__ */ jsxDEV47(Dialog4.Panel, { className: "w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all", children: [
          /* @__PURE__ */ jsxDEV47(
            Dialog4.Title,
            {
              as: "h3",
              className: "text-lg font-medium leading-6 text-gray-900 dark:text-white",
              children: "Add New User"
            },
            void 0,
            !1,
            {
              fileName: "app/components/admin/AddUserModal.tsx",
              lineNumber: 75,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ jsxDEV47(Form15, { method: "post", action: "/admin", className: "mt-4 space-y-4", children: [
            /* @__PURE__ */ jsxDEV47("input", { type: "hidden", name: "intent", value: "create-user" }, void 0, !1, {
              fileName: "app/components/admin/AddUserModal.tsx",
              lineNumber: 85,
              columnNumber: 20
            }, this),
            formError && /* @__PURE__ */ jsxDEV47("div", { className: "p-3 bg-red-100 border border-red-400 text-red-700 rounded dark:bg-red-900 dark:border-red-700 dark:text-red-200 text-sm", children: formError }, void 0, !1, {
              fileName: "app/components/admin/AddUserModal.tsx",
              lineNumber: 88,
              columnNumber: 22
            }, this),
            /* @__PURE__ */ jsxDEV47("div", { children: [
              /* @__PURE__ */ jsxDEV47("label", { htmlFor: "fullName", className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Full Name" }, void 0, !1, {
                fileName: "app/components/admin/AddUserModal.tsx",
                lineNumber: 94,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV47(
                "input",
                {
                  type: "text",
                  name: "fullName",
                  id: "fullName",
                  required: !0,
                  value: fullName,
                  onChange: (e) => setFullName(e.target.value),
                  className: "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                },
                void 0,
                !1,
                {
                  fileName: "app/components/admin/AddUserModal.tsx",
                  lineNumber: 95,
                  columnNumber: 21
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "app/components/admin/AddUserModal.tsx",
              lineNumber: 93,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV47("div", { children: [
              /* @__PURE__ */ jsxDEV47("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Email Address" }, void 0, !1, {
                fileName: "app/components/admin/AddUserModal.tsx",
                lineNumber: 106,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV47(
                "input",
                {
                  type: "email",
                  name: "email",
                  id: "email",
                  required: !0,
                  value: email,
                  onChange: (e) => setEmail(e.target.value),
                  className: "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                },
                void 0,
                !1,
                {
                  fileName: "app/components/admin/AddUserModal.tsx",
                  lineNumber: 107,
                  columnNumber: 21
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "app/components/admin/AddUserModal.tsx",
              lineNumber: 105,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV47("div", { children: [
              /* @__PURE__ */ jsxDEV47("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Password" }, void 0, !1, {
                fileName: "app/components/admin/AddUserModal.tsx",
                lineNumber: 118,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV47(
                "input",
                {
                  type: "password",
                  name: "password",
                  id: "password",
                  required: !0,
                  value: password,
                  onChange: (e) => setPassword(e.target.value),
                  className: "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                },
                void 0,
                !1,
                {
                  fileName: "app/components/admin/AddUserModal.tsx",
                  lineNumber: 119,
                  columnNumber: 21
                },
                this
              ),
              /* @__PURE__ */ jsxDEV47("p", { className: "mt-1 text-xs text-yellow-600 dark:text-yellow-400", children: "Warning: Password will be stored insecurely in this example. Use hashing in production." }, void 0, !1, {
                fileName: "app/components/admin/AddUserModal.tsx",
                lineNumber: 128,
                columnNumber: 22
              }, this)
            ] }, void 0, !0, {
              fileName: "app/components/admin/AddUserModal.tsx",
              lineNumber: 117,
              columnNumber: 20
            }, this),
            /* @__PURE__ */ jsxDEV47("div", { children: [
              /* @__PURE__ */ jsxDEV47("label", { htmlFor: "role", className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Role" }, void 0, !1, {
                fileName: "app/components/admin/AddUserModal.tsx",
                lineNumber: 131,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV47(
                "select",
                {
                  name: "role",
                  id: "role",
                  required: !0,
                  value: role,
                  onChange: (e) => setRole(e.target.value),
                  className: "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white",
                  children: [
                    /* @__PURE__ */ jsxDEV47("option", { value: "User", children: "User" }, void 0, !1, {
                      fileName: "app/components/admin/AddUserModal.tsx",
                      lineNumber: 140,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV47("option", { value: "Admin", children: "Admin" }, void 0, !1, {
                      fileName: "app/components/admin/AddUserModal.tsx",
                      lineNumber: 141,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV47("option", { value: "Super Admin", children: "Super Admin" }, void 0, !1, {
                      fileName: "app/components/admin/AddUserModal.tsx",
                      lineNumber: 142,
                      columnNumber: 23
                    }, this)
                  ]
                },
                void 0,
                !0,
                {
                  fileName: "app/components/admin/AddUserModal.tsx",
                  lineNumber: 132,
                  columnNumber: 21
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "app/components/admin/AddUserModal.tsx",
              lineNumber: 130,
              columnNumber: 20
            }, this),
            /* @__PURE__ */ jsxDEV47("div", { children: [
              /* @__PURE__ */ jsxDEV47("label", { htmlFor: "groupId", className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Group (Optional)" }, void 0, !1, {
                fileName: "app/components/admin/AddUserModal.tsx",
                lineNumber: 146,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV47(
                "select",
                {
                  name: "groupId",
                  id: "groupId",
                  value: groupId,
                  onChange: (e) => setGroupId(e.target.value),
                  className: "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white",
                  children: [
                    /* @__PURE__ */ jsxDEV47("option", { value: "", children: "-- No Group --" }, void 0, !1, {
                      fileName: "app/components/admin/AddUserModal.tsx",
                      lineNumber: 154,
                      columnNumber: 23
                    }, this),
                    groups.map((group) => /* @__PURE__ */ jsxDEV47("option", { value: group.id, children: group.name }, group.id, !1, {
                      fileName: "app/components/admin/AddUserModal.tsx",
                      lineNumber: 156,
                      columnNumber: 25
                    }, this))
                  ]
                },
                void 0,
                !0,
                {
                  fileName: "app/components/admin/AddUserModal.tsx",
                  lineNumber: 147,
                  columnNumber: 21
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "app/components/admin/AddUserModal.tsx",
              lineNumber: 145,
              columnNumber: 20
            }, this),
            /* @__PURE__ */ jsxDEV47("div", { className: "mt-6 flex justify-end space-x-3", children: [
              /* @__PURE__ */ jsxDEV47(
                "button",
                {
                  type: "button",
                  className: "inline-flex justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500",
                  onClick: onClose,
                  disabled: isSubmitting,
                  children: "Cancel"
                },
                void 0,
                !1,
                {
                  fileName: "app/components/admin/AddUserModal.tsx",
                  lineNumber: 162,
                  columnNumber: 21
                },
                this
              ),
              /* @__PURE__ */ jsxDEV47(
                "button",
                {
                  type: "submit",
                  className: "inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50",
                  disabled: isSubmitting,
                  children: isSubmitting ? "Adding..." : "Add User"
                },
                void 0,
                !1,
                {
                  fileName: "app/components/admin/AddUserModal.tsx",
                  lineNumber: 170,
                  columnNumber: 21
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "app/components/admin/AddUserModal.tsx",
              lineNumber: 161,
              columnNumber: 19
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/admin/AddUserModal.tsx",
            lineNumber: 83,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/admin/AddUserModal.tsx",
          lineNumber: 74,
          columnNumber: 15
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/components/admin/AddUserModal.tsx",
        lineNumber: 65,
        columnNumber: 13
      },
      this
    ) }, void 0, !1, {
      fileName: "app/components/admin/AddUserModal.tsx",
      lineNumber: 64,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/components/admin/AddUserModal.tsx",
      lineNumber: 63,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/admin/AddUserModal.tsx",
    lineNumber: 49,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/components/admin/AddUserModal.tsx",
    lineNumber: 48,
    columnNumber: 5
  }, this);
}

// app/components/admin/BulkUploadModal.tsx
import { useState as useState26, useCallback as useCallback4 } from "react";
import * as XLSX from "xlsx";
import { jsxDEV as jsxDEV48 } from "react/jsx-dev-runtime";
function DownloadIcon2(props) {
  return /* @__PURE__ */ jsxDEV48("svg", { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ jsxDEV48("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }, void 0, !1, {
      fileName: "app/components/admin/BulkUploadModal.tsx",
      lineNumber: 15,
      columnNumber: 194
    }, this),
    /* @__PURE__ */ jsxDEV48("polyline", { points: "7 10 12 15 17 10" }, void 0, !1, {
      fileName: "app/components/admin/BulkUploadModal.tsx",
      lineNumber: 15,
      columnNumber: 247
    }, this),
    /* @__PURE__ */ jsxDEV48("line", { x1: "12", x2: "12", y1: "15", y2: "3" }, void 0, !1, {
      fileName: "app/components/admin/BulkUploadModal.tsx",
      lineNumber: 15,
      columnNumber: 284
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/admin/BulkUploadModal.tsx",
    lineNumber: 15,
    columnNumber: 5
  }, this);
}
function UploadIcon(props) {
  return /* @__PURE__ */ jsxDEV48("svg", { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ jsxDEV48("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }, void 0, !1, {
      fileName: "app/components/admin/BulkUploadModal.tsx",
      lineNumber: 20,
      columnNumber: 194
    }, this),
    /* @__PURE__ */ jsxDEV48("polyline", { points: "17 8 12 3 7 8" }, void 0, !1, {
      fileName: "app/components/admin/BulkUploadModal.tsx",
      lineNumber: 20,
      columnNumber: 247
    }, this),
    /* @__PURE__ */ jsxDEV48("line", { x1: "12", x2: "12", y1: "3", y2: "15" }, void 0, !1, {
      fileName: "app/components/admin/BulkUploadModal.tsx",
      lineNumber: 20,
      columnNumber: 281
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/admin/BulkUploadModal.tsx",
    lineNumber: 20,
    columnNumber: 5
  }, this);
}
function AlertCircleIcon(props) {
  return /* @__PURE__ */ jsxDEV48("svg", { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ jsxDEV48("circle", { cx: "12", cy: "12", r: "10" }, void 0, !1, {
      fileName: "app/components/admin/BulkUploadModal.tsx",
      lineNumber: 25,
      columnNumber: 194
    }, this),
    /* @__PURE__ */ jsxDEV48("line", { x1: "12", x2: "12", y1: "8", y2: "12" }, void 0, !1, {
      fileName: "app/components/admin/BulkUploadModal.tsx",
      lineNumber: 25,
      columnNumber: 226
    }, this),
    /* @__PURE__ */ jsxDEV48("line", { x1: "12", x2: "12.01", y1: "16", y2: "16" }, void 0, !1, {
      fileName: "app/components/admin/BulkUploadModal.tsx",
      lineNumber: 25,
      columnNumber: 264
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/admin/BulkUploadModal.tsx",
    lineNumber: 25,
    columnNumber: 5
  }, this);
}
function CheckCircleIcon2(props) {
  return /* @__PURE__ */ jsxDEV48("svg", { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ jsxDEV48("path", { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14" }, void 0, !1, {
      fileName: "app/components/admin/BulkUploadModal.tsx",
      lineNumber: 30,
      columnNumber: 194
    }, this),
    /* @__PURE__ */ jsxDEV48("path", { d: "m9 11 3 3L22 4" }, void 0, !1, {
      fileName: "app/components/admin/BulkUploadModal.tsx",
      lineNumber: 30,
      columnNumber: 240
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/admin/BulkUploadModal.tsx",
    lineNumber: 30,
    columnNumber: 5
  }, this);
}
var expectedColumns = ["FullName", "Email", "GroupName", "Role", "Status"], validRoles = ["Super Admin", "Admin", "User"], validStatuses = ["Active", "Suspended"];
function BulkUploadModal({ isOpen, onClose, onBulkUpload }) {
  let { groups } = useStore(), [file, setFile] = useState26(null), [isProcessing, setIsProcessing] = useState26(!1), [uploadResult, setUploadResult] = useState26(null), [fileName, setFileName] = useState26(""), [processingError, setProcessingError] = useState26(null), handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let selectedFile = event.target.files[0];
      selectedFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || selectedFile.name.endsWith(".xlsx") ? (setFile(selectedFile), setFileName(selectedFile.name), setUploadResult(null), setProcessingError(null)) : (alert("Please upload a valid .xlsx file."), event.target.value = "");
    }
  }, downloadTemplate = () => {
    let ws = XLSX.utils.aoa_to_sheet([expectedColumns]), wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Users Template"), XLSX.writeFile(wb, "LifeEconomy_User_Template.xlsx");
  }, processUpload = useCallback4(async () => {
    if (file) {
      setIsProcessing(!0), setUploadResult(null), setProcessingError(null);
      try {
        let reader = new FileReader();
        reader.onload = (e) => {
          try {
            let data = e.target?.result;
            if (!data)
              throw new Error("Failed to read file data.");
            let workbook = XLSX.read(data, { type: "array" }), sheetName = workbook.SheetNames[0], worksheet = workbook.Sheets[sheetName], jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            if (!jsonData || jsonData.length < 2)
              throw new Error("File is empty or contains only headers.");
            let headers = jsonData[0], missingHeaders = expectedColumns.filter((h) => !headers.includes(h));
            if (missingHeaders.length > 0)
              throw new Error(`Missing required columns: ${missingHeaders.join(", ")}`);
            let usersToUpload = [], errors = [], groupMap = new Map(groups.map((g) => [g.name.toLowerCase(), g.id]));
            for (let i = 1; i < jsonData.length; i++) {
              let row = jsonData[i], rowData = {};
              headers.forEach((header, index) => {
                rowData[header] = row[index];
              });
              let rowNum = i + 1, fullName = rowData.FullName?.trim(), email = rowData.Email?.trim(), groupName = rowData.GroupName?.trim(), role = rowData.Role?.trim(), status = rowData.Status?.trim(), rowHasError = !1;
              fullName || (errors.push({ row: rowNum, message: "FullName is required." }), rowHasError = !0), email ? /\S+@\S+\.\S+/.test(email) || (errors.push({ row: rowNum, message: "Email format is invalid." }), rowHasError = !0) : (errors.push({ row: rowNum, message: "Email is required." }), rowHasError = !0), groupName || (errors.push({ row: rowNum, message: "GroupName is required." }), rowHasError = !0);
              let groupId = groupMap.get(groupName?.toLowerCase());
              groupName && !groupId && (errors.push({ row: rowNum, message: `Group '${groupName}' not found.` }), rowHasError = !0), role ? validRoles.includes(role) || (errors.push({ row: rowNum, message: `Invalid Role '${role}'. Valid roles: ${validRoles.join(", ")}` }), rowHasError = !0) : (errors.push({ row: rowNum, message: "Role is required." }), rowHasError = !0), status ? validStatuses.includes(status) || (errors.push({ row: rowNum, message: `Invalid Status '${status}'. Valid statuses: ${validStatuses.join(", ")}` }), rowHasError = !0) : (errors.push({ row: rowNum, message: "Status is required." }), rowHasError = !0), !rowHasError && groupId && usersToUpload.push({ fullName, email, groupId, role, status });
            }
            if (errors.length > 0)
              setUploadResult({ successCount: 0, errors });
            else if (usersToUpload.length > 0) {
              let result = onBulkUpload(usersToUpload);
              setUploadResult(result);
            } else
              setProcessingError("No valid user data found in the file to upload.");
          } catch (err) {
            console.error("Error processing XLSX file:", err), setProcessingError(`Error processing file: ${err.message || "Unknown error"}`), setUploadResult(null);
          } finally {
            setIsProcessing(!1);
          }
        }, reader.onerror = (err) => {
          console.error("FileReader error:", err), setProcessingError("Error reading the file."), setIsProcessing(!1);
        }, reader.readAsArrayBuffer(file);
      } catch (error) {
        console.error("Upload error:", error), setProcessingError(`An unexpected error occurred: ${error.message}`), setIsProcessing(!1);
      }
    }
  }, [file, onBulkUpload]), handleClose = () => {
    setFile(null), setFileName(""), setIsProcessing(!1), setUploadResult(null), setProcessingError(null), onClose();
  };
  return isOpen ? /* @__PURE__ */ jsxDEV48("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm", children: /* @__PURE__ */ jsxDEV48("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-lg", children: [
    /* @__PURE__ */ jsxDEV48("h2", { className: "text-xl font-semibold mb-4 text-gray-900 dark:text-white", children: "Bulk Upload Users" }, void 0, !1, {
      fileName: "app/components/admin/BulkUploadModal.tsx",
      lineNumber: 186,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV48("div", { className: "mb-4", children: [
      /* @__PURE__ */ jsxDEV48(
        "button",
        {
          onClick: downloadTemplate,
          className: "inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm",
          children: [
            /* @__PURE__ */ jsxDEV48(DownloadIcon2, { className: "h-4 w-4" }, void 0, !1, {
              fileName: "app/components/admin/BulkUploadModal.tsx",
              lineNumber: 194,
              columnNumber: 13
            }, this),
            "Download .xlsx Template"
          ]
        },
        void 0,
        !0,
        {
          fileName: "app/components/admin/BulkUploadModal.tsx",
          lineNumber: 190,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV48("p", { className: "text-xs text-gray-500 dark:text-gray-400 mt-1", children: [
        "Download the template, fill in user details, and upload the file below. Required columns: ",
        expectedColumns.join(", "),
        "."
      ] }, void 0, !0, {
        fileName: "app/components/admin/BulkUploadModal.tsx",
        lineNumber: 197,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/admin/BulkUploadModal.tsx",
      lineNumber: 189,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV48("div", { className: "mb-4", children: [
      /* @__PURE__ */ jsxDEV48("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Upload .xlsx File" }, void 0, !1, {
        fileName: "app/components/admin/BulkUploadModal.tsx",
        lineNumber: 204,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV48("div", { className: "flex items-center border border-gray-300 dark:border-gray-600 rounded-md", children: [
        /* @__PURE__ */ jsxDEV48("label", { htmlFor: "file-upload", className: "flex-grow px-3 py-2 text-sm text-gray-500 dark:text-gray-400 cursor-pointer truncate", children: fileName || "Choose file..." }, void 0, !1, {
          fileName: "app/components/admin/BulkUploadModal.tsx",
          lineNumber: 206,
          columnNumber: 14
        }, this),
        /* @__PURE__ */ jsxDEV48(
          "input",
          {
            id: "file-upload",
            type: "file",
            accept: ".xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            onChange: handleFileChange,
            className: "hidden"
          },
          void 0,
          !1,
          {
            fileName: "app/components/admin/BulkUploadModal.tsx",
            lineNumber: 209,
            columnNumber: 14
          },
          this
        ),
        /* @__PURE__ */ jsxDEV48(
          "button",
          {
            onClick: () => document.getElementById("file-upload")?.click(),
            className: "px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 text-sm",
            disabled: isProcessing,
            children: "Browse"
          },
          void 0,
          !1,
          {
            fileName: "app/components/admin/BulkUploadModal.tsx",
            lineNumber: 216,
            columnNumber: 14
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/components/admin/BulkUploadModal.tsx",
        lineNumber: 205,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/admin/BulkUploadModal.tsx",
      lineNumber: 203,
      columnNumber: 9
    }, this),
    isProcessing && /* @__PURE__ */ jsxDEV48("div", { className: "text-center my-4 text-blue-600 dark:text-blue-400", children: "Processing... Please wait." }, void 0, !1, {
      fileName: "app/components/admin/BulkUploadModal.tsx",
      lineNumber: 229,
      columnNumber: 11
    }, this),
    processingError && /* @__PURE__ */ jsxDEV48("div", { className: "my-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm", children: /* @__PURE__ */ jsxDEV48("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxDEV48(AlertCircleIcon, { className: "h-5 w-5 flex-shrink-0" }, void 0, !1, {
        fileName: "app/components/admin/BulkUploadModal.tsx",
        lineNumber: 238,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ jsxDEV48("span", { children: processingError }, void 0, !1, {
        fileName: "app/components/admin/BulkUploadModal.tsx",
        lineNumber: 239,
        columnNumber: 15
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/admin/BulkUploadModal.tsx",
      lineNumber: 237,
      columnNumber: 13
    }, this) }, void 0, !1, {
      fileName: "app/components/admin/BulkUploadModal.tsx",
      lineNumber: 236,
      columnNumber: 11
    }, this),
    uploadResult && /* @__PURE__ */ jsxDEV48("div", { className: "mt-4 space-y-3", children: [
      /* @__PURE__ */ jsxDEV48("h3", { className: "text-md font-semibold text-gray-800 dark:text-gray-200", children: "Upload Summary" }, void 0, !1, {
        fileName: "app/components/admin/BulkUploadModal.tsx",
        lineNumber: 248,
        columnNumber: 13
      }, this),
      uploadResult.successCount > 0 && /* @__PURE__ */ jsxDEV48("div", { className: "p-3 bg-green-100 border border-green-400 text-green-700 rounded-md text-sm", children: /* @__PURE__ */ jsxDEV48("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxDEV48(CheckCircleIcon2, { className: "h-5 w-5 flex-shrink-0" }, void 0, !1, {
          fileName: "app/components/admin/BulkUploadModal.tsx",
          lineNumber: 252,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ jsxDEV48("span", { children: [
          "Successfully processed ",
          uploadResult.successCount,
          " users."
        ] }, void 0, !0, {
          fileName: "app/components/admin/BulkUploadModal.tsx",
          lineNumber: 253,
          columnNumber: 21
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/admin/BulkUploadModal.tsx",
        lineNumber: 251,
        columnNumber: 18
      }, this) }, void 0, !1, {
        fileName: "app/components/admin/BulkUploadModal.tsx",
        lineNumber: 250,
        columnNumber: 16
      }, this),
      uploadResult.errors.length > 0 && /* @__PURE__ */ jsxDEV48("div", { className: "p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm", children: [
        /* @__PURE__ */ jsxDEV48("div", { className: "flex items-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsxDEV48(AlertCircleIcon, { className: "h-5 w-5 flex-shrink-0" }, void 0, !1, {
            fileName: "app/components/admin/BulkUploadModal.tsx",
            lineNumber: 260,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV48("span", { className: "font-medium", children: [
            "Found ",
            uploadResult.errors.length,
            " errors:"
          ] }, void 0, !0, {
            fileName: "app/components/admin/BulkUploadModal.tsx",
            lineNumber: 261,
            columnNumber: 21
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/admin/BulkUploadModal.tsx",
          lineNumber: 259,
          columnNumber: 18
        }, this),
        /* @__PURE__ */ jsxDEV48("ul", { className: "list-disc list-inside max-h-40 overflow-y-auto text-xs space-y-1", children: uploadResult.errors.map((err, index) => /* @__PURE__ */ jsxDEV48("li", { children: [
          "Row ",
          err.row,
          ": ",
          err.message
        ] }, index, !0, {
          fileName: "app/components/admin/BulkUploadModal.tsx",
          lineNumber: 265,
          columnNumber: 23
        }, this)) }, void 0, !1, {
          fileName: "app/components/admin/BulkUploadModal.tsx",
          lineNumber: 263,
          columnNumber: 18
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/admin/BulkUploadModal.tsx",
        lineNumber: 258,
        columnNumber: 16
      }, this),
      uploadResult.successCount === 0 && uploadResult.errors.length === 0 && !processingError && /* @__PURE__ */ jsxDEV48("div", { className: "p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-md text-sm", children: /* @__PURE__ */ jsxDEV48("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxDEV48(AlertCircleIcon, { className: "h-5 w-5 flex-shrink-0" }, void 0, !1, {
          fileName: "app/components/admin/BulkUploadModal.tsx",
          lineNumber: 273,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ jsxDEV48("span", { children: "No users were processed. Check the file for valid data or errors." }, void 0, !1, {
          fileName: "app/components/admin/BulkUploadModal.tsx",
          lineNumber: 274,
          columnNumber: 25
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/admin/BulkUploadModal.tsx",
        lineNumber: 272,
        columnNumber: 21
      }, this) }, void 0, !1, {
        fileName: "app/components/admin/BulkUploadModal.tsx",
        lineNumber: 271,
        columnNumber: 18
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/admin/BulkUploadModal.tsx",
      lineNumber: 247,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV48("div", { className: "flex justify-end gap-3 mt-6", children: [
      /* @__PURE__ */ jsxDEV48(
        "button",
        {
          type: "button",
          onClick: handleClose,
          className: "px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500",
          disabled: isProcessing,
          children: uploadResult ? "Close" : "Cancel"
        },
        void 0,
        !1,
        {
          fileName: "app/components/admin/BulkUploadModal.tsx",
          lineNumber: 284,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV48(
        "button",
        {
          type: "button",
          onClick: processUpload,
          className: "inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed",
          disabled: !file || isProcessing || !!uploadResult,
          children: [
            /* @__PURE__ */ jsxDEV48(UploadIcon, { className: "h-4 w-4" }, void 0, !1, {
              fileName: "app/components/admin/BulkUploadModal.tsx",
              lineNumber: 298,
              columnNumber: 14
            }, this),
            isProcessing ? "Processing..." : "Upload & Validate"
          ]
        },
        void 0,
        !0,
        {
          fileName: "app/components/admin/BulkUploadModal.tsx",
          lineNumber: 292,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/components/admin/BulkUploadModal.tsx",
      lineNumber: 283,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/admin/BulkUploadModal.tsx",
    lineNumber: 185,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/components/admin/BulkUploadModal.tsx",
    lineNumber: 184,
    columnNumber: 5
  }, this) : null;
}

// app/components/admin/UserProfileView.tsx
import { useMemo as useMemo8 } from "react";
import { jsxDEV as jsxDEV49 } from "react/jsx-dev-runtime";
function UserProfileView({ user, isOpen, onClose }) {
  let { transactions } = useStore(), userTransactions = useMemo8(() => transactions.slice(-5), [transactions]);
  return !isOpen || !user ? null : /* @__PURE__ */ jsxDEV49("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm", children: /* @__PURE__ */ jsxDEV49("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsxDEV49("div", { className: "flex justify-between items-center mb-4", children: [
      /* @__PURE__ */ jsxDEV49("h2", { className: "text-2xl font-semibold text-gray-900 dark:text-white", children: [
        "User Profile: ",
        user.fullName
      ] }, void 0, !0, {
        fileName: "app/components/admin/UserProfileView.tsx",
        lineNumber: 29,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV49(
        "button",
        {
          onClick: onClose,
          className: "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200",
          children: "\xD7 "
        },
        void 0,
        !1,
        {
          fileName: "app/components/admin/UserProfileView.tsx",
          lineNumber: 30,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/components/admin/UserProfileView.tsx",
      lineNumber: 28,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV49("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxDEV49("section", { className: "p-4 border rounded dark:border-gray-700", children: [
        /* @__PURE__ */ jsxDEV49("h3", { className: "text-lg font-semibold mb-2", children: "Personal Info" }, void 0, !1, {
          fileName: "app/components/admin/UserProfileView.tsx",
          lineNumber: 42,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV49("p", { children: [
          /* @__PURE__ */ jsxDEV49("strong", { children: "Email:" }, void 0, !1, {
            fileName: "app/components/admin/UserProfileView.tsx",
            lineNumber: 43,
            columnNumber: 16
          }, this),
          " ",
          user.email
        ] }, void 0, !0, {
          fileName: "app/components/admin/UserProfileView.tsx",
          lineNumber: 43,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV49("p", { children: [
          /* @__PURE__ */ jsxDEV49("strong", { children: "Group:" }, void 0, !1, {
            fileName: "app/components/admin/UserProfileView.tsx",
            lineNumber: 44,
            columnNumber: 16
          }, this),
          " ",
          user.groupName
        ] }, void 0, !0, {
          fileName: "app/components/admin/UserProfileView.tsx",
          lineNumber: 44,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV49("p", { children: [
          /* @__PURE__ */ jsxDEV49("strong", { children: "Role:" }, void 0, !1, {
            fileName: "app/components/admin/UserProfileView.tsx",
            lineNumber: 45,
            columnNumber: 16
          }, this),
          " ",
          user.role
        ] }, void 0, !0, {
          fileName: "app/components/admin/UserProfileView.tsx",
          lineNumber: 45,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV49("p", { children: [
          /* @__PURE__ */ jsxDEV49("strong", { children: "Status:" }, void 0, !1, {
            fileName: "app/components/admin/UserProfileView.tsx",
            lineNumber: 46,
            columnNumber: 16
          }, this),
          " ",
          user.status
        ] }, void 0, !0, {
          fileName: "app/components/admin/UserProfileView.tsx",
          lineNumber: 46,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/admin/UserProfileView.tsx",
        lineNumber: 41,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV49("section", { className: "p-4 border rounded dark:border-gray-700", children: [
        /* @__PURE__ */ jsxDEV49("h3", { className: "text-lg font-semibold mb-2", children: "ESSENCE Balance" }, void 0, !1, {
          fileName: "app/components/admin/UserProfileView.tsx",
          lineNumber: 51,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV49("p", { className: "text-2xl font-bold", children: [
          user.balance ?? 0,
          " ",
          /* @__PURE__ */ jsxDEV49("span", { className: "text-sm font-normal", children: "ESSENCE" }, void 0, !1, {
            fileName: "app/components/admin/UserProfileView.tsx",
            lineNumber: 52,
            columnNumber: 67
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/admin/UserProfileView.tsx",
          lineNumber: 52,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/admin/UserProfileView.tsx",
        lineNumber: 50,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV49("section", { className: "p-4 border rounded dark:border-gray-700", children: [
        /* @__PURE__ */ jsxDEV49("h3", { className: "text-lg font-semibold mb-2", children: "Transaction History" }, void 0, !1, {
          fileName: "app/components/admin/UserProfileView.tsx",
          lineNumber: 57,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV49("p", { className: "text-gray-500 dark:text-gray-400", children: "(Placeholder: Table with Date, Type, Amount, Description, Search, Date Filter)" }, void 0, !1, {
          fileName: "app/components/admin/UserProfileView.tsx",
          lineNumber: 58,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/admin/UserProfileView.tsx",
        lineNumber: 56,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV49("section", { className: "p-4 border rounded dark:border-gray-700", children: [
        /* @__PURE__ */ jsxDEV49("h3", { className: "text-lg font-semibold mb-2", children: "Activity Log" }, void 0, !1, {
          fileName: "app/components/admin/UserProfileView.tsx",
          lineNumber: 63,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV49("p", { className: "text-gray-500 dark:text-gray-400", children: "(Placeholder: Table of user actions - login, updates, etc.)" }, void 0, !1, {
          fileName: "app/components/admin/UserProfileView.tsx",
          lineNumber: 64,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/admin/UserProfileView.tsx",
        lineNumber: 62,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV49("section", { className: "p-4 border rounded dark:border-gray-700", children: [
        /* @__PURE__ */ jsxDEV49("h3", { className: "text-lg font-semibold mb-2", children: "Rewards Summary" }, void 0, !1, {
          fileName: "app/components/admin/UserProfileView.tsx",
          lineNumber: 69,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV49("p", { className: "text-gray-500 dark:text-gray-400", children: "(Placeholder: Total rewards, list with reasons/dates)" }, void 0, !1, {
          fileName: "app/components/admin/UserProfileView.tsx",
          lineNumber: 70,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/admin/UserProfileView.tsx",
        lineNumber: 68,
        columnNumber: 12
      }, this),
      /* @__PURE__ */ jsxDEV49("section", { className: "p-4 border rounded dark:border-gray-700", children: [
        /* @__PURE__ */ jsxDEV49("h3", { className: "text-lg font-semibold mb-2", children: "Expenses List" }, void 0, !1, {
          fileName: "app/components/admin/UserProfileView.tsx",
          lineNumber: 75,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV49("p", { className: "text-gray-500 dark:text-gray-400", children: "(Placeholder: Assigned expenses, amounts, frequency)" }, void 0, !1, {
          fileName: "app/components/admin/UserProfileView.tsx",
          lineNumber: 76,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/admin/UserProfileView.tsx",
        lineNumber: 74,
        columnNumber: 12
      }, this),
      /* @__PURE__ */ jsxDEV49("section", { className: "p-4 border rounded dark:border-gray-700", children: [
        /* @__PURE__ */ jsxDEV49("h3", { className: "text-lg font-semibold mb-2", children: "Fines Record" }, void 0, !1, {
          fileName: "app/components/admin/UserProfileView.tsx",
          lineNumber: 81,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV49("p", { className: "text-gray-500 dark:text-gray-400", children: "(Placeholder: Fine history, issuer, amount, reasons)" }, void 0, !1, {
          fileName: "app/components/admin/UserProfileView.tsx",
          lineNumber: 82,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/admin/UserProfileView.tsx",
        lineNumber: 80,
        columnNumber: 12
      }, this),
      /* @__PURE__ */ jsxDEV49("section", { className: "p-4 border rounded dark:border-gray-700", children: [
        /* @__PURE__ */ jsxDEV49("h3", { className: "text-lg font-semibold mb-2", children: "Assigned Activities" }, void 0, !1, {
          fileName: "app/components/admin/UserProfileView.tsx",
          lineNumber: 87,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV49("p", { className: "text-gray-500 dark:text-gray-400", children: "(Placeholder: List of assigned activities, pay amount, frequency)" }, void 0, !1, {
          fileName: "app/components/admin/UserProfileView.tsx",
          lineNumber: 88,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/admin/UserProfileView.tsx",
        lineNumber: 86,
        columnNumber: 12
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/admin/UserProfileView.tsx",
      lineNumber: 39,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV49("div", { className: "mt-6 flex justify-end", children: /* @__PURE__ */ jsxDEV49(
      "button",
      {
        onClick: onClose,
        className: "px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500",
        children: "Close"
      },
      void 0,
      !1,
      {
        fileName: "app/components/admin/UserProfileView.tsx",
        lineNumber: 94,
        columnNumber: 11
      },
      this
    ) }, void 0, !1, {
      fileName: "app/components/admin/UserProfileView.tsx",
      lineNumber: 93,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/admin/UserProfileView.tsx",
    lineNumber: 27,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/components/admin/UserProfileView.tsx",
    lineNumber: 26,
    columnNumber: 5
  }, this);
}

// app/components/admin/EditUserModal.tsx
import React27, { useState as useState27, useEffect as useEffect20 } from "react";
import { Dialog as Dialog5, Transition as Transition4 } from "@headlessui/react";
import { Form as Form16 } from "@remix-run/react";
import { jsxDEV as jsxDEV50 } from "react/jsx-dev-runtime";
function EditUserModal({ isOpen, onClose, user, groups, actionData, navigation }) {
  let [email, setEmail] = useState27(""), [fullName, setFullName] = useState27(""), [role, setRole] = useState27("User"), [groupId, setGroupId] = useState27(""), [formError, setFormError] = useState27(null), isSubmitting = navigation.state === "submitting" && navigation.formData?.get("intent") === "update-user" && navigation.formData?.get("userId") === user?.id;
  return useEffect20(() => {
    user ? (setEmail(user.email ?? ""), setFullName(user.fullName ?? ""), setRole(user.role ?? "User"), setGroupId(user.groupId ?? ""), setFormError(null)) : (setEmail(""), setFullName(""), setRole("User"), setGroupId(""), setFormError(null));
  }, [user]), useEffect20(() => {
    actionData?.intent === "update-user" && actionData?.formData?.userId === user?.id && !actionData?.success && actionData?.error ? setFormError(actionData.error) : actionData?.intent === "update-user" && actionData?.formData?.userId === user?.id && actionData?.success && setFormError(null);
  }, [actionData, user]), useEffect20(() => {
    isOpen || (setEmail(""), setFullName(""), setRole("User"), setGroupId(""), setFormError(null));
  }, [isOpen]), user ? /* @__PURE__ */ jsxDEV50(Transition4, { appear: !0, show: isOpen, as: React27.Fragment, children: /* @__PURE__ */ jsxDEV50(Dialog5, { as: "div", className: "relative z-10", onClose, children: [
    /* @__PURE__ */ jsxDEV50(Transition4.Child, { as: React27.Fragment, enter: "ease-out duration-300", enterFrom: "opacity-0", enterTo: "opacity-100", leave: "ease-in duration-200", leaveFrom: "opacity-100", leaveTo: "opacity-0", children: /* @__PURE__ */ jsxDEV50("div", { className: "fixed inset-0 bg-black bg-opacity-25" }, void 0, !1, {
      fileName: "app/components/admin/EditUserModal.tsx",
      lineNumber: 72,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/components/admin/EditUserModal.tsx",
      lineNumber: 71,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV50("div", { className: "fixed inset-0 overflow-y-auto", children: /* @__PURE__ */ jsxDEV50("div", { className: "flex min-h-full items-center justify-center p-4 text-center", children: /* @__PURE__ */ jsxDEV50(Transition4.Child, { as: React27.Fragment, enter: "ease-out duration-300", enterFrom: "opacity-0 scale-95", enterTo: "opacity-100 scale-100", leave: "ease-in duration-200", leaveFrom: "opacity-100 scale-100", leaveTo: "opacity-0 scale-95", children: /* @__PURE__ */ jsxDEV50(Dialog5.Panel, { className: "w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all", children: [
      /* @__PURE__ */ jsxDEV50(Dialog5.Title, { as: "h3", className: "text-lg font-medium leading-6 text-gray-900 dark:text-white", children: [
        "Edit User: ",
        user.fullName
      ] }, void 0, !0, {
        fileName: "app/components/admin/EditUserModal.tsx",
        lineNumber: 79,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV50(Form16, { method: "post", action: "/admin", className: "mt-4 space-y-4", children: [
        /* @__PURE__ */ jsxDEV50("input", { type: "hidden", name: "intent", value: "update-user" }, void 0, !1, {
          fileName: "app/components/admin/EditUserModal.tsx",
          lineNumber: 84,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV50("input", { type: "hidden", name: "userId", value: user.id }, void 0, !1, {
          fileName: "app/components/admin/EditUserModal.tsx",
          lineNumber: 85,
          columnNumber: 19
        }, this),
        formError && /* @__PURE__ */ jsxDEV50("div", { className: "p-3 bg-red-100 border border-red-400 text-red-700 rounded dark:bg-red-900 dark:border-red-700 dark:text-red-200 text-sm", children: formError }, void 0, !1, {
          fileName: "app/components/admin/EditUserModal.tsx",
          lineNumber: 88,
          columnNumber: 22
        }, this),
        /* @__PURE__ */ jsxDEV50("div", { children: [
          /* @__PURE__ */ jsxDEV50("label", { htmlFor: `edit-fullName-${user.id}`, className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Full Name" }, void 0, !1, {
            fileName: "app/components/admin/EditUserModal.tsx",
            lineNumber: 94,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV50(
            "input",
            {
              type: "text",
              name: "fullName",
              id: `edit-fullName-${user.id}`,
              required: !0,
              value: fullName,
              onChange: (e) => setFullName(e.target.value),
              className: "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            },
            void 0,
            !1,
            {
              fileName: "app/components/admin/EditUserModal.tsx",
              lineNumber: 95,
              columnNumber: 21
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/components/admin/EditUserModal.tsx",
          lineNumber: 93,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV50("div", { children: [
          /* @__PURE__ */ jsxDEV50("label", { htmlFor: `edit-email-${user.id}`, className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Email Address" }, void 0, !1, {
            fileName: "app/components/admin/EditUserModal.tsx",
            lineNumber: 106,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV50(
            "input",
            {
              type: "email",
              name: "email",
              id: `edit-email-${user.id}`,
              required: !0,
              value: email,
              onChange: (e) => setEmail(e.target.value),
              className: "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            },
            void 0,
            !1,
            {
              fileName: "app/components/admin/EditUserModal.tsx",
              lineNumber: 107,
              columnNumber: 21
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/components/admin/EditUserModal.tsx",
          lineNumber: 105,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV50("div", { children: [
          /* @__PURE__ */ jsxDEV50("label", { htmlFor: `edit-role-${user.id}`, className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Role" }, void 0, !1, {
            fileName: "app/components/admin/EditUserModal.tsx",
            lineNumber: 118,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV50(
            "select",
            {
              name: "role",
              id: `edit-role-${user.id}`,
              required: !0,
              value: role,
              onChange: (e) => setRole(e.target.value),
              className: "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white",
              children: [
                /* @__PURE__ */ jsxDEV50("option", { value: "User", children: "User" }, void 0, !1, {
                  fileName: "app/components/admin/EditUserModal.tsx",
                  lineNumber: 127,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV50("option", { value: "Admin", children: "Admin" }, void 0, !1, {
                  fileName: "app/components/admin/EditUserModal.tsx",
                  lineNumber: 128,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV50("option", { value: "Super Admin", children: "Super Admin" }, void 0, !1, {
                  fileName: "app/components/admin/EditUserModal.tsx",
                  lineNumber: 129,
                  columnNumber: 23
                }, this)
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/components/admin/EditUserModal.tsx",
              lineNumber: 119,
              columnNumber: 21
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/components/admin/EditUserModal.tsx",
          lineNumber: 117,
          columnNumber: 20
        }, this),
        /* @__PURE__ */ jsxDEV50("div", { children: [
          /* @__PURE__ */ jsxDEV50("label", { htmlFor: `edit-groupId-${user.id}`, className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Group" }, void 0, !1, {
            fileName: "app/components/admin/EditUserModal.tsx",
            lineNumber: 133,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV50(
            "select",
            {
              name: "groupId",
              id: `edit-groupId-${user.id}`,
              value: groupId,
              onChange: (e) => setGroupId(e.target.value),
              className: "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white",
              children: [
                /* @__PURE__ */ jsxDEV50("option", { value: "", children: "-- No Group --" }, void 0, !1, {
                  fileName: "app/components/admin/EditUserModal.tsx",
                  lineNumber: 141,
                  columnNumber: 23
                }, this),
                groups.map((group) => /* @__PURE__ */ jsxDEV50("option", { value: group.id, children: group.name }, group.id, !1, {
                  fileName: "app/components/admin/EditUserModal.tsx",
                  lineNumber: 143,
                  columnNumber: 25
                }, this))
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/components/admin/EditUserModal.tsx",
              lineNumber: 134,
              columnNumber: 21
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/components/admin/EditUserModal.tsx",
          lineNumber: 132,
          columnNumber: 20
        }, this),
        /* @__PURE__ */ jsxDEV50("div", { className: "mt-6 flex justify-end space-x-3", children: [
          /* @__PURE__ */ jsxDEV50(
            "button",
            {
              type: "button",
              className: "inline-flex justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500",
              onClick: onClose,
              disabled: isSubmitting,
              children: "Cancel"
            },
            void 0,
            !1,
            {
              fileName: "app/components/admin/EditUserModal.tsx",
              lineNumber: 149,
              columnNumber: 21
            },
            this
          ),
          /* @__PURE__ */ jsxDEV50(
            "button",
            {
              type: "submit",
              className: "inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50",
              disabled: isSubmitting,
              children: isSubmitting ? "Saving..." : "Save Changes"
            },
            void 0,
            !1,
            {
              fileName: "app/components/admin/EditUserModal.tsx",
              lineNumber: 157,
              columnNumber: 21
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/components/admin/EditUserModal.tsx",
          lineNumber: 148,
          columnNumber: 19
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/admin/EditUserModal.tsx",
        lineNumber: 83,
        columnNumber: 17
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/admin/EditUserModal.tsx",
      lineNumber: 78,
      columnNumber: 15
    }, this) }, void 0, !1, {
      fileName: "app/components/admin/EditUserModal.tsx",
      lineNumber: 77,
      columnNumber: 13
    }, this) }, void 0, !1, {
      fileName: "app/components/admin/EditUserModal.tsx",
      lineNumber: 76,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/components/admin/EditUserModal.tsx",
      lineNumber: 75,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/admin/EditUserModal.tsx",
    lineNumber: 69,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/components/admin/EditUserModal.tsx",
    lineNumber: 68,
    columnNumber: 5
  }, this) : null;
}

// app/components/admin/ChangePasswordModal.tsx
import React28, { useState as useState28, useEffect as useEffect21 } from "react";
import { Dialog as Dialog6, Transition as Transition5 } from "@headlessui/react";
import { Form as Form17 } from "@remix-run/react";
import { jsxDEV as jsxDEV51 } from "react/jsx-dev-runtime";
function ChangePasswordModal2({ isOpen, onClose, user, actionData, navigation }) {
  let [newPassword, setNewPassword] = useState28(""), [confirmPassword, setConfirmPassword] = useState28(""), [formError, setFormError] = useState28(null), isSubmitting = navigation.state === "submitting" && navigation.formData?.get("intent") === "change-user-password" && navigation.formData?.get("userId") === user?.id;
  useEffect21(() => {
    (!isOpen || !user) && (setNewPassword(""), setConfirmPassword(""), setFormError(null));
  }, [isOpen, user]), useEffect21(() => {
    let isRelevantAction = actionData?.intent === "change-user-password" && actionData?.formData?.userId === user?.id;
    isRelevantAction && !actionData?.success && actionData?.error ? setFormError(actionData.error) : isRelevantAction && actionData?.success && setFormError(null);
  }, [actionData, user]);
  let handleSubmit = (event) => {
    setFormError(null), newPassword !== confirmPassword ? (event.preventDefault(), setFormError("Passwords do not match.")) : newPassword.length < 6 && (event.preventDefault(), setFormError("Password must be at least 6 characters long."));
  };
  return user ? /* @__PURE__ */ jsxDEV51(Transition5, { appear: !0, show: isOpen, as: React28.Fragment, children: /* @__PURE__ */ jsxDEV51(Dialog6, { as: "div", className: "relative z-20", onClose, children: [
    /* @__PURE__ */ jsxDEV51(Transition5.Child, { as: React28.Fragment, enter: "ease-out duration-300", enterFrom: "opacity-0", enterTo: "opacity-100", leave: "ease-in duration-200", leaveFrom: "opacity-100", leaveTo: "opacity-0", children: /* @__PURE__ */ jsxDEV51("div", { className: "fixed inset-0 bg-black bg-opacity-30" }, void 0, !1, {
      fileName: "app/components/admin/ChangePasswordModal.tsx",
      lineNumber: 64,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/components/admin/ChangePasswordModal.tsx",
      lineNumber: 63,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV51("div", { className: "fixed inset-0 overflow-y-auto", children: /* @__PURE__ */ jsxDEV51("div", { className: "flex min-h-full items-center justify-center p-4 text-center", children: /* @__PURE__ */ jsxDEV51(Transition5.Child, { as: React28.Fragment, enter: "ease-out duration-300", enterFrom: "opacity-0 scale-95", enterTo: "opacity-100 scale-100", leave: "ease-in duration-200", leaveFrom: "opacity-100 scale-100", leaveTo: "opacity-0 scale-95", children: /* @__PURE__ */ jsxDEV51(Dialog6.Panel, { className: "w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all", children: [
      /* @__PURE__ */ jsxDEV51(Dialog6.Title, { as: "h3", className: "text-lg font-medium leading-6 text-gray-900 dark:text-white", children: [
        "Change Password for ",
        user.fullName
      ] }, void 0, !0, {
        fileName: "app/components/admin/ChangePasswordModal.tsx",
        lineNumber: 71,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV51(Form17, { method: "post", action: "/admin", className: "mt-4 space-y-4", onSubmit: handleSubmit, children: [
        /* @__PURE__ */ jsxDEV51("input", { type: "hidden", name: "intent", value: "change-user-password" }, void 0, !1, {
          fileName: "app/components/admin/ChangePasswordModal.tsx",
          lineNumber: 76,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV51("input", { type: "hidden", name: "userId", value: user.id }, void 0, !1, {
          fileName: "app/components/admin/ChangePasswordModal.tsx",
          lineNumber: 77,
          columnNumber: 19
        }, this),
        formError && /* @__PURE__ */ jsxDEV51("div", { className: "p-3 bg-red-100 border border-red-400 text-red-700 rounded dark:bg-red-900 dark:border-red-700 dark:text-red-200 text-sm", children: formError }, void 0, !1, {
          fileName: "app/components/admin/ChangePasswordModal.tsx",
          lineNumber: 80,
          columnNumber: 22
        }, this),
        /* @__PURE__ */ jsxDEV51("div", { children: [
          /* @__PURE__ */ jsxDEV51("label", { htmlFor: `newPassword-${user.id}`, className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "New Password" }, void 0, !1, {
            fileName: "app/components/admin/ChangePasswordModal.tsx",
            lineNumber: 86,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV51(
            "input",
            {
              type: "password",
              name: "newPassword",
              id: `newPassword-${user.id}`,
              required: !0,
              value: newPassword,
              onChange: (e) => setNewPassword(e.target.value),
              className: "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            },
            void 0,
            !1,
            {
              fileName: "app/components/admin/ChangePasswordModal.tsx",
              lineNumber: 87,
              columnNumber: 21
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/components/admin/ChangePasswordModal.tsx",
          lineNumber: 85,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV51("div", { children: [
          /* @__PURE__ */ jsxDEV51("label", { htmlFor: `confirmPassword-${user.id}`, className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Confirm New Password" }, void 0, !1, {
            fileName: "app/components/admin/ChangePasswordModal.tsx",
            lineNumber: 98,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV51(
            "input",
            {
              type: "password",
              name: "confirmPassword",
              id: `confirmPassword-${user.id}`,
              required: !0,
              value: confirmPassword,
              onChange: (e) => setConfirmPassword(e.target.value),
              className: "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            },
            void 0,
            !1,
            {
              fileName: "app/components/admin/ChangePasswordModal.tsx",
              lineNumber: 99,
              columnNumber: 21
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/components/admin/ChangePasswordModal.tsx",
          lineNumber: 97,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV51("p", { className: "mt-1 text-xs text-yellow-600 dark:text-yellow-400", children: "Warning: Secure password change implementation (hashing/Supabase Auth) is needed on the server." }, void 0, !1, {
          fileName: "app/components/admin/ChangePasswordModal.tsx",
          lineNumber: 109,
          columnNumber: 20
        }, this),
        /* @__PURE__ */ jsxDEV51("div", { className: "mt-6 flex justify-end space-x-3", children: [
          /* @__PURE__ */ jsxDEV51(
            "button",
            {
              type: "button",
              className: "inline-flex justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500",
              onClick: onClose,
              disabled: isSubmitting,
              children: "Cancel"
            },
            void 0,
            !1,
            {
              fileName: "app/components/admin/ChangePasswordModal.tsx",
              lineNumber: 113,
              columnNumber: 21
            },
            this
          ),
          /* @__PURE__ */ jsxDEV51(
            "button",
            {
              type: "submit",
              className: "inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50",
              disabled: isSubmitting || newPassword !== confirmPassword || newPassword.length < 6,
              children: isSubmitting ? "Changing..." : "Change Password"
            },
            void 0,
            !1,
            {
              fileName: "app/components/admin/ChangePasswordModal.tsx",
              lineNumber: 121,
              columnNumber: 21
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/components/admin/ChangePasswordModal.tsx",
          lineNumber: 112,
          columnNumber: 19
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/admin/ChangePasswordModal.tsx",
        lineNumber: 75,
        columnNumber: 17
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/admin/ChangePasswordModal.tsx",
      lineNumber: 70,
      columnNumber: 15
    }, this) }, void 0, !1, {
      fileName: "app/components/admin/ChangePasswordModal.tsx",
      lineNumber: 69,
      columnNumber: 13
    }, this) }, void 0, !1, {
      fileName: "app/components/admin/ChangePasswordModal.tsx",
      lineNumber: 68,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/components/admin/ChangePasswordModal.tsx",
      lineNumber: 67,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/admin/ChangePasswordModal.tsx",
    lineNumber: 61,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/components/admin/ChangePasswordModal.tsx",
    lineNumber: 60,
    columnNumber: 5
  }, this) : null;
}

// app/components/admin/UsersTabContent.tsx
import { jsxDEV as jsxDEV52 } from "react/jsx-dev-runtime";
function PlusIcon(props) {
  return /* @__PURE__ */ jsxDEV52("svg", { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ jsxDEV52("line", { x1: "12", x2: "12", y1: "5", y2: "19" }, void 0, !1, {
      fileName: "app/components/admin/UsersTabContent.tsx",
      lineNumber: 14,
      columnNumber: 265
    }, this),
    /* @__PURE__ */ jsxDEV52("line", { x1: "5", x2: "19", y1: "12", y2: "12" }, void 0, !1, {
      fileName: "app/components/admin/UsersTabContent.tsx",
      lineNumber: 14,
      columnNumber: 303
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/admin/UsersTabContent.tsx",
    lineNumber: 14,
    columnNumber: 76
  }, this);
}
function UploadIcon2(props) {
  return /* @__PURE__ */ jsxDEV52("svg", { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ jsxDEV52("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }, void 0, !1, {
      fileName: "app/components/admin/UsersTabContent.tsx",
      lineNumber: 15,
      columnNumber: 267
    }, this),
    /* @__PURE__ */ jsxDEV52("polyline", { points: "17 8 12 3 7 8" }, void 0, !1, {
      fileName: "app/components/admin/UsersTabContent.tsx",
      lineNumber: 15,
      columnNumber: 320
    }, this),
    /* @__PURE__ */ jsxDEV52("line", { x1: "12", x2: "12", y1: "3", y2: "15" }, void 0, !1, {
      fileName: "app/components/admin/UsersTabContent.tsx",
      lineNumber: 15,
      columnNumber: 354
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/admin/UsersTabContent.tsx",
    lineNumber: 15,
    columnNumber: 78
  }, this);
}
function SearchIcon3(props) {
  return /* @__PURE__ */ jsxDEV52("svg", { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ jsxDEV52("circle", { cx: "11", cy: "11", r: "8" }, void 0, !1, {
      fileName: "app/components/admin/UsersTabContent.tsx",
      lineNumber: 16,
      columnNumber: 267
    }, this),
    /* @__PURE__ */ jsxDEV52("path", { d: "m21 21-4.3-4.3" }, void 0, !1, {
      fileName: "app/components/admin/UsersTabContent.tsx",
      lineNumber: 16,
      columnNumber: 298
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/admin/UsersTabContent.tsx",
    lineNumber: 16,
    columnNumber: 78
  }, this);
}
function UsersTabContent({ users, groups, navigation, actionData }) {
  let [searchTerm, setSearchTerm] = useState29(""), [filterGroup, setFilterGroup] = useState29(""), [filterRole, setFilterRole] = useState29(""), [filterStatus, setFilterStatus] = useState29(""), [isAddModalOpen, setIsAddModalOpen] = useState29(!1), [isBulkModalOpen, setIsBulkModalOpen] = useState29(!1), [isEditModalOpen, setIsEditModalOpen] = useState29(!1), [isDeleteModalOpen, setIsDeleteModalOpen] = useState29(!1), [isSuspendModalOpen, setIsSuspendModalOpen] = useState29(!1), [isRestoreModalOpen, setIsRestoreModalOpen] = useState29(!1), [isPasswordModalOpen, setIsPasswordModalOpen] = useState29(!1), [isProfileViewOpen, setIsProfileViewOpen] = useState29(!1), [selectedUser, setSelectedUser] = useState29(null);
  useEffect22(() => {
    if (actionData?.success) {
      let intent = actionData.intent;
      intent === "create-user" && setIsAddModalOpen(!1), intent === "update-user" && setIsEditModalOpen(!1), intent === "delete-user" && setIsDeleteModalOpen(!1), intent === "suspend-user" && setIsSuspendModalOpen(!1), intent === "restore-user" && setIsRestoreModalOpen(!1), intent === "change-user-password" && setIsPasswordModalOpen(!1), setSelectedUser(null);
    }
  }, [actionData]);
  let filteredUsers = useMemo9(() => (Array.isArray(users) ? users : []).filter((user) => {
    let searchMatch = searchTerm === "" || user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) || // Add null checks
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()), groupMatch = filterGroup === "" || user.groupId === filterGroup, roleMatch = filterRole === "" || user.role === filterRole, statusMatch = filterStatus === "" || filterStatus === "Active" && !user.isSuspended || filterStatus === "Suspended" && user.isSuspended;
    return searchMatch && groupMatch && roleMatch && statusMatch;
  }), [users, searchTerm, filterGroup, filterRole, filterStatus]), handleAddUserClick = useCallback5(() => setIsAddModalOpen(!0), []), handleBulkUploadClick = useCallback5(() => setIsBulkModalOpen(!0), []), handleEditUser = useCallback5((userToEdit) => {
    setSelectedUser(userToEdit), setIsEditModalOpen(!0);
  }, []), handleDeleteUser = useCallback5((userToDelete) => {
    setSelectedUser(userToDelete), setIsDeleteModalOpen(!0);
  }, []), handleSuspendUser = useCallback5((userToSuspend) => {
    setSelectedUser(userToSuspend), setIsSuspendModalOpen(!0);
  }, []), handleRestoreUser = useCallback5((userToRestore) => {
    setSelectedUser(userToRestore), setIsRestoreModalOpen(!0);
  }, []), handleChangePassword = useCallback5((userToChangePass) => {
    setSelectedUser(userToChangePass), setIsPasswordModalOpen(!0);
  }, []), handleViewProfile = useCallback5((userToView) => {
    setSelectedUser(userToView), setIsProfileViewOpen(!0);
  }, []), handleBulkUpload = useCallback5((newUsers) => {
    console.warn("Bulk upload needs refactoring for Remix actions.");
    let successCount = 0, errors = [];
    return newUsers.forEach((_, index) => {
    }), { successCount, errors };
  }, []);
  return /* @__PURE__ */ jsxDEV52("div", { className: "p-4 border rounded-b-md dark:border-gray-700 bg-white dark:bg-gray-900", children: [
    /* @__PURE__ */ jsxDEV52("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3", children: [
      /* @__PURE__ */ jsxDEV52("h2", { className: "text-xl font-semibold text-gray-900 dark:text-white", children: "User Management" }, void 0, !1, {
        fileName: "app/components/admin/UsersTabContent.tsx",
        lineNumber: 133,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV52("div", { className: "flex gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxDEV52(
          "button",
          {
            onClick: handleAddUserClick,
            className: "inline-flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm",
            children: [
              /* @__PURE__ */ jsxDEV52(PlusIcon, { className: "h-4 w-4" }, void 0, !1, {
                fileName: "app/components/admin/UsersTabContent.tsx",
                lineNumber: 139,
                columnNumber: 13
              }, this),
              "Add New User"
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/components/admin/UsersTabContent.tsx",
            lineNumber: 135,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV52(
          "button",
          {
            onClick: handleBulkUploadClick,
            className: "inline-flex items-center gap-1 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm",
            children: [
              /* @__PURE__ */ jsxDEV52(UploadIcon2, { className: "h-4 w-4" }, void 0, !1, {
                fileName: "app/components/admin/UsersTabContent.tsx",
                lineNumber: 146,
                columnNumber: 13
              }, this),
              "Bulk Upload Users"
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/components/admin/UsersTabContent.tsx",
            lineNumber: 142,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/components/admin/UsersTabContent.tsx",
        lineNumber: 134,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/admin/UsersTabContent.tsx",
      lineNumber: 132,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV52("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-md border dark:border-gray-700", children: [
      /* @__PURE__ */ jsxDEV52("div", { className: "relative", children: [
        /* @__PURE__ */ jsxDEV52("label", { htmlFor: "search-users", className: "sr-only", children: "Search by name or email" }, void 0, !1, {
          fileName: "app/components/admin/UsersTabContent.tsx",
          lineNumber: 156,
          columnNumber: 12
        }, this),
        /* @__PURE__ */ jsxDEV52("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: /* @__PURE__ */ jsxDEV52(SearchIcon3, { className: "h-5 w-5 text-gray-400" }, void 0, !1, {
          fileName: "app/components/admin/UsersTabContent.tsx",
          lineNumber: 158,
          columnNumber: 14
        }, this) }, void 0, !1, {
          fileName: "app/components/admin/UsersTabContent.tsx",
          lineNumber: 157,
          columnNumber: 12
        }, this),
        /* @__PURE__ */ jsxDEV52(
          "input",
          {
            type: "text",
            id: "search-users",
            placeholder: "Search by name or email...",
            value: searchTerm,
            onChange: (e) => setSearchTerm(e.target.value),
            className: "w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          },
          void 0,
          !1,
          {
            fileName: "app/components/admin/UsersTabContent.tsx",
            lineNumber: 160,
            columnNumber: 12
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/components/admin/UsersTabContent.tsx",
        lineNumber: 155,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV52("div", { children: [
        /* @__PURE__ */ jsxDEV52("label", { htmlFor: "filter-group", className: "sr-only", children: "Filter by Group" }, void 0, !1, {
          fileName: "app/components/admin/UsersTabContent.tsx",
          lineNumber: 171,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV52(
          "select",
          {
            id: "filter-group",
            value: filterGroup,
            onChange: (e) => setFilterGroup(e.target.value),
            className: "w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500",
            children: [
              /* @__PURE__ */ jsxDEV52("option", { value: "", children: "All Groups" }, void 0, !1, {
                fileName: "app/components/admin/UsersTabContent.tsx",
                lineNumber: 178,
                columnNumber: 13
              }, this),
              groups.map((group) => /* @__PURE__ */ jsxDEV52("option", { value: group.id, children: group.name }, group.id, !1, {
                fileName: "app/components/admin/UsersTabContent.tsx",
                lineNumber: 180,
                columnNumber: 15
              }, this))
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/components/admin/UsersTabContent.tsx",
            lineNumber: 172,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/components/admin/UsersTabContent.tsx",
        lineNumber: 170,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV52("div", { children: [
        /* @__PURE__ */ jsxDEV52("label", { htmlFor: "filter-role", className: "sr-only", children: "Filter by Role" }, void 0, !1, {
          fileName: "app/components/admin/UsersTabContent.tsx",
          lineNumber: 186,
          columnNumber: 12
        }, this),
        /* @__PURE__ */ jsxDEV52(
          "select",
          {
            id: "filter-role",
            value: filterRole,
            onChange: (e) => setFilterRole(e.target.value),
            className: "w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500",
            children: [
              /* @__PURE__ */ jsxDEV52("option", { value: "", children: "All Roles" }, void 0, !1, {
                fileName: "app/components/admin/UsersTabContent.tsx",
                lineNumber: 193,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV52("option", { value: "Super Admin", children: "Super Admin" }, void 0, !1, {
                fileName: "app/components/admin/UsersTabContent.tsx",
                lineNumber: 194,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV52("option", { value: "Admin", children: "Admin" }, void 0, !1, {
                fileName: "app/components/admin/UsersTabContent.tsx",
                lineNumber: 195,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV52("option", { value: "User", children: "User" }, void 0, !1, {
                fileName: "app/components/admin/UsersTabContent.tsx",
                lineNumber: 196,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/components/admin/UsersTabContent.tsx",
            lineNumber: 187,
            columnNumber: 12
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/components/admin/UsersTabContent.tsx",
        lineNumber: 185,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV52("div", { children: [
        /* @__PURE__ */ jsxDEV52("label", { htmlFor: "filter-status", className: "sr-only", children: "Filter by Status" }, void 0, !1, {
          fileName: "app/components/admin/UsersTabContent.tsx",
          lineNumber: 201,
          columnNumber: 12
        }, this),
        /* @__PURE__ */ jsxDEV52(
          "select",
          {
            id: "filter-status",
            value: filterStatus,
            onChange: (e) => setFilterStatus(e.target.value),
            className: "w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500",
            children: [
              /* @__PURE__ */ jsxDEV52("option", { value: "", children: "All Statuses" }, void 0, !1, {
                fileName: "app/components/admin/UsersTabContent.tsx",
                lineNumber: 208,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV52("option", { value: "Active", children: "Active" }, void 0, !1, {
                fileName: "app/components/admin/UsersTabContent.tsx",
                lineNumber: 209,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV52("option", { value: "Suspended", children: "Suspended" }, void 0, !1, {
                fileName: "app/components/admin/UsersTabContent.tsx",
                lineNumber: 210,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/components/admin/UsersTabContent.tsx",
            lineNumber: 202,
            columnNumber: 12
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/components/admin/UsersTabContent.tsx",
        lineNumber: 200,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/admin/UsersTabContent.tsx",
      lineNumber: 153,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV52(
      UsersTable,
      {
        users: filteredUsers,
        onViewProfile: handleViewProfile,
        onEdit: handleEditUser,
        onDelete: handleDeleteUser,
        onSuspend: handleSuspendUser,
        onRestore: handleRestoreUser,
        onChangePassword: handleChangePassword
      },
      void 0,
      !1,
      {
        fileName: "app/components/admin/UsersTabContent.tsx",
        lineNumber: 216,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV52(
      AddUserModal,
      {
        isOpen: isAddModalOpen,
        onClose: () => setIsAddModalOpen(!1),
        groups,
        actionData,
        navigation
      },
      void 0,
      !1,
      {
        fileName: "app/components/admin/UsersTabContent.tsx",
        lineNumber: 227,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV52(
      BulkUploadModal,
      {
        isOpen: isBulkModalOpen,
        onClose: () => setIsBulkModalOpen(!1),
        onBulkUpload: handleBulkUpload
      },
      void 0,
      !1,
      {
        fileName: "app/components/admin/UsersTabContent.tsx",
        lineNumber: 235,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV52(
      EditUserModal,
      {
        isOpen: isEditModalOpen,
        user: selectedUser,
        groups,
        onClose: () => {
          setIsEditModalOpen(!1), setSelectedUser(null);
        },
        actionData,
        navigation
      },
      void 0,
      !1,
      {
        fileName: "app/components/admin/UsersTabContent.tsx",
        lineNumber: 240,
        columnNumber: 8
      },
      this
    ),
    /* @__PURE__ */ jsxDEV52(
      ConfirmationModal,
      {
        isOpen: isDeleteModalOpen,
        onClose: () => {
          setIsDeleteModalOpen(!1), setSelectedUser(null);
        },
        title: "Confirm Deletion",
        message: /* @__PURE__ */ jsxDEV52("span", { children: [
          "Are you sure you want to delete user ",
          /* @__PURE__ */ jsxDEV52("strong", { children: selectedUser?.fullName }, void 0, !1, {
            fileName: "app/components/admin/UsersTabContent.tsx",
            lineNumber: 255,
            columnNumber: 54
          }, this),
          "? This action cannot be undone."
        ] }, void 0, !0, {
          fileName: "app/components/admin/UsersTabContent.tsx",
          lineNumber: 255,
          columnNumber: 11
        }, this),
        confirmText: "Delete",
        confirmButtonClass: "bg-red-600 hover:bg-red-700",
        actionData,
        navigation,
        intent: "delete-user",
        formData: { userId: selectedUser?.id ?? "" }
      },
      void 0,
      !1,
      {
        fileName: "app/components/admin/UsersTabContent.tsx",
        lineNumber: 249,
        columnNumber: 8
      },
      this
    ),
    /* @__PURE__ */ jsxDEV52(
      ConfirmationModal,
      {
        isOpen: isSuspendModalOpen,
        onClose: () => {
          setIsSuspendModalOpen(!1), setSelectedUser(null);
        },
        title: "Confirm Suspension",
        message: /* @__PURE__ */ jsxDEV52("span", { children: [
          "Are you sure you want to suspend user ",
          /* @__PURE__ */ jsxDEV52("strong", { children: selectedUser?.fullName }, void 0, !1, {
            fileName: "app/components/admin/UsersTabContent.tsx",
            lineNumber: 270,
            columnNumber: 55
          }, this),
          "? They will lose access until restored."
        ] }, void 0, !0, {
          fileName: "app/components/admin/UsersTabContent.tsx",
          lineNumber: 270,
          columnNumber: 11
        }, this),
        confirmText: "Suspend",
        confirmButtonClass: "bg-yellow-600 hover:bg-yellow-700",
        actionData,
        navigation,
        intent: "suspend-user",
        formData: { userId: selectedUser?.id ?? "" }
      },
      void 0,
      !1,
      {
        fileName: "app/components/admin/UsersTabContent.tsx",
        lineNumber: 264,
        columnNumber: 8
      },
      this
    ),
    /* @__PURE__ */ jsxDEV52(
      ConfirmationModal,
      {
        isOpen: isRestoreModalOpen,
        onClose: () => {
          setIsRestoreModalOpen(!1), setSelectedUser(null);
        },
        title: "Confirm Restoration",
        message: /* @__PURE__ */ jsxDEV52("span", { children: [
          "Are you sure you want to restore access for user ",
          /* @__PURE__ */ jsxDEV52("strong", { children: selectedUser?.fullName }, void 0, !1, {
            fileName: "app/components/admin/UsersTabContent.tsx",
            lineNumber: 285,
            columnNumber: 66
          }, this),
          "?"
        ] }, void 0, !0, {
          fileName: "app/components/admin/UsersTabContent.tsx",
          lineNumber: 285,
          columnNumber: 11
        }, this),
        confirmText: "Restore",
        confirmButtonClass: "bg-green-600 hover:bg-green-700",
        actionData,
        navigation,
        intent: "restore-user",
        formData: { userId: selectedUser?.id ?? "" }
      },
      void 0,
      !1,
      {
        fileName: "app/components/admin/UsersTabContent.tsx",
        lineNumber: 279,
        columnNumber: 8
      },
      this
    ),
    /* @__PURE__ */ jsxDEV52(
      ChangePasswordModal2,
      {
        isOpen: isPasswordModalOpen,
        user: selectedUser,
        onClose: () => {
          setIsPasswordModalOpen(!1), setSelectedUser(null);
        },
        actionData,
        navigation
      },
      void 0,
      !1,
      {
        fileName: "app/components/admin/UsersTabContent.tsx",
        lineNumber: 294,
        columnNumber: 8
      },
      this
    ),
    /* @__PURE__ */ jsxDEV52(
      UserProfileView,
      {
        isOpen: isProfileViewOpen,
        user: selectedUser,
        onClose: () => {
          setIsProfileViewOpen(!1), setSelectedUser(null);
        }
      },
      void 0,
      !1,
      {
        fileName: "app/components/admin/UsersTabContent.tsx",
        lineNumber: 302,
        columnNumber: 8
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/components/admin/UsersTabContent.tsx",
    lineNumber: 130,
    columnNumber: 5
  }, this);
}

// app/components/admin/GroupsManagement.tsx
import React30, { useState as useState30, useMemo as useMemo10, Fragment as Fragment6 } from "react";
import { Form as Form18, useActionData as useActionData12, useNavigation as useNavigation10 } from "@remix-run/react";
import { Dialog as Dialog7, Transition as Transition6 } from "@headlessui/react";
import { jsxDEV as jsxDEV53 } from "react/jsx-dev-runtime";
function PlusIcon2(props) {
  return /* @__PURE__ */ jsxDEV53("svg", { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ jsxDEV53("line", { x1: "12", x2: "12", y1: "5", y2: "19" }, void 0, !1, {
      fileName: "app/components/admin/GroupsManagement.tsx",
      lineNumber: 8,
      columnNumber: 278
    }, this),
    /* @__PURE__ */ jsxDEV53("line", { x1: "5", x2: "19", y1: "12", y2: "12" }, void 0, !1, {
      fileName: "app/components/admin/GroupsManagement.tsx",
      lineNumber: 8,
      columnNumber: 316
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/admin/GroupsManagement.tsx",
    lineNumber: 8,
    columnNumber: 89
  }, this);
}
function EditIcon3(props) {
  return /* @__PURE__ */ jsxDEV53("svg", { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ jsxDEV53("path", { d: "M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" }, void 0, !1, {
      fileName: "app/components/admin/GroupsManagement.tsx",
      lineNumber: 9,
      columnNumber: 278
    }, this),
    /* @__PURE__ */ jsxDEV53("path", { d: "m15 5 4 4" }, void 0, !1, {
      fileName: "app/components/admin/GroupsManagement.tsx",
      lineNumber: 9,
      columnNumber: 338
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/admin/GroupsManagement.tsx",
    lineNumber: 9,
    columnNumber: 89
  }, this);
}
function DeleteIcon3(props) {
  return /* @__PURE__ */ jsxDEV53("svg", { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ jsxDEV53("path", { d: "M3 6h18" }, void 0, !1, {
      fileName: "app/components/admin/GroupsManagement.tsx",
      lineNumber: 10,
      columnNumber: 280
    }, this),
    /* @__PURE__ */ jsxDEV53("path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" }, void 0, !1, {
      fileName: "app/components/admin/GroupsManagement.tsx",
      lineNumber: 10,
      columnNumber: 299
    }, this),
    /* @__PURE__ */ jsxDEV53("path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" }, void 0, !1, {
      fileName: "app/components/admin/GroupsManagement.tsx",
      lineNumber: 10,
      columnNumber: 348
    }, this),
    /* @__PURE__ */ jsxDEV53("line", { x1: "10", x2: "10", y1: "11", y2: "17" }, void 0, !1, {
      fileName: "app/components/admin/GroupsManagement.tsx",
      lineNumber: 10,
      columnNumber: 394
    }, this),
    /* @__PURE__ */ jsxDEV53("line", { x1: "14", x2: "14", y1: "11", y2: "17" }, void 0, !1, {
      fileName: "app/components/admin/GroupsManagement.tsx",
      lineNumber: 10,
      columnNumber: 433
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/admin/GroupsManagement.tsx",
    lineNumber: 10,
    columnNumber: 91
  }, this);
}
function ViewIcon2(props) {
  return /* @__PURE__ */ jsxDEV53("svg", { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ jsxDEV53("path", { d: "M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" }, void 0, !1, {
      fileName: "app/components/admin/GroupsManagement.tsx",
      lineNumber: 11,
      columnNumber: 278
    }, this),
    /* @__PURE__ */ jsxDEV53("circle", { cx: "12", cy: "12", r: "3" }, void 0, !1, {
      fileName: "app/components/admin/GroupsManagement.tsx",
      lineNumber: 11,
      columnNumber: 334
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/admin/GroupsManagement.tsx",
    lineNumber: 11,
    columnNumber: 89
  }, this);
}
function SearchIcon4(props) {
  return /* @__PURE__ */ jsxDEV53("svg", { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ jsxDEV53("circle", { cx: "11", cy: "11", r: "8" }, void 0, !1, {
      fileName: "app/components/admin/GroupsManagement.tsx",
      lineNumber: 12,
      columnNumber: 280
    }, this),
    /* @__PURE__ */ jsxDEV53("path", { d: "m21 21-4.3-4.3" }, void 0, !1, {
      fileName: "app/components/admin/GroupsManagement.tsx",
      lineNumber: 12,
      columnNumber: 311
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/admin/GroupsManagement.tsx",
    lineNumber: 12,
    columnNumber: 91
  }, this);
}
function SpinnerIcon(props) {
  return /* @__PURE__ */ jsxDEV53("svg", { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "animate-spin", children: /* @__PURE__ */ jsxDEV53("path", { d: "M21 12a9 9 0 1 1-6.219-8.56" }, void 0, !1, {
    fileName: "app/components/admin/GroupsManagement.tsx",
    lineNumber: 13,
    columnNumber: 283
  }, this) }, void 0, !1, {
    fileName: "app/components/admin/GroupsManagement.tsx",
    lineNumber: 13,
    columnNumber: 69
  }, this);
}
function AddEditGroupModal({ isOpen, onClose, group, isSubmitting }) {
  let actionData = useActionData12(), formRef = React30.useRef(null), [name, setName] = useState30(""), [description, setDescription] = useState30(""), [type, setType] = useState30(""), [formError, setFormError] = useState30(null);
  React30.useEffect(() => {
    isOpen && (setName(group?.name || ""), setDescription(group?.description || ""), setType(group?.type || ""), setFormError(null));
  }, [isOpen, group]), React30.useEffect(() => {
    !isSubmitting && actionData?.success && actionData.intent?.includes("group") && onClose();
  }, [actionData, isSubmitting, onClose]);
  let handleLocalValidation = () => name.trim() ? (setFormError(null), !0) : (setFormError("Group Name is required."), !1), handleSubmit = (event) => {
    handleLocalValidation() || event.preventDefault();
  };
  if (!isOpen)
    return null;
  let intent = group ? "update-group" : "create-group";
  return /* @__PURE__ */ jsxDEV53(Transition6, { appear: !0, show: isOpen, as: Fragment6, children: /* @__PURE__ */ jsxDEV53(Dialog7, { as: "div", className: "relative z-50", onClose, children: [
    /* @__PURE__ */ jsxDEV53(Transition6.Child, { as: Fragment6, enter: "ease-out duration-300", enterFrom: "opacity-0", enterTo: "opacity-100", leave: "ease-in duration-200", leaveFrom: "opacity-100", leaveTo: "opacity-0", children: /* @__PURE__ */ jsxDEV53("div", { className: "fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" }, void 0, !1, {
      fileName: "app/components/admin/GroupsManagement.tsx",
      lineNumber: 70,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/components/admin/GroupsManagement.tsx",
      lineNumber: 69,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV53("div", { className: "fixed inset-0 overflow-y-auto", children: /* @__PURE__ */ jsxDEV53("div", { className: "flex min-h-full items-center justify-center p-4 text-center", children: /* @__PURE__ */ jsxDEV53(Transition6.Child, { as: Fragment6, enter: "ease-out duration-300", enterFrom: "opacity-0 scale-95", enterTo: "opacity-100 scale-100", leave: "ease-in duration-200", leaveFrom: "opacity-100 scale-100", leaveTo: "opacity-0 scale-95", children: /* @__PURE__ */ jsxDEV53(Dialog7.Panel, { className: "w-full max-w-md transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all", children: [
      /* @__PURE__ */ jsxDEV53(Dialog7.Title, { as: "h3", className: "text-xl font-semibold mb-4 text-gray-900 dark:text-white", children: group ? "Edit Group" : "Add New Group" }, void 0, !1, {
        fileName: "app/components/admin/GroupsManagement.tsx",
        lineNumber: 78,
        columnNumber: 17
      }, this),
      actionData?.error && actionData.intent === intent && /* @__PURE__ */ jsxDEV53("p", { className: "text-red-500 text-sm mb-3", children: actionData.error }, void 0, !1, {
        fileName: "app/components/admin/GroupsManagement.tsx",
        lineNumber: 84,
        columnNumber: 19
      }, this),
      formError && /* @__PURE__ */ jsxDEV53("p", { className: "text-red-500 text-sm mb-3", children: formError }, void 0, !1, {
        fileName: "app/components/admin/GroupsManagement.tsx",
        lineNumber: 88,
        columnNumber: 19
      }, this),
      /* @__PURE__ */ jsxDEV53(Form18, { method: "post", action: "/admin", ref: formRef, onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxDEV53("input", { type: "hidden", name: "intent", value: intent }, void 0, !1, {
          fileName: "app/components/admin/GroupsManagement.tsx",
          lineNumber: 94,
          columnNumber: 19
        }, this),
        group && /* @__PURE__ */ jsxDEV53("input", { type: "hidden", name: "groupId", value: group.id }, void 0, !1, {
          fileName: "app/components/admin/GroupsManagement.tsx",
          lineNumber: 95,
          columnNumber: 29
        }, this),
        /* @__PURE__ */ jsxDEV53("div", { children: [
          /* @__PURE__ */ jsxDEV53("label", { htmlFor: "groupName", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: [
            "Group Name ",
            /* @__PURE__ */ jsxDEV53("span", { className: "text-red-500", children: "*" }, void 0, !1, {
              fileName: "app/components/admin/GroupsManagement.tsx",
              lineNumber: 98,
              columnNumber: 135
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/admin/GroupsManagement.tsx",
            lineNumber: 98,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV53(
            "input",
            {
              type: "text",
              id: "groupName",
              name: "name",
              value: name,
              onChange: (e) => setName(e.target.value),
              required: !0,
              className: "w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500"
            },
            void 0,
            !1,
            {
              fileName: "app/components/admin/GroupsManagement.tsx",
              lineNumber: 99,
              columnNumber: 21
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/components/admin/GroupsManagement.tsx",
          lineNumber: 97,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV53("div", { children: [
          /* @__PURE__ */ jsxDEV53("label", { htmlFor: "groupDesc", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Description" }, void 0, !1, {
            fileName: "app/components/admin/GroupsManagement.tsx",
            lineNumber: 110,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV53(
            "textarea",
            {
              id: "groupDesc",
              name: "description",
              value: description,
              onChange: (e) => setDescription(e.target.value),
              rows: 3,
              className: "w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500"
            },
            void 0,
            !1,
            {
              fileName: "app/components/admin/GroupsManagement.tsx",
              lineNumber: 111,
              columnNumber: 21
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/components/admin/GroupsManagement.tsx",
          lineNumber: 109,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV53("div", { children: [
          /* @__PURE__ */ jsxDEV53("label", { htmlFor: "groupType", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Group Type" }, void 0, !1, {
            fileName: "app/components/admin/GroupsManagement.tsx",
            lineNumber: 121,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV53(
            "input",
            {
              type: "text",
              id: "groupType",
              name: "type",
              value: type,
              onChange: (e) => setType(e.target.value),
              placeholder: "e.g., Squad, Team",
              className: "w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500"
            },
            void 0,
            !1,
            {
              fileName: "app/components/admin/GroupsManagement.tsx",
              lineNumber: 122,
              columnNumber: 21
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/components/admin/GroupsManagement.tsx",
          lineNumber: 120,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV53("div", { className: "flex justify-end gap-3 mt-6", children: [
          /* @__PURE__ */ jsxDEV53(
            "button",
            {
              type: "button",
              onClick: onClose,
              disabled: isSubmitting,
              className: "px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 disabled:opacity-50",
              children: "Cancel"
            },
            void 0,
            !1,
            {
              fileName: "app/components/admin/GroupsManagement.tsx",
              lineNumber: 135,
              columnNumber: 21
            },
            this
          ),
          /* @__PURE__ */ jsxDEV53(
            "button",
            {
              type: "submit",
              disabled: isSubmitting,
              className: "inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50",
              children: [
                isSubmitting && /* @__PURE__ */ jsxDEV53(SpinnerIcon, { className: "h-4 w-4" }, void 0, !1, {
                  fileName: "app/components/admin/GroupsManagement.tsx",
                  lineNumber: 148,
                  columnNumber: 40
                }, this),
                isSubmitting ? group ? "Updating..." : "Adding..." : group ? "Update Group" : "Add Group"
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/components/admin/GroupsManagement.tsx",
              lineNumber: 143,
              columnNumber: 21
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/components/admin/GroupsManagement.tsx",
          lineNumber: 134,
          columnNumber: 19
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/admin/GroupsManagement.tsx",
        lineNumber: 92,
        columnNumber: 17
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/admin/GroupsManagement.tsx",
      lineNumber: 77,
      columnNumber: 15
    }, this) }, void 0, !1, {
      fileName: "app/components/admin/GroupsManagement.tsx",
      lineNumber: 76,
      columnNumber: 13
    }, this) }, void 0, !1, {
      fileName: "app/components/admin/GroupsManagement.tsx",
      lineNumber: 75,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/components/admin/GroupsManagement.tsx",
      lineNumber: 74,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/admin/GroupsManagement.tsx",
    lineNumber: 67,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/components/admin/GroupsManagement.tsx",
    lineNumber: 66,
    columnNumber: 5
  }, this);
}
function DeleteConfirmationModal2({ isOpen, onClose, group, isSubmitting }) {
  let actionData = useActionData12();
  return React30.useEffect(() => {
    !isSubmitting && actionData?.success && actionData.intent === "delete-group" && onClose();
  }, [actionData, isSubmitting, onClose]), !isOpen || !group ? null : /* @__PURE__ */ jsxDEV53(Transition6, { appear: !0, show: isOpen, as: Fragment6, children: /* @__PURE__ */ jsxDEV53(Dialog7, { as: "div", className: "relative z-50", onClose, children: [
    /* @__PURE__ */ jsxDEV53(Transition6.Child, { as: Fragment6, enter: "ease-out duration-300", enterFrom: "opacity-0", enterTo: "opacity-100", leave: "ease-in duration-200", leaveFrom: "opacity-100", leaveTo: "opacity-0", children: /* @__PURE__ */ jsxDEV53("div", { className: "fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" }, void 0, !1, {
      fileName: "app/components/admin/GroupsManagement.tsx",
      lineNumber: 181,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/components/admin/GroupsManagement.tsx",
      lineNumber: 180,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV53("div", { className: "fixed inset-0 overflow-y-auto", children: /* @__PURE__ */ jsxDEV53("div", { className: "flex min-h-full items-center justify-center p-4 text-center", children: /* @__PURE__ */ jsxDEV53(Transition6.Child, { as: Fragment6, enter: "ease-out duration-300", enterFrom: "opacity-0 scale-95", enterTo: "opacity-100 scale-100", leave: "ease-in duration-200", leaveFrom: "opacity-100 scale-100", leaveTo: "opacity-0 scale-95", children: /* @__PURE__ */ jsxDEV53(Dialog7.Panel, { className: "w-full max-w-md transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all", children: [
      /* @__PURE__ */ jsxDEV53(Dialog7.Title, { as: "h3", className: "text-xl font-semibold mb-2 text-gray-900 dark:text-white", children: "Confirm Group Deletion" }, void 0, !1, {
        fileName: "app/components/admin/GroupsManagement.tsx",
        lineNumber: 189,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV53("div", { className: "mt-2", children: [
        /* @__PURE__ */ jsxDEV53("p", { className: "text-sm text-gray-600 dark:text-gray-300", children: [
          "Are you sure you want to delete the group ",
          /* @__PURE__ */ jsxDEV53("strong", { children: group.name }, void 0, !1, {
            fileName: "app/components/admin/GroupsManagement.tsx",
            lineNumber: 194,
            columnNumber: 63
          }, this),
          "?",
          group.userCount && group.userCount > 0 ? /* @__PURE__ */ jsxDEV53("span", { className: "font-semibold text-red-600 dark:text-red-400", children: [
            " This group currently has ",
            group.userCount,
            " member(s). Deletion is blocked."
          ] }, void 0, !0, {
            fileName: "app/components/admin/GroupsManagement.tsx",
            lineNumber: 196,
            columnNumber: 25
          }, this) : " This action cannot be undone."
        ] }, void 0, !0, {
          fileName: "app/components/admin/GroupsManagement.tsx",
          lineNumber: 193,
          columnNumber: 19
        }, this),
        actionData?.error && actionData.intent === "delete-group" && /* @__PURE__ */ jsxDEV53("p", { className: "text-red-500 text-sm mt-3", children: actionData.error }, void 0, !1, {
          fileName: "app/components/admin/GroupsManagement.tsx",
          lineNumber: 201,
          columnNumber: 21
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/admin/GroupsManagement.tsx",
        lineNumber: 192,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV53(Form18, { method: "post", action: "/admin", className: "mt-6 flex justify-end gap-3", children: [
        /* @__PURE__ */ jsxDEV53("input", { type: "hidden", name: "intent", value: "delete-group" }, void 0, !1, {
          fileName: "app/components/admin/GroupsManagement.tsx",
          lineNumber: 207,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV53("input", { type: "hidden", name: "groupId", value: group.id }, void 0, !1, {
          fileName: "app/components/admin/GroupsManagement.tsx",
          lineNumber: 208,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV53(
          "button",
          {
            type: "button",
            onClick: onClose,
            disabled: isSubmitting,
            className: "px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 disabled:opacity-50",
            children: "Cancel"
          },
          void 0,
          !1,
          {
            fileName: "app/components/admin/GroupsManagement.tsx",
            lineNumber: 210,
            columnNumber: 19
          },
          this
        ),
        /* @__PURE__ */ jsxDEV53(
          "button",
          {
            type: "submit",
            disabled: isSubmitting || group.userCount !== void 0 && group.userCount > 0,
            className: "inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed",
            children: [
              isSubmitting && /* @__PURE__ */ jsxDEV53(SpinnerIcon, { className: "h-4 w-4" }, void 0, !1, {
                fileName: "app/components/admin/GroupsManagement.tsx",
                lineNumber: 224,
                columnNumber: 38
              }, this),
              isSubmitting ? "Deleting..." : "Delete"
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/components/admin/GroupsManagement.tsx",
            lineNumber: 218,
            columnNumber: 19
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/components/admin/GroupsManagement.tsx",
        lineNumber: 206,
        columnNumber: 17
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/admin/GroupsManagement.tsx",
      lineNumber: 188,
      columnNumber: 15
    }, this) }, void 0, !1, {
      fileName: "app/components/admin/GroupsManagement.tsx",
      lineNumber: 187,
      columnNumber: 13
    }, this) }, void 0, !1, {
      fileName: "app/components/admin/GroupsManagement.tsx",
      lineNumber: 186,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/components/admin/GroupsManagement.tsx",
      lineNumber: 185,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/admin/GroupsManagement.tsx",
    lineNumber: 178,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/components/admin/GroupsManagement.tsx",
    lineNumber: 177,
    columnNumber: 5
  }, this);
}
function ViewMembersModal({ isOpen, onClose, group, users }) {
  if (!isOpen || !group)
    return null;
  let members = users.filter((u) => u.groupId === group.id);
  return /* @__PURE__ */ jsxDEV53("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm", children: /* @__PURE__ */ jsxDEV53("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-lg max-h-[80vh] flex flex-col", children: [
    /* @__PURE__ */ jsxDEV53("h2", { className: "text-xl font-semibold mb-4 text-gray-900 dark:text-white", children: [
      "Members of ",
      group.name,
      " (",
      members.length,
      ")"
    ] }, void 0, !0, {
      fileName: "app/components/admin/GroupsManagement.tsx",
      lineNumber: 245,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV53("div", { className: "flex-grow overflow-y-auto mb-4 border dark:border-gray-700 rounded", children: members.length === 0 ? /* @__PURE__ */ jsxDEV53("p", { className: "p-4 text-gray-500 dark:text-gray-400", children: "No users found in this group." }, void 0, !1, {
      fileName: "app/components/admin/GroupsManagement.tsx",
      lineNumber: 248,
      columnNumber: 13
    }, this) : /* @__PURE__ */ jsxDEV53("ul", { className: "divide-y dark:divide-gray-700", children: members.map((user) => /* @__PURE__ */ jsxDEV53("li", { className: "px-4 py-2 text-sm text-gray-700 dark:text-gray-300", children: [
      user.fullName,
      " (",
      user.email,
      ") - ",
      user.role
    ] }, user.id, !0, {
      fileName: "app/components/admin/GroupsManagement.tsx",
      lineNumber: 252,
      columnNumber: 17
    }, this)) }, void 0, !1, {
      fileName: "app/components/admin/GroupsManagement.tsx",
      lineNumber: 250,
      columnNumber: 13
    }, this) }, void 0, !1, {
      fileName: "app/components/admin/GroupsManagement.tsx",
      lineNumber: 246,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV53("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxDEV53("button", { onClick: onClose, className: "px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500", children: "Close" }, void 0, !1, {
      fileName: "app/components/admin/GroupsManagement.tsx",
      lineNumber: 260,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/components/admin/GroupsManagement.tsx",
      lineNumber: 259,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/admin/GroupsManagement.tsx",
    lineNumber: 244,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/components/admin/GroupsManagement.tsx",
    lineNumber: 243,
    columnNumber: 5
  }, this);
}
function GroupsManagement({ groups: initialGroups, users }) {
  let navigation = useNavigation10(), actionData = useActionData12(), isSubmitting = navigation.state === "submitting" && navigation.formData?.get("intent")?.toString().includes("group"), [searchTerm, setSearchTerm] = useState30(""), [filterType, setFilterType] = useState30(""), [isAddEditModalOpen, setIsAddEditModalOpen] = useState30(!1), [isDeleteModalOpen, setIsDeleteModalOpen] = useState30(!1), [isViewMembersModalOpen, setIsViewMembersModalOpen] = useState30(!1), [selectedGroup, setSelectedGroup] = useState30(null), groupTypes = useMemo10(() => [...new Set(initialGroups.map((g) => g.type).filter(Boolean))], [initialGroups]), filteredGroups = useMemo10(() => initialGroups.map((g) => ({
    ...g,
    userCount: users.filter((u) => u.groupId === g.id).length
  })).filter((group) => {
    let searchMatch = searchTerm === "" || group.name.toLowerCase().includes(searchTerm.toLowerCase()), typeMatch = filterType === "" || group.type === filterType;
    return searchMatch && typeMatch;
  }), [initialGroups, users, searchTerm, filterType]), handleAddGroup = () => {
    setSelectedGroup(null), setIsAddEditModalOpen(!0);
  }, handleEditGroup = (group) => {
    setSelectedGroup(group), setIsAddEditModalOpen(!0);
  }, handleDeleteGroup = (group) => {
    setSelectedGroup(group), setIsDeleteModalOpen(!0);
  }, handleViewMembers = (group) => {
    setSelectedGroup(group), setIsViewMembersModalOpen(!0);
  };
  return React30.useEffect(() => {
    actionData?.success && actionData.intent?.includes("group") && (setIsAddEditModalOpen(!1), setIsDeleteModalOpen(!1), setSelectedGroup(null));
  }, [actionData]), /* @__PURE__ */ jsxDEV53("div", { className: "p-4 border rounded-md dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm", children: [
    /* @__PURE__ */ jsxDEV53("h3", { className: "text-lg font-semibold mb-4 text-gray-900 dark:text-white", children: "Groups Management" }, void 0, !1, {
      fileName: "app/components/admin/GroupsManagement.tsx",
      lineNumber: 343,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV53("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3", children: [
      /* @__PURE__ */ jsxDEV53(
        "button",
        {
          onClick: handleAddGroup,
          disabled: isSubmitting,
          className: "inline-flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm disabled:opacity-50",
          children: [
            /* @__PURE__ */ jsxDEV53(PlusIcon2, { className: "h-4 w-4" }, void 0, !1, {
              fileName: "app/components/admin/GroupsManagement.tsx",
              lineNumber: 352,
              columnNumber: 11
            }, this),
            "Add New Group"
          ]
        },
        void 0,
        !0,
        {
          fileName: "app/components/admin/GroupsManagement.tsx",
          lineNumber: 347,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV53("div", { className: "flex gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxDEV53("div", { className: "relative", children: [
          /* @__PURE__ */ jsxDEV53("label", { htmlFor: "search-groups", className: "sr-only", children: "Search by group name" }, void 0, !1, {
            fileName: "app/components/admin/GroupsManagement.tsx",
            lineNumber: 358,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV53("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: /* @__PURE__ */ jsxDEV53(SearchIcon4, { className: "h-5 w-5 text-gray-400" }, void 0, !1, {
            fileName: "app/components/admin/GroupsManagement.tsx",
            lineNumber: 360,
            columnNumber: 15
          }, this) }, void 0, !1, {
            fileName: "app/components/admin/GroupsManagement.tsx",
            lineNumber: 359,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV53(
            "input",
            {
              type: "text",
              id: "search-groups",
              placeholder: "Search groups...",
              value: searchTerm,
              onChange: (e) => setSearchTerm(e.target.value),
              className: "w-full md:w-auto pl-10 pr-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
            },
            void 0,
            !1,
            {
              fileName: "app/components/admin/GroupsManagement.tsx",
              lineNumber: 362,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/components/admin/GroupsManagement.tsx",
          lineNumber: 357,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV53("div", { children: [
          /* @__PURE__ */ jsxDEV53("label", { htmlFor: "filter-group-type", className: "sr-only", children: "Filter by Group Type" }, void 0, !1, {
            fileName: "app/components/admin/GroupsManagement.tsx",
            lineNumber: 373,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV53(
            "select",
            {
              id: "filter-group-type",
              value: filterType,
              onChange: (e) => setFilterType(e.target.value),
              className: "w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm",
              children: [
                /* @__PURE__ */ jsxDEV53("option", { value: "", children: "All Types" }, void 0, !1, {
                  fileName: "app/components/admin/GroupsManagement.tsx",
                  lineNumber: 380,
                  columnNumber: 15
                }, this),
                groupTypes.map((type) => /* @__PURE__ */ jsxDEV53("option", { value: type, children: type }, type, !1, {
                  fileName: "app/components/admin/GroupsManagement.tsx",
                  lineNumber: 382,
                  columnNumber: 17
                }, this))
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/components/admin/GroupsManagement.tsx",
              lineNumber: 374,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/components/admin/GroupsManagement.tsx",
          lineNumber: 372,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/admin/GroupsManagement.tsx",
        lineNumber: 355,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/admin/GroupsManagement.tsx",
      lineNumber: 346,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV53("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxDEV53("table", { className: "min-w-full divide-y divide-gray-200 dark:divide-gray-700", children: [
      /* @__PURE__ */ jsxDEV53("thead", { className: "bg-gray-50 dark:bg-gray-800", children: /* @__PURE__ */ jsxDEV53("tr", { children: [
        /* @__PURE__ */ jsxDEV53("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400", children: "Group Name" }, void 0, !1, {
          fileName: "app/components/admin/GroupsManagement.tsx",
          lineNumber: 394,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV53("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400", children: "Type" }, void 0, !1, {
          fileName: "app/components/admin/GroupsManagement.tsx",
          lineNumber: 395,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV53("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400", children: "User Count" }, void 0, !1, {
          fileName: "app/components/admin/GroupsManagement.tsx",
          lineNumber: 396,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV53("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400", children: "Actions" }, void 0, !1, {
          fileName: "app/components/admin/GroupsManagement.tsx",
          lineNumber: 397,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/admin/GroupsManagement.tsx",
        lineNumber: 393,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/components/admin/GroupsManagement.tsx",
        lineNumber: 392,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV53("tbody", { className: "bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700", children: filteredGroups.length === 0 ? /* @__PURE__ */ jsxDEV53("tr", { children: /* @__PURE__ */ jsxDEV53("td", { colSpan: 4, className: "px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400", children: "No groups found matching your criteria." }, void 0, !1, {
        fileName: "app/components/admin/GroupsManagement.tsx",
        lineNumber: 403,
        columnNumber: 17
      }, this) }, void 0, !1, {
        fileName: "app/components/admin/GroupsManagement.tsx",
        lineNumber: 402,
        columnNumber: 15
      }, this) : filteredGroups.map((group) => /* @__PURE__ */ jsxDEV53("tr", { className: navigation.formData?.get("groupId") === group.id ? "opacity-50" : "", children: [
        " ",
        /* @__PURE__ */ jsxDEV53("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white", children: group.name }, void 0, !1, {
          fileName: "app/components/admin/GroupsManagement.tsx",
          lineNumber: 410,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV53("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400", children: group.type || "-" }, void 0, !1, {
          fileName: "app/components/admin/GroupsManagement.tsx",
          lineNumber: 411,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV53("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400", children: group.userCount }, void 0, !1, {
          fileName: "app/components/admin/GroupsManagement.tsx",
          lineNumber: 412,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV53("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium space-x-1", children: [
          /* @__PURE__ */ jsxDEV53("button", { onClick: () => handleViewMembers(group), disabled: isSubmitting, className: "text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-200 p-1 disabled:opacity-50", title: "View Members", children: /* @__PURE__ */ jsxDEV53(ViewIcon2, { className: "h-5 w-5" }, void 0, !1, {
            fileName: "app/components/admin/GroupsManagement.tsx",
            lineNumber: 415,
            columnNumber: 23
          }, this) }, void 0, !1, {
            fileName: "app/components/admin/GroupsManagement.tsx",
            lineNumber: 414,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV53("button", { onClick: () => handleEditGroup(group), disabled: isSubmitting, className: "text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-200 p-1 disabled:opacity-50", title: "Edit Group", children: /* @__PURE__ */ jsxDEV53(EditIcon3, { className: "h-5 w-5" }, void 0, !1, {
            fileName: "app/components/admin/GroupsManagement.tsx",
            lineNumber: 418,
            columnNumber: 23
          }, this) }, void 0, !1, {
            fileName: "app/components/admin/GroupsManagement.tsx",
            lineNumber: 417,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV53("button", { onClick: () => handleDeleteGroup(group), disabled: isSubmitting, className: "text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-200 p-1 disabled:opacity-50", title: "Delete Group", children: /* @__PURE__ */ jsxDEV53(DeleteIcon3, { className: "h-5 w-5" }, void 0, !1, {
            fileName: "app/components/admin/GroupsManagement.tsx",
            lineNumber: 421,
            columnNumber: 23
          }, this) }, void 0, !1, {
            fileName: "app/components/admin/GroupsManagement.tsx",
            lineNumber: 420,
            columnNumber: 21
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/admin/GroupsManagement.tsx",
          lineNumber: 413,
          columnNumber: 19
        }, this)
      ] }, group.id, !0, {
        fileName: "app/components/admin/GroupsManagement.tsx",
        lineNumber: 409,
        columnNumber: 17
      }, this)) }, void 0, !1, {
        fileName: "app/components/admin/GroupsManagement.tsx",
        lineNumber: 400,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/admin/GroupsManagement.tsx",
      lineNumber: 391,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/components/admin/GroupsManagement.tsx",
      lineNumber: 390,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV53(
      AddEditGroupModal,
      {
        isOpen: isAddEditModalOpen,
        onClose: () => setIsAddEditModalOpen(!1),
        group: selectedGroup,
        isSubmitting: isSubmitting && (navigation.formData?.get("intent") === "create-group" || navigation.formData?.get("intent") === "update-group")
      },
      void 0,
      !1,
      {
        fileName: "app/components/admin/GroupsManagement.tsx",
        lineNumber: 432,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV53(
      DeleteConfirmationModal2,
      {
        isOpen: isDeleteModalOpen,
        onClose: () => {
          setIsDeleteModalOpen(!1), setSelectedGroup(null);
        },
        group: selectedGroup,
        isSubmitting: isSubmitting && navigation.formData?.get("intent") === "delete-group"
      },
      void 0,
      !1,
      {
        fileName: "app/components/admin/GroupsManagement.tsx",
        lineNumber: 438,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV53(
      ViewMembersModal,
      {
        isOpen: isViewMembersModalOpen,
        onClose: () => {
          setIsViewMembersModalOpen(!1), setSelectedGroup(null);
        },
        group: selectedGroup,
        users
      },
      void 0,
      !1,
      {
        fileName: "app/components/admin/GroupsManagement.tsx",
        lineNumber: 444,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/components/admin/GroupsManagement.tsx",
    lineNumber: 342,
    columnNumber: 5
  }, this);
}

// app/components/admin/EssenceSettings.tsx
import { useState as useState31, useEffect as useEffect23 } from "react";
import { jsxDEV as jsxDEV54 } from "react/jsx-dev-runtime";
function EssenceSettings() {
  let { users } = useStore(), centralFineAccount = users.find((u) => u.role === "Super Admin"), [settings, setSettings] = useState31({
    maxRewardAmount: 1e3,
    maxFineAmount: 500,
    centralFineAccountId: centralFineAccount?.email || "",
    // Use actual user email
    enableGroupActions: !0
  }), [isEditing, setIsEditing] = useState31(!1), [tempSettings, setTempSettings] = useState31(settings);
  useEffect23(() => {
    centralFineAccount && (setSettings((prev) => ({ ...prev, centralFineAccountId: centralFineAccount.email })), setTempSettings((prev) => ({ ...prev, centralFineAccountId: centralFineAccount.email })));
  }, [centralFineAccount]);
  let handleInputChange = (e) => {
    let { name, value, type } = e.target, checked = e.target.checked;
    setTempSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  }, handleSave = () => {
    console.log("Saving Essence Settings:", tempSettings), setSettings(tempSettings), setIsEditing(!1);
  }, handleCancel = () => {
    setTempSettings(settings), setIsEditing(!1);
  };
  return /* @__PURE__ */ jsxDEV54("div", { className: "p-4 border rounded-md dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm", children: [
    /* @__PURE__ */ jsxDEV54("div", { className: "flex justify-between items-center mb-4", children: [
      /* @__PURE__ */ jsxDEV54("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white", children: "Essence Settings" }, void 0, !1, {
        fileName: "app/components/admin/EssenceSettings.tsx",
        lineNumber: 59,
        columnNumber: 9
      }, this),
      !isEditing && /* @__PURE__ */ jsxDEV54(
        "button",
        {
          onClick: () => {
            setTempSettings(settings), setIsEditing(!0);
          },
          className: "text-sm text-blue-600 hover:underline dark:text-blue-400",
          children: "Edit Settings"
        },
        void 0,
        !1,
        {
          fileName: "app/components/admin/EssenceSettings.tsx",
          lineNumber: 61,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/components/admin/EssenceSettings.tsx",
      lineNumber: 58,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV54("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxDEV54("div", { children: [
        /* @__PURE__ */ jsxDEV54("label", { htmlFor: "maxRewardAmount", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Maximum Reward Amount" }, void 0, !1, {
          fileName: "app/components/admin/EssenceSettings.tsx",
          lineNumber: 73,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV54(
          "input",
          {
            type: "number",
            id: "maxRewardAmount",
            name: "maxRewardAmount",
            value: isEditing ? tempSettings.maxRewardAmount : settings.maxRewardAmount,
            onChange: handleInputChange,
            disabled: !isEditing,
            className: "w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white disabled:opacity-70 disabled:bg-gray-100 dark:disabled:bg-gray-700",
            min: "0"
          },
          void 0,
          !1,
          {
            fileName: "app/components/admin/EssenceSettings.tsx",
            lineNumber: 74,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV54("p", { className: "text-xs text-gray-500 dark:text-gray-400 mt-1", children: "Set the highest amount allowed for a single reward." }, void 0, !1, {
          fileName: "app/components/admin/EssenceSettings.tsx",
          lineNumber: 84,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/admin/EssenceSettings.tsx",
        lineNumber: 72,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV54("div", { children: [
        /* @__PURE__ */ jsxDEV54("label", { htmlFor: "maxFineAmount", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Maximum Fine Amount" }, void 0, !1, {
          fileName: "app/components/admin/EssenceSettings.tsx",
          lineNumber: 89,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV54(
          "input",
          {
            type: "number",
            id: "maxFineAmount",
            name: "maxFineAmount",
            value: isEditing ? tempSettings.maxFineAmount : settings.maxFineAmount,
            onChange: handleInputChange,
            disabled: !isEditing,
            className: "w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white disabled:opacity-70 disabled:bg-gray-100 dark:disabled:bg-gray-700",
            min: "0"
          },
          void 0,
          !1,
          {
            fileName: "app/components/admin/EssenceSettings.tsx",
            lineNumber: 90,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV54("p", { className: "text-xs text-gray-500 dark:text-gray-400 mt-1", children: "Set the highest amount allowed for a single fine." }, void 0, !1, {
          fileName: "app/components/admin/EssenceSettings.tsx",
          lineNumber: 100,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/admin/EssenceSettings.tsx",
        lineNumber: 88,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV54("div", { children: [
        /* @__PURE__ */ jsxDEV54("label", { htmlFor: "centralFineAccountId", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Central Fine Account Identifier" }, void 0, !1, {
          fileName: "app/components/admin/EssenceSettings.tsx",
          lineNumber: 105,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV54(
          "input",
          {
            type: "text",
            id: "centralFineAccountId",
            name: "centralFineAccountId",
            value: isEditing ? tempSettings.centralFineAccountId : settings.centralFineAccountId,
            onChange: handleInputChange,
            disabled: !isEditing,
            placeholder: "Enter User ID or Email",
            className: "w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white disabled:opacity-70 disabled:bg-gray-100 dark:disabled:bg-gray-700"
          },
          void 0,
          !1,
          {
            fileName: "app/components/admin/EssenceSettings.tsx",
            lineNumber: 106,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV54("p", { className: "text-xs text-gray-500 dark:text-gray-400 mt-1", children: "Specify the user account where collected fines are sent." }, void 0, !1, {
          fileName: "app/components/admin/EssenceSettings.tsx",
          lineNumber: 116,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/admin/EssenceSettings.tsx",
        lineNumber: 104,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV54("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsxDEV54(
          "input",
          {
            type: "checkbox",
            id: "enableGroupActions",
            name: "enableGroupActions",
            checked: isEditing ? tempSettings.enableGroupActions : settings.enableGroupActions,
            onChange: handleInputChange,
            disabled: !isEditing,
            className: "h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 disabled:opacity-70"
          },
          void 0,
          !1,
          {
            fileName: "app/components/admin/EssenceSettings.tsx",
            lineNumber: 121,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV54("label", { htmlFor: "enableGroupActions", className: "ml-2 block text-sm text-gray-900 dark:text-gray-300", children: "Enable Group-Based Economic Actions" }, void 0, !1, {
          fileName: "app/components/admin/EssenceSettings.tsx",
          lineNumber: 130,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/admin/EssenceSettings.tsx",
        lineNumber: 120,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV54("p", { className: "text-xs text-gray-500 dark:text-gray-400 -mt-3 ml-6", children: "Allow admins to assign rewards/fines/expenses to entire groups." }, void 0, !1, {
        fileName: "app/components/admin/EssenceSettings.tsx",
        lineNumber: 134,
        columnNumber: 10
      }, this),
      isEditing && /* @__PURE__ */ jsxDEV54("div", { className: "flex justify-end gap-3 pt-4 border-t dark:border-gray-700", children: [
        /* @__PURE__ */ jsxDEV54(
          "button",
          {
            onClick: handleCancel,
            className: "px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500",
            children: "Cancel"
          },
          void 0,
          !1,
          {
            fileName: "app/components/admin/EssenceSettings.tsx",
            lineNumber: 139,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV54(
          "button",
          {
            onClick: handleSave,
            className: "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700",
            children: "Save Settings"
          },
          void 0,
          !1,
          {
            fileName: "app/components/admin/EssenceSettings.tsx",
            lineNumber: 145,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/components/admin/EssenceSettings.tsx",
        lineNumber: 138,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/admin/EssenceSettings.tsx",
      lineNumber: 70,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/admin/EssenceSettings.tsx",
    lineNumber: 57,
    columnNumber: 5
  }, this);
}

// app/components/admin/BackupRestore.tsx
import { useState as useState32, useMemo as useMemo11 } from "react";
import { jsxDEV as jsxDEV55 } from "react/jsx-dev-runtime";
function DownloadIcon3(props) {
  return /* @__PURE__ */ jsxDEV55("svg", { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ jsxDEV55("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }, void 0, !1, {
      fileName: "app/components/admin/BackupRestore.tsx",
      lineNumber: 7,
      columnNumber: 194
    }, this),
    /* @__PURE__ */ jsxDEV55("polyline", { points: "7 10 12 15 17 10" }, void 0, !1, {
      fileName: "app/components/admin/BackupRestore.tsx",
      lineNumber: 7,
      columnNumber: 247
    }, this),
    /* @__PURE__ */ jsxDEV55("line", { x1: "12", x2: "12", y1: "15", y2: "3" }, void 0, !1, {
      fileName: "app/components/admin/BackupRestore.tsx",
      lineNumber: 7,
      columnNumber: 284
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/admin/BackupRestore.tsx",
    lineNumber: 7,
    columnNumber: 5
  }, this);
}
function UploadIcon3(props) {
  return /* @__PURE__ */ jsxDEV55("svg", { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ jsxDEV55("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }, void 0, !1, {
      fileName: "app/components/admin/BackupRestore.tsx",
      lineNumber: 12,
      columnNumber: 194
    }, this),
    /* @__PURE__ */ jsxDEV55("polyline", { points: "17 8 12 3 7 8" }, void 0, !1, {
      fileName: "app/components/admin/BackupRestore.tsx",
      lineNumber: 12,
      columnNumber: 247
    }, this),
    /* @__PURE__ */ jsxDEV55("line", { x1: "12", x2: "12", y1: "3", y2: "15" }, void 0, !1, {
      fileName: "app/components/admin/BackupRestore.tsx",
      lineNumber: 12,
      columnNumber: 281
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/admin/BackupRestore.tsx",
    lineNumber: 12,
    columnNumber: 5
  }, this);
}
function FileTextIcon2(props) {
  return /* @__PURE__ */ jsxDEV55("svg", { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ jsxDEV55("path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" }, void 0, !1, {
      fileName: "app/components/admin/BackupRestore.tsx",
      lineNumber: 17,
      columnNumber: 194
    }, this),
    /* @__PURE__ */ jsxDEV55("path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }, void 0, !1, {
      fileName: "app/components/admin/BackupRestore.tsx",
      lineNumber: 17,
      columnNumber: 264
    }, this),
    /* @__PURE__ */ jsxDEV55("path", { d: "M10 9H8" }, void 0, !1, {
      fileName: "app/components/admin/BackupRestore.tsx",
      lineNumber: 17,
      columnNumber: 299
    }, this),
    /* @__PURE__ */ jsxDEV55("path", { d: "M16 13H8" }, void 0, !1, {
      fileName: "app/components/admin/BackupRestore.tsx",
      lineNumber: 17,
      columnNumber: 318
    }, this),
    /* @__PURE__ */ jsxDEV55("path", { d: "M16 17H8" }, void 0, !1, {
      fileName: "app/components/admin/BackupRestore.tsx",
      lineNumber: 17,
      columnNumber: 338
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/admin/BackupRestore.tsx",
    lineNumber: 17,
    columnNumber: 5
  }, this);
}
function DatabaseIcon(props) {
  return /* @__PURE__ */ jsxDEV55("svg", { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ jsxDEV55("ellipse", { cx: "12", cy: "5", rx: "9", ry: "3" }, void 0, !1, {
      fileName: "app/components/admin/BackupRestore.tsx",
      lineNumber: 22,
      columnNumber: 194
    }, this),
    /* @__PURE__ */ jsxDEV55("path", { d: "M3 5V19A9 3 0 0 0 21 19V5" }, void 0, !1, {
      fileName: "app/components/admin/BackupRestore.tsx",
      lineNumber: 22,
      columnNumber: 233
    }, this),
    /* @__PURE__ */ jsxDEV55("path", { d: "M3 12A9 3 0 0 0 21 12" }, void 0, !1, {
      fileName: "app/components/admin/BackupRestore.tsx",
      lineNumber: 22,
      columnNumber: 270
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/admin/BackupRestore.tsx",
    lineNumber: 22,
    columnNumber: 5
  }, this);
}
function ArchiveIcon(props) {
  return /* @__PURE__ */ jsxDEV55("svg", { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ jsxDEV55("rect", { width: "20", height: "5", x: "2", y: "3", rx: "1" }, void 0, !1, {
      fileName: "app/components/admin/BackupRestore.tsx",
      lineNumber: 27,
      columnNumber: 198
    }, this),
    /* @__PURE__ */ jsxDEV55("path", { d: "M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" }, void 0, !1, {
      fileName: "app/components/admin/BackupRestore.tsx",
      lineNumber: 27,
      columnNumber: 246
    }, this),
    /* @__PURE__ */ jsxDEV55("path", { d: "M10 12h4" }, void 0, !1, {
      fileName: "app/components/admin/BackupRestore.tsx",
      lineNumber: 27,
      columnNumber: 298
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/admin/BackupRestore.tsx",
    lineNumber: 27,
    columnNumber: 9
  }, this);
}
function BackupRestore() {
  let { users, groups, transactions } = useStore(), [exportModules, setExportModules] = useState32([]), [exportFormat, setExportFormat] = useState32("json"), [includeLogs, setIncludeLogs] = useState32(!1), [importFile, setImportFile] = useState32(null), [importFileName, setImportFileName] = useState32(""), [importModule, setImportModule] = useState32(""), [importMode, setImportMode] = useState32("merge"), [importPreview, setImportPreview] = useState32(null), [importErrors, setImportErrors] = useState32([]), [auditLog, setAuditLog] = useState32([
    // Placeholder data
    { id: "log1", actionType: "Export", modules: ["config", "groups"], performedBy: "Super Admin", timestamp: new Date(Date.now() - 864e5).toISOString(), status: "Success" },
    { id: "log2", actionType: "Import", fileName: "users_import_v2.csv", performedBy: "Super Admin", timestamp: (/* @__PURE__ */ new Date()).toISOString(), status: "Failed", details: "Row 15: Invalid email format. Row 22: User ID not found." }
  ]), [filterDate, setFilterDate] = useState32(""), [filterAction, setFilterAction] = useState32(""), handleExportSelection = (module, type) => {
    setExportModules((prev) => type === "config" ? prev.includes(module) ? prev.filter((m) => m !== module) : [...prev, module] : module === "activityLogs" ? prev : prev.includes(module) ? prev.filter((m) => m !== module) : [...prev, module]);
  }, handleExport = (type) => {
    console.log(`Exporting... Type: ${type}`), console.log("Data to export:", {
      users: users.length,
      groups: groups.length,
      transactions: transactions.length,
      selectedModules: exportModules,
      includeLogs,
      format: exportFormat
    });
    let modulesToExport = [];
    if (type === "selected" && (modulesToExport = exportModules), type === "all_config" && (modulesToExport = ["config", "groups", "essenceSettings"]), type === "all_data" && (modulesToExport = ["users", "balances", "transactions", "economySetup", ...includeLogs ? ["activityLogs"] : []]), type === "zip" && (modulesToExport = ["config", "groups", "essenceSettings", "users", "balances", "transactions", "economySetup", ...includeLogs ? ["activityLogs"] : []]), modulesToExport.length === 0 && type === "selected") {
      alert("Please select at least one module to export.");
      return;
    }
    alert(`Export initiated for ${type} with ${users.length} users, ${groups.length} groups, and ${transactions.length} transactions as ${exportFormat}. Check console.`), setAuditLog((prev) => [{
      id: `log${Date.now()}`,
      actionType: "Export",
      modules: modulesToExport,
      performedBy: "Current Super Admin",
      // Get actual user later
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      status: "Success"
      // Assume success for placeholder
    }, ...prev]);
  }, handleImportFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let file = e.target.files[0];
      setImportFile(file), setImportFileName(file.name), setImportPreview(null), setImportErrors([]);
    }
  }, handleImport = () => {
    if (!importFile || !importModule) {
      alert("Please select a file and the corresponding data module to import.");
      return;
    }
    console.log(`Importing file: ${importFileName}`), console.log(`Module: ${importModule}`), console.log(`Mode: ${importMode}`), alert(`Placeholder: Import initiated for ${importModule} from ${importFileName} (Mode: ${importMode}). Check console.`), setAuditLog((prev) => [{
      id: `log${Date.now()}`,
      actionType: "Import",
      fileName: importFileName,
      modules: [importModule],
      performedBy: "Current Super Admin",
      // Get actual user later
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      status: "Success"
      // Assume success for placeholder
    }, ...prev]), setImportFile(null), setImportFileName(""), setImportModule(""), setImportPreview(null), setImportErrors([]);
  }, filteredAuditLog = useMemo11(() => auditLog.filter((log) => {
    let dateMatch = !filterDate || log.timestamp.startsWith(filterDate), actionMatch = !filterAction || log.actionType === filterAction;
    return dateMatch && actionMatch;
  }), [auditLog, filterDate, filterAction]);
  return /* @__PURE__ */ jsxDEV55("div", { className: "p-4 border rounded-md dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm space-y-8", children: [
    /* @__PURE__ */ jsxDEV55("section", { children: [
      /* @__PURE__ */ jsxDEV55("h3", { className: "text-lg font-semibold mb-4 text-gray-900 dark:text-white", children: "Export Data" }, void 0, !1, {
        fileName: "app/components/admin/BackupRestore.tsx",
        lineNumber: 189,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV55("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxDEV55("div", { className: "p-4 border rounded dark:border-gray-600", children: [
          /* @__PURE__ */ jsxDEV55("h4", { className: "font-medium mb-2 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV55(FileTextIcon2, { className: "w-5 h-5" }, void 0, !1, {
              fileName: "app/components/admin/BackupRestore.tsx",
              lineNumber: 193,
              columnNumber: 70
            }, this),
            "Configuration Modules"
          ] }, void 0, !0, {
            fileName: "app/components/admin/BackupRestore.tsx",
            lineNumber: 193,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV55("div", { className: "space-y-2 text-sm", children: [
            /* @__PURE__ */ jsxDEV55("label", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxDEV55("input", { type: "checkbox", checked: exportModules.includes("groups"), onChange: () => handleExportSelection("groups", "config"), className: "form-checkbox h-4 w-4 text-blue-600" }, void 0, !1, {
                fileName: "app/components/admin/BackupRestore.tsx",
                lineNumber: 197,
                columnNumber: 17
              }, this),
              " Groups"
            ] }, void 0, !0, {
              fileName: "app/components/admin/BackupRestore.tsx",
              lineNumber: 196,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV55("label", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxDEV55("input", { type: "checkbox", checked: exportModules.includes("essenceSettings"), onChange: () => handleExportSelection("essenceSettings", "config"), className: "form-checkbox h-4 w-4 text-blue-600" }, void 0, !1, {
                fileName: "app/components/admin/BackupRestore.tsx",
                lineNumber: 200,
                columnNumber: 17
              }, this),
              " Essence Settings"
            ] }, void 0, !0, {
              fileName: "app/components/admin/BackupRestore.tsx",
              lineNumber: 199,
              columnNumber: 15
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/admin/BackupRestore.tsx",
            lineNumber: 194,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV55(
            "button",
            {
              onClick: () => handleExport("all_config"),
              className: "mt-3 inline-flex items-center gap-1 px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-xs",
              children: [
                /* @__PURE__ */ jsxDEV55(DownloadIcon3, { className: "h-3 w-3" }, void 0, !1, {
                  fileName: "app/components/admin/BackupRestore.tsx",
                  lineNumber: 208,
                  columnNumber: 17
                }, this),
                " Export All Config"
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/components/admin/BackupRestore.tsx",
              lineNumber: 204,
              columnNumber: 14
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/components/admin/BackupRestore.tsx",
          lineNumber: 192,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV55("div", { className: "p-4 border rounded dark:border-gray-600", children: [
          /* @__PURE__ */ jsxDEV55("h4", { className: "font-medium mb-2 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV55(DatabaseIcon, { className: "w-5 h-5" }, void 0, !1, {
              fileName: "app/components/admin/BackupRestore.tsx",
              lineNumber: 214,
              columnNumber: 70
            }, this),
            "Full Data Modules"
          ] }, void 0, !0, {
            fileName: "app/components/admin/BackupRestore.tsx",
            lineNumber: 214,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV55("div", { className: "space-y-2 text-sm", children: [
            /* @__PURE__ */ jsxDEV55("label", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxDEV55("input", { type: "checkbox", checked: exportModules.includes("users"), onChange: () => handleExportSelection("users", "full"), className: "form-checkbox h-4 w-4 text-blue-600" }, void 0, !1, {
                fileName: "app/components/admin/BackupRestore.tsx",
                lineNumber: 218,
                columnNumber: 17
              }, this),
              " Users"
            ] }, void 0, !0, {
              fileName: "app/components/admin/BackupRestore.tsx",
              lineNumber: 217,
              columnNumber: 16
            }, this),
            /* @__PURE__ */ jsxDEV55("label", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxDEV55("input", { type: "checkbox", checked: exportModules.includes("balances"), onChange: () => handleExportSelection("balances", "full"), className: "form-checkbox h-4 w-4 text-blue-600" }, void 0, !1, {
                fileName: "app/components/admin/BackupRestore.tsx",
                lineNumber: 221,
                columnNumber: 17
              }, this),
              " User Balances"
            ] }, void 0, !0, {
              fileName: "app/components/admin/BackupRestore.tsx",
              lineNumber: 220,
              columnNumber: 16
            }, this),
            /* @__PURE__ */ jsxDEV55("label", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxDEV55("input", { type: "checkbox", checked: exportModules.includes("transactions"), onChange: () => handleExportSelection("transactions", "full"), className: "form-checkbox h-4 w-4 text-blue-600" }, void 0, !1, {
                fileName: "app/components/admin/BackupRestore.tsx",
                lineNumber: 224,
                columnNumber: 17
              }, this),
              " Transactions"
            ] }, void 0, !0, {
              fileName: "app/components/admin/BackupRestore.tsx",
              lineNumber: 223,
              columnNumber: 16
            }, this),
            /* @__PURE__ */ jsxDEV55("label", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxDEV55("input", { type: "checkbox", checked: exportModules.includes("economySetup"), onChange: () => handleExportSelection("economySetup", "full"), className: "form-checkbox h-4 w-4 text-blue-600" }, void 0, !1, {
                fileName: "app/components/admin/BackupRestore.tsx",
                lineNumber: 227,
                columnNumber: 17
              }, this),
              " Economy Setup (Activities/Expenses)"
            ] }, void 0, !0, {
              fileName: "app/components/admin/BackupRestore.tsx",
              lineNumber: 226,
              columnNumber: 16
            }, this),
            /* @__PURE__ */ jsxDEV55("hr", { className: "my-2 dark:border-gray-600" }, void 0, !1, {
              fileName: "app/components/admin/BackupRestore.tsx",
              lineNumber: 229,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV55("label", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxDEV55("input", { type: "checkbox", checked: includeLogs, onChange: (e) => setIncludeLogs(e.target.checked), className: "form-checkbox h-4 w-4 text-blue-600" }, void 0, !1, {
                fileName: "app/components/admin/BackupRestore.tsx",
                lineNumber: 231,
                columnNumber: 17
              }, this),
              " Include Activity Logs (Optional)"
            ] }, void 0, !0, {
              fileName: "app/components/admin/BackupRestore.tsx",
              lineNumber: 230,
              columnNumber: 16
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/admin/BackupRestore.tsx",
            lineNumber: 215,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV55(
            "button",
            {
              onClick: () => handleExport("all_data"),
              className: "mt-3 inline-flex items-center gap-1 px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-xs",
              children: [
                /* @__PURE__ */ jsxDEV55(DownloadIcon3, { className: "h-3 w-3" }, void 0, !1, {
                  fileName: "app/components/admin/BackupRestore.tsx",
                  lineNumber: 238,
                  columnNumber: 17
                }, this),
                " Export All Data"
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/components/admin/BackupRestore.tsx",
              lineNumber: 234,
              columnNumber: 14
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/components/admin/BackupRestore.tsx",
          lineNumber: 213,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/admin/BackupRestore.tsx",
        lineNumber: 190,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV55("div", { className: "mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-md border dark:border-gray-700", children: [
        /* @__PURE__ */ jsxDEV55("div", { className: "flex-shrink-0", children: [
          /* @__PURE__ */ jsxDEV55("label", { htmlFor: "exportFormat", className: "text-sm font-medium mr-2", children: "Format:" }, void 0, !1, {
            fileName: "app/components/admin/BackupRestore.tsx",
            lineNumber: 246,
            columnNumber: 14
          }, this),
          /* @__PURE__ */ jsxDEV55(
            "select",
            {
              id: "exportFormat",
              value: exportFormat,
              onChange: (e) => setExportFormat(e.target.value),
              className: "px-3 py-1 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500",
              children: [
                /* @__PURE__ */ jsxDEV55("option", { value: "json", children: "JSON" }, void 0, !1, {
                  fileName: "app/components/admin/BackupRestore.tsx",
                  lineNumber: 253,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV55("option", { value: "csv", children: "CSV" }, void 0, !1, {
                  fileName: "app/components/admin/BackupRestore.tsx",
                  lineNumber: 254,
                  columnNumber: 17
                }, this)
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/components/admin/BackupRestore.tsx",
              lineNumber: 247,
              columnNumber: 14
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/components/admin/BackupRestore.tsx",
          lineNumber: 245,
          columnNumber: 12
        }, this),
        /* @__PURE__ */ jsxDEV55("div", { className: "flex-grow flex flex-wrap gap-2", children: [
          /* @__PURE__ */ jsxDEV55(
            "button",
            {
              onClick: () => handleExport("selected"),
              disabled: exportModules.length === 0,
              className: "inline-flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm disabled:opacity-50 disabled:cursor-not-allowed",
              children: [
                /* @__PURE__ */ jsxDEV55(DownloadIcon3, { className: "h-4 w-4" }, void 0, !1, {
                  fileName: "app/components/admin/BackupRestore.tsx",
                  lineNumber: 263,
                  columnNumber: 17
                }, this),
                " Export Selected (",
                exportModules.length,
                ")"
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/components/admin/BackupRestore.tsx",
              lineNumber: 258,
              columnNumber: 14
            },
            this
          ),
          /* @__PURE__ */ jsxDEV55(
            "button",
            {
              onClick: () => handleExport("zip"),
              className: "inline-flex items-center gap-1 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm",
              children: [
                /* @__PURE__ */ jsxDEV55(ArchiveIcon, { className: "h-4 w-4" }, void 0, !1, {
                  fileName: "app/components/admin/BackupRestore.tsx",
                  lineNumber: 269,
                  columnNumber: 17
                }, this),
                " Download All as ZIP"
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/components/admin/BackupRestore.tsx",
              lineNumber: 265,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/components/admin/BackupRestore.tsx",
          lineNumber: 257,
          columnNumber: 12
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/admin/BackupRestore.tsx",
        lineNumber: 244,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/admin/BackupRestore.tsx",
      lineNumber: 188,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV55("hr", { className: "dark:border-gray-700" }, void 0, !1, {
      fileName: "app/components/admin/BackupRestore.tsx",
      lineNumber: 275,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV55("section", { children: [
      /* @__PURE__ */ jsxDEV55("h3", { className: "text-lg font-semibold mb-4 text-gray-900 dark:text-white", children: "Import Data" }, void 0, !1, {
        fileName: "app/components/admin/BackupRestore.tsx",
        lineNumber: 279,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV55("div", { className: "p-4 border rounded dark:border-gray-600 bg-gray-50 dark:bg-gray-800", children: [
        /* @__PURE__ */ jsxDEV55("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 items-end", children: [
          /* @__PURE__ */ jsxDEV55("div", { children: [
            /* @__PURE__ */ jsxDEV55("label", { htmlFor: "importFile", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Select File (.json or .csv)" }, void 0, !1, {
              fileName: "app/components/admin/BackupRestore.tsx",
              lineNumber: 284,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV55(
              "input",
              {
                type: "file",
                id: "importFile",
                accept: ".json,.csv",
                onChange: handleImportFileChange,
                className: "block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-gray-700 dark:file:text-gray-200 dark:hover:file:bg-gray-600"
              },
              void 0,
              !1,
              {
                fileName: "app/components/admin/BackupRestore.tsx",
                lineNumber: 285,
                columnNumber: 15
              },
              this
            ),
            importFileName && /* @__PURE__ */ jsxDEV55("p", { className: "text-xs mt-1 text-gray-600 dark:text-gray-400 truncate", children: [
              "Selected: ",
              importFileName
            ] }, void 0, !0, {
              fileName: "app/components/admin/BackupRestore.tsx",
              lineNumber: 292,
              columnNumber: 34
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/admin/BackupRestore.tsx",
            lineNumber: 283,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV55("div", { children: [
            /* @__PURE__ */ jsxDEV55("label", { htmlFor: "importModule", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Data Module" }, void 0, !1, {
              fileName: "app/components/admin/BackupRestore.tsx",
              lineNumber: 297,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV55(
              "select",
              {
                id: "importModule",
                value: importModule,
                onChange: (e) => setImportModule(e.target.value),
                className: "w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm",
                children: [
                  /* @__PURE__ */ jsxDEV55("option", { value: "", disabled: !0, children: "Select module..." }, void 0, !1, {
                    fileName: "app/components/admin/BackupRestore.tsx",
                    lineNumber: 304,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV55("option", { value: "users", children: "Users" }, void 0, !1, {
                    fileName: "app/components/admin/BackupRestore.tsx",
                    lineNumber: 305,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV55("option", { value: "balances", children: "User Balances" }, void 0, !1, {
                    fileName: "app/components/admin/BackupRestore.tsx",
                    lineNumber: 306,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV55("option", { value: "transactions", children: "Transactions" }, void 0, !1, {
                    fileName: "app/components/admin/BackupRestore.tsx",
                    lineNumber: 307,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV55("option", { value: "groups", children: "Groups" }, void 0, !1, {
                    fileName: "app/components/admin/BackupRestore.tsx",
                    lineNumber: 308,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV55("option", { value: "economySetup", children: "Economy Setup (Activities/Expenses)" }, void 0, !1, {
                    fileName: "app/components/admin/BackupRestore.tsx",
                    lineNumber: 309,
                    columnNumber: 17
                  }, this)
                ]
              },
              void 0,
              !0,
              {
                fileName: "app/components/admin/BackupRestore.tsx",
                lineNumber: 298,
                columnNumber: 15
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "app/components/admin/BackupRestore.tsx",
            lineNumber: 296,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV55("div", { className: "flex flex-col sm:flex-row items-start sm:items-end gap-2", children: [
            /* @__PURE__ */ jsxDEV55("div", { children: [
              /* @__PURE__ */ jsxDEV55("label", { htmlFor: "importMode", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Import Mode" }, void 0, !1, {
                fileName: "app/components/admin/BackupRestore.tsx",
                lineNumber: 317,
                columnNumber: 18
              }, this),
              /* @__PURE__ */ jsxDEV55(
                "select",
                {
                  id: "importMode",
                  value: importMode,
                  onChange: (e) => setImportMode(e.target.value),
                  className: "w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm",
                  children: [
                    /* @__PURE__ */ jsxDEV55("option", { value: "merge", children: "Merge with existing" }, void 0, !1, {
                      fileName: "app/components/admin/BackupRestore.tsx",
                      lineNumber: 324,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV55("option", { value: "overwrite", children: "Overwrite existing" }, void 0, !1, {
                      fileName: "app/components/admin/BackupRestore.tsx",
                      lineNumber: 325,
                      columnNumber: 21
                    }, this)
                  ]
                },
                void 0,
                !0,
                {
                  fileName: "app/components/admin/BackupRestore.tsx",
                  lineNumber: 318,
                  columnNumber: 18
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "app/components/admin/BackupRestore.tsx",
              lineNumber: 316,
              columnNumber: 16
            }, this),
            /* @__PURE__ */ jsxDEV55(
              "button",
              {
                onClick: handleImport,
                disabled: !importFile || !importModule,
                className: "w-full sm:w-auto inline-flex items-center justify-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm disabled:opacity-50 disabled:cursor-not-allowed",
                children: [
                  /* @__PURE__ */ jsxDEV55(UploadIcon3, { className: "h-4 w-4" }, void 0, !1, {
                    fileName: "app/components/admin/BackupRestore.tsx",
                    lineNumber: 333,
                    columnNumber: 19
                  }, this),
                  " Import"
                ]
              },
              void 0,
              !0,
              {
                fileName: "app/components/admin/BackupRestore.tsx",
                lineNumber: 328,
                columnNumber: 16
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "app/components/admin/BackupRestore.tsx",
            lineNumber: 315,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/admin/BackupRestore.tsx",
          lineNumber: 281,
          columnNumber: 11
        }, this),
        importErrors.length > 0 && /* @__PURE__ */ jsxDEV55("div", { className: "mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm", children: [
          /* @__PURE__ */ jsxDEV55("p", { className: "font-medium mb-1", children: "Import Validation Errors:" }, void 0, !1, {
            fileName: "app/components/admin/BackupRestore.tsx",
            lineNumber: 340,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV55("ul", { className: "list-disc list-inside text-xs", children: importErrors.map((err, i) => /* @__PURE__ */ jsxDEV55("li", { children: err }, i, !1, {
            fileName: "app/components/admin/BackupRestore.tsx",
            lineNumber: 342,
            columnNumber: 51
          }, this)) }, void 0, !1, {
            fileName: "app/components/admin/BackupRestore.tsx",
            lineNumber: 341,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/admin/BackupRestore.tsx",
          lineNumber: 339,
          columnNumber: 14
        }, this),
        importPreview && /* @__PURE__ */ jsxDEV55("div", { className: "mt-4 p-3 bg-blue-50 border border-blue-200 text-blue-800 rounded text-sm", children: [
          /* @__PURE__ */ jsxDEV55("p", { className: "font-medium mb-1", children: "Import Preview:" }, void 0, !1, {
            fileName: "app/components/admin/BackupRestore.tsx",
            lineNumber: 348,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV55("pre", { className: "text-xs max-h-40 overflow-auto bg-white dark:bg-gray-900 p-2 rounded", children: JSON.stringify(importPreview, null, 2) }, void 0, !1, {
            fileName: "app/components/admin/BackupRestore.tsx",
            lineNumber: 349,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/admin/BackupRestore.tsx",
          lineNumber: 347,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV55("p", { className: "text-xs text-gray-500 dark:text-gray-400 mt-2", children: "Note: 'Overwrite' mode requires confirmation. Validation checks headers, data types, and references (e.g., User IDs). Preview shows sample data before import." }, void 0, !1, {
          fileName: "app/components/admin/BackupRestore.tsx",
          lineNumber: 352,
          columnNumber: 12
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/admin/BackupRestore.tsx",
        lineNumber: 280,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/admin/BackupRestore.tsx",
      lineNumber: 278,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV55("hr", { className: "dark:border-gray-700" }, void 0, !1, {
      fileName: "app/components/admin/BackupRestore.tsx",
      lineNumber: 356,
      columnNumber: 8
    }, this),
    /* @__PURE__ */ jsxDEV55("section", { children: [
      /* @__PURE__ */ jsxDEV55("h3", { className: "text-lg font-semibold mb-4 text-gray-900 dark:text-white", children: "Import/Export Audit Trail" }, void 0, !1, {
        fileName: "app/components/admin/BackupRestore.tsx",
        lineNumber: 360,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV55("div", { className: "flex flex-wrap gap-4 mb-4", children: [
        /* @__PURE__ */ jsxDEV55("div", { children: [
          /* @__PURE__ */ jsxDEV55("label", { htmlFor: "filterDate", className: "text-sm font-medium mr-2", children: "Date:" }, void 0, !1, {
            fileName: "app/components/admin/BackupRestore.tsx",
            lineNumber: 364,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV55(
            "input",
            {
              type: "date",
              id: "filterDate",
              value: filterDate,
              onChange: (e) => setFilterDate(e.target.value),
              className: "px-3 py-1 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
            },
            void 0,
            !1,
            {
              fileName: "app/components/admin/BackupRestore.tsx",
              lineNumber: 365,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/components/admin/BackupRestore.tsx",
          lineNumber: 363,
          columnNumber: 14
        }, this),
        /* @__PURE__ */ jsxDEV55("div", { children: [
          /* @__PURE__ */ jsxDEV55("label", { htmlFor: "filterAction", className: "text-sm font-medium mr-2", children: "Action:" }, void 0, !1, {
            fileName: "app/components/admin/BackupRestore.tsx",
            lineNumber: 374,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV55(
            "select",
            {
              id: "filterAction",
              value: filterAction,
              onChange: (e) => setFilterAction(e.target.value),
              className: "px-3 py-1 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm",
              children: [
                /* @__PURE__ */ jsxDEV55("option", { value: "", children: "All Actions" }, void 0, !1, {
                  fileName: "app/components/admin/BackupRestore.tsx",
                  lineNumber: 381,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV55("option", { value: "Import", children: "Import" }, void 0, !1, {
                  fileName: "app/components/admin/BackupRestore.tsx",
                  lineNumber: 382,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV55("option", { value: "Export", children: "Export" }, void 0, !1, {
                  fileName: "app/components/admin/BackupRestore.tsx",
                  lineNumber: 383,
                  columnNumber: 21
                }, this)
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/components/admin/BackupRestore.tsx",
              lineNumber: 375,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/components/admin/BackupRestore.tsx",
          lineNumber: 373,
          columnNumber: 14
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/admin/BackupRestore.tsx",
        lineNumber: 362,
        columnNumber: 10
      }, this),
      /* @__PURE__ */ jsxDEV55("div", { className: "overflow-x-auto border rounded dark:border-gray-700", children: /* @__PURE__ */ jsxDEV55("table", { className: "min-w-full divide-y divide-gray-200 dark:divide-gray-700", children: [
        /* @__PURE__ */ jsxDEV55("thead", { className: "bg-gray-50 dark:bg-gray-800", children: /* @__PURE__ */ jsxDEV55("tr", { children: [
          /* @__PURE__ */ jsxDEV55("th", { scope: "col", className: "px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400", children: "Timestamp" }, void 0, !1, {
            fileName: "app/components/admin/BackupRestore.tsx",
            lineNumber: 393,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV55("th", { scope: "col", className: "px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400", children: "Action" }, void 0, !1, {
            fileName: "app/components/admin/BackupRestore.tsx",
            lineNumber: 394,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV55("th", { scope: "col", className: "px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400", children: "Details" }, void 0, !1, {
            fileName: "app/components/admin/BackupRestore.tsx",
            lineNumber: 395,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV55("th", { scope: "col", className: "px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400", children: "Performed By" }, void 0, !1, {
            fileName: "app/components/admin/BackupRestore.tsx",
            lineNumber: 396,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV55("th", { scope: "col", className: "px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400", children: "Status" }, void 0, !1, {
            fileName: "app/components/admin/BackupRestore.tsx",
            lineNumber: 397,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/admin/BackupRestore.tsx",
          lineNumber: 392,
          columnNumber: 15
        }, this) }, void 0, !1, {
          fileName: "app/components/admin/BackupRestore.tsx",
          lineNumber: 391,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV55("tbody", { className: "bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700", children: filteredAuditLog.length === 0 ? /* @__PURE__ */ jsxDEV55("tr", { children: /* @__PURE__ */ jsxDEV55("td", { colSpan: 5, className: "px-4 py-3 text-center text-sm text-gray-500 dark:text-gray-400", children: "No audit log entries found matching your criteria." }, void 0, !1, {
          fileName: "app/components/admin/BackupRestore.tsx",
          lineNumber: 403,
          columnNumber: 19
        }, this) }, void 0, !1, {
          fileName: "app/components/admin/BackupRestore.tsx",
          lineNumber: 402,
          columnNumber: 17
        }, this) : filteredAuditLog.map((log) => /* @__PURE__ */ jsxDEV55("tr", { children: [
          /* @__PURE__ */ jsxDEV55("td", { className: "px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400", children: new Date(log.timestamp).toLocaleString() }, void 0, !1, {
            fileName: "app/components/admin/BackupRestore.tsx",
            lineNumber: 410,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV55("td", { className: "px-4 py-3 whitespace-nowrap text-sm font-medium", children: /* @__PURE__ */ jsxDEV55("span", { className: `px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${log.actionType === "Import" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"}`, children: log.actionType }, void 0, !1, {
            fileName: "app/components/admin/BackupRestore.tsx",
            lineNumber: 412,
            columnNumber: 25
          }, this) }, void 0, !1, {
            fileName: "app/components/admin/BackupRestore.tsx",
            lineNumber: 411,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV55("td", { className: "px-4 py-3 text-sm text-gray-500 dark:text-gray-400", children: [
            log.fileName ? `File: ${log.fileName}` : "",
            log.modules ? ` Modules: ${log.modules.join(", ")}` : "",
            log.details ? /* @__PURE__ */ jsxDEV55("p", { className: "text-xs text-red-600 dark:text-red-400 mt-1", children: log.details }, void 0, !1, {
              fileName: "app/components/admin/BackupRestore.tsx",
              lineNumber: 419,
              columnNumber: 40
            }, this) : ""
          ] }, void 0, !0, {
            fileName: "app/components/admin/BackupRestore.tsx",
            lineNumber: 416,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV55("td", { className: "px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400", children: log.performedBy }, void 0, !1, {
            fileName: "app/components/admin/BackupRestore.tsx",
            lineNumber: 421,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV55("td", { className: "px-4 py-3 whitespace-nowrap text-sm", children: /* @__PURE__ */ jsxDEV55("span", { className: `px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${log.status === "Success" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : log.status === "Failed" ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"}`, children: log.status }, void 0, !1, {
            fileName: "app/components/admin/BackupRestore.tsx",
            lineNumber: 423,
            columnNumber: 24
          }, this) }, void 0, !1, {
            fileName: "app/components/admin/BackupRestore.tsx",
            lineNumber: 422,
            columnNumber: 21
          }, this)
        ] }, log.id, !0, {
          fileName: "app/components/admin/BackupRestore.tsx",
          lineNumber: 409,
          columnNumber: 19
        }, this)) }, void 0, !1, {
          fileName: "app/components/admin/BackupRestore.tsx",
          lineNumber: 400,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/admin/BackupRestore.tsx",
        lineNumber: 390,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/components/admin/BackupRestore.tsx",
        lineNumber: 389,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/admin/BackupRestore.tsx",
      lineNumber: 359,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/admin/BackupRestore.tsx",
    lineNumber: 186,
    columnNumber: 5
  }, this);
}

// app/components/admin/MasterTabContent.tsx
import { jsxDEV as jsxDEV56 } from "react/jsx-dev-runtime";
function MasterTabContent({ groups, users }) {
  return /* @__PURE__ */ jsxDEV56("div", { className: "p-4 border rounded-b-md dark:border-gray-700 bg-gray-50 dark:bg-gray-950 space-y-6", children: [
    /* @__PURE__ */ jsxDEV56(GroupsManagement, { groups, users }, void 0, !1, {
      fileName: "app/components/admin/MasterTabContent.tsx",
      lineNumber: 16,
      columnNumber: 8
    }, this),
    /* @__PURE__ */ jsxDEV56(EssenceSettings, {}, void 0, !1, {
      fileName: "app/components/admin/MasterTabContent.tsx",
      lineNumber: 17,
      columnNumber: 8
    }, this),
    /* @__PURE__ */ jsxDEV56(BackupRestore, {}, void 0, !1, {
      fileName: "app/components/admin/MasterTabContent.tsx",
      lineNumber: 18,
      columnNumber: 8
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/admin/MasterTabContent.tsx",
    lineNumber: 14,
    columnNumber: 5
  }, this);
}

// app/components/admin/AdminTabs.tsx
import { UsersRoundIcon, SettingsIcon } from "lucide-react";
import { jsxDEV as jsxDEV57 } from "react/jsx-dev-runtime";
function AdminTabs({ users, groups, transactions, actionData, navigation }) {
  let [selectedIndex, setSelectedIndex] = useState33(0), tabs = [
    {
      name: "Users",
      icon: /* @__PURE__ */ jsxDEV57(UsersRoundIcon, { className: "h-5 w-5 mr-2" }, void 0, !1, {
        fileName: "app/components/admin/AdminTabs.tsx",
        lineNumber: 24,
        columnNumber: 13
      }, this),
      component: /* @__PURE__ */ jsxDEV57(UsersTabContent, { users, groups, navigation, actionData }, void 0, !1, {
        fileName: "app/components/admin/AdminTabs.tsx",
        lineNumber: 25,
        columnNumber: 18
      }, this)
    },
    {
      name: "Master",
      icon: /* @__PURE__ */ jsxDEV57(SettingsIcon, { className: "h-5 w-5 mr-2" }, void 0, !1, {
        fileName: "app/components/admin/AdminTabs.tsx",
        lineNumber: 29,
        columnNumber: 13
      }, this),
      component: /* @__PURE__ */ jsxDEV57(MasterTabContent, { groups, users }, void 0, !1, {
        fileName: "app/components/admin/AdminTabs.tsx",
        lineNumber: 30,
        columnNumber: 18
      }, this)
    }
  ];
  return /* @__PURE__ */ jsxDEV57("div", { className: "w-full px-2 py-4 sm:px-0", children: /* @__PURE__ */ jsxDEV57(Tab3.Group, { selectedIndex, onChange: setSelectedIndex, children: [
    /* @__PURE__ */ jsxDEV57(Tab3.List, { className: "flex space-x-1 rounded-xl bg-gray-100 p-1 dark:bg-gray-800", children: tabs.map((tab) => /* @__PURE__ */ jsxDEV57(
      Tab3,
      {
        className: ({ selected }) => `w-full flex items-center justify-center rounded-lg py-2.5 text-sm font-medium leading-5
                ring-blue-500 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2
                ${selected ? "bg-white text-blue-700 shadow dark:bg-gray-700 dark:text-white" : "text-gray-600 hover:bg-white/[0.12] hover:text-blue-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"}`,
        children: [
          tab.icon,
          tab.name
        ]
      },
      tab.name,
      !0,
      {
        fileName: "app/components/admin/AdminTabs.tsx",
        lineNumber: 39,
        columnNumber: 13
      },
      this
    )) }, void 0, !1, {
      fileName: "app/components/admin/AdminTabs.tsx",
      lineNumber: 37,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV57(Tab3.Panels, { className: "mt-2", children: tabs.map((tab, idx) => /* @__PURE__ */ jsxDEV57(
      Tab3.Panel,
      {
        className: "rounded-xl bg-white p-3 ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 dark:bg-gray-900",
        children: tab.component
      },
      idx,
      !1,
      {
        fileName: "app/components/admin/AdminTabs.tsx",
        lineNumber: 57,
        columnNumber: 13
      },
      this
    )) }, void 0, !1, {
      fileName: "app/components/admin/AdminTabs.tsx",
      lineNumber: 55,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/admin/AdminTabs.tsx",
    lineNumber: 36,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/components/admin/AdminTabs.tsx",
    lineNumber: 35,
    columnNumber: 5
  }, this);
}

// app/components/dashboard/SuperAdminDashboard.tsx
import { jsxDEV as jsxDEV58 } from "react/jsx-dev-runtime";
function SuperAdminDashboard({ users, groups, transactions, actionData, navigation }) {
  return /* @__PURE__ */ jsxDEV58("div", { className: "space-y-6", children: /* @__PURE__ */ jsxDEV58(
    AdminTabs,
    {
      users,
      groups,
      transactions,
      actionData,
      navigation
    },
    void 0,
    !1,
    {
      fileName: "app/components/dashboard/SuperAdminDashboard.tsx",
      lineNumber: 18,
      columnNumber: 7
    },
    this
  ) }, void 0, !1, {
    fileName: "app/components/dashboard/SuperAdminDashboard.tsx",
    lineNumber: 16,
    columnNumber: 5
  }, this);
}

// app/routes/admin.tsx
import { useEffect as useEffect25 } from "react";
import { jsxDEV as jsxDEV59 } from "react/jsx-dev-runtime";
var meta6 = () => [
  { title: "Life Economy - Admin" },
  { name: "description", content: "Super Admin exclusive area for critical system operations." }
];
async function loader8({ request }) {
  let users = [], groups = [], transactions = [], { data: usersData, error: usersError } = await supabase_admin_default.from("profiles").select("id, email, full_name, balance, role, created_at, group_id, is_suspended");
  usersError ? console.error("Error fetching users:", usersError) : users = usersData;
  let { data: groupsData, error: groupsError } = await supabase_admin_default.from("groups").select("id, name, description, created_at");
  groupsError ? console.error("Error fetching groups:", groupsError) : groups = groupsData;
  let { data: transactionsData, error: transactionsError } = await supabase_admin_default.from("transactions").select("*");
  return transactionsError ? console.error("Error fetching transactions:", transactionsError) : transactions = transactionsData, json8({
    users,
    groups,
    transactions
  });
}
async function action5({ request }) {
  let formData = await request.formData();
  switch (formData.get("_intent")) {
    case "suspend-user": {
      let userId = formData.get("userId"), { error } = await supabase_admin_default.from("profiles").update({ is_suspended: !0 }).eq("id", userId);
      return error ? (console.error("Error suspending user:", error), json8({ success: !1, message: "Failed to suspend user.", intent: "suspend-user" }, { status: 500 })) : json8({ success: !0, message: "User suspended successfully.", intent: "suspend-user" });
    }
    case "restore-user": {
      let userId = formData.get("userId"), { error } = await supabase_admin_default.from("profiles").update({ is_suspended: !1 }).eq("id", userId);
      return error ? (console.error("Error restoring user:", error), json8({ success: !1, message: "Failed to restore user.", intent: "restore-user" }, { status: 500 })) : json8({ success: !0, message: "User restored successfully.", intent: "restore-user" });
    }
    case "change-user-role": {
      let userId = formData.get("userId"), newRole = formData.get("newRole"), { error } = await supabase_admin_default.from("profiles").update({ role: newRole }).eq("id", userId);
      return error ? (console.error("Error changing user role:", error), json8({ success: !1, message: "Failed to change user role.", intent: "change-user-role" }, { status: 500 })) : json8({ success: !0, message: `User role changed to ${newRole} successfully.`, intent: "change-user-role" });
    }
    case "delete-user": {
      let userId = formData.get("userId"), { error } = await supabase_admin_default.from("profiles").delete().eq("id", userId);
      return error ? (console.error("Error deleting user:", error), json8({ success: !1, message: "Failed to delete user.", intent: "delete-user" }, { status: 500 })) : json8({ success: !0, message: "User deleted successfully.", intent: "delete-user" });
    }
    case "create-user": {
      let email = formData.get("email"), fullName = formData.get("fullName"), role = formData.get("role"), groupId = formData.get("groupId"), password = formData.get("password"), { data: authData, error: authError } = await supabase_admin_default.auth.admin.createUser({
        email,
        password,
        email_confirm: !1
        // Disable email confirmation
      });
      if (authError)
        return console.error("Error creating auth user:", authError), json8({ success: !1, message: authError.message, intent: "create-user" }, { status: 400 });
      let { error: profileError } = await supabase_admin_default.from("profiles").insert({
        id: authData.user?.id,
        email,
        full_name: fullName,
        role,
        group_id: groupId === "" ? null : groupId,
        // Handle empty group_id
        balance: 0,
        // Default balance
        is_suspended: !1
        // Default status
      });
      return profileError ? (console.error("Error creating user profile:", profileError), await supabase_admin_default.auth.admin.deleteUser(authData.user?.id), json8({ success: !1, message: profileError.message, intent: "create-user" }, { status: 500 })) : json8({ success: !0, message: "User created successfully.", intent: "create-user" });
    }
    case "update-user": {
      let userId = formData.get("userId"), fullName = formData.get("fullName"), role = formData.get("role"), groupId = formData.get("groupId"), balance = parseFloat(formData.get("balance")), { error } = await supabase_admin_default.from("profiles").update({
        full_name: fullName,
        role,
        group_id: groupId === "" ? null : groupId,
        balance
      }).eq("id", userId);
      return error ? (console.error("Error updating user:", error), json8({ success: !1, message: "Failed to update user.", intent: "update-user" }, { status: 500 })) : json8({ success: !0, message: "User updated successfully.", intent: "update-user" });
    }
    case "change-password": {
      let userId = formData.get("userId"), newPassword = formData.get("newPassword"), { error } = await supabase_admin_default.auth.admin.updateUserById(userId, {
        password: newPassword
      });
      return error ? (console.error("Error changing password:", error), json8({ success: !1, message: error.message, intent: "change-password" }, { status: 500 })) : json8({ success: !0, message: "Password changed successfully.", intent: "change-password" });
    }
    case "create-group": {
      let name = formData.get("name"), description = formData.get("description"), { error } = await supabase_admin_default.from("groups").insert({ name, description });
      return error ? (console.error("Error creating group:", error), json8({ success: !1, message: "Failed to create group.", intent: "create-group" }, { status: 500 })) : json8({ success: !0, message: "Group created successfully.", intent: "create-group" });
    }
    case "update-group": {
      let groupId = formData.get("groupId"), name = formData.get("name"), description = formData.get("description"), { error } = await supabase_admin_default.from("groups").update({ name, description }).eq("id", groupId);
      return error ? (console.error("Error updating group:", error), json8({ success: !1, message: "Failed to update group.", intent: "update-group" }, { status: 500 })) : json8({ success: !0, message: "Group updated successfully.", intent: "update-group" });
    }
    case "delete-group": {
      let groupId = formData.get("groupId"), { error } = await supabase_admin_default.from("groups").delete().eq("id", groupId);
      return error ? (console.error("Error deleting group:", error), json8({ success: !1, message: "Failed to delete group.", intent: "delete-group" }, { status: 500 })) : json8({ success: !0, message: "Group deleted successfully.", intent: "delete-group" });
    }
    default:
      return json8({ success: !1, message: "Invalid intent.", intent: "unknown" }, { status: 400 });
  }
}
function AdminPage() {
  let { users, groups, transactions } = useLoaderData7(), actionData = useActionData13(), navigation = useNavigation11();
  return useEffect25(() => {
    let storeState = useStore.getState();
    storeState && typeof storeState.setUsers == "function" && typeof storeState.setGroups == "function" && typeof storeState.setTransactions == "function" ? (users && storeState.setUsers(users), groups && storeState.setGroups(groups), transactions && storeState.setTransactions(transactions)) : console.error("Zustand store setters not available.");
  }, [users, groups, transactions]), useEffect25(() => {
    actionData?.success ? console.log(actionData.message) : actionData?.message && console.error(actionData.message);
  }, [actionData]), /* @__PURE__ */ jsxDEV59("div", { className: "container mx-auto p-4 md:p-6", children: [
    /* @__PURE__ */ jsxDEV59("h1", { className: "text-2xl font-semibold mb-4", children: "Admin Console" }, void 0, !1, {
      fileName: "app/routes/admin.tsx",
      lineNumber: 272,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV59(
      SuperAdminDashboard,
      {
        users,
        groups,
        transactions,
        actionData,
        navigation
      },
      void 0,
      !1,
      {
        fileName: "app/routes/admin.tsx",
        lineNumber: 274,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/routes/admin.tsx",
    lineNumber: 271,
    columnNumber: 5
  }, this);
}

// app/routes/login.tsx
var login_exports = {};
__export(login_exports, {
  action: () => action6,
  default: () => LoginPage,
  loader: () => loader9,
  meta: () => meta7
});
import { json as json9, redirect as redirect7 } from "@remix-run/node";
import { Form as Form19, useActionData as useActionData14, useNavigation as useNavigation12 } from "@remix-run/react";
import { jsxDEV as jsxDEV60 } from "react/jsx-dev-runtime";
var meta7 = () => [{ title: "Life Economy - Login" }];
async function loader9({ request }) {
  return await getAuthSession(request) ? redirect7("/") : json9({});
}
async function action6({ request }) {
  let formData = await request.formData(), email = formData.get("email")?.toString(), password = formData.get("password")?.toString();
  if (!email || !password)
    return json9({ error: "Email and password are required." }, { status: 400 });
  let { data, error, headers } = await signIn(request, { email, password });
  return error ? json9({ error }, { status: 401, headers }) : redirect7("/", { headers });
}
function LoginPage() {
  let actionData = useActionData14(), isSubmitting = useNavigation12().state === "submitting";
  return /* @__PURE__ */ jsxDEV60("div", { className: "flex min-h-screen items-center justify-center bg-gray-100 px-4 dark:bg-gray-950", children: /* @__PURE__ */ jsxDEV60("div", { className: "w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-gray-900", children: [
    /* @__PURE__ */ jsxDEV60("h2", { className: "mb-6 text-center text-3xl font-bold text-gray-900 dark:text-white", children: "Sign In to Life Economy" }, void 0, !1, {
      fileName: "app/routes/login.tsx",
      lineNumber: 47,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV60(Form19, { method: "post", className: "space-y-6", children: [
      /* @__PURE__ */ jsxDEV60("div", { children: [
        /* @__PURE__ */ jsxDEV60(
          "label",
          {
            htmlFor: "email",
            className: "block text-sm font-medium text-gray-700 dark:text-gray-300",
            children: "Email address"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/login.tsx",
            lineNumber: 52,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV60("div", { className: "mt-1", children: /* @__PURE__ */ jsxDEV60(
          "input",
          {
            id: "email",
            name: "email",
            type: "email",
            autoComplete: "email",
            required: !0,
            className: "block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 sm:text-sm"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/login.tsx",
            lineNumber: 59,
            columnNumber: 15
          },
          this
        ) }, void 0, !1, {
          fileName: "app/routes/login.tsx",
          lineNumber: 58,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/login.tsx",
        lineNumber: 51,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV60("div", { children: [
        /* @__PURE__ */ jsxDEV60(
          "label",
          {
            htmlFor: "password",
            className: "block text-sm font-medium text-gray-700 dark:text-gray-300",
            children: "Password"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/login.tsx",
            lineNumber: 71,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV60("div", { className: "mt-1", children: /* @__PURE__ */ jsxDEV60(
          "input",
          {
            id: "password",
            name: "password",
            type: "password",
            autoComplete: "current-password",
            required: !0,
            className: "block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 sm:text-sm"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/login.tsx",
            lineNumber: 78,
            columnNumber: 15
          },
          this
        ) }, void 0, !1, {
          fileName: "app/routes/login.tsx",
          lineNumber: 77,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/login.tsx",
        lineNumber: 70,
        columnNumber: 11
      }, this),
      actionData?.error && /* @__PURE__ */ jsxDEV60("p", { className: "text-sm text-red-600 dark:text-red-400", children: actionData.error }, void 0, !1, {
        fileName: "app/routes/login.tsx",
        lineNumber: 90,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV60("div", { children: /* @__PURE__ */ jsxDEV60(
        "button",
        {
          type: "submit",
          className: "flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-offset-gray-900",
          disabled: isSubmitting,
          children: isSubmitting ? "Signing In..." : "Sign In"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/login.tsx",
          lineNumber: 96,
          columnNumber: 13
        },
        this
      ) }, void 0, !1, {
        fileName: "app/routes/login.tsx",
        lineNumber: 95,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/login.tsx",
      lineNumber: 50,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/login.tsx",
    lineNumber: 46,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/login.tsx",
    lineNumber: 45,
    columnNumber: 5
  }, this);
}

// app/routes/_app.tsx
var app_exports = {};
__export(app_exports, {
  default: () => Layout2,
  loader: () => loader10
});
import { Outlet as Outlet2, useLoaderData as useLoaderData8 } from "@remix-run/react";
import { json as json10 } from "@remix-run/node";
import { useEffect as useEffect26 } from "react";
import { jsxDEV as jsxDEV61 } from "react/jsx-dev-runtime";
async function loader10({ request }) {
  let { data: users, error } = await supabase.from("profiles").select("id, full_name, balance");
  return error ? (console.error("Error fetching users in layout loader:", error), json10({ users: [] })) : json10({ users });
}
function Layout2() {
  let { users } = useLoaderData8(), setUsers = useStore((state) => state.setUsers), isStoreReady = useStore((state) => !!state.setUsers);
  return useEffect26(() => {
    if (isStoreReady && users) {
      let storeUsers = users.map((user) => ({
        id: user.id,
        fullName: user.full_name || "Unknown User",
        // Handle potential null full_name
        balance: user.balance || 0
        // Handle potential null balance
        // Add other user properties if needed by the store/app
      }));
      setUsers(storeUsers);
    }
  }, [isStoreReady, users, setUsers]), /* @__PURE__ */ jsxDEV61("div", { className: "min-h-screen bg-background", children: /* @__PURE__ */ jsxDEV61("main", { className: "container mx-auto py-8 px-4", children: [
    /* @__PURE__ */ jsxDEV61(Outlet2, {}, void 0, !1, {
      fileName: "app/routes/_app.tsx",
      lineNumber: 50,
      columnNumber: 9
    }, this),
    " "
  ] }, void 0, !0, {
    fileName: "app/routes/_app.tsx",
    lineNumber: 49,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/_app.tsx",
    lineNumber: 47,
    columnNumber: 5
  }, this);
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-GWNLWJOI.js", imports: ["/build/_shared/chunk-O4BRYNJ4.js", "/build/_shared/chunk-6LJYTYAE.js", "/build/_shared/chunk-U4FRFQSK.js", "/build/_shared/chunk-XGOTYLZ5.js", "/build/_shared/chunk-7M6SC7J5.js", "/build/_shared/chunk-U5E2PCIK.js", "/build/_shared/chunk-UWV35TSL.js", "/build/_shared/chunk-PNG5AS42.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-L62FXQAZ.js", imports: ["/build/_shared/chunk-X6HWNA6P.js", "/build/_shared/chunk-KHBLHEPB.js", "/build/_shared/chunk-OW4LD7OY.js", "/build/_shared/chunk-MUUU2TT6.js", "/build/_shared/chunk-PH7FC7E6.js", "/build/_shared/chunk-X2UCJLGP.js", "/build/_shared/chunk-G7CHZRZX.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !0 }, "routes/_app": { id: "routes/_app", parentId: "root", path: void 0, index: void 0, caseSensitive: void 0, module: "/build/routes/_app-GVKBQPT7.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-U7E2WJ52.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/admin": { id: "routes/admin", parentId: "root", path: "admin", index: void 0, caseSensitive: void 0, module: "/build/routes/admin-V4MFBZPV.js", imports: ["/build/_shared/chunk-KXL53RSK.js", "/build/_shared/chunk-P5VLRVCV.js", "/build/_shared/chunk-GULYIQQM.js", "/build/_shared/chunk-PGSXFMOW.js", "/build/_shared/chunk-NYNU5XW3.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/dashboard": { id: "routes/dashboard", parentId: "root", path: "dashboard", index: void 0, caseSensitive: void 0, module: "/build/routes/dashboard-56HNK2ZQ.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/login": { id: "routes/login", parentId: "root", path: "login", index: void 0, caseSensitive: void 0, module: "/build/routes/login-VH3KYJK7.js", imports: void 0, hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/logout": { id: "routes/logout", parentId: "root", path: "logout", index: void 0, caseSensitive: void 0, module: "/build/routes/logout-JAIKBCTD.js", imports: void 0, hasAction: !0, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/management": { id: "routes/management", parentId: "root", path: "management", index: void 0, caseSensitive: void 0, module: "/build/routes/management-754ZOZKV.js", imports: ["/build/_shared/chunk-XAPJPHCM.js", "/build/_shared/chunk-P5VLRVCV.js", "/build/_shared/chunk-NTBHBIZX.js", "/build/_shared/chunk-B43JI2TA.js", "/build/_shared/chunk-PGSXFMOW.js", "/build/_shared/chunk-NYNU5XW3.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/market": { id: "routes/market", parentId: "root", path: "market", index: void 0, caseSensitive: void 0, module: "/build/routes/market-2YZPY6ZI.js", imports: ["/build/_shared/chunk-KXL53RSK.js", "/build/_shared/chunk-XAPJPHCM.js", "/build/_shared/chunk-GULYIQQM.js", "/build/_shared/chunk-PGSXFMOW.js", "/build/_shared/chunk-NYNU5XW3.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/reports": { id: "routes/reports", parentId: "root", path: "reports", index: void 0, caseSensitive: void 0, module: "/build/routes/reports-35V5CQJ2.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/reports.security-log": { id: "routes/reports.security-log", parentId: "routes/reports", path: "security-log", index: void 0, caseSensitive: void 0, module: "/build/routes/reports.security-log-6Q6K5M5I.js", imports: ["/build/_shared/chunk-NYNU5XW3.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/settings": { id: "routes/settings", parentId: "root", path: "settings", index: void 0, caseSensitive: void 0, module: "/build/routes/settings-RM7BO6JQ.js", imports: ["/build/_shared/chunk-GULYIQQM.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !0 }, "routes/transactions": { id: "routes/transactions", parentId: "root", path: "transactions", index: void 0, caseSensitive: void 0, module: "/build/routes/transactions-YKKWVADM.js", imports: ["/build/_shared/chunk-46QPPEQM.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/transfer": { id: "routes/transfer", parentId: "root", path: "transfer", index: void 0, caseSensitive: void 0, module: "/build/routes/transfer-BN4PNT3P.js", imports: ["/build/_shared/chunk-NTBHBIZX.js", "/build/_shared/chunk-B43JI2TA.js", "/build/_shared/chunk-PGSXFMOW.js", "/build/_shared/chunk-NYNU5XW3.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 } }, version: "d9d5d340", hmr: { runtime: "/build/_shared/chunk-U5E2PCIK.js", timestamp: 1750523367388 }, url: "/build/manifest-D9D5D340.js" };

// server-entry-module:@remix-run/dev/server-build
var mode = "development", assetsBuildDirectory = "public/build", future = { v3_fetcherPersist: !1, v3_relativeSplatPath: !1, v3_throwAbortReason: !1, v3_routeConfig: !1, v3_singleFetch: !1, v3_lazyRouteDiscovery: !1, unstable_optimizeDeps: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/reports.security-log": {
    id: "routes/reports.security-log",
    parentId: "routes/reports",
    path: "security-log",
    index: void 0,
    caseSensitive: void 0,
    module: reports_security_log_exports
  },
  "routes/transactions": {
    id: "routes/transactions",
    parentId: "root",
    path: "transactions",
    index: void 0,
    caseSensitive: void 0,
    module: transactions_exports
  },
  "routes/management": {
    id: "routes/management",
    parentId: "root",
    path: "management",
    index: void 0,
    caseSensitive: void 0,
    module: management_exports
  },
  "routes/dashboard": {
    id: "routes/dashboard",
    parentId: "root",
    path: "dashboard",
    index: void 0,
    caseSensitive: void 0,
    module: dashboard_exports
  },
  "routes/settings": {
    id: "routes/settings",
    parentId: "root",
    path: "settings",
    index: void 0,
    caseSensitive: void 0,
    module: settings_exports
  },
  "routes/transfer": {
    id: "routes/transfer",
    parentId: "root",
    path: "transfer",
    index: void 0,
    caseSensitive: void 0,
    module: transfer_exports
  },
  "routes/reports": {
    id: "routes/reports",
    parentId: "root",
    path: "reports",
    index: void 0,
    caseSensitive: void 0,
    module: reports_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  },
  "routes/logout": {
    id: "routes/logout",
    parentId: "root",
    path: "logout",
    index: void 0,
    caseSensitive: void 0,
    module: logout_exports
  },
  "routes/market": {
    id: "routes/market",
    parentId: "root",
    path: "market",
    index: void 0,
    caseSensitive: void 0,
    module: market_exports
  },
  "routes/admin": {
    id: "routes/admin",
    parentId: "root",
    path: "admin",
    index: void 0,
    caseSensitive: void 0,
    module: admin_exports
  },
  "routes/login": {
    id: "routes/login",
    parentId: "root",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: login_exports
  },
  "routes/_app": {
    id: "routes/_app",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: app_exports
  }
};
export {
  assets_manifest_default as assets,
  assetsBuildDirectory,
  entry,
  future,
  mode,
  publicPath,
  routes
};
//# sourceMappingURL=index.js.map
