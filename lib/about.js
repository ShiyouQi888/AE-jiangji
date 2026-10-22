export const ABOUT_COPY = {
  zh: {
    kicker: '关于 AEBack',
    title: '让不同版本的 Adobe 工程更容易交接',
    lede: 'AEBack 是一个独立的工程文件降级服务，专注处理 Premiere Pro 与 After Effects 项目的版本兼容问题。',
    sections: [
      {
        title: '我们解决什么问题',
        body: '新版软件保存的工程交给旧版打开时，常会遇到版本过高或兼容性提示。AEBack 提供 .prproj 与 .aep 两种工程转换工具，帮助用户选择接收方能使用的目标版本，并生成一个新的工程文件。',
      },
      {
        title: '两种工程格式，两种处理方式',
        body: 'After Effects 转换在浏览器本地运行，.aep 文件不会上传到本站。Premiere Pro 转换通过服务端降级引擎处理，需要临时接收 .prproj 文件；文件只为完成本次转换而处理，详情见隐私说明。',
        links: [
          { label: 'After Effects 降级工具', href: '/after-effects-downgrader' },
          { label: 'Premiere Pro 降级工具', href: '/premiere-pro-downgrader' },
          { label: '隐私说明', href: '/privacy' },
        ],
      },
      {
        title: '转换结果需要在目标软件中验证',
        body: '旧版本无法识别的新功能可能被移除或简化，复杂工程的结果也会不同。请先备份原文件，再用目标版本实际打开转换结果，检查时间线、合成、效果、表达式、字体和素材链接。降级不能保证所有项目都能无损转换。',
        links: [{ label: '查看降级原理与限制', href: '/how-it-works' }],
      },
      {
        title: '独立项目与联系渠道',
        body: 'AEBack 与 Adobe Inc. 无隶属、赞助或背书关系。若你遇到转换问题、发现页面信息需要更正，或有商务与团队部署需求，可以通过联系页面提交具体情况。',
        links: [{ label: '联系 AEBack', href: '/contact' }],
      },
    ],
    ctaTool: '选择降级工具',
    ctaContact: '联系我们',
  },
  en: {
    kicker: 'About AEBack',
    title: 'Make Adobe project handoffs across versions easier',
    lede: 'AEBack is an independent project-file downgrading service focused on version compatibility for Premiere Pro and After Effects projects.',
    sections: [
      {
        title: 'The problem we address',
        body: 'A project saved in newer software may show a version warning or fail to open in an older release. AEBack provides converters for .prproj and .aep projects so users can choose a target version available to the recipient and create a separate output project.',
      },
      {
        title: 'Two formats, two processing paths',
        body: 'After Effects conversion runs locally in your browser; the .aep file is not uploaded to this site. Premiere Pro conversion uses a server-side downgrade engine and temporarily receives the .prproj file to process it. See the privacy page for file handling details.',
        links: [
          { label: 'After Effects downgrader', href: '/after-effects-downgrader' },
          { label: 'Premiere Pro downgrader', href: '/premiere-pro-downgrader' },
          { label: 'Privacy', href: '/privacy' },
        ],
      },
      {
        title: 'Verify the result in the target application',
        body: 'Features unavailable in an older release may be removed or simplified, and complex projects can behave differently. Keep a backup, open the output in the target version, and check timelines, compositions, effects, expressions, fonts and media links. A lossless conversion cannot be guaranteed for every project.',
        links: [{ label: 'How downgrading works and its limits', href: '/how-it-works' }],
      },
      {
        title: 'Independent service and contact',
        body: 'AEBack is not affiliated with, sponsored by, or endorsed by Adobe Inc. For conversion issues, content corrections, business enquiries or team deployment needs, contact us with the relevant details.',
        links: [{ label: 'Contact AEBack', href: '/contact' }],
      },
    ],
    ctaTool: 'Choose a downgrader',
    ctaContact: 'Contact us',
  },
};
