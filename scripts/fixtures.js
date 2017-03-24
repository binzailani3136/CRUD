var mongoose = require('mongoose');

exports.User = {
    user_demo: {
        _id: mongoose.Types.ObjectId(),
        username: "demo",
        first_name: "John",
        last_name: "Doe",
        is_active: true,
        is_staff: true,
        password: "demo",
        date_joined: "2016-06-28T08:45:14.078"
    },
    user_editor: {
        _id: mongoose.Types.ObjectId(),
        username: "editor",
        first_name: "Joe",
        last_name: "Bloggs",
        is_active: true,
        is_staff: true,
        password: "editor",
        date_joined: "2016-06-28T08:45:14.078"
    },
    user_admin: {
        _id: mongoose.Types.ObjectId(),
        username: "admin",
        first_name: "Jane",
        last_name: "Citizen",
        is_active: true,
        is_staff: true,
        password: "admin",
        date_joined: "2016-06-28T08:45:14.078"
    }
}

exports.Section = {
    section_news: {
        _id: mongoose.Types.ObjectId(),
        name: "News",
        slug: "news",
        position: 0,
    },
    section_updates: {
        _id: mongoose.Types.ObjectId(),
        name: "Updates",
        slug: "updates",
        position: 1,
    },
    section_help: {
        _id: mongoose.Types.ObjectId(),
        name: "Help",
        slug: "help",
        position: 2,
    },
    section_faq: {
        _id: mongoose.Types.ObjectId(),
        name: "FAQ",
        slug: "faq",
        position: 3,
    }
}

exports.Category = {
    category_updates_core: {
        _id: mongoose.Types.ObjectId(),
        section: exports.Section.section_updates._id,
        name: "Core",
        slug: "core",
        position: 0,
    },
    category_updates_ui: {
        _id: mongoose.Types.ObjectId(),
        section: exports.Section.section_updates._id,
        name: "UI",
        slug: "ui",
        position: 1,
    },
    category_updates_cli: {
        _id: mongoose.Types.ObjectId(),
        section: exports.Section.section_updates._id,
        name: "CLI",
        slug: "cli",
        position: 2,
    },
    category_updates_documentation: {
        _id: mongoose.Types.ObjectId(),
        section: exports.Section.section_updates._id,
        name: "Documentation",
        slug: "documentation",
        position: 3,
    },
    category_updates_examples: {
        _id: mongoose.Types.ObjectId(),
        section: exports.Section.section_updates._id,
        name: "Examples",
        slug: "examples",
        position: 4,
    },
    category_help_general: {
        _id: mongoose.Types.ObjectId(),
        section: exports.Section.section_help._id,
        name: "General",
        slug: "general",
        position: 0,
    },
    category_help_installation: {
        _id: mongoose.Types.ObjectId(),
        section: exports.Section.section_help._id,
        name: "Installation",
        slug: "installation",
        position: 1,
    },
    category_help_usage: {
        _id: mongoose.Types.ObjectId(),
        section: exports.Section.section_help._id,
        name: "Usage",
        slug: "usage",
        position: 2,
    },
    category_help_customization: {
        _id: mongoose.Types.ObjectId(),
        section: exports.Section.section_help._id,
        name: "Customization",
        slug: "customization",
        position: 3,
    },
    category_help_api: {
        _id: mongoose.Types.ObjectId(),
        section: exports.Section.section_help._id,
        name: "API",
        slug: "api",
        position: 4,
    },
    category_help_examples: {
        _id: mongoose.Types.ObjectId(),
        section: exports.Section.section_help._id,
        name: "Examples",
        slug: "examples",
        position: 5,
    },
}

exports.Tag = {
    tag_backend: {
        _id: mongoose.Types.ObjectId(),
        name: "backend",
        slug: "backend"
    },
    tag_frontend: {
        _id: mongoose.Types.ObjectId(),
        name: "frontend",
        slug: "frontend"
    },
    tag_admin: {
        _id: mongoose.Types.ObjectId(),
        name: "admin",
        slug: "admin"
    },
    tag_ui: {
        _id: mongoose.Types.ObjectId(),
        name: "ui",
        slug: "ui"
    },
    tag_ux: {
        _id: mongoose.Types.ObjectId(),
        name: "ux",
        slug: "ux"
    },
    tag_usability: {
        _id: mongoose.Types.ObjectId(),
        name: "usability",
        slug: "usability"
    },
    tag_connector: {
        _id: mongoose.Types.ObjectId(),
        name: "connector",
        slug: "connector"
    },
    tag_descriptor: {
        _id: mongoose.Types.ObjectId(),
        name: "descriptor",
        slug: "descriptor"
    },
    tag_admin_kit: {
        _id: mongoose.Types.ObjectId(),
        name: "admin-kit",
        slug: "admin-kit"
    },
    tag_rest: {
        _id: mongoose.Types.ObjectId(),
        name: "rest",
        slug: "rest"
    },
    tag_graphql: {
        _id: mongoose.Types.ObjectId(),
        name: "graphql",
        slug: "graphql"
    },
    tag_api: {
        _id: mongoose.Types.ObjectId(),
        name: "api",
        slug: "api"
    },
    tag_authentication: {
        _id: mongoose.Types.ObjectId(),
        name: "authentication",
        slug: "authentication"
    },
    tag_permissions: {
        _id: mongoose.Types.ObjectId(),
        name: "permissions",
        slug: "permissions"
    },
    tag_fields: {
        _id: mongoose.Types.ObjectId(),
        name: "fields",
        slug: "fields"
    },
    tag_customization: {
        _id: mongoose.Types.ObjectId(),
        name: "customization",
        slug: "customization"
    },
    tag_dashboard: {
        _id: mongoose.Types.ObjectId(),
        name: "dashboard",
        slug: "dashboard"
    },
    tag_listview: {
        _id: mongoose.Types.ObjectId(),
        name: "listview",
        slug: "listview"
    },
    tag_changeview: {
        _id: mongoose.Types.ObjectId(),
        name: "changeview",
        slug: "changeview"
    },
    tag_react: {
        _id: mongoose.Types.ObjectId(),
        name: "react",
        slug: "react"
    },
    tag_deployment: {
        _id: mongoose.Types.ObjectId(),
        name: "deployment",
        slug: "deployment"
    },
    tag_django: {
        _id: mongoose.Types.ObjectId(),
        name: "django",
        slug: "django"
    },
    tag_flask: {
        _id: mongoose.Types.ObjectId(),
        name: "flask",
        slug: "flask"
    },
    tag_node: {
        _id: mongoose.Types.ObjectId(),
        name: "node",
        slug: "node"
    },
    tag_express: {
        _id: mongoose.Types.ObjectId(),
        name: "express",
        slug: "express"
    },
    tag_rails: {
        _id: mongoose.Types.ObjectId(),
        name: "rails",
        slug: "rails"
    },
    tag_hapi: {
        _id: mongoose.Types.ObjectId(),
        name: "hapi",
        slug: "hapi"
    },
    tag_koa: {
        _id: mongoose.Types.ObjectId(),
        name: "koa",
        slug: "koa"
    },
    tag_laravel: {
        _id: mongoose.Types.ObjectId(),
        name: "laravel",
        slug: "laravel"
    },
    tag_nginx: {
        _id: mongoose.Types.ObjectId(),
        name: "nginx",
        slug: "nginx"
    },
    tag_apache: {
        _id: mongoose.Types.ObjectId(),
        name: "apache",
        slug: "apache"
    },
    tag_server: {
        _id: mongoose.Types.ObjectId(),
        name: "server",
        slug: "server"
    },
    tag_tests: {
        _id: mongoose.Types.ObjectId(),
        name: "tests",
        slug: "tests"
    },
    tag_component: {
        _id: mongoose.Types.ObjectId(),
        name: "component",
        slug: "component"
    },
    tag_npm: {
        _id: mongoose.Types.ObjectId(),
        name: "npm",
        slug: "npm"
    },
    tag_documentation: {
        _id: mongoose.Types.ObjectId(),
        name: "documentation",
        slug: "documentation"
    },
    tag_beginner: {
        _id: mongoose.Types.ObjectId(),
        name: "beginner",
        slug: "beginner"
    },
    tag_intermediate: {
        _id: mongoose.Types.ObjectId(),
        name: "intermediate",
        slug: "intermediate"
    },
    tag_advanced: {
        _id: mongoose.Types.ObjectId(),
        name: "advanced",
        slug: "advanced"
    },
    tag_expert: {
        _id: mongoose.Types.ObjectId(),
        name: "expert",
        slug: "expert"
    },
    tag_browserify: {
        _id: mongoose.Types.ObjectId(),
        name: "browserify",
        slug: "browserify"
    },
    tag_webpack: {
        _id: mongoose.Types.ObjectId(),
        name: "webpack",
        slug: "webpack"
    },
    tag_mongodb: {
        _id: mongoose.Types.ObjectId(),
        name: "mongodb",
        slug: "mongodb"
    },
    tag_mysql: {
        _id: mongoose.Types.ObjectId(),
        name: "mysql",
        slug: "mysql"
    },
    tag_postgresql: {
        _id: mongoose.Types.ObjectId(),
        name: "postgresql",
        slug: "postgresql"
    },
    tag_rethinkdb: {
        _id: mongoose.Types.ObjectId(),
        name: "rethinkdb",
        slug: "rethinkdb"
    },
    tag_python: {
        _id: mongoose.Types.ObjectId(),
        name: "python",
        slug: "python"
    },
}

exports.Entry = {
    entry_1: {
        _id: mongoose.Types.ObjectId(),
        title: "Customizing the dashboard and menu",
        status: "Draft",
        date: "2016-05-02",
        sticky: false,
        section: exports.Section.section_help._id,
        category: exports.Category.category_help_customization._id,
        tags: [
            exports.Tag.tag_customization._id,
            exports.Tag.tag_dashboard._id,
            exports.Tag.tag_ui._id
        ],
        summary: "Consequatur voluptatem rem rerum quo culpa. Praesentium qui dolore quo impedit. Nesciunt delectus atque molestiae ipsa consequuntur veritatis. Quisquam qui aliquid maxime qui.",
        body: "Minus earum eveniet temporibus beatae eum et porro. Atque id error commodi sed tenetur repudiandae. Error quis soluta optio ratione aspernatur mollitia molestiae. Et voluptas et similique.\r\nCorrupti maxime commodi molestiae sequi tenetur voluptatem quas. Quia ab dolores beatae minus. Quas et nihil quo maxime itaque non hic officia. Sequi reiciendis rerum adipisci nihil.",
        owner: exports.User.user_demo._id
    },
    entry_2: {
        _id: mongoose.Types.ObjectId(),
        title: "Authentication and permissions",
        status: "Draft",
        date: "2016-05-27",
        section: exports.Section.section_help._id,
        category: exports.Category.category_help_usage._id,
        tags: [
            exports.Tag.tag_authentication._id,
            exports.Tag.tag_backend._id,
            exports.Tag.tag_permissions._id
        ],
        summary: "Consequatur voluptatem rem rerum quo culpa. Praesentium qui dolore quo impedit. Nesciunt delectus atque molestiae ipsa consequuntur veritatis. Quisquam qui aliquid maxime qui.",
        body: "Minus earum eveniet temporibus beatae eum et porro. Atque id error commodi sed tenetur repudiandae. Error quis soluta optio ratione aspernatur mollitia molestiae. Et voluptas et similique.\r\nCorrupti maxime commodi molestiae sequi tenetur voluptatem quas. Quia ab dolores beatae minus. Quas et nihil quo maxime itaque non hic officia. Sequi reiciendis rerum adipisci nihil.",
        owner: exports.User.user_demo._id
    },
    entry_3: {
        _id: mongoose.Types.ObjectId(),
        title: "Deploying crudl is easy",
        status: "Online",
        date: "2016-03-27",
        sticky: false,
        section: exports.Section.section_help._id,
        category: exports.Category.category_help_general._id,
        tags: [
            exports.Tag.tag_deployment._id,
            exports.Tag.tag_server._id
        ],
        summary: "Consequatur voluptatem rem rerum quo culpa. Praesentium qui dolore quo impedit. Nesciunt delectus atque molestiae ipsa consequuntur veritatis. Quisquam qui aliquid maxime qui.",
        body: "Minus earum eveniet temporibus beatae eum et porro. Atque id error commodi sed tenetur repudiandae. Error quis soluta optio ratione aspernatur mollitia molestiae. Et voluptas et similique.\r\nCorrupti maxime commodi molestiae sequi tenetur voluptatem quas. Quia ab dolores beatae minus. Quas et nihil quo maxime itaque non hic officia. Sequi reiciendis rerum adipisci nihil.",
        owner: exports.User.user_demo._id
    },
    entry_4: {
        _id: mongoose.Types.ObjectId(),
        title: "Serving crudl with Nginx/Apache",
        status: "Draft",
        date: "2016-01-27",
        sticky: false,
        section: exports.Section.section_help._id,
        category: exports.Category.category_help_installation._id,
        tags: [
            exports.Tag.tag_apache._id,
            exports.Tag.tag_nginx._id,
            exports.Tag.tag_server._id
        ],
        summary: "Consequatur voluptatem rem rerum quo culpa. Praesentium qui dolore quo impedit. Nesciunt delectus atque molestiae ipsa consequuntur veritatis. Quisquam qui aliquid maxime qui.",
        body: "Minus earum eveniet temporibus beatae eum et porro. Atque id error commodi sed tenetur repudiandae. Error quis soluta optio ratione aspernatur mollitia molestiae. Et voluptas et similique.\r\nCorrupti maxime commodi molestiae sequi tenetur voluptatem quas. Quia ab dolores beatae minus. Quas et nihil quo maxime itaque non hic officia. Sequi reiciendis rerum adipisci nihil.",
        owner: exports.User.user_demo._id
    },
    entry_5: {
        _id: mongoose.Types.ObjectId(),
        title: "A guide to building admin.js",
        status: "Online",
        date: "2016-02-12",
        sticky: false,
        section: exports.Section.section_help._id,
        category: exports.Category.category_help_usage._id,
        tags: [
            exports.Tag.tag_browserify._id,
            exports.Tag.tag_react._id,
            exports.Tag.tag_webpack._id
        ],
        summary: "Consequatur voluptatem rem rerum quo culpa. Praesentium qui dolore quo impedit. Nesciunt delectus atque molestiae ipsa consequuntur veritatis. Quisquam qui aliquid maxime qui.",
        body: "Minus earum eveniet temporibus beatae eum et porro. Atque id error commodi sed tenetur repudiandae. Error quis soluta optio ratione aspernatur mollitia molestiae. Et voluptas et similique.\r\nCorrupti maxime commodi molestiae sequi tenetur voluptatem quas. Quia ab dolores beatae minus. Quas et nihil quo maxime itaque non hic officia. Sequi reiciendis rerum adipisci nihil.",
        owner: exports.User.user_demo._id
    },
    entry_6: {
        _id: mongoose.Types.ObjectId(),
        title: "The team behind crudl",
        status: "Online",
        date: "2016-03-12",
        sticky: false,
        section: exports.Section.section_news._id,
        summary: "Consequatur voluptatem rem rerum quo culpa. Praesentium qui dolore quo impedit. Nesciunt delectus atque molestiae ipsa consequuntur veritatis. Quisquam qui aliquid maxime qui.",
        body: "Minus earum eveniet temporibus beatae eum et porro. Atque id error commodi sed tenetur repudiandae. Error quis soluta optio ratione aspernatur mollitia molestiae. Et voluptas et similique.\r\nCorrupti maxime commodi molestiae sequi tenetur voluptatem quas. Quia ab dolores beatae minus. Quas et nihil quo maxime itaque non hic officia. Sequi reiciendis rerum adipisci nihil.",
        owner: exports.User.user_demo._id
    },
    entry_7: {
        _id: mongoose.Types.ObjectId(),
        title: "Follow us",
        status: "Online",
        date: "2016-06-17",
        sticky: false,
        section: exports.Section.section_faq._id,
        summary: "Consequatur voluptatem rem rerum quo culpa. Praesentium qui dolore quo impedit. Nesciunt delectus atque molestiae ipsa consequuntur veritatis. Quisquam qui aliquid maxime qui.",
        body: "Minus earum eveniet temporibus beatae eum et porro. Atque id error commodi sed tenetur repudiandae. Error quis soluta optio ratione aspernatur mollitia molestiae. Et voluptas et similique.\r\nCorrupti maxime commodi molestiae sequi tenetur voluptatem quas. Quia ab dolores beatae minus. Quas et nihil quo maxime itaque non hic officia. Sequi reiciendis rerum adipisci nihil.",
        owner: exports.User.user_demo._id
    },
    entry_8: {
        _id: mongoose.Types.ObjectId(),
        title: "Authentication with Stormpath",
        status: "Draft",
        date: "2016-03-02",
        sticky: false,
        section: exports.Section.section_help._id,
        category: exports.Category.category_help_usage._id,
        tags: [
            exports.Tag.tag_advanced._id,
            exports.Tag.tag_authentication._id,
            exports.Tag.tag_permissions._id
        ],
        summary: "Consequatur voluptatem rem rerum quo culpa. Praesentium qui dolore quo impedit. Nesciunt delectus atque molestiae ipsa consequuntur veritatis. Quisquam qui aliquid maxime qui.",
        body: "Minus earum eveniet temporibus beatae eum et porro. Atque id error commodi sed tenetur repudiandae. Error quis soluta optio ratione aspernatur mollitia molestiae. Et voluptas et similique.\r\nCorrupti maxime commodi molestiae sequi tenetur voluptatem quas. Quia ab dolores beatae minus. Quas et nihil quo maxime itaque non hic officia. Sequi reiciendis rerum adipisci nihil.",
        owner: exports.User.user_demo._id
    },
    entry_9: {
        _id: mongoose.Types.ObjectId(),
        title: "crudl 0.2",
        status: "Online",
        date: "2016-03-07",
        sticky: false,
        section: exports.Section.section_updates._id,
        category: exports.Category.category_updates_core._id,
        summary: "Consequatur voluptatem rem rerum quo culpa. Praesentium qui dolore quo impedit. Nesciunt delectus atque molestiae ipsa consequuntur veritatis. Quisquam qui aliquid maxime qui.",
        body: "Minus earum eveniet temporibus beatae eum et porro. Atque id error commodi sed tenetur repudiandae. Error quis soluta optio ratione aspernatur mollitia molestiae. Et voluptas et similique.\r\nCorrupti maxime commodi molestiae sequi tenetur voluptatem quas. Quia ab dolores beatae minus. Quas et nihil quo maxime itaque non hic officia. Sequi reiciendis rerum adipisci nihil.",
        owner: exports.User.user_demo._id
    },
    entry_10: {
        _id: mongoose.Types.ObjectId(),
        title: "API best practices (REST)",
        status: "Draft",
        date: "2016-02-22",
        sticky: false,
        section: exports.Section.section_help._id,
        category: exports.Category.category_help_api._id,
        tags: [
            exports.Tag.tag_api._id,
            exports.Tag.tag_rest._id
        ],
        summary: "Consequatur voluptatem rem rerum quo culpa. Praesentium qui dolore quo impedit. Nesciunt delectus atque molestiae ipsa consequuntur veritatis. Quisquam qui aliquid maxime qui.",
        body: "Minus earum eveniet temporibus beatae eum et porro. Atque id error commodi sed tenetur repudiandae. Error quis soluta optio ratione aspernatur mollitia molestiae. Et voluptas et similique.\r\nCorrupti maxime commodi molestiae sequi tenetur voluptatem quas. Quia ab dolores beatae minus. Quas et nihil quo maxime itaque non hic officia. Sequi reiciendis rerum adipisci nihil.",
        owner: exports.User.user_demo._id
    },
    entry_11: {
        _id: mongoose.Types.ObjectId(),
        title: "Separation of concerns",
        status: "Online",
        date: "2016-05-22",
        section: exports.Section.section_faq._id,
        summary: "Consequatur voluptatem rem rerum quo culpa. Praesentium qui dolore quo impedit. Nesciunt delectus atque molestiae ipsa consequuntur veritatis. Quisquam qui aliquid maxime qui.",
        body: "Minus earum eveniet temporibus beatae eum et porro. Atque id error commodi sed tenetur repudiandae. Error quis soluta optio ratione aspernatur mollitia molestiae. Et voluptas et similique.\r\nCorrupti maxime commodi molestiae sequi tenetur voluptatem quas. Quia ab dolores beatae minus. Quas et nihil quo maxime itaque non hic officia. Sequi reiciendis rerum adipisci nihil.",
        owner: exports.User.user_demo._id
    },
    entry_12: {
        _id: mongoose.Types.ObjectId(),
        title: "Installation",
        status: "Online",
        date: "2016-04-17",
        sticky: false,
        section: exports.Section.section_help._id,
        category: exports.Category.category_help_installation._id,
        tags: [
            exports.Tag.tag_connector._id,
            exports.Tag.tag_deployment._id,
            exports.Tag.tag_descriptor._id
        ],
        summary: "Consequatur voluptatem rem rerum quo culpa. Praesentium qui dolore quo impedit. Nesciunt delectus atque molestiae ipsa consequuntur veritatis. Quisquam qui aliquid maxime qui.",
        body: "Minus earum eveniet temporibus beatae eum et porro. Atque id error commodi sed tenetur repudiandae. Error quis soluta optio ratione aspernatur mollitia molestiae. Et voluptas et similique.\r\nCorrupti maxime commodi molestiae sequi tenetur voluptatem quas. Quia ab dolores beatae minus. Quas et nihil quo maxime itaque non hic officia. Sequi reiciendis rerum adipisci nihil.",
        owner: exports.User.user_demo._id
    },
    entry_13: {
        _id: mongoose.Types.ObjectId(),
        title: "Writing a custom component",
        status: "Online",
        date: "2016-06-02",
        section: exports.Section.section_help._id,
        category: exports.Category.category_help_customization._id,
        tags: [
            exports.Tag.tag_advanced._id,
            exports.Tag.tag_component._id,
            exports.Tag.tag_customization._id,
            exports.Tag.tag_react._id
        ],
        summary: "Consequatur voluptatem rem rerum quo culpa. Praesentium qui dolore quo impedit. Nesciunt delectus atque molestiae ipsa consequuntur veritatis. Quisquam qui aliquid maxime qui.",
        body: "Minus earum eveniet temporibus beatae eum et porro. Atque id error commodi sed tenetur repudiandae. Error quis soluta optio ratione aspernatur mollitia molestiae. Et voluptas et similique.\r\nCorrupti maxime commodi molestiae sequi tenetur voluptatem quas. Quia ab dolores beatae minus. Quas et nihil quo maxime itaque non hic officia. Sequi reiciendis rerum adipisci nihil.",
        owner: exports.User.user_demo._id
    },
    entry_14: {
        _id: mongoose.Types.ObjectId(),
        title: "Backend agnostic",
        status: "Online",
        date: "2016-01-22",
        sticky: false,
        section: exports.Section.section_faq._id,
        tags: [
            exports.Tag.tag_django._id,
            exports.Tag.tag_express._id,
            exports.Tag.tag_flask._id,
            exports.Tag.tag_hapi._id,
            exports.Tag.tag_koa._id,
            exports.Tag.tag_laravel._id,
            exports.Tag.tag_node._id,
            exports.Tag.tag_rails._id
        ],
        summary: "Consequatur voluptatem rem rerum quo culpa. Praesentium qui dolore quo impedit. Nesciunt delectus atque molestiae ipsa consequuntur veritatis. Quisquam qui aliquid maxime qui.",
        body: "Minus earum eveniet temporibus beatae eum et porro. Atque id error commodi sed tenetur repudiandae. Error quis soluta optio ratione aspernatur mollitia molestiae. Et voluptas et similique.\r\nCorrupti maxime commodi molestiae sequi tenetur voluptatem quas. Quia ab dolores beatae minus. Quas et nihil quo maxime itaque non hic officia. Sequi reiciendis rerum adipisci nihil.",
        owner: exports.User.user_demo._id
    },
    entry_15: {
        _id: mongoose.Types.ObjectId(),
        title: "API best practices (GraphQL)",
        status: "Draft",
        date: "2016-02-27",
        sticky: false,
        section: exports.Section.section_help._id,
        category: exports.Category.category_help_api._id,
        tags: [
            exports.Tag.tag_api._id,
            exports.Tag.tag_graphql._id
        ],
        summary: "Consequatur voluptatem rem rerum quo culpa. Praesentium qui dolore quo impedit. Nesciunt delectus atque molestiae ipsa consequuntur veritatis. Quisquam qui aliquid maxime qui.",
        body: "Minus earum eveniet temporibus beatae eum et porro. Atque id error commodi sed tenetur repudiandae. Error quis soluta optio ratione aspernatur mollitia molestiae. Et voluptas et similique.\r\nCorrupti maxime commodi molestiae sequi tenetur voluptatem quas. Quia ab dolores beatae minus. Quas et nihil quo maxime itaque non hic officia. Sequi reiciendis rerum adipisci nihil.",
        owner: exports.User.user_demo._id
    },
    entry_16: {
        _id: mongoose.Types.ObjectId(),
        title: "Roadmap",
        status: "Online",
        date: "2016-03-22",
        sticky: false,
        section: exports.Section.section_news._id,
        summary: "Consequatur voluptatem rem rerum quo culpa. Praesentium qui dolore quo impedit. Nesciunt delectus atque molestiae ipsa consequuntur veritatis. Quisquam qui aliquid maxime qui.",
        body: "Minus earum eveniet temporibus beatae eum et porro. Atque id error commodi sed tenetur repudiandae. Error quis soluta optio ratione aspernatur mollitia molestiae. Et voluptas et similique.\r\nCorrupti maxime commodi molestiae sequi tenetur voluptatem quas. Quia ab dolores beatae minus. Quas et nihil quo maxime itaque non hic officia. Sequi reiciendis rerum adipisci nihil.",
        owner: exports.User.user_demo._id
    },
    entry_17: {
        _id: mongoose.Types.ObjectId(),
        title: "How to write connectors & descriptors",
        status: "Draft",
        date: "2016-02-02",
        sticky: false,
        section: exports.Section.section_help._id,
        category: exports.Category.category_help_usage._id,
        tags: [
            exports.Tag.tag_beginner._id,
            exports.Tag.tag_connector._id,
            exports.Tag.tag_descriptor._id
        ],
        summary: "Consequatur voluptatem rem rerum quo culpa. Praesentium qui dolore quo impedit. Nesciunt delectus atque molestiae ipsa consequuntur veritatis. Quisquam qui aliquid maxime qui.",
        body: "Minus earum eveniet temporibus beatae eum et porro. Atque id error commodi sed tenetur repudiandae. Error quis soluta optio ratione aspernatur mollitia molestiae. Et voluptas et similique.\r\nCorrupti maxime commodi molestiae sequi tenetur voluptatem quas. Quia ab dolores beatae minus. Quas et nihil quo maxime itaque non hic officia. Sequi reiciendis rerum adipisci nihil.",
        owner: exports.User.user_demo._id
    },
    entry_18: {
        _id: mongoose.Types.ObjectId(),
        title: "Python/Django example",
        status: "Draft",
        date: "2016-06-07",
        section: exports.Section.section_help._id,
        category: exports.Category.category_help_examples._id,
        tags: [
            exports.Tag.tag_django._id,
            exports.Tag.tag_graphql._id,
            exports.Tag.tag_postgresql._id,
            exports.Tag.tag_python._id,
            exports.Tag.tag_rest._id
        ],
        summary: "Consequatur voluptatem rem rerum quo culpa. Praesentium qui dolore quo impedit. Nesciunt delectus atque molestiae ipsa consequuntur veritatis. Quisquam qui aliquid maxime qui.",
        body: "Minus earum eveniet temporibus beatae eum et porro. Atque id error commodi sed tenetur repudiandae. Error quis soluta optio ratione aspernatur mollitia molestiae. Et voluptas et similique.\r\nCorrupti maxime commodi molestiae sequi tenetur voluptatem quas. Quia ab dolores beatae minus. Quas et nihil quo maxime itaque non hic officia. Sequi reiciendis rerum adipisci nihil.",
        owner: exports.User.user_demo._id
    },
    entry_19: {
        _id: mongoose.Types.ObjectId(),
        title: "The crudl ecosystem",
        status: "Online",
        date: "2016-04-27",
        sticky: false,
        section: exports.Section.section_help._id,
        category: exports.Category.category_help_general._id,
        summary: "Consequatur voluptatem rem rerum quo culpa. Praesentium qui dolore quo impedit. Nesciunt delectus atque molestiae ipsa consequuntur veritatis. Quisquam qui aliquid maxime qui.",
        body: "Minus earum eveniet temporibus beatae eum et porro. Atque id error commodi sed tenetur repudiandae. Error quis soluta optio ratione aspernatur mollitia molestiae. Et voluptas et similique.\r\nCorrupti maxime commodi molestiae sequi tenetur voluptatem quas. Quia ab dolores beatae minus. Quas et nihil quo maxime itaque non hic officia. Sequi reiciendis rerum adipisci nihil.",
        owner: exports.User.user_demo._id
    },
    entry_20: {
        _id: mongoose.Types.ObjectId(),
        title: "Node/Express example",
        status: "Draft",
        date: "2016-02-17",
        sticky: false,
        section: exports.Section.section_help._id,
        category: exports.Category.category_help_examples._id,
        tags: [
            exports.Tag.tag_express._id,
            exports.Tag.tag_graphql._id,
            exports.Tag.tag_mongodb._id,
            exports.Tag.tag_node._id,
            exports.Tag.tag_rest._id
        ],
        summary: "Consequatur voluptatem rem rerum quo culpa. Praesentium qui dolore quo impedit. Nesciunt delectus atque molestiae ipsa consequuntur veritatis. Quisquam qui aliquid maxime qui.",
        body: "Minus earum eveniet temporibus beatae eum et porro. Atque id error commodi sed tenetur repudiandae. Error quis soluta optio ratione aspernatur mollitia molestiae. Et voluptas et similique.\r\nCorrupti maxime commodi molestiae sequi tenetur voluptatem quas. Quia ab dolores beatae minus. Quas et nihil quo maxime itaque non hic officia. Sequi reiciendis rerum adipisci nihil.",
        owner: exports.User.user_demo._id
    },
    entry_21: {
        _id: mongoose.Types.ObjectId(),
        title: "GraphQL with Python/Graphene",
        status: "Draft",
        date: "2016-04-12",
        sticky: false,
        section: exports.Section.section_help._id,
        category: exports.Category.category_help_api._id,
        tags: [
            exports.Tag.tag_graphql._id,
            exports.Tag.tag_python._id
        ],
        summary: "Consequatur voluptatem rem rerum quo culpa. Praesentium qui dolore quo impedit. Nesciunt delectus atque molestiae ipsa consequuntur veritatis. Quisquam qui aliquid maxime qui.",
        body: "Minus earum eveniet temporibus beatae eum et porro. Atque id error commodi sed tenetur repudiandae. Error quis soluta optio ratione aspernatur mollitia molestiae. Et voluptas et similique.\r\nCorrupti maxime commodi molestiae sequi tenetur voluptatem quas. Quia ab dolores beatae minus. Quas et nihil quo maxime itaque non hic officia. Sequi reiciendis rerum adipisci nihil.",
        owner: exports.User.user_demo._id
    },
    entry_22: {
        _id: mongoose.Types.ObjectId(),
        title: "How to participate",
        status: "Online",
        date: "2016-04-07",
        sticky: false,
        section: exports.Section.section_faq._id,
        summary: "Consequatur voluptatem rem rerum quo culpa. Praesentium qui dolore quo impedit. Nesciunt delectus atque molestiae ipsa consequuntur veritatis. Quisquam qui aliquid maxime qui.",
        body: "Minus earum eveniet temporibus beatae eum et porro. Atque id error commodi sed tenetur repudiandae. Error quis soluta optio ratione aspernatur mollitia molestiae. Et voluptas et similique.\r\nCorrupti maxime commodi molestiae sequi tenetur voluptatem quas. Quia ab dolores beatae minus. Quas et nihil quo maxime itaque non hic officia. Sequi reiciendis rerum adipisci nihil.",
        owner: exports.User.user_demo._id
    },
    entry_23: {
        _id: mongoose.Types.ObjectId(),
        title: "Fields depending on each other",
        status: "Online",
        date: "2016-04-22",
        sticky: false,
        section: exports.Section.section_help._id,
        category: exports.Category.category_help_usage._id,
        tags: [
            exports.Tag.tag_customization._id,
            exports.Tag.tag_fields._id,
            exports.Tag.tag_usability._id
        ],
        summary: "Consequatur voluptatem rem rerum quo culpa. Praesentium qui dolore quo impedit. Nesciunt delectus atque molestiae ipsa consequuntur veritatis. Quisquam qui aliquid maxime qui.",
        body: "Minus earum eveniet temporibus beatae eum et porro. Atque id error commodi sed tenetur repudiandae. Error quis soluta optio ratione aspernatur mollitia molestiae. Et voluptas et similique.\r\nCorrupti maxime commodi molestiae sequi tenetur voluptatem quas. Quia ab dolores beatae minus. Quas et nihil quo maxime itaque non hic officia. Sequi reiciendis rerum adipisci nihil.",
        owner: exports.User.user_demo._id
    },
    entry_24: {
        _id: mongoose.Types.ObjectId(),
        title: "Ensure financing an open source project",
        status: "Draft",
        date: "2016-05-12",
        sticky: false,
        section: exports.Section.section_news._id,
        summary: "Consequatur voluptatem rem rerum quo culpa. Praesentium qui dolore quo impedit. Nesciunt delectus atque molestiae ipsa consequuntur veritatis. Quisquam qui aliquid maxime qui.",
        body: "Minus earum eveniet temporibus beatae eum et porro. Atque id error commodi sed tenetur repudiandae. Error quis soluta optio ratione aspernatur mollitia molestiae. Et voluptas et similique.\r\nCorrupti maxime commodi molestiae sequi tenetur voluptatem quas. Quia ab dolores beatae minus. Quas et nihil quo maxime itaque non hic officia. Sequi reiciendis rerum adipisci nihil.",
        owner: exports.User.user_demo._id
    },
    entry_25: {
        _id: mongoose.Types.ObjectId(),
        title: "crudl.io launched",
        status: "Online",
        date: "2016-05-07",
        sticky: true,
        section: exports.Section.section_news._id,
        summary: "Consequatur voluptatem rem rerum quo culpa. Praesentium qui dolore quo impedit. Nesciunt delectus atque molestiae ipsa consequuntur veritatis. Quisquam qui aliquid maxime qui.",
        body: "Minus earum eveniet temporibus beatae eum et porro. Atque id error commodi sed tenetur repudiandae. Error quis soluta optio ratione aspernatur mollitia molestiae. Et voluptas et similique.\r\nCorrupti maxime commodi molestiae sequi tenetur voluptatem quas. Quia ab dolores beatae minus. Quas et nihil quo maxime itaque non hic officia. Sequi reiciendis rerum adipisci nihil.",
        owner: exports.User.user_demo._id
    },
    entry_26: {
        _id: mongoose.Types.ObjectId(),
        title: "Upcoming development (Autumn 2016)",
        status: "Online",
        date: "2016-04-02",
        sticky: true,
        section: exports.Section.section_news._id,
        summary: "Consequatur voluptatem rem rerum quo culpa. Praesentium qui dolore quo impedit. Nesciunt delectus atque molestiae ipsa consequuntur veritatis. Quisquam qui aliquid maxime qui.",
        body: "Minus earum eveniet temporibus beatae eum et porro. Atque id error commodi sed tenetur repudiandae. Error quis soluta optio ratione aspernatur mollitia molestiae. Et voluptas et similique.\r\nCorrupti maxime commodi molestiae sequi tenetur voluptatem quas. Quia ab dolores beatae minus. Quas et nihil quo maxime itaque non hic officia. Sequi reiciendis rerum adipisci nihil.",
        owner: exports.User.user_demo._id
    },
    entry_27: {
        _id: mongoose.Types.ObjectId(),
        title: "crudl compared to the django admin",
        status: "Online",
        date: "2016-05-17",
        sticky: false,
        section: exports.Section.section_faq._id,
        summary: "Consequatur voluptatem rem rerum quo culpa. Praesentium qui dolore quo impedit. Nesciunt delectus atque molestiae ipsa consequuntur veritatis. Quisquam qui aliquid maxime qui.",
        body: "Minus earum eveniet temporibus beatae eum et porro. Atque id error commodi sed tenetur repudiandae. Error quis soluta optio ratione aspernatur mollitia molestiae. Et voluptas et similique.\r\nCorrupti maxime commodi molestiae sequi tenetur voluptatem quas. Quia ab dolores beatae minus. Quas et nihil quo maxime itaque non hic officia. Sequi reiciendis rerum adipisci nihil.",
        owner: exports.User.user_demo._id
    },
    entry_28: {
        _id: mongoose.Types.ObjectId(),
        title: "Using crudl-admin-kit",
        status: "Draft",
        date: "2016-03-17",
        sticky: false,
        section: exports.Section.section_help._id,
        category: exports.Category.category_help_usage._id,
        tags: [
            exports.Tag.tag_admin_kit._id,
            exports.Tag.tag_beginner._id,
            exports.Tag.tag_connector._id,
            exports.Tag.tag_descriptor._id
        ],
        summary: "Consequatur voluptatem rem rerum quo culpa. Praesentium qui dolore quo impedit. Nesciunt delectus atque molestiae ipsa consequuntur veritatis. Quisquam qui aliquid maxime qui.",
        body: "Minus earum eveniet temporibus beatae eum et porro. Atque id error commodi sed tenetur repudiandae. Error quis soluta optio ratione aspernatur mollitia molestiae. Et voluptas et similique.\r\nCorrupti maxime commodi molestiae sequi tenetur voluptatem quas. Quia ab dolores beatae minus. Quas et nihil quo maxime itaque non hic officia. Sequi reiciendis rerum adipisci nihil.",
        owner: exports.User.user_demo._id
    },
    entry_29: {
        _id: mongoose.Types.ObjectId(),
        title: "5 minutes crudl introduction",
        status: "Draft",
        date: "2016-02-07",
        sticky: false,
        section: exports.Section.section_help._id,
        category: exports.Category.category_help_general._id,
        summary: "Consequatur voluptatem rem rerum quo culpa. Praesentium qui dolore quo impedit. Nesciunt delectus atque molestiae ipsa consequuntur veritatis. Quisquam qui aliquid maxime qui.",
        body: "Minus earum eveniet temporibus beatae eum et porro. Atque id error commodi sed tenetur repudiandae. Error quis soluta optio ratione aspernatur mollitia molestiae. Et voluptas et similique.\r\nCorrupti maxime commodi molestiae sequi tenetur voluptatem quas. Quia ab dolores beatae minus. Quas et nihil quo maxime itaque non hic officia. Sequi reiciendis rerum adipisci nihil.",
        owner: exports.User.user_demo._id
    },
    entry_30: {
        _id: mongoose.Types.ObjectId(),
        title: "New frontend theme (crudl.material)",
        status: "Online",
        date: "2016-06-12",
        sticky: false,
        section: exports.Section.section_updates._id,
        category: exports.Category.category_updates_ui._id,
        tags: [
            exports.Tag.tag_admin._id,
            exports.Tag.tag_frontend._id,
            exports.Tag.tag_ui._id,
            exports.Tag.tag_ux._id
        ],
        summary: "Consequatur voluptatem rem rerum quo culpa. Praesentium qui dolore quo impedit. Nesciunt delectus atque molestiae ipsa consequuntur veritatis. Quisquam qui aliquid maxime qui.",
        body: "Minus earum eveniet temporibus beatae eum et porro. Atque id error commodi sed tenetur repudiandae. Error quis soluta optio ratione aspernatur mollitia molestiae. Et voluptas et similique.\r\nCorrupti maxime commodi molestiae sequi tenetur voluptatem quas. Quia ab dolores beatae minus. Quas et nihil quo maxime itaque non hic officia. Sequi reiciendis rerum adipisci nihil.",
        owner: exports.User.user_demo._id
    },
}

exports.EntryLink = [
    {
        entry: exports.Entry.entry_2._id,
        url: "https://auth0.com/",
        title: "Auth0",
        position: 0
    },
    {
        entry: exports.Entry.entry_6._id,
        url: "http://vonautomatisch.at",
        title: "vonautomatisch",
        position: 0
    },
    {
        entry: exports.Entry.entry_6._id,
        url: "https://twitter.com/sehmaschine",
        title: "sehmaschine on Twitter",
        position: 1
    },
    {
        entry: exports.Entry.entry_7._id,
        url: "https://github.com/crudlio",
        title: "GitHub",
        position: 0
    },
    {
        entry: exports.Entry.entry_7._id,
        url: "https://twitter.com/crudlio",
        title: "Twitter",
        position: 1
    },
    {
        entry: exports.Entry.entry_8._id,
        url: "https://stormpath.com/",
        title: "Stormpath",
        position: 0
    },
    {
        entry: exports.Entry.entry_10._id,
        url: "http://www.restapitutorial.com/",
        title: "REST API Tutorial",
        position: 0
    },
    {
        entry: exports.Entry.entry_14._id,
        url: "https://www.djangoproject.com/",
        title: "Django",
        position: 0
    },
    {
        entry: exports.Entry.entry_14._id,
        url: "http://expressjs.com/",
        title: "Express",
        position: 1
    },
    {
        entry: exports.Entry.entry_14._id,
        url: "http://flask.pocoo.org/",
        title: "Flask",
        position: 2
    },
    {
        entry: exports.Entry.entry_14._id,
        url: "http://hapijs.com/",
        title: "hapi",
        position: 3
    },
    {
        entry: exports.Entry.entry_14._id,
        url: "http://koajs.com/",
        title: "koa",
        position: 4
    },
    {
        entry: exports.Entry.entry_14._id,
        url: "https://laravel.com/",
        title: "Laravel",
        position: 5
    },
    {
        entry: exports.Entry.entry_14._id,
        url: "https://nodejs.org",
        title: "Node.js",
        position: 6
    },
    {
        entry: exports.Entry.entry_14._id,
        url: "http://rubyonrails.org/",
        title: "Ruby on Rails",
        position: 7
    },
    {
        entry: exports.Entry.entry_15._id,
        url: "http://graphql.org/",
        title: "GraphQL",
        position: 0
    },
    {
        entry: exports.Entry.entry_18._id,
        url: "https://www.djangoproject.com/",
        title: "Django",
        position: 0
    },
    {
        entry: exports.Entry.entry_18._id,
        url: "http://www.django-rest-framework.org/",
        title: "Django REST Framework",
        position: 1
    },
    {
        entry: exports.Entry.entry_18._id,
        url: "http://graphene-python.org/",
        title: "Graphene",
        position: 2
    },
    {
        entry: exports.Entry.entry_20._id,
        url: "https://nodejs.org/",
        title: "Node.js",
        position: 0
    },
    {
        entry: exports.Entry.entry_20._id,
        url: "http://expressjs.com/",
        title: "Express",
        position: 1
    },
    {
        entry: exports.Entry.entry_21._id,
        url: "https://www.python.org/",
        title: "Python",
        position: 0
    },
    {
        entry: exports.Entry.entry_21._id,
        url: "http://graphene-python.org/",
        title: "Graphene",
        position: 1
    },
    {
        entry: exports.Entry.entry_22._id,
        url: "https://github.com/crudlio",
        title: "GitHub",
        position: 0
    },
    {
        entry: exports.Entry.entry_25._id,
        url: "http://crudl.io",
        title: "CRUDL",
        position: 0
    },
    {
        entry: exports.Entry.entry_27._id,
        url: "https://docs.djangoproject.com/en/1.9/ref/contrib/admin/",
        title: "Django admin interface",
        position: 0
    },
    {
        entry: exports.Entry.entry_28._id,
        url: "https://github.com/crudlio",
        title: "GitHub",
        position: 0
    }
]
