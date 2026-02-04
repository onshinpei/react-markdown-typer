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
      "title": "API 概览"
    }
  }, {
    name: "methods",
    route: "/api-reference/methods",
    frontMatter: {
      "title": "方法"
    }
  }, {
    name: "props",
    route: "/api-reference/props",
    frontMatter: {
      "title": "Props 属性"
    }
  }, {
    name: "types",
    route: "/api-reference/types",
    frontMatter: {
      "title": "类型定义"
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
      "title": "基础用法"
    }
  }, {
    name: "cursor",
    route: "/examples/cursor",
    frontMatter: {
      "title": "光标样式"
    }
  }, {
    name: "index",
    route: "/examples",
    frontMatter: {
      "title": "示例概览"
    }
  }, {
    name: "streaming-data",
    route: "/examples/streaming-data",
    frontMatter: {
      "title": "流式数据"
    }
  }, {
    name: "typing-animation",
    route: "/examples/typing-animation",
    frontMatter: {
      "title": "打字动画"
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
      "title": "基础用法"
    }
  }, {
    name: "features",
    route: "/get-started/features",
    frontMatter: {
      "title": "核心特性"
    }
  }, {
    name: "index",
    route: "/get-started",
    frontMatter: {
      "title": "快速开始"
    }
  }, {
    name: "installation",
    route: "/get-started/installation",
    frontMatter: {
      "title": "安装"
    }
  }, {
    name: "typing-cursor",
    route: "/get-started/typing-cursor",
    frontMatter: {
      "title": "打字光标"
    }
  }]
}, {
  name: "index",
  route: "/",
  frontMatter: {
    "title": "react-markdown-typer",
    "description": "React Markdown 打字动画组件"
  }
}];