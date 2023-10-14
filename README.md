# Strapi4 plugin server route permission

Inspired from [strapi-plugin-route-permission](https://github.com/andreciornavei/strapi-plugin-route-permission), same plugin but for strapi V3.

A plugin for [Strapi](https://github.com/strapi/strapi) that provides the ability to config roles on server route for generate permissions.

[![Downloads](https://img.shields.io/npm/dm/strapi-plugin-server-route-permission?style=for-the-badge)](https://www.npmjs.com/package/strapi-plugin-server-route-permission)
[![Install size](https://img.shields.io/npm/l/strapi-plugin-server-route-permission?style=for-the-badge)](https://github.com/PaulRichez/strapi4-plugin-route-permission/blob/main/Licence)

## 🚀 &nbsp; _Overview_

This plugin implements a simple way to seed strapi users-permissions from routes configuration (only server). It means that you can define your routes permissions direcly on route files. So every time your server ups, it will recreate yours routes permissions from your route config, allowing you to migrate your application without worrying about redefine your routes permissions over strapi panel.

⚠️ **this plugin create route permission but don't delete any route permission**

---

## ⏳ &nbsp; _Installation_

With npm:

```bash
npm install strapi-plugin-server-route-permission
```

With yarn:

```bash
yarn add strapi-plugin-server-route-permission
```

---

## ✨ &nbsp; _Getting Started_

Add an array of roles on each route configuration

### Examples:

Core route example :

```js
"use strict";

"use strict";

/**
 * restaurant router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::restaurant.restaurant", {
  config: {
    find: {
      // @ts-ignore
      roles: ["authenticated", "public"],
    },
    create: {
      // @ts-ignore
      roles: ["authenticated"],
    },
    findOne: {
      // @ts-ignore
      roles: ["authenticated", "public", "test"],
    },
    update: {
      // @ts-ignore
      roles: ["authenticated"],
    },
    delete: {
      // @ts-ignore
      roles: ["authenticated"],
    },
  },
});
```

custom route :

```js
// server/routes/task.js
"use strict";

/**
 *  router.
 */

module.exports = {
  type: "content-api",
  routes: [
    {
      method: "POST",
      path: "/user/update-avatar",
      handler: "user.updateAvatar",
      config: {
        // @ts-ignore
        roles: ["authenticated"],
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "DELETE",
      path: "/user/delete-avatar",
      handler: "user.deleteAvatar",
      config: {
        // @ts-ignore
        roles: ["authenticated"],
      },
    },
    {
      method: "GET",
      path: "/avatar/:id",
      handler: "avatar.getAvatar",
      config: {
        // @ts-ignore
        roles: ["authenticated"],
      },
    },
  ],
};
```

## 🎉 &nbsp; _Result_

On strapi startup it add only new permission configured in your route config

![](./docs/console.png)
![](./docs/result.png)

Configurated routes are visible on admin panel :
![](./docs/admin.png)

if admin remove a permission from admin panel, you got the log and the route is'nt configured
![](./docs/result_removed_by_admin.png)
![](./docs/role_deleted_admin.png)

You can restore via settings on admin panel, this remove the configured routes history and reconfigure route which was deleted from the admin on next restart
![](./docs/settings.png)
![](./docs/restart_after_restore.png)

## 🐛 &nbsp; _Bugs_

If any bugs are found please report them as a [Github Issue](https://github.com/PaulRichez/strapi4-plugin-route-permission/issues)

### Typescript support problem

[Issue](https://github.com/PaulRichez/strapi4-plugin-route-permission/issues/7)
You can put this line upside the role propertie : // @ts-ignore
