import meta from "../../../pages/_meta.ts";
import api_reference_meta from "../../../pages/api-reference/_meta.ts";
import examples_meta from "../../../pages/examples/_meta.ts";
import get_started_meta from "../../../pages/get-started/_meta.ts";
export const pageMap = [{
  data: meta
}, {
  name: "api-reference",
  route: "/api-reference",
  children: [{
    data: api_reference_meta
  }, {
    name: "index",
    route: "/api-reference",
    frontMatter: {
      "title": "API Overview"
    }
  }, {
    name: "methods",
    route: "/api-reference/methods",
    frontMatter: {
      "title": "Methods"
    }
  }, {
    name: "props",
    route: "/api-reference/props",
    frontMatter: {
      "title": "Props"
    }
  }, {
    name: "types",
    route: "/api-reference/types",
    frontMatter: {
      "title": "Types"
    }
  }]
}, {
  name: "examples",
  route: "/examples",
  children: [{
    data: examples_meta
  }, {
    name: "basic-usage",
    route: "/examples/basic-usage",
    frontMatter: {
      "title": "Basic Usage"
    }
  }, {
    name: "cursor",
    route: "/examples/cursor",
    frontMatter: {
      "title": "Cursor Styles"
    }
  }, {
    name: "index",
    route: "/examples",
    frontMatter: {
      "title": "Examples Overview"
    }
  }, {
    name: "streaming-data",
    route: "/examples/streaming-data",
    frontMatter: {
      "title": "Streaming Data"
    }
  }, {
    name: "typing-animation",
    route: "/examples/typing-animation",
    frontMatter: {
      "title": "Typing Animation"
    }
  }]
}, {
  name: "get-started",
  route: "/get-started",
  children: [{
    data: get_started_meta
  }, {
    name: "basic-usage",
    route: "/get-started/basic-usage",
    frontMatter: {
      "title": "Basic Usage"
    }
  }, {
    name: "features",
    route: "/get-started/features",
    frontMatter: {
      "title": "Core Features"
    }
  }, {
    name: "index",
    route: "/get-started",
    frontMatter: {
      "title": "Get Started"
    }
  }, {
    name: "installation",
    route: "/get-started/installation",
    frontMatter: {
      "title": "Installation"
    }
  }, {
    name: "typing-cursor",
    route: "/get-started/typing-cursor",
    frontMatter: {
      "title": "Typing Cursor"
    }
  }]
}, {
  name: "index",
  route: "/",
  frontMatter: {
    "title": "react-markdown-typer",
    "description": "React Markdown Typing Animation Component"
  }
}];